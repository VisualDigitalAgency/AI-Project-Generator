# Skill: Scaffold a New Service

## Checklist
- [ ] Create `services/[name]/` directory
- [ ] Initialize for chosen language (package.json / go.mod / Cargo.toml)
- [ ] Add JSON-RPC dispatcher (use `services/shared/utils/dispatcher.ts` for TS)
- [ ] Add `GET /health` endpoint → `{ status: "ok", service: "[name]", ts: ISO8601 }`
- [ ] Wire `auth/middleware.ts` on all protected routes
- [ ] Add multi-stage Dockerfile (see `infra/docker/` for templates)
- [ ] Add service to `docker-compose.yml`
- [ ] Register in `orchestrator/configs/languages.yaml`
- [ ] Add CI step in `.github/workflows/ci.yml`
- [ ] Add entry to `agents/registry.yaml` if this service has an agent
- [ ] Create integration test stub in `tests/integration/`

## Service Entry Points by Language

### TypeScript (Fastify)
```
services/[name]/src/index.ts     — app entry
services/[name]/src/handlers/    — RPC method handlers
services/[name]/src/services/    — business logic
services/[name]/src/repositories/— DB access
```

### Go (Gin)
```
services/[name]/main.go          — app entry
services/[name]/handlers/        — RPC handlers
services/[name]/service/         — business logic
services/[name]/repository/      — DB access
```
