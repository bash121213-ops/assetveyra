import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../../../');
const migration = readFileSync(resolve(root, 'supabase/migrations/20260917165000_lock_seller_publish_controls_rc01.sql'), 'utf8');
const storagePolicy = readFileSync(resolve(root, 'supabase/migrations/20260917114500_published_property_image_select.sql'), 'utf8');

test('seller asset insert policy permits only draft/submitted states', () => {
  assert.match(migration, /status in \('draft'::asset_status, 'submitted'::asset_status\)/);
});

test('seller asset update policy requires platform role for publication transition', () => {
  assert.match(migration, /private\.has_platform_role\(array\['platform_admin'::member_role, 'operations_admin'::member_role, 'compliance_officer'::member_role, 'risk_analyst'::member_role\]\)/);
});

test('seller opportunity insert policy forces private visibility and non-published state', () => {
  assert.match(migration, /status in \('draft'::opportunity_status, 'submitted'::opportunity_status\)/);
  assert.match(migration, /visibility = 'private'/);
});

test('seller opportunity update policy does not grant direct publication', () => {
  assert.match(migration, /create policy opportunities_update/);
  assert.match(migration, /is_org_member\(owner_organization_id\) and status in \('draft'::opportunity_status, 'submitted'::opportunity_status\)/);
});

test('public storage selection is restricted to published public opportunities', () => {
  assert.match(storagePolicy, /bucket_id = 'property-images'/);
  assert.match(storagePolicy, /o\.status = 'published'::public\.opportunity_status/);
  assert.match(storagePolicy, /o\.visibility = 'public'/);
});
