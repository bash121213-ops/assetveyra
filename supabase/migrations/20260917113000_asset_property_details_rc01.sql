alter table public.assets
  add column property_details jsonb not null default '{}'::jsonb;
