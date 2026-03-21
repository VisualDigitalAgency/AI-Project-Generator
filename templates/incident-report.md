<!-- READ ONLY — DO NOT EDIT DIRECTLY. Standard: Post-mortem / 5-Whys -->
<!-- Copy and fill in /docs/incidents/ for each incident -->

# Incident Report: {{INCIDENT_TITLE}}
_incident-id: {{INCIDENT_ID}} | severity: P{{SEVERITY}} | date: {{INCIDENT_DATE}}_
_author: {{AUTHOR}} | status: Draft / Under Review / Final_

---

## TIMELINE

| Time (UTC) | Event |
|------------|-------|
| {{TIME_1}} | {{EVENT_1}} — incident begins |
| {{TIME_2}} | {{EVENT_2}} — detected by {{DETECTION_METHOD}} |
| {{TIME_3}} | {{EVENT_3}} — investigation started |
| {{TIME_4}} | {{EVENT_4}} — root cause identified |
| {{TIME_5}} | {{EVENT_5}} — mitigation applied |
| {{TIME_6}} | {{EVENT_6}} — service restored |

**Total duration:** {{DURATION}}
**Detection lag:** {{DETECTION_LAG}} (time from start to detection)

---

## IMPACT

| Metric | Value |
|--------|-------|
| Users affected | {{USERS_AFFECTED}} |
| Requests failed | {{REQUESTS_FAILED}} |
| Revenue impact | {{REVENUE_IMPACT}} |
| SLA breach | Yes / No |
| Data loss | Yes / No |

---

## ROOT CAUSE (5 WHYS)

**Why 1:** {{WHY_1}}
**Why 2:** {{WHY_2}}
**Why 3:** {{WHY_3}}
**Why 4:** {{WHY_4}}
**Why 5 (root):** {{WHY_5_ROOT_CAUSE}}

---

## CONTRIBUTING FACTORS

- {{FACTOR_1}}
- {{FACTOR_2}}

---

## WHAT WENT WELL

- {{WELL_1}}

---

## ACTION ITEMS

| # | Action | Owner | Due | Status |
|---|--------|-------|-----|--------|
| 1 | {{ACTION_1}} | {{OWNER_1}} | {{DUE_1}} | Open |

---

## LESSONS LEARNED

{{LESSONS}}
