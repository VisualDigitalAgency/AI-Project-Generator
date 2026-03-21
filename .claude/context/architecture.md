# System Architecture

## Profile: {{PROJECT_PROFILE}}

### Service Map
| Service               | Language              | Role                          | Active in Profile     |
|-----------------------|-----------------------|-------------------------------|----------------------|
| api-gateway           | {{GATEWAY_LANG}}      | Single entry point, routing   | startup, enterprise  |
| auth-service          | {{AUTH_LANG}}         | Auth, JWT issuance            | startup, enterprise  |
| core-service          | {{PRIMARY_LANGUAGE}}  | Primary business logic        | all                  |
| worker-service        | {{PRIMARY_LANGUAGE}}  | Background jobs, queues       | enterprise           |
| notification-service  | {{NOTIFY_LANG}}       | Email, SMS, push              | enterprise           |

### Communication Protocol
All inter-service calls use **JSON-RPC 2.0** over HTTP/WebSocket.

### Request Lifecycle
```
Client
  └─► API Gateway       (auth check, rate limit, routing)
        └─► Auth Service (token validation)
        └─► Core Service (business logic)
              └─► Worker Service (async tasks via queue)
              └─► Notification Service (events)
```

### Solo Profile (simplified)
```
Client ──► Core Service (handles auth internally)
```

## Scalability Notes
- Stateless services — session state in Redis
- DB connection pooling via PgBouncer in enterprise profile
- Horizontal scaling: all services are stateless by design
