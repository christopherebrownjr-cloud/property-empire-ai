import { describe, expect, it } from "vitest";
import { advanceMonth, computeMonth, hireAssistant, utilization } from "../src/sim/engine";
import { newGame } from "../src/sim/state";

// Expected values are the P0 spec v1.9 opening figures (§1.2–§1.4, §17).
describe("opening month (P0 §1.4, §17)", () => {
  it("collects the three fees and leasing income", () => {
    const r = computeMonth(newGame());
    const fees = r.communities.map((c) => Math.round(c.fee));
    expect(fees).toEqual([6161, 3908, 2821]);
    expect(Math.round(r.revenue)).toBe(15435);
  });

  // The spec rounds each line to whole dollars (-402). Exact arithmetic gives -401.35.
  // The tests allow $1 for that rounding.
  it("nets about -402 a month before any hire (within $1 of spec rounding)", () => {
    const r = computeMonth(newGame());
    expect(Math.abs(r.net - -402)).toBeLessThan(1);
  });

  it("nets about -4,875 a month after the assistant hire (within $1)", () => {
    const r = computeMonth(hireAssistant(newGame()));
    expect(Math.abs(r.net - -4875)).toBeLessThan(1);
  });

  it("gives about 9.8 months of runway after the hire", () => {
    const r = computeMonth(hireAssistant(newGame()));
    expect(r.runwayMonths).not.toBeNull();
    expect(r.runwayMonths!).toBeGreaterThan(9.8);
    expect(r.runwayMonths!).toBeLessThan(9.9);
  });

  it("keeps the pinned opening occupancy when the month rolls (stable opening)", () => {
    const g = advanceMonth(newGame());
    expect(g.communities.map((c) => +c.occupancy.toFixed(3))).toEqual([0.934, 0.944, 0.904]);
  });

  it("keeps resident satisfaction at 60 at opening (§3.2)", () => {
    const g = advanceMonth(newGame());
    expect(g.communities.every((c) => Math.abs(c.rs - 60) < 1e-9)).toBe(true);
  });

  it("puts the coordinator at 0.97 and the founder at 0.66 utilization (§4.4)", () => {
    const g = newGame();
    expect(+utilization(g, "coordinator").toFixed(2)).toBe(0.97);
    expect(+utilization(g, "founder").toFixed(2)).toBe(0.66);
  });
});

describe("cash across months", () => {
  it("adds each month's net to cash", () => {
    const g = advanceMonth(newGame());
    expect(Math.abs(g.cash - (48000 - 402))).toBeLessThan(1);
  });

  it("moves the calendar forward and wraps December to January", () => {
    let g = newGame();
    for (let i = 0; i < 3; i++) g = advanceMonth(g);
    expect([g.year, g.month]).toEqual([2027, 1]);
  });
});
