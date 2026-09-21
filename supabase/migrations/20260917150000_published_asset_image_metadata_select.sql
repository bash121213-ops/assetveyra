create policy asset_images_public_select_published
on public.asset_images
for select
to public
using (
  exists (
    select 1
    from public.opportunities o
    where o.asset_id = asset_images.asset_id
      and o.status = 'published'::public.opportunity_status
      and o.visibility = 'public'
  )
);
