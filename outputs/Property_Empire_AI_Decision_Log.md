# Property Empire AI — Decision Log

| ID | Decision | Status | Rationale / design consequence |
|---|---|---|---|
| D-001 | Story begins in Sacramento, California | Approved / locked | Provides a specific launch market with local identity, believable early relationships, and room for later city expansion. |
| D-002 | Player chooses the starting specialization on a new save | Approved / locked | Creates replayability and distinct opening economics while preserving later diversification. |
| D-003 | World uses real-world-inspired cities with fictional firms, companies, developers, cities, and banks | Approved / locked | Supports realism and recognizable context without binding the game to real institutions or implying endorsement. |
| D-004 | Major conversations use a hybrid of authored conversation and strategic options | Approved / locked | Preserves character, story, and player agency; choices must change commitments, relationships, timing, or risk. |
| D-005 | Presentation prioritizes a professional corporate dashboard with selective visual office and property scenes | Approved / locked | Keeps the simulation information-rich while using scenes for emotional emphasis and milestone moments. |
| D-006 | Target difficulty is Realistic CEO | Approved / locked | The intended challenge comes from interconnected business pressures, transparent causality, and meaningful recovery—not arbitrary punishment. |

## Realistic CEO definition

Realistic CEO must model cash flow, payroll, contract competition, financing underwriting, credible occupancy and expense pressures, employee capacity and burnout, inspections/compliance, and reputation. Failure may include lost contracts, restructuring, refinancing pressure, leadership turnover, or asset sales. The player must receive understandable signals, see the causes of deterioration, and retain plausible recovery paths. Full game over is reserved for sustained insolvency or an explicitly chosen hard-stop condition.

## Board review record

The requested multidisciplinary design-board review was completed across creative direction, game systems, economy/finance, operations/compliance, narrative/characters, UX/accessibility, technical production, and business/ethical design.

### Consensus findings

- The concept’s strongest differentiator is the combination of business simulation, human leadership, housing operations, and a visible organizational world.
- The largest design risk is scope: too many business lines and entities could create a broad but shallow game.
- The largest realism risk is accounting ambiguity between corporate revenue, client funds, property performance, and cash timing.
- The largest player-experience risk is dashboard overload and opaque failure.
- The largest ethical risk is rewarding harmful housing outcomes as the easiest path to growth.

### Approved priorities before implementation

1. Lock the first specialization vertical slice.
2. Separate the corporate and property/client accounting model.
3. Specify Realistic CEO rules, visibility, and recovery.
4. Define the core entity and event model.
5. Design the minimum viable dashboard around decisions, not reports.
6. Add lender identities, contract structures, staffing capacity, compliance escalation, and first-year recovery arcs before expanding to a full enterprise.

## Change-control rule

Any future change to a locked decision must be recorded here with a new entry, the date, the reason, affected systems, and whether existing design material must be revised. Implementation work should reference the latest approved master document and this log.

## D-007 — Full design-board recommendations accepted

**Status:** Approved  
**Date:** 2026-10-10  
**Decision:** Incorporate all recommendations from the multidisciplinary studio design-board review into the approved blueprint.  
**Scope:** Creative direction, gameplay systems, economic/accounting realism, operations and compliance, narrative, UX/accessibility, technical production, and ethical housing design.  
**Implementation interpretation:** All recommendations are in scope, but remain staged through P0, P1, and P2 so the first playable version stays focused and testable.  
**Quality bar:** Systems must be legible, causally connected, economically credible, recoverable after failure, and respectful of residents and housing stakeholders.


## D-008 — Vertical slice uses market-rate residential management

**Status:** Proposed — pending owner approval (P0 lock review)  
**Date:** 2026-10-10  
**Decision:** The vertical slice and tuning baseline use market-rate residential management in Sacramento: three communities, 132 units, one coordinator, one founder-CEO, three management contracts, and one prospect (L-01). Twelve-month success criteria and outcome tiers are defined in P0 spec §1.  
**Reason:** Monthly leasing and collections give the fastest feedback, and fee economics and compliance load are simplest, so cash, staffing, and reputation systems can be tested first.  
**Affected systems:** Opening state, contracts, staffing, lenders (two in slice), success criteria.  
**Existing material revised:** Master GDD §13 (P0 status line added). D-002 is unchanged: new saves still let the player choose any specialization.  
**Source:** `outputs/Property_Empire_AI_P0_Design_Locks.md` §1

## D-009 — Corporate and client/property funds are separate ledgers

**Status:** Proposed — pending owner approval (P0 lock review)  
**Date:** 2026-10-10  
**Decision:** Seven ledger types are kept separate: Corporate Operating, Owner Trust (per community), Security Deposit Trust (per community), Owner Capital Reserve (restricted), Receivables, Payables (corporate and owner tagged separately), and Debt and Credit. The company may never spend trust funds outside the scheduled fee sweep. Management fees are recognized at month close even when cash is not yet collected. Pass-through items are recorded gross in trust and are never company revenue.  
**Reason:** Prevents the accounting ambiguity identified by the design board. Makes profitability and liquidity visibly different.  
**Affected systems:** Finance screen, owner statements, covenants, lender underwriting, reputation (Trust Violation penalties), event log.  
**Existing material revised:** None. This implements GDD §12 (Economy and finance).  
**Source:** P0 spec §2

## D-010 — Realistic CEO formulas, visibility tiers, and recovery ladder

**Status:** Proposed — pending owner approval (P0 lock review)  
**Date:** 2026-10-10  
**Decision:** Realistic CEO is implemented through documented formulas for occupancy, collections, staffing and burnout, bid odds, and lender approval, with no hidden multipliers. Information is tiered as Exact, Band, or Signal. Random events have warning signals about 60% of the time. Distress runs from Level 0 (Stable) through Level 5 (Insolvency), and every level has a non-destructive lever. The default hard stop is insolvency only; a stop-loss threshold is opt-in.  
**Reason:** Realistic CEO is defined as demanding, legible, causal, and recoverable (D-006). The formulas make each cause visible.  
**Affected systems:** Simulation core, dashboard "why" breakdowns, bid screen, lender review, reputation, save format (distress state, RNG seed).  
**Existing material revised:** None. Consistent with the D-006 definition.  
**Source:** P0 spec §3

## D-011 — Core entity and event model

**Status:** Proposed — pending owner approval (P0 lock review)  
**Date:** 2026-10-10  
**Decision:** The core entities are company, employee, community, unit, resident cohort (aggregate in the slice), contract, owner, lender, covenant, vendor, city, work order, inspection, prospect or bid, event, ledger, ledger entry, and decision card. Ledger entries are append-only, corrections are reversals, time advances in monthly ticks with day-level cash events, and the save carries a `schema_version`.  
**Reason:** Gives the simulation a shared vocabulary and supports deterministic replay, testing, and balancing.  
**Affected systems:** Save format, event log, every screen, the tuning tool.  
**Existing material revised:** None.  
**Source:** P0 spec §4

## D-012 — Vertical-slice dashboard organized around decisions

**Status:** Proposed — pending owner approval (P0 lock review)  
**Date:** 2026-10-10  
**Decision:** The slice has seven screens: Executive Snapshot, Decision Inbox, Communities, People, Contracts and Pipeline, Finance, and Relationships. Each screen answers one question and supports a short, named list of decisions. Interfaces are exception-first, explain every number, and never rely on color alone. The Strategy screen is deferred to P2.  
**Reason:** Addresses the dashboard-overload risk identified by the design board. Keeps the player a CEO making decisions rather than an analyst reading reports.  
**Affected systems:** UI, navigation, decision-card format, event consequences.  
**Existing material revised:** None.  
**Source:** P0 spec §5

## D-013 — P0 spec v0.2 revisions

**Status:** Proposed — pending owner approval (P0 lock review)  
**Date:** 2026-10-10  
**Decision:** Revise the Proposed D-008 to D-012 as follows. The owner delegated these choices ("You choose"). None changes a locked decision.

1. D-008: L-02 (Folsom lease-up, 72 units) is removed from the slice and deferred to P2. The slice has one prospect, L-01. Criterion 5 counts L-01 or a new lead.
2. D-009: The opening P&L applies a 3.5% collection loss, so fees are on collected rent. Opening net is −$247/month, and the business is cash-negative from opening. The post-hire net is −$4,720/month, with about 10 months of runway.
3. D-009: The founder draw stays an operating expense (conservative).
4. D-010: The Cinder Hollow trigger stays at two consecutive months below 90%. Success criterion 4 changes to match.
5. D-010: Criterion 3 is counted per owner.
6. D-010: The non-destructive lever rule holds for Levels 0–3. Levels 4 and 5 spell out their options, and forced-choice cards are marked destructive.
7. D-010: Opening inputs are pinned (LeasingScore 70, ServiceScore 60, October season −0.01). Occupancy bases are recalibrated to Larkspur 0.91, Stillwater 0.92, and Cinder Hollow 0.88. The unit-weighted opening portfolio is 93.1%.
8. D-011/D-012: Resident-facing consequences for turnover, cost cutting, safety work orders, and fair-housing complaints are added (P0 spec §3.8). These address the ethics-reviewer's blocking items B1–B4.
9. D-007 approval evidence: GDD §15 records the owner's acceptance of all board recommendations. D-007's text is not changed.

**Source:** `outputs/Property_Empire_AI_P0_Design_Locks.md` v0.2, §7 and §3.8

## D-014 — P0 spec v0.3: ethics re-review fixes

**Status:** Proposed — pending ethics re-review and owner approval  
**Date:** 2026-10-10  
**Decision:** Revise the Proposed P0 spec to v0.3 in response to the ethics re-review (Hold on v0.2). Changes:

1. Criteria 3 and 6 must hold in every month. Criterion 8 gets a per-community resident-satisfaction floor of 55 (§1.7, §3.9).
2. Outcome tiers: Stable and Promising require criterion 6 and the resident criteria. A criterion 6 failure caps the outcome at Struggling (§1.7).
3. Resident satisfaction gets an opening value of 60, an explicit monthly formula, and named drivers. ServiceScore is linked to staffing and cuts (§3.2).
4. Collections push lists permitted and forbidden actions. Its effect matches the formula (−0.5 pt) (§3.5).
5. Company-initiated turnover nets the company a loss, and appears as avoidable turnover on the owner statement (§3.8).
6. "Critical safety" is defined as a list. Life-safety repairs cannot be deferred for cash. Failed inspections open critical orders (§3.8).
7. Fair-housing response: Investigate has an adverse branch, Dismiss carries a probability and window, the event cost is not double-counted, and retaliation is covered (§3.4, §3.8).

**Open:** ServiceScore has no upside above 60 (a service-improvement lever is needed in v0.4). All legal items remain owner-verification items.  
**Reason:** The ethics reviewer's binding Hold on v0.2 (D-013 context) must be resolved before any approval.  
**Affected systems:** Success criteria, outcome tiers, resident satisfaction, staffing and service, collections, turnover, safety, fair housing, owner statements.  
**Existing material revised:** None outside the P0 spec and GDD status line. No locked decision (D-001 to D-007) changed.  
**Source:** `outputs/Property_Empire_AI_P0_Design_Locks.md` v0.3, §8

## D-015 — P0 spec v0.4: auditor and ethics fixes, service upside, legal figures

**Status:** Proposed — pending ethics re-review, auditor recheck, and owner approval  
**Date:** 2026-10-10  
**Decision:** Revise the Proposed P0 spec to v0.4. Changes:

1. RS formula includes every RS effect in §3.4 and §3.8. Renewal credit is removed, so renewals at or below 3% are neutral (§3.2).
2. Criterion 3 is split: monthly trust test, and a separate per-owner statement test (§1.7).
3. Criterion 8 floor and §3.9 use the same test: two consecutive month-end readings below 55 (§1.7, §3.9).
4. Failed inspections open critical orders only with a life-safety finding (§3.8). This supersedes D-014 item 6; D-014 is not edited.
5. Renewal increases: legal cap formula, notice periods, RS cost per point above 3%, market check (§3.8, §10).
6. Settlement gives no RS credit. Only verified correction does. Open complaints carry a monthly RS drag. Investigate has a 40% adverse probability (provisional). Retaliation has a confirmation rule (§3.8).
7. Neglect: critical penalty per order. Non-critical cap removed. Compliance records reduce city reputation. Owner refusal has defined options. Resident-initiated move-outs are modeled (§3.8).
8. Service investment lever added: −$1,500/month corporate per tier, +5 ServiceScore per tier, up to three tiers (+15) (§3.2, §3.5). Full investment costs $4,500/month.
9. RS appears on Executive Snapshot and Communities (§5.2).
10. Tier precedence: Distressed over Struggling. 6 or 7 criteria with RS below 65 is Struggling. Numeric sentiment tiers added (§1.7, §3.8).
11. Same-cycle rule defined as 12 months (§3.8).
12. Legal figures added in §10 from web sources. They are not verified statute text. The rent cap is 5% plus CPI capped at 10%, not a flat 5%.

**Open:** RS and probability balance; owner verification of §10; Promising and the floor (owner decision); affordability of service tiers (owner decision).  
**Reason:** The ethics re-review returned Hold and the auditor returned FAIL on v0.3. The owner chose the service-upside lever and asked for web-checked legal figures.  
**Affected systems:** Resident satisfaction, staffing and service, turnover, collections, safety, fair housing, owner sentiment, success criteria, outcome tiers, screens.  
**Existing material revised:** None outside the P0 spec. No locked decision (D-001 to D-007) changed.  
**Source:** `outputs/Property_Empire_AI_P0_Design_Locks.md` v0.4, §8 to §10

**Owner decisions recorded after v0.4 (D-015 addendum, 2026-10-10):**
- Service investment: three tiers stack at $1,500/month each, +5 ServiceScore per tier (kept).
- Promising now also requires no §3.9 floor breach (owner choice; the spec previously left this open).
- Legal items: parked by the owner. §10 remains unverified. The 5-day mailing add-on was removed because it is not a notice-statute rule.

## D-016 — P0 spec v0.5: owner decisions and ethics Hold fixes

**Status:** Proposed — pending ethics re-review, auditor recheck, and owner approval  
**Date:** 2026-10-10  
**Decision:** Owner answers to the v0.4 Hold: (1) for a refused life-safety repair, the company uses the owner's capital reserve up to $5,000 per repair, with owner notice within 24 hours; (2) re-letting after a company non-renewal is capped at the renewal limit, with a reason code; (3) the rent-increase cap is cumulative over 12 months; (4) service tiers stay at three ($4,500/month at full investment, which depends on financing). The v0.5 revisions to the spec then address the remaining ethics blockers B1, B2, B4, and B5 and required changes R1–R10 (P0 spec §3.8, §3.9, §11). No locked decision (D-001 to D-007) changed.  
**Reason:** The ethics re-review of v0.4 returned Hold.  
**Affected systems:** Safety, reserves, re-letting, rent increases, fair housing, city reputation, bids, outcome tiers, owner sentiment, floor card.  
**Source:** `outputs/Property_Empire_AI_P0_Design_Locks.md` v0.5, §3.8, §3.9, §11

## D-017 — Critical safety repairs are mandatory; reserve authority widened

**Status:** Proposed — pending ethics re-review, auditor recheck, and owner approval  
**Date:** 2026-10-10  
**Decision:** The owner chose, in answer to the v0.5 review, that critical safety repairs are mandatory. The company has no decline option. Repairs up to $5,000 may be funded from the owner's Capital Reserve with owner notice within 24 hours. Above $5,000 the company advances the repair and bills the owner. This widens D-016, which covered only refused repairs, and so it is logged separately. Also chosen: Dismiss is removed from fair-housing complaints; the floor card's Accept option stays with a recurring cost; verified correction must be independent. No locked decision (D-001 to D-007) changed.  
**Reason:** The ethics re-review of v0.5 returned Hold on the permissive repair wording and the cheapest-path fair-housing option.  
**Affected systems:** Owner Capital Reserve, critical safety, fair housing, floor card, verification, owner sentiment, costs and payers table (§2.6).  
**Source:** `outputs/Property_Empire_AI_P0_Design_Locks.md` v0.6, §3.8, §3.9, §2.6, §12

**Note on D-010 (auditor):** D-010 says every distress level has a non-destructive lever. P0 §3.5 limits that to Levels 0–3; Levels 4 and 5 can force destructive choices. D-010 is not edited, and this entry records the qualification.

## D-018 — P0 spec v0.7: owner decisions on the v0.6 Hold; re-letting scope

**Status:** Proposed — pending ethics re-review, auditor recheck, and owner approval  
**Date:** 2026-10-10  
**Decision:** Owner decisions on the v0.6 ethics Hold: (1) fair-housing complaints get Investigate only; Settle is removed; (2) verification of repairs and corrections is by a third-party inspector engaged and paid by the company, never the repairing vendor or an owner-affiliated party; (3) the floor card's Accept option is removed; (4) the default critical safety list is approved (§3.8 glossary). Recorded here for the first time, since they are owner decisions:  
- **Re-letting scope (unlogged change, flagged for owner confirmation):** D-016 capped re-letting at the renewal limit with a reason code, and only after a company non-renewal. Spec v0.5 onward applies a cap of prior rent plus the cap to every avoidable move-out for 12 months, with no reason code in that rule. Avoidable move-outs include above-market renewals, increases above 3%, and any move-out in a month when RS is below 50. D-018 supersedes D-016 on re-letting scope, and supersedes D-017's Accept option and its verification wording. The owner should confirm this scope or narrow it back to D-016.  
**Reason:** The ethics re-review of v0.6 returned Hold on Settle as the cheapest route, unverified closures, retaliation loopholes, and the freeze bypass through non-renewal.  
**Affected systems:** Fair housing, verification, floor card, critical safety list, re-letting, avoidable turnover.  
**Source:** `outputs/Property_Empire_AI_P0_Design_Locks.md` v0.7, §3.8, §3.9, §13

**D-018 addendum (v0.8, 2026-10-10):** the v0.7 changes not previously logged are: the floor card blocks company non-renewals; closure requires verification; the repair funding order (reserve, then revolving line, then corporate cash, with the repair always proceeding); the retaliation test predates the complaint; the market check is per renewal. These are now superseded in part by D-019.

## D-019 — P0 spec v0.8: scope move to P1 and floor-card brake

**Status:** Proposed — pending ethics re-review, auditor recheck, and owner approval  
**Date:** 2026-10-10  
**Decision:** The owner chose two things in answer to the v0.7 Hold: (1) fair-housing complaint outcomes, retaliation, community flags, and the verifier panel, rotation, and audit rules move out of P0 and into P1. The slice keeps a complaint placeholder with an Investigate option only. (2) The floor card's brake applies from the first month-end below 60: company non-renewals, renewals above 3%, collections push, discretionary cuts, and staff hour or layoff cuts are blocked in that community until RS is 60 or higher. The card closes at 60.  
**Reason:** Reviews of v0.2 through v0.7 kept finding new routes in the complaint, retaliation, and verification mechanics. Moving them to P1 removes the routes from the slice until those rules can be designed and reviewed on their own.  
**Affected systems:** Fair housing, retaliation, verification, the RS and city-reputation formulas, outcome tiers (community flag removed from the slice), the floor card, cost-cutting levers.  
**Consequence:** The slice does not model fair-housing outcomes. Nothing in the slice may present itself as complete for fair housing. Legal review (§10) is required before P1 designs these rules.  
**Source:** `outputs/Property_Empire_AI_P0_Design_Locks.md` v0.8, §3.8, §3.9, §14

**Note (v0.9, 2026-10-10):** the opening net of −$247 in D-008 and D-013 carries the leasing-allocation caveat in P0 spec §12 (about −$400 a month if renewal income is overstated). D-019's scope note on fair housing also applies to the Stable tier in §1.7.

## D-020 — P0 spec v0.9: simplified slice

**Status:** Proposed — pending ethics re-review, auditor recheck, and owner approval  
**Date:** 2026-10-10  
**Decision:** The owner chose to simplify the slice to its core rules in answer to the v0.8 Hold. Changes: (1) third-party verification of repair closures is removed from the slice and deferred to P1; completion is company-recorded. (2) City-ordered repairs are not modeled in the slice (P1). (3) Company-initiated non-renewals are removed from the slice. (4) Discretionary cuts and staff hour or layoff cuts are removed from the slice. (5) The brake covers renewals above 3% and the collections push, from RS below 60, released at 62 (a band that prevents flipping at 60). (6) Per-defect funding; the funding step from the reserve is capped at $5,000 per defect, and corporate cash may go below zero at step 3.  
**Known risk (accepted by the owner's choice, to be confirmed):** critical repairs close on the company's own completion record. The ethics reviewer has flagged this as a resident-safety route. The owner should reverse (1) if verification must stay in the slice.  
**Reason:** Reviews of v0.2 through v0.8 kept finding new routes in verification, city orders, layoffs, non-renewals, and cuts. Removing those mechanics from the slice removes the routes.  
**Affected systems:** Repair completion, verification (P1), city orders (P1), non-renewal, cuts and layoffs (P1), brake, funding, criterion 6 closures.  
**Source:** `outputs/Property_Empire_AI_P0_Design_Locks.md` v0.9, §15

## D-021 — P0 spec v1.0: verification restored; brake and defect fixes

**Status:** Proposed — pending ethics review, auditor recheck, and owner approval  
**Date:** 2026-10-10  
**Decision:** The owner chose to restore independent verification in the slice. This withdraws the known risk recorded in D-020 item 1. Each critical repair needs one third-party inspector's sign-off, engaged and paid by the company. The inspector may not be the repairing vendor or owner-affiliated. Panel, rotation, and sampling audit are P1. Also in v1.0: contract sale and layoffs are not offered in the slice; the brake adds above-market renewals and releases at RS 62, with the floor card also closing at 62; reserve draws are capped at $5,000 per community per 30 days, with one work order per defect; owner-request options are listed with their effects.  
**Reason:** The ethics review of v0.9 returned Hold on company-recorded completion (a safety route), layoffs and sale in Level 4, unbraked above-market renewals, the defect-splitting route, and unlisted owner-request options.  
**Supersedes:** D-020 item 1 (company-recorded completion); D-020 item 6 (per-defect $5,000 reserve cap, replaced by a per-community 30-day cap); D-019 card-close-at-60 (now 62).  
**Affected systems:** Critical repairs, criterion 6, compliance records, costs and payers (§2.6), Level 4, brake, floor card, reserve, owner requests.  
**Source:** `outputs/Property_Empire_AI_P0_Design_Locks.md` v1.0, §16

## D-022 — P0 opening P&L baseline reconciled (v1.1)

**Status:** Proposed — pending ethics review, auditor recheck, and owner approval  
**Date:** 2026-10-10  
**Decision:** The owner chose the reconciled baseline for the opening P&L. The new-lease fee is unit-weighted across the three contracts ($345 across six leases). Renewal fees ($150 × 4) apply only where the contract has them, which excludes Cinder Hollow's unit share. Opening revenue is $15,435; the opening net is −$402/month; the post-hire net is about −$4,875/month; runway after the first hire is about 9.8 months; founder-as-distribution is +$3,598/month. These figures supersede the −$247 headline in D-008 and D-013, which are not edited.  
**Reason:** The §12 reconciliation found that the blended fees overstated renewal income by about $155 a month. The owner chose to use the contract-accurate figures rather than keep the overstated headline.  
**Affected systems:** Opening P&L (§1.4), runway and the hire scenario, the founder-draw treatment, and any balance tests that use the opening cash position.  
**Source:** `outputs/Property_Empire_AI_P0_Design_Locks.md` v1.1, §1.4 and §17

## D-023 — P0 spec v1.2: owner decisions on the v1.0 Hold

**Status:** Proposed — pending ethics re-review, auditor recheck, and owner approval  
**Date:** 2026-10-10  
**Decision:** Owner decisions: (1) non-critical work-order closures are vendor-recorded and confirmed by the simulation. They do not count for the readiness checklist or the owner-sentiment gate, and they clear the RS driver. Floor-card drivers count as cleared under the same rules. (2) The brake covers above-market new-lease asks as well as renewals, from RS below 60, until RS is 62 or higher. (3) The verifier-structure risk in D-021 is accepted as a documented owner override. Applied from the review in v1.2: rejected sign-offs leave the order open, a rejected inspector may not be re-engaged on that order, company-affiliated firms are excluded, the inspector fee is paid inside the repair's funding step, defect IDs are assigned by the simulation, the reserve cap is rolling 30 days, critical items are excluded from owner requests, and the complaint placeholder never shows as resolved.  
**Residual risk (owner override):** the company engages and pays the critical-repair inspector. This structural conflict is mitigated only by P1 panel and rotation. It is accepted for the slice.  
**Reason:** The ethics review of v1.0 returned Hold on non-critical closures as a company-recorded route, the brake gap on new-lease asks, and verification detail.  
**Affected systems:** Closures, readiness checklist, sentiment gate, brake, owner requests, verification, reserve cap, complaint placeholder.  
**Source:** `outputs/Property_Empire_AI_P0_Design_Locks.md` v1.2, §18


## D-024 — P0 spec v1.3: owner answers to open items; names; residual risk

**Status:** Proposed — pending ethics re-review, auditor recheck, and owner approval  
**Date:** 2026-10-10  
**Decision (owner answers):**
1. Renewal volume: 4 a month across the portfolio. The §3.8 example is recomputed (Larkspur about 1.9 renewals a month; a sustained 6% increase settles RS near 51). The 12.5-point figure is withdrawn.
2. Owner and lender reputation: display only in the slice. No update rule until P1.
3. Reserve shortfall: the company absorbs it from corporate cash, even below zero. Finance sizes the revolving line and cash buffer so this is rare.
4. Sentiment values approved: +2 for an approved owner request, −2 for a decline, −5 for a company-funded overrun above $5,000 per defect.
5. Inspector fee ($350): the company pays on every engagement, including rejected sign-offs.
6. Sign-off standard: an on-site functional test per defect class (§3.8).
7. Affiliation: shared ownership, management, or staff with the company, the vendor, or the owner; subcontracting or referral from the vendor; repeat work for the same vendor. Each engagement logs an attestation.
8. Readiness: the 50% failure reduction requires every critical order verified closed.
9. Names: placeholder names renamed to invented names. Communities: Larkspur Court, Stillwater Terrace, Cinder Hollow Flats. Owners: Quillmark Hollow Holdings, Veridian Gate Partners, Ostrava Pine Realty Trust. Lenders: Kestrel Harbor Bank, Lumenfall Credit Partners. Prospects: Brindlewood Residential Fund, Halcyon Crest Developers. Vendors: Pellmere Ledger Services, Orison Turn Services, Marrow Peak Handyworks. Employee: Ilse Varrin. The historical entries in D-008 through D-023 are updated for names only; their decisions are unchanged.
10. Game figures: §10 is fictional game values, not legal guidance and not a statement of California law. The sources listed there are background only and were not verified.

**Residual risk (owner override, restated):** The company engages and pays the critical-repair inspector. The routes this allows are: a defect is signed off by an inspector who did not properly test it, and the hazard persists while residents bear it. The slice does not model reopen probability, so a false closure costs nothing in play. Criterion 6 and the readiness checklist can both be met on closures alone, and a player can reach Stable without the inspector ever failing a job. The on-screen label is "company-engaged inspector sign-off," not "verified." The reversal condition is that P1 panel and rotation are designed and in place before any P1 release. The owner is the decision-maker.  
**Open:** the brake release at RS 62 is reachable only with two service tiers (equilibrium 64). With one tier the equilibrium is 62 and is never reached. Systems-designer to rebalance, or the owner chooses another release value.  
**Reason:** The owner answered the open items. The ethics review of v1.2 and the auditor recheck returned Hold and FAIL on the sign-off standard, fee payer, affiliation, readiness rule, and the residual-risk disclosure.  
**Affected systems:** Verification, inspector fee, readiness, reputation, reserve funding, renewal example, §10, names.  
**Source:** `outputs/Property_Empire_AI_P0_Design_Locks.md` v1.3, §19

**D-024 addendum (v1.3 audit):** the inspector fee is company-paid on every engagement, including rejected sign-offs. This supersedes the funding-step wording in D-023. The sentiment gate reads "deferred maintenance" as open orders only: a vendor-completed non-critical order is closed and is not deferred, but it does not count toward readiness or as an inspector-signed closure. That reading is the spec author's interpretation of owner answer 8 and D-023; the owner should confirm it.

## D-025 — P0 spec v1.4: owner accepts the residual-risk list; certification and affiliation rules

**Status:** Proposed — pending ethics re-review and auditor recheck. The owner's acceptance below is recorded; D-024 remains Proposed until the re-review.  
**Date:** 2026-10-10  
**Owner decisions:**
1. The owner accepts the expanded residual-risk list in full:
   - **Critical-inspector route:** the company engages and pays the inspector. A defect can be signed off without a proper test, and the hazard persists while residents bear it. The slice does not model reopen probability, so a false closure costs nothing in play. Criterion 6 and the readiness checklist can both be met on closures alone, and a player can reach Stable without the inspector ever failing a job.
   - **Non-critical route:** vendor-recorded closures clear the RS driver and the floor-card drivers, can release the brake at RS 62, and reduce failure chance through the 0.02 non-critical term. These closures are not inspector-signed.
   - **Competence gap:** closed by the certification rule below.
   - **Reversal condition:** P1 panel and rotation, a competence rule, and reopen modeling are all in place before any P1 release. The owner is the decision-maker.
2. Inspector qualification: a recognised trade certification for the defect class (a game rule). Real-world licensing requirements are for the owner to verify.
3. Affiliation: a 12-month look-back for repeat work, in both directions. The inspector signs a per-engagement attestation, and the simulation checks it against the affiliation roster.

**Reason:** The ethics review of v1.3 returned Hold on the incomplete residual-risk disclosure, the "verified" wording, the competence gap, and the one-directional affiliation rule.  
**Affected systems:** Inspector sign-off, affiliation, certification, residual-risk disclosure, §10 labelling.  
**Source:** `outputs/Property_Empire_AI_P0_Design_Locks.md` v1.4, §20

## D-026 — P0 spec v1.5: owner answers to the v1.4 ethics Hold

**Status:** Proposed — pending ethics re-review and auditor recheck  
**Date:** 2026-10-11  
**Owner decisions:**
1. Rejections carry only the fee. A rejected sign-off costs the company its fee, and no compliance record is added. The open order keeps its resident-facing penalty.
2. Certifications by defect class (game rule): heat — HVAC technician; water — plumber; gas — gas fitter; electrical — electrician; locks — locksmith; sewage — plumber (drain specialist); pests — licensed pest control operator; fire safety — fire protection technician. Engagement is blocked on a mismatch or an expired certification, and the attempt is logged. Real licensing requirements are for the owner to verify.
3. The eight classes are the complete life-safety list for the slice. Anything else is non-critical.
4. The affiliation roster is company-maintained, updated when a firm joins, and checked on each engagement. A failed check blocks the engagement and is logged.

**Reason:** The ethics review of v1.4 returned Hold on the rejection incentive, the missing certification mapping and entities, the affiliation rule's direction and roster, the residual-risk section's placement in the spec body, the Stable scope note, and statute citations in §10.  
**Affected systems:** Sign-off, rejections, certifications, affiliation, entities (§4.1), residual risks (§3.10), §1.7 scope note, §10, and the sources file.  
**Source:** `outputs/Property_Empire_AI_P0_Design_Locks.md` v1.5, §21

**D-025 addendum (v1.5):** the competence gap is closed for the slice by the certification rule in §3.8, which is a game rule. D-025's P1 reversal condition now lists a formal competence review as a P1 item. This reconciles the two statements.

## D-027 — P0 spec v1.6: re-engagement cap, company repeat work, allowlist, inspector pool

**Status:** Proposed — pending ethics re-review and auditor recheck  
**Date:** 2026-10-11  
**Owner decisions:**
1. At most two inspector engagements per order. After two rejections the order stays open at its full penalty.
2. Company repeat work counts for affiliation: an inspector the company has engaged repeatedly in the 12-month look-back is affiliated with the company.

**Applied from the review:** only allowlisted firms with a current dated attestation may be engaged; subcontract, referral, and repeat-work ties are derived from the simulation's logs; company entry is limited to dated ownership, management, and staff; one 12-month look-back for every tie type, in both directions, checked at engagement and at sign-off; "repeat work" is defined; a false attestation is a logged compliance event and blocks the firm; a fictional inspector pool with test cases (§4.2).

**Reason:** The ethics review of v1.5 returned Hold on unlimited re-engagement, the unrecorded-firm bypass, the affiliation time basis and definition, company dependence, and the missing pool.  
**Affected systems:** Sign-off, engagements, affiliation, roster, inspector pool, compliance events.  
**Source:** `outputs/Property_Empire_AI_P0_Design_Locks.md` v1.6, §22

**D-025 correction (v1.6):** the D-025 addendum's statement that the competence gap is "closed" is superseded. The game-level certification rule is in place (§3.8). Whether it matches real competence is open and is listed in the §3.10 reversal condition.

## D-028 — P0 spec v1.7: owner answers to the v1.6 Hold

**Status:** Proposed — pending ethics re-review and auditor recheck  
**Date:** 2026-10-11  
**Owner decisions:**
1. Two inspector firms per defect class (eight firms in total, §4.5).
2. A rejected inspector may not sign the same order again. This restores the v1.2 rule that v1.6 had dropped without a log entry.
3. After two rejections on a critical order, an owner decision card opens. The order stays open at full penalty. The owner chooses vendor rework followed by a new order (counted against the cap separately), or accepting the open penalty.
4. Repeat work means two or more completed engagements in the 12-month look-back, for vendor and company ties.

**Corrections applied:** the duplicate §4.2 is renumbered §4.5, and the roster reference points to §4.1. Pool expiries are game values set to 2028, pending owner confirmation of the game year.  
**Reason:** The ethics review of v1.6 returned Hold on an unclosable critical order after two rejections, the single-firm pool, the same-inspector loophole, and repeat-work ambiguity. The auditor found the unlogged restoration of the same-inspector rule and the duplicate section number.  
**Affected systems:** Engagements, cap, inspector pool, affiliation, owner decision cards.  
**Source:** `outputs/Property_Empire_AI_P0_Design_Locks.md` v1.7, §23

