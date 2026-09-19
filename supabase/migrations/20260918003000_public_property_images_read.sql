-- Allow public image delivery only for images attached to published public opportunities.
-- The bucket remains private; signed URLs are still issued by the application.
-- This policy prevents unpublished/private asset images from being readable through Storage.

DROP POLICY IF EXISTS "property_images_public_read_published" ON storage.objects;

CREATE POLICY "property_images_public_read_published"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'property-images'
  AND EXISTS (
    SELECT 1
    FROM public.asset_images ai
    JOIN public.opportunities o ON o.asset_id = ai.asset_id
    WHERE ai.storage_path = name
      AND o.status = 'published'
      AND o.visibility = 'public'
  )
);
