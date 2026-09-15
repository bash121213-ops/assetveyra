import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { I18nText } from '@/components/LocaleShell';
import '@/lib/i18nAssetImages';
import AssetImageGallery from '@/components/AssetImageGallery';
import AssetImageUploader from '@/components/AssetImageUploader';
import { uploadAssetImages } from '@/app/workspace/assets/actions';

export default async function AssetImageManagementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) redirect('/login');
  const { data: asset } = await s.from('assets').select('id,organization_id,title,asset_type,status,city,country_code').eq('id', id).single();
  if (!asset) notFound();
  const assetId = asset.id;
  const { data: membership } = await s.from('organization_members').select('role').eq('organization_id', asset.organization_id).eq('user_id', user.id).maybeSingle();
  if (!membership) redirect('/workspace/assets');
  const { data: images } = await s.from('asset_images').select('id,storage_path,sort_order').eq('asset_id', assetId).order('sort_order', { ascending: true });
  const withUrls = await Promise.all((images ?? []).map(async (image) => {
    const { data } = await s.storage.from('property-images').createSignedUrl(image.storage_path, 60 * 60);
    return { ...image, signed_url: data?.signedUrl ?? '' };
  }));
  async function handleUpload(formData: FormData) { 'use server'; await uploadAssetImages(assetId, formData); }
  return (
    <main className="app-shell">
      <header className="app-header">
        <a className="brand" href="/">ASSETVEYRA</a>
        <nav><a href="/workspace/assets"><I18nText id="Assets" /></a><a href="/opportunities"><I18nText id="Marketplace" /></a></nav>
      </header>
      <section className="page-head">
        <div className="eyebrow"><I18nText id="ASSET MEDIA" /></div>
        <h1>{asset.title}</h1>
        <p><I18nText id="Manage property images. The first image is the marketplace thumbnail." /></p>
      </section>
      <section className="panel" style={{ display: 'grid', gap: 20 }}>
        <div>
          <h2><I18nText id="Upload images" /></h2>
          <p style={{ color: 'var(--muted)' }}><I18nText id="Images are compressed in the browser before they are stored securely." /></p>
          <form action={handleUpload} className="form-grid" encType="multipart/form-data">
            <AssetImageUploader />
            <div className="full"><button className="button primary"><I18nText id="Upload images" /></button></div>
          </form>
        </div>
        <div>
          <h2><I18nText id="Image order" /></h2>
          <p style={{ color: 'var(--muted)' }}><I18nText id="Drag an image to change its order. The first image becomes the marketplace thumbnail." /></p>
          <AssetImageGallery assetId={assetId} initialImages={withUrls} />
        </div>
      </section>
    </main>
  );
}
