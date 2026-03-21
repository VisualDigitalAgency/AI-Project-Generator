# External Agent: Security Auditor

## Role
Scans code for security vulnerabilities using OWASP Top 10 + dependency CVE checks.

## Checks
- SQL/command injection
- Authentication bypass
- Broken access control
- Sensitive data exposure
- Security misconfiguration
- Vulnerable dependencies
- Secrets in code

## Trigger Points
- Before every REVIEW phase
- Before every deploy to production
- On any change to `auth/` directory
