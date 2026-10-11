import { describe, expect, it } from "vitest";
import { advanceMonth, drawOwnerReserve, setAskRent, type GameState } from "../src/sim/engine";
import { NEW_LEASES_PER_MONTH } from "../src/sim/opening";
import { newGame } from "../src/sim/state";
import { RESERVE_DRAW_CAP, RESERVE_TARGET, drawReserve, depositFlow } from "../src/sim/ledgers";

// P0 §2.1: the Owner Capital Reserve is owner money held restricted. The Security Deposit Trust
// is resident money held in trust. Neither is corporate cash (§2.4).

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

describe("owner capital reserve (P0 §2.1, §3.8)", () => {
  it("funds the reserve to target on the first close, from the Owner Trust after the sweep", () => {
    const g = advanceMonth(newGame());
    for (const c of g.communities) expect(c.reserve).toBe(RESERVE_TARGET);
    const transfers = g.statements.map((s) => s.reserveTransfer);
    expect(transfers.every((t) => t === RESERVE_TARGET)).toBe(true);
  });

  it("does not transfer again once the reserve is at target", () => {
    let g = advanceMonth(newGame());
    g = advanceMonth(g);
    const second = g.statements.filter((s) => s.month === 11).map((s) => s.reserveTransfer);
    expect(second.every((t) => t === 0)).toBe(true);
    expect(g.communities.every((c) => c.reserve === RESERVE_TARGET)).toBe(true);
  });

  it("reduces the owner distribution by the reserve transfer, and the reserve is shown on the statement", () => {
    const g = advanceMonth(newGame());
    for (const s of g.statements) {
      expect(s.reserveEnding).toBe(RESERVE_TARGET);
      expect(s.endingTrust).toBeCloseTo(0, 9);
    }
  });

  it("caps draws at $5,000 per close period across all calls in that period (D-016)", () => {
    let g = advanceMonth(newGame());
    const first = drawOwnerReserve(g, "larkspur", 3000);
    expect(first.covered).toBe(3000);
    expect(first.remainder).toBe(0);
    const second = drawOwnerReserve(first.state, "larkspur", 3000);
    expect(second.covered).toBe(RESERVE_DRAW_CAP - 3000);   // cap left, not the requested amount
    expect(second.remainder).toBe(1000);
    g = second.state;
    expect(g.communities.find((c) => c.id === "larkspur")!.reserve).toBeCloseTo(RESERVE_TARGET - (RESERVE_DRAW_CAP), 9);
  });

  it("never draws more than the reserve holds, even under the cap", () => {
    const g = advanceMonth(newGame());
    const r = drawReserve(g.communities[0], 6000);
    expect(r.covered).toBe(RESERVE_TARGET);
    expect(r.remainder).toBe(6000 - RESERVE_TARGET);
    expect(r.community.reserve).toBe(0);
  });

  it("refills after a draw at the next close, from the trust", () => {
    let g = advanceMonth(newGame());
    g = drawOwnerReserve(g, "cinder", 4000).state;
    g = advanceMonth(g);
    const cinder = g.statements.find((s) => s.id === "cinder" && s.month === 11)!;
    expect(cinder.reserveTransfer).toBeCloseTo(4000, 9);
    expect(g.communities.find((c) => c.id === "cinder")!.reserve).toBeCloseTo(RESERVE_TARGET, 9);
    expect(g.communities.find((c) => c.id === "cinder")!.reserveDrawnThisMonth).toBe(0);
  });

  it("is restricted: the reserve never falls at a close, only by a draw", () => {
    let g = advanceMonth(newGame());
    for (let i = 0; i < 6; i++) {
      const before = Object.fromEntries(g.communities.map((c) => [c.id, c.reserve]));
      g = advanceMonth(g);
      for (const c of g.communities) expect(c.reserve).toBeGreaterThanOrEqual(before[c.id] - 1e-9);
    }
  });
});

describe("security deposit trust (P0 §2.1, §2.4)", () => {
  it("opens with a deposit for each occupied unit, from the opening rent", () => {
    const g = newGame();
    const larkspur = g.communities.find((c) => c.id === "larkspur")!;
    // 64 units × 0.934 occupancy × $1,780 rent × 1 month
    expect(Math.abs(larkspur.depositHeld - 64 * 0.934 * 1780)).toBeLessThan(1);
  });

  it("allocates move-ins by unit share and derives move-outs from occupancy", () => {
    const g = advanceMonth(newGame());
    const flows = g.lastResult!.deposits;
    expect(Math.abs(sum(flows.map((f) => f.movesIn)) - NEW_LEASES_PER_MONTH)).toBeLessThan(1e-9);
    for (const f of flows) expect(f.moveOuts).toBeGreaterThanOrEqual(0);
  });

  it("keeps the deposit balance non-negative and near its opening level under stable occupancy", () => {
    let g = newGame();
    const opening = sum(g.communities.map((c) => c.depositHeld));
    for (let i = 0; i < 12; i++) {
      g = advanceMonth(g);
      for (const c of g.communities) expect(c.depositHeld).toBeGreaterThanOrEqual(0);
    }
    const end = sum(g.communities.map((c) => c.depositHeld));
    expect(Math.abs(end - opening) / opening).toBeLessThan(0.05);
  });

  it("refunds move-outs at the average deposit held, and receives move-ins at the current rent", () => {
    const flow = depositFlow(
      { id: "t", name: "t", units: 10, avgRent: 1000, baseOcc: 0.9, feePct: 0, minFee: 0, newLeaseFee: 0,
        renewalFee: 0, occupancy: 0.5, rs: 60, askRent: 1000, renewalIncrease: 0, rentIndex: 1.1,
        pushThisMonth: false, ownerTrust: 0, feesOwed: 0, reserve: 0, reserveDrawnThisMonth: 0,
        depositHeld: 5000 },
      2,      // move-ins
      0.5,    // occupancy after: 5 occupied, unchanged, so move-outs = 2
    );
    expect(flow.moveOuts).toBeCloseTo(2, 9);
    expect(flow.received).toBeCloseTo(2 * 1000 * 1.1, 9);        // deposits at current rent
    expect(flow.refunded).toBeCloseTo(2 * (5000 / 5), 9);         // average held per occupied unit
    expect(flow.held).toBeCloseTo(5000 + 2200 - 2000, 9);
  });

  it("never reaches corporate cash: cash moves only by sweeps and expenses across closes", () => {
    // Asking above market lowers occupancy (P_gap), so move-outs exceed move-ins and deposits move.
    let g = setAskRent(newGame(), "larkspur", 1900);
    for (let i = 0; i < 3; i++) {
      const cash0 = g.cash;
      const held0 = sum(g.communities.map((c) => c.depositHeld));
      g = advanceMonth(g);
      const expected = cash0 + g.lastResult!.sweepsReceived - g.lastResult!.expenses;
      expect(Math.abs(g.cash - expected)).toBeLessThan(1e-6);
      // Deposits move this close, but they are not in the corporate figure.
      expect(Math.abs(sum(g.communities.map((c) => c.depositHeld)) - held0)).toBeGreaterThan(1);
    }
  });
});

describe("state integrity", () => {
  it("keeps draws and reserves on each community and leaves other communities alone", () => {
    const g: GameState = advanceMonth(newGame());
    const next = drawOwnerReserve(g, "stillwater", 1000).state;
    const other = next.communities.filter((c) => c.id !== "stillwater");
    const before = g.communities.filter((c) => c.id !== "stillwater");
    expect(other.map((c) => c.reserve)).toEqual(before.map((c) => c.reserve));
  });
});
