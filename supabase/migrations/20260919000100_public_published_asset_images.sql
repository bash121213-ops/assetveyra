-- Public image surface for published opportunities.
-- Keeps the base asset_images table private while exposing only image metadata
-- for opportunities that are already published and public.
create or replace view public.published_asset_images as
select ai.id, ai.asset_id, ai.storage_path, ai.sort_order
from public.asset_images ai
join public.opportunities o on o.asset_id = ai.asset_id
where o.status = 'published'
  and o.visibility = 'public';

alter view public.published_asset_images set (security_invoker = false);
grant select on public.published_asset_images to anon, authenticated;

drop policy if exists "asset_images_public_select_published" on public.asset_images;

create or replace function private.is_published_property_image_path(p_path text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.published_asset_images
    where storage_path = p_path
  );
$$;

grant usage on schema private to anon, authenticated;
revoke execute on function private.is_published_property_image_path(text) from public, anon, authenticated;
grant execute on function private.is_published_property_image_path(text) to anon, authenticated;

drop policy if exists "property_images_public_read_published" on storage.objects;
drop policy if exists "property_images_public_select_published" on storage.objects;

create policy "property_images_public_select_published"
on storage.objects
for select
to public
using (
  bucket_id = 'property-images'
  and (select private.is_published_property_image_path(name))
);
