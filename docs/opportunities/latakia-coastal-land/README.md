# Latakia Coastal Land — Deal Package

This folder is the working package for the seller-provided Latakia coastal land opportunity.

## Package map

1. [`opportunity.json`](./opportunity.json) — machine-readable intake record.
2. [`EXECUTIVE-SUMMARY.md`](./EXECUTIVE-SUMMARY.md) — bilingual investor-facing draft.
3. [`DATA-ROOM-INDEX.md`](./DATA-ROOM-INDEX.md) — controlled document-room structure.
4. [`DUE-DILIGENCE-CHECKLIST.md`](./DUE-DILIGENCE-CHECKLIST.md) — verification worklist and release gates.
5. [`NDA-DRAFT.md`](./NDA-DRAFT.md) — counsel-review draft.
6. [`INVESTOR-OUTREACH-PACKAGE.md`](./INVESTOR-OUTREACH-PACKAGE.md) — qualification form and outreach drafts.

## Operating decision

- Record this as a **draft / unverified** opportunity.
- Do not publish as fully verified.
- Do not infer square metres from “8 dunums” until the applicable jurisdictional unit is confirmed.
- Do not assert returns, buildable area, approvals, utilities or clear title until evidence is reviewed.
- Investor Finder may discover and score candidate organizations, but outreach requires human approval and compliance checks.
- SearXNG, n8n and Ollama integration should write candidate leads and rationale to a review queue, not directly send emails or grant Data Room access.

## Suggested next implementation slice

1. Add an authenticated seller intake path that can create this package from the existing `assets` and `opportunities` records.
2. Add package/checklist tables linked to `opportunities` rather than storing production documents in Git.
3. Add an operations review queue for Investor Finder results.
4. Add NDA acceptance and Data Room membership only through the existing server-side authorization gates.
