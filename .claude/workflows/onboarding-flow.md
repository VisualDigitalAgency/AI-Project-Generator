# New Developer Onboarding Workflow

## Day 1: Setup
1. Run `make setup` — installs all deps, copies `.env.example` → `.env`
2. Run `make dev` — starts all services locally
3. Read `README.md` → `docs/prd.md` → `.claude/claude.md`
4. Read `context/architecture.md` and `context/tech-stack.md`

## Day 1: First Task
1. Pick a task from `tasks/backlog/`
2. Move it to `tasks/in-progress/`
3. Follow the Feature Flow in `feature-flow.md`

## AI-Assisted Development
- Use `.claude/commands/` prompts when prompting Claude
- Always share the relevant context files with Claude
- Log anything surprising in `memory/decisions.md`
