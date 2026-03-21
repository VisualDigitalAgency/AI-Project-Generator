# API Specification

See `.claude/context/api-contracts.md` for the canonical contracts.

## Base URL
`POST /rpc` — all JSON-RPC 2.0 methods

## Authentication
All methods except `auth.login` and `auth.register` require:
```
Authorization: Bearer <access-token>
```

## Rate Limits
| Tier | Limit |
|------|-------|
| Default | 100 req/min |
| Auth endpoints | 10 req/min |
| Bulk operations | 5 req/min |

## SDKs & Clients
- TypeScript: `services/shared/contracts/jsonrpc.ts`
- See `frontend/services/` for frontend API client
