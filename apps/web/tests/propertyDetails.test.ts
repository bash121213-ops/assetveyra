import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePropertyDetails } from '../src/lib/propertyDetails.ts';

const description = 'A fully documented property description with sufficient detail for validation and controlled publication.';
const form = (value: unknown) => JSON.stringify(value);
const common = { description };

test('accepts valid residential villa details', () => {
  const result = parsePropertyDetails(form({ subtype: 'villa', common, details: { bedrooms: 5, bathrooms: 4, floors: 2, parking_spaces: 3, pool: true } }), 'residential');
  assert.equal(result.subtype, 'villa');
  assert.equal(result.details.bedrooms, 5);
});

test('accepts valid apartment details', () => {
  const result = parsePropertyDetails(form({ subtype: 'apartment', common, details: { bedrooms: 2, bathrooms: 2, floor_number: 4, total_floors: 8, balcony: true } }), 'residential');
  assert.equal(result.details.floor_number, 4);
});

test('accepts valid land details', () => {
  const result = parsePropertyDetails(form({ subtype: 'land', common, details: { land_use: 'commercial', road_access: 'direct', frontage_m: 80, electricity: true } }), 'land');
  assert.equal(result.details.land_use, 'commercial');
});

test('accepts valid hospitality details', () => {
  const result = parsePropertyDetails(form({ subtype: 'hotel', common, details: { rooms: 120, suites: 20, occupancy: 75, operating_status: 'operating' } }), 'hotel');
  assert.equal(result.details.rooms, 120);
});

test('accepts valid commercial details', () => {
  const result = parsePropertyDetails(form({ subtype: 'office', common, details: { units: 20, floors: 6, occupancy: 80 } }), 'commercial');
  assert.equal(result.subtype, 'office');
});

test('accepts valid development details', () => {
  const result = parsePropertyDetails(form({ subtype: 'development', common, details: { development_status: 'permitted', planned_units: 80, planned_area_sqm: 12000 } }), 'development_project');
  assert.equal(result.details.planned_units, 80);
});

test('rejects missing property_details', () => {
  assert.throws(() => parsePropertyDetails(null, 'residential'), /property_details_required/);
});

test('rejects malformed JSON', () => {
  assert.throws(() => parsePropertyDetails('{bad', 'residential'), /invalid_property_details/);
});

test('rejects unknown envelope keys', () => {
  assert.throws(() => parsePropertyDetails(form({ subtype: 'villa', common, details: {}, unexpected: true }), 'residential'), /invalid_property_details/);
});

test('rejects unknown detail keys', () => {
  assert.throws(() => parsePropertyDetails(form({ subtype: 'villa', common, details: { bedrooms: 4, arbitrary_key: 'x' } }), 'residential'), /invalid_property_details:details/);
});

test('rejects wrong primitive types', () => {
  assert.throws(() => parsePropertyDetails(form({ subtype: 'villa', common, details: { bedrooms: 'abc' } }), 'residential'), /invalid_property_details/);
});

test('rejects invalid numeric ranges', () => {
  assert.throws(() => parsePropertyDetails(form({ subtype: 'villa', common, details: { bedrooms: -1 } }), 'residential'), /invalid_property_details/);
  assert.throws(() => parsePropertyDetails(form({ subtype: 'hotel', common, details: { occupancy: 101 } }), 'hotel'), /invalid_property_details/);
});

test('rejects invalid construction years', () => {
  assert.throws(() => parsePropertyDetails(form({ subtype: 'villa', common: { ...common, construction_year: 1700 }, details: {} }), 'residential'), /invalid_property_details:common/);
});

test('rejects invalid enums', () => {
  assert.throws(() => parsePropertyDetails(form({ subtype: 'land', common, details: { road_access: 'teleport' } }), 'land'), /invalid_property_details/);
});

test('rejects subtype mismatch', () => {
  assert.throws(() => parsePropertyDetails(form({ subtype: 'hotel', common, details: {} }), 'residential'), /property_subtype_mismatch/);
});

test('rejects short descriptions', () => {
  assert.throws(() => parsePropertyDetails(form({ subtype: 'villa', common: { description: 'too short' }, details: {} }), 'residential'), /invalid_property_details:common\.description/);
});

test('rejects invalid asset types with otherwise valid subtype', () => {
  assert.throws(() => parsePropertyDetails(form({ subtype: 'villa', common, details: {} }), 'not_a_real_asset_type'), /property_subtype_mismatch/);
});
