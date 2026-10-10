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
**Decision:** The vertical slice and tuning baseline use market-rate residential management in Sacramento: three communities, 132 units, one coordinator, one founder-CEO, three management contracts, and two prospects. Twelve-month success criteria and outcome tiers are defined in P0 spec §1.  
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
