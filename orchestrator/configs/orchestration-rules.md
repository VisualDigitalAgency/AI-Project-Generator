# Orchestration Rules

## Phase Rules
1. Phases run sequentially — never in parallel
2. Each phase has a gate condition that must pass before the next begins
3. Any failed gate stops the run and logs the failure

## Agent Rules
4. External agents always require `requiresApproval: true` confirmation
5. Trusted agents run automatically; external agents wait for human approval
6. No agent may write to `database/migrations/` — only humans do

## Memory Rules
7. Every completed run writes a summary to `runs/run-{id}/run.md`
8. Decisions must be logged in `memory/decisions.md` within the same run
9. Context is refreshed at the start of each phase

## Safety Rules
10. `deploy` phase is always manual — never automated
11. Any CRITICAL or HIGH security finding blocks all subsequent phases
12. DB migration approval required — logged in `memory/decisions.md`
