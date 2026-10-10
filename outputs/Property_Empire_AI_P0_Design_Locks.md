# Property Empire AI — P0 Design Locks

**Status:** Proposed — pending owner review and approval (GDD §14: no implementation until P0 locks are approved)
**Date:** 2026-10-10 (v0.5: revisions recorded as D-013 to D-016)
**Governing documents:** Master Game Design Document §13 (P0 list); Decision Log D-001 to D-007 (locked, not changed here)
**Scope:** Design specification only. No code, data pipelines, or deployment.
**Logged as:** D-008 to D-016 in the Decision Log (D-013 v0.2, D-014 v0.3, D-015 v0.4, D-016 v0.5).

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
| Alder Court Apartments | Sacramento (Midtown) | 64 | $1,780 | 93.4% | Cordova Hollow Holdings | $6,161 |
| Riverbend Terrace | Rancho Cordova | 40 | $1,950 | 94.4% | Valley Gate Partners | $3,908 |
| Pine Hollow Flats | Elk Grove | 28 | $1,650 | 90.4% | Sutter Pine Realty Trust | $2,821 |

Fee calculations use collected rent, which assumes 3.5% delinquency (§3.2, multiply by 0.965): Occupancy uses the pinned §3.2 values (93.4%, 94.4%, 90.4%). Alder 6.0% × ($1,780 × 64 × 0.934) × 0.965 = $6,161; Riverbend 5.5% × ($1,950 × 40 × 0.944) × 0.965 = $3,908; Pine Hollow 7.0% × ($1,650 × 28 × 0.904) × 0.965 = $2,821.

### 1.3 Opening staff

| Role | Holder | Burdened monthly cost | Capacity | Starting burnout | Notes |
|---|---|---|---|---|---|
| Founder-CEO | Player | $4,000 draw | 100 pts | 35 | Owner reporting, inspections, work-order escalations, bids |
| Leasing & Resident Coordinator | Placeholder: Jordan Okafor | $5,287 ($52,000 ÷ 12 × 1.22) | 100 pts | 20 | Resident service for all units, leasing, renewals |
| Bookkeeping | Outsourced vendor (placeholder: Harbor Ledger Services) | $1,200 | n/a | n/a | Monthly close support |
| Maintenance vendor pool | Valley Turn Services; Foothill Handyworks (placeholders) | Per-job billing | n/a | n/a | Work orders billed to owner trust |

Opening staff have Morale 100 and SkillFit 1.0. The utilization figures in §4.4 depend on these values.

**Opening pressure:** The coordinator starts near capacity (utilization ≈ 0.97). The founder has spare capacity (≈ 0.66). The first real staffing decision is whether to add an assistant before the coordinator burns out.

### 1.4 Opening corporate P&L (monthly, illustrative)

| Line | Amount |
|---|---|
| Management fees, collected (three communities) | $12,890 |
| Leasing and renewal fees (≈ 6 new leases at $350, 4 renewals at $150) | $2,700 |
| **Total corporate revenue** | **$15,590** |
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
| **Net corporate operating result** | **−$247** |

**Opening cash:** $48,000 corporate operating cash. Undrawn $30,000 revolving line (Foothill Harbor Bank).

**Realism check:** The business is cash-negative from opening, at about −$247/month once the 3.5% collection loss is applied. Adding one $44,000 assistant ($3,667 × 1.22 = $4,473/month) moves the result to about −$4,720/month, which leaves about 10 months of runway at $48,000. Every hire is a visible tradeoff. The founder draw is treated as an operating expense (conservative); treating it as a distribution would move the opening result to about +$3,753/month.

### 1.5 Opening contracts and pipeline

| ID | Contract | Term | Fee model | Key terms | Decision point in slice |
|---|---|---|---|---|---|
| C-01 | Alder Court | 24 months | 6.0% of collected rent; $350 per new lease; $150 per renewal | Owner may terminate for convenience with 90 days' notice after month 9 | Early termination risk from month 9 |
| C-02 | Riverbend Terrace | 12 months, auto-renewing | 5.5% of collected rent; $1,200 monthly minimum; $300 per new lease; $150 per renewal | 60-day non-renewal notice | Renewal decision due month 10 |
| C-03 | Pine Hollow Flats | 24 months | 7.0% of collected rent; $1,500 monthly minimum; $400 per new lease | If occupancy is below 90% for 2 consecutive months, owner may terminate on 30 days' notice | Occupancy trigger is live from month 1 |

| ID | Prospect | Units | Baseline win odds | Bid due | Notes |
|---|---|---|---|---|---|
| L-01 | Oakline Residential Fund property, Roseville | 48 | 30% | Month 3 | Standard market-rate management |

L-02 (Summit Ridge Developers lease-up, Folsom, 72 units, 20% baseline odds) is deferred to P2 and is not in the slice (v0.2). Lease-up work is a different specialization.

### 1.6 Lenders in the slice

| Lender | Product | Terms (starting) | Requirements |
|---|---|---|---|
| Foothill Harbor Bank | $30,000 revolving line | 9.5% interest | Corporate cash ≥ 1.5 × monthly expenses; aged receivables (over 60 days) ≤ 15% of trailing 3-month billings; no active covenant breach |
| Brightwater Credit Partners | $60,000 term loan (optional) | 13.5% interest, 10-day decision | Revenue run-rate ≥ $180,000 per year; founder personal guarantee |

The full lender roster (five lenders, P1) is out of scope for the slice.

### 1.7 Twelve-month success criteria

Criterion 3 (trust violations) and criterion 6 must hold in every month, not only at month 12. Criterion 8's floor is checked every month (§3.9). Other tests are measured at month 12 unless stated.

| # | Criterion | Threshold |
|---|---|---|
| 1 | Contracts | All three management agreements active or renewed; zero owner terminations |
| 2 | Liquidity | Corporate cash ≥ 2.0 × monthly corporate expenses; never at Distress Level 3 or above during months 1–12 |
| 3 | Trust integrity | Zero trust-account violations in every month (1–12). Separate test: for each owner, owner statements delivered by day 10 in at least 11 of 12 months |
| 4 | Occupancy | Portfolio 12-month average ≥ 93%; no community below 90% for 2 or more consecutive months (matches the Pine Hollow termination trigger in C-03) |
| 5 | Growth | At least one new management contract won (L-01 or a new lead) |
| 6 | Compliance | In each of months 1–12, measured at the month-end snapshot: zero missed inspections and zero critical safety work orders open for more than 14 days |
| 7 | Team | No employee at burnout ≥ 85 for 2 or more consecutive months; founder below 85 at month 12 |
| 8 | Stakeholders | At month 12: all three owners at Warm or better sentiment (score 70+) and unit-weighted portfolio resident satisfaction ≥ 65 / 100. Every month: no community below the 55 floor for two consecutive month-end readings (§3.9) |

**Outcome tiers:**

- **Stable:** All 8 criteria met, criterion 3 (trust) and criterion 6 met in every month, no community breached the §3.9 floor, and no 12-month community flag is active.
- **Promising:** 6 or 7 criteria met, including criteria 3 (trust) and 6 in every month, the resident part of criterion 8 (RS ≥ 65), and no community breaching the §3.9 floor, and no 12-month community flag active; no Distress Level 3 or above.
- **Struggling:** 4 or 5 criteria met; or 6 or 7 criteria met without the resident part of criterion 8 (RS below 65) or with a §3.9 floor breach; or Distress Level 3 or above reached; or criterion 3 (trust) or criterion 6 failed in any month, or a 12-month community flag is active.
- **Distressed:** 3 or fewer criteria met, or Distress Level 4 or above reached. Distressed takes precedence when both Struggling and Distressed apply.

Struggling and Distressed outcomes continue play under the recovery rules in §3.6. They do not end the game.

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
| **Owner Capital Reserve** (one per community, restricted) | Owner | Required reserve transfers from Owner Trust | Capital and repair spend above threshold, with owner approval. Exception: a critical safety repair up to $5,000 may proceed without approval, with owner notice within 24 hours (§3.8) | No |
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
2. **Late or incorrect owner statement:** owner trust −3 per occurrence.
3. **Reconciliation exception:** any unexplained trust difference above $0.01 at close must be resolved before day 10. Unresolved exceptions raise the owner's late-statement probability (see §3.2).
4. **Security deposits** are never shown as company cash in any corporate view.

### 2.5 Reports the player can see

- Corporate P&L (monthly)
- 13-week cash forecast, shown as bands (see §3.3)
- Owner statement per community (generated on day 10)
- Trust reconciliation per community
- Receivables aging (0–30, 31–60, 61–90, over 90 days)
- Covenant certificate per lender

---

## 3. Realistic CEO rules (P0-3)

### 3.1 Design principles

1. **No hidden multipliers.** Every modifier that changes a number appears in that number's "why" breakdown, with its value.
2. **Difficulty comes from interconnection, timing, and variance.** It does not come from numbers that quietly work against the player.
3. **Randomness is bounded and previewed.** Events have warning signals and plausible causes (see §3.5). Each save has a stored RNG seed for replay and debugging. The player does not see the seed.
4. **Failure is gradual and announced.** Each distress level is shown days or weeks before it takes effect when possible.

### 3.2 Core formulas (v0.3)

**Occupancy.** Occupancy moves 35% of the gap toward a target each month.

> Target occupancy = Base + L_eff + S_eff − P_gap − M_pen + Season + noise

| Term | Definition | Starting values |
|---|---|---|
| Base | Market and property-class baseline | Alder 0.91; Riverbend 0.92; Pine Hollow 0.88 |
| L_eff | 0.04 × LeasingScore / 100 | LeasingScore is the leasing function's effective quality, 0–100 |
| S_eff | 0.03 × (ServiceScore − 50) / 50 | Range −0.03 to +0.03 |
| P_gap | 0.10 × max(0, AskRent / MarketRent − 1) | Only asking above market reduces occupancy |
| M_pen | 0.02 × share of work orders aged over 14 days | Maintenance backlog penalty |
| Season | Q1 −0.01; Q2 +0.01; Q3 +0.01; Q4 −0.01 | Turnover seasonality |
| noise | Normal, σ = 0.008 | Bounded by the seed |

Opening inputs are pinned: LeasingScore 70, ServiceScore 60, ResidentSatisfaction 60, opening month October (Season −0.01), no penalties, noise 0. Opening occupancy: Alder 0.91 + 0.028 + 0.006 − 0.01 = 93.4%; Riverbend 94.4%; Pine Hollow 90.4%. The unit-weighted opening portfolio is 93.1%, only 0.1 points above criterion 4, so a player who does nothing will drift below the 93% threshold.

**Collections.**

> Delinquency rate = 0.035 + 0.001 × max(0, 60 − ResidentSatisfaction) − 0.005 × [collections push active]

**Resident satisfaction (RS, v0.4).** Each community has its own RS, 0–100. Opening value 60. Monthly update, measured at month end after every term below:

> RS(t+1) = clamp(0, 100, RS(t) + 0.2 × (ServiceScore − 60) + 0.5 × (60 − RS(t)) − 0.5 × (resident-reported non-critical work orders open over 7 days, per order) − 5 × (critical safety work orders open over 14 days, per order) − 3 × [failed inspection this month] − 0.5 × Σ(renewal increase above 3%, in percentage points, per renewal this month, scaled to 100 units by multiplying by 100 / units) − 0.5 × [renewal priced above market] − 2 × [collections push active] − 3 × [adverse fair-housing finding open and uncorrected] − 1 × [any complaint open and uncorrected] − one-time terms in the month they occur: 3 for a plumbing or HVAC emergency, 10 for a confirmed dismissal, 10 for confirmed retaliation, 5 for a deposit or owner-trust Trust Violation, 2 for contract termination or transfer; +2 when a complaint is closed by verified correction)

The first two terms are the service driver and drift back toward 60. Renewals at or below a 3% increase are neutral. Opening state: ServiceScore 60, opening renewals at or below 3%, no events, so RS stays at 60.

**Service score (v0.4).** ServiceScore = clamp(0, 100, 60 × Q_avg − 5 × active discretionary cuts + 5 × active service investments, max +15), where Q_avg is the average service-quality multiplier of staff assigned to the community. Restoring a cut means reinstating that line for one month at full cost (about $2,000 for all three lines). With all three investment tiers, ServiceScore reaches 75 and RS settles near 66, so criterion 8 is reachable. The three tiers cost $4,500 per month, which the opening business cannot afford. Whether criterion 8 is reachable therefore depends on financing, a question for the owner.

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
| **Signal** | Stakeholder sentiment (Warm, Neutral, Cool, Hostile), lender appetite (Open, Cautious, Closed), market trend, upcoming events after their warning signal | Tier label plus trend arrow |

**Forecast band (monthly half-width):**

> Band = 0.02 × monthly gross revenue + 0.10 × receivables over 60 days + 0.5 × open event exposure

Bands widen as receivables age, so keeping collections current keeps the forecast precise.

### 3.4 Random events

Each community averages one event every six months (λ = 2 per year). Category weights:

| Event | Weight | Cost | Effects | Warning signal |
|---|---|---|---|---|
| Plumbing or HVAC emergency | 30% | $3,000–$12,000 (Owner Trust) | Critical work order; resident satisfaction −3 | Aging work orders (about 25% foreseeable) |
| City code inspection | 20% | Fee $0–$500; repairs $1,000–$6,000 | Compliance record; city relationship | Inspection notice 2 weeks ahead |
| Local market softening | 15% | None | Base occupancy −1.5 pts for 3 months | Market trend 1–2 months ahead |
| Resident dispute (fair-housing complaint) | 10% | Set by the chosen response (§3.8); no separate charge | Residents and city | Low signal |
| Vendor failure | 15% | Vendor costs +30% for 2 months | Work-order backlog | Late vendor invoices |
| Owner request | 10% | None | Owner sentiment ±5; options always include one resident-protective choice; an owner cannot order deferral of life-safety repairs (§3.8) | Direct owner contact |

About 60% of events have a warning signal, so the player can prepare or mitigate.

### 3.5 Recovery ladder

**Runway** = corporate cash ÷ trailing 3-month average net corporate burn. If burn is zero or positive, the dashboard shows "cash-positive."

| Level | Name | Entry trigger | Exit condition | Immediate effects |
|---|---|---|---|---|
| 0 | Stable | Runway ≥ 3 months; no covenant at risk | n/a | None |
| 1 | Watch | Runway 2–3 months, or one covenant at risk | Runway ≥ 3 months for 2 consecutive months | Cost review prompt; collections push available |
| 2 | Warning | Runway under 2 months, or any covenant breached | Runway ≥ 2.5 months for 3 consecutive months and covenants passing | Lender notified (lender reputation −5); partner and restructuring options unlock |
| 3 | Probation | Runway under 1 month; payroll or vendor payment over 30 days late; any Trust Violation | Runway ≥ 2 months for 3 consecutive months | Lender may freeze the line; owner may terminate a contract on 30 days' notice |
| 4 | Restructuring | Cannot meet payroll after all available levers are used | Runway ≥ 3 months for 6 consecutive months | Forced choices: layoffs, contract sale, partner dilution |
| 5 | Insolvency | Level 4 for 90 consecutive days with corporate cash below zero and no lever left | n/a (game over) | Game over |

**Recovery levers.** Levels 0–3 always offer at least one non-destructive lever. At Levels 4 and 5 the restructure and partner options are offered when eligible; if neither is available, the player faces forced choices, and each such card is marked destructive.

| Lever | Available at | Immediate effect | Lag | Side effects | Limit |
|---|---|---|---|---|---|
| Collections push | Any | Recovers up to $2,000 of delinquent rent into Owner Trust over 60 days; corporate gains only its fee share (about 6%) and the owner receives the rest; delinquency −0.5 pt | 30–60 days | Resident satisfaction −2 in each month the push is active (one month per use). Permitted: payment plans, hardship review, reminders, and legally required notices. Not permitted: threats, harassment, public or third-party pressure, contacting employers, and fee-driven pressure. The permitted list is an owner-verification item | Once per quarter |
| Cut discretionary spend | Any | +$500–$2,000 per month. Discretionary lines are software, marketing, and miscellaneous ($2,000 at opening) | Immediate | ServiceScore −5 until restored (restore = reinstate the line for one month at full cost); capacity −5 pts per person; morale −3 | None |
| Service investment | Any | −$1,500 per month per tier (corporate cost). Each active tier gives ServiceScore +5; up to three tiers stack (+15) | Immediate | Ongoing cost; no resident-side cost | Three tiers |
| Draw revolving line | Lender-dependent | Up to the line limit | Immediate | Interest cost; covenant ratio worsens; lender sentiment −3 | $30,000 (Foothill) |
| Request owner fee advance | Owner sentiment Warm or better | One to two months of that owner's fee | Immediate | Credited back over later months; owner trust −3 at request | Once per owner per year |
| Defer part of payroll (up to 25%) | Any | Cash timing relief | Repaid by next payroll | Morale −10; burnout +5; compliance issue if not repaid | Two months per year |
| Reduce staff hours or lay off | Level 2 or above | Monthly savings | Immediate | Severance; employee reputation −10; city reputation −3 | None |
| Sell or transfer a contract | Level 3 or above | One-time cash; loss of that fee stream | 60–90 days | Owner relationship damage; lender review | One per year |
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

### 3.8 Resident-facing consequences (v0.5)

**Glossary (R2).**
- *Verified correction:* the vendor completes the work, and a re-inspection or documented re-test passes. A status change alone is not a correction.
- *Documented non-retaliatory reason:* one reason code from the list, logged on the decision card before the action. Codes: nonpayment, lease violation, owner-approved sale, or unit condition unrelated to the complaint. The list is an owner-verification item.
- *Filing:* any eviction, rent-increase notice, or non-renewal notice issued to a complainant.
- *Deferred maintenance:* any open work order past 14 days, or any deferred critical item.
- *Resident-reported:* logged through the resident intake channel. The company cannot decline intake.
- *Above market:* asking rent above the community's market comp (§3.2).
- *Driven by low RS:* a move-out in a month where the prior month-end RS was below 50.
- *Open compliance record:* open until its matter is closed by verified correction or written clearance.

**Rent increases (K1, R7, R9).**
- **Cap:** cumulative increases over any 12 months may not exceed 5% plus the local CPI change, capped at 10% (AB 1482; §10). The CPI input is owner-verified. An increase that would exceed the cap is unavailable to the player.
- **Notice:** 30 days if the cumulative 12-month increase is 10% or less; 90 days if above 10%.
- **Resident cost:** each renewal above 3% costs 0.5 RS per percentage point above 3, scaled to 100 units. Example: a 6% increase in a 64-unit community costs 0.5 × 3 × 100 / 64 ≈ 2.3 RS. Renewals at or below 3% are neutral.
- **Market check:** a renewal priced above market costs 0.5 RS and adds the P_gap penalty (§3.2).

**Re-letting (B5).** A unit vacated by a company-initiated non-renewal may be re-let only at no more than the prior rent plus the cap (same formula). A non-renewal needs a reason code shown on the decision card before the action. Displacement is recorded as a resident outcome: the vacated household costs community RS 1 point, one time.

**Turnover (B1).**
- Each move-out costs the owner a turn of $1,200–$2,500 from Owner Trust and about 25 days of vacancy. The loss is the owner's, and it lowers the fee base.
- **Avoidable turnover:** a company-initiated move-out (non-renewal, above-market renewal, increase above 3%, or a move-out driven by low RS).
- A company-initiated move-out earns no new-lease fee on re-letting that unit within 12 months. The company also loses its fee on the vacancy, so the turnover nets the company a loss.
- Avoidable turnover appears on the owner statement and lowers owner sentiment by 2.
- **Resident-initiated move-outs** are modeled. Each unit's monthly probability is 0.01 + 0.002 × max(0, 50 − RS), capped at 5%.

**Cost cutting (B2).** Discretionary cuts lower ServiceScore, and service investments raise it (§3.2). Non-critical repairs lower RS through resident-reported work orders (§3.2). Staff cuts lower Q and therefore ServiceScore. Every cut card shows its resident cost before the choice.

**Safety (B3, B4, R3).**
- *Critical safety work order* is one on this list (owner-verification item): no heat, no water, gas leak, electrical hazard, lock or door-security failure, sewage backup, pest infestation, or fire-safety defect. This is the only term used for safety rules.
- A critical order open more than 14 days costs 5 RS per month, per order, and adds a compliance record while open.
- Closing a critical order requires verified correction. A reopen within 90 days re-applies the penalty from the original open date.
- **Owner refusal of a life-safety repair (B3):** the company may use the Owner Capital Reserve for a critical repair up to $5,000 per repair without owner approval, with owner notice within 24 hours. Above $5,000, the company advances the repair and bills the owner, and owner sentiment drops by 5. Reserve use rules are an owner-verification item. The order stays open and counted until verified correction.
- A failed inspection with a critical-list finding opens a critical order. Any failed inspection costs 3 RS. A missed inspection costs city reputation 10, adds a compliance record, and costs 1 RS for that month.
- **Compliance records:** each open record reduces city reputation by 2. Three or more open records trigger a lender review (finance-designer defines the covenant effect).
- **Inspection readiness (R10):** an optional checklist costs $300 per month per community and halves the failed-inspection chance there.

**Fair housing (B1, B4, R1, R6).** A complaint opens one decision card with three responses:
- **Investigate** (about $1,500, 30 days). Provisionally 40% of investigations find an adverse condition (Band). If clean, the complaint closes with no RS change (R1). If adverse, the company must correct it (about $1,000–$6,000). The complaint closes on verified correction. Until then the condition costs 3 RS per month and city reputation −5.
- **Settle** (about $3,000–$5,000 from Owner Trust). Settlement does not correct the condition, so the condition persists at 3 RS per month and owner sentiment drops 3 once. Settlement terms are an owner-and-counsel item (S4).
- **Dismiss** ($0 now). The condition exists with the same provisional 40% chance, hidden from the player. If it exists, it persists at 3 RS per month until corrected. Each month it exists there is a 5% chance it is confirmed. Confirmation forces correction (about $3,500), and sets city reputation −15, 10 RS one-time, a compliance record, and the 12-month community flag. If no condition exists, Dismiss closes the complaint.
- **Dismiss versus Investigate (B1c):** an uncorrected condition costs 3 RS per month, so Dismiss expects about 14 RS-months over 12 months against about 1 for Investigate. Systems-designer confirms cash parity.
- **Retaliation:** any filing or adverse action against a complainant within 12 months is confirmed retaliation unless a documented non-retaliatory reason was logged first. Effect: city reputation −15, 10 RS one-time, a compliance record, and the 12-month community flag. The tag appears on the decision card before the action. The 3% trigger is a game rule; owner verifies the legal scope (S7).
- **12-month community flag (B2b):** confirmed dismissal or confirmed retaliation sets a flag for 12 months. An active flag caps the outcome at Struggling (§1.7). This is the durable penalty; one-time RS hits decay.
- **City reputation (B2a):** below 40, bids get −0.05 (§3.2).

**Other consequences.**
- A deposit or owner-trust Trust Violation costs 5 RS one-time at the affected community (R4). Termination or transfer of a contract costs 2 RS one-time, and deposit transfer follows legal review.
- **Owner sentiment tiers (T4):** score 0–100. Hostile below 30; Cool 30–49; Neutral 50–69; Warm 70–84; Strong 85 and above. Sentiment rises 1 per month only when RS is 60 or higher, there is no deferred maintenance, and no critical item is open (R5).
- **Owner request, resident-protective option (R-list in §3.4):** any option that defers no critical item and reduces no RS.
- **Screening** is not in the slice. Any future screening option requires uniform criteria and ethics review.

### 3.9 Resident satisfaction floor (v0.5)

- **Trigger:** month-end RS below 55 for two consecutive month-ends. Owner sentiment drops 5, once.
- **Decision card (R6):** three options.
  - *Fund targeted repairs* of the named drivers: $2,000–$5,000, 30-day lag. RS +1 per month for three months once the drivers clear.
  - *Add a service investment tier* for this community: $1,500 per month, +5 ServiceScore (§3.5).
  - *Accept and report:* no cost, owner sentiment drops 3 more, and the card stays open.
- The card closes at the first month-end with RS of 55 or higher.
- Criterion 8 and Promising both require no floor breach in any month (v0.4).

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
5. Confirm that the Brightwater term loan is optional in the slice, so the slice does not depend on it.
6. Confirm that the **default hard-stop is insolvency only**, with stop-loss as an opt-in setting (D-010).

Once these are approved, the Decision Log entries move from **Proposed** to **Approved**. Implementation may then begin under GDD §14.

## 7. v0.2 choices (owner delegated: "You choose")

1. **L-02 removed from the slice** and deferred to P2. Criterion 5 uses L-01 or a new lead.
2. **Collection loss applied** at 3.5% delinquency. Opening net is about −$247/month, and the business is cash-negative from opening.
3. **Founder draw kept as an operating expense** (conservative). Treating it as a distribution is a one-line change if you prefer it.
4. **Pine Hollow trigger kept** at two consecutive months below 90%; criterion 4 changed to match.
5. **Criterion 3 counted per owner**, not portfolio-wide.
6. **Non-destructive lever rule kept** for Levels 0–3; Levels 4–5 spell out their options (§3.5).
7. **Opening pinned to October** with stated inputs; occupancy bases recalibrated to Alder 0.91, Riverbend 0.92, Pine Hollow 0.88.
8. **Status label: "Proposed,"** matching the Decision Log.
9. **D-007 approval evidence:** GDD §15 records the owner's acceptance of all board recommendations. D-007's text is unchanged.
10. **Ethics blockers B1–B4** addressed in §3.8. Ethics re-review is still required before approval.

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

## 10. Legal figures (web-checked, owner to confirm)

These come from secondary sources (law-firm pages, property-management guides, and a San Francisco Rent Board notice). They are not statute text. Each needs confirmation on leginfo.legislature.ca.gov or with counsel before it is treated as fact.

| Item | Figure used in this spec | Sources | Status |
|---|---|---|---|
| Rent increase cap | 5% plus local CPI change, capped at 10% (AB 1482, Civil Code §1947.12) | [TenantCloud](https://www.tenantcloud.com/rent-collection/california-rent-increase-laws); [City of Downey](https://www.downeyca.org/our-city/departments/community-development/housing-division/ab1482) | Current CPI figure conflicts across sources; owner to fill from the HCD site. Exemptions (for example, newer buildings) not checked. |
| Notice for increases | 30 days if cumulative 12-month increase is 10% or less; 90 days if above 10% | [Costa-Hawkins on AB 1110](https://costa-hawkins.com/ca-legislative-update/rent-increases-above-10-percent-now-require-90-days-notice-not-60/); [SF Rent Board archive](https://www.sf.gov/reports--december-2019--san-francisco-rent-board-news-archive-2019) | Some law-firm pages still say 60 days; these predate the 2020 change. Confirm §827. |
| Mailing | Not modeled | Auditor: the 5-day add-on comes from general civil procedure rules, not the notice statute | Removed from the spec |
| Security deposit | Return and itemize within 21 days; bad faith can cost up to 2× the deposit | [terms.law, CA Security Deposit Hub](https://terms.law/CA-Security-Deposit-Hub/) | Secondary source; confirm §1950.5. One source claims a one-month deposit cap for leases after July 1, 2024. Conflicting; not used in this spec. |
| Late fees | No fixed cap; must be a reasonable estimate of loss (Civil Code §1671) | [Tellus](https://www.tellusapp.com/blog/late-fees-in-california/) | Confirm §1671. The 5% figure is a market convention, not law. The spec does not model a late-fee amount. |

**v0.4 correction (auditor):** Outcome tiers now cover every combination: 6 or 7 criteria with RS below 65 is Struggling (§1.7).

## 11. v0.5 changes (ethics Hold on v0.4)

Owner decisions (D-016): company uses the owner's capital reserve for life-safety repairs up to $5,000 with owner notice; re-letting after a company non-renewal is capped at the renewal limit; the cap is cumulative over 12 months; service tiers stay at three.

- **B1 (dismissal):** dismissal keeps the condition open, costs 3 RS per month, and carries a confirmation path. Systems-designer confirms cash parity with investigation.
- **B2 (decay and city reputation):** a 12-month community flag caps the outcome at Struggling. City reputation below 40 raises bid costs.
- **B3 (owner refusal):** capital reserve path added (owner decision).
- **B4 (verified correction):** defined. Critical orders close only on verified correction. Reopens within 90 days re-apply the penalty.
- **B5 (re-letting):** capped at the renewal limit with a reason code.
- **R1:** clean investigations close the complaint. **R2:** glossary added. **R3:** one safety term. **R4:** owner-trust violations cost 5 RS. **R5:** sentiment gate and deferred-maintenance definition. **R6:** floor card has three options. **R7:** cap is cumulative. **R8:** criterion 6 is measured at month-end. **R9:** renewal scale normalized to 100 units. **R10:** inspection-readiness checklist. **R11:** owner decision (keep three tiers).

**Still open:** balance testing (systems-designer); the legal items in §10 (parked by owner); ethics re-review and auditor recheck of v0.5 before approval.
