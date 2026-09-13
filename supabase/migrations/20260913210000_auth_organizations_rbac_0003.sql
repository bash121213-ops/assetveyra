begin;
create schema if not exists private;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public, pg_catalog
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;
revoke all on function public.handle_new_user() from public, anon, authenticated;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create or replace function private.create_organization(
  p_type org_type,
  p_legal_name text,
  p_display_name text,
  p_country_code char(2)
)
returns uuid language plpgsql security definer set search_path = public, pg_catalog
as $$
declare
  v_user uuid := (select auth.uid());
  v_org uuid;
  v_role member_role;
begin
  if v_user is null then raise exception 'authentication_required'; end if;
  if p_type = 'platform' then raise exception 'platform_organization_not_user_creatable'; end if;
  if nullif(trim(p_display_name), '') is null then raise exception 'display_name_required'; end if;
  v_role := case p_type
    when 'seller' then 'seller_admin'::member_role
    when 'investor' then 'investor_admin'::member_role
    when 'advisor' then 'advisor'::member_role
    when 'broker' then 'broker'::member_role
    when 'legal' then 'legal_reviewer'::member_role
    when 'service_provider' then 'external_reviewer'::member_role
  end;
  insert into public.organizations(type, legal_name, display_name, country_code)
  values (p_type, nullif(trim(p_legal_name), ''), trim(p_display_name), upper(p_country_code))
  returning id into v_org;
  insert into public.organization_members(organization_id, user_id, role)
  values (v_org, v_user, v_role);
  return v_org;
end;
$$;
revoke all on function private.create_organization(org_type, text, text, char) from public, anon, authenticated;
grant execute on function private.create_organization(org_type, text, text, char) to authenticated;

drop policy if exists profiles_self_select on public.profiles;
drop policy if exists profiles_self_update on public.profiles;
drop policy if exists profiles_self_insert on public.profiles;
create policy profiles_self_select on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy profiles_self_update on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy profiles_self_insert on public.profiles for insert to authenticated with check ((select auth.uid()) = id);

drop policy if exists org_member_select on public.organizations;
drop policy if exists org_admin_update on public.organizations;
create policy org_member_select on public.organizations for select to authenticated using ((select public.is_org_member(id)));
create policy org_admin_update on public.organizations for update to authenticated
using ((select public.has_org_role(id, array['seller_admin'::member_role,'investor_admin'::member_role,'platform_admin'::member_role,'operations_admin'::member_role])))
with check ((select public.has_org_role(id, array['seller_admin'::member_role,'investor_admin'::member_role,'platform_admin'::member_role,'operations_admin'::member_role])));

drop policy if exists org_members_self_select on public.organization_members;
drop policy if exists org_members_admin_insert on public.organization_members;
drop policy if exists org_members_admin_update on public.organization_members;
drop policy if exists org_members_admin_delete on public.organization_members;
create policy org_members_self_select on public.organization_members for select to authenticated
using ((select auth.uid()) = user_id or (select public.has_org_role(organization_id, array['seller_admin'::member_role,'investor_admin'::member_role,'platform_admin'::member_role,'operations_admin'::member_role])));
create policy org_members_admin_insert on public.organization_members for insert to authenticated
with check ((select public.has_org_role(organization_id, array['seller_admin'::member_role,'investor_admin'::member_role,'platform_admin'::member_role,'operations_admin'::member_role])));
create policy org_members_admin_update on public.organization_members for update to authenticated
using ((select public.has_org_role(organization_id, array['seller_admin'::member_role,'investor_admin'::member_role,'platform_admin'::member_role,'operations_admin'::member_role])))
with check ((select public.has_org_role(organization_id, array['seller_admin'::member_role,'investor_admin'::member_role,'platform_admin'::member_role,'operations_admin'::member_role])));
create policy org_members_admin_delete on public.organization_members for delete to authenticated
using ((select public.has_org_role(organization_id, array['seller_admin'::member_role,'investor_admin'::member_role,'platform_admin'::member_role,'operations_admin'::member_role])));

create index if not exists organization_members_user_org_role_idx on public.organization_members(user_id, organization_id, role);
commit;
