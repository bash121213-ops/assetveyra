import { createClient } from '@/lib/supabase/server';
import { I18nText } from '@/components/LocaleShell';
import { ExternalMarketText } from '@/components/ExternalMarketText';

type Opportunity = { id:string; slug:string; status:string; investment_thesis:string|null; structure:string|null; minimum_ticket:number|null; target_return:number|null; asset_id:string };
type Asset = { id:string; title:string; asset_type:string; country_code:string|null; region:string|null; city:string|null; area_sqm:number|null; currency:string|null; asking_price:number|null; public_summary:string|null };
type ExternalListing = { id:string; country_code:string; country_name:string; city:string|null; title:string; asset_type:string; price_amount:number|null; currency:string|null; area_sqm:number|null; rooms:number|null; summary:string|null; source_name:string; source_url:string; listed_at:string|null; checked_at:string };

const MIN_PUBLIC_VALUE = 100_000;
const sectorKeys:Record<string,string>={land:'Land',residential:'Residential',commercial:'Commercial',hotel:'Hotel',hospitality:'Hospitality',industrial:'Industrial',mixed_use:'Mixed use',development_project:'Development project',infrastructure:'Infrastructure',renewable_energy:'Renewable energy',other:'Other'};
const externalCountryOrder=['AE','SY','FR','CN','JO','US','ES'];
function formatAmount(value:number|null,currency:string|null){if(value===null)return '—';return `${currency||'USD'} ${new Intl.NumberFormat('en-US',{maximumFractionDigits:0}).format(Number(value))}`;}
function formatArea(value:number|null){if(value===null)return '—';return `${new Intl.NumberFormat('en-US',{maximumFractionDigits:0}).format(Number(value))} m²`;}
function externalTypeLabel(type:string){if(type==='land')return <ExternalMarketText id="Land"/>;if(type==='hotel')return <ExternalMarketText id="Hotel"/>;if(type==='hospitality')return <ExternalMarketText id="Hospitality"/>;return type;}

export default async function OpportunitiesPage(){
  const s=await createClient();
  const {data:{user}}=await s.auth.getUser();
  const {data:opportunities,error:opportunityError}=await s.from('public_opportunities').select('id,slug,status,investment_thesis,structure,minimum_ticket,target_return,asset_id').order('published_at',{ascending:false});
  let assets:Asset[]=[];let assetError=null;
  if(!opportunityError&&opportunities?.length){const assetIds=(opportunities as Opportunity[]).map(item=>item.asset_id).filter(Boolean);if(assetIds.length){const result=await s.from('public_assets').select('id,title,asset_type,country_code,region,city,area_sqm,currency,asking_price,public_summary').in('id',assetIds);assets=(result.data??[]) as Asset[];assetError=result.error;}}
  const externalResult=await s.from('external_market_listings').select('id,country_code,country_name,city,title,asset_type,price_amount,currency,area_sqm,rooms,summary,source_name,source_url,listed_at,checked_at').eq('active',true).order('country_code',{ascending:true}).order('price_amount',{ascending:false});
  const externalListings=(externalResult.data??[]) as ExternalListing[];
  const assetById=new Map(assets.map(asset=>[asset.id,asset]));
  const rows=(opportunities??[]).map(opportunity=>({opportunity:opportunity as Opportunity,asset:assetById.get((opportunity as Opportunity).asset_id)})).filter(({asset})=>Boolean(asset?.asking_price&&Number(asset.asking_price)>=MIN_PUBLIC_VALUE));
  const error=opportunityError||assetError||externalResult.error;
  const grouped=externalCountryOrder.map(code=>({code,listings:externalListings.filter(item=>item.country_code===code)})).filter(group=>group.listings.length);
  return <main className="app-shell"><header className="app-header"><a className="brand" href="/">ASSETVEYRA</a><nav><a href="/opportunities"><I18nText id="Marketplace"/></a><a href="/workspace"><I18nText id="Overview"/></a>{user?<form action="/logout" method="post"><button className="text-button"><I18nText id="Sign out"/></button></form>:<a href="/login"><I18nText id="Sign in"/></a>}</nav></header>
    <section className="page-head"><div className="eyebrow"><I18nText id="Market"/></div><h1><I18nText id="Marketplace"/></h1><p><I18nText id="Curated opportunities for qualified investors worldwide."/></p></section>
    {error&&<div className="form-error" style={{maxWidth:1280,margin:'0 auto 30px',width:'88%'}}><I18nText id="The live marketplace could not be loaded. Please try again shortly."/></div>}
    <section className="opportunity-grid">{rows.map(({opportunity,asset})=>asset?<a className="opportunity-card" href={user?`/opportunities/${opportunity.slug}`:'/login'} key={opportunity.id}>
      <div className="card-meta"><span>{sectorKeys[asset.asset_type]?<I18nText id={sectorKeys[asset.asset_type]}/>:asset.asset_type}</span><span>{asset.country_code??'—'}</span></div>
      <h2>{asset.title}</h2>
      <p>{asset.public_summary||opportunity.investment_thesis||<I18nText id="Investment opportunity"/>}</p>
      <div className="card-data"><span>{asset.city||asset.region||'—'}</span><strong>{formatAmount(Number(asset.asking_price),asset.currency)}</strong></div>
      <div className="card-data"><span><I18nText id="Area m²"/></span><span>{formatArea(asset.area_sqm)}</span></div>
    </a>:null)}
    {!rows.some(({asset})=>asset)&&<div className="empty-state wide"><strong><I18nText id="No published opportunities yet"/></strong><span><I18nText id="No sample or fabricated inventory is displayed."/></span></div>}</section>
    <section className="external-market-section"><div className="external-market-heading"><div><div className="eyebrow"><ExternalMarketText id="Global market watch"/></div><h2><ExternalMarketText id="Real external listings, organized by country"/></h2><p><ExternalMarketText id="These are live third-party market listings discovered from public sources. They are not yet represented as verified AssetVeyra opportunities."/></p></div><div className="external-market-note"><ExternalMarketText id="External source · independently verify before transaction"/></div></div>
      {grouped.map(group=><section className="country-market" key={group.code}><div className="country-market-head"><h3>{group.listings[0].country_name}</h3><span>{group.listings.length} <ExternalMarketText id="listings"/></span></div><div className="external-listing-grid">{group.listings.map(item=><article className="external-listing-card" key={item.id}><div className="card-meta"><span>{externalTypeLabel(item.asset_type)}</span><span>{item.city||'—'}</span></div><h4>{item.title}</h4><p>{item.summary}</p><div className="external-facts">{item.area_sqm!==null&&<span><b><ExternalMarketText id="Area"/></b>{new Intl.NumberFormat('en-US',{maximumFractionDigits:0}).format(Number(item.area_sqm))} m²</span>}{item.rooms!==null&&<span><b><ExternalMarketText id="Rooms"/></b>{item.rooms}</span>}</div><div className="external-card-footer"><strong>{user?formatAmount(item.price_amount,item.currency):<span>Sign in to view pricing</span>}</strong><a href={user?`/contact?opportunity=${encodeURIComponent(item.title)}`:'/login'}>{user?'Request this opportunity':'Sign in to request'}</a></div><small><ExternalMarketText id="Source"/>: {item.source_name} · <ExternalMarketText id="Checked"/>: {item.checked_at}</small></article>)}</div></section>)}</section>
  </main>;
}