#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const LOCALES = ['en', 'ar', 'zh', 'es', 'fr'];
const SOURCE_FILES = [
  'apps/web/src/lib/i18n.ts',
  'apps/web/src/lib/i18nRegistry.ts',
  'apps/web/src/lib/i18nWorkspace.ts',
  'apps/web/src/lib/i18nOpportunity.ts',
  'apps/web/src/lib/i18nAssetImages.ts',
  'apps/web/src/lib/i18nLegalConsultation.ts',
  'apps/web/src/lib/i18nQualifiedInvestors.ts',
];

const scanRoots = [
  path.join(ROOT, 'apps/web/src/app'),
  path.join(ROOT, 'apps/web/src/components'),
  path.join(ROOT, 'apps/web/src/lib'),
];

const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const files = Object.fromEntries(SOURCE_FILES.map((file) => [file, read(file)]));

function decodeString(raw) {
  try {
    return JSON.parse('"' + raw.replace(/\\/g, '\\\\').replace(/"/g, '\\\"') + '"');
  } catch {
    return raw;
  }
}

function collectRegistryEntries(source, file) {
  const entries = new Map();
  const re = /(?:['"]((?:\\.|[^'"])*)['"]|([A-Za-z_$][\\w$-]*))\\s*:\\s*\\{([^{}]*)\\}/g;
  for (const match of source.matchAll(re)) {
    const key = decodeString(match[1] ?? match[2]);
    if (LOCALES.includes(key) || ['en', 'ar', 'zh', 'es', 'fr'].includes(key)) continue;
    const body = match[3];
    if (!/\\b(?:en|ar|zh|es|fr)\\s*:/.test(body)) continue;
    const values = {};
    for (const locale of LOCALES) {
      const valueMatch = body.match(new RegExp('\\b' + locale + '\\s*:\\s*[\\\'"]((?:\\\\.|[^\\\'"])*)[\\\'"]'));
      if (valueMatch) values[locale] = valueMatch[1];
    }
    if (Object.keys(values).length === 0) continue;
    if (!entries.has(key)) entries.set(key, []);
    entries.get(key).push({ file, values });
  }
  return entries;
}

const sourcesByKey = new Map();
for (const [file, source] of Object.entries(files)) {
  for (const [key, defs] of collectRegistryEntries(source, file)) {
    if (!sourcesByKey.has(key)) sourcesByKey.set(key, []);
    sourcesByKey.get(key).push(...defs);
  }
}

const registry = new Map();
for (const [key, defs] of sourcesByKey) {
  const merged = {};
  for (const def of defs) {
    for (const locale of LOCALES) {
      if (def.values[locale] !== undefined) merged[locale] = def.values[locale];
    }
  }
  registry.set(key, merged);
}

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\\.(tsx?|jsx?)$/.test(entry.name)) out.push(full);
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
  const lines = source.split(/\\r?\\n/);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const patterns = [
      /<I18nText\\b[^>]*\\bid\\s*=\\s*["']([^"']+)["']/g,
      /<I18nText\\b[^>]*\\bid\\s*=\\s*\\{["']([^"']+)["']\\}/g,
      /\\btranslate\\(\\s*["']([^"']+)["']/g,
      /\\bresolveLocaleText\\(\\s*["']([^"']+)["']/g,
      /\\bresolveStatusLabel\\(\\s*([^,)]*)/g,
      /\\bresolveAssetTypeLabel\\(\\s*([^,)]*)/g,
    ];
    for (const re of patterns) {
      for (const match of line.matchAll(re)) {
        const raw = match[1]?.trim();
        if (!raw) continue;
        if (/^['"]/.test(raw)) recordUse(raw.slice(1, -1), file, i + 1);
        else if (re.source.includes('resolveStatusLabel') || re.source.includes('resolveAssetTypeLabel')) {
          dynamic.push({ file: path.relative(ROOT, file), line: i + 1, expression: raw });
        } else {
          recordUse(raw, file, i + 1);
        }
      }
    }
  }
}

const missing = [];
const untranslated = [];
const duplicates = [];

for (const [key, locations] of used) {
  const entry = registry.get(key);
  if (!entry) {
    missing.push({ key, locations });
    continue;
  }
  const english = entry.en ?? key;
  for (const locale of LOCALES) {
    if (!entry[locale]) missing.push({ key, locale, locations });
    else if (locale !== 'en' && entry[locale] === english) untranslated.push({ key, locale, value: entry[locale], locations });
  }
}

for (const [key, defs] of sourcesByKey) {
  const uniqueFiles = [...new Set(defs.map((d) => d.file))];
  if (uniqueFiles.length > 1) duplicates.push({ key, sources: uniqueFiles });
}

const sideEffectImports = [];
for (const file of sourcePaths) {
  const source = fs.readFileSync(file, 'utf8');
  const m = source.matchAll(/import\\s+["']@\\/lib\\/i18n[^"']+["'];?/g);
  for (const match of m) sideEffectImports.push({ file: path.relative(ROOT, file), import: match[0] });
}

const result = {
  locales: LOCALES,
  registryKeys: registry.size,
  usedStaticKeys: used.size,
  missing,
  untranslated,
  duplicateKeys: duplicates,
  dynamicStatusOrAssetTypeExpressions: dynamic,
  sideEffectI18nImports: sideEffectImports,
};

console.log(JSON.stringify(result, null, 2));

if (missing.length || duplicates.length || sideEffectImports.length || dynamic.length) {
  process.exitCode = 1;
}
