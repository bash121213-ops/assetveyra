'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { I18nText } from '@/components/LocaleShell';

const MAX_IMAGES = 20;
const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPTED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

type PreparedImage = { file: File; preview: string; name: string; error?: string };

export default function AssetImageUploaderV2({ inputName = 'images' }: { inputName?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<PreparedImage[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  function syncFiles(next: PreparedImage[]) {
    if (!inputRef.current) return;
    const dt = new DataTransfer();
    next.filter((item) => !item.error).forEach((item) => dt.items.add(item.file));
    inputRef.current.files = dt.files;
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;
    const available = MAX_IMAGES - images.length;
    const selected = files.slice(0, Math.max(0, available));
    setBusy(true);
    setMessage(files.length > available ? '20 images maximum.' : '');
    const prepared = selected.map((file) => {
      if (!ACCEPTED_TYPES.has(file.type)) return { file, preview: '', name: file.name, error: 'Unsupported image format. Use JPG, PNG, or WebP.' };
      if (file.size > MAX_BYTES) return { file, preview: '', name: file.name, error: 'Image must be 10 MB or smaller.' };
      return { file, preview: URL.createObjectURL(file), name: file.name };
    });
    const next = [...images, ...prepared];
    setImages(next);
    syncFiles(next);
    setBusy(false);
    event.target.value = '';
  }

  function remove(index: number) {
    const removed = images[index];
    if (removed?.preview) URL.revokeObjectURL(removed.preview);
    const next = images.filter((_, i) => i !== index);
    setImages(next);
    syncFiles(next);
  }

  return (
    <div className="full asset-image-uploader" style={{ display: 'grid', gap: 14 }}>
      <div style={{ display: 'grid', gap: 6 }}>
        <strong style={{ color: 'var(--av-green)', fontSize: 15 }}><I18nText id="Property images" /></strong>
        <span style={{ color: 'var(--av-muted)', fontSize: 13 }}><I18nText id="Add up to 20 photos of the property. The first photo will be the main image." /></span>
      </div>
      <button type="button" className="button primary" onClick={() => inputRef.current?.click()} disabled={busy} style={{ width: '100%', minHeight: 54 }}>
        {busy ? <I18nText id="Preparing images…" /> : <I18nText id={images.length ? 'Add more photos' : 'Add photos'} />}
      </button>
      <input ref={inputRef} name={inputName} type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={onChange} style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }} tabIndex={-1} aria-hidden="true" />
      {message && <div role="status" className="form-error"><I18nText id={message} /></div>}
      {!!images.length && <div style={{ display: 'grid', gap: 10 }}>
        <div style={{ color: 'var(--av-muted)', fontSize: 12 }}><I18nText id={`${images.length} of 20 photos selected`} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(120px,1fr))', gap: 10 }}>
          {images.map((image, index) => <div key={`${image.name}-${index}`} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: 6, background: 'var(--surface)', position: 'relative' }}>
            {image.preview ? <img src={image.preview} alt={image.name} style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 6, display: 'block' }} /> : <div role="alert" style={{ aspectRatio: '1 / 1', display: 'grid', placeItems: 'center', color: 'var(--muted)', fontSize: 12 }}><I18nText id="Error" /></div>}
            {index === 0 && !image.error && <div style={{ marginTop: 5, color: 'var(--av-bronze)', fontSize: 11, fontWeight: 700 }}><I18nText id="Main image" /></div>}
            <div style={{ fontSize: 11, marginTop: 5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{image.name}</div>
            {image.error && <small role="alert" style={{ display: 'block', marginTop: 4, color: 'var(--muted)' }}><I18nText id={image.error} /></small>}
            <button type="button" className="button" style={{ marginTop: 6, width: '100%', minHeight: 38, padding: '8px 10px' }} onClick={() => remove(index)}><I18nText id="Remove" /></button>
          </div>)}
        </div>
      </div>}
    </div>
  );
}
