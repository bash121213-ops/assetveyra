'use client';

import { I18nText } from '@/components/LocaleShell';

type Block = { title:string; body?:string; bullets?:string[]; draft?:boolean };
export default function CompanyInfoPage({ eyebrow, title, intro, blocks }: { eyebrow:string; title:string; intro:string; blocks:Block[] }) {
  return <main className="av-final-home"><section className="av-info-page"><div className="eyebrow"><I18nText id={eyebrow}/></div><h1><I18nText id={title}/></h1><p className="av-info-intro"><I18nText id={intro}/></p>{blocks.map((b,i)=><section className="av-info-block" key={i}><h2><I18nText id={b.title}/></h2>{b.draft&&<div className="av-draft"><I18nText id="Draft — pending document and legal review"/></div>}{b.body&&<p><I18nText id={b.body}/></p>}{b.bullets&&<ul>{b.bullets.map(x=><li key={x}><I18nText id={x}/></li>)}</ul>}</section>)}</section></main>;
}