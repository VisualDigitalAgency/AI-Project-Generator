<!-- READ ONLY — DO NOT EDIT DIRECTLY. Standard: STRIDE threat model -->
<!-- Fill via /docs/security-model.md -->

# Security Model: {{PROJECT_NAME}}
_version: {{SEC_VERSION}} | last-reviewed: {{LAST_UPDATED}} | reviewer: {{REVIEWER}}_

---

## TRUST BOUNDARIES

```
[Public Internet]
  └─► [API Gateway]  ← TLS termination here
        └─► [Internal Network]
              ├─► [Auth Service]
              ├─► [Core Service]
              └─► [Data Stores]
```

Rule: No service in the internal network is directly reachable from the internet.

---

## AUTHENTICATION MODEL

| Method | Used For | Token Lifetime | Storage |
|--------|---------|----------------|---------|
| JWT (access) | API requests | 15 min | Client memory only |
| Refresh token | Token renewal | 7 days | HttpOnly cookie / secure storage |
| API key | Service-to-service | No expiry (rotatable) | Hashed in DB |

---

## AUTHORIZATION MODEL

### RBAC Matrix
| Role | Create | Read Own | Read All | Update Own | Update All | Delete |
|------|--------|----------|----------|------------|------------|--------|
| admin | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| user | ✓ | ✓ | ✗ | ✓ | ✗ | ✗ |
| viewer | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| service | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |

---

## STRIDE THREAT ANALYSIS

### S — Spoofing
| Threat | Mitigation | Status |
|--------|-----------|--------|
| Forged JWT | RS256 signature, verify on every request | ✓ Implemented |
| IP spoofing | Don't trust X-Forwarded-For in internal services | ✓ Implemented |
| {{THREAT_S1}} | {{MITIGATION_S1}} | {{STATUS_S1}} |

### T — Tampering
| Threat | Mitigation | Status |
|--------|-----------|--------|
| Payload manipulation | JWT signature verification | ✓ Implemented |
| DB manipulation | Parameterized queries only | ✓ Implemented |
| {{THREAT_T1}} | {{MITIGATION_T1}} | {{STATUS_T1}} |

### R — Repudiation
| Threat | Mitigation | Status |
|--------|-----------|--------|
| User denies action | Audit log on all state changes | ✓ Implemented |
| {{THREAT_R1}} | {{MITIGATION_R1}} | {{STATUS_R1}} |

### I — Information Disclosure
| Threat | Mitigation | Status |
|--------|-----------|--------|
| Error messages leak internals | Sanitize error responses at gateway | ✓ Implemented |
| Logs contain PII | PII masking in log pipeline | {{STATUS}} |
| {{THREAT_I1}} | {{MITIGATION_I1}} | {{STATUS_I1}} |

### D — Denial of Service
| Threat | Mitigation | Status |
|--------|-----------|--------|
| Auth endpoint flooding | Rate limit: 10 req/min per IP | ✓ Implemented |
| Payload flooding | Max body size: 1MB | ✓ Implemented |
| {{THREAT_D1}} | {{MITIGATION_D1}} | {{STATUS_D1}} |

### E — Elevation of Privilege
| Threat | Mitigation | Status |
|--------|-----------|--------|
| Role claim tampering | Role read from DB, not JWT payload | ✓ Implemented |
| {{THREAT_E1}} | {{MITIGATION_E1}} | {{STATUS_E1}} |

---

## SECRETS MANAGEMENT

| Secret | Storage | Rotation Policy | Access |
|--------|---------|----------------|--------|
| JWT_SECRET | Env var / Vault | Every 90 days | Auth service only |
| DB password | Env var / Vault | Every 90 days | Services with DB access |
| API keys | Hashed in DB | On demand | Per-key |
| {{SECRET_1}} | {{STORAGE_1}} | {{ROTATION_1}} | {{ACCESS_1}} |

Rules:
- Secrets NEVER in source code, logs, or error messages
- Secrets rotated without downtime (dual-key period)
- Leaked secret = immediate rotation + incident report

---

## COMPLIANCE CHECKLIST

| Control | Requirement | Status |
|---------|-------------|--------|
| OWASP A01 | Broken Access Control | {{STATUS}} |
| OWASP A02 | Cryptographic Failures | {{STATUS}} |
| OWASP A03 | Injection | Parameterized queries enforced | ✓ |
| OWASP A07 | Auth Failures | Rate limiting + lockout | ✓ |
| Data at Rest | Encryption | {{STATUS}} |
| Data in Transit | TLS 1.2+ only | {{STATUS}} |
| PII Handling | {{GDPR_STATUS}} | {{STATUS}} |
