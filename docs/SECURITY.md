# Security Baseline

- Supabase Auth is the authentication authority.
- Store user profile data in application tables linked to `auth.users(id)`.
- Never store plaintext passwords or password-equivalent secrets in application tables.
- Enable RLS on every tenant/user-sensitive table.
- Use explicit SELECT/INSERT/UPDATE/DELETE policies with correct `WITH CHECK` clauses.
- Do not grant client access to service-role credentials.
- Use Storage APIs and Storage RLS for files; do not write directly to storage internals.
- Keep KYC, AML, identity documents and private deal-room files outside public queries.
- Record security-sensitive changes in an append-only audit trail.
- Validate all external input at application boundaries.
- Use idempotency keys for payment/deal/workflow operations that can be retried.
- Treat AI output as untrusted advisory data and validate it before persistence or execution.
- Database migrations are the source of truth for schema and policies.
