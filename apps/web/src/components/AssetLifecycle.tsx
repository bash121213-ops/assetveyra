import { I18nText } from '@/components/LocaleShell';

/**
 * Journey indicator for a submitted asset. Step labels mirror the real
 * `asset_status` enum values in the database, in their actual order.
 */
const LIFECYCLE: { id: string; step: string }[] = [
  { id: 'Submitted', step: '01' },
  { id: 'Verification', step: '02' },
  { id: 'Compliance review', step: '03' },
  { id: 'Approved', step: '04' },
  { id: 'Published', step: '05' },
];

export default function AssetLifecycle() {
  return (
    <section className="lifecycle-strip">
      <h2 className="av-visually-hidden"><I18nText id="Submission lifecycle" /></h2>
      <ol className="lifecycle">
        {LIFECYCLE.map((entry) => (
          <li className="lifecycle-step" key={entry.id}>
            <span className="lifecycle-step-index av-numeric" aria-hidden="true">{entry.step}</span>
            <span className="lifecycle-step-label"><I18nText id={entry.id} /></span>
          </li>
        ))}
      </ol>
      <p className="lifecycle-note">
        <I18nText id="The record advances only when each stage is satisfied. Nothing is published automatically." />
      </p>
    </section>
  );
}
