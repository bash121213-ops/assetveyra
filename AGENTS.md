# AssetVeyra — Agent Notes

## Layout

Monorepo (npm workspaces; `pnpm-workspace.yaml` also present but root scripts use npm).

- `apps/web` — Next.js 16 App Router app (React 19, TypeScript strict, tailwind NOT used; plain CSS files).
- `packages/{domain,application,contracts,infrastructure}` — mostly placeholders.
- `supabase/migrations` — database source of truth (never edit for UI work).
- `docs/` — architecture, security, workflows.

## Commands (run from repo root)

- Install: `npm install`
- Build: `npm run build` (runs `prebuild`: `node scripts/check-i18n.mjs` + `eslint .`, then `next build`)
- Typecheck: `npm run typecheck`
- Lint: `npm run lint`
- i18n: `npm run i18n:check`
- Dev: `npm run dev` (Next dev on :3000)

## i18n architecture

- Single central registry: `apps/web/src/lib/i18nRegistry.ts` (`CENTRAL_TRANSLATION_REGISTRY`, key = English string, value = `{en,ar,zh,es,fr}`).
- `translate()` in `src/lib/i18n.ts`; components use `<I18nText id="English key"/>` or `translate(key, locale)`.
- `scripts/check-i18n.mjs` FAILS the build if any used static key is missing from the registry, missing a locale, or untranslated (non-en equal to en). It also fails on side-effect `import '@/lib/i18n...'`.
- Locale is client-side: cookie `assetveyra-locale`, `LocaleShell` sets `html.lang/dir/.rtl`. Fonts via `next/font` (`Inter` latin, `Cairo` arabic).
- When adding UI text: add the key to `i18nRegistry.ts` with all 5 locales, then use `<I18nText/>`.

## Data access (do not change schema/RLS)

- Supabase anon client: `src/lib/supabase/{client,server,config}.ts`. Config has fallback public URL/key.
- Public marketplace reads only public views: `public_opportunities`, `public_assets`, `published_asset_images`, `external_market_listings`.
- Images served through `/api/assets/images/[...path]` via `getPublicAssetImageUrl(storagePath)`.
- `proxy.ts` guards `/dashboard|onboarding|submit|account|data-room|deals|investor|seller|operations` paths.
- Roles from `organization_members.role` + `organizations.type`: seller roles `seller_admin|seller_member|platform_admin|operations_admin`; admin `platform_admin|operations_admin|compliance_officer`; reviewer adds `risk_analyst`; investor = org type `investor`.
- Real published seed opportunity: slug `coastal-commercial-land-latakia-31b21a2d` — Direct Beachfront Commercial Land — Latakia, SY, land, 8,000 m², USD 2,500,000.

## UI layer (current)

- `src/app/globals.css` — tokens (`--av-*`) + internal pages (`app-shell`, `page-head`, `panel`, `auth-page`, `form-page`, `detail`, `opportunity-grid`, workspace tables).
- `src/app/av-final.css` — public/company pages (`av-final-*`, `av-menu*`, `av-btn`, `av-section`, `av-page`, `av-card*`, `av-info-*`).
- `src/app/opportunity-detail.css`, `src/app/external-market.css`, `src/app/locale-overrides.css`.
- Chrome: `src/components/SiteChrome.tsx` (header+footer used by homepage and `CompanyInfoPage` pages). Many app pages inline their own `<header className="app-header">`.
- Approved visual direction: light institutional (white / gray-50, near-black text, amber accent, restrained emerald for verified), Cairo/Inter sans hierarchy, 12–16px radii, subtle borders/shadows.

## Rules

- UI-only changes: never touch migrations/RLS/auth logic/server actions/business logic.
- Never fabricate data (counts, prices, VDR/verification states). Derive from real records or hide.

## Verification tooling

- No component/e2e test suite; CI runs `npm run typecheck` + `npm run build` only.
- Headless Chromium is at `/usr/bin/chromium`; Playwright/Puppeteer are not installed. Node 22 has a global `WebSocket`, so CDP sweeps (overflow/console/RTL checks across viewports) can be scripted with a small throwaway
  `node` script instead of adding a dependency.
- Theme the locale by setting the `assetveyra-locale` cookie (`en|ar|zh|es|fr`) — SSR reads it in `layout.tsx`, so `curl -H "Cookie: assetveyra-locale=ar"` is enough to check real RTL output.
