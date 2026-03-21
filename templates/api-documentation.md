<!-- READ ONLY — DO NOT EDIT DIRECTLY. Standard: OpenAPI spirit / JSON-RPC 2.0 -->
<!-- Fill via /docs/api-documentation.md -->

# API Documentation: {{PROJECT_NAME}}
_version: {{API_VERSION}} | base-url: {{BASE_URL}} | protocol: JSON-RPC 2.0_
_last-updated: {{LAST_UPDATED}}_

---

## TRANSPORT

| Property | Value |
|----------|-------|
| Protocol | JSON-RPC 2.0 over HTTP/1.1 + WebSocket |
| Endpoint | POST {{BASE_URL}}/rpc |
| Content-Type | application/json |
| Auth Header | Authorization: Bearer \<access-token\> |
| Encoding | UTF-8 |

---

## ENVELOPE SCHEMAS

### Request
```typescript
{
  jsonrpc: "2.0",          // required, literal
  method:  string,         // "service.action" format
  params:  object,         // method-specific payload
  id:      string          // UUID v4, client-generated
}
```

### Success Response
```typescript
{
  jsonrpc: "2.0",
  result:  unknown,        // method-specific
  id:      string          // echoed from request
}
```

### Error Response
```typescript
{
  jsonrpc: "2.0",
  error: {
    code:    number,       // see Error Codes table
    message: string,       // human-readable
    data?:   unknown       // structured detail (validation errors etc.)
  },
  id: string | null
}
```

---

## ERROR CODES

| Code    | Name                | HTTP Status | When                          |
|---------|---------------------|-------------|-------------------------------|
| -32700  | ParseError          | 400         | Malformed JSON body           |
| -32600  | InvalidRequest      | 400         | Missing jsonrpc/method/id     |
| -32601  | MethodNotFound      | 404         | Unknown method string         |
| -32602  | InvalidParams       | 400         | Missing/wrong param types     |
| -32603  | InternalError       | 500         | Unhandled server error        |
| -32001  | Unauthorized        | 401         | Missing or invalid JWT        |
| -32002  | Forbidden           | 403         | Valid JWT, insufficient role  |
| -32003  | NotFound            | 404         | Resource ID does not exist    |
| -32004  | ValidationError     | 422         | Business rule violation       |
| -32005  | RateLimitExceeded   | 429         | See rate-limit-policy.md      |
| -32006  | Conflict            | 409         | Duplicate resource            |
| -32007  | Gone                | 410         | Soft-deleted resource         |

---

## STANDARD PARAM PATTERNS

### Pagination (all *.list methods)
```typescript
{
  page?:    number,   // default: 1
  limit?:   number,   // default: 20, max: 100
  sortBy?:  string,   // field name, default: "createdAt"
  sortDir?: "asc" | "desc"  // default: "desc"
}
```

### Pagination Response
```typescript
{
  items:      T[],
  total:      number,
  page:       number,
  limit:      number,
  totalPages: number
}
```

### Filtering (all *.list methods)
```typescript
{ filters?: Record<string, string | number | boolean> }
```

### Date Ranges
```typescript
{ from?: ISO8601string, to?: ISO8601string }
```

---

## AUTH SERVICE METHODS

### auth.register
```typescript
params:  { email: string, password: string, name?: string }
result:  { userId: string, token: string, refreshToken: string }
auth:    none
errors:  -32004 (validation), -32006 (email taken)
```

### auth.login
```typescript
params:  { email: string, password: string }
result:  { token: string, refreshToken: string, user: UserSummary }
auth:    none
errors:  -32001 (wrong credentials)
```

### auth.refresh
```typescript
params:  { refreshToken: string }
result:  { token: string, refreshToken: string }
auth:    none
errors:  -32001 (invalid/expired refresh token)
notes:   Refresh token is rotated on every use.
```

### auth.logout
```typescript
params:  {}
result:  { success: true }
auth:    required
notes:   Invalidates current refresh token.
```

### auth.me
```typescript
params:  {}
result:  { id: string, email: string, name: string, role: string, createdAt: ISO8601 }
auth:    required
```

---

## CORE SERVICE METHODS
<!-- Replace resource.* with your domain entity name -->

### resource.list
```typescript
params:  { filters?: object, page?: number, limit?: number, sortBy?: string, sortDir?: "asc"|"desc" }
result:  { items: Resource[], total: number, page: number, limit: number, totalPages: number }
auth:    required
roles:   user, admin
```

### resource.get
```typescript
params:  { id: string }
result:  Resource
auth:    required
roles:   user, admin
errors:  -32003 (not found)
```

### resource.create
```typescript
params:  { {{RESOURCE_CREATE_PARAMS}} }
result:  Resource
auth:    required
roles:   user, admin
errors:  -32004 (validation), -32006 (conflict)
```

### resource.update
```typescript
params:  { id: string, {{RESOURCE_UPDATE_PARAMS}} }
result:  Resource
auth:    required
roles:   user, admin
errors:  -32003 (not found), -32002 (not owner)
```

### resource.delete
```typescript
params:  { id: string }
result:  { success: true }
auth:    required
roles:   admin
errors:  -32003 (not found)
```

---

## TYPES

### UserSummary
```typescript
{ id: string, email: string, name: string, role: "admin"|"user"|"viewer" }
```

### Resource
```typescript
{
  id:        string,       // UUID
  createdAt: ISO8601,
  updatedAt: ISO8601,
  // add domain fields here
}
```

---

## VERSIONING POLICY
- Current version: {{API_VERSION}}
- Breaking change = new `version` field in params
- Old version supported for minimum 6 months after deprecation notice
- Deprecation announced in CHANGELOG.md
