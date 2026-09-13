create extension if not exists pgcrypto;
create extension if not exists citext;

create type public.org_type as enum ('platform','seller','investor','advisor','broker','legal','service_provider');
create type public.member_role as enum ('platform_admin','operations_admin','compliance_officer','risk_analyst','deal_manager','legal_reviewer','data_room_manager','seller_admin','seller_member','investor_admin','investor_member','advisor','broker','external_reviewer');
create type public.asset_type as enum ('land','residential','commercial','hotel','hospitality','industrial','mixed_use','development_project','infrastructure','renewable_energy','other');
create type public.asset_status as enum ('draft','submitted','verification','compliance_review','approved','published','suspended','archived');
create type public.opportunity_status as enum ('draft','submitted','verification','compliance_review','approved','published','suspended','archived');
create type public.case_status as enum ('open','in_review','needs_information','escalated','approved','rejected','expired','closed');
create type public.investor_interest_status as enum ('interest','qualified','nda_pending','nda_signed','data_room','diligence','offer','negotiation','accepted','contracted','closing','completed','rejected','withdrawn');
create type public.offer_status as enum ('draft','submitted','countered','accepted','rejected','withdrawn','expired');
create type public.deal_status as enum ('initiated','nda','data_room','diligence','offer','negotiation','approval','contract','signing','closing','completed','cancelled');
create type public.document_visibility as enum ('private','deal_room','public');

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  type public.org_type not null,
  legal_name text not null,
  display_name text not null,
  country_code char(2),
  verification_status public.case_status not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  country_code char(2),
  locale text not null default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.member_role not null,
  created_at timestamptz not null default now(),
  primary key (organization_id,user_id)
);

create table public.assets (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id),
  asset_type public.asset_type not null,
  status public.asset_status not null default 'draft',
  title text not null,
  country_code char(2),
  region text,
  city text,
  address_private text,
  latitude numeric(9,6),
  longitude numeric(9,6),
  area_sqm numeric(18,2),
  currency char(3),
  asking_price numeric(20,2),
  public_summary text,
  private_notes text,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.opportunities (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references public.assets(id) on delete cascade,
  owner_organization_id uuid not null references public.organizations(id),
  status public.opportunity_status not null default 'draft',
  slug citext unique not null,
  investment_thesis text,
  structure text,
  minimum_ticket numeric(20,2),
  target_return numeric(8,4),
  visibility text not null default 'public',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.verification_cases (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id),
  asset_id uuid references public.assets(id),
  opportunity_id uuid references public.opportunities(id),
  status public.case_status not null default 'open',
  category text not null,
  decision_reason text,
  reviewer_id uuid references public.profiles(id),
  opened_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id),
  asset_id uuid references public.assets(id),
  opportunity_id uuid references public.opportunities(id),
  verification_case_id uuid references public.verification_cases(id),
  title text not null,
  document_type text not null,
  storage_path text not null,
  visibility public.document_visibility not null default 'private',
  version integer not null default 1,
  checksum text,
  uploaded_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.due_diligence_cases (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id),
  opportunity_id uuid not null references public.opportunities(id),
  status public.case_status not null default 'open',
  started_at timestamptz,
  completed_at timestamptz
);

create table public.due_diligence_requirements (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.due_diligence_cases(id) on delete cascade,
  category text not null,
  name text not null,
  required boolean not null default true,
  status text not null default 'open',
  severity text,
  document_id uuid references public.documents(id),
  finding text,
  resolution text,
  reviewer_id uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.investor_interests (
  id uuid primary key default gen_random_uuid(),
  investor_organization_id uuid not null references public.organizations(id),
  opportunity_id uuid not null references public.opportunities(id),
  status public.investor_interest_status not null default 'interest',
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(investor_organization_id, opportunity_id)
);

create table public.offers (
  id uuid primary key default gen_random_uuid(),
  interest_id uuid not null references public.investor_interests(id),
  submitted_by uuid not null references public.profiles(id),
  amount numeric(20,2) not null,
  currency char(3) not null,
  terms jsonb not null default '{}'::jsonb,
  status public.offer_status not null default 'draft',
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.deals (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id),
  opportunity_id uuid not null references public.opportunities(id),
  buyer_organization_id uuid not null references public.organizations(id),
  seller_organization_id uuid not null references public.organizations(id),
  accepted_offer_id uuid references public.offers(id),
  status public.deal_status not null default 'initiated',
  target_close_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.deal_participants (
  deal_id uuid not null references public.deals(id) on delete cascade,
  user_id uuid not null references public.profiles(id),
  role text not null,
  created_at timestamptz not null default now(),
  primary key (deal_id,user_id)
);

create table public.deal_events (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid not null references public.deals(id) on delete cascade,
  event_type text not null,
  actor_id uuid references public.profiles(id),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.audit_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id),
  actor_id uuid references public.profiles(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  previous_state jsonb,
  new_state jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index assets_org_idx on public.assets(organization_id);
create index opportunities_asset_idx on public.opportunities(asset_id);
create index opportunities_status_idx on public.opportunities(status);
create index documents_org_idx on public.documents(organization_id);
create index dd_case_idx on public.due_diligence_requirements(case_id);
create index interests_opportunity_idx on public.investor_interests(opportunity_id);
create index offers_interest_idx on public.offers(interest_id);
create index deals_org_idx on public.deals(organization_id);
create index audit_org_created_idx on public.audit_events(organization_id,created_at desc);

create or replace function public.is_org_member(target_org uuid)
returns boolean language sql stable security invoker set search_path = public
as $$ select exists(select 1 from public.organization_members m where m.organization_id=target_org and m.user_id=(select auth.uid())); $$;

create or replace function public.has_org_role(target_org uuid, allowed_roles public.member_role[])
returns boolean language sql stable security invoker set search_path = public
as $$ select exists(select 1 from public.organization_members m where m.organization_id=target_org and m.user_id=(select auth.uid()) and m.role = any(allowed_roles)); $$;

alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.organization_members enable row level security;
alter table public.assets enable row level security;
alter table public.opportunities enable row level security;
alter table public.verification_cases enable row level security;
alter table public.documents enable row level security;
alter table public.due_diligence_cases enable row level security;
alter table public.due_diligence_requirements enable row level security;
alter table public.investor_interests enable row level security;
alter table public.offers enable row level security;
alter table public.deals enable row level security;
alter table public.deal_participants enable row level security;
alter table public.deal_events enable row level security;
alter table public.audit_events enable row level security;

create policy profiles_self_select on public.profiles for select to authenticated using (id=(select auth.uid()));
create policy profiles_self_update on public.profiles for update to authenticated using (id=(select auth.uid())) with check (id=(select auth.uid()));
create policy org_member_select on public.organizations for select to authenticated using (public.is_org_member(id));
create policy org_members_self_select on public.organization_members for select to authenticated using (user_id=(select auth.uid()) or public.is_org_member(organization_id));
create policy assets_member_select on public.assets for select to authenticated using (public.is_org_member(organization_id));
create policy assets_member_insert on public.assets for insert to authenticated with check (public.is_org_member(organization_id) and created_by=(select auth.uid()));
create policy assets_member_update on public.assets for update to authenticated using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy opportunities_public_or_member_select on public.opportunities for select to anon, authenticated using (status='published' or public.is_org_member(owner_organization_id));
create policy opportunities_member_insert on public.opportunities for insert to authenticated with check (public.is_org_member(owner_organization_id));
create policy opportunities_member_update on public.opportunities for update to authenticated using (public.is_org_member(owner_organization_id)) with check (public.is_org_member(owner_organization_id));
create policy verification_org_select on public.verification_cases for select to authenticated using (public.is_org_member(organization_id));
create policy verification_ops_write on public.verification_cases for all to authenticated using (public.has_org_role(organization_id, array['platform_admin','operations_admin','compliance_officer','risk_analyst']::public.member_role[])) with check (public.has_org_role(organization_id, array['platform_admin','operations_admin','compliance_officer','risk_analyst']::public.member_role[]));
create policy documents_org_select on public.documents for select to authenticated using (public.is_org_member(organization_id));
create policy documents_org_insert on public.documents for insert to authenticated with check (public.is_org_member(organization_id) and uploaded_by=(select auth.uid()));
create policy dd_org_select on public.due_diligence_cases for select to authenticated using (public.is_org_member(organization_id));
create policy dd_org_write on public.due_diligence_cases for all to authenticated using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy dd_req_select on public.due_diligence_requirements for select to authenticated using (exists(select 1 from public.due_diligence_cases c where c.id=case_id and public.is_org_member(c.organization_id)));
create policy interests_participant_select on public.investor_interests for select to authenticated using (public.is_org_member(investor_organization_id) or exists(select 1 from public.opportunities o where o.id=opportunity_id and public.is_org_member(o.owner_organization_id)));
create policy interests_investor_insert on public.investor_interests for insert to authenticated with check (public.is_org_member(investor_organization_id) and created_by=(select auth.uid()));
create policy offers_participant_select on public.offers for select to authenticated using (exists(select 1 from public.investor_interests i where i.id=interest_id and public.is_org_member(i.investor_organization_id)) or exists(select 1 from public.investor_interests i join public.opportunities o on o.id=i.opportunity_id where i.id=interest_id and public.is_org_member(o.owner_organization_id)));
create policy deals_participant_select on public.deals for select to authenticated using (public.is_org_member(organization_id) or public.is_org_member(buyer_organization_id) or public.is_org_member(seller_organization_id));
create policy deals_ops_write on public.deals for all to authenticated using (public.has_org_role(organization_id, array['platform_admin','operations_admin','deal_manager']::public.member_role[])) with check (public.has_org_role(organization_id, array['platform_admin','operations_admin','deal_manager']::public.member_role[]));
create policy deal_participants_select on public.deal_participants for select to authenticated using (exists(select 1 from public.deals d where d.id=deal_id and (public.is_org_member(d.organization_id) or public.is_org_member(d.buyer_organization_id) or public.is_org_member(d.seller_organization_id))));
create policy deal_events_select on public.deal_events for select to authenticated using (exists(select 1 from public.deals d where d.id=deal_id and (public.is_org_member(d.organization_id) or public.is_org_member(d.buyer_organization_id) or public.is_org_member(d.seller_organization_id))));
create policy audit_org_select on public.audit_events for select to authenticated using (organization_id is null or public.has_org_role(organization_id, array['platform_admin','operations_admin','compliance_officer','risk_analyst']::public.member_role[]));

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$ begin new.updated_at=now(); return new; end $$;
create trigger organizations_touch before update on public.organizations for each row execute function public.touch_updated_at();
create trigger profiles_touch before update on public.profiles for each row execute function public.touch_updated_at();
create trigger assets_touch before update on public.assets for each row execute function public.touch_updated_at();
create trigger opportunities_touch before update on public.opportunities for each row execute function public.touch_updated_at();
create trigger interests_touch before update on public.investor_interests for each row execute function public.touch_updated_at();
create trigger deals_touch before update on public.deals for each row execute function public.touch_updated_at();

create or replace function public.handle_new_user() returns trigger language plpgsql security invoker set search_path=public as $$ begin insert into public.profiles(id,full_name) values(new.id,coalesce(new.raw_user_meta_data->>'full_name','')); return new; end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
