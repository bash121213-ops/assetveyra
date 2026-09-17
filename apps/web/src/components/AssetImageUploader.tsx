'use client';

import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import { I18nText } from '@/components/LocaleShell';
import '@/lib/i18nAssetImages';

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
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('decode'));
    };
    img.src = url;
  });
}

export default function AssetImageUploader({ inputName = 'images' }: { inputName?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<PreparedImage[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [dragging, setDragging] = useState(false);

  function sync(next: PreparedImage[]) {
    if (!inputRef.current) return;
    const dt = new DataTransfer();
    next.filter((item) => !item.error).forEach((item) => dt.items.add(item.file));
    inputRef.current.files = dt.files;
  }

  async function prepareFiles(files: File[]) {
    if (!files.length || busy) return;
    const available = Math.max(0, MAX_IMAGES - images.length);
    const selected = files.slice(0, available);
    setBusy(true);
    setProgress(0);
    setMessage(files.length > available ? '20 images maximum.' : '');

    const prepared: PreparedImage[] = [];
    for (let index = 0; index < selected.length; index += 1) {
      const file = selected[index];
      try {
        const compressed = await compressImage(file);
        prepared.push({ file: compressed, preview: URL.createObjectURL(compressed), name: file.name });
      } catch {
        prepared.push({ file, preview: '', name: file.name, error: 'This image could not be prepared.' });
      } finally {
        setProgress(Math.round(((index + 1) / selected.length) * 100));
      }
    }

    const next = [...images, ...prepared];
    setImages(next);
    sync(next);
    setBusy(false);
  }

  async function onChange(event: ChangeEvent<HTMLInputElement>) {
    await prepareFiles(Array.from(event.target.files ?? []));
    event.target.value = '';
  }

  async function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    await prepareFiles(Array.from(event.dataTransfer.files ?? []));
  }

  function remove(index: number) {
    const next = images.filter((_, i) => i !== index);
    if (images[index]?.preview) URL.revokeObjectURL(images[index].preview);
    setImages(next);
    sync(next);
  }

  function move(index: number, delta: number) {
    const target = index + delta;
    if (target < 0 || target >= images.length) return;
    const next = [...images];
    [next[index], next[target]] = [next[target], next[index]];
    setImages(next);
    sync(next);
  }

  const remaining = MAX_IMAGES - images.length;

  return (
    <div className="full" style={{ display: 'grid', gap: 14 }}>
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload property images"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={(event) => {
          if (event.currentTarget === event.target) setDragging(false);
        }}
        onDrop={onDrop}
        style={{
          border: `1px dashed ${dragging ? 'var(--text)' : 'var(--border)'}`,
          borderRadius: 18,
          padding: '30px 22px',
          minHeight: 190,
          display: 'grid',
          placeItems: 'center',
          textAlign: 'center',
          background: dragging ? 'var(--surface)' : 'transparent',
          cursor: 'pointer',
          transition: 'border-color 160ms ease, background 160ms ease',
          outline: 'none',
        }}
      >
        <input
          ref={inputRef}
          name={inputName}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={onChange}
          tabIndex={-1}
          style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
        />
        <div style={{ display: 'grid', justifyItems: 'center', gap: 10, maxWidth: 620 }}>
          <div
            aria-hidden="true"
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              border: '1px solid var(--border)',
              display: 'grid',
              placeItems: 'center',
              fontSize: 25,
              background: 'var(--surface)',
            }}
          >
            +
          </div>
          <strong style={{ fontSize: 18 }}><I18nText id="Property images" /></strong>
          <div style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
            <I18nText id="Drag and drop images here, or click to choose files." />
          </div>
          <div style={{ color: 'var(--muted)', fontSize: 12 }}>
            JPEG, PNG or WebP · {remaining} {remaining === 1 ? 'slot' : 'slots'} remaining · max 10 MB per image
          </div>
        </div>
      </div>

      <small style={{ color: 'var(--muted)' }}>
        <I18nText id="Up to 20 images. The first image is the main image. Images are compressed before upload." />
      </small>

      {busy && (
        <div style={{ display: 'grid', gap: 7 }} role="status" aria-live="polite">
          <div style={{ color: 'var(--muted)', fontSize: 13 }}>
            <I18nText id="Preparing images…" /> {progress}%
          </div>
          <progress max={100} value={progress} style={{ width: '100%', height: 5 }} />
        </div>
      )}

      {message && (
        <div role="status" style={{ color: 'var(--muted)', fontSize: 13 }}>
          <I18nText id={message} />
        </div>
      )}

      {!!images.length && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 12 }}>
          {images.map((image, index) => (
            <div
              key={`${image.name}-${index}`}
              style={{
                overflow: 'hidden',
                border: '1px solid var(--border)',
                borderRadius: 16,
                background: 'var(--surface)',
              }}
            >
              {image.preview ? (
                <img
                  src={image.preview}
                  alt={image.name}
                  style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', display: 'block' }}
                />
              ) : (
                <div
                  role="alert"
                  style={{ aspectRatio: '4 / 3', display: 'grid', placeItems: 'center', color: 'var(--muted)', fontSize: 12 }}
                >
                  <I18nText id="Error" />
                </div>
              )}

              <div style={{ padding: 10, display: 'grid', gap: 7 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <strong style={{ fontSize: 11, letterSpacing: '.04em', textTransform: 'uppercase' }}>
                    {index === 0 ? <I18nText id="Main image" /> : <I18nText id="Gallery image" />}
                  </strong>
                  <span style={{ color: 'var(--muted)', fontSize: 11 }}>{index + 1}/{images.length}</span>
                </div>
                <div style={{ fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {image.name}
                </div>
                {image.error && (
                  <small role="alert" style={{ color: 'var(--muted)' }}>
                    <I18nText id={image.error} />
                  </small>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 5 }}>
                  <button type="button" className="button" disabled={index === 0} onClick={() => move(index, -1)}>
                    <I18nText id="Up" />
                  </button>
                  <button type="button" className="button" disabled={index === images.length - 1} onClick={() => move(index, 1)}>
                    <I18nText id="Down" />
                  </button>
                  <button type="button" className="button" onClick={() => remove(index)}>
                    <I18nText id="Remove" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
