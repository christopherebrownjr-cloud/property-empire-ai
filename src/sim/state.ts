import { OPENING_CASH, OPENING_COMMUNITIES, OPENING_MONTH, OPENING_STAFF, REVOLVER_LIMIT } from "./opening";
import { computeMonth, type GameState } from "./engine";
import { DEPOSIT_MONTHS } from "./ledgers";

// Opening state. Fees accrued in the opening month are owed to the company and are swept
// on the first close (P0 §2.2). That opening receivable is set to one month of accrued
// income, so the opening cash position is consistent with the approved P&L.
export function newGame(): GameState {
  const base: GameState = {
    year: OPENING_MONTH.year,
    month: OPENING_MONTH.month,
    monthsElapsed: 0,
    cash: OPENING_CASH,
    revolverLimit: REVOLVER_LIMIT,
    communities: OPENING_COMMUNITIES.map((c) => ({ ...c })),
    staff: OPENING_STAFF.map((s) => ({ ...s })),
    assistantHired: false,
    history: [],
    statements: [],
  };
  const accrued = computeMonth(base).communities;
  return {
    ...base,
    communities: base.communities.map((c, i) => ({
      ...c,
      feesOwed: accrued[i].revenue,
      // Deposits held for the occupied units at opening (P0 §2.1). Resident money, not company cash.
      depositHeld: c.units * c.occupancy * c.avgRent * DEPOSIT_MONTHS,
    })),
  };
}
