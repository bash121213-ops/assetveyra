import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
  ...nextVitals,
  { rules: { '@next/next/no-html-link-for-pages': 'off' } },
  { files: ['src/app/workspace/data-rooms/**/page.tsx'], rules: { 'react-hooks/purity': 'off' } },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
