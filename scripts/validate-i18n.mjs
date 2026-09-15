import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const src=path.join(root,'apps/web/src');
const i18n=fs.readFileSync(path.join(src,'lib/i18n.ts'),'utf8');
const enums=fs.readFileSync(path.join(src,'lib/i18nEnums.ts'),'utf8');
const expected=['en','ar','zh','es','fr'];
const m=i18n.match(/SUPPORTED_LOCALES=\[([^\]]+)\]/);
const locales=m?[...m[1].matchAll(/'([^']+)'/g)].map(x=>x[1]):[];
if(locales.join(',')!==expected.join(','))throw new Error(`Unexpected locales: ${locales.join(',')}`);
const keys=[...enums.matchAll(/^\s*([A-Za-z0-9_]+):\s*\{/gm)].map(x=>x[1]);
for(const l of expected)if(!new RegExp(`\\b${l}:`).test(enums))throw new Error(`Missing locale ${l} in enum catalog`);
const required=['draft','submitted','verification','compliance_review','approved','published','suspended','archived','land','residential','commercial','hotel','hospitality','industrial','mixed_use','development_project','infrastructure','renewable_energy','other','open','in_review','needs_information','escalated','rejected','expired','closed','nda','data_room','diligence','offer','negotiation','approval','contract','signing','closing','completed','cancelled','private','deal_room','public','interest','qualified','nda_pending','nda_signed','accepted','contracted','withdrawn','initiated','countered','platform_admin','operations_admin','compliance_officer','risk_analyst','deal_manager','legal_reviewer','data_room_manager','seller_admin','seller_member','investor_admin','investor_member','advisor','broker','external_reviewer','service_provider','organization_manager','view_only','active','resolved','pending','new'];
const missing=required.filter(k=>!keys.includes(k));
if(missing.length)throw new Error(`Missing enum translations: ${missing.join(',')}`);
const files=[];function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())walk(p);else if(/\.(tsx?|jsx?)$/.test(e.name))files.push(p)}}walk(src);
let dynamic=0;for(const f of files){const t=fs.readFileSync(f,'utf8');for(const x of t.matchAll(/<I18nText\s+id=\{([^}]+)\}/g))if(/\b(status|type|level|role|visibility|category|phase|stage|access_level|document_type)\b/.test(x[1]))dynamic++}
console.log(`i18n check PASS: locales=${locales.join(',')} enumKeys=${keys.length} dynamicEnumUsages=${dynamic}`);
