'use server';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

const MAX_IMAGES = 20;
const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MANAGE_ROLES = new Set(['seller_admin', 'seller_member', 'platform_admin', 'operations_admin']);

async function getMembership(s: Awaited<ReturnType<typeof createClient>>, assetId: string) {
  const { data: { user } } = await s.auth.getUser();
  if (!user) return null;
  const { data: asset } = await s.from('assets').select('id,organization_id,status').eq('id', assetId).single();
  if (!asset) return null;
  const { data: member } = await s.from('organization_members').select('organization_id,role').eq('organization_id', asset.organization_id).eq('user_id', user.id).maybeSingle();
  if (!member || !MANAGE_ROLES.has(member.role)) return null;
  return { user, asset, member };
}

async function validImage(file: File) {
  if (!ALLOWED.has(file.type) || file.size <= 0 || file.size > MAX_BYTES) return false;
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  if (file.type === 'image/jpeg') return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (file.type === 'image/png') return bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  if (file.type === 'image/webp') return bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 && bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50;
  return false;
}

export async function uploadAssetImages(assetId: string, formData: FormData) {
  const s = await createClient();
  const access = await getMembership(s, assetId);
  if (!access) throw new Error('not_authorized');
  const { user, asset } = access;
  const { count, error: countError } = await s.from('asset_images').select('id', { count: 'exact', head: true }).eq('asset_id', assetId);
  if (countError) throw new Error('image_record_failed');
  const existing = count ?? 0;
  const files = formData.getAll('images').filter((v): v is File => v instanceof File && v.size > 0);
  if (existing + files.length > MAX_IMAGES) throw new Error('image_limit');
  if (!files.length) return { uploaded: 0, failed: [] as string[], storagePaths: [] as string[] };

  const uploaded: string[] = [];
  const rows: Array<Record<string, unknown>> = [];
  try {
    for (const file of files) {
      if (!(await validImage(file))) throw new Error('invalid_image');
      const id = crypto.randomUUID();
      const ext = file.type === 'image/jpeg' ? 'jpg' : file.type === 'image/png' ? 'png' : 'webp';
      const path = `org/${asset.organization_id}/asset/${asset.id}/${id}.${ext}`;
      const { error } = await s.storage.from('property-images').upload(path, file, { contentType: file.type, upsert: false });
      if (error) throw new Error('image_upload_failed');
      uploaded.push(path);
      rows.push({ asset_id: asset.id, organization_id: asset.organization_id, storage_path: path, image_url: null, sort_order: existing + rows.length, mime_type: file.type, size_bytes: file.size, created_by: user.id });
    }
    const { error: insertError } = await s.from('asset_images').insert(rows);
    if (insertError) throw new Error('image_record_failed');
  } catch (error) {
    if (uploaded.length) await s.storage.from('property-images').remove(uploaded);
    throw error;
  }

  revalidatePath(`/workspace/assets/${assetId}`);
  revalidatePath('/workspace/assets');
  revalidatePath('/opportunities');
  return { uploaded: rows.length, failed: [] as string[], storagePaths: uploaded };
}

export async function cleanupAssetImages(assetId: string) {
  const s = await createClient();
  const access = await getMembership(s, assetId);
  if (!access) throw new Error('not_authorized');
  const { data: images, error } = await s.from('asset_images').select('storage_path').eq('asset_id', assetId);
  if (error) throw new Error('image_record_failed');
  const paths = (images ?? []).map(image => image.storage_path).filter(Boolean);
  if (paths.length) {
    const { error: storageError } = await s.storage.from('property-images').remove(paths);
    if (storageError) throw new Error('image_cleanup_failed');
  }
  if (images?.length) {
    const { error: deleteError } = await s.from('asset_images').delete().eq('asset_id', assetId);
    if (deleteError) throw new Error('image_record_failed');
  }
}

export async function deleteAssetImage(imageId: string) {
  const s = await createClient();
  const { data: image } = await s.from('asset_images').select('id,asset_id,organization_id,storage_path').eq('id', imageId).single();
  if (!image) throw new Error('image_not_found');
  const access = await getMembership(s, image.asset_id);
  if (!access) throw new Error('not_authorized');
  const { error: storageError } = await s.storage.from('property-images').remove([image.storage_path]);
  if (storageError) throw new Error('image_delete_failed');
  const { error } = await s.from('asset_images').delete().eq('id', imageId).eq('organization_id', image.organization_id);
  if (error) throw new Error('image_record_failed');
  revalidatePath(`/workspace/assets/${image.asset_id}`);
  revalidatePath('/workspace/assets');
  revalidatePath('/opportunities');
}

export async function reorderAssetImages(assetId: string, items: Array<{ id: string; sort_order: number }>) {
  const s = await createClient();
  const access = await getMembership(s, assetId);
  if (!access) throw new Error('not_authorized');
  if (items.length > MAX_IMAGES) throw new Error('image_limit');
  const normalized = items.map(item => item.sort_order).sort((a, b) => a - b);
  if (normalized.some((value, index) => value !== index)) throw new Error('invalid_image_order');
  const ids = items.map(item => item.id);
  const { data: owned, error: ownedError } = await s.from('asset_images').select('id').eq('asset_id', assetId).in('id', ids);
  if (ownedError || (owned ?? []).length !== ids.length) throw new Error('not_authorized');
  const { error } = await s.rpc('reorder_asset_images', { p_asset_id: assetId, p_items: items });
  if (error) throw new Error('image_reorder_failed');
  revalidatePath(`/workspace/assets/${assetId}`);
  revalidatePath('/workspace/assets');
  revalidatePath('/opportunities');
}
