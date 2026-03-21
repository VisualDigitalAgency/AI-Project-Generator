# Command: Write Tests

## Usage
"Write tests for [FUNCTION/MODULE/ENDPOINT]. Cover: [specific scenarios]."

## Test Levels
| Level       | File Pattern              | Scope                                 |
|-------------|---------------------------|---------------------------------------|
| Unit        | `*.unit.test.ts`          | Pure logic, all deps mocked           |
| Integration | `*.integration.test.ts`   | Real DB (test schema), real HTTP      |
| E2E         | `*.e2e.test.ts`           | Full user journey, Playwright         |

## Always Cover
- Happy path
- Validation errors (missing fields, wrong types)
- Auth failures (missing token, wrong role)
- Not found (invalid ID)
- Concurrent operations (where relevant)
