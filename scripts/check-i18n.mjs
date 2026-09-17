#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
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

function collectObjectEntries(source, file) {
  const entries = new Map();
  const re = /(?:['"]((?:\\.|[^'"])*)['"]|([A-Za-z_$][\w$-]*))\s*:\s*\{([^{}]*)\}/g;
  for (const match of source.matchAll(re)) {
    const key = match[1] ?? match[2];
    const body = match[3];
    if (LOCALES.includes(key) || !/\b(?:en|ar|zh|es|fr)\s*:/.test(body)) continue;
    const values = {};
    for (const locale of LOCALES) {
      const valueMatch = body.match(new RegExp('\\b' + locale + '\\s*:\\s*([\'"])((?:\\\\.|(?!\\1).)*)\\1'));
      if (valueMatch) values[locale] = valueMatch[2];
    }
    if (Object.keys(values).length === 0) continue;
    if (!entries.has(key)) entries.set(key, []);
    entries.get(key).push({ file, values });
  }
  return entries;
}

const sourcesByKey = new Map();
for (const [file, source] of Object.entries(files)) {
  for (const [key, defs] of collectObjectEntries(source, file)) {
    if (!sourcesByKey.has(key)) sourcesByKey.set(key, []);
    sourcesByKey.get(key).push(...defs);
  }
  if (file === 'apps/web/src/lib/i18nQualifiedInvestors.ts') {
    const sRe = /\bs\(\s*(['"])((?:\\.|[^'"])*)\1\s*,\s*(['"])((?:\\.|[^'"])*)\3\s*,\s*(['"])((?:\\.|[^'"])*)\5\s*,\s*(['"])((?:\\.|[^'"])*)\7\s*,\s*(['"])((?:\\.|[^'"])*)\9\s*\)/g;
    for (const m of source.matchAll(sRe)) {
      const key = m[2];
      const values = { en: m[4], ar: m[6], zh: m[8], es: m[10], fr: m[12] };
      if (!sourcesByKey.has(key)) sourcesByKey.set(key, []);
      sourcesByKey.get(key).push({ file, values });
    }
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
  if (SOURCE_FILES.some((sourceFile) => path.resolve(ROOT, sourceFile) === path.resolve(file))) continue;
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
    else if (locale !== 'en' && entry[locale] === english) {
      untranslated.push({ key, locale, value: entry[locale], locations });
    }
  }
}

for (const [key, defs] of sourcesByKey) {
  const uniqueFiles = [...new Set(defs.map((d) => d.file))];
  if (uniqueFiles.length > 1) duplicates.push({ key, sources: uniqueFiles });
}

const sideEffectImports = [];
for (const file of sourcePaths) {
  const source = fs.readFileSync(file, 'utf8');
  for (const match of source.matchAll(/import\s+["']@\/lib\/i18n[^"']+["'];?/g)) {
    sideEffectImports.push({ file: path.relative(ROOT, file), import: match[0] });
  }
}

const result = {
  locales: LOCALES,
  registryKeys: registry.size,
  usedStaticKeys: used.size,
  missingCount: missing.length,
  missing: missing.slice(0, 5),
  untranslatedCount: untranslated.length,
  duplicateKeyCount: duplicates.length,
  dynamicStatusOrAssetTypeExpressions: dynamic.length,
  sideEffectI18nImports: sideEffectImports,
};

console.log(JSON.stringify(result, null, 2));

if (missing.length || sideEffectImports.length) process.exitCode = 1;
