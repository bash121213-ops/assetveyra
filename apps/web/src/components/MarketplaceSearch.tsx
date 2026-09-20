'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { I18nText } from '@/components/LocaleShell';

type Props = { countries:string[]; cities:string[]; regions:string[]; citiesByRegion:Record<string,string[]>; regionsByCountry:Record<string,string[]>; assetTypes:string[]; initialParams?:Record<string,string|undefined> };

export default function MarketplaceSearch({countries,cities,regions,citiesByRegion,regionsByCountry,assetTypes,initialParams={}}:Props){
  const router=useRouter();
  const [query,setQuery]=useState(initialParams.q||''); const [country,setCountry]=useState(initialParams.country||''); const [region,setRegion]=useState(initialParams.region||''); const [city,setCity]=useState(initialParams.city||''); const [type,setType]=useState(initialParams.type||''); const [min,setMin]=useState(initialParams.min||''); const [max,setMax]=useState(initialParams.max||''); const [areaMin,setAreaMin]=useState(initialParams.areaMin||''); const [sort,setSort]=useState(initialParams.sort||(initialParams.q?'relevance':'newest')); const [filtersOpen,setFiltersOpen]=useState(false);

  const submit=(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();const next=new URLSearchParams();[['q',query],['country',country],['region',region],['city',city],['type',type],['min',min.trim()],['max',max.trim()],['areaMin',areaMin.trim()],['sort',sort]].forEach(([key,value])=>{if(value)next.set(key,value);});const qs=next.toString();router.push(qs?'/opportunities?'+qs:'/opportunities');setFiltersOpen(false);};
  const clear=()=>{setQuery('');setCountry('');setRegion('');setCity('');setType('');setMin('');setMax('');setAreaMin('');setSort('newest');router.push('/opportunities');setFiltersOpen(false);};
  const remove=(key:string)=>{const next=new URLSearchParams(window.location.search);next.delete(key);const qs=next.toString();router.push(qs?'/opportunities?'+qs:'/opportunities');};
  const regionOptions=country?(regionsByCountry[country.toLowerCase()]??regions):regions;
  const cityOptions=region?(citiesByRegion[region.toLowerCase()]??cities):cities;
  const chips=[country&&{key:'country',label:country},region&&{key:'region',label:region},city&&{key:'city',label:city},type&&{key:'type',label:type.replaceAll('_',' ')},min&&{key:'min',label:'≥ '+min},max&&{key:'max',label:'≤ '+max},areaMin&&{key:'areaMin',label:'≥ '+areaMin+' m²'}].filter(Boolean) as {key:string;label:string}[];

  return <section className="marketplace-search-shell" aria-label="Marketplace search"><form className="marketplace-search" onSubmit={submit} role="search">
    <div className="marketplace-search-main"><label className="marketplace-search-query"><span><I18nText id="Search"/></span><input name="q" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Title, location or reference" autoComplete="off"/></label><button className="button primary" type="submit"><I18nText id="Search"/></button></div>
    <div className="marketplace-primary-filters">
      <label><span><I18nText id="Country"/></span><select value={country} onChange={e=>{setCountry(e.target.value);setRegion('');setCity('')}}><option value="">All countries</option>{countries.map(v=><option key={v} value={v}>{v}</option>)}</select></label>
      <label><span><I18nText id="Asset type"/></span><select value={type} onChange={e=>setType(e.target.value)}><option value="">All asset types</option>{assetTypes.map(v=><option key={v} value={v}>{v.replaceAll('_',' ')}</option>)}</select></label>
      <label><span><I18nText id="Price"/></span><div className="price-pair"><input inputMode="numeric" value={min} onChange={e=>setMin(e.target.value)} placeholder="Min"/><input inputMode="numeric" value={max} onChange={e=>setMax(e.target.value)} placeholder="Max"/></div></label>
      <button type="button" className="filter-trigger" onClick={()=>setFiltersOpen(true)} aria-expanded={filtersOpen}><I18nText id="Filters"/></button>
    </div>
    {filtersOpen&&<div className="filter-overlay" role="presentation" onClick={e=>{if(e.target===e.currentTarget)setFiltersOpen(false)}}><div className="filter-drawer" role="dialog" aria-modal="true" aria-labelledby="marketplace-filter-title">
      <div className="filter-drawer-head"><div><div className="eyebrow"><I18nText id="MARKETPLACE"/></div><h2 id="marketplace-filter-title"><I18nText id="Filters"/></h2></div><button type="button" className="filter-close" onClick={()=>setFiltersOpen(false)} aria-label="Close filters">×</button></div>
      <div className="filter-drawer-body">
        <div className="filter-group"><span className="filter-group-title"><I18nText id="Location"/></span><label><span><I18nText id="Region"/></span><select value={region} onChange={e=>{setRegion(e.target.value);setCity('')}}><option value="">All regions</option>{regionOptions.map(v=><option key={v} value={v}>{v}</option>)}</select></label><label><span><I18nText id="City"/></span><select value={city} onChange={e=>setCity(e.target.value)}><option value="">All cities</option>{cityOptions.map(v=><option key={v} value={v}>{v}</option>)}</select></label></div>
        <div className="filter-group"><span className="filter-group-title"><I18nText id="Size"/></span><label><span><I18nText id="Minimum area m²"/></span><input inputMode="numeric" value={areaMin} onChange={e=>setAreaMin(e.target.value)} placeholder="1000"/></label></div>
        <div className="filter-group"><span className="filter-group-title"><I18nText id="Sort"/></span><label><span><I18nText id="Sort"/></span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="relevance">Relevance</option><option value="newest">Newest</option><option value="price_asc">Price: low to high</option><option value="price_desc">Price: high to low</option><option value="area_desc">Largest area</option></select></label></div>
      </div>
      <div className="filter-drawer-foot"><button type="button" className="text-button filter-clear" onClick={clear}><I18nText id="Clear all"/></button><button type="submit" className="button primary"><I18nText id="Apply filters"/></button></div>
    </div></div>}
    {chips.length>0&&<div className="filter-chips" aria-label="Applied filters">{chips.map(chip=><button key={chip.key} type="button" className="filter-chip" onClick={()=>remove(chip.key)}>{chip.label} ×</button>)}<button type="button" className="text-button" onClick={clear}><I18nText id="Clear all"/></button></div>}
  </form></section>;
}