begin;

drop policy if exists audit_events_actor_insert on public.audit_events;

drop policy if exists data_rooms_member_select on public.data_rooms;
create policy data_rooms_member_select on public.data_rooms for select to authenticated using (is_org_member(organization_id) or exists (select 1 from data_room_members m where m.data_room_id=data_rooms.id and m.user_id=(select auth.uid()) and (m.expires_at is null or m.expires_at>now())));

drop policy if exists deal_events_insert on public.deal_events;
create policy deal_events_insert on public.deal_events for insert to authenticated with check (actor_id=(select auth.uid()) and exists (select 1 from deals d where d.id=deal_events.deal_id and (is_org_member(d.organization_id) or is_org_member(d.buyer_organization_id) or is_org_member(d.seller_organization_id))));

drop policy if exists nda_acceptance_self_insert on public.nda_acceptances;
create policy nda_acceptance_self_insert on public.nda_acceptances for insert to authenticated with check (user_id=(select auth.uid()) and (is_org_member(organization_id) or exists (select 1 from data_rooms dr join data_room_members drm on drm.data_room_id=dr.id where dr.opportunity_id=nda_acceptances.opportunity_id and dr.organization_id=nda_acceptances.organization_id and drm.user_id=(select auth.uid()) and (drm.expires_at is null or drm.expires_at>now()))));

drop policy if exists workflow_events_server_insert on public.workflow_events;
create policy workflow_events_server_insert on public.workflow_events for insert to authenticated with check (actor_id=(select auth.uid()) and (organization_id is null or is_org_member(organization_id) or private.has_platform_role(array['platform_admin'::member_role,'operations_admin'::member_role,'compliance_officer'::member_role,'risk_analyst'::member_role,'legal_reviewer'::member_role])));

drop policy if exists documents_data_room_select on public.documents;
create policy documents_data_room_select on public.documents for select to authenticated using (private.has_platform_role(array['platform_admin'::member_role,'operations_admin'::member_role,'compliance_officer'::member_role,'risk_analyst'::member_role,'legal_reviewer'::member_role]) or exists (select 1 from data_rooms dr where dr.opportunity_id=documents.opportunity_id and dr.organization_id=documents.organization_id and is_org_member(dr.organization_id)) or exists (select 1 from data_rooms dr join data_room_members drm on drm.data_room_id=dr.id where dr.opportunity_id=documents.opportunity_id and drm.user_id=(select auth.uid()) and (drm.expires_at is null or drm.expires_at>now()) and (not dr.nda_required or exists (select 1 from nda_acceptances na where na.opportunity_id=dr.opportunity_id and na.organization_id=dr.organization_id and na.user_id=(select auth.uid())))));

drop policy if exists document_versions_data_room_select on public.document_versions;
create policy document_versions_data_room_select on public.document_versions for select to authenticated using (exists (select 1 from documents d where d.id=document_versions.document_id and (private.has_platform_role(array['platform_admin'::member_role,'operations_admin'::member_role,'compliance_officer'::member_role,'risk_analyst'::member_role,'legal_reviewer'::member_role]) or exists (select 1 from data_rooms dr where dr.opportunity_id=d.opportunity_id and dr.organization_id=d.organization_id and is_org_member(dr.organization_id)) or exists (select 1 from data_rooms dr join data_room_members drm on drm.data_room_id=dr.id where dr.opportunity_id=d.opportunity_id and drm.user_id=(select auth.uid()) and (drm.expires_at is null or drm.expires_at>now()) and (not dr.nda_required or exists (select 1 from nda_acceptances na where na.opportunity_id=dr.opportunity_id and na.organization_id=dr.organization_id and na.user_id=(select auth.uid())))))));

commit;
