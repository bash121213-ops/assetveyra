import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../../../');
const proxy = readFileSync(join(root, 'apps/web/src/proxy.ts'), 'utf8');

function protectedPathLine(): string {
  const line = proxy.split('\n').find((candidate) => candidate.includes('protectedPath ='));
  assert.ok(line, 'protectedPath definition not found in proxy.ts');
  return line;
}

function pageFiles(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return pageFiles(full);
    return entry.name === 'page.tsx' ? [full] : [];
  });
}

test('edge proxy protects every authenticated route prefix', () => {
  const line = protectedPathLine();
  for (const prefix of ['dashboard', 'onboarding', 'submit', 'workspace']) {
    assert.ok(line.includes(prefix), `proxy protectedPath is missing "${prefix}"`);
  }
});

test('every workspace page performs its own server-side auth check', () => {
  const pages = pageFiles(join(root, 'apps/web/src/app/workspace'));
  assert.ok(pages.length > 0, 'no workspace pages found');
  const unguarded = pages.filter((file) => {
    const source = readFileSync(file, 'utf8');
    return !source.includes('auth.getUser') && !source.includes("redirect('/login')");
  });
  assert.deepEqual(unguarded, [], `workspace pages without an auth guard: ${unguarded.join(', ')}`);
});

test('mutating server actions verify the authenticated user', () => {
  const actionFiles = [
    'apps/web/src/app/submit/actions.ts',
    'apps/web/src/app/workspace/assets/actions.ts',
  ];
  for (const file of actionFiles) {
    const source = readFileSync(join(root, file), 'utf8');
    assert.match(source, /auth\.getUser\(\)/, `${file} must call auth.getUser()`);
    assert.match(source, /organization_members/, `${file} must check organization membership`);
  }
});
