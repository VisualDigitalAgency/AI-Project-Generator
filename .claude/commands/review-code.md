# Command: Review Code

## Usage
"Review: [FILE or PR description]"

## Checklist
### Correctness
- [ ] Logic matches the acceptance criteria
- [ ] Edge cases handled (null, empty, concurrent)
- [ ] Error paths return proper JSON-RPC error responses

### Security
- [ ] No hardcoded secrets
- [ ] SQL queries parameterized
- [ ] Auth enforced on all protected routes
- [ ] Input validated + sanitized

### Quality
- [ ] Tests present (unit + integration)
- [ ] No `any` in TypeScript
- [ ] No anti-patterns from `memory/anti-patterns.md`
- [ ] Follows patterns in `memory/patterns.md`
- [ ] API contract updated if interface changed

### Output
APPROVE | REQUEST_CHANGES | REJECT + inline comments
