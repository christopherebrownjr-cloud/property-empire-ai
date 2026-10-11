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

// Move-out refunds are due 21 days after the move-out (D-032). Move-outs are spread evenly
// across a 30-day close period. A move-out on day d is due on day d + 21, so the share paid in
// the same close is (30 − 21) / 30 = 0.3 and the rest falls due in the next close.
export const REFUND_WINDOW_DAYS = 21;
export const DAYS_PER_CLOSE = 30;
export const REFUND_SAME_CLOSE = Math.max(0, 1 - REFUND_WINDOW_DAYS / DAYS_PER_CLOSE);

export interface DepositFlow {
  id: string;
  movesIn: number;     // new leases this close, by unit share (§17)
  moveOuts: number;    // derived from occupancy: occupied before + move-ins − occupied after
  received: number;    // deposits paid by new residents (move-ins × deposit at current rent)
  refundDue: number;   // deposits of this close's move-outs, now owed back
  refunded: number;    // refunds paid out of the trust this close
  payable: number;     // refunds still owed at the end of this close (refundsPayable)
  held: number;        // deposits owed to current residents after this close (depositHeld)
}

// Security deposits are resident money held in trust. They never enter corporate cash (P0 §2.4).
// Trust cash = held + payable. Only the refunds paid move trust cash out.
export function depositFlow(c: Community, movesIn: number, occupancyAfter: number): DepositFlow {
  const occBefore = c.units * c.occupancy;
  const occAfter = c.units * occupancyAfter;
  const moveOuts = Math.max(0, occBefore + movesIn - occAfter);
  const avgHeld = occBefore > 0 ? c.depositHeld / occBefore : 0;
  const received = movesIn * DEPOSIT_MONTHS * c.avgRent * c.rentIndex;
  const refundDue = moveOuts * avgHeld;
  const refunded = c.refundsPayable + REFUND_SAME_CLOSE * refundDue;   // last close's remainder, plus this close's early share
  const payable = c.refundsPayable + refundDue - refunded;
  return {
    id: c.id, movesIn, moveOuts, received, refundDue, refunded, payable,
    held: c.depositHeld + received - refundDue,
  };
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
