create policy property_images_public_select_published
on storage.objects
for select
to public
using (
  bucket_id = 'property-images'
  and exists (
    select 1
    from public.asset_images ai
    join public.opportunities o on o.asset_id = ai.asset_id
    where ai.storage_path = objects.name
      and o.status = 'published'::public.opportunity_status
      and o.visibility = 'public'
  )
);
