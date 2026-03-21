<!-- READ ONLY — DO NOT EDIT DIRECTLY -->

# Developer Onboarding: {{PROJECT_NAME}}
_last-updated: {{LAST_UPDATED}} | maintained-by: {{MAINTAINER}}_

---

## PREREQUISITES

| Tool | Version | Install |
|------|---------|---------|
| Node.js | ≥ 20 | https://nodejs.org |
| pnpm | ≥ 9 | `npm i -g pnpm` |
| Docker Desktop | latest | https://docker.com |
| Git | ≥ 2.40 | — |
| gh CLI | latest | https://cli.github.com |
| {{EXTRA_TOOL}} | {{VERSION}} | {{INSTALL_URL}} |

---

## DAY 1: ENVIRONMENT SETUP

```bash
# 1. Clone
git clone {{REPO_URL}}
cd {{PROJECT_NAME}}

# 2. Run setup wizard (first time only)
bash scripts/init.sh

# 3. Start dev environment
make dev

# 4. Verify everything works
curl http://localhost:8080/health   # should return { "status": "ok" }
open http://localhost:3000           # frontend
```

---

## DAY 1: READ THESE FILES (IN ORDER)

1. `README.md` — project overview
2. `docs/prd.md` — what we're building and why
3. `.claude/claude.md` — AI workflow rules
4. `.claude/context/architecture.md` — system design
5. `.claude/context/tech-stack.md` — languages + frameworks
6. `.claude/memory/patterns.md` — how we write code
7. `.claude/memory/anti-patterns.md` — what we never do

---

## DAY 1: FIRST TASK

```bash
# 1. Pick a task
ls tasks/backlog/

# 2. Move to in-progress
mv tasks/backlog/example-feature.md tasks/in-progress/

# 3. Run it through the orchestrator
make orchestrate TASK=tasks/in-progress/example-feature.md --verbose

# 4. Write code, write tests, open PR
```

---

## ARCHITECTURE MENTAL MODEL

```
Request → [Gateway: auth check + routing]
              → [Service: business logic]
                    → [Repository: DB access]
                          → [Postgres / Redis]
```

Never skip a layer. Handlers don't touch DB. Services don't parse HTTP.

---

## AI-ASSISTED WORKFLOW

| Situation | Use This |
|-----------|----------|
| New feature | `.claude/commands/create-feature.md` |
| Bug fix | `.claude/commands/fix-bug.md` |
| Code review | `.claude/commands/review-code.md` |
| Write tests | `.claude/commands/write-tests.md` |
| New service | `.claude/commands/scaffold-service.md` |

Always share the relevant `.claude/context/` files with Claude when prompting.

---

## CONTACTS

| Role | Name | Contact |
|------|------|---------|
| Tech Lead | {{TECH_LEAD}} | {{TECH_LEAD_CONTACT}} |
| Oncall | See runbook | {{ONCALL_CHANNEL}} |
| Design | {{DESIGNER}} | {{DESIGNER_CONTACT}} |
