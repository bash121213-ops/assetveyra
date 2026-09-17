'use client';

import { useState } from 'react';
import { I18nText } from '@/components/LocaleShell';

type Image = { id: string; signed_url: string; sort_order: number };

export default function PublicAssetGallery({ images }: { images: Image[] }) {
  const [active, setActive] = useState(0);
  const validImages = images.filter((image) => image.signed_url);

  if (!validImages.length) {
    return (
      <section className="public-gallery empty-state" aria-label="Property gallery">
        <strong><I18nText id="Property gallery" /></strong>
        <span><I18nText id="No property images are available for this opportunity." /></span>
      </section>
    );
  }

  const current = validImages[Math.min(active, validImages.length - 1)];

  return (
    <section className="public-gallery" aria-label="Property gallery">
      <div className="public-gallery-main">
        <img src={current.signed_url} alt="" />
        <div className="public-gallery-count">{active + 1} / {validImages.length}</div>
      </div>
      {validImages.length > 1 && (
        <div className="public-gallery-thumbs" aria-label="View all property images">
          {validImages.map((image, index) => (
            <button
              key={image.id}
              type="button"
              className={`public-gallery-thumb${index === active ? ' is-active' : ''}`}
              aria-label={`${index + 1} / ${validImages.length}`}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
            >
              <img src={image.signed_url} alt="" />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
