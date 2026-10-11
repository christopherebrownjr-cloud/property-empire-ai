// Monthly close for the vertical slice (P0 spec v1.9, §2–§3).
// Pure functions: state in, state out. No randomness yet.
//
// Money flows (P0 §2):
//   Resident rent and collections recoveries post to each community's Owner Trust.
//   Fees and leasing income accrue to the company at the close and are swept from the
//   Owner Trust in the following month. A shortfall stays owed by the owner (feesOwed).
//   Owner distributions leave the Owner Trust after the sweep, above the minimum reserve.
//   Corporate cash changes by sweeps received less expenses paid (cash basis).
//   P&L revenue and net are accrual figures for the close, as in P0 §1.4.

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

export const DECISION = {
  collectionsPushRecovery: 2000,        // §3.5 recovers up to $2,000 per use
  collectionsPushRsCost: 2,             // §3.5 RS −2 in each month the push is active
  collectionsPushDelinquencyCut: 0.005, // §3.2 −0.5 pt
  brakeRsThreshold: 60,                 // D-031: brake applies below 60
  rentCapFreeOfRs: 3,                   // §3.8 renewal increases above 3% cost RS
  askStep: 50,                          // dashboard step for asking rent
  increaseStep: 0.01,                   // dashboard step for renewal increase
  leasingEffect: 0.04 * 70 / 100,       // §3.2 pinned opening leasing score 70
  serviceEffect: 0.03 * (60 - 50) / 50, // §3.2 pinned opening service score 60
  pGapSlope: 0.10,                      // §3.2 P_gap
};

// ASSUMPTION (not in the spec): minimum Owner Trust balance kept before distributions.
// The spec says distributions go out "if reserve minimum is met" but gives no amount.
export const MIN_TRUST_RESERVE = 0;

export interface GameState {
  year: number;
  month: number;             // 1–12
  monthsElapsed: number;     // 0 at opening
  cash: number;              // corporate operating cash
  revolverLimit: number;
  communities: Community[];
  staff: Staff[];
  assistantHired: boolean;
  history: MonthRecord[];    // one per closed month, for the scorecard
  statements: OwnerStatement[];  // one per community per closed month (P0 §2.5)
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
  revenue: number;         // accrual, P0 §1.4
  expenses: number;
  net: number;             // accrual, P0 §1.4
  cashAfter: number;       // corporate cash after this close (cash basis)
  sweepsReceived: number;  // fee sweeps from Owner Trusts this close
  runwayMonths: number | null; // §3.5 opening cash ÷ monthly burn; null = cash-positive
}

// Owner statement for one community and one close (P0 §2.5).
export interface OwnerStatement {
  id: string;
  year: number;
  month: number;
  collectedRent: number;
  recoveries: number;      // collections push recoveries posted to the trust
  feesAccrued: number;     // fees and leasing income charged this close
  feesSwept: number;       // paid to the company from the trust this close
  feesOwedAfter: number;   // still owed to the company after the sweep (shortfall)
  distribution: number;    // paid to the owner this close
  endingTrust: number;
}

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
  return {
    year: state.year, month: state.month, communities: results, revenue, expenses, net,
    cashAfter: state.cash, sweepsReceived: 0,
    runwayMonths: net < 0 ? state.cash / -net : null,   // §3.5
  };
}

// Opening leasing score 70 and service score 60 are pinned (§3.2).
const OCC = { leasingEffect: DECISION.leasingEffect, serviceEffect: DECISION.serviceEffect };

// Advance one month: post the close, run the trust ledgers, then roll occupancy, rent, RS, burnout.
export function advanceMonth(state: GameState): GameState {
  const pnl = computeMonth(state);
  const totalUnits = state.communities.reduce((a, c) => a + c.units, 0);
  const season = seasonFor(state.month);
  const serviceScore = Math.max(0, Math.min(100, 60 * serviceQuality(state)));  // §3.2, no cuts or investments in the slice

  // --- Trust ledgers (P0 §2): receipts, fee sweep, owner distribution, statement, fee accrual. ---
  let sweepsTotal = 0;
  const statements: OwnerStatement[] = [];
  const ledgered = state.communities.map((c, i) => {
    const r = pnl.communities[i];
    const recovered = c.pushThisMonth ? DECISION.collectionsPushRecovery : 0;
    let trust = c.ownerTrust + r.collectedRent + recovered;               // resident receipts post to the trust
    const sweep = Math.min(Math.max(0, trust), c.feesOwed);               // day 5 sweep, capped at trust balance
    trust -= sweep;
    const owedAfterSweep = c.feesOwed - sweep;                             // shortfall stays owed by the owner
    const distribution = Math.max(0, trust - MIN_TRUST_RESERVE);          // day 15 distribution
    trust -= distribution;
    const feesOwed = owedAfterSweep + r.revenue;                           // this close's fees accrue to the company
    sweepsTotal += sweep;
    statements.push({
      id: c.id, year: state.year, month: state.month,
      collectedRent: r.collectedRent, recoveries: recovered, feesAccrued: r.revenue,
      feesSwept: sweep, feesOwedAfter: feesOwed, distribution, endingTrust: trust,
    });
    return { ...c, ownerTrust: trust, feesOwed };
  });

  // Corporate cash: sweeps received less expenses paid (cash basis).
  const cashAfter = state.cash + sweepsTotal - pnl.expenses;

  // --- Operating roll (P0 §3.2) ---
  const communities = ledgered.map((c) => {
    const share = leaseShare(c, totalUnits);
    const target = c.baseOcc + OCC.leasingEffect + OCC.serviceEffect - pGap(c) + season;
    const occupancy = c.occupancy + 0.35 * (target - c.occupancy);          // 35% of gap per month
    const rentIndex = c.rentIndex * (1 + c.renewalIncrease * share.renewals / c.units);
    const pointsAbove = Math.max(0, c.renewalIncrease * 100 - DECISION.rentCapFreeOfRs);
    const renewalRsCost = 0.5 * pointsAbove * (100 / c.units) * share.renewals;   // §3.8
    const pushRsCost = c.pushThisMonth ? DECISION.collectionsPushRsCost : 0;     // §3.5
    const rs = Math.max(0, Math.min(100,
      c.rs + 0.2 * (serviceScore - 60) + 0.5 * (60 - c.rs) - renewalRsCost - pushRsCost));  // §3.2
    return { ...c, occupancy, rentIndex, rs, pushThisMonth: false };
  });

  const staff = state.staff.map((s) => ({
    ...s,
    burnout: Math.max(0, Math.min(100, s.burnout + 20 * (utilization(state, s.id) - 0.9))),  // §3.2
  }));

  const nextMonth = state.month === 12 ? 1 : state.month + 1;
  const nextYear = state.month === 12 ? state.year + 1 : state.year;
  const record: MonthRecord = {
    year: state.year, month: state.month,
    occupancy: Object.fromEntries(communities.map((c) => [c.id, c.occupancy])),
    rs: Object.fromEntries(pnl.communities.map((r) => [r.id, r.rs])),
    burnout: Object.fromEntries(staffAll(state).map((s) => [s.id, s.burnout])),
    expenses: pnl.expenses,
    cash: cashAfter,
  };
  return {
    ...state,
    year: nextYear, month: nextMonth, monthsElapsed: state.monthsElapsed + 1,
    cash: cashAfter, communities, staff,
    history: [...state.history, record],
    statements: [...state.statements, ...statements],
    lastResult: { ...pnl, cashAfter, sweepsReceived: sweepsTotal },
  };
}

export function hireAssistant(state: GameState): GameState {
  return { ...state, assistantHired: true };
}

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
