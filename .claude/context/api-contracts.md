# API Contracts

## JSON-RPC 2.0 Envelope

### Request
```json
{
  "jsonrpc": "2.0",
  "method": "service.action",
  "params": { },
  "id": "uuid-v4"
}
```

### Success Response
```json
{
  "jsonrpc": "2.0",
  "result": { },
  "id": "uuid-v4"
}
```

### Error Response
```json
{
  "jsonrpc": "2.0",
  "error": { "code": -32000, "message": "Description", "data": { } },
  "id": "uuid-v4"
}
```

## Error Codes
| Code    | Meaning               |
|---------|-----------------------|
| -32700  | Parse error           |
| -32600  | Invalid request       |
| -32601  | Method not found      |
| -32602  | Invalid params        |
| -32603  | Internal error        |
| -32000  | App error (generic)   |
| -32001  | Unauthorized          |
| -32002  | Forbidden             |
| -32003  | Not found             |
| -32004  | Validation error      |
| -32005  | Rate limit exceeded   |

## Auth Service Methods
- `auth.register`   — `{ email, password, name }` → `{ userId, token, refreshToken }`
- `auth.login`      — `{ email, password }` → `{ token, refreshToken }`
- `auth.refresh`    — `{ refreshToken }` → `{ token }`
- `auth.logout`     — `{ token }` → `{ success }`
- `auth.me`         — `{ }` → `{ userId, email, role }`

## Core Service Methods
_Replace these with your domain methods_
- `resource.list`   — `{ filters?, pagination? }` → `{ items[], total, page }`
- `resource.get`    — `{ id }` → `{ item }`
- `resource.create` — `{ data }` → `{ item }`
- `resource.update` — `{ id, data }` → `{ item }`
- `resource.delete` — `{ id }` → `{ success }`

## Pagination Standard
```json
{ "page": 1, "limit": 20, "sortBy": "createdAt", "sortDir": "desc" }
```
