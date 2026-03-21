# {{PROJECT_NAME}}

> {{PROJECT_DESCRIPTION}}

## Quick Start

```bash
# 1. Clone and enter the project
git clone <repo-url> && cd {{PROJECT_NAME}}

# 2. Run setup wizard (first time only)
bash scripts/init.sh

# 3. Start development environment
make dev

# 4. Open in browser
open http://localhost:3000          # frontend
open http://localhost:8080/health   # API gateway
```

## Project Profile

| Setting | Value |
|---------|-------|
| Profile | `{{PROJECT_PROFILE}}` |
| Type | `{{PROJECT_TYPE}}` |
| Stack | `{{PRIMARY_LANGUAGE}}` |
| DB | `{{DB_ENGINE}}` |
| Auth | `{{AUTH_STRATEGY}}` |

## Structure

| Directory | Purpose |
|-----------|---------|
| `.claude/` | AI control layer — context, commands, memory, settings |
| `agents/` | AI agent definitions and permissions registry |
| `orchestrator/` | Task execution engine + CLI |
| `services/` | Backend microservices |
| `frontend/` | Web application |
| `database/` | Schema, migrations, seed data |
| `auth/` | Shared auth utilities (JWT, middleware, roles) |
| `config/profiles/` | Solo / startup / enterprise profile configs |
| `tasks/` | Task management (backlog → in-progress → done) |
| `.claude/memory/` | Decisions, patterns, anti-patterns |
| `skills/` | Reusable implementation patterns |
| `runs/` | Orchestrator execution logs |
| `tests/` | Global test suites (unit / integration / e2e) |
| `docs/` | Human documentation |
| `infra/` | Docker, Kubernetes, Terraform |
| `.github/workflows/` | CI/CD pipelines |

## Common Commands

```bash
make help              # list all commands
make dev               # start dev environment
make test              # run all tests
make lint              # lint all code
make db-migrate        # run database migrations
make orchestrate TASK=tasks/in-progress/my-task.md
```

## AI-Assisted Development

This project uses an AI-assisted workflow:
1. Read `.claude/claude.md` before asking Claude to do anything
2. Use `.claude/commands/` for consistent prompt templates
3. Run tasks through the orchestrator: `make orchestrate TASK=...`
4. All decisions logged in `.claude/memory/decisions.md`

## Documentation

- [PRD](docs/prd.md) — product requirements
- [Architecture](docs/architecture.md) — system design
- [API Spec](docs/api-spec.md) — JSON-RPC 2.0 contracts
- [DB Schema](docs/db-schema.md) — data model
- [Contributing](CONTRIBUTING.md) — how to contribute
