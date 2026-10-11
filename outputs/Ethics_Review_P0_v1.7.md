# Ethics review: P0 spec v1.7 (commit 4c3c1ff)

**Verdict: HOLD.** Binding under the ethics-reviewer role. Only the owner can override it.
Sources reviewed: P0 spec v1.7, D-006, D-017, D-021 to D-028, GDD §3 and §12.
This file records the reviewer's findings as received. It is not a legal opinion, and no legal rule is asserted here.

## Why it is held

The inspector sign-off system creates a closure path with two loopholes:

1. **Rework-then-reorder resets pressure.** Order 1 opens. Two firms each reject once, costing only the fee. Rework, then order 2. The same firms are eligible again, because the bar applies to "that order" only. Order 2 gets fresh engagement slots, and its 14-day clock starts from its own open date. The RS penalty, the compliance record, and criterion 6 all restart. A cycle that closes inside 14 days never triggers any of them. A pass on order 2 is a sign-off from a firm that already failed the same defect.
2. **"Accept the open penalty" is an owner-ordered deferral.** §3.8 says a critical repair must be repaired and an owner cannot order deferral (D-017). Accepting the open penalty contradicts that without any log entry. One critical order open past 14 days settles RS near 50 at ServiceScore 60, below the 55 floor.

## Blocking items

- **B1.** Key the cap, the same-inspector bar, the 14-day clock, criterion 6's age, and the sentiment trigger to the defect ID, not the work order. Give rework and engagement durations in days.
- **B2.** Remove "accept the open penalty" for life-safety orders, or record an owner amendment to D-017 with the resident cost. If no eligible firm exists, show the earliest eligible date and the RS consequence.
- **B3.** One definition of repeat work for vendor and company ties. "Engaged" (D-027) and "completed" (D-028) give opposite results. Define engagement and completion, and state whether rejections, cancellations, and no-shows count.
- **B4.** Pool coverage. The eight firms cover four pairs of classes, so a heat surge consumes the electrical firms too. Give each class its own firms, or at least three per pair. Size the pool against modeled incidence. Add test cases for pool exhaustion, shared-pair depletion, re-engagement after rework, and cancel-before-test.
- **B5.** No pass/fail rule and no visible "no eligible inspector" state. State that any unmet criterion or unperformed test is a rejection. Count cancellations and no-shows. Show each firm's blocking reason on Communities and the Decision Inbox.
- **B6.** Attestation "current" and "dated" have no window. Set one as a game value with its driver. Define the roster-level and per-engagement attestations and how they relate.
- **B7.** Company-entered ownership, management, and staff ties are trusted. Either move them into per-engagement attestations cross-checked against derived ties, or list the gap in §3.10 as an accepted residual risk.
- **B8.** Hazard list completeness is an owner decision with no recorded basis. Candidates for the owner to consider: carbon monoxide exposure; structural failures (stairs, railings, balconies); loss of hot water; whether "fire safety" covers smoke and CO alarms. Any omitted class goes into §3.10.

## Status of the v1.6 items

| # | Item | Status in v1.7 |
|---|---|---|
| 1 | Unclosable after two rejections; pass/fail rule | Not closed (B1, B2, B5) |
| 2 | Owner-chosen rules written | Partly (the accept option and the reset loophole remain) |
| 3 | Repeat-work threshold | Partly (threshold clear; definition conflicts, B3) |
| 4 | Affiliation party scope | Partly (no derived source for owner ties) |
| 5 | Company-entered ties trusted | Not closed (B7) |
| 6 | Attestation freshness | Not closed (B6) |
| 7 | Pool coverage | Not closed (B4) |
| 8 | Hazard list completeness | Owner item open (B8) |
| 9 | Visible "no eligible inspector" state | Not closed (B5) |

## Suggestions (non-blocking)

- Owner decision card: show each option's RS path, criterion-6 effect, and sentiment effect in the explain-this layer.
- Separate "repair not done" from "repair done, sign-off not obtained" in the open-penalty text.
- Log owner-referred or owner-engaged firms as derived ties.
- State the game-year mapping for the 2028 expiries.
- Record the D-017 position explicitly in D-028.

## Limits

- RS and pool figures are the reviewer's arithmetic from the spec's own formulas. Systems-designer should check them.
- Not reviewed in this pass: §10 legal items, P1 items, and the RS 62 brake release (still open in the spec).
- Certification mapping, temperature and pressure thresholds, and hazard completeness are owner-verify items.

## Owner override

The owner may override this Hold. If you do, record the override in the Decision Log, listing each accepted blocking item as a residual risk, in the same form as D-025.
