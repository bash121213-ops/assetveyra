import { I18nText } from '@/components/LocaleShell';

export default function RouteLoading({ label = 'Loading' }: { label?: string }) {
  return (
    <main className="route-state" aria-busy="true" aria-live="polite">
      <div className="route-state-card">
        <span className="eyebrow"><I18nText id="Loading" /></span>
        <div className="route-skeleton route-skeleton-title" />
        <div className="route-skeleton route-skeleton-line" />
        <div className="route-skeleton route-skeleton-line route-skeleton-line-short" />
        <p className="route-state-label"><I18nText id={label} /></p>
      </div>
    </main>
  );
}
