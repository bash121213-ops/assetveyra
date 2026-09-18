'use client';

import '../av-final.css';
import '../external-market.css';
import { ExternalMarketText } from '@/components/ExternalMarketText';
import { useLocale } from '@/components/LocaleShell';
import { useEffect, useMemo, useState } from 'react';

export type ExternalListing = {
  id: string;
  country_code: string;
  country_name: string;
  city: string | null;
  title: string;
  asset_type: string;
  price_amount: number | null;
  currency: string | null;
  area_sqm: number | null;
  rooms: number | null;
  summary: string | null;
  source_name: string;
  source_url: string;
  listed_at: string | null;
  checked_at: string;
};

const typeLabel = (value: string) => {
  if (value === 'land') return <ExternalMarketText id="Land" />;
  if (value === 'hotel') return <ExternalMarketText id="Hotel" />;
  if (value === 'hospitality') return <ExternalMarketText id="Hospitality" />;
  return value.replaceAll('_', ' ');
};

const amount = (value: number | null, currency: string | null) =>
  value === null ? '—' : `${currency ?? 'USD'} ${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value)}`;

const area = (value: number | null) =>
  value === null ? '—' : `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value)} m²`;

export default function ExternalMarketClient({ listings, authenticated }: { listings: ExternalListing[]; authenticated: boolean }) {
  const locale = useLocale();
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [assetType, setAssetType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selected, setSelected] = useState<ExternalListing | null>(null);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const countries = useMemo(() => [...new Set(listings.map((item) => item.country_name))].sort(), [listings]);
  const cities = useMemo(() => [...new Set(listings.map((item) => item.city).filter(Boolean) as string[])].sort(), [listings]);
  const types = useMemo(() => [...new Set(listings.map((item) => item.asset_type))].sort(), [listings]);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase(locale);
    const min = Number(minPrice);
    const max = Number(maxPrice);
    return listings.filter((item) => {
      const haystack = [item.title, item.city, item.country_name, item.asset_type, item.summary, item.source_name].filter(Boolean).join(' ').toLocaleLowerCase(locale);
      if (q && !haystack.includes(q)) return false;
      if (country && item.country_name !== country) return false;
      if (city && item.city !== city) return false;
      if (assetType && item.asset_type !== assetType) return false;
      if (minPrice && (!Number.isFinite(min) || item.price_amount === null || item.price_amount < min)) return false;
      if (maxPrice && (!Number.isFinite(max) || item.price_amount === null || item.price_amount > max)) return false;
      return true;
    });
  }, [assetType, city, country, listings, locale, maxPrice, minPrice, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, ExternalListing[]>();
    filtered.forEach((item) => map.set(item.country_code, [...(map.get(item.country_code) ?? []), item]));
    return [...map.entries()].map(([code, rows]) => ({ code, country: rows[0].country_name, rows }));
  }, [filtered]);

  const clear = () => {
    setQuery('');
    setCountry('');
    setCity('');
    setAssetType('');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <main className="app-shell">
      <header className="app-header">
        <a className="brand" href="/">ASSETVEYRA</a>
        <nav><a href="/opportunities">Marketplace</a>{authenticated ? <a href="/workspace">Workspace</a> : <a href="/login">Sign in</a>}</nav>
      </header>

      <section className="external-market-section">
        <div className="external-market-heading">
          <div>
            <div className="eyebrow"><ExternalMarketText id="Global market watch" /></div>
            <h1><ExternalMarketText id="Real external listings, organized by country" /></h1>
            <p><ExternalMarketText id="These are live third-party market listings discovered from public sources. They are not yet represented as verified AssetVeyra opportunities." /></p>
          </div>
          <div className="external-market-note"><ExternalMarketText id="External source · independently verify before transaction" /></div>
        </div>

        <div className="external-market-filters" role="search">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title, city, country, type or source" aria-label="Search external listings" />
          <select value={country} onChange={(e) => setCountry(e.target.value)} aria-label="Country"><option value="">All countries</option>{countries.map((item) => <option key={item}>{item}</option>)}</select>
          <select value={city} onChange={(e) => setCity(e.target.value)} aria-label="City"><option value="">All cities</option>{cities.map((item) => <option key={item}>{item}</option>)}</select>
          <select value={assetType} onChange={(e) => setAssetType(e.target.value)} aria-label="Asset type"><option value="">All asset types</option>{types.map((item) => <option key={item}>{item.replaceAll('_', ' ')}</option>)}</select>
          <input inputMode="decimal" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min price" aria-label="Minimum price" />
          <input inputMode="decimal" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max price" aria-label="Maximum price" />
          <button type="button" className="external-details-button" onClick={clear}>Clear filters</button>
        </div>

        <div className="marketplace-results-bar"><strong>{filtered.length}</strong><span><ExternalMarketText id="listings" /></span></div>

        {grouped.map((group) => (
          <section className="country-market" key={group.code}>
            <div className="country-market-head"><h2>{group.country}</h2><span>{group.rows.length} <ExternalMarketText id="listings" /></span></div>
            <div className="external-listing-grid">
              {group.rows.map((item) => (
                <article className="external-listing-card" key={item.id}>
                  <div className="card-meta"><span>{typeLabel(item.asset_type)}</span><span>{item.city ?? '—'}</span></div>
                  <h3>{item.title}</h3>
                  <p>{item.summary ?? '—'}</p>
                  <div className="external-facts">
                    {item.area_sqm !== null && <span><b><ExternalMarketText id="Area" /></b>{area(item.area_sqm)}</span>}
                    {item.rooms !== null && <span><b><ExternalMarketText id="Rooms" /></b>{item.rooms}</span>}
                  </div>
                  <div className="external-card-footer">
                    <strong>{authenticated ? amount(item.price_amount, item.currency) : 'Sign in to view pricing'}</strong>
                    <div className="external-card-actions">
                      <button type="button" className="external-details-button" onClick={() => setSelected(item)}>Details</button>
                      <a className="external-source-link" href={item.source_url} target="_blank" rel="noreferrer"><ExternalMarketText id="View source listing" /></a>
                    </div>
                  </div>
                  <small><ExternalMarketText id="Source" />: {item.source_name} · <ExternalMarketText id="Checked" />: {item.checked_at}</small>
                </article>
              ))}
            </div>
          </section>
        ))}

        {!filtered.length && <div className="empty-state wide"><strong>No external listings match these filters.</strong><span>Clear the filters or broaden the search.</span></div>}
      </section>

      {selected && (
        <div className="external-detail-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
          <section className="external-detail-panel" role="dialog" aria-modal="true" aria-labelledby="external-detail-title" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <button type="button" className="external-detail-close" onClick={() => setSelected(null)} aria-label="Close">×</button>
            <div className="external-detail-content">
              <div className="eyebrow">{selected.country_name}</div>
              <h2 id="external-detail-title">{selected.title}</h2>
              <div className="external-detail-location">{selected.city ?? '—'} · {typeLabel(selected.asset_type)}</div>
              <div className="external-detail-price">{authenticated ? amount(selected.price_amount, selected.currency) : 'Sign in to view pricing'}</div>
              <p className="external-detail-summary">{selected.summary ?? '—'}</p>
              <div className="external-detail-section">
                <h3>Listing facts</h3>
                <div className="external-detail-table">
                  <div className="external-detail-row"><strong>Area</strong><span>{area(selected.area_sqm)}</span></div>
                  <div className="external-detail-row"><strong>Rooms</strong><span>{selected.rooms ?? '—'}</span></div>
                  <div className="external-detail-row"><strong>Listed</strong><span>{selected.listed_at ?? '—'}</span></div>
                  <div className="external-detail-row"><strong>Checked</strong><span>{selected.checked_at}</span></div>
                  <div className="external-detail-row"><strong>Source</strong><span>{selected.source_name}</span></div>
                </div>
              </div>
              <div className="external-detail-actions">
                <a className="external-market-contact-link" href={selected.source_url} target="_blank" rel="noreferrer"><ExternalMarketText id="View source listing" /></a>
                {authenticated && <a className="external-details-button" href={`/contact?opportunity=${encodeURIComponent(selected.title)}`}>Request this opportunity</a>}
              </div>
              <p className="external-detail-disclaimer"><ExternalMarketText id="External source · independently verify before transaction" /></p>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
