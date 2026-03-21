# Database Schema

See `.claude/context/db-schema.md` for the AI reference.
See `database/schema/` for SQL DDL.
See `database/prisma/schema.prisma` for the Prisma schema.

## Migration Strategy
1. All changes via migration files in `database/migrations/`
2. Never edit the DB directly in staging/production
3. Always test migrations on a copy of production data before applying
4. Log migration decisions in `.claude/memory/decisions.md`

## Backup Strategy
- Continuous WAL archiving (enterprise)
- Daily snapshots (startup)
- Point-in-time recovery: 7 days (startup), 30 days (enterprise)
