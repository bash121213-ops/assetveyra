import { I18nText } from '@/components/LocaleShell';

type PropertyDetails = { subtype?: string; common?: Record<string, unknown>; details?: Record<string, unknown> };
const LABELS: Record<string, string> = { land_area_sqm: 'Land area m²', building_area_sqm: 'Building area m²', bedrooms: 'Bedrooms', bathrooms: 'Bathrooms', floors: 'Floors', floor_number: 'Floor number', total_floors: 'Total floors', parking_spaces: 'Parking spaces', pool: 'Pool', garden: 'Garden', furnished: 'Furnished', balcony: 'Balcony', rooms: 'Rooms', suites: 'Suites', restaurants: 'Restaurants', conference_facilities: 'Conference facilities', classification: 'Classification', operating_status: 'Operating status', occupancy: 'Occupancy %', facilities: 'Facilities', units: 'Units', current_use: 'Current use', condition: 'Condition', construction_year: 'Construction year', amenities: 'Amenities', land_use: 'Land use', zoning: 'Zoning', development_potential: 'Development potential', road_access: 'Road access', utilities: 'Utilities', water: 'Water', electricity: 'Electricity', sewage: 'Sewage', frontage_m: 'Frontage m', topography: 'Topography', development_status: 'Development status', permitted_use: 'Permitted use', planned_units: 'Planned units', planned_area_sqm: 'Planned area m²', transaction_type: 'Transaction type', negotiable: 'Negotiable', subtype: 'Property subtype' };
const PRIVATE_KEYS = new Set(['rental_income']);
function display(value: unknown): string | null { if (value === null || value === undefined || value === '') return null; if (typeof value === 'boolean') return value ? 'Yes' : 'No'; if (Array.isArray(value)) return value.length ? value.join(', ') : null; if (typeof value === 'number') return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value); return String(value).replaceAll('_', ' '); }
export default function PropertyDetailsSummary({ propertyDetails }: { propertyDetails: unknown }) {
  const value = (propertyDetails && typeof propertyDetails === 'object' ? propertyDetails : {}) as PropertyDetails;
  const common = value.common ?? {}; const details = value.details ?? {};
  const entries: Array<[string, unknown]> = [['subtype', value.subtype], ...Object.entries(details), ...Object.entries(common).filter(([key]) => key !== 'description')];
  const visible = entries.filter(([key, item]) => !PRIVATE_KEYS.has(key) && display(item) !== null && LABELS[key]);
  if (!visible.length) return <div className="empty-state"><span><I18nText id="No additional property details are available."/></span></div>;
  return <div className="facts property-detail-facts">{visible.map(([key, item]) => <div key={key}><span><I18nText id={LABELS[key]}/></span><strong>{display(item)}</strong></div>)}</div>;
}
