<!-- READ ONLY — DO NOT EDIT DIRECTLY. Standard: Michael Nygard ADR format -->
<!-- Each decision = one ADR entry. Append; never delete old entries. -->

# Architecture Decision Records: {{PROJECT_NAME}}
_Append new ADRs. Never delete or modify accepted ADRs._
_Status values: Proposed → Accepted | Rejected | Deprecated | Superseded by ADR-XXX_

---

## ADR-001: JSON-RPC 2.0 for Inter-Service Communication
_date: {{DATE}} | status: Accepted | deciders: {{DECIDERS}}_

### Context
Services need a communication protocol. Options: REST, gRPC, GraphQL, JSON-RPC 2.0.

### Decision
Use JSON-RPC 2.0 over HTTP for all inter-service calls.

### Rationale
- Single endpoint simplifies routing and middleware
- Method name as first-class concept — self-documenting
- Standard error envelope — consistent client handling
- Works over HTTP and WebSocket with same message format
- Easy to mock in tests (no complex HTTP routing needed)

### Consequences
- All services expose POST /rpc — not REST-style resource URLs
- Tooling (Swagger UI) requires adaptation
- Clients must handle JSON-RPC envelope explicitly

### Alternatives Rejected
| Option | Reason Rejected |
|--------|----------------|
| REST | Loose contract, multiple endpoints, inconsistent error formats |
| gRPC | Binary protocol, protobuf overhead, harder to debug |
| GraphQL | Overpowered for internal service comms |

---

## ADR-002: {{DECISION_TITLE}}
_date: {{DATE}} | status: {{STATUS}} | deciders: {{DECIDERS}}_

### Context
{{CONTEXT}}

### Decision
{{DECISION}}

### Rationale
{{RATIONALE}}

### Consequences
{{CONSEQUENCES}}

### Alternatives Rejected
| Option | Reason Rejected |
|--------|----------------|
| {{ALT_1}} | {{REASON_1}} |

---
<!-- Add new ADRs above this line, incrementing the number -->
