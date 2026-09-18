# AssetVeyra Access & Evidence Inventory v1.0

**Status:** Initial inventory — verification required before substantive audit

| Source | Current access state | Required evidence | Status |
|---|---|---|---|
| GitHub repository | Connected with repository administration access | Repo metadata, baseline commit, tree, workflows, migrations, relevant source files, history | CONFIRMED ACCESS |
| Supabase project | Connected project tooling available | Schema, tables, views, RLS policies, functions/RPC, grants, storage buckets/policies, migrations, advisors | ACCESS AVAILABLE / DETAILS TO CAPTURE |
| Vercel project | Connected Vercel tooling available | Project config, production deployment, aliases/domains, build logs, runtime logs/errors, environment-variable metadata without secret values | ACCESS AVAILABLE / DETAILS TO CAPTURE |
| Production site | Public production domain available | Browser behavior, auth flows with test accounts, HTTP behavior, headers, caching, error states | TO TEST |
| Database | Via Supabase project | Schema snapshot, constraints, indexes, relationships, sensitive columns, exposure map | TO CAPTURE |
| Storage | Via Supabase project | Buckets, public/private state, object policies, signed URL behavior, upload/download tests | TO TEST |
| CI/CD | GitHub workflows / Vercel | Workflow definitions, recent runs, build/typecheck/lint evidence, deployment linkage | TO CAPTURE |
| Analytics | No verified evidence yet | Event inventory, actual event delivery, funnels, retention/conversion evidence | UNKNOWN |
| Documentation | Existing project/phase documentation | Claim-to-evidence mapping, workflow docs, security notes, legal/trust language | TO COLLECT |
| Legal materials | Not yet inventoried | Terms, Privacy, disclaimers, contracts, jurisdiction assumptions, lawyer memo/questions | UNKNOWN |
| Customer evidence | Not yet inventoried | Real submissions, inquiries, Data Room requests, offers, payment/commitment evidence | UNKNOWN |
| Competitor evidence | Not yet inventoried for this audit | Comparable products, pricing, workflows, trust/verification model | UNKNOWN |

## Evidence handling

Each material evidence item must receive:
- Evidence ID
- Source
- Collection timestamp
- Environment
- Collector/tool
- Method
- Scope
- Version/hash where appropriate
- Sensitivity classification
- Review status

## Initial evidence IDs reserved

- EVD-BASE-001: GitHub baseline
- EVD-BASE-002: Production deployment
- EVD-BASE-003: Supabase schema/migration baseline
- EVD-BASE-004: Production runtime baseline
- EVD-BASE-005: Storage baseline
- EVD-BASE-006: CI/CD baseline
- EVD-PROD-001 onward: production behavioral tests
- EVD-SEC-001 onward: security/authorization tests
- EVD-TRUST-001 onward: verification/evidence model tests
- EVD-UX-001 onward: journey tests
- EVD-MKT-001 onward: market/customer evidence
- EVD-LEGAL-001 onward: legal materials/questions

## Important limitation

This inventory is not evidence that a capability works. It records where evidence must come from. Any untested capability remains UNKNOWN.
