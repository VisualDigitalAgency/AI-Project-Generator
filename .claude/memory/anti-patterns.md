# Anti-Patterns — Never Do These

## Backend
| Anti-Pattern | Why | Use Instead |
|---|---|---|
| Raw SQL in route handlers | Unmaintainable, SQL injection risk | Repository pattern |
| Secrets in source code | Security breach | Environment variables |
| Catching all errors silently | Hides bugs | Log + re-throw or return Result |
| Re-implementing JWT logic | Divergence bugs | Shared `auth/middleware.ts` |
| N+1 queries | Performance | Eager load with JOINs or DataLoader |
| Boolean parameters | Unclear call sites | Named options objects |

## Frontend
| Anti-Pattern | Why | Use Instead |
|---|---|---|
| `any` in TypeScript | Defeats type safety | `unknown` + type guards |
| `fetch` in components | Hard to test/reuse | Service layer in `frontend/services/` |
| Prop drilling > 2 levels | Fragile, verbose | Zustand store or React Context |
| `useEffect` for data fetching | Race conditions | React Query / TanStack Query |

## AI Workflow
| Anti-Pattern | Why | Use Instead |
|---|---|---|
| Starting build without reading context | Wrong assumptions | Always read `.claude/context/` first |
| Skipping tests | Regressions | Tests alongside every feature |
| Large sweeping refactors | Untraceable bugs | Small focused changes |
