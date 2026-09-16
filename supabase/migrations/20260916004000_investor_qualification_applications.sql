create table if not exists public.investor_qualification_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  nationality text not null,
  residence_country text not null,
  investor_type text not null check (investor_type in ('hnwi','family_office','fund','developer','corporate','other')),
  investable_assets text not null check (investable_assets in ('100k-500k','500k-1m','1m-5m','5m-10m','10m+')),
  investor_classification text not null check (investor_classification in ('yes','no','entity','na')),
  markets text[] not null default '{}',
  property_type text not null check (property_type in ('cashflow','luxury','commercial','land','multifamily','joint_venture')),
  investment_size text not null check (investment_size in ('100k-500k','500k-1m','1m-3m','3m-5m','5m+')),
  financing text not null check (financing in ('cash','30-50','50-70','70+')),
  proof_of_funds text not null check (proof_of_funds in ('yes','no')),
  timeline text not null check (timeline in ('30','60','90','research')),
  deals_count text not null check (deals_count in ('1','2-3','4-5','5+')),
  nda_before text not null check (nda_before in ('yes','once','no')),
  advisor text not null check (advisor in ('yes_local','yes_target','no')),
  experience text not null check (experience in ('0','1-3','3-5','5+')),
  source text not null check (source in ('google','linkedin','referral','conference','portal','other')),
  referral_name text,
  comments text,
  consent boolean not null default false check (consent = true),
  consent_at timestamptz not null default now(),
  nda_version text not null default 'assetveyra-investor-nda-v1',
  nda_acknowledged boolean not null default false,
  nda_acknowledged_at timestamptz,
  nda_signatory_name text,
  locale text not null default 'en' check (locale in ('en','ar','zh','es','fr')),
  status text not null default 'new' check (status in ('new','reviewing','qualified','nda_pending','nda_signed','rejected','closed')),
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists investor_qualification_applications_created_idx on public.investor_qualification_applications(created_at desc);
create index if not exists investor_qualification_applications_status_idx on public.investor_qualification_applications(status, created_at desc);
create index if not exists investor_qualification_applications_email_idx on public.investor_qualification_applications(lower(email));

alter table public.investor_qualification_applications enable row level security;

drop policy if exists investor_qualification_public_insert on public.investor_qualification_applications;
create policy investor_qualification_public_insert on public.investor_qualification_applications
for insert to anon, authenticated
with check (
  consent = true
  and char_length(trim(full_name)) between 2 and 120
  and char_length(trim(email)) between 5 and 320
  and char_length(trim(phone)) between 5 and 40
  and char_length(trim(nationality)) between 2 and 120
  and char_length(trim(residence_country)) between 2 and 120
  and cardinality(markets) <= 10
);

drop policy if exists investor_qualification_platform_read on public.investor_qualification_applications;
create policy investor_qualification_platform_read on public.investor_qualification_applications
for select to authenticated
using (exists (select 1 from public.organization_members om where om.user_id = auth.uid() and om.role in ('platform_admin','operations_admin','compliance_officer','risk_analyst')));

drop policy if exists investor_qualification_platform_update on public.investor_qualification_applications;
create policy investor_qualification_platform_update on public.investor_qualification_applications
for update to authenticated
using (exists (select 1 from public.organization_members om where om.user_id = auth.uid() and om.role in ('platform_admin','operations_admin','compliance_officer','risk_analyst')))
with check (true);

drop policy if exists investor_qualification_platform_delete on public.investor_qualification_applications;
create policy investor_qualification_platform_delete on public.investor_qualification_applications
for delete to authenticated
using (exists (select 1 from public.organization_members om where om.user_id = auth.uid() and om.role in ('platform_admin','operations_admin','compliance_officer')));

create or replace function public.set_investor_qualification_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists investor_qualification_updated_at on public.investor_qualification_applications;
create trigger investor_qualification_updated_at before update on public.investor_qualification_applications
for each row execute function public.set_investor_qualification_updated_at();
