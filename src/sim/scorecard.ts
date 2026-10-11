// Twelve-month success criteria (P0 spec §1.7). Each criterion is met, not met, or not modeled.
// A criterion is "not modeled" when the slice has no mechanic for it yet. It is never counted as met.
import type { GameState } from "./engine";

export type Status = "met" | "not met" | "not modeled";

export interface Criterion {
  id: number;
  name: string;
  status: Status;
  detail: string;
}

export function scorecard(state: GameState): Criterion[] {
  const h = state.history;
  const out: Criterion[] = [];

  // 1. Contracts: owner terminations depend on owner sentiment, which is not modeled. Never "met" by default.
  out.push({ id: 1, name: "Contracts", status: "not modeled", detail: "Owner terminations depend on owner sentiment, which is not modeled yet." });

  // 2. Liquidity: cash ≥ 2.0 × monthly expenses. Distress-level tracking is not modeled.
  const last = h[h.length - 1];
  if (!last) {
    out.push({ id: 2, name: "Liquidity", status: "not modeled", detail: "No months closed." });
  } else {
    const need = 2 * last.expenses;
    out.push({
      id: 2, name: "Liquidity",
      status: last.cash >= need ? "met" : "not met",
      detail: `Cash $${Math.round(last.cash).toLocaleString("en-US")} vs 2 × expenses $${Math.round(need).toLocaleString("en-US")}. Distress levels not modeled.`,
    });
  }

  // 3. Trust integrity: owner-statement timing is not modeled.
  out.push({ id: 3, name: "Trust integrity", status: "not modeled", detail: "Ledgers reconcile at every close. Violation actions (§2.4) are not built, so this criterion is not scored yet." });

  // 4. Occupancy: 12-month average ≥ 93%; no community below 90% for 2+ consecutive months.
  if (h.length < 12) {
    out.push({ id: 4, name: "Occupancy", status: "not modeled", detail: `${h.length} of 12 months closed.` });
  } else {
    // Unit-weighted portfolio occupancy (P0 §1.7 and §3.2), averaged over the twelve months.
    const totalUnits = state.communities.reduce((a, c) => a + c.units, 0);
    const avg = h.reduce((a, m) => a + state.communities.reduce((x, c) => x + (m.occupancy[c.id] ?? 0) * c.units, 0) / totalUnits, 0) / h.length;
    const streak = worstStreak(state, (id, idx) => h[idx].occupancy[id] < 0.90);
    const ok = avg >= 0.93 && streak < 2;
    out.push({ id: 4, name: "Occupancy", status: ok ? "met" : "not met",
      detail: `12-month average ${(avg * 100).toFixed(1)}%; longest run below 90% is ${streak} month(s).` });
  }

  // 5. Growth: no pipeline or bids in the slice yet.
  out.push({ id: 5, name: "Growth", status: "not modeled", detail: "Bids and new contracts are not modeled yet." });

  // 6. Compliance: inspections are not modeled yet.
  out.push({ id: 6, name: "Compliance", status: "not modeled", detail: "Inspections and critical repairs are not modeled yet." });

  // 7. Team: no employee at burnout ≥ 85 for 2+ consecutive months; founder below 85 at month 12.
  if (h.length < 12) {
    out.push({ id: 7, name: "Team", status: "not modeled", detail: `${h.length} of 12 months closed.` });
  } else {
    const streak = worstStreak(state, (id, idx) => (h[idx].burnout[id] ?? 0) >= 85);
    const founder = h[h.length - 1].burnout["founder"] ?? 0;
    const ok = streak < 2 && founder < 85;
    out.push({ id: 7, name: "Team", status: ok ? "met" : "not met",
      detail: `Longest run at burnout 85+ is ${streak} month(s); founder ends at ${Math.round(founder)}.` });
  }

  // 8. Stakeholders: sentiment is not modeled. Resident satisfaction ≥ 65 (unit-weighted) and the 55 floor.
  if (h.length < 12) {
    out.push({ id: 8, name: "Stakeholders", status: "not modeled", detail: `${h.length} of 12 months closed.` });
  } else {
    const last2 = h[h.length - 1];
    const units = state.communities.map((c) => c.units);
    const total = units.reduce((a, b) => a + b, 0);
    const avgRs = state.communities.reduce((a, c, i) => a + (last2.rs[c.id] ?? 0) * units[i], 0) / total;
    const floorStreak = worstStreak(state, (id, idx) => h[idx].rs[id] < 55);
    const ok = avgRs >= 65 && floorStreak < 2;
    out.push({ id: 8, name: "Stakeholders", status: ok ? "met" : "not met",
      detail: `Resident satisfaction ${avgRs.toFixed(1)} (target 65); longest run below the 55 floor is ${floorStreak} month(s). Owner sentiment not modeled.` });
  }

  return out;
}

// Longest run of consecutive months where pred holds, over any community or staff member.
function worstStreak(state: GameState, pred: (id: string, idx: number) => boolean): number {
  const ids = [...state.communities.map((c) => c.id), ...state.staff.map((s) => s.id), "assistant"];
  let worst = 0;
  for (const id of ids) {
    let run = 0;
    for (let i = 0; i < state.history.length; i++) {
      run = pred(id, i) ? run + 1 : 0;
      worst = Math.max(worst, run);
    }
  }
  return worst;
}
