# Skill: API Design (JSON-RPC 2.0)

## Why JSON-RPC 2.0?
- Single endpoint — simple routing, easy to mock
- Explicit method names — self-documenting
- Standard error codes — consistent error handling
- Works over HTTP and WebSocket with the same envelope

## Method Naming Convention
`<service>.<action>` — e.g. `auth.login`, `resource.create`

Actions: `list`, `get`, `create`, `update`, `delete`, `search`, `export`

## Standard Patterns

### Pagination
All `*.list` methods accept:
```json
{ "page": 1, "limit": 20, "sortBy": "createdAt", "sortDir": "desc" }
```

### Filtering
Pass filters as a nested object in params:
```json
{ "filters": { "role": "admin", "isActive": true } }
```

### Batch Operations
Use `*.bulkCreate`, `*.bulkDelete` for batch operations. Max 100 items per batch.

## Versioning
Add `"version": "2"` to params when introducing breaking changes.
Old version supported for 6 months minimum.
