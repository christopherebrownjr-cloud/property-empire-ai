import { describe, expect, it } from "vitest";
import { advanceMonth, drawOwnerReserve, hireAssistant, setAskRent, toggleCollectionsPush, type GameState } from "../src/sim/engine";
import { newGame } from "../src/sim/state";
import { scorecard } from "../src/sim/scorecard";
import { invariantErrors } from "../src/sim/invariants";

// Milestone 5: integrity of the close, the scorecard, and the invariants.

function runYear(actions: boolean): GameState {
  let g = newGame();
  if (actions) {
    g = hireAssistant(g);
    g = setAskRent(g, "cinder", 1700);
    g = toggleCollectionsPush(g, "larkspur");
  }
  for (let i = 0; i < 12; i++) {
    g = advanceMonth(g);
    if (actions && i === 4) g = drawOwnerReserve(g, "stillwater", 3000).state;
  }
  return g;
}

describe("invariants hold through a year (P0 §2, §4.2)", () => {
  it("baseline year", () => {
    expect(invariantErrors(runYear(false))).toEqual([]);
  });

  it("year with the assistant, an above-market ask, a collections push, and a reserve draw", () => {
    expect(invariantErrors(runYear(true))).toEqual([]);
  });
});

describe("scorecard integrity (P0 §1.7)", () => {
  it("criterion 1 is not modeled, never met by default", () => {
    const c1 = scorecard(newGame()).find((c) => c.id === 1)!;
    expect(c1.status).toBe("not modeled");
  });

  it("criterion 4 averages occupancy weighted by units, not by community", () => {
    const g = runYear(false);
    const totalUnits = g.communities.reduce((a, c) => a + c.units, 0);
    const expected = g.history.reduce((a, m) =>
      a + g.communities.reduce((x, c) => x + m.occupancy[c.id] * c.units, 0) / totalUnits, 0) / g.history.length;
    const detail = scorecard(g).find((c) => c.id === 4)!.detail;
    expect(detail).toContain(`${(expected * 100).toFixed(1)}%`);
  });
});

describe("month-end snapshot (P0 §1.7)", () => {
  it("the history records satisfaction and occupancy after the close, not before", () => {
    const g = advanceMonth(newGame());
    const rec = g.history[0];
    for (const c of g.communities) {
      expect(rec.rs[c.id]).toBeCloseTo(c.rs, 9);
      expect(rec.occupancy[c.id]).toBeCloseTo(c.occupancy, 9);
    }
  });
});

describe("assistant on the staff roll", () => {
  it("the hired assistant has a burnout reading each month, and is not double-hired", () => {
    let g = hireAssistant(newGame());
    expect(hireAssistant(g)).toBe(g);
    g = advanceMonth(g);
    expect(g.staff.some((s) => s.id === "assistant")).toBe(true);
    expect(g.history[0].burnout["assistant"]).toBeDefined();
  });
});
