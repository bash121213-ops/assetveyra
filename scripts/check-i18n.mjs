#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LOCALES = ['en', 'ar', 'zh', 'es', 'fr'];
const REGISTRY_FILE = 'apps/web/src/lib/i18nRegistry.ts';

const scanRoots = [
  path.join(ROOT, 'apps/web/src/app'),
  path.join(ROOT, 'apps/web/src/components'),
  path.join(ROOT, 'apps/web/src/lib'),
];

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8');
}

function extractObject(source, marker) {
  const markerStart = source.indexOf(marker);
  if (markerStart < 0) throw new Error(`Marker not found: ${marker}`);
  const equals = source.indexOf('=', markerStart);
  let start = equals + 1;
  while (/\s/.test(source[start] ?? '')) start++;

  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let i = start; i < source.length; i++) {
    const char = source[i];

    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = null;
      continue;
    }

    if (char === "'" || char === '"' || char === '`') {
      quote = char;
      continue;
    }

    if (char === '{') depth++;
    else if (char === '}') {
      depth--;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }

  throw new Error(`Unbalanced object for: ${marker}`);
}

const registrySource = read(REGISTRY_FILE);
const registryObject = Function(`return (${extractObject(registrySource, 'export const CENTRAL_TRANSLATION_REGISTRY')})`)();
const registry = new Map(Object.entries(registryObject));

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) out.push(full);
  }

  return out;
}

const sourcePaths = scanRoots.flatMap(walk);
const used = new Map();
const dynamic = [];

function recordUse(key, file, line) {
  if (!used.has(key)) used.set(key, []);
  used.get(key).push({ file: path.relative(ROOT, file), line });
}

for (const file of sourcePaths) {
  const source = fs.readFileSync(file, 'utf8');
  const lines = source.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const patterns = [
      /<I18nText\b[^>]*\bid\s*=\s*["']([^"']+)["']/g,
      /<I18nText\b[^>]*\bid\s*=\s*\{["']([^"']+)["']\}/g,
      /\btranslate\(\s*["']([^"']+)["']/g,
      /\bresolveLocaleText\(\s*["']([^"']+)["']/g,
    ];

    for (const re of patterns) {
      for (const match of line.matchAll(re)) recordUse(match[1], file, i + 1);
    }

    for (const re of [/\bresolveStatusLabel\(\s*([^,)]*)/, /\bresolveAssetTypeLabel\(\s*([^,)]*)/]) {
      const match = line.match(re);
      if (!match) continue;

      const expression = match[1].trim();
      if (!/^['"][^'"]+['"]$/.test(expression)) {
        dynamic.push({ file: path.relative(ROOT, file), line: i + 1, expression });
      }
    }
  }
}

const missing = [];
const untranslated = [];

for (const [key, locations] of used) {
  const entry = registry.get(key);

  if (!entry) {
    missing.push({ key, locations });
    continue;
  }

  const english = entry.en ?? key;

  for (const locale of LOCALES) {
    if (!entry[locale]) {
      missing.push({ key, locale, locations });
    } else if (locale !== 'en' && entry[locale] === english) {
      untranslated.push({ key, locale, value: entry[locale], locations });
    }
  }
}

const sideEffectI18nImports = [];
for (const file of sourcePaths) {
  const source = fs.readFileSync(file, 'utf8');

  for (const match of source.matchAll(/import\s+["']@\/lib\/i18n[^"']+["'];?/g)) {
    sideEffectI18nImports.push({ file: path.relative(ROOT, file), import: match[0] });
  }
}

const result = {
  locales: LOCALES,
  registryKeys: registry.size,
  usedStaticKeys: used.size,
  missingCount: missing.length,
  missing: missing.map((item) => item.locale ? `${item.key} [${item.locale}]` : item.key),
  untranslatedCount: untranslated.length,
  duplicateKeyCount: 0,
  dynamicStatusOrAssetTypeExpressions: dynamic.length,
  sideEffectI18nImports,
};

console.log(JSON.stringify(result, null, 2));

if (missing.length || untranslated.length || sideEffectI18nImports.length || dynamic.length) {
  process.exitCode = 1;
}
