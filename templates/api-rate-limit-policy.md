<!-- READ ONLY — DO NOT EDIT DIRECTLY. Standard: IETF RFC 6585 + RFC 9110 -->
<!-- Fill via /docs/api-rate-limit-policy.md -->

# API Rate Limit Policy: {{PROJECT_NAME}}
_version: {{POLICY_VERSION}} | last-updated: {{LAST_UPDATED}}_

---

## OVERVIEW

Rate limiting protects the API from abuse, ensures fair usage across clients,
and maintains service reliability. This document defines all limits, response
formats, and client retry strategies.

Algorithm: **Token Bucket** (allows short bursts, refills at steady rate)
Scope: Per `user_id` for authenticated requests; per `ip_address` for anonymous.

---

## LIMIT TIERS

| Tier | Applies To | Window | Max Requests | Burst |
|------|-----------|--------|-------------|-------|
| global-anon | Unauthenticated IP | 1 min | 20 | 5 |
| global-auth | Authenticated user | 1 min | {{DEFAULT_RPM}} | 20 |
| auth-endpoints | auth.login, auth.register | 1 min | 10 | 3 |
| write-ops | *.create, *.update, *.delete | 1 min | {{WRITE_RPM}} | 10 |
| bulk-ops | *.bulkCreate, *.bulkDelete | 1 min | 5 | 2 |
| admin | role=admin | 1 min | 500 | 50 |
| service-internal | role=service (inter-service) | — | unlimited | — |

---

## RESPONSE FORMAT

### Headers on Every Response
```
X-RateLimit-Limit:     <max requests in window>
X-RateLimit-Remaining: <requests left in current window>
X-RateLimit-Reset:     <Unix timestamp when window resets>
X-RateLimit-Policy:    <tier name that applied>
```

### HTTP 429 Response Body (JSON-RPC 2.0)
```json
{
  "jsonrpc": "2.0",
  "error": {
    "code": -32005,
    "message": "Rate limit exceeded",
    "data": {
      "tier":       "auth-endpoints",
      "limit":      10,
      "window":     "1m",
      "retryAfter": 42,
      "resetAt":    "{{ISO8601_TIMESTAMP}}"
    }
  },
  "id": "<request id>"
}
```

### Retry-After Header
```
Retry-After: <seconds until window resets>
```

---

## CLIENT RETRY STRATEGY

Clients MUST implement exponential backoff when receiving 429:

```
attempt 1: wait = retryAfter (from response)
attempt 2: wait = retryAfter × 2 + jitter(0..1s)
attempt 3: wait = retryAfter × 4 + jitter(0..2s)
max attempts: 3
jitter: random(0, attempt × 1000) ms
```

Clients MUST NOT retry immediately on 429. Doing so may result in temporary IP ban.

---

## ENFORCEMENT POINTS

| Point | Method | Storage |
|-------|--------|---------|
| API Gateway | Token bucket per user/IP | Redis (TTL = window) |
| Auth Service | Sliding window per IP | Redis |
| Core Service | Token bucket per user | Redis |

Key format: `ratelimit:{tier}:{identifier}:{window_start_unix}`

---

## EXEMPTIONS

| Actor | Exemption | Approval Required |
|-------|-----------|-------------------|
| Internal services (role=service) | Fully exempt | Automatic |
| Admin users | 5× multiplier | Automatic |
| Verified enterprise accounts | Custom tier | Manual (ops team) |
| Monitoring / health check paths | Exempt | Automatic (path-based) |

---

## LIMIT BREACH POLICY

| Frequency | Action |
|-----------|--------|
| Occasional (< 5/day) | 429 response, no further action |
| Repeated (> 5/day) | 429 + warning email |
| Sustained (> 50/day) | Temporary IP block (1h) |
| Abusive (> 500/day) | Permanent IP block + account review |

---

## CONFIGURATION

All limits are configurable via environment variables — no code changes required:

```
RATE_LIMIT_DEFAULT_RPM=100
RATE_LIMIT_AUTH_RPM=10
RATE_LIMIT_WRITE_RPM=30
RATE_LIMIT_BULK_RPM=5
RATE_LIMIT_STORE=redis          # redis | memory (dev only)
RATE_LIMIT_WINDOW_SECONDS=60
```

---

## MONITORING & ALERTS

| Metric | Alert Threshold | Severity |
|--------|----------------|----------|
| 429 rate > 5% of total requests | 5 min sustained | WARNING |
| 429 rate > 20% of total requests | 1 min sustained | CRITICAL |
| Single IP generating > 80% of 429s | Immediate | HIGH |
| Redis rate-limit store unreachable | Immediate | CRITICAL (fail open) |

Fail behavior: If Redis is unreachable, rate limiting **fails open** (allows requests)
and logs a CRITICAL alert. Never silently block legitimate traffic due to infra failure.
