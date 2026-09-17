import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appDir = path.resolve(__dirname, '..');
const srcDir = path.join(appDir, 'src');

const registryFiles = [
  path.join(srcDir, 'lib', 'i18nRegistry.ts'),
  path.join(srcDir, 'lib', 'i18nWorkspace.ts'),
  path.join(srcDir, 'lib', 'i18nOpportunity.ts'),
  path.join(srcDir, 'lib', 'i18nAssetImages.ts'),
  path.join(srcDir, 'lib', 'i18nLegalConsultation.ts'),
  path.join(srcDir, 'lib', 'i18nQualifiedInvestors.ts'),
];

const usagePatterns = [
  /I18nText\s+id\s*=\s*['"]([^'"\n]+)['"]/g,
  /I18nText\s+id\s*=\s*\{\s*['"]([^'"\n]+)['"]\s*\}/g,
  /translate\(\s*['"]([^'"\n]+)['"]\s*,/g,
  /resolveLocaleText\(\s*['"]([^'"\n]+)['"]\s*,/g,
];

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function collectRegistryKeys() {
  const keys = new Set();

  for (const filePath of registryFiles) {
    const text = readText(filePath);
    for (const match of text.matchAll(/(?:^|\n)\s*(?:['"]([^'"\n]+)['"]|([A-Za-z][\w ]*))\s*:\s*\{/g)) {
      const key = match[1] ?? match[2];
      if (key) keys.add(key);
    }
  }

  return keys;
}

function findUsedKeys() {
  const used = new Set();

  function walk(currentDir) {
    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      if (['node_modules', '.next', 'dist', 'build'].includes(entry.name)) continue;
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) walk(fullPath);
      else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
        const text = readText(fullPath);
        for (const pattern of usagePatterns) {
          for (const match of text.matchAll(pattern)) {
            const key = match[1]?.trim();
            if (key) used.add(key);
          }
        }
      }
    }
  }

  walk(srcDir);
  return used;
}

function main() {
  const registryKeys = collectRegistryKeys();
  const usedKeys = findUsedKeys();
  const missing = [...usedKeys].filter((key) => !registryKeys.has(key)).sort();

  console.log('=== i18n coverage check ===');
  console.log(`Registered keys: ${registryKeys.size}`);
  console.log(`Used static keys: ${usedKeys.size}`);

  if (missing.length === 0) {
    console.log('Status: PASS');
    return;
  }

  console.log('Missing keys in translation registry:');
  for (const key of missing) console.log(`- ${key}`);
  console.log('Status: FAIL');
  process.exitCode = 1;
}

main();
