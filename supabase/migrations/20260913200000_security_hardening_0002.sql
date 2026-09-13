begin;

alter function public.touch_updated_at() set search_path = public, pg_catalog;
revoke execute on function public.rls_auto_enable() from anon, authenticated;

create schema if not exists extensions;
alter extension citext set schema extensions;

drop policy if exists deals_ops_write on public.deals;
create policy deals_ops_write on public.deals
  as permissive for all to authenticated
  using (has_org_role(organization_id, array['platform_admin'::member_role, 'operations_admin'::member_role, 'deal_manager'::member_role]))
  with check (has_org_role(organization_id, array['platform_admin'::member_role, 'operations_admin'::member_role, 'deal_manager'::member_role]));

drop policy if exists deals_participant_select on public.deals;
create policy deals_participant_select on public.deals
  as permissive for select to authenticated
  using (is_org_member(organization_id) or is_org_member(buyer_organization_id) or is_org_member(seller_organization_id));

drop policy if exists dd_org_write on public.due_diligence_cases;
create policy dd_org_insert on public.due_diligence_cases as permissive for insert to authenticated with check (is_org_member(organization_id));
create policy dd_org_update on public.due_diligence_cases as permissive for update to authenticated using (is_org_member(organization_id)) with check (is_org_member(organization_id));
create policy dd_org_delete on public.due_diligence_cases as permissive for delete to authenticated using (is_org_member(organization_id));

drop policy if exists verification_ops_write on public.verification_cases;
create policy verification_ops_insert on public.verification_cases as permissive for insert to authenticated with check (has_org_role(organization_id, array['platform_admin'::member_role, 'operations_admin'::member_role, 'compliance_officer'::member_role, 'risk_analyst'::member_role]));
create policy verification_ops_update on public.verification_cases as permissive for update to authenticated using (has_org_role(organization_id, array['platform_admin'::member_role, 'operations_admin'::member_role, 'compliance_officer'::member_role, 'risk_analyst'::member_role])) with check (has_org_role(organization_id, array['platform_admin'::member_role, 'operations_admin'::member_role, 'compliance_officer'::member_role, 'risk_analyst'::member_role]));
create policy verification_ops_delete on public.verification_cases as permissive for delete to authenticated using (has_org_role(organization_id, array['platform_admin'::member_role, 'operations_admin'::member_role, 'compliance_officer'::member_role, 'risk_analyst'::member_role]));

create index if not exists assets_created_by_idx on public.assets(created_by);
create index if not exists audit_events_actor_id_idx on public.audit_events(actor_id);
create index if not exists deal_events_actor_id_idx on public.deal_events(actor_id);
create index if not exists deal_events_deal_id_idx on public.deal_events(deal_id);
create index if not exists deal_participants_user_id_idx on public.deal_participants(user_id);
create index if not exists deals_accepted_offer_id_idx on public.deals(accepted_offer_id);
create index if not exists deals_buyer_organization_id_idx on public.deals(buyer_organization_id);
create index if not exists deals_opportunity_id_idx on public.deals(opportunity_id);
create index if not exists deals_seller_organization_id_idx on public.deals(seller_organization_id);
create index if not exists documents_asset_id_idx on public.documents(asset_id);
create index if not exists documents_opportunity_id_idx on public.documents(opportunity_id);
create index if not exists documents_uploaded_by_idx on public.documents(uploaded_by);
create index if not exists documents_verification_case_id_idx on public.documents(verification_case_id);
create index if not exists due_diligence_cases_opportunity_id_idx on public.due_diligence_cases(opportunity_id);
create index if not exists due_diligence_cases_organization_id_idx on public.due_diligence_cases(organization_id);
create index if not exists due_diligence_requirements_document_id_idx on public.due_diligence_requirements(document_id);
create index if not exists due_diligence_requirements_reviewer_id_idx on public.due_diligence_requirements(reviewer_id);
create index if not exists investor_interests_created_by_idx on public.investor_interests(created_by);
create index if not exists offers_submitted_by_idx on public.offers(submitted_by);
create index if not exists opportunities_owner_organization_id_idx on public.opportunities(owner_organization_id);
create index if not exists organization_members_user_id_idx on public.organization_members(user_id);
create index if not exists verification_cases_asset_id_idx on public.verification_cases(asset_id);
create index if not exists verification_cases_opportunity_id_idx on public.verification_cases(opportunity_id);
create index if not exists verification_cases_organization_id_idx on public.verification_cases(organization_id);
create index if not exists verification_cases_reviewer_id_idx on public.verification_cases(reviewer_id);

commit;
