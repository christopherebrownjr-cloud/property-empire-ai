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

## Design team and reporting lines

Agents live in `.claude/agents/`. The owner (human user) is the top of the chain.

| Agent | Reports to | Checked by | Owns |
|---|---|---|---|
| `design-director` | Owner | `design-auditor` | GDD, Decision Log, P0 status, change control. **Start here.** |
| `systems-designer` | `design-director` | `finance-designer` (money numbers), `design-auditor` | Formulas, balance, staffing and burnout, bid odds |
| `finance-designer` | `design-director` | `systems-designer` (formula inputs), `design-auditor` | Ledgers, revenue recognition, cash timing, lender criteria |
| `narrative-designer` | `design-director` | `ux-designer` (player-facing), `design-auditor` | Characters, relationships, conversations |
| `ux-designer` | `design-director` | `narrative-designer` (conversation content), `design-auditor` | Dashboard, decision cards, visibility |
| `ethics-reviewer` | `design-director` | `design-auditor` | Review gate for residents, fair housing, compliance. Holds are binding. |
| `design-auditor` | Owner | None (read-only; reports to the owner so it can check the director) | Checks every agent's output: arithmetic, log hygiene, consistency, scope |

Routing: a change that touches a locked decision goes to `design-director` first. Anything touching residents or compliance also goes to `ethics-reviewer` before approval. Every agent's output goes through its checker before it is treated as settled.
