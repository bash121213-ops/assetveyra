# Core Workflows

## Opportunity lifecycle

`draft -> submitted -> verification -> compliance_review -> approved -> published -> suspended -> archived`

Only authorized operations users may approve publication. Publication must record actor, timestamp and decision reason.

## Investor transaction lifecycle

`interest -> qualified -> nda_pending -> nda_signed -> data_room -> diligence -> offer -> negotiation -> accepted -> contracted -> closing -> completed`

Rejected or withdrawn paths must be explicit states rather than implicit nulls.

## State transition rules

- Every transition is validated against the current state.
- Every transition creates an immutable domain/audit event.
- Repeated commands must be idempotent where a request identifier exists.
- AI recommendations can propose actions but cannot approve compliance, KYC, AML, legal contracts or closing.
- Private documents are available only after the required authorization and workflow gate.
