// Ledger and state invariants (P0 §2, §4.2). Checked after each close in tests.
// Returns a list of violations. An empty list means every identity holds.
import { type GameState } from "./engine";
import { RESERVE_DRAW_CAP } from "./ledgers";

const EPS = 1e-6;

export function invariantErrors(state: GameState): string[] {
  const errors: string[] = [];
  if (!Number.isFinite(state.cash)) errors.push("corporate cash is not finite");
  for (const c of state.communities) {
    if (c.ownerTrust < -EPS) errors.push(`${c.id}: owner trust is negative`);
    if (c.reserve < -EPS) errors.push(`${c.id}: owner capital reserve is negative`);
    if (c.depositHeld < -EPS) errors.push(`${c.id}: deposits held are negative`);
    if (c.refundsPayable < -EPS) errors.push(`${c.id}: refunds payable are negative`);
    if (c.feesOwed < -EPS) errors.push(`${c.id}: fees owed are negative`);
    if (c.occupancy < 0 || c.occupancy > 1) errors.push(`${c.id}: occupancy outside 0–100%`);
    if (c.rs < 0 || c.rs > 100) errors.push(`${c.id}: resident satisfaction outside 0–100`);
    if (c.reserveDrawnThisMonth > RESERVE_DRAW_CAP + EPS) errors.push(`${c.id}: reserve draws exceed the cap`);
  }
  for (const s of state.statements) {
    const sum = s.feesSwept + s.reserveTransfer + s.distribution;
    if (s.endingTrust < -EPS) errors.push(`${s.id} ${s.year}-${s.month}: ending trust is negative`);
    if (sum < -EPS) errors.push(`${s.id} ${s.year}-${s.month}: negative outflows`);
  }
  for (const m of state.history) {
    for (const [id, o] of Object.entries(m.occupancy)) {
      if (o < 0 || o > 1) errors.push(`${id} ${m.year}-${m.month}: occupancy outside 0–100% in history`);
    }
  }
  return errors;
}
