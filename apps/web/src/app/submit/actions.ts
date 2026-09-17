'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

const SELLER_ROLES = ['seller_admin', 'seller_member', 'platform_admin', 'operations_admin'] as const;
const MAX_IMAGES = 20;
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

type ImageUploadRequest = {
  name: string;
  type: string;
  size: number;
};

type ImageUploadGrant = {
  name: string;
  type: string;
  size: number;
  path: string;
  token: string;
};

async function getSellerMembership() {
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) return { s, user: null, membership: null };
  const { data: memberships } = await s
    .from('organization_members')
    .select('organization_id,role')
    .eq('user_id', user.id);
  const membership = (memberships ?? []).find((m) => SELLER_ROLES.includes(m.role as typeof SELLER_ROLES[number]));
  return { s, user, membership };
}

export async function createAssetSubmission(formData: FormData) {
  const { s, user, membership } = await getSellerMembership();
  if (!user) redirect('/login');
  if (!membership) redirect('/workspace?error=seller_access_required');

  const title = String(formData.get('title') || '').trim();
  const type = String(formData.get('asset_type') || 'land');
  const country = String(formData.get('country_code') || '').toUpperCase();
  const city = String(formData.get('city') || '').trim();
  const area = Number(formData.get('area_sqm') || 0);
  const price = Number(formData.get('asking_price') || 0);
  const summary = String(formData.get('public_summary') || '').trim();

  if (!title || country.length !== 2 || !Number.isFinite(area) || area < 0 || !Number.isFinite(price) || price < 0 || summary.length > 4000) {
    throw new Error('invalid_input');
  }

  const { data: asset, error: assetError } = await s.from('assets').insert({
    organization_id: membership.organization_id,
    asset_type: type,
    title,
    country_code: country,
    city,
    area_sqm: area || null,
    asking_price: price || null,
    currency: String(formData.get('currency') || 'USD').toUpperCase(),
    public_summary: summary,
    created_by: user.id,
    status: 'submitted',
  }).select('id').single();
  if (assetError) throw new Error(assetError.message);

  const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${asset.id.slice(0, 8)}`;
  const { data: opportunity, error: opportunityError } = await s.from('opportunities').insert({
    asset_id: asset.id,
    owner_organization_id: membership.organization_id,
    slug,
    status: 'submitted',
    visibility: 'private',
    investment_thesis: summary,
  }).select('id').single();
  if (opportunityError) throw new Error(opportunityError.message);

  const { error: verificationError } = await s.from('verification_cases').insert({
    organization_id: membership.organization_id,
    asset_id: asset.id,
    opportunity_id: opportunity.id,
    category: 'asset_intake',
    status: 'open',
  });
  if (verificationError) throw new Error(verificationError.message);

  const { error: eventError } = await s.from('workflow_events').insert({
    organization_id: membership.organization_id,
    actor_id: user.id,
    event_type: 'opportunity.submitted',
    entity_type: 'opportunity',
    entity_id: opportunity.id,
    payload: { asset_id: asset.id },
  });
  if (eventError) throw new Error(eventError.message);

  return { assetId: asset.id };
}

async function getAuthorizedAsset(assetId: string) {
  const { s, user, membership } = await getSellerMembership();
  if (!user || !membership) throw new Error('not_authorized');
  const { data: asset } = await s.from('assets').select('id,organization_id').eq('id', assetId).single();
  if (!asset || asset.organization_id !== membership.organization_id) throw new Error('not_authorized');
  return { s, user, membership, asset };
}

export async function prepareAssetImageUploads(assetId: string, requests: ImageUploadRequest[]) {
  const { s, asset } = await getAuthorizedAsset(assetId);
  if (!Array.isArray(requests) || requests.length > MAX_IMAGES) throw new Error('image_limit');

  const { count } = await s.from('asset_images').select('id', { count: 'exact', head: true }).eq('asset_id', assetId);
  const existing = count ?? 0;
  if (existing + requests.length > MAX_IMAGES) throw new Error('image_limit');

  const grants: ImageUploadGrant[] = [];
  for (const request of requests) {
    if (!request || typeof request.name !== 'string' || !ALLOWED_TYPES.has(request.type) || !Number.isInteger(request.size) || request.size <= 0 || request.size > MAX_IMAGE_BYTES) {
      throw new Error('invalid_image');
    }
    const id = crypto.randomUUID();
    const path = `org/${asset.organization_id}/asset/${asset.id}/${id}.webp`;
    const { data, error } = await s.storage.from('property-images').createSignedUploadUrl(path, { upsert: false });
    if (error || !data) throw new Error(error?.message || 'image_upload_authorization_failed');
    grants.push({ name: request.name, type: request.type, size: request.size, path, token: data.token });
  }
  return { grants };
}

export async function finalizeAssetImageUploads(assetId: string, rows: Array<{ path: string; name: string; type: string; size: number }>) {
  const { s, user, asset } = await getAuthorizedAsset(assetId);
  if (!Array.isArray(rows) || rows.length > MAX_IMAGES) throw new Error('image_limit');
  const { count } = await s.from('asset_images').select('id', { count: 'exact', head: true }).eq('asset_id', assetId);
  const existing = count ?? 0;
  if (existing + rows.length > MAX_IMAGES) throw new Error('image_limit');

  const expectedPrefix = `org/${asset.organization_id}/asset/${asset.id}/`;
  const normalized = rows.map((row) => ({
    ...row,
    path: String(row.path),
    name: String(row.name),
    type: String(row.type),
    size: Number(row.size),
  }));
  if (normalized.some((row) => !row.path.startsWith(expectedPrefix) || !ALLOWED_TYPES.has(row.type) || !Number.isInteger(row.size) || row.size <= 0 || row.size > MAX_IMAGE_BYTES)) {
    throw new Error('invalid_image');
  }

  const insertRows = normalized.map((row, index) => ({
    asset_id: asset.id,
    organization_id: asset.organization_id,
    storage_path: row.path,
    image_url: null,
    sort_order: existing + index,
    mime_type: row.type,
    size_bytes: row.size,
    created_by: user.id,
  }));
  if (insertRows.length) {
    const { error } = await s.from('asset_images').insert(insertRows);
    if (error) {
      await s.storage.from('property-images').remove(normalized.map((row) => row.path));
      throw new Error(error.message);
    }
  }
  return { uploaded: insertRows.length };
}
