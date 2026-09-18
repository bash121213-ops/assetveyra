# AssetVeyra — Authorization Test Matrix v1

**Audit phase:** P0 Authorization / Foundation  
**Baseline:** fd5f7103d64208629e607a42f4596ad2bbb1b4ff  
**Status:** DESIGNED ONLY — behavioral execution is BLOCKED pending isolated test environment  
**Production changes:** NONE  
**Production test data:** NONE

## 1. Purpose

This matrix defines the behavioral authorization tests required to move from static/preliminary review to **Verified Pass**. Creating a test case does not imply execution or security success.

### Status vocabulary

- DESIGNED — test defined, not executed
- STATIC REVIEWED — implementation/policy inspected
- EXECUTED — run in an approved isolated environment
- REPRODUCIBLE — repeated with the same result
- VERIFIED PASS — executed, reproducible, evidence captured, expected result confirmed
- FAIL — actual result violates expected result
- BLOCKED — execution unavailable because required environment/access is unavailable
- UNKNOWN — insufficient evidence for a conclusion

## 2. Test environment gate

Required before behavioral execution:

- isolated Supabase project or approved isolated database branch
- isolated Storage bucket(s)
- separate keys/secrets
- test-only users
- sanitized/non-production data
- application Preview/test deployment connected to the isolated backend
- environment identity recorded in evidence

Current state: **BLOCKED**.

## 3. Test identities and data model

Minimum fixture:

- org_a / user_a_member / user_a_admin
- org_b / user_b_member / user_b_admin
- platform_admin
- operations_admin
- compliance_officer
- risk_analyst
- legal_reviewer
- data_room_manager
- external_reviewer
- anonymous
- no-organization user
- expired/revoked data-room member
- optional multi-organization user where supported

Resources:

- asset_a / asset_b
- opportunity_a / opportunity_b
- image_a / image_b
- verification_case_a / verification_case_b
- document_a / document_b
- data_room_a / data_room_b
- data_room_member_a / data_room_member_b
- due_diligence_case_a / b
- investor_interest_a / b
- offer_a / b
- deal_a / b
- workflow/audit events a / b

## 4. Core cross-organization tests

| Test ID | Actor | Resource | Operation | Expected | Status |
|---|---|---|---|---|---|
| AUTH-ORG-READ-001 | user_a_member | asset_b | SELECT | deny or indistinguishable not-found | BLOCKED |
| AUTH-ORG-READ-002 | user_a_member | opportunity_b | SELECT | deny unless intentionally public | BLOCKED |
| AUTH-ORG-READ-003 | user_a_member | verification_case_b | SELECT | deny | BLOCKED |
| AUTH-ORG-READ-004 | user_a_member | document_b | SELECT | deny | BLOCKED |
| AUTH-ORG-READ-005 | user_a_member | data_room_b | SELECT | deny | BLOCKED |
| AUTH-ORG-READ-006 | user_a_member | data_room_members_b | SELECT | deny | BLOCKED |
| AUTH-ORG-READ-007 | user_a_member | audit/workflow events_b | SELECT | deny | BLOCKED |
| AUTH-ORG-READ-008 | user_a_member | organization_b | SELECT | deny | BLOCKED |
| AUTH-ORG-WRITE-001 | user_a_member | asset_b | UPDATE | deny/no state change | BLOCKED |
| AUTH-ORG-WRITE-002 | user_a_member | asset_b | DELETE | deny/no state change | BLOCKED |
| AUTH-ORG-WRITE-003 | user_a_member | opportunity_b | UPDATE | deny/no state change | BLOCKED |
| AUTH-ORG-WRITE-004 | user_a_member | document_b | INSERT | deny | BLOCKED |
| AUTH-ORG-WRITE-005 | user_a_member | document_b | UPDATE/DELETE | deny | BLOCKED |
| AUTH-ORG-WRITE-006 | user_a_member | data_room_b | membership mutation | deny | BLOCKED |
| AUTH-ORG-WRITE-007 | user_a_member | verification_case_b | transition | deny | BLOCKED |
| AUTH-ORG-WRITE-008 | user_a_member | workflow/audit B | forged event | deny | BLOCKED |

## 5. Same-organization positive controls

These tests ensure that a denial is not caused by over-restrictive policies.

| Test ID | Actor | Resource | Operation | Expected | Status |
|---|---|---|---|---|---|
| AUTH-ORG-POS-001 | user_a_member | asset_a | SELECT | allow according to role | BLOCKED |
| AUTH-ORG-POS-002 | authorized A role | asset_a | UPDATE | allow according to role | BLOCKED |
| AUTH-ORG-POS-003 | authorized A role | opportunity_a | authorized operation | allow | BLOCKED |
| AUTH-ORG-POS-004 | authorized A role | document_a | authorized operation | allow | BLOCKED |
| AUTH-ORG-POS-005 | room member A | data_room_a | SELECT | allow within scope | BLOCKED |

## 6. IDOR / parameter tampering

For every relevant UI/server action/API path, repeat with:

- asset_id changed from A to B
- opportunity_id changed from A to B
- organization_id changed from A to B
- user_id changed to another user
- verification_case_id changed to B
- data_room_id changed to B
- document_id changed to B
- member_id changed to B
- deal_id changed to B
- storage_path changed to B

Expected: authorization must be derived from trusted server-side relationships, not from client-supplied ownership claims.

Status: **BLOCKED**.

## 7. Data Room isolation

| Test ID | Scenario | Expected | Status |
|---|---|---|---|
| DR-001 | non-member opens room A | deny | BLOCKED |
| DR-002 | member A opens room A | allow within membership scope | BLOCKED |
| DR-003 | member A opens room B | deny | BLOCKED |
| DR-004 | expired member opens room A | deny/limited per policy | BLOCKED |
| DR-005 | revoked member opens room A | deny | BLOCKED |
| DR-006 | member changes room_id to B | deny | BLOCKED |
| DR-007 | member changes document_id to B | deny | BLOCKED |
| DR-008 | member accesses old room URL | enforce current authorization | BLOCKED |
| DR-009 | member reads room metadata without membership | deny | BLOCKED |
| DR-010 | member reads audit data outside scope | deny | BLOCKED |

## 8. Documents and Storage

The repository uses the `property-images` Storage bucket for asset images and creates signed URLs in server-side page code. This makes both database authorization and Storage authorization test surfaces.

| Test ID | Scenario | Expected | Status |
|---|---|---|---|
| STORAGE-001 | user A reads image metadata for asset B | deny | BLOCKED |
| STORAGE-002 | user A requests signed URL for image B | deny | BLOCKED |
| STORAGE-003 | user A changes storage path A → B | deny | BLOCKED |
| STORAGE-004 | user B uses signed URL generated for A | behavior must match documented expiry/access model | BLOCKED |
| STORAGE-005 | signed URL after membership revocation | access must follow documented URL lifetime; limitation recorded | BLOCKED |
| STORAGE-006 | direct bucket access without app UI | enforce Storage policy | BLOCKED |
| STORAGE-007 | document B download by A | deny | BLOCKED |
| STORAGE-008 | old document version accessed by A | enforce current authorization | BLOCKED |

## 9. Security Definer review

Static review identified:

- private.audit_workflow_event()
- private.create_organization(org_type,text,text,char)
- private.has_platform_role(member_role[])
- public.handle_new_user()
- public.rls_auto_enable()

Each requires:

- direct execution accessibility review
- caller authorization
- input/target ownership review
- organization-boundary review
- search_path review
- side-effect review
- audit behavior review
- error behavior review

### Function-specific tests

| Test ID | Function | Test | Expected | Status |
|---|---|---|---|---|
| FUNC-001 | audit_workflow_event | forged cross-org workflow event | impossible | BLOCKED |
| FUNC-002 | audit_workflow_event | forged actor/organization context | impossible | BLOCKED |
| FUNC-003 | create_organization | anonymous execution | deny | BLOCKED |
| FUNC-004 | create_organization | platform organization creation | deny | BLOCKED |
| FUNC-005 | create_organization | caller/created membership mismatch | impossible | BLOCKED |
| FUNC-006 | has_platform_role | anonymous | false/deny | BLOCKED |
| FUNC-007 | has_platform_role | ordinary role | false | BLOCKED |
| FUNC-008 | has_platform_role | authorized platform role | true | BLOCKED |
| FUNC-009 | handle_new_user | forged metadata role/org | must not create privileged authorization | BLOCKED |
| FUNC-010 | rls_auto_enable | direct runtime invocation by client | deny/not exposed | BLOCKED |

## 10. Enumeration / side-channel tests

For A requesting B resources:

- compare 403 vs 404 behavior
- compare empty result vs populated result
- compare response body
- compare error messages
- compare timing where practical
- search results
- result counts
- pagination
- sorting
- public HTML
- JSON/JSON-LD metadata
- cache behavior

Expected: unauthorized users must not learn protected resource existence beyond intentionally public information.

Status: **BLOCKED**.

## 11. Cache isolation

Required scenarios:

1. A requests private resource.
2. B requests the same URL.
3. A requests private resource then signs out.
4. B opens the same URL.
5. Public request after private request.
6. Private request after public request.
7. Next.js server cache/ISR behavior.
8. CDN/Vercel cache behavior.
9. Browser cache behavior.

Expected: authorization-sensitive responses must never be served across users or organizations.

Status: **BLOCKED**.

## 12. Execution channels

For each applicable test, inspect/test:

- UI
- direct REST/Data API
- RPC
- Server Action
- Route Handler/API endpoint
- Storage API
- signed URL
- direct URL
- manually altered request parameters

A secure UI is not sufficient evidence if a lower-level channel bypasses authorization.

## 13. Evidence record

For each executed test:

```
Test ID:
Domain:
Actor:
Actor role:
Actor organization:
Resource:
Resource owner organization:
Operation:
Execution channel:
Environment:
Git commit:
Migration state:
Preconditions:
Expected result:
Actual result:
HTTP/result code:
Sanitized response:
Database state before/after:
Storage state before/after:
Evidence ID:
Timestamp:
Repeat result:
Status:
Finding ID:
```

Never store passwords, service-role keys, access tokens, or unnecessary PII in audit evidence.

## 14. Current findings

### AUTH-001
Cross-organization read isolation not behaviorally verified.  
Severity: High.  
Status: Unknown / blocked by test environment.  
Decision: P0 test required.

### AUTH-002
Cross-organization write isolation not behaviorally verified.  
Severity: Critical.  
Status: Unknown / blocked by test environment.  
Decision: P0 test required.

### STORAGE-001
Private document/image Storage isolation not behaviorally verified.  
Severity: Critical.  
Status: Unknown / blocked by test environment.  
Decision: P0 test required.

### FUNC-001
Security Definer authorization boundaries not fully behaviorally verified.  
Severity: High.  
Status: Partial static review.  
Decision: P0 review/test required.

### MIG-001
Migration history/documented schema state discrepancy requires reconciliation.  
Severity: High.  
Status: Unknown.  
Decision: reconcile before readiness claim.

### ENV-001
No isolated Supabase test environment currently available through the connected environment.  
Severity: High for audit execution, not a product vulnerability.  
Status: Blocked.  
Decision: continue static audit; defer behavioral claims.

## 15. Gate rule

No item in this matrix may be promoted to **Verified Pass** without:

1. isolated environment,
2. execution,
3. expected-vs-actual result,
4. evidence,
5. repeatability where applicable,
6. regression check for any failed case.

**Current authorization readiness: UNKNOWN.**

No production schema, policy, data, Storage object, account, or deployment is modified by this matrix.
