# Command: Fix Bug

## Usage
"Fix bug: [DESCRIPTION]. Seen in: [SERVICE/FILE]. Error: [ERROR_MESSAGE]."

## Steps Claude Must Follow
1. Write a failing test that reproduces the bug FIRST
2. Trace root cause using `debugger` agent
3. Apply the minimal fix — no unrelated refactoring
4. Confirm the failing test now passes + no regressions
5. Check `memory/anti-patterns.md` — add entry if this is new
6. Log root cause + fix in `memory/decisions.md`
