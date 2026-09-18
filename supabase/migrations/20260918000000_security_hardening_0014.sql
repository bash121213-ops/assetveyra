-- Phase 14: prevent authenticated users outside the owning organization
-- or platform operations roles from selecting published asset rows directly.
-- Public marketplace access remains through the intentionally narrow
-- public_assets view, which does not expose private asset fields.

DROP POLICY IF EXISTS "assets_public_or_member_select" ON public.assets;

CREATE POLICY "assets_member_or_platform_select"
ON public.assets
FOR SELECT
TO anon, authenticated
USING (
  is_org_member(organization_id)
  OR private.has_platform_role(
    ARRAY[
      'platform_admin'::member_role,
      'operations_admin'::member_role,
      'compliance_officer'::member_role,
      'risk_analyst'::member_role,
      'legal_reviewer'::member_role
    ]
  )
);
