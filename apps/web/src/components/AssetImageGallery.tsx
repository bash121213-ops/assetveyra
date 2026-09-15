'use client';

import { useState } from 'react';
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useDraggable, useDroppable, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { I18nText } from '@/components/LocaleShell';
import { normalizeLocale, translate } from '@/lib/i18n';
import '@/lib/i18nAssetImages';
import { deleteAssetImage, reorderAssetImages } from '@/app/workspace/assets/actions';

type Image = { id: string; storage_path: string; signed_url: string; sort_order: number };

function ImageCard({ image, index, disabled, onRemove }: { image: Image; index: number; disabled: boolean; onRemove: (image: Image) => void }) {
  const { attributes, listeners, setNodeRef: setDraggableNodeRef, transform, isDragging } = useDraggable({ id: image.id, disabled });
  const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({ id: image.id, disabled });
  const setNodeRef = (node: HTMLElement | null) => {
    setDraggableNodeRef(node);
    setDroppableNodeRef(node);
  };
  const transformStyle = transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined;

  return (
    <article
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        border: isOver ? '2px solid var(--accent)' : '1px solid var(--border)',
        borderRadius: 14,
        padding: 7,
        background: 'var(--surface)',
        cursor: disabled ? 'default' : 'grab',
        opacity: isDragging ? 0.55 : 1,
        transform: transformStyle,
        touchAction: 'none',
      }}
    >
      <img src={image.signed_url} alt="" style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: 10 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center', marginTop: 7 }}>
        <small>{index === 0 ? <I18nText id="Main image" /> : `#${index + 1}`}</small>
        <button type="button" className="button" disabled={disabled} onPointerDown={(event) => event.stopPropagation()} onClick={() => onRemove(image)}><I18nText id="Delete" /></button>
      </div>
    </article>
  );
}

export default function AssetImageGallery({ assetId, initialImages }: { assetId: string; initialImages: Image[] }) {
  const [images, setImages] = useState(initialImages);
  const [busy, setBusy] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }), useSensor(KeyboardSensor));

  async function move(from: number, to: number) {
    if (from === to || to < 0 || to >= images.length) return;
    const previous = images;
    const next = [...images];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    const normalized = next.map((image, index) => ({ ...image, sort_order: index }));
    setImages(normalized);
    setBusy(true);
    try {
      await reorderAssetImages(assetId, normalized.map((image) => ({ id: image.id, sort_order: image.sort_order })));
    } catch {
      setImages(previous);
    } finally {
      setBusy(false);
    }
  }

  async function handleDragEnd(event: DragEndEvent) {
    if (!event.over || event.active.id === event.over.id) return;
    const from = images.findIndex((image) => image.id === event.active.id);
    const to = images.findIndex((image) => image.id === event.over?.id);
    if (from !== -1 && to !== -1) await move(from, to);
  }

  async function remove(image: Image) {
    const locale = normalizeLocale(document.documentElement.lang);
    if (!window.confirm(translate('Remove this image?', locale))) return;
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
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(event) => void handleDragEnd(event)}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: 12 }}>
          {images.map((image, index) => <ImageCard key={image.id} image={image} index={index} disabled={busy} onRemove={remove} />)}
        </div>
      </DndContext>
    </div>
  );
}
