'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

const MAX_IMAGES = 20;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

async function getMembership(s: Awaited<ReturnType<typeof createClient>>, assetId: string) {
  const { data: { user } } = await s.auth.getUser();
  if (!user) return null;
  const { data: asset } = await s.from('assets').select('id,organization_id').eq('id', assetId).single();
  if (!asset) return null;
  const { data: member } = await s.from('organization_members').select('organization_id,role').eq('organization_id', asset.organization_id).eq('user_id', user.id).maybeSingle();
  if (!member) return null;
  return { user, asset, member };
}

export async function uploadAssetImages(assetId: string, formData: FormData) {
  const s = await createClient();
  const access = await getMembership(s, assetId);
  if (!access) throw new Error('not_authorized');
  const { user, asset } = access;
  const { count } = await s.from('asset_images').select('id', { count: 'exact', head: true }).eq('asset_id', assetId);
  const existing = count ?? 0;
  const files = formData.getAll('images').filter((v): v is File => v instanceof File && v.size > 0);
  if (existing + files.length > MAX_IMAGES) throw new Error('image_limit');

  const errors: string[] = [];
  const rows: Array<Record<string, unknown>> = [];
  for (const file of files) {
    if (!ALLOWED_TYPES.has(file.type) || file.size > 10 * 1024 * 1024) {
      errors.push(file.name);
      continue;
    }
    const id = crypto.randomUUID();
    const path = `org/${asset.organization_id}/asset/${asset.id}/${id}.webp`;
    const { error: uploadError } = await s.storage.from('property-images').upload(path, file, { contentType: file.type, upsert: false });
    if (uploadError) { errors.push(file.name); continue; }
    rows.push({ asset_id: asset.id, organization_id: asset.organization_id, storage_path: path, image_url: null, sort_order: existing + rows.length, mime_type: file.type, size_bytes: file.size, created_by: user.id });
  }
  if (rows.length) {
    const { error } = await s.from('asset_images').insert(rows);
    if (error) {
      await s.storage.from('property-images').remove(rows.map((row) => String(row.storage_path)));
      throw new Error(error.message);
    }
  }
  revalidatePath(`/workspace/assets/${assetId}`);
  revalidatePath('/workspace/assets');
  return { uploaded: rows.length, failed: errors };
}

export async function deleteAssetImage(imageId: string) {
  const s = await createClient();
  const { data: image } = await s.from('asset_images').select('id,asset_id,organization_id,storage_path').eq('id', imageId).single();
  if (!image) throw new Error('image_not_found');
  const access = await getMembership(s, image.asset_id);
  if (!access) throw new Error('not_authorized');
  const { error: storageError } = await s.storage.from('property-images').remove([image.storage_path]);
  if (storageError) throw new Error(storageError.message);
  const { error } = await s.from('asset_images').delete().eq('id', imageId);
  if (error) throw new Error(error.message);
  revalidatePath(`/workspace/assets/${image.asset_id}`);
  revalidatePath('/workspace/assets');
}

export async function reorderAssetImages(assetId: string, items: Array<{ id: string; sort_order: number }>) {
  const s = await createClient();
  const access = await getMembership(s, assetId);
  if (!access) throw new Error('not_authorized');
  if (items.length > MAX_IMAGES) throw new Error('image_limit');
  const { error } = await s.rpc('reorder_asset_images', { p_asset_id: assetId, p_items: items });
  if (error) throw new Error(error.message);
  revalidatePath(`/workspace/assets/${assetId}`);
  revalidatePath('/workspace/assets');
}
