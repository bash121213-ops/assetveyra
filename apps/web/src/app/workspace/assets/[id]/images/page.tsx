import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { I18nText } from '@/components/LocaleShell';
import AssetImageUploader from '@/components/AssetImageUploaderV2';
import AssetImageGallery from '@/components/AssetImageGallery';
import { uploadAssetImages } from '@/app/workspace/assets/actions';

export default async function AssetImagesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) redirect('/login');

  const { data: asset } = await s.from('assets').select('id,title,organization_id').eq('id', id).maybeSingle();
  if (!asset) redirect('/workspace/assets');
  const { data: membership } = await s.from('organization_members').select('id').eq('organization_id', asset.organization_id).eq('user_id', user.id).maybeSingle();
  if (!membership) redirect('/workspace/assets');

  async function upload(formData: FormData) {
    'use server';
    const result = await uploadAssetImages(id, formData);
    if (!result.uploaded && result.failed.length) redirect(`/workspace/assets/${id}/images?error=upload_failed`);
    redirect(`/workspace/assets/${id}/images?saved=1`);
  }

  const { data: images } = await s.from('asset_images').select('id,storage_path,sort_order').eq('asset_id', id).order('sort_order', { ascending: true });
  const initialImages = [];
  for (const image of images ?? []) {
    const { data: signed } = await s.storage.from('property-images').createSignedUrl(image.storage_path, 3600);
    if (signed?.signedUrl) initialImages.push({ ...image, signed_url: signed.signedUrl });
  }

  return <main className="app-shell">
    <header className="app-header"><a className="brand" href="/">ASSETVEYRA</a><nav><a href="/workspace"><I18nText id="Workspace" /></a><a href="/opportunities"><I18nText id="Marketplace" /></a><a href="/workspace/assets"><I18nText id="My Assets" /></a></nav></header>
    <section className="form-page">
      <div className="eyebrow"><I18nText id="ASSET MEDIA" /></div>
      <h1>{asset.title}</h1>
      <p><I18nText id="Add and manage the real property photos used for this asset. The first image is the main image." /></p>
      <form action={upload} className="form-grid" encType="multipart/form-data"><AssetImageUploader /><div className="full"><button className="button primary"><I18nText id="Save images" /></button></div></form>
      <section style={{ marginTop: 40, display: 'grid', gap: 12 }}><div className="eyebrow"><I18nText id="CURRENT IMAGES" /></div><AssetImageGallery assetId={id} initialImages={initialImages} /></section>
    </section>
  </main>;
}
