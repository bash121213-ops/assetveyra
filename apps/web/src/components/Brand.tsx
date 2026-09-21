import { I18nText } from '@/components/LocaleShell';

/**
 * Wordmark: "ASSETVEYRA" with the "INSTITUTIONAL LAND" subtitle required by
 * the approved design. Rendered as inline SVG-free markup so it scales and
 * mirrors correctly in RTL.
 */
export default function Brand({ href = '/', compact = false }: { href?: string; compact?: boolean }) {
  return (
    <a className="av-brand" href={href} aria-label="AssetVeyra">
      <span className="av-brand-mark" aria-hidden="true">AV</span>
      <span className="av-brand-text">
        <span className="av-brand-name">ASSETVEYRA</span>
        {!compact && <span className="av-brand-sub"><I18nText id="INSTITUTIONAL LAND" /></span>}
      </span>
    </a>
  );
}
