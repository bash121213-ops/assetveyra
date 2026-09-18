'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

type Props = {
  countries: string[];
  cities: string[];
  assetTypes: string[];
  initialParams?: Record<string,string|undefined>;
};

export default function MarketplaceSearch({ countries, cities, assetTypes, initialParams = {} }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState(initialParams.q || '');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const next = new URLSearchParams();

    for (const key of ['q','country','city','type','min','max','areaMin','sort']) {
      const value = String(form.get(key) || '').trim();
      if (value) next.set(key, value);
    }

    router.push(next.toString() ? `/opportunities?${next.toString()}` : '/opportunities');
  };

  return (
    <section className="marketplace-search-shell" aria-label="Marketplace search">
      <form className="marketplace-search" onSubmit={submit} role="search">
        <div className="marketplace-search-main">
          <label>
            <span>Search</span>
            <input name="q" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Country, city, property or reference" autoComplete="off" />
          </label>
          <button className="button primary" type="submit">Search</button>
        </div>
        <div className="marketplace-filters">
          <label><span>Country</span><select name="country" defaultValue={initialParams.country || ''}><option value="">All countries</option>{countries.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
          <label><span>City</span><select name="city" defaultValue={initialParams.city || ''}><option value="">All cities</option>{cities.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
          <label><span>Asset type</span><select name="type" defaultValue={initialParams.type || ''}><option value="">All asset types</option>{assetTypes.map((value) => <option key={value} value={value}>{value.replaceAll('_',' ')}</option>)}</select></label>
          <label><span>Min price</span><input name="min" inputMode="numeric" defaultValue={initialParams.min || ''} placeholder="100000" /></label>
          <label><span>Max price</span><input name="max" inputMode="numeric" defaultValue={initialParams.max || ''} placeholder="5000000" /></label>
          <label><span>Min area m²</span><input name="areaMin" inputMode="numeric" defaultValue={initialParams.areaMin || ''} placeholder="1000" /></label>
          <label><span>Sort</span><select name="sort" defaultValue={initialParams.sort || (initialParams.q ? 'relevance' : 'newest')}><option value="relevance">Relevance</option><option value="newest">Newest</option><option value="price_asc">Price: low to high</option><option value="price_desc">Price: high to low</option><option value="area_desc">Largest area</option></select></label>
        </div>
      </form>
    </section>
  );
}
