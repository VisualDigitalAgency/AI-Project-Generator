<!-- READ ONLY — DO NOT EDIT DIRECTLY. Standard: DFD Level 0 + Level 1 -->

# Data Flow Diagram: {{PROJECT_NAME}}
_version: {{DFD_VERSION}} | last-updated: {{LAST_UPDATED}}_

---

## LEVEL 0 — CONTEXT DIAGRAM
<!-- Shows the whole system as a single process and all external actors -->

```
[User] ──────────────────────► [{{PROJECT_NAME}} System] ──► [Email Provider]
  ◄──────────────────────────── [{{PROJECT_NAME}} System]
                                         │
                                         ▼
                                  [{{DB_ENGINE}}]
```

---

## LEVEL 1 — SYSTEM DATA FLOWS

### Auth Flow
```
[User]
  │  { email, password }
  ▼
[API Gateway] ── forward ──►[Auth Service]
                                  │ query
                                  ▼
                            [users table]
                                  │ password_hash
                                  ◄
                            [Auth Service]
                                  │ JWT + refresh token
                                  ▼
                            [refresh_tokens table] (write)
                                  │
                              ◄───┘ { token, refreshToken }
[User] ◄────────────────────────────────────────────────────
```

### Authenticated Request Flow
```
[User]
  │  { Bearer JWT, JSON-RPC request }
  ▼
[API Gateway]
  │  verify JWT header present
  ▼
[Auth Service] ── verifyToken ──► { userId, role }
  │
  ▼ (if valid)
[Core Service]
  │  apply business logic
  ├──► [DB] read/write
  ├──► [Redis Cache] read/write
  └──► [Worker Queue] (async jobs)
           │
           ▼
     [Worker Service]
           │
           ▼
     [Notification Service] ──► [Email/SMS Provider]
```

---

## DATA CLASSIFICATION

| Data Type | Classification | At Rest | In Transit | Retention |
|-----------|---------------|---------|------------|-----------|
| Passwords | SECRET | bcrypt hash only | TLS | Indefinite |
| JWT tokens | SENSITIVE | Never stored | TLS | 15 min |
| Refresh tokens | SENSITIVE | SHA-256 hash | TLS | 7 days |
| User PII (email, name) | RESTRICTED | {{ENCRYPTION}} | TLS | {{RETENTION}} |
| Audit logs | INTERNAL | Plain | TLS | 90 days |
| {{DATA_TYPE_1}} | {{CLASSIFICATION}} | {{AT_REST}} | TLS | {{RETENTION}} |

---

## PII DATA MAP

| Field | Table | Collected | Purpose | Shared With | Delete On Request |
|-------|-------|-----------|---------|-------------|-------------------|
| email | users | Registration | Auth, notifications | Auth service only | Yes |
| name | users | Registration | Display | — | Yes |
| ip_address | audit_log | Every request | Security audit | — | After 90 days |
| {{PII_FIELD}} | {{TABLE}} | {{WHEN}} | {{PURPOSE}} | {{SHARED}} | {{DELETE}} |

---

## QUEUE / ASYNC DATA FLOWS

| Queue Name | Producer | Consumer | Payload | Retention |
|------------|---------|---------|---------|-----------|
| notifications | core-service | notification-service | { userId, type, data } | 24h |
| {{QUEUE_1}} | {{PRODUCER}} | {{CONSUMER}} | {{PAYLOAD}} | {{RETENTION}} |
