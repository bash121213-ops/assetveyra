create table if not exists public.legal_consultation_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  matter_country text not null,
  jurisdiction text not null,
  matter_type text not null,
  role text not null,
  urgency text not null default 'standard',
  description text not null,
  desired_outcome text,
  consent boolean not null default false,
  consent_at timestamptz,
  locale text not null default 'en',
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint legal_consultation_name_length check (char_length(btrim(name)) between 2 and 120),
  constraint legal_consultation_email_length check (char_length(btrim(email)) between 5 and 320),
  constraint legal_consultation_phone_length check (char_length(btrim(phone)) between 5 and 40),
  constraint legal_consultation_country_length check (char_length(btrim(matter_country)) between 2 and 100),
  constraint legal_consultation_jurisdiction_length check (char_length(btrim(jurisdiction)) between 2 and 120),
  constraint legal_consultation_description_length check (char_length(btrim(description)) between 20 and 6000),
  constraint legal_consultation_outcome_length check (desired_outcome is null or char_length(desired_outcome) <= 3000),
  constraint legal_consultation_consent check (consent = true),
  constraint legal_consultation_locale check (locale in ('en','ar','zh','es','fr')),
  constraint legal_consultation_status check (status in ('new','reviewing','referred','scheduled','closed')),
  constraint legal_consultation_matter_type check (matter_type in ('real_estate','transaction','investment','contract','due_diligence','dispute','corporate','other')),
  constraint legal_consultation_role check (role in ('investor','seller','buyer','company','other')),
  constraint legal_consultation_urgency check (urgency in ('standard','soon','urgent'))
);

create index if not exists legal_consultation_requests_status_created_idx
  on public.legal_consultation_requests (status, created_at desc);

create index if not exists legal_consultation_requests_created_idx
  on public.legal_consultation_requests (created_at desc);

create or replace function public.set_legal_consultation_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists legal_consultation_requests_updated_at on public.legal_consultation_requests;
create trigger legal_consultation_requests_updated_at
before update on public.legal_consultation_requests
for each row execute function public.set_legal_consultation_updated_at();

alter table public.legal_consultation_requests enable row level security;

drop policy if exists legal_consultation_public_insert on public.legal_consultation_requests;
create policy legal_consultation_public_insert
on public.legal_consultation_requests
for insert
to anon, authenticated
with check (
  consent = true
  and char_length(btrim(name)) between 2 and 120
  and char_length(btrim(email)) between 5 and 320
  and char_length(btrim(phone)) between 5 and 40
  and char_length(btrim(matter_country)) between 2 and 100
  and char_length(btrim(jurisdiction)) between 2 and 120
  and char_length(btrim(description)) between 20 and 6000
  and (desired_outcome is null or char_length(desired_outcome) <= 3000)
  and locale in ('en','ar','zh','es','fr')
  and status = 'new'
);

drop policy if exists legal_consultation_platform_select on public.legal_consultation_requests;
create policy legal_consultation_platform_select
on public.legal_consultation_requests
for select
to authenticated
using (
  exists (
    select 1
    from public.organization_members om
    where om.user_id = (select auth.uid())
      and om.role in ('platform_admin','operations_admin','compliance_officer','risk_analyst')
  )
);

drop policy if exists legal_consultation_platform_update on public.legal_consultation_requests;
create policy legal_consultation_platform_update
on public.legal_consultation_requests
for update
to authenticated
using (
  exists (
    select 1
    from public.organization_members om
    where om.user_id = (select auth.uid())
      and om.role in ('platform_admin','operations_admin','compliance_officer')
  )
)
with check (status in ('new','reviewing','referred','scheduled','closed'));

grant insert on table public.legal_consultation_requests to anon, authenticated;
grant select, update on table public.legal_consultation_requests to authenticated;
