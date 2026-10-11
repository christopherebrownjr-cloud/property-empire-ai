import { describe, expect, it } from "vitest";
import { advanceMonth, toggleCollectionsPush, type GameState } from "../src/sim/engine";
import { newGame } from "../src/sim/state";

// P0 §2: each community's Owner Trust is separate from corporate cash. Fees reach the company
// only through the fee sweep. Shortfalls stay owed by the owner.

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
const stmtsFor = (g: GameState, year: number, month: number) =>
  g.statements.filter((s) => s.year === year && s.month === month);

describe("opening balances", () => {
  it("starts every Owner Trust at zero (no opening balance is specified)", () => {
    expect(newGame().communities.every((c) => c.ownerTrust === 0)).toBe(true);
  });

  it("starts the company's receivable at one month of accrued fees and leasing income", () => {
    const owed = sum(newGame().communities.map((c) => c.feesOwed));
    expect(Math.abs(owed - 15435.3)).toBeLessThan(1);
  });
});

describe("fee sweep and cash timing", () => {
  it("sweeps the opening receivable on the first close, so cash moves by net", () => {
    const g = advanceMonth(newGame());
    const swept = sum(g.statements.map((s) => s.feesSwept));
    expect(Math.abs(swept - 15435.3)).toBeLessThan(1);
    expect(Math.abs(g.cash - (48000 + swept - g.lastResult!.expenses))).toBeLessThan(1e-6);
  });

  it("fee income accrues at close and is swept the following month", () => {
    let g = advanceMonth(newGame());
    const accrued = sum(stmtsFor(g, 2026, 10).map((s) => s.feesAccrued));
    expect(Math.abs(sum(g.communities.map((c) => c.feesOwed)) - accrued)).toBeLessThan(1e-6);
    g = advanceMonth(g);
    expect(Math.abs(sum(stmtsFor(g, 2026, 11).map((s) => s.feesSwept)) - accrued)).toBeLessThan(1);
  });
});

describe("trust reconciliation (P0 §2.1, §2.5)", () => {
  it("each statement reconciles: ending trust = opening + receipts − sweep − reserve − distribution", () => {
    let g = newGame();
    for (let i = 0; i < 3; i++) {
      const before = Object.fromEntries(g.communities.map((c) => [c.id, c.ownerTrust]));
      g = advanceMonth(g);
      for (const s of stmtsFor(g, g.month === 1 ? 2026 : g.year, g.month === 1 ? 12 : g.month - 1)) {
        const opening = before[s.id];
        const end = opening + s.collectedRent + s.recoveries - s.feesSwept - s.reserveTransfer - s.distribution;
        expect(Math.abs(s.endingTrust - end)).toBeLessThan(1e-6);
      }
    }
  });

  it("with no reserve minimum, the trust is emptied to the owner or the reserve each close", () => {
    const g = advanceMonth(newGame());
    expect(g.communities.every((c) => Math.abs(c.ownerTrust) < 1e-9)).toBe(true);
  });

  it("money is conserved: corporate cash plus owner money (trust and reserve) move only by receipts, expenses and distributions", () => {
    let g = newGame();
    for (let i = 0; i < 3; i++) {
      const cash0 = g.cash;
      const trust0 = sum(g.communities.map((c) => c.ownerTrust + c.reserve));
      g = advanceMonth(g);
      const s = stmtsFor(g, g.month === 1 ? 2026 : g.year, g.month === 1 ? 12 : g.month - 1);
      const receipts = sum(s.map((x) => x.collectedRent + x.recoveries));
      const dist = sum(s.map((x) => x.distribution));
      const expenses = g.lastResult!.expenses;
      const trust1 = sum(g.communities.map((c) => c.ownerTrust + c.reserve));
      const total0 = cash0 + trust0;
      const total1 = g.cash + trust1;
      expect(Math.abs((total1 - total0) - (receipts - expenses - dist))).toBeLessThan(1e-6);
    }
  });
});

describe("shortfall stays owed by the owner (P0 §2.2)", () => {
  it("when the trust cannot pay, the company is not paid and the amount stays owed", () => {
    let g = newGame();
    // Stillwater collects nothing, so its trust has nothing to sweep and its minimum fee stays owed.
    g = { ...g, communities: g.communities.map((c) => (c.id === "stillwater" ? { ...c, occupancy: 0 } : c)) };
    g = advanceMonth(g);
    const st = g.statements.find((s) => s.id === "stillwater" && s.year === 2026 && s.month === 10)!;
    expect(st.feesSwept).toBe(0);
    expect(st.feesOwedAfter).toBeGreaterThan(0);
    expect(st.collectedRent).toBe(0);
  });
});

describe("collections push recovery (P0 §3.5, D-009)", () => {
  it("posts the recovery to the trust, and the fee share is swept the next month", () => {
    let g = toggleCollectionsPush(newGame(), "larkspur");
    g = advanceMonth(g);
    const st = g.statements.find((s) => s.id === "larkspur" && s.month === 10)!;
    expect(st.recoveries).toBe(2000);
    const feeShare = 0.06 * 2000;
    g = advanceMonth(g);
    const next = g.statements.find((s) => s.id === "larkspur" && s.month === 11)!;
    // The sweep includes the $120 fee share from the recovery, because it accrued at the prior close.
    expect(next.feesSwept).toBeGreaterThanOrEqual(feeShare - 1e-6);
  });
});

describe("statements", () => {
  it("issues one statement per community per close", () => {
    let g = newGame();
    g = advanceMonth(g);
    g = advanceMonth(g);
    expect(g.statements.length).toBe(6);
  });
});
