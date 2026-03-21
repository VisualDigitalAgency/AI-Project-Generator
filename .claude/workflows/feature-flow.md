# Feature Development Workflow

## Phases
```
BACKLOG ──► DESIGN ──► CONTRACT ──► BUILD ──► TEST ──► REVIEW ──► DONE
```

## Phase Details

### 1. DESIGN
- Agent: `critic`
- Deliverable: Updated task file with full spec
- Gate: Spec approved before BUILD

### 2. CONTRACT
- Agent: `feature-builder`
- Deliverable: Updated `context/api-contracts.md`
- Gate: No breaking changes without version bump

### 3. BUILD
- Agent: `feature-builder`
- Deliverable: Working code in correct service(s)
- Gate: Linter + type-check pass

### 4. TEST
- Agent: `test-agent`
- Deliverable: Unit + integration tests passing
- Gate: Coverage threshold met

### 5. REVIEW
- Agents: `reviewer` → `critic` → `security-auditor`
- Deliverable: Approval or change requests
- Gate: All reviewers approve

### 6. DONE
- Move task file to `tasks/done/`
- Write summary to `runs/run-{id}/`
- Update `memory/decisions.md`
