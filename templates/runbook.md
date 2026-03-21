<!-- READ ONLY — DO NOT EDIT DIRECTLY. Standard: Google SRE Runbook -->

# Runbook: {{PROJECT_NAME}}
_version: {{RUNBOOK_VERSION}} | last-updated: {{LAST_UPDATED}} | oncall: {{ONCALL_CONTACT}}_

---

## SERVICE INVENTORY

| Service | Port | Health URL | Logs | Restart Command |
|---------|------|-----------|------|----------------|
| api-gateway | 8080 | GET /health | docker logs api-gateway | make restart svc=api-gateway |
| auth-service | 3001 | GET /health | docker logs auth-service | make restart svc=auth-service |
| core-service | 3002 | GET /health | docker logs core-service | make restart svc=core-service |
| postgres | 5432 | pg_isready | docker logs postgres | — (managed) |
| redis | 6379 | redis-cli ping | docker logs redis | — (managed) |

---

## COMMON OPERATIONS

### Deploy (staging)
```bash
git push origin develop          # triggers auto-deploy
# monitor: https://github.com/{{REPO}}/actions
```

### Deploy (production)
```bash
bash scripts/deploy.sh production <git-sha>
# requires: gh CLI authenticated, production environment approval
```

### Run DB Migration
```bash
make db-migrate                  # development
# production: triggered in deploy pipeline, requires approval
```

### Rotate JWT Secret
```bash
# 1. Generate new secret
openssl rand -base64 48

# 2. Update in secret manager / env
# 3. Restart auth-service (dual-key period: old tokens valid for 15 min)
# 4. After 15 min: remove old secret
```

---

## INCIDENT PLAYBOOKS

### P1: API Gateway Down (all requests failing)
```
1. Check gateway health:   curl https://{{BASE_URL}}/health
2. Check gateway logs:     docker logs api-gateway --tail 100
3. Check downstream deps:  curl http://auth-service:3001/health
                           curl http://core-service:3002/health
4. If gateway crash loop:  docker restart api-gateway
5. If DB unreachable:      → see "DB Connection Failure" below
6. Escalate if > 5 min:   {{ESCALATION_CONTACT}}
```

### P2: Auth Service — Login Failures
```
1. Check error logs:       docker logs auth-service --tail 100 | grep ERROR
2. Check JWT_SECRET set:   docker exec auth-service env | grep JWT
3. Check DB connectivity:  docker exec auth-service npx prisma db pull
4. Check rate limits:      redis-cli keys "ratelimit:auth*"
5. If token verification:  verify JWT_SECRET matches across services
```

### P2: Database Connection Pool Exhausted
```
1. Check active connections:
   psql $DATABASE_URL -c "SELECT count(*), state FROM pg_stat_activity GROUP BY state;"
2. Kill idle connections:
   psql $DATABASE_URL -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE state='idle' AND query_start < now() - interval '10 min';"
3. Check pool config:      DB_POOL_MAX env var (default: 10)
4. Restart affected service if still failing
```

### P3: High Error Rate (> 5% 5xx)
```
1. Check which method:     grep "5[0-9][0-9]" logs | jq '.method' | sort | uniq -c
2. Check recent deploys:   git log --oneline -10
3. Roll back if needed:    make deploy-staging (reverts to last stable)
4. Check external deps:    {{EXTERNAL_DEPS_HEALTH_URLS}}
```

### P3: Redis Unreachable (rate limiting / queues affected)
```
1. Check Redis:            redis-cli -u $REDIS_URL ping
2. Check Redis logs:       docker logs redis --tail 50
3. Rate limiting:          fails OPEN — traffic continues, log alert fires
4. Queue workers:          pause and buffer — check BullMQ dashboard
5. Restart if needed:      docker restart redis (data loss risk — check persistence config)
```

---

## ALERT REFERENCE

| Alert | Threshold | Severity | Runbook Section |
|-------|-----------|----------|-----------------|
| gateway_down | health check fails 3× | P1 | API Gateway Down |
| error_rate_high | 5xx > 5% for 5 min | P2 | High Error Rate |
| db_pool_exhausted | connections > 90% | P2 | DB Connection Pool |
| redis_unreachable | ping fails 3× | P3 | Redis Unreachable |
| auth_failure_spike | 401/403 > 20% for 2 min | P2 | Auth Service |
| disk_usage_high | > 85% | P3 | Ops escalation |

---

## ESCALATION POLICY

| Wait Time | Action |
|-----------|--------|
| 0 min | Auto-alert: {{ALERT_CHANNEL}} |
| 5 min | Page primary oncall: {{ONCALL_PRIMARY}} |
| 15 min | Page secondary: {{ONCALL_SECONDARY}} |
| 30 min | Escalate to: {{ESCALATION_CONTACT}} |
