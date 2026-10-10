# Property Empire AI — P0 Design Locks

**Status:** Proposed — pending owner review and approval (GDD §14: no implementation until P0 locks are approved)
**Date:** 2026-10-10 (v1.3: revisions recorded as D-013 to D-024)
**Governing documents:** Master Game Design Document §13 (P0 list); Decision Log D-001 to D-007 (locked, not changed here)
**Scope:** Design specification only. No code, data pipelines, or deployment.
**Logged as:** D-008 to D-025 in the Decision Log (D-013 v0.2, D-014 v0.3, D-015 v0.4, D-016 v0.5, D-017 v0.6, D-018 v0.7, D-019 v0.8, D-020 v0.9, D-021 v1.0, D-022 v1.1, D-023 v1.2, D-024 v1.3, D-025 v1.4).

| P0 item (GDD §13) | Section | Decision Log |
|---|---|---|
| 1. First specialization: opening portfolio, staff, contracts, 12-month success criteria | §1 | D-008 |
| 2. Accounting model separating corporate operations from client/property funds | §2 | D-009 |
| 3. Realistic CEO formulas, information visibility, recovery rules | §3 | D-010 |
| 4. Core entity model | §4 | D-011 |
| 5. Vertical-slice dashboard and the decisions each screen supports | §5 | D-012 |

All dollar figures, rates, and coefficients are **illustrative starting values for balancing**, not final commitments. Company, owner, lender, vendor, and employee names are placeholders and must be fictional (D-003).

---

## 1. Vertical slice: first specialization (P0-1)

### 1.1 Specialization chosen for the slice

**Market-rate residential management.** It has the fastest feedback loop (leasing and collections resolve monthly), the clearest fee economics, and the lightest compliance overhead, so cash, staffing, and reputation systems can be tested first.

D-002 is unchanged. New saves still let the player choose any of the five specializations. The slice is the tuning baseline and the first-playable scenario.

### 1.2 Opening portfolio (Sacramento region, 132 units, 3 communities)

| Community | City | Units | Avg rent | Opening occupancy | Owner | Monthly fee (opening, collected) |
|---|---|---|---|---|---|---|
| Larkspur Court Apartments | Sacramento (Midtown) | 64 | $1,780 | 93.4% | Quillmark Hollow Holdings | $6,161 |
| Stillwater Terrace | Rancho Quillmark | 40 | $1,950 | 94.4% | Veridian Gate Partners | $3,908 |
| Cinder Hollow Flats | Elk Grove | 28 | $1,650 | 90.4% | Ostrava Pine Realty Trust | $2,821 |

Fee calculations use collected rent, which assumes 3.5% delinquency (§3.2, multiply by 0.965): Occupancy uses the pinned §3.2 values (93.4%, 94.4%, 90.4%). Larkspur 6.0% × ($1,780 × 64 × 0.934) × 0.965 = $6,161; Stillwater 5.5% × ($1,950 × 40 × 0.944) × 0.965 = $3,908; Cinder Hollow 7.0% × ($1,650 × 28 × 0.904) × 0.965 = $2,821.

### 1.3 Opening staff

| Role | Holder | Burdened monthly cost | Capacity | Starting burnout | Notes |
|---|---|---|---|---|---|
| Founder-CEO | Player | $4,000 draw | 100 pts | 35 | Owner reporting, inspections, work-order escalations, bids |
| Leasing & Resident Coordinator | Placeholder: Ilse Varrin | $5,287 ($52,000 ÷ 12 × 1.22) | 100 pts | 20 | Resident service for all units, leasing, renewals |
| Bookkeeping | Outsourced vendor (placeholder: Pellmere Ledger Services) | $1,200 | n/a | n/a | Monthly close support |
| Maintenance vendor pool | Orison Turn Services; Marrow Peak Handyworks (placeholders) | Per-job billing | n/a | n/a | Work orders billed to owner trust |

Opening staff have Morale 100 and SkillFit 1.0. The utilization figures in §4.4 depend on these values.

**Opening pressure:** The coordinator starts near capacity (utilization ≈ 0.97). The founder has spare capacity (≈ 0.66). The first real staffing decision is whether to add an assistant before the coordinator burns out.

### 1.4 Opening corporate P&L (monthly, illustrative)

| Line | Amount |
|---|---|
| Management fees, collected (three communities) | $12,890 |
| Leasing and renewal fees (new-lease $345.45 unrounded = (64×$350 + 40×$300 + 28×$400) ÷ 132, × 6 = $2,072.73; renewals $150 × 4 × 104/132 = $472.73, excluding Cinder Hollow, which has no renewal fee) | $2,545 |
| **Total corporate revenue** | **$15,435** |
| Founder draw | $4,000 |
| Leasing & Resident Coordinator | $5,287 |
| Bookkeeping | $1,200 |
| Software and systems | $900 |
| Office (small Midtown suite) | $1,600 |
| Insurance (general liability, E&O, fidelity bond) | $1,350 |
| Marketing and listings | $700 |
| Legal and professional reserve | $400 |
| Miscellaneous | $400 |
| **Total corporate expenses** | **$15,837** |
| **Net corporate operating result** | **−$402** |

**Opening cash:** $48,000 corporate operating cash. Undrawn $30,000 revolving line (Kestrel Harbor Bank).

**Realism check:** The business is cash-negative from opening, at about −$402/month once the 3.5% collection loss is applied. Adding one $44,000 assistant ($44,000 ÷ 12 × 1.22 = $4,473.33/month) moves the result to about −$4,875/month, which leaves about 9.8 months of runway at $48,000. Every hire is a visible tradeoff. The leasing-fee allocation is reconciled in v1.1 (§17). The founder draw is treated as an operating expense (conservative); treating it as a distribution would move the opening result to about +$3,598/month.

### 1.5 Opening contracts and pipeline

| ID | Contract | Term | Fee model | Key terms | Decision point in slice |
|---|---|---|---|---|---|
| C-01 | Larkspur Court | 24 months | 6.0% of collected rent; $350 per new lease; $150 per renewal | Owner may terminate for convenience with 90 days' notice after month 9 | Early termination risk from month 9 |
| C-02 | Stillwater Terrace | 12 months, auto-renewing | 5.5% of collected rent; $1,200 monthly minimum; $300 per new lease; $150 per renewal | 60-day non-renewal notice | Renewal decision due month 10 |
| C-03 | Cinder Hollow Flats | 24 months | 7.0% of collected rent; $1,500 monthly minimum; $400 per new lease | If occupancy is below 90% for 2 consecutive months, owner may terminate on 30 days' notice | Occupancy trigger is live from month 1 |

| ID | Prospect | Units | Baseline win odds | Bid due | Notes |
|---|---|---|---|---|---|
| L-01 | Brindlewood Residential Fund property, Roseville | 48 | 30% | Month 3 | Standard market-rate management |

L-02 (Halcyon Crest Developers lease-up, Folsom, 72 units, 20% baseline odds) is deferred to P2 and is not in the slice (v0.2). Lease-up work is a different specialization.

### 1.6 Lenders in the slice

| Lender | Product | Terms (starting) | Requirements |
|---|---|---|---|
| Kestrel Harbor Bank | $30,000 revolving line | 9.5% interest | Corporate cash ≥ 1.5 × monthly expenses; aged receivables (over 60 days) ≤ 15% of trailing 3-month billings; no active covenant breach |
| Lumenfall Credit Partners | $60,000 term loan (optional) | 13.5% interest, 10-day decision | Revenue run-rate ≥ $180,000 per year; founder personal guarantee |

The full lender roster (five lenders, P1) is out of scope for the slice.

### 1.7 Twelve-month success criteria

Criterion 3 (trust violations) and criterion 6 must hold in every month, not only at month 12. Criterion 8's floor is checked every month (§3.9). Other tests are measured at month 12 unless stated.

| # | Criterion | Threshold |
|---|---|---|
| 1 | Contracts | All three management agreements active or renewed; zero owner terminations |
| 2 | Liquidity | Corporate cash ≥ 2.0 × monthly corporate expenses; never at Distress Level 3 or above during months 1–12 |
| 3 | Trust integrity | Zero trust-account violations in every month (1–12). Separate test: for each owner, owner statements delivered by day 10 in at least 11 of 12 months |
| 4 | Occupancy | Portfolio 12-month average ≥ 93%; no community below 90% for 2 or more consecutive months (matches the Cinder Hollow termination trigger in C-03) |
| 5 | Growth | At least one new management contract won (L-01 or a new lead) |
| 6 | Compliance | In each of months 1–12, measured at the month-end snapshot: zero missed inspections and zero critical safety work orders open for more than 14 days |
| 7 | Team | No employee at burnout ≥ 85 for 2 or more consecutive months; founder below 85 at month 12 |
| 8 | Stakeholders | At month 12: all three owners at Warm or better sentiment (score 70+) and unit-weighted portfolio resident satisfaction ≥ 65 / 100. Every month: no community below the 55 floor for two consecutive month-end readings (§3.9) |

**Outcome tiers:**

- **Stable:** All 8 criteria met, criterion 3 (trust) and criterion 6 met in every month, and no community breached the §3.9 floor.
- **Promising:** 6 or 7 criteria met, including criteria 3 (trust) and 6 in every month, the resident part of criterion 8 (RS ≥ 65), and no community breaching the §3.9 floor; no Distress Level 3 or above.
- **Struggling:** 4 or 5 criteria met; or 6 or 7 criteria met without the resident part of criterion 8 (RS below 65) or with a §3.9 floor breach; or Distress Level 3 or above reached; or criterion 3 (trust) or criterion 6 failed in any month.
- **Distressed:** 3 or fewer criteria met, or Distress Level 4 or above reached. Distressed takes precedence when both Struggling and Distressed apply.

Struggling and Distressed outcomes continue play under the recovery rules in §3.6. They do not end the game.

**Scope note (D-019):** the slice does not model fair-housing outcomes. Stable does not mean fair-housing compliance was tested.

### 1.8 Out of scope for the slice

Other specializations, lease-up services (including L-02), cross-city expansion, development partnerships, affordable-housing compliance depth, maintenance markup billing, property acquisitions, subdivisions, and office progression are all P2. The slice does not include them.

---

## 2. Accounting model (P0-2)

### 2.1 Ledger separation

Corporate money and client money are kept in separate ledgers. The company may never spend client funds for its own purposes.

| Ledger | Belongs to | Money in | Money out | Corporate may spend it? |
|---|---|---|---|---|
| **Corporate Operating** | Company | Earned management and leasing fees; other company income | Payroll, software, insurance, office, corporate payables | Yes |
| **Owner Trust** (one per community) | Owner, held by company | Resident rent and resident charges; owner deposits | Property payables, owner distributions, scheduled fee sweep to Corporate | Only through the scheduled fee sweep |
| **Security Deposit Trust** (one per community) | Residents, held in trust | Resident security deposits | Refunds; documented deductions only | No |
| **Owner Capital Reserve** (one per community, restricted) | Owner | Required reserve transfers from Owner Trust | Capital and repair spend above the owner's written approval threshold (set per community at onboarding), with owner approval. Exception: reserve draws up to $5,000 per community per rolling 30 days (one cause, one work order), may proceed without approval, with owner notice within 24 hours (§3.8) | No |
| **Receivables** | Company | Fees earned but not yet collected from owner trust (by owner, aged) | Collections | n/a |
| **Payables** | Company and owner (separately tagged) | Bills received | Payments | Corporate payables from Corporate Operating only; property payables from Owner Trust only |
| **Debt and Credit** | Company | Line draws, loan proceeds | Repayments, interest | n/a |

**Property NOI** (net operating income) is a derived owner-level metric. It is not a company ledger. It is calculated from the Owner Trust and shown on community screens.

### 2.2 Revenue recognition

| Revenue type | Recognized when | Cash arrives when | Note |
|---|---|---|---|
| Management fee (percentage) | Month close, on collected rent for the month | Fee sweep, day 5 of the following month, if the Owner Trust holds fee plus minimum reserve | If the trust is short, the fee becomes an owner receivable. Revenue is recognized anyway. |
| Monthly minimum | Month close, when the percentage fee is below the minimum | Same as above | Shortfall is recognized as revenue and billed to the owner |
| New-lease fee | Lease execution | Move-in, or fee sweep | Recognized even if the resident later defaults |
| Renewal fee | Renewal execution | Fee sweep | |
| Pass-through items (utilities billed to residents, vendor invoices paid for the owner) | Never company revenue | n/a | Recorded gross in Owner Trust. Only the fee component is company revenue. |
| Bid and pursuit costs | Expensed when incurred | n/a | No capitalization in the slice |

**Core principle:** Profitability does not equal liquidity. A fee can be earned in March and not collected until April or later. The dashboard must show both.

### 2.3 Cash timing and monthly close

| Day | Event |
|---|---|
| Day of receipt | Resident payments post to Owner Trust (or Security Deposit Trust) |
| Day 1 | Corporate payroll (semi-monthly: day 1 and day 15) |
| Day 5 | Trust reconciliation; scheduled fee sweep to Corporate Operating |
| Day 10 | Owner statements due for the prior month |
| Day 15 | Corporate payroll; owner distributions released if reserve minimum is met |
| Day 25 | Corporate payables run (net-30 terms) |
| Month end | Fee accruals, receivable aging update, covenant test (for lenders with monthly tests) |

### 2.4 Trust integrity rules

1. **No corporate use of trust funds.** Any transfer from Owner Trust or Security Deposit Trust to Corporate Operating outside the scheduled fee sweep is a **Trust Violation**. Effects: owner reputation −15, lender reputation −10, a covenant review, and an entry in the compliance log. The effect cannot be fully reversed. Recovery requires three months of visible correction.
2. **Late or incorrect owner statement:** owner sentiment −3 per occurrence.
3. **Reconciliation exception:** any unexplained trust difference above $0.01 at close must be resolved before day 10. Unresolved exceptions raise the owner's late-statement probability (see §3.2).
4. **Security deposits** are never shown as company cash in any corporate view.

### 2.5 Reports the player can see

- Corporate P&L (monthly)
- 13-week cash forecast, shown as bands (see §3.3)
- Owner statement per community (generated on day 10)
- Trust reconciliation per community
- Receivables aging (0–30, 31–60, 61–90, over 90 days)
- Covenant certificate per lender


### 2.6 Costs and payers (P0)

| Cost | Amount | Payer | Ledger |
|---|---|---|---|
| Turn cost after a move-out | $1,200–$2,500 plus about 25 days' vacancy | Owner | Owner Trust (vacancy lowers the fee base) |
| New-lease fee not earned after an avoidable move-out | $350 (blended) | Company | Lost corporate revenue |
| Fair-housing investigation | About $1,500 | Company | Corporate Operating |
| Critical repair, reserve draw (up to $5,000 per community per 30 days) | Per defect | Owner | Owner Capital Reserve, then revolving line if the cap is used |
| Critical repair, company-funded remainder | Per defect | Company funds the remainder after steps 1 and 2 (§3.8); billed to owner | Receivable from owner |
| Targeted floor repair | $2,000–$5,000 | Owner | Owner Trust |
| Service investment tier | $1,500 per month per tier | Company | Corporate Operating |
| Inspection-readiness checklist | $300 per month per community | Company | Corporate Operating |
| Independent inspector sign-off per engagement (slice; D-021) | $350 per engagement (placeholder; finance to confirm) | Company | Corporate Operating |

---

## 3. Realistic CEO rules (P0-3)

### 3.1 Design principles

1. **No hidden multipliers.** Every modifier that changes a number appears in that number's "why" breakdown, with its value.
2. **Difficulty comes from interconnection, timing, and variance.** It does not come from numbers that quietly work against the player.
3. **Randomness is bounded and previewed.** Events have warning signals and plausible causes (see §3.5). Each save has a stored RNG seed for replay and debugging. The player does not see the seed.
4. **Failure is gradual and announced.** Each distress level is shown days or weeks before it takes effect when possible.

### 3.2 Core formulas (v0.6)

**Occupancy.** Occupancy moves 35% of the gap toward a target each month.

> Target occupancy = Base + L_eff + S_eff − P_gap − M_pen + Season + noise

| Term | Definition | Starting values |
|---|---|---|
| Base | Market and property-class baseline | Larkspur 0.91; Stillwater 0.92; Cinder Hollow 0.88 |
| L_eff | 0.04 × LeasingScore / 100 | LeasingScore is the leasing function's effective quality, 0–100 |
| S_eff | 0.03 × (ServiceScore − 50) / 50 | Range −0.03 to +0.03 |
| P_gap | 0.10 × max(0, AskRent / MarketRent − 1) | Only asking above market reduces occupancy |
| M_pen | 0.02 × share of work orders aged over 14 days | Maintenance backlog penalty |
| Season | Q1 −0.01; Q2 +0.01; Q3 +0.01; Q4 −0.01 | Turnover seasonality |
| noise | Normal, σ = 0.008 | Bounded by the seed |

Opening inputs are pinned: LeasingScore 70, ServiceScore 60, ResidentSatisfaction 60, opening month October (Season −0.01), no penalties, noise 0. Opening occupancy: Larkspur 0.91 + 0.028 + 0.006 − 0.01 = 93.4%; Stillwater 94.4%; Cinder Hollow 90.4%. The unit-weighted opening portfolio is 93.1%, only 0.1 points above criterion 4, so a player who does nothing will drift below the 93% threshold.

**Collections.**

> Delinquency rate = 0.035 + 0.001 × max(0, 60 − ResidentSatisfaction) − 0.005 × [collections push active]

**Resident satisfaction (RS, v0.4).** Each community has its own RS, 0–100. Opening value 60. Monthly update, measured at month end after every term below:

> RS(t+1) = clamp(0, 100, RS(t) + 0.2 × (ServiceScore − 60) + 0.5 × (60 − RS(t)) − 0.5 × (resident-reported non-critical work orders open over 14 days, per order) − 5 × (critical safety work orders open over 14 days, per order) − 3 × [failed inspection this month] − 0.5 × Σ(renewal increase above 3%, in percentage points, per renewal this month, scaled to 100 units by multiplying by 100 / units) − 0.5 × (renewals priced above market this month, scaled to 100 units) − 2 × [collections push active] − 1 × [missed inspection this month] + 1 × [funded targeted floor repair, drivers cleared, for three months] − one-time terms in the month they occur: 3 for a plumbing or HVAC emergency, 5 for a deposit or owner-trust Trust Violation, 2 for contract termination or transfer; 1 for each avoidable move-out's displaced household, one time; these are one-time)

The first two terms are the service driver and drift back toward 60. Renewals at or below a 3% increase are neutral. Opening state: ServiceScore 60, opening renewals at or below 3%, no events, so RS stays at 60.

**Service score (v0.4).** ServiceScore = clamp(0, 100, 60 × Q_avg − 5 × active discretionary cuts (no cut levers in the slice; term kept for P1) + 5 × active service investments, max +15), where Q_avg is the average service-quality multiplier of staff assigned to the community.  With all three investment tiers, ServiceScore reaches 75 and RS settles near 66, so criterion 8 is reachable. The three tiers cost $4,500 per month, which the opening business cannot afford. Whether criterion 8 is reachable therefore depends on financing, a question for the owner.

**Resident-initiated move-outs (v0.6).** Each unit's monthly move-out probability is 0.01 + 0.002 × max(0, 50 − RS), capped at 5%. Each move-out vacates the unit for about 25 days, which lowers occupancy (§3.8). Avoidable move-outs also carry the re-letting cap, the no-fee rule, and the displacement RS term. The renewal increase cap and notice periods are in §3.8.

**Owner sentiment update (v0.6).** Sentiment(t+1) = clamp(0, 100, S(t) + 1 × [RS ≥ 60, no deferred maintenance, no open critical item] − 2 × [avoidable move-out this month] − 2 × [floor card open] − 5 × [floor trigger this month] − 5 × [defect with company-funded amount above $5,000, or a reserve draw above the 30-day cap that is company-funded, this month]). Tiers are in §3.8.

**City reputation update (v0.6).** CityRep(t+1) = clamp(0, 100, CR(t) + 0.5 × (60 − CR(t)) − 10 × [missed inspection this month] − 2 × open compliance records). Opening value 60. Owner and lender reputation are displayed as numbers in the slice, with no update rule (modeling is P1; D-024). Three or more open compliance records open a lender review; the covenant effect is for finance-designer to define (§1.6). Below 40, bids lose 0.05 win probability (bid table).

**Owner statement timing.** P(late statement) = 0.15 base, plus 0.10 if owner sentiment is Cool or worse, plus 0.10 if a reconciliation exception is open.

**Staffing and burnout.**

| Quantity | Formula |
|---|---|
| Workload W | Sum of task points assigned to the person (see §4.3) |
| Utilization U | W / (Capacity × SkillFit × MoraleFactor), where MoraleFactor = 0.8 + 0.2 × Morale / 100 |
| Service quality multiplier Q | clamp(0.6, 1.0, 1 − 0.4 × max(0, U − 1)) |
| Burnout B | B(t+1) = clamp(0, 100, B(t) + 20 × (U − 0.90)) |
| Monthly turnover risk | 0 if B < 70; otherwise min(0.15, 0.02 + 0.004 × (B − 70)) |

Morale falls 2 points per month while burnout is 70 or above. It recovers 1 point per month while burnout is below 40 and pay is in band. A raise or bonus gives an immediate +5, at a cost.

**Bid win probability.**

> P(win) = clamp(0.05, 0.80, 0.30 + Σ modifiers)

| Modifier | Effect |
|---|---|
| Fee vs. market median | +0.10 if at least 0.5 pt below median; 0 near median; −0.15 if 1.0 pt or more above |
| Comparable managed communities | +0.04 each, maximum +0.12 |
| Reference from a Warm-or-better owner | +0.05 |
| Projected utilization above 1.0 if won | −0.10 |
| Relationship with decision-maker | 0 to +0.10 (from Relationships) |
| Competing bidders beyond three | −0.03 each |
| City reputation below 40 | −0.05 |

Each modifier is shown on the bid screen with its value.

**Lender approval.** Each lender lists its criteria. Each criterion shows pass or fail with the actual number. A loan is approved when every required criterion passes. Pricing rises 0.25% for each soft criterion missed, to a maximum of +2%.

### 3.3 Information visibility

| Tier | What it covers | How it is shown |
|---|---|---|
| **Exact** | Cash balances, signed contract terms, payroll, debt balances, covenant thresholds, unit counts, occupancy at last close | Single number |
| **Band** | Cash forecast, next-month occupancy, collections, bid odds, repair estimates for known work orders | Range: forecast ± band |
| **Signal** | Stakeholder sentiment (Strong, Warm, Neutral, Cool, Hostile), lender appetite (Open, Cautious, Closed), market trend, upcoming events after their warning signal | Tier label plus trend arrow |

**Forecast band (monthly half-width):**

> Band = 0.02 × monthly gross revenue + 0.10 × receivables over 60 days + 0.5 × open event exposure

Bands widen as receivables age, so keeping collections current keeps the forecast precise.

### 3.4 Random events

Each community averages one event every six months (λ = 2 per year). Category weights:

| Event | Weight | Cost | Effects | Warning signal |
|---|---|---|---|---|
| Plumbing or HVAC emergency | 30% | $3,000–$12,000 (Owner Trust) | Critical work order; resident satisfaction −3 | Aging work orders (about 25% foreseeable) |
| City code inspection | 20% | Fee $0–$500 | Failed-inspection effects per §3.2; city-ordered repairs are not modeled in the slice (P1, D-020) | Inspection notice 2 weeks ahead |
| Local market softening | 15% | None | Base occupancy −1.5 pts for 3 months | Market trend 1–2 months ahead |
| Resident dispute (fair-housing complaint) | 10% | Placeholder in the slice; detailed outcomes in P1 (D-019) | Residents and city | Low signal |
| Vendor failure | 15% | Vendor costs +30% for 2 months | Work-order backlog | Late vendor invoices |
| Owner request | 10% | Options: approve an in-budget repair (funded from Owner Trust; it clears its named driver, removing that driver's penalty); decline and log (the named driver stays active and its penalty continues). No option defers a critical item or reduces RS | Approve +2 / decline −2 owner sentiment (owner-approved) | Direct owner contact |

About 60% of events have a warning signal, so the player can prepare or mitigate.

**Inspections (v0.6).** One scheduled inspection per community per quarter. Failure chance = 0.20 + 0.02 × open non-critical work orders past 14 days, capped at 0.50. An inspection-readiness checklist ($300 per month per community) halves the 0.20 base only when every critical work order at that community is inspector-signed closed.

**Fair-housing rates (P1).** The 40% adverse-finding rate is provisional and is used only in P1 (D-019).

### 3.5 Recovery ladder

**Runway** = corporate cash ÷ trailing 3-month average net corporate burn. If burn is zero or positive, the dashboard shows "cash-positive."

| Level | Name | Entry trigger | Exit condition | Immediate effects |
|---|---|---|---|---|
| 0 | Stable | Runway ≥ 3 months; no covenant at risk | n/a | None |
| 1 | Watch | Runway 2–3 months, or one covenant at risk | Runway ≥ 3 months for 2 consecutive months | Cost review prompt; collections push available |
| 2 | Warning | Runway under 2 months, or any covenant breached | Runway ≥ 2.5 months for 3 consecutive months and covenants passing | Lender notified (lender reputation −5); partner and restructuring options unlock |
| 3 | Probation | Runway under 1 month; payroll or vendor payment over 30 days late; any Trust Violation | Runway ≥ 2 months for 3 consecutive months | Lender may freeze the line; owner may terminate a contract on 30 days' notice |
| 4 | Restructuring | Cannot meet payroll after all available levers are used | Runway ≥ 3 months for 6 consecutive months | Forced choices: partner dilution (contract sale and layoffs are P1). Payroll deferral and the revolving line remain available as levers. If no option is available, the card states the Level 5 path. |
| 5 | Insolvency | Level 4 for 90 consecutive days with corporate cash below zero and no lever left | n/a (game over) | Game over |

**Recovery levers.** Levels 0–3 always offer at least one non-destructive lever. At Levels 4 and 5 the restructure and partner options are offered when eligible; if neither is available, the player faces forced choices, and each such card is marked destructive.

| Lever | Available at | Immediate effect | Lag | Side effects | Limit |
|---|---|---|---|---|---|
| Collections push | Any, but blocked while a §3.9 brake is active | Recovers up to $2,000 of delinquent rent into Owner Trust over 60 days; corporate gains only its fee share (about 6%) and the owner receives the rest; delinquency −0.5 pt | 30–60 days | Resident satisfaction −2 in each month the push is active (one month per use). Permitted: payment plans, hardship review, reminders, and legally required notices. Not permitted: threats, harassment, public or third-party pressure, contacting employers, and fee-driven pressure. The permitted list is an owner-verification item | Once per quarter |
| Cut discretionary spend (P1; not in the slice) | Not offered in the slice | +$500–$2,000 per month. Discretionary lines are software, marketing, and miscellaneous ($2,000 at opening) | Immediate | ServiceScore −5 until restored (restore = reinstate the line for one month at full cost); capacity −5 pts per person; morale −3 | None |
| Service investment | Any | −$1,500 per month per tier (corporate cost). Each active tier gives ServiceScore +5; up to three tiers stack (+15) | Immediate | Ongoing cost; no resident-side cost | Three tiers |
| Draw revolving line | Lender-dependent | Up to the line limit | Immediate | Interest cost; covenant ratio worsens; lender sentiment −3 | $30,000 (Kestrel) |
| Request owner fee advance | Owner sentiment Warm or better | One to two months of that owner's fee | Immediate | Credited back over later months; owner sentiment −3 at request | Once per owner per year |
| Defer part of payroll (up to 25%) | Any | Cash timing relief | Repaid by next payroll | Morale −10; burnout +5; compliance issue if not repaid | Two months per year |
| Reduce staff hours or lay off (P1; not in the slice) | Not offered | Not applicable | Not applicable | Not applicable | Not applicable |
| Sell or transfer a contract (P1; not in the slice) | Not offered | Not applicable | Not applicable | Not applicable | Not applicable |
| Take partner investment | Level 2 or above; lender reputation 50 or higher | Equity cash | 60–120 days | Equity dilution; shared decision rights | Once |
| Restructure a loan | Level 2 or above | Covenant reset | 30 days | Restructuring fee; lender sentiment −3 | Once per loan |

### 3.6 Reputation and recovery rules

- Each company has five reputation views (owners, residents, city, lenders, employees). Each starts at 60 and drifts 1 point per month toward 50.
- Corrective actions add +3 to +6 per month, capped at +6 per month.
- A correction project earns full credit only after three months of observed behavior.
- Trust Violation penalties recover at no more than +1 per month.
- Each level exit requires the sustained condition shown in §3.5. A single good month is not enough.

### 3.7 Hard-stop rules

- **Default (Realistic CEO):** Game over occurs only through sustained insolvency (Level 5).
- **Optional:** A player may set a stop-loss threshold when starting a new save (for example, cumulative cash loss above a chosen amount). This is opt-in and off by default.

### 3.8 Resident-facing consequences (v0.6)

**Glossary.**
- *Company-engaged inspector sign-off (critical items; the label formerly 'inspector sign-off'):* the vendor completes the repair, and one third-party inspector, engaged and paid by the company, signs it off. The inspector may not be the repairing vendor or any affiliated firm. A firm is affiliated if it shares ownership, management, or staff with the company, the vendor, or the owner; subcontracts to or refers work from the vendor; or has been engaged for repeat work by the same vendor. Each engagement carries a logged independence attestation. Company staff cannot sign off. The inspector's fee is paid by the company on every engagement, including rejected sign-offs. A rejected sign-off leaves the order open and is recorded on the compliance record; the 14-day clock runs from the original open date. A rejected inspector may not be re-engaged on that order, and every engagement is logged. Sign-off requires the inspector to confirm the defect is resolved and to perform an on-site functional test, recording the result. Tests by defect class: heat (required room temperature reached); water (flow and pressure restored); gas (leak test passed); electrical (test passed, no exposed hazard); locks (door secures and locks); sewage (flow clear, no backup); pests (no activity on re-inspection); fire safety (device operates). A reopen within 90 days needs a new sign-off. Panel, rotation, and sampling audit are P1 (D-021).
- *Closed work order:* for critical items, inspector sign-off. For non-critical items, vendor completion confirmed by the simulation. Only critical closures count for the §3.4 readiness checklist and the §3.2 sentiment gate; both classes clear the §3.2 RS driver. Floor-card drivers count as cleared under these same rules (D-023).
- *Critical safety work order (approved list):* one with a defect on this list: no heat, no water, gas leak, electrical hazard, lock or door-security failure, sewage backup, pest infestation, or fire-safety defect.
- *Adverse action (P1):* a filing (eviction or non-renewal notice), a rent increase above 3%, or a service reduction, issued to a complainant.
- *Accepted reason code (P1):* a reason is accepted only if a matching simulation record exists and predates the complaint: ledger delinquency (nonpayment), a lease-violation record, an owner sale event, or a dated unit-condition record unrelated to the complaint. Otherwise the action is confirmed retaliation. The code list is an owner-verification item.
- *Avoidable move-out:* a move-out the company initiated (above-market renewal, or increase above 3%), or any move-out in a month where the prior month-end RS was below 50. This definition is used everywhere in this section.
- *Displacement:* the household vacated by an avoidable move-out.
- *Deferred maintenance:* any open work order past 14 days, or any open critical item. A vendor-completed non-critical order is closed, so it is not deferred, but it does not count toward readiness or as an inspector-signed closure (D-023).
- *Resident-reported:* logged through the resident intake channel, which the company cannot decline.
- *Renewal:* any in-place rent change, including month-to-month conversions.
- *Above market:* asking rent above the community's market comp (§3.2).
- *Open compliance record:* open until its matter is closed by inspector sign-off (city clearance is P1; D-021).

**Life-safety repairs (decision D-017).**
- A critical safety work order must be repaired. The company has no option to decline or defer one. An owner cannot order deferral.
- A defect is one cause at one unit or system, with one work order (not one invoice). Defect IDs are assigned by the simulation; the player cannot split or merge them. Reserve draws per community are capped at $5,000 in any rolling 30 days. Each draw is listed in the owner notice within 24 hours. The −5 sentiment trigger applies once per defect.
- Funding order: (1) the Capital Reserve, within a cap of $5,000 per community per 30 days; (2) the company's revolving line, if available; (3) corporate cash, advanced and billed to the owner. Step 3 may take corporate cash below zero, and Level 5 rules then apply. The repair proceeds in every case. Where steps 1 and 2 are unavailable, the vendor is paid from corporate cash. A shortfall registers as a distress event (§3.5), not a deferral. The company absorbs it; finance sizes the revolving line and cash buffer so step 3 is rare.
- Step 1 covers the remaining 30-day reserve cap, up to $5,000 per community per 30 days. Steps 2 and 3 fund the rest, and the company bills the owner. Owner sentiment drops 5 once when a defect's company-funded amount exceeds $5,000, or when a reserve draw above the 30-day cap is company-funded (owner to confirm).
- The lender covenant does not excuse a repair. Finance-designer models any covenant effect.
- Until inspector sign-off, the order stays open. Once open more than 14 days, it costs 5 RS per month per order (§3.2), plus a compliance record.
- A reopen within 90 days re-applies the penalty from the original open date.

**Rent increases.**
- **Cap:** cumulative increases over any 12 months may not exceed 5% plus the local CPI change, capped at 10% (game value; see §10). The CPI input is owner-verified. Scope (per unit or per community) is an owner-verification item; the spec assumes per unit. An increase that would exceed the cap is unavailable.
- **Notice:** 30 days if the cumulative 12-month increase is 10% or less; 90 days if above 10%. The 90-day branch is reachable only if the verified cap structure allows it; it stays as a placeholder.
- **Resident cost:** each renewal above 3% costs 0.5 RS per percentage point above 3, scaled to 100 units. Monthly, this is summed across that month's renewals. Example (before the brake applies): at the portfolio's 4 renewals a month, Larkspur has about 1.9 renewals a month. A sustained 6% increase on each costs about 4.5 RS per month, which settles RS near 51 under the drift.
- **Market check:** each renewal priced above market costs 0.5 RS, scaled to 100 units, and adds the P_gap penalty (§3.2).
- Renewal increases above 3%, above-market renewals, and above-market new-lease asks are unavailable in any community whose §3.9 brake is active or whose floor card is open.

**Re-letting and avoidable turnover.**
- For 12 months after any avoidable move-out, the unit may be re-let at no more than the prior rent plus the cap. The company earns no new-lease fee on it.
- Each avoidable move-out: owner sentiment −2, the vacated household costs community RS 1 one-time, and the owner statement shows avoidable turnover.
- Turn cost: $1,200–$2,500 from Owner Trust and about 25 days' vacancy. The loss is the owner's.
- **Resident-initiated move-outs** (RS 50 or higher) occur at 0.01 + 0.002 × max(0, 50 − RS) per unit per month, capped at 5%. Move-outs below RS 50 count as avoidable.



**Fair housing (slice placeholder; detailed rules in P1, D-019).**
- A complaint opens a placeholder card with one response: Investigate (about $1,500, company-funded, 30 days). The card shows 'outcome not modeled in this build' and never displays as resolved.
- The slice does not model adverse findings, correction funding, retaliation, or community flags. The design must not present the slice as complete for fair housing. These rules are P1 work and need legal review first (§10).

**Other consequences.**
- Failed inspection: 3 RS. A failed inspection with a life-safety finding also opens a critical order. Missed inspection: 1 RS that month, city reputation −10, and a compliance record.
- A deposit or owner-trust Trust Violation costs 5 RS one-time. Termination costs 2 RS one-time (transfer is P1).
- **Owner sentiment tiers:** score 0–100. Hostile below 30; Cool 30–49; Neutral 50–69; Warm 70–84; Strong 85 and above. The update rule is in §3.2.
- **Owner request (§3.4):** a resident-protective option is one that defers no critical item and reduces no RS. Critical items are excluded from owner requests entirely.
- **Screening** is not in the slice. Any future screening option requires uniform criteria and ethics review.

### 3.9 Resident satisfaction floor (v0.6)

- **Trigger:** month-end RS below 55 for two consecutive month-ends. Owner sentiment −5 once, and a card opens. Breaching the floor fails criterion 8 explicitly (§1.7).
- **While the card is open:** renewal increases above 3% are unavailable in that community, and owner sentiment −2 each month.
- **Options:**
  - *Fund targeted repairs* of the named drivers: $2,000–$5,000 from Owner Trust, with a 30-day lag. RS +1 per month for three months once the drivers clear.
  - *Add a service investment tier* for this community: $1,500 per month, +5 ServiceScore (§3.5).
- The card closes at the first month-end with RS of 62 or higher, aligned with the brake release (D-021).
- **Brake (D-019, amended in D-021, D-023):** from any month-end RS below 60, until RS is 62 or higher, the company may not raise any renewal above 3%, set any renewal or new-lease ask above market, or run the collections push in that community. Release at 62 generally needs investment, since the drift returns RS toward 60 only when ServiceScore is 60 (§3.2).

---

## 4. Core entity model (P0-4)

### 4.1 Entities

| Entity | Key attributes | Relationships | Events emitted |
|---|---|---|---|
| **Company** | id, name, specialization, corporate cash, distress level, five reputation values, schema version | Owns employees, contracts, ledgers, debt, and pipeline | Cash change, distress level change |
| **Employee** | id, role, manager, skill profile, capacity, skill fit, morale, burnout, pay band, salary, goals, status | Reports to one employee; assigned to communities | Hired, resigned, promoted, burnout threshold crossed |
| **Community** | id, name, city, class, base occupancy, status | Has units, one management contract, one owner, staff assignments, work orders, inspections | Occupancy change, inspection result, event hit |
| **Unit** | id, community, bedrooms, market rent, ask rent, status (occupied, vacant, notice, turn) | Belongs to a community | Lease signed, lease ended, turn started |
| **Resident cohort** (aggregate in slice) | Community, satisfaction (0–100), delinquency rate | Belongs to a community | Satisfaction change |
| **Contract** | id, type, communities, term dates, fee model (percentage, minimum, new-lease fee, renewal fee), termination terms, renewal status | Between company and owner | Term notice, renewed, terminated, service-level breach |
| **Owner** | id, name, sentiment (score and tier), contracts, trust and reserve ledgers, payment behavior | Owns communities via contracts | Statement late, distribution approved, meeting held, complaint |
| **Lender** | id, name, product, limit, rate, criteria, appetite, relationship score | Holds facilities and covenants | Covenant test, review scheduled, line drawn, approval or decline |
| **Covenant** | id, lender, metric, threshold, test frequency, status | Belongs to a facility | Test passed, test failed |
| **Vendor** | id, name, trade, rate card, reliability score | Performs work orders | Invoice late, job complete, vendor failure |
| **City** | id, name, compliance record, relationship score | Issues inspections | Inspection scheduled, inspection failed, complaint received |
| **Work order** | id, community, unit, severity, age, cost estimate band, vendor | Belongs to a community; assigned to a vendor or employee | Opened, aged past threshold, closed |
| **Inspection** | id, community, city, due date, status, findings | Belongs to a community and city | Scheduled, passed, failed |
| **Prospect / bid** | id, community or portfolio, units, due date, fee proposal, win probability | Becomes a contract if won | Bid submitted, won, lost |
| **Event** | id, sim date, type, scope references, magnitude, warning date, cause references, effects, visibility | Attaches to any entity | Emitted by the simulation |
| **Ledger** | id, type (see §2.1), owning entity, balance | Holds ledger entries | n/a |
| **Ledger entry** | id, ledger, date, signed amount, counterparty, category, source event, reversal reference | Belongs to one ledger | Posted |
| **Decision card** | id, screen, situation, facts with visibility tags, options with cost, lag, and side effects, deadline, follow-ups | Creates commitments and follow-up obligations | Decided, expired |

### 4.2 Global rules

- Every entity has a stable id that never changes.
- **Ledger entries are append-only.** Corrections are made by posting a reversal entry and a new entry, never by editing an old one.
- Time advances in monthly ticks, with day-level events for cash (see §2.3).
- The save file carries a `schema_version` field. Migrations are versioned.
- Given the same save state, decisions, and seed, the simulation produces the same result (deterministic replay).

### 4.3 Task weights (for workload)

| Task | Points |
|---|---|
| Unit resident service (per unit per month) | 0.4 |
| New lease | 6 |
| Renewal | 2 |
| Open work order (per month) | 0.5 |
| Inspection | 8 |
| Owner reporting (per community per month) | 10 |
| Active bid (per month) | 15 |
| New-hire onboarding (per month, first two months) | 10 |

### 4.4 Opening workload check

| Person | Assigned work | Workload | Utilization |
|---|---|---|---|
| Founder-CEO | Owner reporting 30 + inspections 8 + open work orders 12.5 + one active bid 15 | 65.5 | 0.66 |
| Leasing & Resident Coordinator | Resident service 52.8 + new leases 36 + renewals 8 | 96.8 | 0.97 |

---

## 5. Vertical-slice dashboard and decisions (P0-5)

### 5.1 Principles

- **Exception-first.** Items needing a response appear at the top, sorted by deadline times impact.
- **Every number has an explanation.** The "explain this" layer shows the drivers and their values.
- **Color is never the only signal.** Each status uses an icon and text as well as color.
- **Each screen answers one question** and supports a short list of decisions. A screen that supports no decision is cut.

### 5.2 Screens and supported decisions

| Screen | Question it answers | Decisions supported | Main data |
|---|---|---|---|
| **Executive Snapshot** (home) | Am I okay this month, and what matters most? | Choose the top three actions for the month; open the exception queue; decide whether to request a lender review | Cash (exact) and runway (band); net monthly result; portfolio occupancy; open risk count; five reputation tiles; distress level; portfolio resident satisfaction with floor status |
| **Decision Inbox** | What needs a response before its deadline? | Respond to an owner; approve or decline spend; approve or decline a hire request; respond to a city notice; answer a lender request | Decision cards sorted by deadline × impact |
| **Communities** (list and detail) | Which property is drifting? | Set ask rent; approve a work order; reassign staff; request owner capital; prepare for an inspection | Occupancy, delinquency, aged work orders, inspection status, owner sentiment, resident satisfaction with its drivers, NOI (derived) |
| **People** | Who is overloaded or underused? | Hire an assistant or community manager; reassign communities; adjust pay (raise or bonus); schedule coaching or time off; delegate tasks | Capacity, utilization, burnout, morale, reporting lines |
| **Contracts and Pipeline** | Which fights are worth taking? | Bid or pass; set fee proposal; open or close a renewal negotiation; respond to a termination notice | Contract terms, pipeline odds with modifiers, renewal dates |
| **Finance** | Can I pay for what I have committed? | Draw the line; approve the payables run; schedule an owner distribution; trigger a collections push; request a fee advance | Cash forecast bands; ledgers; aging; covenants |
| **Relationships** | Who is unhappy with me, and why? | Schedule an owner meeting; respond to a lender review; prepare a city response | Sentiment tiers; recent cause log per stakeholder |

**Excluded from the slice:** the Strategy screen, office progression, and development partnerships (all P2).

### 5.3 Decision card format

Every decision card follows the same structure:

1. **Situation:** a short authored or system-generated description.
2. **Facts,** each tagged Exact, Band, or Signal (see §3.3).
3. **Options:** at least two. Each shows its cost, lag, and side effects.
4. **Commitment:** the chosen option creates follow-up obligations with due dates.
5. **Consequences:** logged to the event log and surfaced later on the screens where they appear.

This format carries the "conversations change terms, trust, timing, or workload" requirement from GDD §12 into the interface.

---

## 6. Open items for owner approval

**v0.2 status:** items 1–6 were answered by the owner's delegation ("You choose"); the choices are listed in §7. Item 7 (approval itself) and the legal verification items remain open.

1. Confirm **market-rate residential management** as the slice specialization (D-008).
2. Confirm that all dollar figures, rates, and coefficients are **tuning starting values**, not commitments.
3. Confirm that all names (companies, owners, lenders, vendors, and the placeholder employee) are fictional and checked against real firms (D-003).
4. Confirm the success-criteria thresholds in §1.7, especially the 93% occupancy target and the 2.0-month cash target.
5. Confirm that the Lumenfall term loan is optional in the slice, so the slice does not depend on it.
6. Confirm that the **default hard-stop is insolvency only**, with stop-loss as an opt-in setting (D-010).

Once these are approved, the Decision Log entries move from **Proposed** to **Approved**. Implementation may then begin under GDD §14.

## 7. v0.2 choices (owner delegated: "You choose")

1. **L-02 removed from the slice** and deferred to P2. Criterion 5 uses L-01 or a new lead.
2. **Collection loss applied** at 3.5% delinquency. Opening net is about −$402/month, and the business is cash-negative from opening.
3. **Founder draw kept as an operating expense** (conservative). Treating it as a distribution is a one-line change if you prefer it.
4. **Cinder Hollow trigger kept** at two consecutive months below 90%; criterion 4 changed to match.
5. **Criterion 3 counted per owner**, not portfolio-wide.
6. **Non-destructive lever rule kept** for Levels 0–3; Levels 4–5 spell out their options (§3.5).
7. **Opening pinned to October** with stated inputs; occupancy bases recalibrated to Larkspur 0.91, Stillwater 0.92, Cinder Hollow 0.88.
8. **Status label: "Proposed,"** matching the Decision Log.
9. **D-007 approval evidence:** GDD §15 records the owner's acceptance of all board recommendations. D-007's text is unchanged.
10. **Ethics blockers from the v0.2 review** addressed in §3.8. Ethics re-review is still required before approval.

Still with the owner: approval of P0 and D-008 to D-015, and verification of all California legal rules before they are modeled.

## 8. v0.3 changes (ethics re-review: Hold)

The ethics re-review returned Hold on v0.2. v0.3 responds to it:

1. **N1 (timing):** criteria 3 and 6 are checked in every month (§1.7).
2. **N2 (tiers):** Stable and Promising require criterion 6 and the resident criteria. A criterion 6 failure caps the outcome at Struggling (§1.7).
3. **N3 (resident satisfaction):** RS has an opening value, an explicit formula, drivers, and a per-community floor of 55 (§3.2, §3.9). RS must appear on screen (UX item for v0.4).
4. **N4 (collections push):** permitted and forbidden actions are listed, and the effect matches the formula (−0.5 pt) (§3.5).
5. **B1 (turnover):** a company-initiated turnover nets the company a loss, and avoidable turnover appears on the owner statement (§3.8).
6. **B2 (cost cutting):** ServiceScore is linked to staffing and cuts, and it feeds RS (§3.2, §3.8).
7. **B3 (safety):** "critical" is defined as a list, life-safety repairs cannot be deferred for cash, and failed inspections open critical orders (§3.8).
8. **B4 (fair housing):** Investigate has an adverse branch, Dismiss carries a probability and a window, the event cost is no longer double-counted, and retaliation is covered (§3.4, §3.8).

**Still open:**
- ServiceScore has no upside above 60, so service has downside but no upside. A service-improvement lever is needed (systems-designer, v0.4).
- The RS figures and the 5% dismissal probability are provisional and need balance testing.
- Owner verification of all legal items: the 5% renewal-increase cap, the life-safety list, the permitted collections actions, the investigation and settlement rules, the anti-retaliation scope, deposit rules, and the city fee and repair amounts.
- Ethics re-review and the auditor recheck of v0.3 before approval.

## 9. v0.4 changes (ethics Hold and auditor FAIL on v0.3)

1. **Auditor fixes:** RS formula now includes every stated RS effect (K4). Criterion 8 and the floor use the same test (T2). Criterion 3 is split into a monthly trust test and a separate per-owner statement test (T1). Failed inspections open critical orders only when a life-safety finding is present. The D-014 "resident criteria" wording matches §1.7.
2. **K1 (renewal increases):** statutory cap base, notice periods, a defined RS cost per point above 3%, and a market check. Renewal credit removed.
3. **K2 (settlement, dismissal, retaliation):** RS credit only for verified correction. An open complaint carries a monthly RS drag. Investigate has an adverse probability. Retaliation has a confirmation rule.
4. **K3 (neglect):** critical penalty is per order. The non-critical cap is removed. Compliance records have an effect. Owner refusal has defined options. Resident-initiated move-outs are modeled.
5. **K5 (service upside):** service investment lever added (−$1,500/month corporate, +5 ServiceScore, up to +15).
6. **K6 (RS on screen):** RS appears on Executive Snapshot and Communities (§5.2).
7. **T3 (tier overlap):** Distressed takes precedence over Struggling.
8. **T4 (sentiment tiers):** numeric bands added.
9. **T5 (same-cycle):** defined as 12 months.

**Still open:**
- Balance testing of all RS figures, the 40% and 5% probabilities, and the service investment cost.
- Owner verification of every legal item in §10.
- Ethics re-review and auditor recheck of v0.4 before approval.
- Owner decision: should Promising require the floor as well as RS ≥65? (v0.4 does not.)

## 10. Game figures for rent, notice, deposits, and late fees

**Owner decision (D-024): these are fictional game values chosen for play, not legal guidance and not a statement of California law.** The source notes below are background only and were not verified against current statutes. Do not treat any figure as a real-world rule.

These come from secondary sources (law-firm pages, property-management guides, and a San Francisco Rent Board notice). They are not statute text. Each needs confirmation on leginfo.legislature.ca.gov or with counsel before it is treated as fact.

| Item | Source value (not used as law) | Sources | Used in spec? |
|---|---|---|---|
| Rent increase cap | 5% plus local CPI change, capped at 10% (game value) | [TenantCloud](https://www.tenantcloud.com/rent-collection/california-rent-increase-laws); [City of Downey](https://www.downeyca.org/our-city/departments/community-development/housing-division/ab1482) | Current CPI figure conflicts across sources; owner to fill from the HCD site. Exemptions (for example, newer buildings) not checked. |
| Notice for increases | 30 days if cumulative 12-month increase is 10% or less; 90 days if above 10% | [Costa-Hawkins on AB 1110](https://costa-hawkins.com/ca-legislative-update/rent-increases-above-10-percent-now-require-90-days-notice-not-60/); [SF Rent Board archive](https://www.sf.gov/reports--december-2019--san-francisco-rent-board-news-archive-2019) | Some law-firm pages still say 60 days; these predate the 2020 change. Confirm §827. |
| Mailing | Not modeled | Auditor: the 5-day add-on comes from general civil procedure rules, not the notice statute | Removed from the spec |
| Security deposit | Return and itemize within 21 days; bad faith can cost up to 2× the deposit | [terms.law, CA Security Deposit Hub](https://terms.law/CA-Security-Deposit-Hub/) | Secondary source; confirm §1950.5. One source claims a one-month deposit cap for leases after July 1, 2024. Conflicting; not used in this spec. |
| Late fees | No fixed cap; must be a reasonable estimate of loss (Civil Code §1671) | [Tellus](https://www.tellusapp.com/blog/late-fees-in-california/) | Confirm §1671. The 5% figure is a market convention, not law. The spec does not model a late-fee amount. |

**v0.4 correction (auditor):** Outcome tiers now cover every combination: 6 or 7 criteria with RS below 65 is Struggling (§1.7).

## 11. v0.5 changes (ethics Hold on v0.4)

Owner decisions (D-016): company uses the owner's capital reserve for life-safety repairs up to $5,000 with owner notice; re-letting after a company non-renewal is capped at the renewal limit; the cap is cumulative over 12 months; service tiers stay at three.

- **B1 (dismissal):** dismissal keeps the condition open, costs 3 RS per month, and carries a confirmation path. Systems-designer confirms cash parity with investigation.
- **B2 (decay and city reputation):** a 12-month community flag caps the outcome at Struggling. City reputation below 40 lowers bid win probability by 0.05.
- **B3 (owner refusal):** capital reserve path added (owner decision).
- **B4 (inspector sign-off):** defined. Critical orders close only on inspector sign-off. Reopens within 90 days re-apply the penalty.
- **B5 (re-letting):** capped at the renewal limit with a reason code.
- **R1:** clean investigations close the complaint. **R2:** glossary added. **R3:** one safety term. **R4:** owner-trust violations cost 5 RS. **R5:** sentiment gate and deferred-maintenance definition. **R6:** floor card has three options. **R7:** cap is cumulative. **R8:** criterion 6 is measured at month-end. **R9:** renewal scale normalized to 100 units. **R10:** inspection-readiness checklist. **R11:** owner decision (keep three tiers).

**Still open:** balance testing (systems-designer); the legal items in §10 (parked by owner); ethics re-review and auditor recheck of v0.5 before approval.

## 12. v0.6 changes (ethics Hold and auditor FAIL on v0.5)

Owner decisions (D-017): critical safety repairs are mandatory, funded from the reserve up to $5,000 and otherwise advanced and billed to the owner. Dismiss is removed. The floor card's Accept option stays but carries a recurring cost. Verified correction requires an independent inspector.

Fixes: the RS formula now includes the displacement, missed-inspection, and floor-repair terms. Sentiment and city-reputation update rules are stated. Inspection failure rates are defined. A costs-and-payers table is added. Avoidable move-out is defined once and applied to the re-letting cap and no-fee rule for 12 months. Reason codes need a matching simulation record. Adverse action is defined. The dangling S4, S7, and R-list references are removed. "Owner trust" is renamed "owner sentiment" where it meant sentiment. Labels, the §1.4 rounding, and the Strong tier are corrected.

**Still open (for the owner or the specialists):**
- Balance: a sustained 6% renewal policy drives RS to about 35, below the floor. Systems-designer confirms intent.
- Full investment gives RS 66, one point above the 65 criterion. One 6% renewal drops it below 65 until it recovers.
- Criterion 8 depends on $4,500 per month of service tiers, which the opening business cannot fund (owner decision, already recorded).
- Cap scope: per unit or per community.
- Collections push: a single lever with the same effect regardless of tactics. Should become a choice among permitted tactics with their own costs.
- Above-market new-lease asks carry only the small P_gap penalty. Consider a resident-side cost.
- Bid table has no resident-outcome modifier. Consider one for portfolio RS below 55 or open compliance records.
- Legal items in §10 remain unverified and parked by the owner.
- Owner and lender reputation (§2.4) have no update rules in §3.2 yet.
- Leasing fee allocation: reconciled in v1.1 (§17). Unit-weighted new-lease fee $345; renewal fees only where the contract has them. Opening net −$402/month.
- Renewal volume: the 12.5-RS-per-month figure assumes about 5.3 renewals a month at Larkspur, while §1.4 books 4 a month across all 132 units. Reconcile.
- Readiness checklist: the halving applies only when every work order at the community is closed, which is stricter than the failure-chance count (non-critical orders past 14 days).
- Ethics re-review and auditor recheck of v0.6 before approval.

## 13. v0.7 changes (owner decisions on the v0.6 Hold)

Owner decisions: Settle removed (Investigate only); the verifier is a third-party inspector engaged and paid by the company; the floor card's Accept option is removed; the critical safety list is approved as the default list. Also applied: the retaliation test predates the complaint; closure requires verification; a funding order for repairs is stated; the inspection rule uses the life-safety finding (D-015); the reserve "may fund" wording matches D-017; the floor card blocks company non-renewals; the market check is per renewal; the renewal and move-out and notice cross-references are added; the body-text label in §7 is replaced.

**Still open:** renewal volume reconciliation; owner and lender reputation update rules; the reserve-shortfall distress path (finance-designer); the sentiment consequence of the floor card (owner decision, now that Accept is removed); systems-designer balance of the dismissal-free fair-housing path.

## 14. v0.8 changes (ethics Hold on v0.7)

Owner decisions (D-019): the complaint, retaliation, and verifier-panel mechanics move to P1. The slice keeps a complaint placeholder. The floor card's brake blocks renewal increases above 3%, non-renewals, the collections push, discretionary cuts, and staff hour or layoff cuts from the first below-60 reading, and the card closes at 60.

Also applied: the adverse-finding and retaliation terms are removed from the RS and city-reputation formulas (they belong to P1). Community flags are not used in the slice. The verifier cost is added to §2.6 as a placeholder with a payer. The "life-safety finding" wording follows the approved list.

**Still open:** the renewal-volume and leasing-fee reconciliations (§12); owner and lender reputation rules; the reserve-shortfall path (finance-designer); the P1 fair-housing, retaliation, and verifier design, which needs legal review; the legal items in §10; and a check that the placeholder names don't match real firms (CLAUDE.md rule 5).

## 15. v0.9 changes (owner choice: simplify the slice)

Owner decision (D-020): the slice keeps the core rules. Removed from the slice: third-party verification of closures (deferred to P1, with completion company-recorded as a known risk); city-ordered repairs; company-initiated non-renewals; discretionary cuts and staff hour or layoff cuts. The brake is limited to renewals above 3% and the collections push, from below 60, released at 62. Funding per defect, with step 3 allowed to take cash below zero.

**Withdrawn in v1.0 (§16; D-021):** company-recorded completion. Former text: **Known risks the owner accepted with D-020:** company-recorded completion of critical repairs (no independent verification in the slice). The ethics reviewer has flagged this as a resident-safety route; it is reversible if the owner decides verification must stay in the slice.

**Still open:** the leasing and renewal-volume reconciliation (§12); owner and lender reputation rules; the reserve-shortfall path (finance-designer); the legal items in §10; the placeholder-name check (CLAUDE.md rule 5); ethics re-review and auditor recheck of v0.9.

## 16. v1.0 changes (owner choices: verification in the slice; approval after the final review)

- **Verification restored (D-021):** each critical repair needs sign-off by one third-party inspector, engaged and paid by the company, not the vendor and not owner-affiliated. Panel, rotation, and sampling audit are P1. Cost is $350 per critical repair (placeholder). This withdraws the company-recorded-completion risk in §15.
- **Level 3 and 4:** contract sale and layoffs are not offered in the slice. Level 4 offers partner dilution only, and the card states the Level 5 path if none is available.
- **Cut mechanics:** the restore and cut-card text is removed from §3.2 and §3.8. The lever rows stay labelled not in the slice.
- **Brake (D-021):** above-market renewals are added. Release and card closure are both at RS 62, so the two cannot disagree.
- **Defects:** one cause at one unit or system, one work order. Reserve draws are capped at $5,000 per community per 30 days, with each draw listed in the owner notice.
- **Owner requests:** options listed in §3.4, with the sentiment direction. No option defers a critical item or reduces RS.

**Still open:** the leasing and renewal-volume reconciliation (§12); owner and lender reputation rules; the reserve-shortfall path; the legal items in §10; the placeholder-name check (CLAUDE.md rule 5); the final ethics review and auditor recheck.

## 17. v1.1 changes (owner choice: reconciled baseline)

The leasing-fee reconciliation is closed. The new-lease fee is unit-weighted ($345 across six leases), and renewal fees apply only where the contract has them (Cinder Hollow excluded by unit share). Opening revenue is $15,435, the opening net is −$402/month, the post-hire net is about −$4,875/month, and runway after the first hire is about 9.8 months. Founder-as-distribution gives +$3,598/month. All figures in the spec use these numbers. Historical log entries (D-008, D-013) keep the earlier −$247 and are superseded by D-022.

**Still open:** the renewal-volume reconciliation (the §3.8 example assumes about 5.3 renewals a month at Larkspur; §1.4 books 4 across the portfolio); owner and lender reputation rules; the reserve-shortfall path; the legal items in §10; the placeholder-name check (CLAUDE.md rule 5); the final ethics review and auditor recheck of v1.1.

## 18. v1.2 changes (owner choices on the v1.0 Hold)

Owner decisions (D-023): non-critical closures are vendor-recorded and confirmed by the simulation, and they do not count for the readiness checklist or the sentiment gate; the brake extends to above-market new-lease asks; the verifier-structure risk in D-021 is accepted as a documented owner override.

Applied from the review: a rejected sign-off leaves the order open, with no re-engagement of the same inspector on that order and all engagements logged; independence excludes company-affiliated firms; the inspector's fee is company-paid on every engagement, including rejected sign-offs; defect IDs come from the simulation with a rolling 30-day cap; the owner-request approve option has a stated driver effect; critical items are excluded from owner requests; the complaint placeholder never shows as resolved; the Level 4 card lists the levers that remain; the brake's exit mechanics are explained.

**Still open:** the renewal-volume reconciliation (§3.8 example vs §1.4); owner and lender reputation rules; the reserve-shortfall path; the legal items in §10; the placeholder-name check (CLAUDE.md rule 5); the final ethics review and auditor recheck of v1.2.

## 19. v1.3 changes (owner answers to open items)

- **Renewal volume (D-024):** 4 a month across the portfolio. The §3.8 example is recomputed: Larkspur has about 1.9 renewals a month, and a sustained 6% increase settles RS near 51.
- **Owner and lender reputation:** display only in the slice; no update rule until P1.
- **Reserve shortfall:** the company absorbs it from corporate cash. Finance sizes the revolving line and cash buffer so this is rare.
- **Sentiment values:** approved (+2 approve, −2 decline, −5 company-funded overrun above $5,000).
- **Inspector fee:** the company pays on every engagement, including rejected sign-offs. Matches §2.6.
- **Sign-off standard:** on-site functional test per defect class (§3.8).
- **Affiliation:** any shared ownership, management, or staff; any subcontracting or referral from the vendor; any repeat work for the same vendor. Each engagement logs an attestation.
- **Readiness:** the 50% failure reduction requires every critical order inspector-signed closed.
- **Names:** renamed to invented names (D-024). Communities, owners, lenders, vendors, and the placeholder employee.
- **Game figures:** §10 is labelled fictional game values, not legal guidance.
- **Residual risk (D-024 and D-023):** the company-engaged inspector can sign off a defect that was not properly tested, and the hazard would persist. The slice does not model reopen probability, so a false closure costs nothing in play. Criterion 6 and the readiness checklist can be met on closures alone. The reversal condition is P1 panel and rotation designed and in place before any P1 release; the owner is the decision-maker.

**Still open:** the brake release at RS 62 needs two service tiers (equilibrium 64) to be reachable; with one tier, the equilibrium is 62 and is never reached. Systems-designer to rebalance or the owner to choose a different release value. Ethics re-review and auditor recheck of v1.3.
