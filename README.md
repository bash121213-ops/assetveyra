# AssetVeyra

Global real-estate investment and deal infrastructure platform.

## Product scope

AssetVeyra is designed as an institutional-grade platform for discovering, verifying, diligencing, negotiating and closing real-estate opportunities.

Core domains:

- Opportunities, properties, land, hotels and projects
- Investor and seller portals
- KYC / AML and compliance workflows
- NDA and secure Data Room
- Due diligence and document intelligence
- Interests, offers and negotiation
- Deals, contracts and commissions
- Messaging, notifications and automation
- Audit and security events
- AI-assisted analysis and workflow recommendations

## Architecture

This repository intentionally separates domain logic, application use cases, contracts and infrastructure. Supabase migrations are the database source of truth.

```text
apps/web              Next.js web application
packages/domain       Domain entities, value objects and state rules
packages/application  Use cases and orchestration
packages/contracts    Shared schemas/API contracts
packages/infrastructure Integrations and persistence adapters
supabase/migrations   Database source of truth
supabase/functions    Edge/server functions
supabase/seed         Development seed data
docs                  Architecture, security and workflow decisions
tests                 Cross-domain and integration tests
```

## Initial principles

1. Security and tenant isolation are designed before business features.
2. Supabase Auth owns authentication; application profiles never store passwords.
3. RLS is mandatory for tenant/user-facing data.
4. Service-role access is isolated to trusted server-side operations.
5. State-changing workflows are auditable and idempotent.
6. Compliance and legal decisions cannot be overridden by AI.
7. The public marketplace is separated from private deal-room data.
8. Migrations, not ad-hoc production SQL, are the database source of truth.
9. English is the canonical content language; Arabic is RTL and other supported languages are LTR.

## Languages

English, Arabic, Chinese, Spanish, French, German, Japanese and Korean.
