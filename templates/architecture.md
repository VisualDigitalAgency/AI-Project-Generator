<!-- READ ONLY — DO NOT EDIT DIRECTLY. Standard: C4 Model (Simon Brown) -->
<!-- Levels: Context → Container → Component. Fill via /docs/architecture.md -->

# Architecture: {{PROJECT_NAME}}
_version: {{ARCH_VERSION}} | status: {{ARCH_STATUS}} | last-updated: {{LAST_UPDATED}}_

---

## LEVEL 1 — SYSTEM CONTEXT
<!-- Who uses the system and what external systems does it touch? -->

### Actors
| Actor | Type | Interaction |
|-------|------|-------------|
| {{ACTOR_1}} | Human/System | {{INTERACTION_1}} |

### External Systems
| System | Direction | Protocol | Data Exchanged |
|--------|-----------|----------|----------------|
| {{EXT_SYS_1}} | Inbound/Outbound/Both | {{PROTOCOL_1}} | {{DATA_1}} |

---

## LEVEL 2 — CONTAINER VIEW
<!-- What deployable units make up the system? -->

### Services
| Container | Technology | Responsibility | Exposes | Owned By |
|-----------|-----------|----------------|---------|----------|
| api-gateway | {{GATEWAY_LANG}} | Entry point, auth check, routing | :8080 HTTP | {{TEAM}} |
| auth-service | {{AUTH_LANG}} | JWT issuance, session management | :3001 HTTP | {{TEAM}} |
| core-service | {{PRIMARY_LANGUAGE}} | Primary business logic | :3002 HTTP | {{TEAM}} |
| worker-service | {{PRIMARY_LANGUAGE}} | Async jobs, queue processing | — (consumer) | {{TEAM}} |
| notification-service | {{NOTIFY_LANG}} | Email, SMS, push | — (consumer) | {{TEAM}} |
| frontend | Next.js | Web UI | :3000 HTTP | {{TEAM}} |

### Data Stores
| Store | Technology | Purpose | Access Pattern |
|-------|-----------|---------|----------------|
| primary-db | {{DB_ENGINE}} | Persistent data | Read/Write via ORM |
| cache | Redis 7 | Session cache, queues | Read/Write via client |

### Communication Map
```
[Client]
  └─► [API Gateway :8080]
        ├─► [Auth Service :3001]    JSON-RPC 2.0 / HTTP
        └─► [Core Service :3002]    JSON-RPC 2.0 / HTTP
              └─► [Worker Service]  Queue (Redis BullMQ)
              └─► [Notify Service]  Queue (Redis BullMQ)

[All Services] ──► [Primary DB]
[All Services] ──► [Redis Cache]
```

---

## LEVEL 3 — COMPONENT VIEW (Core Service)
<!-- Internal structure of the most complex service -->

```
core-service/
  ├── handlers/      ← JSON-RPC method dispatch
  ├── services/      ← Business logic (no I/O)
  ├── repositories/  ← DB access (ORM only)
  ├── validators/    ← Input validation schemas
  └── middleware/    ← Auth, logging, rate-limit
```

---

## CROSS-CUTTING CONCERNS

### Auth Flow
```
Request → Gateway (validate JWT header)
        → Auth Service (verify signature + expiry)
        → Service (check role permission via auth/roles.ts)
        → Handler (execute)
```

### Error Handling Strategy
| Layer | Responsibility |
|-------|----------------|
| Handler | Catch service errors, return JSON-RPC error envelope |
| Service | Return Result<T> type — no throws in business logic |
| Repository | Wrap DB errors in typed AppError |
| Gateway | Log all 5xx, return sanitized error to client |

### Observability
| Signal | Tool | Key Metrics |
|--------|------|-------------|
| Logs | Structured JSON → stdout | Request ID, user ID, latency, status |
| Health | GET /health per service | status, uptime, db connectivity |
| Metrics | {{METRICS_TOOL}} | RPS, P50/P95/P99 latency, error rate |
| Tracing | {{TRACING_TOOL}} | Distributed trace per request ID |

---

## DEPLOYMENT TOPOLOGY

### Profile: {{PROJECT_PROFILE}}
| Environment | Host | Replicas | DB |
|-------------|------|----------|----|
| local | docker-compose | 1 each | Local Postgres |
| staging | {{STAGING_HOST}} | 1 each | Shared Postgres |
| production | {{PROD_HOST}} | {{PROD_REPLICAS}} | Managed Postgres |

### Scaling Strategy
- **Stateless services**: horizontal scale freely
- **DB**: vertical first, then read replicas
- **Cache**: Redis Cluster for enterprise profile
- **Queue workers**: scale by queue depth metric

---

## ARCHITECTURE DECISION RECORD INDEX
<!-- Full ADRs in adr.md -->
| ADR | Decision | Status |
|-----|----------|--------|
| ADR-001 | JSON-RPC 2.0 for inter-service comms | Accepted |
| ADR-002 | {{DECISION_2}} | {{STATUS_2}} |
