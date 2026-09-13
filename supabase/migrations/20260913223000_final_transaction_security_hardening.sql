-- Final idempotent security hardening applied to the production database.
-- Keeps private data-room documents behind room membership + NDA and gives
-- platform reviewers the intended cross-organization verification scope.

drop policy if exists data_room_members_select on public.data_room_members;
create policy data_room_members_select on public.data_room_members
for select to authenticated
using (user_id = auth.uid() or exists (select 1 from public.data_rooms dr join public.organization_members om on om.organization_id = dr.organization_id where dr.id = data_room_members.data_room_id and om.user_id = auth.uid()));

drop policy if exists investor_interests_update on public.investor_interests;
create policy investor_interests_update on public.investor_interests
for update to authenticated
using (created_by = auth.uid() or exists (select 1 from public.organization_members om where om.organization_id = investor_interests.investor_organization_id and om.user_id = auth.uid() and om.role = any(array['investor_admin'::public.member_role,'platform_admin'::public.member_role,'operations_admin'::public.member_role,'deal_manager'::public.member_role])))
with check (created_by = auth.uid() or exists (select 1 from public.organization_members om where om.organization_id = investor_interests.investor_organization_id and om.user_id = auth.uid() and om.role = any(array['investor_admin'::public.member_role,'platform_admin'::public.member_role,'operations_admin'::public.member_role,'deal_manager'::public.member_role])));

drop policy if exists offers_insert on public.offers;
create policy offers_insert on public.offers
for insert to authenticated
with check (submitted_by = auth.uid() and exists (select 1 from public.investor_interests ii join public.organization_members om on om.organization_id = ii.investor_organization_id where ii.id = offers.interest_id and om.user_id = auth.uid()));

drop policy if exists offers_update on public.offers;
create policy offers_update on public.offers
for update to authenticated
using (submitted_by = auth.uid() or exists (select 1 from public.investor_interests ii join public.opportunities op on op.id = ii.opportunity_id join public.organization_members om on om.organization_id = op.owner_organization_id where ii.id = offers.interest_id and om.user_id = auth.uid()) or exists (select 1 from public.organization_members om where om.user_id = auth.uid() and om.role = any(array['platform_admin'::public.member_role,'operations_admin'::public.member_role,'deal_manager'::public.member_role])))
with check (submitted_by = auth.uid() or exists (select 1 from public.investor_interests ii join public.opportunities op on op.id = ii.opportunity_id join public.organization_members om on om.organization_id = op.owner_organization_id where ii.id = offers.interest_id and om.user_id = auth.uid()) or exists (select 1 from public.organization_members om where om.user_id = auth.uid() and om.role = any(array['platform_admin'::public.member_role,'operations_admin'::public.member_role,'deal_manager'::public.member_role])));

drop policy if exists documents_org_select on public.documents;
drop policy if exists document_versions_participant_select on public.document_versions;
drop policy if exists documents_data_room_select on public.documents;
create policy documents_data_room_select on public.documents
for select to authenticated
using (private.has_platform_role(array['platform_admin'::public.member_role,'operations_admin'::public.member_role,'compliance_officer'::public.member_role,'risk_analyst'::public.member_role,'legal_reviewer'::public.member_role]) or exists (select 1 from public.data_rooms dr join public.data_room_members drm on drm.data_room_id = dr.id where dr.opportunity_id = documents.opportunity_id and drm.user_id = auth.uid() and (drm.expires_at is null or drm.expires_at > now()) and ((not dr.nda_required) or exists (select 1 from public.nda_acceptances na where na.opportunity_id = dr.opportunity_id and na.organization_id = dr.organization_id and na.user_id = auth.uid()))));

drop policy if exists document_versions_data_room_select on public.document_versions;
create policy document_versions_data_room_select on public.document_versions
for select to authenticated
using (exists (select 1 from public.documents d where d.id = document_versions.document_id and (private.has_platform_role(array['platform_admin'::public.member_role,'operations_admin'::public.member_role,'compliance_officer'::public.member_role,'risk_analyst'::public.member_role,'legal_reviewer'::public.member_role]) or exists (select 1 from public.data_rooms dr join public.data_room_members drm on drm.data_room_id = dr.id where dr.opportunity_id = d.opportunity_id and drm.user_id = auth.uid() and (drm.expires_at is null or drm.expires_at > now()) and ((not dr.nda_required) or exists (select 1 from public.nda_acceptances na where na.opportunity_id = dr.opportunity_id and na.organization_id = dr.organization_id and na.user_id = auth.uid()))))));

drop policy if exists verification_cases_reviewer_update on public.verification_cases;
create policy verification_cases_reviewer_update on public.verification_cases
for update to authenticated
using (private.has_platform_role(array['platform_admin'::public.member_role,'operations_admin'::public.member_role,'compliance_officer'::public.member_role,'risk_analyst'::public.member_role]))
with check (private.has_platform_role(array['platform_admin'::public.member_role,'operations_admin'::public.member_role,'compliance_officer'::public.member_role,'risk_analyst'::public.member_role]));

drop policy if exists assets_verification_reviewer_update on public.assets;
create policy assets_verification_reviewer_update on public.assets
for update to authenticated
using (private.has_platform_role(array['platform_admin'::public.member_role,'operations_admin'::public.member_role,'compliance_officer'::public.member_role,'risk_analyst'::public.member_role]))
with check (private.has_platform_role(array['platform_admin'::public.member_role,'operations_admin'::public.member_role,'compliance_officer'::member_role,'risk_analyst'::public.member_role]));

drop policy if exists opportunities_verification_reviewer_update on public.opportunities;
create policy opportunities_verification_reviewer_update on public.opportunities
for update to authenticated
using (private.has_platform_role(array['platform_admin'::public.member_role,'operations_admin'::public.member_role,'compliance_officer'::public.member_role,'risk_analyst'::public.member_role]))
with check (private.has_platform_role(array['platform_admin'::public.member_role,'operations_admin'::public.member_role,'compliance_officer'::public.member_role,'risk_analyst'::public.member_role]));
