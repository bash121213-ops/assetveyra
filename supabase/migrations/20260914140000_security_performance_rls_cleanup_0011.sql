begin;

-- Keep RLS authorization semantics intact while removing overlapping policies and
-- using initplan-safe auth.uid() evaluation.

drop policy if exists assets_member_update on public.assets;
drop policy if exists assets_verification_reviewer_update on public.assets;
create policy assets_update on public.assets for update to authenticated
using (is_org_member(organization_id) or private.has_platform_role(array['platform_admin'::member_role,'operations_admin'::member_role,'compliance_officer'::member_role,'risk_analyst'::member_role))
with check (is_org_member(organization_id) or private.has_platform_role(array['platform_admin'::member_role,'operations_admin'::member_role,'compliance_officer'::member_role,'risk_analyst'::member_role));

drop policy if exists opportunities_member_update on public.opportunities;
drop policy if exists opportunities_verification_reviewer_update on public.opportunities;
create policy opportunities_update on public.opportunities for update to authenticated
using (is_org_member(owner_organization_id) or private.has_platform_role(array['platform_admin'::member_role,'operations_admin'::member_role,'compliance_officer'::member_role,'risk_analyst'::member_role))
with check (is_org_member(owner_organization_id) or private.has_platform_role(array['platform_admin'::member_role,'operations_admin'::member_role,'compliance_officer'::member_role,'risk_analyst'::member_role));

drop policy if exists verification_cases_reviewer_update on public.verification_cases;
drop policy if exists verification_ops_update on public.verification_cases;
create policy verification_cases_update on public.verification_cases for update to authenticated
using (private.has_platform_role(array['platform_admin'::member_role,'operations_admin'::member_role,'compliance_officer'::member_role,'risk_analyst'::member_role]) or has_org_role(organization_id,array['platform_admin'::member_role,'operations_admin'::member_role,'compliance_officer'::member_role,'risk_analyst'::member_role]))
with check (private.has_platform_role(array['platform_admin'::member_role,'operations_admin'::member_role,'compliance_officer'::member_role,'risk_analyst'::member_role]) or has_org_role(organization_id,array['platform_admin'::member_role,'operations_admin'::member_role,'compliance_officer'::member_role,'risk_analyst'::member_role]));

drop policy if exists data_room_members_participant_select on public.data_room_members;
drop policy if exists data_room_members_select on public.data_room_members;
create policy data_room_members_select on public.data_room_members for select to authenticated
using (user_id=(select auth.uid()) or is_org_member(organization_id) or exists (select 1 from data_rooms dr join organization_members om on om.organization_id=dr.organization_id where dr.id=data_room_members.data_room_id and om.user_id=(select auth.uid())));

drop policy if exists interests_participant_update on public.investor_interests;
drop policy if exists investor_interests_update on public.investor_interests;
create policy investor_interests_update on public.investor_interests for update to authenticated
using (
  is_org_member(investor_organization_id)
  or exists (select 1 from opportunities o where o.id=investor_interests.opportunity_id and is_org_member(o.owner_organization_id))
  or created_by=(select auth.uid())
  or exists (select 1 from organization_members om where om.organization_id=investor_interests.investor_organization_id and om.user_id=(select auth.uid()) and om.role=any(array['investor_admin'::member_role,'platform_admin'::member_role,'operations_admin'::member_role,'deal_manager'::member_role]))
)
with check (
  is_org_member(investor_organization_id)
  or exists (select 1 from opportunities o where o.id=investor_interests.opportunity_id and is_org_member(o.owner_organization_id))
  or created_by=(select auth.uid())
  or exists (select 1 from organization_members om where om.organization_id=investor_interests.investor_organization_id and om.user_id=(select auth.uid()) and om.role=any(array['investor_admin'::member_role,'platform_admin'::member_role,'operations_admin'::member_role,'deal_manager'::member_role]))
);

drop policy if exists offers_insert on public.offers;
drop policy if exists offers_investor_insert on public.offers;
create policy offers_insert on public.offers for insert to authenticated
with check (
  submitted_by=(select auth.uid())
  and exists (select 1 from investor_interests ii where ii.id=offers.interest_id and is_org_member(ii.investor_organization_id))
);

drop policy if exists offers_participant_update on public.offers;
drop policy if exists offers_update on public.offers;
create policy offers_update on public.offers for update to authenticated
using (
  submitted_by=(select auth.uid())
  or exists (select 1 from investor_interests i where i.id=offers.interest_id and is_org_member(i.investor_organization_id))
  or exists (select 1 from investor_interests i join opportunities o on o.id=i.opportunity_id where i.id=offers.interest_id and is_org_member(o.owner_organization_id))
  or exists (select 1 from organization_members m where m.user_id=(select auth.uid()) and m.role=any(array['platform_admin'::member_role,'operations_admin'::member_role,'deal_manager'::member_role]))
)
with check (
  submitted_by=(select auth.uid())
  or exists (select 1 from investor_interests i where i.id=offers.interest_id and is_org_member(i.investor_organization_id))
  or exists (select 1 from investor_interests i join opportunities o on o.id=i.opportunity_id where i.id=offers.interest_id and is_org_member(o.owner_organization_id))
  or exists (select 1 from organization_members m where m.user_id=(select auth.uid()) and m.role=any(array['platform_admin'::member_role,'operations_admin'::member_role,'deal_manager'::member_role]))
);

commit;
