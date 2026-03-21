<!-- READ ONLY — DO NOT EDIT DIRECTLY. Standard: IEEE 829 -->

# Test Plan: {{PROJECT_NAME}}
_version: {{TEST_PLAN_VERSION}} | last-updated: {{LAST_UPDATED}}_

---

## TEST STRATEGY

| Level | Scope | Framework | Runs On | Gate |
|-------|-------|-----------|---------|------|
| Unit | Pure functions, services | Vitest / pytest / go test | Every commit | CI: block merge |
| Integration | API endpoints + real DB | Vitest / pytest | Every PR | CI: block merge |
| E2E | Critical user journeys | Playwright | Every merge to main | CI: block deploy |
| Load | Performance under traffic | k6 | Weekly + pre-release | Manual gate |
| Security | OWASP Top 10 | Trivy + manual | Every release | Block release |

---

## COVERAGE TARGETS

| Layer | Target | Measure |
|-------|--------|---------|
| Business logic (services/) | 90% line coverage | Vitest --coverage |
| API handlers | 100% of defined methods | Integration tests |
| Auth flows | 100% happy + error paths | Integration tests |
| E2E critical flows | Top {{TOP_N_FLOWS}} user journeys | Playwright |

---

## TEST ENVIRONMENTS

| Env | DB | Seed Data | Reset Policy |
|-----|----|-----------|--------------|
| unit | None (mocked) | — | Per test (beforeEach) |
| integration | Postgres (test schema) | fixtures | Per test (transaction rollback) |
| e2e | Staging DB | Seeded users | Per suite run |
| load | Dedicated load DB | Generated data | Before each load run |

---

## CRITICAL TEST CASES

### Auth
| ID | Scenario | Expected |
|----|----------|----------|
| AUTH-001 | Register with valid email/password | 200, token returned |
| AUTH-002 | Register with duplicate email | -32006 Conflict |
| AUTH-003 | Login with correct credentials | 200, token + refresh |
| AUTH-004 | Login with wrong password | -32001 Unauthorized |
| AUTH-005 | Access protected route without token | -32001 |
| AUTH-006 | Access protected route with expired token | -32001 |
| AUTH-007 | Refresh with valid refresh token | New token pair |
| AUTH-008 | Refresh with already-used refresh token | -32001 (rotation) |
| AUTH-009 | Admin-only route as user role | -32002 Forbidden |

### Core Resource
| ID | Scenario | Expected |
|----|----------|----------|
| RES-001 | Create resource with valid params | 200, resource returned |
| RES-002 | Create with missing required field | -32004 Validation |
| RES-003 | Get existing resource | 200, resource |
| RES-004 | Get non-existent resource | -32003 Not Found |
| RES-005 | Update own resource | 200, updated resource |
| RES-006 | Update another user's resource | -32002 Forbidden |
| RES-007 | Delete as admin | 200, success |
| RES-008 | Delete as non-admin | -32002 Forbidden |
| RES-009 | List with pagination params | Correct page/total |

### Rate Limiting
| ID | Scenario | Expected |
|----|----------|----------|
| RATE-001 | Exceed auth endpoint limit | -32005, Retry-After header |
| RATE-002 | Exceed global limit | -32005 |
| RATE-003 | Admin user above default limit | Passes (higher tier) |

---

## TEST DATA STRATEGY

| Data Type | Approach |
|-----------|----------|
| Users | Factory: `createUser({ role })` |
| Auth tokens | Helper: `getToken(userId)` |
| Domain entities | Factory: `create{{ENTITY}}({...overrides})` |
| Edge case strings | Fixtures file: `tests/fixtures/strings.ts` |
| Large datasets | Generator: `tests/generators/bulk.ts` |

Rule: Never use production data in tests. Never hard-code IDs.

---

## LOAD TEST SCENARIOS

| Scenario | VUs | Duration | SLO |
|----------|-----|----------|-----|
| Baseline | 10 | 5 min | P99 < 200ms |
| Steady state | 100 | 15 min | P99 < 500ms, error < 0.1% |
| Spike | 10 → 500 → 10 | 5 min | No crash, recovery < 2 min |
| Soak | 50 | 2 hours | No memory leak, P99 stable |
