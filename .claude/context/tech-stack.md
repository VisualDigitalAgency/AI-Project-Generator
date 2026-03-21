# Tech Stack

## Configured by Setup Wizard (`scripts/init.sh`)
_Values below are defaults — overridden by your `config/project.yaml`_

## Backend Services
| Service              | Default Language | Framework          |
|----------------------|------------------|--------------------|
| api-gateway          | Go               | Gin                |
| auth-service         | TypeScript/Node  | Fastify + Prisma   |
| core-service         | {{PRIMARY_LANGUAGE}} | See below      |
| worker-service       | {{PRIMARY_LANGUAGE}} | BullMQ / Celery|
| notification-service | TypeScript/Node  | Fastify + BullMQ   |

## Language → Framework Map
| Language   | Web Framework | ORM/DB Driver  | Test Framework |
|------------|---------------|----------------|----------------|
| TypeScript | Fastify        | Prisma         | Vitest         |
| Go         | Gin            | sqlx           | testing + testify |
| Python     | FastAPI        | SQLAlchemy     | pytest         |
| Rust       | Actix-web      | sqlx           | built-in       |

## Frontend (Optional)
- **Framework**: Next.js 14 (App Router) or Nuxt 3 or None
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Zustand (client) + React Query / TanStack Query (server)
- **Types**: TypeScript strict mode

## Infrastructure
- **Primary DB**: {{DB_ENGINE}} (postgres | mysql | mongodb | sqlite)
- **Cache / Queue**: Redis 7
- **Container**: Docker + Docker Compose
- **Orchestration**: Kubernetes (enterprise profile only)
- **IaC**: Terraform

## Code Quality
- Formatter: Prettier (TS) / gofmt (Go) / Black (Python) / rustfmt (Rust)
- Linter: ESLint / golangci-lint / Ruff / Clippy
- Pre-commit: Husky + lint-staged (Node projects)
