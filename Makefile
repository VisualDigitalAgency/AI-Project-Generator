# Universal Makefile — works for any project profile
# Run `make help` to see all available commands.

.PHONY: help setup dev build test lint typecheck clean deploy-staging

# Detect OS
UNAME := $(shell uname)

help:  ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

setup:  ## First-time setup: copy .env, install deps, run migrations
	@echo "→ Setting up project..."
	@[ -f .env ] || cp .env.example .env && echo "  ✓ Created .env from .env.example"
	@command -v pnpm >/dev/null 2>&1 || npm install -g pnpm
	@pnpm install
	@echo "  ✓ Dependencies installed"
	@$(MAKE) db-migrate
	@echo "✓ Setup complete. Run: make dev"

dev:  ## Start all services in development mode
	docker-compose up --build

dev-bg:  ## Start all services in background
	docker-compose up -d

stop:  ## Stop all services
	docker-compose down

build:  ## Build all services
	pnpm build

test:  ## Run all tests
	pnpm test

test-unit:  ## Run unit tests only
	pnpm test:unit

test-integration:  ## Run integration tests (requires DB)
	pnpm test:integration

test-e2e:  ## Run E2E tests
	pnpm test:e2e

lint:  ## Lint all code
	pnpm lint

typecheck:  ## TypeScript type check
	pnpm typecheck

format:  ## Format all code
	pnpm format

db-migrate:  ## Run database migrations
	pnpm prisma migrate dev

db-seed:  ## Seed database with initial data
	pnpm ts-node database/seed/001_users.ts

db-studio:  ## Open Prisma Studio (DB GUI)
	pnpm prisma studio

orchestrate:  ## Run a task through the orchestrator
	@[ -n "$(TASK)" ] || (echo "Usage: make orchestrate TASK=tasks/in-progress/my-task.md" && exit 1)
	pnpm ts-node orchestrator/cli.ts $(TASK) --verbose

clean:  ## Remove build artifacts and node_modules
	rm -rf dist/ .next/ out/ coverage/ node_modules/
	docker-compose down -v

logs:  ## Tail logs for all services
	docker-compose logs -f

deploy-staging:  ## Deploy to staging (triggers GitHub Actions)
	git push origin develop

ci:  ## Run the full CI pipeline locally
	$(MAKE) lint typecheck test-unit test-integration

sync-context:  ## Sync /docs/ → .claude/context/ (skips existing)
	bash scripts/sync-context.sh

sync-context-force:  ## Force regenerate all .claude/context/ files from /docs/
	bash scripts/sync-context.sh --force

sync-context-dry:  ## Preview what sync-context would do
	bash scripts/sync-context.sh --dry-run

sync-prd:  ## Sync PRD only
	bash scripts/sync-context.sh --file=prd

sync-arch:  ## Sync architecture only
	bash scripts/sync-context.sh --file=architecture

sync-context:  ## Sync /docs/ → .claude/context/ (skips existing)
	bash scripts/sync-context.sh

sync-context-force:  ## Force regenerate all .claude/context/ files from /docs/
	bash scripts/sync-context.sh --force

sync-context-dry:  ## Preview what sync-context would do
	bash scripts/sync-context.sh --dry-run

sync-prd:  ## Sync PRD only
	bash scripts/sync-context.sh --file=prd

sync-arch:  ## Sync architecture only
	bash scripts/sync-context.sh --file=architecture
