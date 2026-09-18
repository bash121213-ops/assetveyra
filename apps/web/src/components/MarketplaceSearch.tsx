'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { I18nText } from '@/components/LocaleShell';

type Props = { countries:string[]; cities:string[]; assetTypes:string[] };

export default function MarketplaceSearch({ countries, cities, assetTypes }: Props) {
  const router=useRouter();
  const params=useSearchParams();
  const [query,setQuery]=useState(params.get('q')||'');
  const submit=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const form=new FormData(event.currentTarget);
    const next=new URLSearchParams();
    ['q','country','city','type','min','max','areaMin','sort'].forEach((key)=>{const value=String(form.get(key)||'').trim();if(value)next.set(key,value);});
    router.push(next.toString()?'/opportunities?'+next.toString():'/opportunities');
  };
  return <form className="marketplace-search" onSubmit={submit} role="search">
    <div className="marketplace-search-main">
      <label><span><I18nText id="Search"/></span><input name="q" value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Country, city, property or reference"/></label>
      <button className="button primary" type="submit"><I18nText id="Search"/></button>
    </div>
    <div className="marketplace-filters">
      <label><span><I18nText id="Country"/></span><select name="country" defaultValue={params.get('country')||''}><option value=""><I18nText id="All countries"/></option>{countries.map((value)=><option key={value} value={value}>{value}</option>)}</select></label>
      <label><span>City</span><select name="city" defaultValue={params.get('city')||''}><option value="">All cities</option>{cities.map((value)=><option key={value} value={value}>{value}</option>)}</select></label>
      <label><span>Asset type</span><select name="type" defaultValue={params.get('type')||''}><option value="">All asset types</option>{assetTypes.map((value)=><option key={value} value={value}>{value.replace(/_/g,' ')}</option>)}</select></label>
      <label><span>Min price</span><input name="min" inputMode="numeric" defaultValue={params.get('min')||''} placeholder="100000"/></label>
      <label><span>Max price</span><input name="max" inputMode="numeric" defaultValue={params.get('max')||''} placeholder="5000000"/></label>
      <label><span>Min area m²</span><input name="areaMin" inputMode="numeric" defaultValue={params.get('areaMin')||''} placeholder="1000"/></label>
      <label><span>Sort</span><select name="sort" defaultValue={params.get('sort')||'newest'}><option value="newest">Newest</option><option value="price_asc">Price: low to high</option><option value="price_desc">Price: high to low</option><option value="area_desc">Largest area</option></select></label>
    </div>
  </form>;
}
