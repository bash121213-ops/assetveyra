import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AssetImageUploader from '@/components/AssetImageUploaderV2';
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
    await uploadAssetImages(id, formData);
    redirect(`/workspace/assets/${id}/images?saved=1`);
  }

  const { data: images } = await s.from('asset_images').select('id,storage_path,sort_order').eq('asset_id', id).order('sort_order', { ascending: true });

  return <main className="app-shell"><header className="app-header"><a className="brand" href="/">ASSETVEYRA</a><nav><a href="/workspace">Workspace</a><a href="/opportunities">Marketplace</a><a href="/workspace/assets">My Assets</a></nav></header><section className="form-page"><div className="eyebrow">ASSET MEDIA</div><h1>{asset.title}</h1><p>Add and manage the real property photos used for this asset. The first image is treated as the main image.</p><form action={upload} className="form-grid" encType="multipart/form-data"><AssetImageUploader/><div className="full"><button className="button primary">Save images</button></div></form><div style={{ marginTop: 35, color: 'var(--av-muted)', fontSize: 13 }}>{images?.length ?? 0} image{(images?.length ?? 0) === 1 ? '' : 's'} currently stored.</div></section></main>;
}
