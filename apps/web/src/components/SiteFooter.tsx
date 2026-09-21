import { I18nText, LanguageSelect } from '@/components/LocaleShell';
import { FOOTER_GROUPS } from '@/components/navigation';

/** Shared public footer. All links map to real routes. */
export default function SiteFooter() {
  return (
    <footer className="av-footer">
      <div className="av-footer-inner">
        <div className="av-footer-grid">
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <h3><I18nText id={group.title} /></h3>
              {group.links.map((link) => (
                <a key={`${group.title}-${link.href}-${link.label}`} href={link.href}>
                  <I18nText id={link.label} />
                </a>
              ))}
              {group.title === 'Policies' && (
                <span className="av-footer-disabled"><I18nText id="AML/KYC" /> — <I18nText id="Draft" /></span>
              )}
            </div>
          ))}

          <div>
            <h3><I18nText id="Contact Us" /></h3>
            <a href="/contact"><I18nText id="info@assetveyra.com" /></a>
            <a href="tel:+353899450711"><I18nText id="+353 899 450 711" /></a>
          </div>
        </div>

        <div className="av-footer-disclaimer">
          <I18nText id="We are an intermediary and transaction coordinator." />{' '}
          <I18nText id="We do not guarantee a sale or profit." />{' '}
          <I18nText id="We do not receive transaction funds." />
        </div>

        <div className="av-footer-signature">
          <div className="av-footer-copy">
            <I18nText id="Copyright" /> <span>&copy;</span> 2026 <I18nText id="Kassab and Sons for Land and Real Estate Trading" />.
          </div>
          <div className="av-footer-lang">
            <I18nText id="Language" />
            <LanguageSelect />
          </div>
        </div>
      </div>
    </footer>
  );
}
