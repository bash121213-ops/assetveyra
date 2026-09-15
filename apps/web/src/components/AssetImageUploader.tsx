'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { I18nText } from '@/components/LocaleShell';

const MAX_IMAGES = 20;
const MAX_DIMENSION = 2000;
const MAX_BYTES = 10 * 1024 * 1024;

type PreparedImage = { file: File; preview: string; name: string; error?: string };

function compressImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) return reject(new Error('unsupported'));
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, MAX_DIMENSION / Math.max(img.naturalWidth, img.naturalHeight));
      const width = Math.max(1, Math.round(img.naturalWidth * scale));
      const height = Math.max(1, Math.round(img.naturalHeight * scale));
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('canvas'));
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error('compression'));
        const base = file.name.replace(/\.[^.]+$/, '') || 'property-image';
        const out = new File([blob], `${base}.webp`, { type: 'image/webp', lastModified: Date.now() });
        if (out.size > MAX_BYTES) return reject(new Error('size'));
        resolve(out);
      }, 'image/webp', 0.82);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('decode')); };
    img.src = url;
  });
}

export default function AssetImageUploader({ inputName = 'images' }: { inputName?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<PreparedImage[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  async function onChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;
    const available = Math.max(0, MAX_IMAGES - images.length);
    const selected = files.slice(0, available);
    setBusy(true);
    setMessage(files.length > available ? '20 images maximum.' : '');
    const prepared: PreparedImage[] = [];
    for (const file of selected) {
      try {
        const compressed = await compressImage(file);
        prepared.push({ file: compressed, preview: URL.createObjectURL(compressed), name: file.name });
      } catch {
        prepared.push({ file, preview: '', name: file.name, error: 'This image could not be prepared.' });
      }
    }
    const next = [...images, ...prepared];
    setImages(next);
    if (inputRef.current) {
      const dt = new DataTransfer();
      next.filter((item) => !item.error).forEach((item) => dt.items.add(item.file));
      inputRef.current.files = dt.files;
    }
    setBusy(false);
  }

  function remove(index: number) {
    const next = images.filter((_, i) => i !== index);
    const removed = images[index];
    if (removed?.preview) URL.revokeObjectURL(removed.preview);
    setImages(next);
    if (inputRef.current) {
      const dt = new DataTransfer();
      next.filter((item) => !item.error).forEach((item) => dt.items.add(item.file));
      inputRef.current.files = dt.files;
    }
  }

  return (
    <div className="full" style={{ display: 'grid', gap: 10 }}>
      <label>
        <I18nText id="Property images" />
        <input ref={inputRef} name={inputName} type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={onChange} />
      </label>
      <small style={{ color: 'var(--muted)' }}><I18nText id="Up to 20 images. Images are compressed before upload." /></small>
      {busy && <div style={{ color: 'var(--muted)' }}><I18nText id="Preparing images…" /></div>}
      {message && <div role="status" style={{ color: 'var(--muted)' }}>{message}</div>}
      {!!images.length && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(120px,1fr))', gap: 10 }}>
          {images.map((image, index) => (
            <div key={`${image.name}-${index}`} style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 6, background: 'var(--surface)' }}>
              {image.preview ? <img src={image.preview} alt={image.name} style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 8 }} /> : <div style={{ aspectRatio: '1 / 1', display: 'grid', placeItems: 'center', color: 'var(--muted)', fontSize: 12 }}>Error</div>}
              <div style={{ fontSize: 11, marginTop: 5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{image.name}</div>
              <button type="button" className="button" style={{ marginTop: 6, width: '100%' }} onClick={() => remove(index)}><I18nText id="Remove" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
