// Security Deposit Trust and Owner Capital Reserve (P0 §2.1, §2.4, §3.8; D-016, D-030).
// Pure helpers used by the monthly close in engine.ts. No corporate cash moves here.

import type { Community } from "./opening";

// ASSUMPTION (not in the spec): a deposit equals one month's rent. §10 sets the return
// timing (21 days) but gives no amount. Owner to confirm.
export const DEPOSIT_MONTHS = 1;

// ASSUMPTION (not in the spec): the owner funds a reserve of $5,000 per community, equal to
// the default emergency draw authority in D-030. Owner to confirm per contract.
export const RESERVE_TARGET = 5000;

// §3.8 and D-016: reserve draws per community are capped at $5,000 in any rolling 30 days.
// The slice closes monthly, so the window is approximated by the current close period.
export const RESERVE_DRAW_CAP = 5000;

// Owner Capital Reserve: the required transfer from the Owner Trust, after the fee sweep,
// that brings the reserve up to target. Limited by what the trust holds.
export function reserveTransfer(c: Community, trustAfterSweep: number): number {
  const need = Math.max(0, RESERVE_TARGET - c.reserve);
  return Math.min(need, Math.max(0, trustAfterSweep));
}

export interface DepositFlow {
  id: string;
  movesIn: number;     // new leases this close, by unit share (§17)
  moveOuts: number;    // derived from occupancy: occupied before + move-ins − occupied after
  received: number;    // deposits paid by new residents (move-ins × deposit at current rent)
  refunded: number;    // deposits returned to move-outs, at the average held per occupied unit
  held: number;        // Security Deposit Trust balance after this close
}

// Security deposits are resident money held in trust. They never enter corporate cash (P0 §2.4).
// Refunds are shown at the close they occur in. The 21-day return window is not split across closes.
export function depositFlow(c: Community, movesIn: number, occupancyAfter: number): DepositFlow {
  const occBefore = c.units * c.occupancy;
  const occAfter = c.units * occupancyAfter;
  const moveOuts = Math.max(0, occBefore + movesIn - occAfter);
  const avgHeld = occBefore > 0 ? c.depositHeld / occBefore : 0;
  const received = movesIn * DEPOSIT_MONTHS * c.avgRent * c.rentIndex;
  const refunded = moveOuts * avgHeld;
  return { id: c.id, movesIn, moveOuts, received, refunded, held: c.depositHeld + received - refunded };
}

// A reserve draw (P0 §3.8): one cause, one work order, capped per window. Covers what the
// reserve and the cap allow. The remainder is not funded here; the contract terms decide it (D-030).
export function drawReserve(c: Community, amount: number): { community: Community; covered: number; remainder: number } {
  const requested = Math.max(0, amount);
  const capLeft = Math.max(0, RESERVE_DRAW_CAP - c.reserveDrawnThisMonth);
  const covered = Math.min(requested, capLeft, c.reserve);
  return {
    community: { ...c, reserve: c.reserve - covered, reserveDrawnThisMonth: c.reserveDrawnThisMonth + covered },
    covered,
    remainder: requested - covered,
  };
}
