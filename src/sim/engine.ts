// Monthly close for the vertical slice (P0 spec v1.9, §2–§3).
// Pure functions: state in, state out. No randomness in this milestone.

import {
  COLLECTION_FACTOR, NEW_LEASES_PER_MONTH, OPERATING_COSTS, RENEWALS_PER_MONTH,
  type Community, type Staff,
} from "./opening";

export interface GameState {
  year: number;
  month: number;            // 1–12
  monthsElapsed: number;    // 0 at opening
  cash: number;
  revolverLimit: number;
  communities: Community[];
  staff: Staff[];
  assistantHired: boolean;
  lastResult?: MonthResult;
}

export interface CommunityResult {
  id: string;
  name: string;
  occupancy: number;
  collectedRent: number;
  fee: number;
  leasingFee: number;
  revenue: number;
  rs: number;
}

export interface MonthResult {
  year: number;
  month: number;
  communities: CommunityResult[];
  revenue: number;
  expenses: number;
  net: number;
  cashAfter: number;
  runwayMonths: number | null;   // null = cash-positive
}

// §3.2 season term by calendar month.
export function seasonFor(month: number): number {
  if (month <= 3) return -0.01;   // Q1
  if (month <= 6) return 0.01;    // Q2
  if (month <= 9) return 0.01;    // Q3
  return -0.01;                   // Q4
}

// §4.3 task weights: the slice uses resident service and owner-independent tasks.
// Assistant hire takes resident service off the coordinator (assumption, see HANDOFF.md).
export function workloadFor(state: GameState, staffId: string): number {
  const base = state.staff.find((s) => s.id === staffId);
  if (!base) return 0;
  if (staffId === "coordinator" && state.assistantHired) return base.workload - 52.8;
  if (staffId === "assistant") return 52.8;
  return base.workload;
}

export function utilization(state: GameState, staffId: string): number {
  const s = state.staff.find((x) => x.id === staffId);
  if (!s) return 0;
  return workloadFor(state, staffId) / s.capacity;   // §3.2, SkillFit and Morale at opening = 1.0
}

function leasingSplit(c: Community, totalUnits: number) {
  const share = c.units / totalUnits;
  const newLeases = NEW_LEASES_PER_MONTH * share;
  const renewals = RENEWALS_PER_MONTH * share;
  return {
    leasingFee: newLeases * c.newLeaseFee + renewals * c.renewalFee,
  };
}

export function computeMonth(state: GameState): MonthResult {
  const totalUnits = state.communities.reduce((a, c) => a + c.units, 0);

  const results: CommunityResult[] = state.communities.map((c) => {
    const collectedRent = c.avgRent * c.units * c.occupancy * COLLECTION_FACTOR;
    const pct = c.feePct * collectedRent;
    const fee = Math.max(pct, c.minFee);                 // §1.5 monthly minimum
    const { leasingFee } = leasingSplit(c, totalUnits);
    return {
      id: c.id, name: c.name, occupancy: c.occupancy, collectedRent, fee,
      leasingFee, revenue: fee + leasingFee, rs: c.rs,
    };
  });

  const revenue = results.reduce((a, r) => a + r.revenue, 0);
  const staffCost = state.staff.reduce((a, s) => a + s.monthlyCost, 0)
    + (state.assistantHired ? ASSISTANT.monthlyCost : 0);
  const operating = OPERATING_COSTS.reduce((a, o) => a + o.amount, 0);
  const expenses = staffCost + operating;
  const net = revenue - expenses;
  const cashAfter = state.cash + net;
  return {
    year: state.year, month: state.month, communities: results, revenue, expenses, net,
    cashAfter, runwayMonths: net < 0 ? state.cash / -net : null,   // §3.5: opening cash ÷ monthly burn
  };
}

export const ASSISTANT = {
  id: "assistant",
  name: "Assistant Property Coordinator (hire)",
  role: "Assistant Property Coordinator",
  monthlyCost: 44000 / 12 * 1.22,   // §1.4 scenario, burdened
  workload: 52.8,
  capacity: 100,
  burnout: 0,
} as const;

// Opening leasing score 70 and service score 60 (§3.2 pinned inputs).
const OCC = { leasingEffect: 0.04 * 70 / 100, serviceEffect: 0.03 * (60 - 50) / 50 };

// Advance one month: post the close, then roll occupancy, resident satisfaction, and burnout.
export function advanceMonth(state: GameState): GameState {
  const result = computeMonth(state);
  const next: GameState = {
    ...state,
    cash: result.cashAfter,
    monthsElapsed: state.monthsElapsed + 1,
    month: state.month === 12 ? 1 : state.month + 1,
    year: state.month === 12 ? state.year + 1 : state.year,
    lastResult: result,
  };
  // Occupancy moves 35% of the gap toward target each month (§3.2). Target uses the
  // pinned opening occupancy minus the season term, so the opening state is stable.
  next.communities = state.communities.map((c) => {
    const target = c.baseOcc + OCC.leasingEffect + OCC.serviceEffect + seasonFor(next.month);
    return { ...c, occupancy: c.occupancy + 0.35 * (target - c.occupancy) };
  });
  // RS: ServiceScore = clamp(0,100, 60*Q - 5*cuts + 5*investments); slice has no cuts or investments.
  const coordU = utilization(next, "coordinator");
  const q = Math.max(0.6, Math.min(1, 1 - 0.4 * Math.max(0, coordU - 1)));
  const ss = Math.max(0, Math.min(100, 60 * q));
  next.communities = next.communities.map((c) => ({
    ...c, rs: Math.max(0, Math.min(100, c.rs + 0.2 * (ss - 60) + 0.5 * (60 - c.rs))),
  }));
  // Burnout: B(t+1) = clamp(0, 100, B + 20 * (U - 0.90)) (§3.2).
  next.staff = state.staff.map((s) => ({
    ...s, burnout: Math.max(0, Math.min(100, s.burnout + 20 * (utilization(next, s.id) - 0.9))),
  }));
  return next;
}

export function hireAssistant(state: GameState): GameState {
  return { ...state, assistantHired: true };
}
