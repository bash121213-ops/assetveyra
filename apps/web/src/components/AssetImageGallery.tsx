'use client';

import { useState } from 'react';
import { I18nText } from '@/components/LocaleShell';
import '@/lib/i18nAssetImages';
import { deleteAssetImage, reorderAssetImages } from '@/app/workspace/assets/actions';

type Image = { id: string; storage_path: string; signed_url: string; sort_order: number };

export default function AssetImageGallery({ assetId, initialImages }: { assetId: string; initialImages: Image[] }) {
  const [images, setImages] = useState(initialImages);
  const [busy, setBusy] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  async function move(from: number, to: number) {
    if (from === to || to < 0 || to >= images.length) return;
    const next = [...images];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    const normalized = next.map((image, index) => ({ ...image, sort_order: index }));
    setImages(normalized);
    setBusy(true);
    try {
      await reorderAssetImages(assetId, normalized.map((image) => ({ id: image.id, sort_order: image.sort_order })));
    } catch {
      setImages(images);
    } finally {
      setBusy(false);
    }
  }

  async function remove(image: Image) {
    if (!window.confirm('Remove this image?')) return;
    setBusy(true);
    try {
      await deleteAssetImage(image.id);
      const next = images.filter((item) => item.id !== image.id).map((item, index) => ({ ...item, sort_order: index }));
      setImages(next);
      if (next.length) await reorderAssetImages(assetId, next.map((item) => ({ id: item.id, sort_order: item.sort_order })));
    } finally {
      setBusy(false);
    }
  }

  if (!images.length) return <div className="empty-state"><strong><I18nText id="No property images yet." /></strong><span><I18nText id="Upload images from the asset submission form." /></span></div>;

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {busy && <small style={{ color: 'var(--muted)' }}><I18nText id="Saving image changes…" /></small>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: 12 }}>
        {images.map((image, index) => (
          <article key={image.id} draggable={!busy} onDragStart={() => setDragIndex(index)} onDragOver={(event) => event.preventDefault()} onDrop={() => { if (dragIndex !== null) void move(dragIndex, index); setDragIndex(null); }} style={{ border: '1px solid var(--border)', borderRadius: 14, padding: 7, background: 'var(--surface)', cursor: busy ? 'default' : 'grab' }}>
            <img src={image.signed_url} alt="" style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: 10 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center', marginTop: 7 }}>
              <small>{index === 0 ? <I18nText id="Main image" /> : `#${index + 1}`}</small>
              <button type="button" className="button" disabled={busy} onClick={() => void remove(image)}><I18nText id="Delete" /></button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
