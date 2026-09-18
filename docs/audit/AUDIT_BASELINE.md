# Audit Baseline v1.0

**Captured:** 2026-09-18  
**Audit branch:** `audit/deep-audit-charter`  
**Production code baseline:** `fd5f7103d64208629e607a42f4596ad2bbb1b4ff`

## GitHub
- Repository: `bash121213-ops/assetveyra`
- Default branch: `main`
- Repository visibility: public
- Connected access: admin/maintain/push confirmed

## Vercel
- Project: `assetveyra`
- Known production deployment: `dpl_4UsGEs2kvsGFS2NUbCJcxUrgZ9cC`
- Production deployment state: READY
- Production commit: `fd5f7103d64208629e607a42f4596ad2bbb1b4ff`
- Audit branch generated preview deployments after documentation commits. These are NOT production deployments and are excluded from the production baseline.

## Supabase
- Project: `tnuewoctpsekdxyqkumv`
- Migration inventory captured.
- Latest migration currently returned by migration inventory: `20260917104808` / `20260917165000_lock_seller_publish_controls_rc01`.
- The migration inventory does not currently show the previously documented Phase 14 migration `20260918000000_security_hardening_0014`; this is an audit discrepancy and remains UNKNOWN until reconciled.
- Live `public.assets` policy inspection confirms policy `assets_member_or_platform_select` exists and replaces the prior broad public SELECT policy.

## Initial evidence
- EVD-BASE-001: GitHub repository and baseline commit.
- EVD-BASE-002: Vercel production deployment metadata.
- EVD-BASE-003: Supabase migration inventory.
- EVD-SEC-001: Live `public.assets` SELECT policy inspection.

## Initial audit observation
There is a reconciliation gap between the documented Phase 14 migration history and the current migration inventory returned by the connected Supabase project. This is not yet classified as a production defect. It is classified as **UNKNOWN / requires reconciliation** before the audit can claim migration-state integrity.

No production data or application code was modified during this baseline capture.
