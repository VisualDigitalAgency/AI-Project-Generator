# Command: Scaffold New Service

## Usage
"Scaffold service: [NAME]. Language: [LANG]. Role: [DESCRIPTION]."

## Steps
1. Create `services/[name]/` directory
2. Init project for the chosen language (package.json / go.mod / Cargo.toml / pyproject.toml)
3. Add JSON-RPC 2.0 dispatcher boilerplate
4. Add health check endpoint: `GET /health`
5. Wire auth middleware from `auth/`
6. Add Dockerfile (multi-stage)
7. Add service entry to `docker-compose.yml`
8. Register in `orchestrator/configs/languages.yaml`
9. Add CI workflow step in `.github/workflows/ci.yml`
