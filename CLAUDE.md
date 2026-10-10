# Property Empire AI — project instructions

## Current phase

Pre-production design. **No code, data pipelines, or deployment** until the P0 locks in `outputs/Property_Empire_AI_P0_Design_Locks.md` are approved (GDD §14).

## Source of truth

Read these before any design work, in this order:

1. `outputs/Property_Empire_AI_Master_Game_Design_Document.md` (GDD)
2. `outputs/Property_Empire_AI_Decision_Log.md`
3. `outputs/Property_Empire_AI_P0_Design_Locks.md`

## Rules

1. **Locked decisions (D-001 to D-007) do not change** without a new Decision Log entry: date, reason, affected systems, and which design material must be revised. Update the Decision Log in the same change.
2. **Work the P0 list first** (GDD §13). P1 and P2 items start only after P0 is approved.
3. **Every number has a cause.** Any formula, rate, or threshold states its drivers and starting value. No hidden multipliers (D-010).
4. **Housing is a real stake.** Fairness, safety, and resident outcomes are operating concerns, not flavor (GDD §12, business and ethical design).
5. **Names are fictional** (D-003). Check placeholder names against real firms before approval.
6. Commits go to the designated branch. Do not open a PR unless asked. Do not put model identifiers in commits, PRs, or repo files.

## Design team

Agents live in `.claude/agents/`. The lead routes work and owns change control.

| Agent | Owns | Use for |
|---|---|---|
| `design-director` | GDD, Decision Log, P0 status, change control | Any change to locked decisions; P0 tracking; cross-discipline conflicts. **Start here.** |
| `systems-designer` | Simulation formulas, balance, staffing and burnout, bid odds | Formulas, coefficients, tuning, causal chains |
| `finance-designer` | Ledgers, revenue recognition, cash timing, lender criteria | Accounting model, runway, covenants, trust rules |
| `narrative-designer` | Characters, relationships, conversations, arcs | Cast, dialogue consequences, relationship systems |
| `ux-designer` | Dashboard, decision cards, information visibility | Screens, decisions per screen, explain-this layer |
| `ethics-reviewer` | Resident outcomes, fair housing, compliance realism | Review of any change touching residents, compliance, or exploitation risk |

Routing: a change that touches a locked decision goes to `design-director` first. Any change that touches residents or compliance also goes to `ethics-reviewer` before it is approved.
