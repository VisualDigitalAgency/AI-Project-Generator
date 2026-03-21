# Bug Fix Workflow

## Phases
```
REPORT ──► REPRODUCE ──► ISOLATE ──► FIX ──► VERIFY ──► REVIEW ──► DONE
```

### 1. REPRODUCE
- Write a failing test first
- Gate: Test reliably fails before proceeding

### 2. ISOLATE
- Agent: `debugger`
- Identify exact file, line, and condition

### 3. FIX
- Agent: `feature-builder`
- Minimal change only — no unrelated refactoring

### 4. VERIFY
- Failing test now passes
- No regressions in full test suite

### 5. REVIEW
- Agent: `reviewer`
- Fast-track review (security check only if auth-related)

### 6. DONE
- Add to `memory/anti-patterns.md` if applicable
- Log in `memory/decisions.md`
