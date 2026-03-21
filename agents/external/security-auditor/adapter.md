# Security Auditor Adapter

## Input
```json
{ "targetPath": "string — file or directory to scan" }
```

## Output
```json
{
  "findings": [
    {
      "severity": "CRITICAL|HIGH|MEDIUM|LOW",
      "file": "string",
      "line": 0,
      "rule": "string",
      "description": "string",
      "remediation": "string"
    }
  ],
  "passed": false,
  "summary": "string"
}
```

## Gate
Block deploy if any `CRITICAL` or `HIGH` findings unresolved.
