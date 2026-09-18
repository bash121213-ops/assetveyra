'use client';

import { useEffect, useRef, useState } from 'react';
import { I18nText } from '@/components/LocaleShell';

type Image = { id: string; signed_url: string; sort_order: number; alt?: string | null };

export default function PublicAssetGallery({ images }: { images: Image[] }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const validImages = images.filter((image) => image.signed_url);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(false);
      if (event.key === 'ArrowRight') setActive((value) => (value + 1) % validImages.length);
      if (event.key === 'ArrowLeft') setActive((value) => (value - 1 + validImages.length) % validImages.length);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      triggerRef.current?.focus();
    };
  }, [lightbox, validImages.length]);

  if (!validImages.length) {
    return (
      <section className="public-gallery empty-state" aria-label="Property gallery">
        <strong><I18nText id="Property gallery" /></strong>
        <span><I18nText id="No property images are available for this opportunity." /></span>
      </section>
    );
  }

  const current = validImages[Math.min(active, validImages.length - 1)];

  const openLightbox = (button?: HTMLButtonElement | null) => {
    triggerRef.current = button ?? null;
    setZoomed(false);
    setLightbox(true);
  };

  const move = (delta: number) => {
    setZoomed(false);
    setActive((value) => (value + delta + validImages.length) % validImages.length);
  };

  return (
    <>
      <section className="public-gallery" aria-label="Property gallery">
        <div
          className="public-gallery-main"
          onClick={(event) => openLightbox(event.currentTarget.querySelector('button') as HTMLButtonElement | null)}
        >
          <img
            src={current.signed_url}
            alt={current.alt || ''}
            fetchPriority="high"
          />
          {validImages.length > 1 && (
            <>
              <button type="button" className="public-gallery-arrow prev" onClick={(event) => { event.stopPropagation(); move(-1); }} aria-label="Previous image">‹</button>
              <button type="button" className="public-gallery-arrow next" onClick={(event) => { event.stopPropagation(); move(1); }} aria-label="Next image">›</button>
            </>
          )}
          <button
            type="button"
            className="public-gallery-open"
            onClick={(event) => { event.stopPropagation(); openLightbox(event.currentTarget); }}
            aria-label="Open property image gallery"
          >
            <span aria-hidden="true">↗</span>
            <span><I18nText id="View all property images" /></span>
          </button>
          <div className="public-gallery-count" aria-live="polite">{active + 1} / {validImages.length}</div>
        </div>

        {validImages.length > 1 && (
          <div className="public-gallery-thumbs" aria-label="View all property images">
            {validImages.map((image, index) => (
              <button
                key={image.id}
                type="button"
                className={`public-gallery-thumb${index === active ? ' is-active' : ''}`}
                aria-label={`Image ${index + 1} of ${validImages.length}`}
                aria-current={index === active ? 'true' : undefined}
                onClick={() => setActive(index)}
              >
                <img src={image.signed_url} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </section>

      {lightbox && (
        <div className="public-lightbox" role="dialog" aria-modal="true" aria-label="Property image gallery" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setLightbox(false);
        }}>
          <button type="button" className="public-lightbox-close" onClick={() => setLightbox(false)} aria-label="Close image gallery">×</button>
          <div className="public-lightbox-counter" aria-live="polite">{active + 1} / {validImages.length}</div>
          {validImages.length > 1 && <button type="button" className="public-lightbox-arrow prev" onClick={() => move(-1)} aria-label="Previous image">‹</button>}
          <button type="button" className={`public-lightbox-image${zoomed ? ' is-zoomed' : ''}`} onClick={() => setZoomed((value) => !value)} aria-label={zoomed ? 'Zoom out' : 'Zoom image'}>
            <img src={current.signed_url} alt={current.alt || ''} />
          </button>
          {validImages.length > 1 && <button type="button" className="public-lightbox-arrow next" onClick={() => move(1)} aria-label="Next image">›</button>}
        </div>
      )}
    </>
  );
}
