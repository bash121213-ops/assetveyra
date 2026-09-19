-- Public opportunity image access: allow metadata reads only for published public opportunities.
-- The storage bucket remains private; its existing public-published object policy controls signed URL creation/downloads.
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
