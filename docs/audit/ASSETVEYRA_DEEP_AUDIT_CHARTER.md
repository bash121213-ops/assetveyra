# AssetVeyra Deep Audit Charter v1.0

**Status:** Approved / Audit initiation  
**Audit mode:** Evidence-first, read-only by default  
**Development:** No feature development during audit. Security/operational fixes are permitted only when a material finding requires immediate remediation and must be logged and retested.

## 1. Purpose

Determine whether AssetVeyra is technically secure, operationally reliable, commercially meaningful within a defined scope, and sufficiently clear in its trust/verification model to justify progression toward institutional Data Room and a limited Deal Room.

The audit is an evidence exercise, not a feature roadmap.

## 2. Governing rule

EXISTS != WORKS != VERIFIED.

- **EXISTS:** present in code, database, configuration, or UI.
- **WORKS:** expected behavior was executed successfully in a defined test.
- **VERIFIED:** the test, evidence, environment, result, and reproduction path are documented.

If evidence is insufficient, the status is **UNKNOWN**.

## 3. Scope

### Technical
- Next.js application, Server Components, Server Actions, API routes/RPC.
- Supabase Auth, PostgreSQL, RLS, Views, Functions/RPC, Storage.
- Schema and migration history.
- Vercel configuration, deployments, runtime behavior, headers, environment handling.
- Production domain and production behavior.

### Product / UX
- Public opportunity discovery.
- Opportunity details and verification presentation.
- Investor interest/request flows.
- Seller submission.
- Reviewer/admin workflows.
- Data Room foundations and access flows.
- Core mobile behavior.
- Current five locales: EN / AR / ZH / ES / FR.

### Trust
- Meaning and presentation of Verified.
- Claims, evidence, reviewers, dates, expiry, limitations.
- Risk/dispute/expired states.
- Responsibility boundaries between seller, AssetVeyra, third parties, and licensed professionals.

### Business / Market
- Seller, investor, broker, legal-firm, and verification/compliance hypotheses.
- Competitive alternatives across marketplace, real-estate investment, and VDR/deal-management categories.
- Evidence of behavior and willingness to pay.

### Legal / regulatory
Identify legal questions, blockers, and required professional review. Do not make unsupported legal-compliance claims.

## 4. Explicit exclusions

- No general feature expansion.
- No redesign project.
- No additional languages.
- No mobile application.
- No AML/KYC engine.
- No custody of client funds.
- No claim that AssetVeyra replaces legal, compliance, tax, valuation, or investment professionals.
- No new map work.

## 5. Reference standards

Use standards as test frameworks, not as automatic compliance claims:
- OWASP ASVS.
- OWASP API Security Top 10.
- WCAG 2.2.
- Core Web Vitals / field performance principles.
- Privacy by Design / data-minimization principles.
- Applicable jurisdiction-specific legal requirements after scope is established.

## 6. Audit roles

- Audit owner
- Technical auditor
- Security reviewer
- Product/UX reviewer
- Evidence custodian
- Legal advisor
- Business validation owner
- Final decision owner

Roles may be combined when necessary, but conflicts must be recorded.

## 7. Evidence rule

Material findings must have:
- Finding ID
- Test ID
- Environment
- Actor / preconditions
- Expected result
- Actual result
- Evidence IDs
- Severity
- Reproducibility
- Impact
- Root cause where known
- Decision
- Owner
- Retest status

Evidence must not expose production secrets or unnecessary personal data.

## 8. Status vocabulary

- Pass
- Fail
- Partial
- Unknown
- Blocked

Additional decision labels:
- Blocking
- Non-blocking
- Conditional
- Awaiting legal decision

## 9. Baseline

The audit baseline is the production code state immediately before audit work begins.

Current known baseline:
- Repository: `bash121213-ops/assetveyra`
- Branch: `main`
- Baseline commit: `fd5f7103d64208629e607a42f4596ad2bbb1b4ff`
- Latest known phase: Phase 15 performance
- Phase 16 final QA: completed before audit initiation
- Production domain: `assetveyra.com`

The exact production deployment, Supabase schema/migration state, and runtime state must be captured in the Access & Evidence Inventory before substantive testing.

## 10. Exit criteria

The audit is complete only when:
1. Scope and evidence sources are inventoried.
2. Material claims have findings or an explicit Unknown/Blocked state.
3. Authorization and data-exposure testing is documented.
4. Trust/verification semantics are defined or gaps are explicit.
5. Legal questions/blockers are documented.
6. Customer/market hypotheses have evidence or remain explicitly unvalidated.
7. Findings are classified into KEEP / IMPROVE / ADD / DELAY / DO NOT BUILD.
8. P0 and P0.5 gates are assessed.
9. A final decision is issued: PROCEED / PIVOT / STOP-DEFER.

## 11. Gate policy

No P1 Institutional Data Room build starts before P0 and P0.5 gates are satisfied or formally accepted with documented rationale.

No P2 Limited Deal Room build starts before the Data Room produces measurable real user activity and a defensible next-step flow.

**Decision principle:** do not build because a feature exists elsewhere in the market; build only when evidence shows the capability is necessary, safe, and valuable.
