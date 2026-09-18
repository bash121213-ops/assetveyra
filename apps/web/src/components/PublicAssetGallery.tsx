'use client';

import { useEffect, useRef, useState, type TouchEvent } from 'react';
import { I18nText, useLocale } from '@/components/LocaleShell';
import { translate } from '@/lib/i18n';

type Image = { id: string; signed_url: string; sort_order: number; alt?: string | null };

export default function PublicAssetGallery({ images }: { images: Image[] }) {
  const locale = useLocale();
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const lastTapAt = useRef(0);
  const validImages = images.filter((image) => image.signed_url);

  const label = (key: string) => translate(key, locale);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(false);
      if (validImages.length > 1 && event.key === 'ArrowRight') setActive((value) => (value + 1) % validImages.length);
      if (validImages.length > 1 && event.key === 'ArrowLeft') setActive((value) => (value - 1 + validImages.length) % validImages.length);

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLButtonElement>('.public-lightbox-close')?.focus());
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      triggerRef.current?.focus();
    };
  }, [lightbox, validImages.length]);

  useEffect(() => {
    if (active >= validImages.length && validImages.length) setActive(validImages.length - 1);
  }, [active, validImages.length]);

  if (!validImages.length) {
    return (
      <section className="public-gallery empty-state" aria-label={label('Property gallery')}>
        <strong><I18nText id="Property gallery" /></strong>
        <span><I18nText id="No property images are available for this opportunity." /></span>
      </section>
    );
  }

  const current = validImages[active];

  const openLightbox = (button?: HTMLButtonElement | null) => {
    triggerRef.current = button ?? null;
    setZoomed(false);
    setLightbox(true);
  };

  const move = (delta: number) => {
    setZoomed(false);
    setActive((value) => (value + delta + validImages.length) % validImages.length);
  };

  const onTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null || validImages.length < 2) return;
    const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) >= 45) move(delta < 0 ? 1 : -1);
  };

  const onImageActivate = (button?: HTMLButtonElement | null) => {
    const now = Date.now();
    if (now - lastTapAt.current < 300) setZoomed((value) => !value);
    lastTapAt.current = now;
    if (!lightbox) openLightbox(button);
  };

  return (
    <>
      <section className="public-gallery" aria-label={label('Property gallery')}>
        <div
          className="public-gallery-main"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onDoubleClick={() => setZoomed((value) => !value)}
          onClick={(event) => {
            if (event.target === event.currentTarget || event.target instanceof HTMLImageElement) {
              onImageActivate(event.currentTarget.querySelector<HTMLButtonElement>('.public-gallery-open'));
            }
          }}
        >
          <img src={current.signed_url} alt={current.alt || label('Property image')} fetchPriority="high" decoding="async" />
          {validImages.length > 1 && (
            <>
              <button type="button" className="public-gallery-arrow prev" onClick={(event) => { event.stopPropagation(); move(-1); }} aria-label={label('Previous image')}>‹</button>
              <button type="button" className="public-gallery-arrow next" onClick={(event) => { event.stopPropagation(); move(1); }} aria-label={label('Next image')}>›</button>
            </>
          )}
          <button
            ref={triggerRef}
            type="button"
            className="public-gallery-open"
            onClick={(event) => { event.stopPropagation(); openLightbox(event.currentTarget); }}
            aria-label={label('Open property image gallery')}
          >
            <span aria-hidden="true">↗</span>
            <span><I18nText id="View all property images" /></span>
          </button>
          <div className="public-gallery-count" aria-live="polite">{active + 1} / {validImages.length}</div>
        </div>

        {validImages.length > 1 && (
          <div className="public-gallery-thumbs" aria-label={label('View all property images')}>
            {validImages.map((image, index) => (
              <button
                key={image.id}
                type="button"
                className={`public-gallery-thumb${index === active ? ' is-active' : ''}`}
                aria-label={`${label('Image')} ${index + 1} ${label('of')} ${validImages.length}`}
                aria-current={index === active ? 'true' : undefined}
                onClick={() => { setZoomed(false); setActive(index); }}
              >
                <img src={image.signed_url} alt="" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        )}
      </section>

      {lightbox && (
        <div
          ref={dialogRef}
          className="public-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={label('Property image gallery')}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseDown={(event) => { if (event.target === event.currentTarget) setLightbox(false); }}
        >
          <button type="button" className="public-lightbox-close" onClick={() => setLightbox(false)} aria-label={label('Close image gallery')}>×</button>
          <div className="public-lightbox-counter" aria-live="polite">{active + 1} / {validImages.length}</div>
          {validImages.length > 1 && <button type="button" className="public-lightbox-arrow prev" onClick={() => move(-1)} aria-label={label('Previous image')}>‹</button>}
          <button
            type="button"
            className={`public-lightbox-image${zoomed ? ' is-zoomed' : ''}`}
            onClick={() => setZoomed((value) => !value)}
            onDoubleClick={() => setZoomed((value) => !value)}
            aria-label={label(zoomed ? 'Zoom out' : 'Zoom image')}
          >
            <img src={current.signed_url} alt={current.alt || label('Property image')} decoding="async" />
          </button>
          {validImages.length > 1 && <button type="button" className="public-lightbox-arrow next" onClick={() => move(1)} aria-label={label('Next image')}>›</button>}
        </div>
      )}
    </>
  );
}
