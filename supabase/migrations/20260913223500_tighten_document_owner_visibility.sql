drop policy if exists documents_data_room_select on public.documents;
create policy documents_data_room_select on public.documents
for select to authenticated
using (
  private.has_platform_role(array['platform_admin'::public.member_role,'operations_admin'::public.member_role,'compliance_officer'::public.member_role,'risk_analyst'::public.member_role,'legal_reviewer'::public.member_role])
  or exists (select 1 from public.data_rooms dr where dr.opportunity_id = documents.opportunity_id and dr.organization_id = documents.organization_id and is_org_member(dr.organization_id))
  or exists (select 1 from public.data_rooms dr join public.data_room_members drm on drm.data_room_id = dr.id where dr.opportunity_id = documents.opportunity_id and drm.user_id = auth.uid() and (drm.expires_at is null or drm.expires_at > now()) and ((not dr.nda_required) or exists (select 1 from public.nda_acceptances na where na.opportunity_id = dr.opportunity_id and na.organization_id = dr.organization_id and na.user_id = auth.uid())))
);

drop policy if exists document_versions_data_room_select on public.document_versions;
create policy document_versions_data_room_select on public.document_versions
for select to authenticated
using (
  exists (
    select 1 from public.documents d
    where d.id = document_versions.document_id
      and (
        private.has_platform_role(array['platform_admin'::public.member_role,'operations_admin'::public.member_role,'compliance_officer'::public.member_role,'risk_analyst'::public.member_role,'legal_reviewer'::public.member_role])
        or exists (select 1 from public.data_rooms dr where dr.opportunity_id = d.opportunity_id and dr.organization_id = d.organization_id and is_org_member(dr.organization_id))
        or exists (select 1 from public.data_rooms dr join public.data_room_members drm on drm.data_room_id = dr.id where dr.opportunity_id = d.opportunity_id and drm.user_id = auth.uid() and (drm.expires_at is null or drm.expires_at > now()) and ((not dr.nda_required) or exists (select 1 from public.nda_acceptances na where na.opportunity_id = dr.opportunity_id and na.organization_id = dr.organization_id and na.user_id = auth.uid())))
      )
  )
);
