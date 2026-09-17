'use client';

import { useEffect, useMemo, useState } from 'react';
import { I18nText } from '@/components/LocaleShell';
import { ASSET_SUBTYPES } from '@/lib/propertyDetails';

type Props = { initialAssetType?: string };
type Values = Record<string, unknown>;
const assetTypeLabels: Record<string, string> = { land: 'Land', residential: 'Residential', commercial: 'Commercial', hotel: 'Hotel', hospitality: 'Hospitality', industrial: 'Industrial', mixed_use: 'Mixed use', development_project: 'Development project', infrastructure: 'Infrastructure', renewable_energy: 'Renewable energy', other: 'Other' };
const labels: Record<string, string> = { building_area_sqm: 'Building area m²', bedrooms: 'Bedrooms', bathrooms: 'Bathrooms', floors: 'Floors', floor_number: 'Floor number', total_floors: 'Total floors', parking_spaces: 'Parking spaces', pool: 'Pool', garden: 'Garden', furnished: 'Furnished', balcony: 'Balcony', rooms: 'Rooms', suites: 'Suites', restaurants: 'Restaurants', conference_facilities: 'Conference facilities', classification: 'Classification', operating_status: 'Operating status', occupancy: 'Occupancy %', facilities: 'Facilities', units: 'Units', current_use: 'Current use', rental_income: 'Rental income', condition: 'Condition', construction_year: 'Construction year', amenities: 'Amenities', land_use: 'Land use', zoning: 'Zoning', development_potential: 'Development potential', road_access: 'Road access', utilities: 'Utilities', water: 'Water', electricity: 'Electricity', sewage: 'Sewage', frontage_m: 'Frontage m', topography: 'Topography', development_status: 'Development status', permitted_use: 'Permitted use', planned_units: 'Planned units', planned_area_sqm: 'Planned area m²', additional_rooms: 'Additional rooms' };
const subtypeLabels: Record<string, string> = { land: 'Land', agricultural_land: 'Agricultural land', development_land: 'Development land', villa: 'Villa', house: 'House', palace: 'Palace', apartment: 'Apartment', residential_building: 'Residential building', commercial: 'Commercial', office: 'Office', retail: 'Retail', hotel: 'Hotel', resort: 'Resort', apart_hotel: 'Apart-hotel', hospitality: 'Hospitality', industrial: 'Industrial', mixed_use: 'Mixed use', development: 'Development project', infrastructure: 'Infrastructure', renewable_energy: 'Renewable energy', other: 'Other' };
const fields: Record<string, string[]> = {
  land: ['land_use','zoning','development_potential','road_access','utilities','water','electricity','sewage','frontage_m','topography','development_status'],
  agricultural_land: ['land_use','road_access','utilities','water','electricity','sewage','frontage_m','topography'],
  development_land: ['zoning','development_potential','road_access','utilities','water','electricity','sewage','frontage_m','topography','development_status'],
  villa: ['building_area_sqm','bedrooms','bathrooms','floors','parking_spaces','pool','garden','furnished','condition','construction_year','additional_rooms','amenities'],
  house: ['building_area_sqm','bedrooms','bathrooms','floors','parking_spaces','pool','garden','furnished','condition','construction_year','additional_rooms','amenities'],
  palace: ['building_area_sqm','bedrooms','bathrooms','floors','parking_spaces','pool','garden','furnished','condition','construction_year','additional_rooms','amenities'],
  residential_building: ['building_area_sqm','bedrooms','bathrooms','floors','parking_spaces','condition','construction_year','amenities'],
  apartment: ['building_area_sqm','bedrooms','bathrooms','floor_number','total_floors','parking_spaces','balcony','furnished','condition','construction_year','amenities'],
  commercial: ['building_area_sqm','units','floors','occupancy','current_use','rental_income','parking_spaces','condition','amenities'],
  office: ['building_area_sqm','units','floors','occupancy','current_use','rental_income','parking_spaces','condition','amenities'],
  retail: ['building_area_sqm','units','floors','occupancy','current_use','rental_income','parking_spaces','condition','amenities'],
  industrial: ['building_area_sqm','units','floors','occupancy','current_use','rental_income','parking_spaces','condition','amenities'],
  mixed_use: ['building_area_sqm','units','floors','occupancy','current_use','rental_income','parking_spaces','condition','amenities'],
  hotel: ['building_area_sqm','rooms','suites','floors','restaurants','conference_facilities','pool','parking_spaces','classification','operating_status','occupancy','facilities'],
  resort: ['building_area_sqm','rooms','suites','floors','restaurants','conference_facilities','pool','parking_spaces','classification','operating_status','occupancy','facilities'],
  apart_hotel: ['building_area_sqm','rooms','suites','floors','restaurants','conference_facilities','pool','parking_spaces','classification','operating_status','occupancy','facilities'],
  hospitality: ['building_area_sqm','rooms','suites','floors','restaurants','conference_facilities','pool','parking_spaces','classification','operating_status','occupancy','facilities'],
  development: ['development_status','permitted_use','planned_units','planned_area_sqm','development_potential','zoning','utilities'],
  infrastructure: ['development_status','permitted_use','planned_units','planned_area_sqm','development_potential','zoning','utilities'],
  renewable_energy: ['development_status','permitted_use','planned_units','planned_area_sqm','development_potential','zoning','utilities'],
  other: [],
};
const numeric = new Set(['building_area_sqm','bedrooms','bathrooms','floors','floor_number','total_floors','parking_spaces','construction_year','rooms','suites','restaurants','occupancy','units','rental_income','frontage_m','planned_units','planned_area_sqm']);
const integerFields = new Set(['bedrooms','floors','floor_number','total_floors','parking_spaces','construction_year','rooms','suites','restaurants','units','planned_units']);
const booleanFields = new Set(['pool','garden','furnished','balcony','conference_facilities','water','electricity','sewage']);
const optionValues: Record<string, string[]> = { condition: ['new','excellent','good','fair','needs_renovation','under_construction'], land_use: ['residential','commercial','agricultural','industrial','mixed_use','recreational','institutional','other'], road_access: ['direct','shared','planned','none','unknown'], topography: ['flat','sloped','hilly','mixed','unknown'], development_status: ['raw','concept','planned','permitted','serviced','under_development','under_construction','completed'], operating_status: ['operating','closed','under_renovation','under_construction','planned'] };

function Field({ name, value, setValue }: { name: string; value: unknown; setValue: (v: unknown) => void }) {
  const label = labels[name] ?? name;
  if (booleanFields.has(name)) return <label><I18nText id={label}/><select value={value === true ? 'true' : value === false ? 'false' : ''} onChange={e => setValue(e.target.value === '' ? undefined : e.target.value === 'true')}><option value=""><I18nText id="Not specified"/></option><option value="true"><I18nText id="Yes"/></option><option value="false"><I18nText id="No"/></option></select></label>;
  if (name === 'amenities' || name === 'additional_rooms' || name === 'facilities') return <label className="full"><I18nText id={label}/><input value={Array.isArray(value) ? value.join(', ') : ''} onChange={e => setValue(e.target.value.split(',').map(v => v.trim()).filter(Boolean))}/></label>;
  if (name === 'utilities') return <label className="full"><I18nText id={label}/><select multiple value={Array.isArray(value) ? value as string[] : []} onChange={e => setValue(Array.from(e.target.selectedOptions).map(o => o.value))}><option value="water"><I18nText id="Water"/></option><option value="electricity"><I18nText id="Electricity"/></option><option value="sewage"><I18nText id="Sewage"/></option><option value="gas"><I18nText id="Gas"/></option><option value="telecom"><I18nText id="Telecom"/></option></select></label>;
  if (optionValues[name]) return <label><I18nText id={label}/><select value={typeof value === 'string' ? value : ''} onChange={e => setValue(e.target.value || undefined)}><option value=""><I18nText id="Not specified"/></option>{optionValues[name].map(v => <option key={v} value={v}><I18nText id={v.replaceAll('_', ' ')}/></option>)}</select></label>;
  const min = name === 'construction_year' ? '1800' : name === 'occupancy' ? '0' : '0';
  const max = name === 'construction_year' ? String(new Date().getFullYear() + 2) : name === 'occupancy' ? '100' : undefined;
  const step = integerFields.has(name) ? '1' : name === 'occupancy' ? '0.1' : '0.01';
  return <label><I18nText id={label}/><input type="number" min={min} max={max} step={step} value={value === undefined ? '' : String(value)} onChange={e => setValue(e.target.value === '' ? undefined : Number(e.target.value))}/></label>;
}

export default function PropertyDetailsFields({ initialAssetType = 'residential' }: Props) {
  const [assetType, setAssetType] = useState(initialAssetType);
  const first = useMemo(() => String((ASSET_SUBTYPES as Record<string, readonly string[]>)[assetType]?.[0] ?? 'other'), [assetType]);
  const [subtype, setSubtype] = useState(first); const [common, setCommonState] = useState<Values>({}); const [detail, setDetail] = useState<Values>({});
  useEffect(() => { setSubtype(first); setDetail({}); }, [first]);
  const setCommon = (key: string, value: unknown) => setCommonState(previous => ({ ...previous, [key]: value }));
  const payload = JSON.stringify({ subtype, common, details: detail }); const subtypes = (ASSET_SUBTYPES as Record<string, readonly string[]>)[assetType] ?? ['other'];
  return <div className="full" style={{ display: 'grid', gap: 14 }}>
    <label><I18nText id="Asset type"/><select name="asset_type" value={assetType} onChange={e => setAssetType(e.target.value)}>{Object.entries(assetTypeLabels).map(([value, label]) => <option key={value} value={value}><I18nText id={label}/></option>)}</select></label>
    <label><I18nText id="Property subtype"/><select name="property_subtype" value={subtype} onChange={e => { setSubtype(e.target.value); setDetail({}); }}>{subtypes.map(value => <option key={value} value={value}><I18nText id={subtypeLabels[value] ?? value}/></option>)}</select></label>
    <input type="hidden" name="property_details" value={payload} readOnly/>
    <div className="form-grid" style={{ margin: 0 }}>
      {(fields[subtype] ?? []).map(name => <Field key={name} name={name} value={detail[name]} setValue={value => setDetail(previous => ({ ...previous, [name]: value }))}/>) }
      <label className="full"><I18nText id="Full description"/><textarea rows={8} maxLength={12000} required value={String(common.description ?? '')} onChange={e => setCommon('description', e.target.value)}/></label>
      <label><I18nText id="Transaction type"/><select value={String(common.transaction_type ?? '')} onChange={e => setCommon('transaction_type', e.target.value || undefined)}><option value=""><I18nText id="Not specified"/></option><option value="sale"><I18nText id="Sale"/></option><option value="lease"><I18nText id="Lease"/></option><option value="sale_or_lease"><I18nText id="Sale or lease"/></option></select></label>
      <label><I18nText id="Negotiable"/><select value={common.negotiable === true ? 'true' : common.negotiable === false ? 'false' : ''} onChange={e => setCommon('negotiable', e.target.value === '' ? undefined : e.target.value === 'true')}><option value=""><I18nText id="Not specified"/></option><option value="true"><I18nText id="Yes"/></option><option value="false"><I18nText id="No"/></option></select></label>
    </div>
  </div>;
}
