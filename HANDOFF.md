# Handoff: Property Empire AI

**Date:** 2026-10-11
**Branch:** `claude/stoic-curie-gcd00m` (origin: github.com/christopherebrownjr-cloud/property-empire-ai)
**Phase:** P0 design approved by owner (override of the ethics Hold, D-029). Implementation may begin.

## Read these first, in order

1. `CLAUDE.md`: project rules, agent routing, and the no-legal-review rule.
2. `outputs/Property_Empire_AI_Master_Game_Design_Document.md`: the GDD.
3. `outputs/Property_Empire_AI_Decision_Log.md`: every decision. D-001 to D-007 are locked. D-008 to D-031 are approved under the owner's override.
4. `outputs/Property_Empire_AI_P0_Design_Locks.md`: the P0 spec, now v1.9. Read §1 (opening portfolio), §2 (accounting), §3 (formulas, reputation, events, recovery, residual risks in §3.10), §4 (entities), and §5 (dashboard).
5. `outputs/Ethics_Review_P0_v1.7.md`: the ethics review that the owner overrode.

## What is decided (summary)

- **Game:** Sacramento-based property management sim. Vertical slice is market-rate residential management, three communities (Larkspur Court, Stillwater Terrace, Cinder Hollow Flats), 132 units, twelve months.
- **Opening money:** $48,000 corporate cash, $30,000 revolving line. Opening net is about −$402 a month before any hire.
- **Accounting:** corporate and client money are separate ledgers. Trust funds never fund corporate spend. Emergency repair funding comes from the management contract and budget (D-030).
- **Resident satisfaction:** 0–100 per community, opening 60. Floor at 55 for two month-ends. The brake blocks only the collections push below 60 and releases at 60 (D-031). Rent increases are allowed; their cost shows as occupancy and turnover.
- **Safety:** eight critical hazard classes. Critical repairs must be fixed. Inspector sign-off is company-engaged, with certification by class, two firms per class, two engagements per order, and an owner decision card after two rejections (D-027, D-028).
- **Names:** every name in the game is invented (D-030). The owner has waived the real-firm check.
- **Game values:** rent, notice, deposit, and late-fee values in §10 are game values. No legal review is part of the project (D-030).
- **Calendar:** inspector firm expiries are 2028-12-31 (game year 2028 confirmed).

## Open items (not overridden)

- The ethics review of the latest changes (D-030 and D-031) has not been run. Those changes give rent increases a freer hand, which is a change to resident protection.
- The residual risks the owner accepted are listed in D-029 and P0 §3.10.
- Systems-designer should check the RS balance (the 4.5 RS a month example, service tier costs) and the pool sizing.

## Access status

- **GitHub:** pushes to `origin` work from this session. Confirmed.
- **Vercel:** not available in this session. There is no Vercel connector, CLI, or token. To enable it, add a read-only Vercel API token as an environment variable in the cloud environment settings, then start a new session. The variable name should be agreed first. Do not paste the token into chat.

## Coding plan (milestones 1–5 done; see the milestone list below)

- **Stack:** TypeScript in the browser, no install needed for players.
- **Milestone 1:** the 12-month vertical slice.
- **Order:** (1) project scaffold, tests, and CI; (2) simulation core (ledgers, monthly close, occupancy, RS, staffing, bids, events); (3) the seven dashboard screens from P0 §5; (4) the twelve-month success criteria and outcome tiers from P0 §1.7.
- **Rules:** commit to the designated branch, no PR unless asked, no model identifiers in commits or repo files.

## Agents

Design agents live in `.claude/agents/`: `design-director`, `systems-designer`, `finance-designer`, `narrative-designer`, `ux-designer`, `ethics-reviewer`, `design-auditor`. Any change to a locked decision goes to `design-director` and needs a Decision Log entry. Any change to residents or compliance goes to `ethics-reviewer`.

## Resuming

Start a new session in this repo, and load the context above. Suggested first prompt:

> Read HANDOFF.md, then CLAUDE.md, then the GDD, the Decision Log, and P0 §1–§5. Confirm the state, then scaffold the TypeScript project for milestone 1.
