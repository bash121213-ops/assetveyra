import Image from 'next/image';
import { I18nText } from '@/components/LocaleShell';

export const SECTOR_KEYS: Record<string, string> = {
  land: 'Land',
  residential: 'Residential',
  commercial: 'Commercial',
  hotel: 'Hotel',
  hospitality: 'Hospitality',
  industrial: 'Industrial',
  mixed_use: 'Mixed use',
  development_project: 'Development project',
  infrastructure: 'Infrastructure',
  renewable_energy: 'Renewable energy',
  other: 'Other',
};

export function formatAmount(value: number | null | undefined, currency: string | null | undefined) {
  if (value === null || value === undefined) return '—';
  return `${currency || 'USD'} ${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Number(value))}`;
}

export function formatArea(value: number | null | undefined) {
  if (value === null || value === undefined) return '—';
  return `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Number(value))} m²`;
}

export function SectorLabel({ assetType }: { assetType: string }) {
  const key = SECTOR_KEYS[assetType];
  if (!key) return <>{(assetType || '').replaceAll('_', ' ')}</>;
  return <I18nText id={key} />;
}

export function CountryLabel({ code }: { code: string | null | undefined }) {
  if (!code) return <>—</>;
  let name = code;
  try {
    name = new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code;
  } catch {
    name = code;
  }
  return <>{name}</>;
}

export type OpportunityCardData = {
  slug: string;
  title: string;
  assetType: string;
  countryCode: string | null;
  location: string;
  summary: string | null;
  areaSqm: number | null;
  askingPrice: number | null;
  currency: string | null;
  imageUrl: string | null;
  statusLabel?: string;
  priority?: boolean;
};

/**
 * Shared image-led opportunity card.
 *
 * Real published photography is always preferred. When an opportunity has no
 * published image the card renders an explicit, styled placeholder rather than
 * borrowing an unrelated photograph, so the visual never implies a false asset.
 */
export default function OpportunityCard({ data }: { data: OpportunityCardData }) {
  return (
    <a className="opportunity-card" href={`/opportunities/${data.slug}`}>
      <div className="opportunity-card-media">
        {data.imageUrl ? (
          <Image
            src={data.imageUrl}
            alt={data.title}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 32vw"
           
            priority={Boolean(data.priority)}
          />
        ) : (
          <div className="opportunity-card-placeholder">
            <span><I18nText id="No image available" /></span>
          </div>
        )}
        {data.statusLabel ? <span className="opportunity-card-status"><I18nText id={data.statusLabel} /></span> : null}
      </div>
      <div className="opportunity-card-body">
        <div className="card-meta">
          <span className="card-kicker"><SectorLabel assetType={data.assetType} /></span>
          <span>{data.countryCode || '—'}</span>
        </div>
        <h2>{data.title}</h2>
        {data.summary ? <p>{data.summary}</p> : null}
        {data.location ? <div className="card-location">{data.location}</div> : null}
        <div className="card-data"><span><I18nText id="Area m²" /></span><span>{formatArea(data.areaSqm)}</span></div>
        <div className="card-data card-price">
          <span><I18nText id="Asking price" /></span>
          <strong>{formatAmount(data.askingPrice, data.currency)}</strong>
        </div>
        <div className="card-footer"><div className="card-reference"><I18nText id="Reference" />: {data.slug}</div><span className="card-open"><I18nText id="Open brief →" /></span></div>
      </div>
    </a>
  );
}
