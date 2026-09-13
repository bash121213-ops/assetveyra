begin;
create or replace function public.create_organization(p_type org_type,p_legal_name text,p_display_name text,p_country_code char(2)) returns uuid language sql security definer set search_path=public,private,pg_catalog as $$ select private.create_organization(p_type,p_legal_name,p_display_name,p_country_code); $$;
revoke all on function public.create_organization(org_type,text,text,char) from public,anon;grant execute on function public.create_organization(org_type,text,text,char) to authenticated;
commit;