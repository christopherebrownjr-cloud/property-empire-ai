# Property Empire AI — P0 Design Locks

**Status:** Proposed — pending owner review and approval (GDD §14: no implementation until P0 locks are approved)
**Date:** 2026-10-10 (v0.3: revisions recorded as D-013 and D-014)
**Governing documents:** Master Game Design Document §13 (P0 list); Decision Log D-001 to D-007 (locked, not changed here)
**Scope:** Design specification only. No code, data pipelines, or deployment.
**Logged as:** D-008 to D-014 in the Decision Log (D-013 records v0.2 revisions; D-014 records v0.3).

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

Criteria 3 and 6 must hold in every month, not only at month 12. Criterion 8 is also checked every month against the community floor in §3.9. Other criteria are measured at month 12.

| # | Criterion | Threshold |
|---|---|---|
| 1 | Contracts | All three management agreements active or renewed; zero owner terminations |
| 2 | Liquidity | Corporate cash ≥ 2.0 × monthly corporate expenses; never at Distress Level 3 or above during months 1–12 |
| 3 | Trust integrity | Zero trust-account violations in each of months 1–12; for each owner, owner statements delivered by day 10 in at least 11 of 12 months |
| 4 | Occupancy | Portfolio 12-month average ≥ 93%; no community below 90% for 2 or more consecutive months (matches the Pine Hollow termination trigger in C-03) |
| 5 | Growth | At least one new management contract won (L-01 or a new lead) |
| 6 | Compliance | In each of months 1–12: zero missed inspections and zero critical safety work orders open for more than 14 days |
| 7 | Team | No employee at burnout ≥ 85 for 2 or more consecutive months; founder below 85 at month 12 |
| 8 | Stakeholders | At month 12: all three owners at Warm or better sentiment and portfolio resident satisfaction ≥ 65 / 100; in every month, no community below the 55 floor (§3.9) |

**Outcome tiers:**

- **Stable:** All 8 criteria met, criterion 6 met in every month, and no community breached the §3.9 floor.
- **Promising:** 6 or 7 criteria met, including criterion 6 in every month and the resident part of criterion 8; no Distress Level 3 or above.
- **Struggling:** 4 or 5 criteria met, or Distress Level 3 or above reached, or criterion 6 failed in any month.
- **Distressed:** 3 or fewer criteria met, or Distress Level 4 or above reached.

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
| **Owner Capital Reserve** (one per community, restricted) | Owner | Required reserve transfers from Owner Trust | Capital and repair spend above threshold, with owner approval | No |
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

**Resident satisfaction (RS, v0.3).** Each community has its own RS, 0–100. Opening value: 60. Monthly update:

> RS(t+1) = clamp(0, 100, RS(t) + 0.2 × (ServiceScore − 60) + 0.5 × (60 − RS(t)) + 0.5 × renewals this month (capped at +2) − 0.5 × resident-reported work orders open over 7 days (capped at −3) − 5 × [critical safety work order open over 14 days] − 3 × [failed inspection this month] − 2 × [move-out forced by an increase above the cap] − 2 × [collections push active] + 2 × [settlement this month])

The first two terms give the service driver; the 0.5 × (60 − RS) term is drift back toward 60. Every other term is a named event or lever whose effect is shown on the community screen. The opening state is stable: ServiceScore 60 and no events leave RS at 60.

**Service score (v0.3).** ServiceScore = clamp(0, 100, 60 × Q_avg − 5 × active discretionary cuts), where Q_avg is the average service-quality multiplier (§3.2 staffing) of staff assigned to the community. Restoring a cut means reinstating that line for one month at full cost (about $2,000 for all three lines). *Balance note for systems-designer:* in v0.3 ServiceScore cannot rise above 60, so service has downside but no upside. A service-improvement lever is needed in v0.4.

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
| Resident dispute (fair-housing complaint) | 10% | Set by the chosen response (§3.8); no separate charge | Residents, city, and employee morale | Low signal |
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
| Collections push | Any | Recovers up to $2,000 of delinquent rent into Owner Trust over 60 days; corporate gains only its fee share (about 6%) and the owner receives the rest; delinquency −0.5 pt | 30–60 days | Resident satisfaction −2 for the month. Permitted: payment plans, hardship review, reminders, and legally required notices. Not permitted: threats, harassment, public or third-party pressure, contacting employers, and fee-driven pressure. The permitted list is an owner-verification item | Once per quarter |
| Cut discretionary spend | Any | +$500–$2,000 per month. Discretionary lines are software, marketing, and miscellaneous ($2,000 at opening) | Immediate | ServiceScore −5 until restored (restore = reinstate the line for one month at full cost); capacity −5 pts per person; morale −3 | None |
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

### 3.8 Resident-facing consequences (v0.3)

**Turnover (ethics B1).**
- Each move-out costs the owner a turn of $1,200–$2,500 from Owner Trust and about 25 days of vacancy. This is the owner's loss, and it lowers the fee base.
- A move-out the company initiates (non-renewal, or a renewal increase above the cap) earns no new-lease fee when the unit is re-let in the same cycle, and the company loses its fee on the vacancy. A company-initiated turnover therefore nets the company a loss, not a gain.
- Company-initiated turnover appears as "avoidable turnover" on the owner statement and lowers owner sentiment by 2.
- Renewal increases above 3% add a resident cost: −0.5 RS per affected unit, scaled to the excess. The cap itself (5% is the working figure) is an owner-verification item.

**Cost cutting (ethics B2).** Discretionary cuts lower ServiceScore (§3.2). Deferred non-critical repairs lower RS through resident-reported work orders (§3.2). Staff cuts lower Q and therefore ServiceScore. Every cut card shows its resident cost before the choice.

**Safety (ethics B3).**
- *Critical safety work order* means a work order on this list: no heat, no water, gas leak, electrical hazard, lock or door-security failure, sewage backup, pest infestation, or fire-safety defect. The list is an owner-verification item.
- A critical order open more than 14 days reduces RS by 5 per month, adds a compliance record, and cannot be cleared by pricing or occupancy changes.
- Life-safety repairs cannot be deferred for cash reasons. If the owner refuses approval, the refusal is logged, the case escalates, and the company's compliance record is affected.
- A failed inspection with a life-safety finding opens a critical work order automatically. Any failed inspection reduces RS by 3. A missed inspection reduces city reputation by 10 and adds a compliance record.

**Fair housing (ethics B4).** A complaint opens a decision card with one choice:
- **Investigate** (about $1,500, 30 days). Clean findings: city reputation neutral. Adverse findings: the company must correct the issue (about $1,000–$6,000), city reputation −5, and RS −3 until corrected.
- **Settle** (about $3,000–$5,000 from Owner Trust). RS +2, owner sentiment −3. Settlement does not end any underlying obligation (owner verification).
- **Dismiss** (no cost now). The complaint stays open for 12 months. Each month there is a provisional 5% chance that a later event confirms it. If confirmed: city reputation −15, RS −10 for the community, and a compliance record. The 5% and the 12-month window are owner-verification items and are shown as Signal.
- **Retaliation.** Any adverse action against a complainant within 12 months (non-renewal, rent increase, or filing) is tagged as retaliation risk. If confirmed, city reputation −15 and RS −10. The tag appears on the decision card before the action is taken.

**Other consequences (ethics suggestions).**
- A Trust Violation involving security deposits also reduces RS by 5 at the affected community.
- Termination or transfer of a contract hands residents to a new manager. RS −2 at that community, and deposit transfer follows the legal review.
- Owner statements show deferred maintenance as a liability. Owner sentiment does not rise from NOI that depends on deferred maintenance.
- **Screening** is not in the slice. Any future screening option requires uniform criteria and ethics review.

### 3.9 Resident satisfaction floor (v0.3)

- No community's RS may stay below 55 for two consecutive months. If it does, that community's owner sentiment drops by 5 and an owner-relations decision card opens.
- Criterion 8 (§1.7) is judged on the portfolio average at month 12 and on this floor in every month.

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
| **Executive Snapshot** (home) | Am I okay this month, and what matters most? | Choose the top three actions for the month; open the exception queue; decide whether to request a lender review | Cash (exact) and runway (band); net monthly result; portfolio occupancy; open risk count; five reputation tiles; distress level |
| **Decision Inbox** | What needs a response before its deadline? | Respond to an owner; approve or decline spend; approve or decline a hire request; respond to a city notice; answer a lender request | Decision cards sorted by deadline × impact |
| **Communities** (list and detail) | Which property is drifting? | Set ask rent; approve a work order; reassign staff; request owner capital; prepare for an inspection | Occupancy, delinquency, aged work orders, inspection status, owner sentiment, NOI (derived) |
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

Still with the owner: approval of P0 and D-008 to D-013, and verification of all California legal rules before they are modeled.

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
