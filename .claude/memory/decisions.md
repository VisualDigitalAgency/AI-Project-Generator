# Architecture & Design Decisions

_Add a row every time a non-obvious decision is made._

| Date | Decision | Rationale | Alternatives Considered |
|------|----------|-----------|------------------------|
| —    | JSON-RPC 2.0 for inter-service comms | Strongly typed, easy to mock, single endpoint | REST (too loose), gRPC (overkill for most profiles) |
| —    | UUID v4 for all primary keys | Avoids enumeration attacks, safe to generate client-side | Auto-increment int |
| —    | Refresh token rotation on every use | Detects token theft (reuse triggers revocation) | Long-lived refresh tokens |
| —    | `.env.example` committed, `.env` gitignored | Safe defaults visible, secrets never committed | Vault-only (too complex for solo/startup) |
