import { describe, expect, it } from "vitest";
import {
  advanceMonth, canRunCollectionsPush, setAskRent, setRenewalIncrease, toggleCollectionsPush, type GameState,
} from "../src/sim/engine";
import { newGame } from "../src/sim/state";
import { scorecard } from "../src/sim/scorecard";

const byId = (g: GameState, id: string) => g.communities.find((c) => c.id === id)!;

describe("asking rent (P0 §3.2 P_gap)", () => {
  it("raising the ask above market lowers occupancy after the close", () => {
    let g = setAskRent(newGame(), "larkspur", 1780 * 1.10);     // 10% above market
    const before = byId(g, "larkspur").occupancy;
    g = advanceMonth(g);
    // P_gap = 0.10 × 0.10 = 0.01, so the target drops by 1 point and occupancy moves 35% of the gap.
    expect(byId(g, "larkspur").occupancy).toBeLessThan(before);
  });

  it("leaves occupancy unchanged at the market ask", () => {
    let g = advanceMonth(newGame());
    expect(+byId(g, "larkspur").occupancy.toFixed(4)).toBe(0.934);
  });
});

describe("renewal increase (P0 §3.8)", () => {
  it("a 6% renewal increase costs about 4.5 RS a month at Larkspur (before the brake)", () => {
    let g = setRenewalIncrease(newGame(), "larkspur", 0.06);
    g = advanceMonth(g);
    // 0.5 × 3 pts × 100/64 × 1.94 renewals ≈ 4.55 RS in month one.
    expect(byId(g, "larkspur").rs).toBeGreaterThan(55.3);
    expect(byId(g, "larkspur").rs).toBeLessThan(55.6);
  });

  it("raises the rent base for the next month", () => {
    let g = setRenewalIncrease(newGame(), "larkspur", 0.06);
    g = advanceMonth(g);
    expect(byId(g, "larkspur").rentIndex).toBeGreaterThan(1);
  });

  it("an increase of 3% or less is RS-neutral", () => {
    let g = setRenewalIncrease(newGame(), "larkspur", 0.03);
    g = advanceMonth(g);
    expect(byId(g, "larkspur").rs).toBeCloseTo(60, 6);
  });
});

describe("collections push and the brake (P0 §3.5, D-031)", () => {
  it("can be turned on at RS 60", () => {
    const g = toggleCollectionsPush(newGame(), "larkspur");
    expect(byId(g, "larkspur").pushThisMonth).toBe(true);
  });

  it("is blocked below RS 60", () => {
    let g = newGame();
    g = { ...g, communities: g.communities.map((c) => (c.id === "larkspur" ? { ...c, rs: 58 } : c)) };
    expect(canRunCollectionsPush(byId(g, "larkspur"))).toBe(false);
    g = toggleCollectionsPush(g, "larkspur");
    expect(byId(g, "larkspur").pushThisMonth).toBe(false);
  });

  it("costs 2 RS in the month it runs and adds the fee share", () => {
    let g = toggleCollectionsPush(newGame(), "larkspur");
    g = advanceMonth(g);
    expect(byId(g, "larkspur").rs).toBeCloseTo(58, 6);
    expect(g.lastResult!.communities.find((c) => c.id === "larkspur")!.collectionsFee).toBeCloseTo(0.06 * 2000, 6);
  });

  it("does not block rent increases while RS is below 60 (D-031)", () => {
    let g = { ...newGame(), communities: newGame().communities.map((c) => (c.id === "larkspur" ? { ...c, rs: 55 } : c)) };
    g = setRenewalIncrease(g, "larkspur", 0.06);
    expect(byId(g, "larkspur").renewalIncrease).toBeCloseTo(0.06, 6);
  });
});

describe("twelve-month scorecard (P0 §1.7)", () => {
  it("reports unmodeled criteria as not modeled, never as met", () => {
    let g = newGame();
    for (let i = 0; i < 12; i++) g = advanceMonth(g);
    const card = scorecard(g);
    const byNum = Object.fromEntries(card.map((c) => [c.id, c.status]));
    expect(byNum[3]).toBe("not modeled");
    expect(byNum[5]).toBe("not modeled");
    expect(byNum[6]).toBe("not modeled");
  });

  it("at opening with no decisions: occupancy and liquidity are met, resident satisfaction is not", () => {
    let g = newGame();
    for (let i = 0; i < 12; i++) g = advanceMonth(g);
    const card = scorecard(g);
    const byNum = Object.fromEntries(card.map((c) => [c.id, c.status]));
    expect(byNum[4]).toBe("met");
    expect(byNum[2]).toBe("met");
    expect(byNum[8]).toBe("not met");   // RS stays at 60, below the 65 target
  });
});
