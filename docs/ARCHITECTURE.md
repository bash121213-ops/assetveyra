# AssetVeyra Architecture

## System boundary

AssetVeyra is a multi-tenant transaction platform, not a simple property listing website.

```text
Public Marketplace
        |
        v
Opportunity Intake -> Verification -> Compliance/Risk -> Publication
        |
        v
Investor Discovery -> Interest -> Qualification -> NDA -> Data Room
        |
        v
Due Diligence -> Offer -> Negotiation -> Deal -> Contract -> Closing
        |
        v
Commission / Completion / Audit
```

## Application layers

- **Domain:** business rules, entities, value objects, state transitions.
- **Application:** use cases, authorization checks, workflow orchestration.
- **Contracts:** Zod schemas, DTOs, event contracts and API boundaries.
- **Infrastructure:** Supabase, storage, email, external providers and AI adapters.
- **Web:** presentation, routing, server actions/API handlers and localization.

## Core bounded contexts

1. Identity and organizations
2. Opportunities and assets
3. Verification and compliance
4. Documents and Data Room
5. Due diligence
6. Investor interests
7. Offers and negotiation
8. Deals and contracts
9. Commissions and settlement tracking
10. Messaging and notifications
11. Workflow automation
12. Audit and security
13. AI assistance
14. Analytics

## Security boundary

Public opportunity information must never expose private seller documents, KYC records, Data Room files, negotiation records or internal compliance notes. Authorization is enforced at the server boundary and by database RLS where applicable.
