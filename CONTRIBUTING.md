# Contributing Guide

## Getting Started
1. `make setup` — first-time setup
2. `make dev` — start dev environment
3. Pick a task from `tasks/backlog/`
4. Read `.claude/claude.md` before starting

## Workflow
See `.claude/workflows/feature-flow.md` for the full development workflow.

## Commit Convention
This project uses [Conventional Commits](https://www.conventionalcommits.org/):
```
feat(scope): short description
fix(scope): short description
chore(scope): short description
docs(scope): short description
test(scope): short description
refactor(scope): short description
```

## Pull Requests
- One feature/fix per PR
- Tests required for all non-trivial changes (enforced by CI)
- Must pass all CI checks before merge
- Request review from at least one team member

## AI-Assisted Development
- Use `.claude/commands/` prompts for consistent Claude interactions
- Log all architectural decisions in `.claude/memory/decisions.md`
- Check `memory/anti-patterns.md` before proposing solutions

## Code Standards
See `.claude/context/tech-stack.md` for language-specific standards.
