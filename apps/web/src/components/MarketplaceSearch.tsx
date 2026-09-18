'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { I18nText } from '@/components/LocaleShell';

type Props = {
  countries:string[];
  cities:string[];
  assetTypes:string[];
  initialParams?:Record<string,string|undefined>;
};

export default function MarketplaceSearch({ countries, cities, assetTypes, initialParams = {} }: Props) {
  const router=useRouter();
  const [query,setQuery]=useState(initialParams.q||'');
  const submit=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const form=new FormData(event.currentTarget);
    const next=new URLSearchParams();
    ['q','country','city','type','min','max','areaMin','sort'].forEach((key)=>{
      const value=String(form.get(key)||'').trim();
      if(value) next.set(key,value);
    });
    router.push(next.toString()?'/opportunities?'+next.toString():'/opportunities');
  };
  return <form className="marketplace-search" onSubmit={submit} role="search">
    <div className="marketplace-search-main">
      <label><span><I18nText id="Search"/></span><input name="q" value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Country, city, property or reference"/></label>
      <button className="button primary" type="submit"><I18nText id="Search"/></button>
    </div>
    <div className="marketplace-filters">
      <label><span><I18nText id="Country"/></span><select name="country" defaultValue={initialParams.country||''}><option value=""><I18nText id="All countries"/></option>{countries.map((value)=><option key={value} value={value}>{value}</option>)}</select></label>
      <label><span><I18nText id="City"/></span><select name="city" defaultValue={initialParams.city||''}><option value=""><I18nText id="All cities"/></option>{cities.map((value)=><option key={value} value={value}>{value}</option>)}</select></label>
      <label><span><I18nText id="Asset type"/></span><select name="type" defaultValue={initialParams.type||''}><option value=""><I18nText id="All asset types"/></option>{assetTypes.map((value)=><option key={value} value={value}>{value.replace(/_/g,' ')}</option>)}</select></label>
      <label><span><I18nText id="Min price"/></span><input name="min" inputMode="numeric" defaultValue={initialParams.min||''} placeholder="100000"/></label>
      <label><span><I18nText id="Max price"/></span><input name="max" inputMode="numeric" defaultValue={initialParams.max||''} placeholder="5000000"/></label>
      <label><span><I18nText id="Min area m²"/></span><input name="areaMin" inputMode="numeric" defaultValue={initialParams.areaMin||''} placeholder="1000"/></label>
      <label><span><I18nText id="Sort"/></span><select name="sort" defaultValue={initialParams.sort||'newest'}><option value="newest"><I18nText id="Newest"/></option><option value="price_asc"><I18nText id="Price: low to high"/></option><option value="price_desc"><I18nText id="Price: high to low"/></option><option value="area_desc"><I18nText id="Largest area"/></option></select></label>
    </div>
  </form>;
}
