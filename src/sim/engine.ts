// Monthly close for the vertical slice (P0 spec v1.9, §2–§3).
// Pure functions: state in, state out. No randomness yet.

import {
  NEW_LEASES_PER_MONTH, OPERATING_COSTS, RENEWALS_PER_MONTH,
  type Community, type Staff,
} from "./opening";

export const ASSISTANT: Staff = {
  id: "assistant",
  name: "Assistant Property Coordinator (hire)",
  role: "Assistant Property Coordinator",
  monthlyCost: 44000 / 12 * 1.22,   // §1.4 hire scenario, burdened
  workload: 52.8,                   // §4.3 resident service, moved off the coordinator (assumption)
  capacity: 100,
  burnout: 0,
};

// Decision and model constants with their spec sources.
export const DECISION = {
  collectionsPushRecovery: 2000,   // §3.5 recovers up to $2,000 per use
  collectionsPushRsCost: 2,        // §3.5 RS −2 in each month the push is active
  collectionsPushDelinquencyCut: 0.005, // §3.2 −0.5 pt
  brakeRsThreshold: 60,            // D-031: brake applies below 60
  rentCapFreeOfRs: 3,              // §3.8 renewal increases above 3% cost RS
  askStep: 50,                     // dashboard step for asking rent
  increaseStep: 0.01,              // dashboard step for renewal increase
  leasingEffect: 0.04 * 70 / 100,  // §3.2 pinned opening leasing score 70
  serviceEffect: 0.03 * (60 - 50) / 50, // §3.2 pinned opening service score 60
  pGapSlope: 0.10,                 // §3.2 P_gap
};

export interface GameState {
  year: number;
  month: number;             // 1–12
  monthsElapsed: number;     // 0 at opening
  cash: number;
  revolverLimit: number;
  communities: Community[];
  staff: Staff[];
  assistantHired: boolean;
  history: MonthRecord[];    // one per closed month, for the scorecard
  lastResult?: MonthResult;
}

export interface CommunityResult {
  id: string;
  name: string;
  occupancy: number;
  collectedRent: number;
  delinquency: number;
  fee: number;
  collectionsFee: number;
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
  runwayMonths: number | null;   // §3.5 opening cash ÷ monthly burn; null = cash-positive
}

// What each month leaves behind, for the scorecard.
export interface MonthRecord {
  year: number;
  month: number;
  occupancy: Record<string, number>;
  rs: Record<string, number>;
  burnout: Record<string, number>;
  expenses: number;
  cash: number;
}

// §3.2 season term by calendar month.
export function seasonFor(month: number): number {
  if (month <= 3) return -0.01;
  if (month <= 6) return 0.01;
  if (month <= 9) return 0.01;
  return -0.01;
}

export function workloadFor(state: GameState, staffId: string): number {
  const base = state.staff.find((s) => s.id === staffId);
  if (!base) return 0;
  if (staffId === "coordinator" && state.assistantHired) return base.workload - ASSISTANT.workload;
  return base.workload;
}

export function utilization(state: GameState, staffId: string): number {
  const s = state.staff.find((x) => x.id === staffId);
  if (!s) return 0;
  return workloadFor(state, staffId) / s.capacity;   // §3.2, SkillFit and Morale 1.0 at opening
}

export function staffAll(state: GameState): Staff[] {
  return state.assistantHired ? [...state.staff, ASSISTANT] : state.staff;
}

export function serviceQuality(state: GameState): number {
  return Math.max(0.6, Math.min(1, 1 - 0.4 * Math.max(0, utilization(state, "coordinator") - 1)));
}

// Share of the portfolio's monthly renewals and new leases that fall in each community (§17).
function leaseShare(c: Community, totalUnits: number) {
  const share = c.units / totalUnits;
  return { newLeases: NEW_LEASES_PER_MONTH * share, renewals: RENEWALS_PER_MONTH * share };
}

// §3.2 P_gap: asking above market reduces occupancy.
export function pGap(c: Community): number {
  return DECISION.pGapSlope * Math.max(0, c.askRent / c.avgRent - 1);
}

// §3.2 delinquency rate.
export function delinquency(c: Community): number {
  const push = c.pushThisMonth ? DECISION.collectionsPushDelinquencyCut : 0;
  return 0.035 + 0.001 * Math.max(0, 60 - c.rs) - push;
}

// Brake (D-031): the collections push is blocked below RS 60.
export function canRunCollectionsPush(c: Community): boolean {
  return c.rs >= DECISION.brakeRsThreshold;
}

export function computeMonth(state: GameState): MonthResult {
  const totalUnits = state.communities.reduce((a, c) => a + c.units, 0);
  const results: CommunityResult[] = state.communities.map((c) => {
    const rent = c.avgRent * c.rentIndex;
    const billed = rent * c.units * c.occupancy;
    const collected = billed * (1 - delinquency(c));
    const fee = Math.max(c.feePct * collected, c.minFee);          // §1.5 minimum
    const collectionsFee = c.pushThisMonth ? c.feePct * DECISION.collectionsPushRecovery : 0; // D-009 fee share
    const share = leaseShare(c, totalUnits);
    const leasingFee = share.newLeases * c.newLeaseFee + share.renewals * c.renewalFee;
    return {
      id: c.id, name: c.name, occupancy: c.occupancy, collectedRent: collected,
      delinquency: delinquency(c), fee, collectionsFee, leasingFee,
      revenue: fee + collectionsFee + leasingFee, rs: c.rs,
    };
  });
  const revenue = results.reduce((a, r) => a + r.revenue, 0);
  const expenses = staffAll(state).reduce((a, s) => a + s.monthlyCost, 0)
    + OPERATING_COSTS.reduce((a, o) => a + o.amount, 0);
  const net = revenue - expenses;
  const cashAfter = state.cash + net;
  return {
    year: state.year, month: state.month, communities: results, revenue, expenses, net, cashAfter,
    runwayMonths: net < 0 ? state.cash / -net : null,
  };
}

// Advance one month: post the close, then roll occupancy, rent, resident satisfaction, and burnout.
export function advanceMonth(state: GameState): GameState {
  const result = computeMonth(state);
  const totalUnits = state.communities.reduce((a, c) => a + c.units, 0);
  const q = serviceQuality(state);                 // §3.2 service quality (before this month's roll)
  const serviceScore = Math.max(0, Math.min(100, 60 * q));  // §3.2 ServiceScore, no cuts or investments in the slice
  const season = seasonFor(state.month);

  const communities = state.communities.map((c) => {
    const share = leaseShare(c, totalUnits);
    // Occupancy: moves 35% of the gap toward target (§3.2).
    const target = c.baseOcc + DECISION.leasingEffect + DECISION.serviceEffect - pGap(c) + season;
    const occupancy = c.occupancy + 0.35 * (target - c.occupancy);
    // Renewals reprice the rent base at this month's increase (§3.8).
    const rentIndex = c.rentIndex * (1 + c.renewalIncrease * share.renewals / c.units);
    // Renewal RS cost: 0.5 per point above 3%, per renewal, scaled to 100 units (§3.8).
    const pointsAbove = Math.max(0, c.renewalIncrease * 100 - DECISION.rentCapFreeOfRs);
    const renewalRsCost = 0.5 * pointsAbove * (100 / c.units) * share.renewals;
    const pushRsCost = c.pushThisMonth ? DECISION.collectionsPushRsCost : 0;
    // RS(t+1) = RS + 0.2(SS−60) + 0.5(60−RS) − event terms (§3.2).
    const rs = Math.max(0, Math.min(100,
      c.rs + 0.2 * (serviceScore - 60) + 0.5 * (60 - c.rs) - renewalRsCost - pushRsCost));
    return { ...c, occupancy, rentIndex, rs, pushThisMonth: false };
  });

  const staff = state.staff.map((s) => ({
    ...s,
    // Burnout: B(t+1) = clamp(0, 100, B + 20(U − 0.90)) (§3.2).
    burnout: Math.max(0, Math.min(100, s.burnout + 20 * (utilization(state, s.id) - 0.9))),
  }));

  const nextMonth = state.month === 12 ? 1 : state.month + 1;
  const nextYear = state.month === 12 ? state.year + 1 : state.year;
  const record: MonthRecord = {
    year: state.year, month: state.month,
    occupancy: Object.fromEntries(communities.map((c) => [c.id, c.occupancy])),
    rs: Object.fromEntries(result.communities.map((r) => [r.id, r.rs])),
    burnout: Object.fromEntries(staffAll(state).map((s) => [s.id, s.burnout])),
    expenses: result.expenses,
    cash: result.cashAfter,
  };
  return {
    ...state,
    year: nextYear, month: nextMonth, monthsElapsed: state.monthsElapsed + 1,
    cash: result.cashAfter, communities, staff,
    history: [...state.history, record],
    lastResult: result,
  };
}

export function hireAssistant(state: GameState): GameState {
  return { ...state, assistantHired: true };
}

// Decisions: each returns the new state, or the same state if the decision is not allowed.
export function setAskRent(state: GameState, id: string, askRent: number): GameState {
  return { ...state, communities: state.communities.map((c) => (c.id === id ? { ...c, askRent } : c)) };
}

export function setRenewalIncrease(state: GameState, id: string, increase: number): GameState {
  const inc = Math.max(0, increase);
  return { ...state, communities: state.communities.map((c) => (c.id === id ? { ...c, renewalIncrease: inc } : c)) };
}

// Turns the collections push on for the next close, unless the brake applies (D-031).
export function toggleCollectionsPush(state: GameState, id: string): GameState {
  return {
    ...state,
    communities: state.communities.map((c) => {
      if (c.id !== id) return c;
      if (c.pushThisMonth) return { ...c, pushThisMonth: false };
      return canRunCollectionsPush(c) ? { ...c, pushThisMonth: true } : c;
    }),
  };
}
