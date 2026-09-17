drop policy if exists assets_member_insert on public.assets;
create policy assets_member_insert on public.assets
for insert to authenticated
with check (
  is_org_member(organization_id)
  and created_by = (select auth.uid())
  and status in ('draft'::asset_status, 'submitted'::asset_status)
);

drop policy if exists assets_update on public.assets;
create policy assets_update on public.assets
for update to authenticated
using (
  (is_org_member(organization_id) and status in ('draft'::asset_status, 'submitted'::asset_status))
  or private.has_platform_role(array['platform_admin'::member_role, 'operations_admin'::member_role, 'compliance_officer'::member_role, 'risk_analyst'::member_role])
)
with check (
  (is_org_member(organization_id) and status in ('draft'::asset_status, 'submitted'::asset_status))
  or private.has_platform_role(array['platform_admin'::member_role, 'operations_admin'::member_role, 'compliance_officer'::member_role, 'risk_analyst'::member_role])
);

drop policy if exists opportunities_member_insert on public.opportunities;
create policy opportunities_member_insert on public.opportunities
for insert to authenticated
with check (
  is_org_member(owner_organization_id)
  and status in ('draft'::opportunity_status, 'submitted'::opportunity_status)
  and visibility = 'private'
);

drop policy if exists opportunities_update on public.opportunities;
create policy opportunities_update on public.opportunities
for update to authenticated
using (
  (is_org_member(owner_organization_id) and status in ('draft'::opportunity_status, 'submitted'::opportunity_status))
  or private.has_platform_role(array['platform_admin'::member_role, 'operations_admin'::member_role, 'compliance_officer'::member_role, 'risk_analyst'::member_role])
)
with check (
  (is_org_member(owner_organization_id) and status in ('draft'::opportunity_status, 'submitted'::opportunity_status))
  or private.has_platform_role(array['platform_admin'::member_role, 'operations_admin'::member_role, 'compliance_officer'::member_role, 'risk_analyst'::member_role])
);