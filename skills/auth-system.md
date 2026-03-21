# Skill: Auth System (Universal)

## Pattern
JWT access token (short-lived) + opaque refresh token (long-lived, DB-stored, rotated).

## Supported Strategies
- `jwt` — email/password + JWT (default)
- `oauth` — provider token exchange
- `api-key` — hashed key with scopes

## Implementation Steps (JWT)
1. `auth.register` → hash password (bcrypt, cost=12), create user, return tokens
2. `auth.login` → verify hash, return access + refresh tokens
3. `auth.refresh` → verify refresh token hash in DB, rotate token, return new pair
4. `auth.logout` → delete refresh token from DB
5. Every protected route → `authMiddleware` from `auth/middleware.ts`
6. Role checks → `can(role, method)` from `auth/roles.ts`

## Security Checklist
- [ ] Passwords hashed with bcrypt (cost ≥ 12)
- [ ] Refresh tokens hashed before DB storage
- [ ] Token rotation on every refresh use
- [ ] All tokens revoked on password change
- [ ] Auth endpoints rate-limited (10 req/min)
- [ ] Auth failures logged to `audit_log`
