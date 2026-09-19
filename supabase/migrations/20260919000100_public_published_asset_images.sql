-- Reconcile and document the public metadata policy already required for published opportunity images.
drop policy if exists "asset_images_public_select_published" on public.asset_images;

create policy "asset_images_public_select_published"
on public.asset_images
for select
to public
using (
  exists (
    select 1
    from public.opportunities o
    where o.asset_id = asset_images.asset_id
      and o.status = 'published'
      and o.visibility = 'public'
  )
);
