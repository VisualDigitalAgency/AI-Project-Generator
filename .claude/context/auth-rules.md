# Authentication & Authorization Rules

## Strategy: {{AUTH_STRATEGY}}  _(jwt | oauth | api-key)_

## JWT Strategy
- **Access token**: 15 min expiry, signed with `JWT_SECRET`
- **Refresh token**: 7 day expiry, hashed and stored in DB
- **Rotation**: Refresh token rotates on every use
- **Revocation**: All tokens invalidated on password change

## OAuth Strategy
- Provider tokens exchanged for internal JWT
- Store provider ID + access token (encrypted) in `oauth_accounts` table

## API Key Strategy
- Keys are `sha256` hashed before storage
- Keys have optional expiry and per-key permission scopes
- Never return the raw key after creation

## Roles (Universal)
| Role    | Description                          |
|---------|--------------------------------------|
| admin   | Full system access                   |
| user    | Standard authenticated access        |
| viewer  | Read-only access                     |
| service | Internal service-to-service calls    |

_Add domain-specific roles in `auth/roles.ts`_

## Enforcement Rules
1. All routes require auth except: `auth.login`, `auth.register`, health checks
2. Role checks happen at the service level
3. Use shared `auth/middleware.ts` — never re-implement
4. Log all auth failures to `audit_log`
5. Rate-limit auth endpoints: 10 req/min per IP
