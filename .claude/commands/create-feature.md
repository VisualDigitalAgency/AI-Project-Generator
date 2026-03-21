# Command: Create Feature

## Usage
"Create feature: [NAME]. Acceptance criteria: [CRITERIA]. Affected services: [SERVICES]."

## Steps Claude Must Follow
1. Read `context/architecture.md` + `context/api-contracts.md`
2. Create `tasks/in-progress/[NAME].md` with task spec
3. Update `context/api-contracts.md` if new methods needed
4. Implement service logic (follow pattern in `memory/patterns.md`)
5. Implement frontend components (if applicable)
6. Write unit + integration tests
7. Run linter + type-check
8. Log decision rationale in `memory/decisions.md`
9. Move task file to `tasks/done/`

## Task File Template
```
---
type: feature
name: [NAME]
agent: feature-builder
priority: high|medium|low
services: [service-names]
---

## Goal
[What this feature achieves]

## Acceptance Criteria
- [ ] criterion 1
- [ ] criterion 2

## Notes
[Any constraints or context]
```
