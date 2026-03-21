# {{PROJECT_NAME}} — Project Brain

## Purpose
{{PROJECT_DESCRIPTION}}

## Active Profile
**Scale**: `{{PROJECT_PROFILE}}`  _(solo | startup | enterprise)_
**Type**: `{{PROJECT_TYPE}}`      _(saas | api | cli | data-pipeline | ecommerce)_
**Stack**: `{{PRIMARY_LANGUAGE}}` _(typescript | go | python | rust)_

## Core Rules for Claude
1. Read `.claude/context/` before every task
2. Never break API contracts without updating `context/api-contracts.md`
3. All decisions go in `memory/decisions.md`
4. Use commands from `.claude/commands/` for consistent prompts
5. Follow the active workflow in `.claude/workflows/`
6. Match code style to `context/tech-stack.md`
7. Approval required for: deploy, db-migration, secret changes

## Project Conventions
- Inter-service communication: **JSON-RPC 2.0**
- Auth: defined in `context/auth-rules.md`
- Error format: `{ "error": { "code": number, "message": string } }`
- All dates in **ISO 8601 UTC**
- Environment variables only — no hardcoded secrets
