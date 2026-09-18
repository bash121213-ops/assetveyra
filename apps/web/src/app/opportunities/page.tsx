import { createClient } from '@/lib/supabase/server';
import { I18nText } from '@/components/LocaleShell';
import { ExternalMarketText } from '@/components/ExternalMarketText';
import MarketplaceSearch from '@/components/MarketplaceSearch';

type Opportunity = { id:string; slug:string; status:string; investment_thesis:string|null; structure:string|null; minimum_ticket:number|null; target_return:number|null; asset_id:string };
type Asset = { id:string; title:string; asset_type:string; country_code:string|null; region:string|null; city:string|null; area_sqm:number|null; currency:string|null; asking_price:number|null; public_summary:string|null; image_url?:string };
type ExternalListing = { id:string; country_code:string; country_name:string; city:string|null; title:string; asset_type:string; price_amount:number|null; currency:string|null; area_sqm:number|null; rooms:number|null; summary:string|null; source_name:string; source_url:string; listed_at:string|null; checked_at:string };

const MIN_PUBLIC_VALUE = 100_000;
const sectorKeys:Record<string,string>={land:'Land',residential:'Residential',commercial:'Commercial',hotel:'Hotel',hospitality:'Hospitality',industrial:'Industrial',mixed_use:'Mixed use',development_project:'Development project',infrastructure:'Infrastructure',renewable_energy:'Renewable energy',other:'Other'};
const externalCountryOrder=['AE','SY','FR','CN','JO','US','ES'];

function formatAmount(value:number|null,currency:string|null){if(value===null)return '—';return `${currency||'USD'} ${new Intl.NumberFormat('en-US',{maximumFractionDigits:0}).format(Number(value))}`;}
function formatArea(value:number|null){if(value===null)return '—';return `${new Intl.NumberFormat('en-US',{maximumFractionDigits:0}).format(Number(value))} m²`;}
function externalTypeLabel(type:string){if(type==='land')return <ExternalMarketText id="Land"/>;if(type==='hotel')return <ExternalMarketText id="Hotel"/>;if(type==='hospitality')return <ExternalMarketText id="Hospitality"/>;return type;}

export default async function OpportunitiesPage({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  const params=await searchParams;
  const q=(params.q||'').trim();
  const country=(params.country||'').trim();
  const city=(params.city||'').trim();
  const type=(params.type||'').trim();
  const min=Number(params.min||0);
  const max=Number(params.max||0);
  const areaMin=Number(params.areaMin||0);
  const sort=params.sort||'newest';

  const s=await createClient();
  const {data:{user}}=await s.auth.getUser();
  const {data:opportunities,error:opportunityError}=await s.from('public_opportunities').select('id,slug,status,investment_thesis,structure,minimum_ticket,target_return,asset_id').order('published_at',{ascending:false});

  let assets:Asset[]=[];let assetError=null;
  if(!opportunityError&&opportunities?.length){
    const assetIds=(opportunities as Opportunity[]).map(item=>item.asset_id).filter(Boolean);
    if(assetIds.length){
      const result=await s.from('public_assets').select('id,title,asset_type,country_code,region,city,area_sqm,currency,asking_price,public_summary').in('id',assetIds);
      assets=(result.data??[]) as Asset[];assetError=result.error;
    }
  }

  if(assets.length){
    const imageResult=await s.from('asset_images').select('asset_id,storage_path,sort_order').in('asset_id',assets.map(asset=>asset.id)).order('sort_order',{ascending:true});
    const firstImage=new Map<string,string>();
    for(const image of (imageResult.data??[]) as Array<{asset_id:string;storage_path:string;sort_order:number}>){
      if(firstImage.has(image.asset_id)) continue;
      const signed=await s.storage.from('property-images').createSignedUrl(image.storage_path,60*60);
      if(signed.data?.signedUrl) firstImage.set(image.asset_id,signed.data.signedUrl);
    }
    assets=assets.map(asset=>({...asset,image_url:firstImage.get(asset.id)}));
  }
  const assetById=new Map(assets.map(asset=>[asset.id,asset]));
  let rows=(opportunities??[]).map(opportunity=>({opportunity:opportunity as Opportunity,asset:assetById.get((opportunity as Opportunity).asset_id)}))
    .filter(({asset})=>Boolean(asset?.asking_price&&Number(asset.asking_price)>=MIN_PUBLIC_VALUE))
    .filter(({asset})=>{
      if(!asset)return false;
      const haystack=[asset.title,asset.country_code,asset.region,asset.city,asset.asset_type,asset.public_summary].filter(Boolean).join(' ').toLowerCase();
      if(q&&!haystack.includes(q.toLowerCase()))return false;
      if(country&&asset.country_code!==country)return false;
      if(city&&asset.city!==city)return false;
      if(type&&asset.asset_type!==type)return false;
      if(min&&Number(asset.asking_price)<min)return false;
      if(max&&Number(asset.asking_price)>max)return false;
      if(areaMin&&Number(asset.area_sqm||0)<areaMin)return false;
      return true;
    });

  rows=rows.sort((a,b)=>{
    const av=Number(a.asset?.asking_price||0),bv=Number(b.asset?.asking_price||0);
    const aa=Number(a.asset?.area_sqm||0),ba=Number(b.asset?.area_sqm||0);
    if(sort==='price_asc')return av-bv;if(sort==='price_desc')return bv-av;if(sort==='area_desc')return ba-aa;return 0;
  });

  const countries=[...new Set(assets.map(a=>a.country_code).filter(Boolean) as string[])].sort();
  const cities=[...new Set(assets.map(a=>a.city).filter(Boolean) as string[])].sort();
  const assetTypes=[...new Set(assets.map(a=>a.asset_type).filter(Boolean))].sort();

  const externalResult=await s.from('external_market_listings').select('id,country_code,country_name,city,title,asset_type,price_amount,currency,area_sqm,rooms,summary,source_name,source_url,listed_at,checked_at').eq('active',true).order('country_code',{ascending:true}).order('price_amount',{ascending:false});
  const externalListings=(externalResult.data??[]) as ExternalListing[];
  const error=opportunityError||assetError||externalResult.error;
  const grouped=externalCountryOrder.map(code=>({code,listings:externalListings.filter(item=>item.country_code===code)})).filter(group=>group.listings.length);

  return <main className="app-shell">
    <header className="app-header"><a className="brand" href="/">ASSETVEYRA</a><nav><a href="/opportunities"><I18nText id="Marketplace"/></a><a href="/workspace"><I18nText id="Overview"/></a>{user?<form action="/logout" method="post"><button className="text-button"><I18nText id="Sign out"/></button></form>:<a href="/login"><I18nText id="Sign in"/></a>}</nav></header>
    <section className="page-head"><div className="eyebrow"><I18nText id="Market"/></div><h1><I18nText id="Marketplace"/></h1><p><I18nText id="Curated opportunities for qualified investors worldwide."/></p></section>
    <MarketplaceSearch countries={countries} cities={cities} assetTypes={assetTypes} initialParams={params}/>
    {error&&<div className="form-error" style={{maxWidth:1280,margin:'0 auto 30px',width:'88%'}}><I18nText id="The live marketplace could not be loaded. Please try again shortly."/></div>}
    <div className="marketplace-results-head"><strong>{rows.length} <I18nText id="results"/></strong><a href="/opportunities"><I18nText id="Clear filters"/></a></div>
    <section className="opportunity-grid">
      {rows.map(({opportunity,asset})=>asset?<a className="opportunity-card" href={user?`/opportunities/${opportunity.slug}`:'/login'} key={opportunity.id}>
        <div className="market-card-image">{asset.image_url?<img src={asset.image_url} alt="" loading="lazy"/>:<div className="market-card-image-placeholder"><I18nText id="Property"/></div>}</div>
        <div className="card-meta"><span>{sectorKeys[asset.asset_type]?<I18nText id={sectorKeys[asset.asset_type]}/>:asset.asset_type}</span><span>{asset.country_code??'—'}</span></div>
        <h2>{asset.title}</h2>
        <p>{asset.public_summary||opportunity.investment_thesis||<I18nText id="Investment opportunity"/>}</p>
        <div className="card-data"><span>{[asset.city,asset.region].filter(Boolean).join(', ')||'—'}</span><strong>{formatAmount(Number(asset.asking_price),asset.currency)}</strong></div>
        <div className="card-data"><span><I18nText id="Area m²"/></span><span>{formatArea(asset.area_sqm)}</span></div>
      </a>:null)}
      {!rows.length&&<div className="empty-state wide"><strong><I18nText id="No matching properties"/></strong><span><I18nText id="Adjust your search or filters to see available opportunities."/></span></div>}
    </section>
    <section className="external-market-section"><div className="external-market-heading"><div><div className="eyebrow"><ExternalMarketText id="Global market watch"/></div><h2><ExternalMarketText id="Real external listings, organized by country"/></h2><p><ExternalMarketText id="These are live third-party market listings discovered from public sources. They are not yet represented as verified AssetVeyra opportunities."/></p></div><div className="external-market-note"><ExternalMarketText id="External source · independently verify before transaction"/></div></div>
      {grouped.map(group=><section className="country-market" key={group.code}><div className="country-market-head"><h3>{group.listings[0].country_name}</h3><span>{group.listings.length} <ExternalMarketText id="listings"/></span></div><div className="external-listing-grid">{group.listings.map(item=><article className="external-listing-card" key={item.id}><div className="card-meta"><span>{externalTypeLabel(item.asset_type)}</span><span>{item.city||'—'}</span></div><h4>{item.title}</h4><p>{item.summary}</p><div className="external-facts">{item.area_sqm!==null&&<span><b><ExternalMarketText id="Area"/></b>{new Intl.NumberFormat('en-US',{maximumFractionDigits:0}).format(Number(item.area_sqm))} m²</span>}{item.rooms!==null&&<span><b><ExternalMarketText id="Rooms"/></b>{item.rooms}</span>}</div><div className="external-card-footer"><strong>{user?formatAmount(item.price_amount,item.currency):<span>Sign in to view pricing</span>}</strong><a href={user?`/contact?opportunity=${encodeURIComponent(item.title)}`:'/login'}>{user?'Request this opportunity':'Sign in to request'}</a></div><small><ExternalMarketText id="Source"/>: {item.source_name} · <ExternalMarketText id="Checked"/>: {item.checked_at}</small></article>)}</div></section>)}</section>
  </main>;
}
