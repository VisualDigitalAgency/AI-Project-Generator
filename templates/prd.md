<!-- READ ONLY — DO NOT EDIT DIRECTLY. Source: IEEE 830 / Shape Up hybrid -->
<!-- Machine-optimized format. Fill via /docs/prd.md + sync-context.sh -->

# PRD: {{PROJECT_NAME}}
_version: {{PRD_VERSION}} | status: {{PRD_STATUS}} | last-updated: {{LAST_UPDATED}}_
_author: {{AUTHOR}} | stakeholders: {{STAKEHOLDERS}}_

---

## 1. PROBLEM STATEMENT
<!-- One paragraph. What pain exists, for whom, and why solving it matters now. -->
{{PROBLEM_STATEMENT}}

## 2. GOALS
<!-- Measurable outcomes. Use OKR or metric format. -->
| # | Goal | Metric | Target | Deadline |
|---|------|--------|--------|----------|
| G1 | {{GOAL_1}} | {{METRIC_1}} | {{TARGET_1}} | {{DATE_1}} |

## 3. NON-GOALS
<!-- Explicit scope exclusions. Prevents scope creep. -->
- {{NON_GOAL_1}}

## 4. USERS & PERSONAS
| Persona | Description | Key Job-To-Be-Done | Pain Today |
|---------|-------------|-------------------|------------|
| {{PERSONA_1}} | {{DESC_1}} | {{JTBD_1}} | {{PAIN_1}} |

## 5. REQUIREMENTS

### 5.1 Functional Requirements
<!-- MUST / SHOULD / COULD (MoSCoW). Each requirement is independently testable. -->
| ID | Priority | Requirement | Acceptance Criteria |
|----|----------|-------------|---------------------|
| FR-001 | MUST | {{REQ_1}} | {{AC_1}} |

### 5.2 Non-Functional Requirements
| ID | Category | Requirement | Measure |
|----|----------|-------------|---------|
| NFR-001 | Performance | P99 latency < 500ms | Measured at gateway under 1000 RPS |
| NFR-002 | Availability | 99.9% uptime | Measured monthly, excluding planned maintenance |
| NFR-003 | Security | OWASP Top 10 compliance | Security audit passing |
| NFR-004 | Scalability | {{SCALE_REQ}} | {{SCALE_MEASURE}} |

## 6. USER FLOWS
<!-- Key journeys as numbered steps. One flow per block. -->

### Flow 1: {{FLOW_1_NAME}}
```
Step 1: {{STEP_1}}
Step 2: {{STEP_2}}
→ Success: {{SUCCESS_STATE}}
→ Failure: {{FAILURE_STATE}}
```

## 7. DATA MODEL (SUMMARY)
<!-- High-level entities only. Full schema in db-schema.md -->
| Entity | Key Fields | Relations |
|--------|-----------|-----------|
| {{ENTITY_1}} | {{FIELDS_1}} | {{RELATIONS_1}} |

## 8. API SURFACE (SUMMARY)
<!-- Key methods only. Full spec in api-documentation.md -->
| Method | Params | Returns | Auth Required |
|--------|--------|---------|---------------|
| {{METHOD_1}} | {{PARAMS_1}} | {{RETURNS_1}} | {{AUTH_1}} |

## 9. OUT OF SCOPE (V1)
- {{OUT_OF_SCOPE_1}}

## 10. OPEN QUESTIONS
| # | Question | Owner | Due |
|---|----------|-------|-----|
| Q1 | {{QUESTION_1}} | {{OWNER_1}} | {{DUE_1}} |

## 11. RISKS
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| {{RISK_1}} | HIGH/MED/LOW | HIGH/MED/LOW | {{MITIGATION_1}} |

## 12. DEPENDENCIES
| Dependency | Type | Owner | Status |
|------------|------|-------|--------|
| {{DEP_1}} | Internal/External | {{DEP_OWNER}} | Confirmed/Pending |

## 13. LAUNCH CHECKLIST
- [ ] All MUST requirements implemented
- [ ] NFRs verified under load
- [ ] Security audit passed
- [ ] Runbook written
- [ ] Monitoring + alerts configured
- [ ] Rollback plan documented
