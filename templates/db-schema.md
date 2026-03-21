<!-- READ ONLY — DO NOT EDIT DIRECTLY. Standard: ERD + Data Dictionary -->
<!-- Fill via /docs/db-schema.md -->

# Database Schema: {{PROJECT_NAME}}
_version: {{SCHEMA_VERSION}} | engine: {{DB_ENGINE}} | last-updated: {{LAST_UPDATED}}_

---

## CONVENTIONS

| Convention | Rule |
|-----------|------|
| Primary Keys | UUID v4, generated server-side |
| Timestamps | `created_at`, `updated_at` on every table (TIMESTAMPTZ, UTC) |
| Soft Deletes | `deleted_at TIMESTAMPTZ NULL` — never hard delete user data |
| Foreign Keys | Always constrained, named `fk_{table}_{ref}` |
| Indexes | All FK columns, all filter columns, all sort columns |
| Text Fields | TEXT (no VARCHAR length limits) |
| Money/Decimal | NUMERIC(19, 4) — never FLOAT |
| JSON | JSONB (Postgres), JSON (MySQL), for flexible metadata only |
| Enums | TEXT with CHECK constraint — avoids migration pain |
| Naming | snake_case for all identifiers |

---

## ENTITY RELATIONSHIP OVERVIEW

```
[users] 1──* [refresh_tokens]
[users] 1──* [audit_log]
[users] 1──* [{{DOMAIN_ENTITY_1}}]
[{{DOMAIN_ENTITY_1}}] *──* [{{DOMAIN_ENTITY_2}}]
```

---

## CORE TABLES (Universal — present in all profiles)

### users
```sql
Column          Type                    Constraints
─────────────────────────────────────────────────────
id              UUID                    PK, DEFAULT gen_random_uuid()
email           TEXT                    NOT NULL, UNIQUE
password_hash   TEXT                    NOT NULL
name            TEXT
role            TEXT                    NOT NULL DEFAULT 'user'
                                        CHECK (role IN ('admin','user','viewer','service'))
is_active       BOOLEAN                 NOT NULL DEFAULT true
metadata        JSONB                   DEFAULT '{}'
created_at      TIMESTAMPTZ             NOT NULL DEFAULT now()
updated_at      TIMESTAMPTZ             NOT NULL DEFAULT now()
deleted_at      TIMESTAMPTZ             NULL (soft delete)
```
Indexes: `idx_users_email`, `idx_users_role`, `idx_users_deleted_at`

### refresh_tokens
```sql
Column          Type                    Constraints
─────────────────────────────────────────────────────
id              UUID                    PK
user_id         UUID                    NOT NULL, FK → users(id) ON DELETE CASCADE
token_hash      TEXT                    NOT NULL, UNIQUE
expires_at      TIMESTAMPTZ             NOT NULL
created_at      TIMESTAMPTZ             NOT NULL DEFAULT now()
```
Indexes: `idx_refresh_tokens_user_id`, `idx_refresh_tokens_expires_at`

### audit_log
```sql
Column          Type                    Constraints
─────────────────────────────────────────────────────
id              UUID                    PK
user_id         UUID                    FK → users(id) ON DELETE SET NULL, NULLABLE
action          TEXT                    NOT NULL  (e.g. "auth.login", "resource.delete")
resource        TEXT                    (table/entity name)
resource_id     TEXT                    (affected record ID)
ip_address      INET
user_agent      TEXT
metadata        JSONB                   DEFAULT '{}'
created_at      TIMESTAMPTZ             NOT NULL DEFAULT now()
```
Indexes: `idx_audit_user_id`, `idx_audit_created_at DESC`, `idx_audit_action`

---

## DOMAIN TABLES
<!-- Add your domain-specific tables here -->

### {{DOMAIN_ENTITY_1}}
```sql
Column          Type                    Constraints
─────────────────────────────────────────────────────
id              UUID                    PK
user_id         UUID                    NOT NULL, FK → users(id)
status          TEXT                    NOT NULL DEFAULT '{{DEFAULT_STATUS}}'
                                        CHECK (status IN ({{STATUS_ENUM}}))
metadata        JSONB                   DEFAULT '{}'
created_at      TIMESTAMPTZ             NOT NULL DEFAULT now()
updated_at      TIMESTAMPTZ             NOT NULL DEFAULT now()
deleted_at      TIMESTAMPTZ             NULL
```

---

## DATA DICTIONARY

| Table | Column | Type | Nullable | Description |
|-------|--------|------|----------|-------------|
| users | id | UUID | N | Surrogate primary key |
| users | email | TEXT | N | Login identifier, globally unique |
| users | role | TEXT | N | RBAC role; one of: admin, user, viewer, service |
| users | is_active | BOOL | N | False = soft-suspended, cannot log in |
| audit_log | action | TEXT | N | JSON-RPC method name that triggered the event |
| {{DOMAIN_ENTITY_1}} | status | TEXT | N | Lifecycle state machine value |

---

## MIGRATION STRATEGY

| Rule | Description |
|------|-------------|
| Sequential naming | `001_`, `002_` prefix — never gap-fill |
| Additive only | Never DROP column in same migration as data migration |
| Test on copy | Always test against production data copy before applying |
| Approval gate | DB migrations require explicit approval (see settings.json) |
| Rollback plan | Every migration must have a documented rollback step |

---

## INDEXES REFERENCE

```sql
-- Core performance indexes
CREATE INDEX CONCURRENTLY idx_users_email       ON users(email);
CREATE INDEX CONCURRENTLY idx_users_role        ON users(role) WHERE deleted_at IS NULL;
CREATE INDEX CONCURRENTLY idx_audit_user_id     ON audit_log(user_id);
CREATE INDEX CONCURRENTLY idx_audit_created_at  ON audit_log(created_at DESC);
-- Add domain indexes below
```

---

## BACKUP & RETENTION

| Environment | Backup Frequency | Retention | PITR |
|-------------|-----------------|-----------|------|
| production  | Continuous WAL  | 30 days   | Yes  |
| staging     | Daily snapshot  | 7 days    | No   |
| local       | Manual only     | —         | No   |
