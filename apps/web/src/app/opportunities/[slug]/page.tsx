import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { I18nText } from '@/components/LocaleShell';
import PublicAssetGallery from '@/components/PublicAssetGallery';
import { getPublicAssetImageUrl } from '@/lib/public-asset-image-url';
import '../../opportunity-detail.css';

const sectorKeys: Record<string, string> = {
  land: 'Land',
  residential: 'Residential',
  commercial: 'Commercial',
  hotel: 'Hotel',
  hospitality: 'Hospitality',
  industrial: 'Industrial',
  mixed_use: 'Mixed use',
  development_project: 'Development project',
  infrastructure: 'Infrastructure',
  renewable_energy: 'Renewable energy',
  other: 'Other',
};

function formatNumber(value: number | null) {
  return value === null ? '—' : Number(value).toLocaleString();
}

const verificationChecks = [
  ['listing_information_submitted', 'Listing information submitted'],
  ['documents_reviewed', 'Documents reviewed'],
  ['ownership_information_reviewed', 'Ownership information reviewed'],
  ['site_visit_completed', 'Site visit completed'],
] as const;

function verificationState(propertyDetails: unknown) {
  const verification = (propertyDetails as { verification?: { status?: string; checks?: Record<string, string>; note?: string } } | null)?.verification;
  const checks = verification?.checks ?? {};
  return {
    status: verification?.status || 'pending',
    note: verification?.note || '',
    checks: verificationChecks.map(([key, label]) => ({
      key,
      label,
      status: checks[key] === 'completed' || checks[key] === 'not_applicable' ? checks[key] : 'pending',
    })),
  };
}

async function registerInterest(formData: FormData) {
  'use server';
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) redirect('/login');

  const slug = String(formData.get('slug') || '');
  const { data: opportunity } = await s
    .from('opportunities')
    .select('id')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();
  if (!opportunity) redirect('/opportunities');

  const { data: membership } = await s
    .from('organization_members')
    .select('organization_id,organizations(type)')
    .eq('user_id', user.id)
    .limit(20);
  const investor = (membership ?? []).find((m: any) => m.organizations?.type === 'investor');
  if (!investor) redirect('/onboarding?next=/opportunities/' + encodeURIComponent(slug));

  const { data: existing } = await s
    .from('investor_interests')
    .select('id')
    .eq('investor_organization_id', investor.organization_id)
    .eq('opportunity_id', opportunity.id)
    .maybeSingle();

  if (!existing) {
    const { error } = await s.from('investor_interests').insert({
      investor_organization_id: investor.organization_id,
      opportunity_id: opportunity.id,
      status: 'interest',
      created_by: user.id,
    });
    if (error) redirect('/dashboard?error=interest');
  }
  redirect('/dashboard?interest=registered');
}

export default async function OpportunityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = await createClient();

  const { data: opportunity } = await s
    .from('public_opportunities')
    .select('id,slug,status,investment_thesis,structure,minimum_ticket,target_return,asset_id')
    .eq('slug', slug)
    .maybeSingle();
  if (!opportunity) notFound();

  const { data: asset } = await s
    .from('public_assets')
    .select('id,title,asset_type,country_code,region,city,area_sqm,currency,asking_price,public_summary')
    .eq('id', opportunity.asset_id)
    .maybeSingle();
  if (!asset || asset.asking_price === null || Number(asset.asking_price) < 100000) redirect('/opportunities');

  const verificationPromise = s
    .from('verification_cases')
    .select('status,category,decision_reason,resolved_at')
    .eq('opportunity_id', opportunity.id)
    .order('opened_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const similarPromise = s
    .from('public_opportunities')
    .select('id,slug,asset_id')
    .eq('status', 'published')
    .neq('id', opportunity.id)
    .limit(12);

  const imagesPromise = s
    .from('published_asset_images')
    .select('id,storage_path,sort_order')
    .eq('asset_id', asset.id)
    .order('sort_order', { ascending: true });

  const [{ data: verification }, { data: similarOpportunities }, { data: images }] = await Promise.all([
    verificationPromise,
    similarPromise,
    imagesPromise,
  ]);

  const similarAssetIds = (similarOpportunities ?? []).map((item) => item.asset_id).filter(Boolean);
  const { data: similarAssets } = similarAssetIds.length
    ? await s
        .from('public_assets')
        .select('id,title,asset_type,country_code,city,area_sqm,currency,asking_price')
        .in('id', similarAssetIds)
    : { data: [] };

  const similarById = new Map((similarAssets ?? []).map((item) => [item.id, item]));
  const similar = (similarOpportunities ?? [])
    .map((item) => ({ opportunity: item, asset: similarById.get(item.asset_id) }))
    .filter((item) => item.asset && Number(item.asset.asking_price ?? 0) >= 100000)
    .sort((a, b) => {
      const aSameCity = a.asset?.city && a.asset.city === asset.city ? 2 : 0;
      const bSameCity = b.asset?.city && b.asset.city === asset.city ? 2 : 0;
      const aSameType = a.asset?.asset_type === asset.asset_type ? 1 : 0;
      const bSameType = b.asset?.asset_type === asset.asset_type ? 1 : 0;
      return (bSameCity + bSameType) - (aSameCity + aSameType);
    })
    .slice(0, 3);

  const gallery = (images ?? []).map((image) => ({
    id: image.id,
    sort_order: image.sort_order,
    src: getPublicAssetImageUrl(image.storage_path),
  }));

  const location = [asset.city, asset.region, asset.country_code].filter(Boolean).join(', ');
  const currency = asset.currency || 'USD';

  return (
    <main className="app-shell">
      <header className="app-header">
        <a className="brand" href="/">ASSETVEYRA</a>
        <nav>
          <a href="/opportunities"><I18nText id="Marketplace" /></a>
          <a href="/workspace"><I18nText id="Overview" /></a>
          <form action="/logout" method="post">
            <button className="text-button" type="submit"><I18nText id="Sign out" /></button>
          </form>
        </nav>
      </header>

      <article className="detail opportunity-detail-page">
        <a className="detail-back" href="/opportunities">← <I18nText id="Back to opportunities" /></a>
        <div className="eyebrow"><I18nText id="Published opportunity" /> · <I18nText id="Controlled access" /></div>
        <div className="detail-title-row">
          <div>
            <h1>{asset.title}</h1>
            <div className="detail-reference"><I18nText id="Reference" />: {slug}</div>
          </div>
        </div>

        <PublicAssetGallery images={gallery} />

        <div className="detail-grid">
          <section>
            <div className="section-heading">
              <div className="eyebrow"><I18nText id="Public information" /></div>
              <h2><I18nText id="Opportunity details" /></h2>
            </div>

            <div className="facts">
              <div><span><I18nText id="Asset type" /></span><strong>{sectorKeys[asset.asset_type] ? <I18nText id={sectorKeys[asset.asset_type]} /> : asset.asset_type}</strong></div>
              <div><span><I18nText id="Country" /></span><strong>{asset.country_code || '—'}</strong></div>
              <div><span><I18nText id="Region" /></span><strong>{asset.region || '—'}</strong></div>
              <div><span><I18nText id="City" /></span><strong>{asset.city || '—'}</strong></div>
              <div><span><I18nText id="Area" /></span><strong>{asset.area_sqm !== null ? `${formatNumber(asset.area_sqm)} m²` : '—'}</strong></div>
              <div><span><I18nText id="Asking price" /></span><strong>{currency} {formatNumber(Number(asset.asking_price))}</strong></div>
              <div><span><I18nText id="Minimum ticket" /></span><strong>{opportunity.minimum_ticket !== null ? `${currency} ${formatNumber(Number(opportunity.minimum_ticket))}` : '—'}</strong></div>
              <div><span><I18nText id="Target return" /></span><strong>{opportunity.target_return !== null ? `${formatNumber(Number(opportunity.target_return))}%` : '—'}</strong></div>
            </div>

            {asset.public_summary && (
              <div className="detail-information single-information-block">
                <div className="detail-information-block">
                  <div className="eyebrow"><I18nText id="Description" /></div>
                  <p>{asset.public_summary}</p>
                </div>
              </div>
            )}

            {verification && (() => {
              const granular = verificationState(null);
              return (
                <div className="verification-panel">
                  <div>
                    <div className="eyebrow"><I18nText id="Verification status" /></div>
                    <strong>
                      {granular.status === 'approved'
                        ? <I18nText id="Verified within documented scope" />
                        : granular.status === 'rejected'
                          ? <I18nText id="Verification rejected" />
                          : <I18nText id="Verification in progress" />}
                    </strong>
                  </div>
                  <div className="verification-items">
                    {granular.checks.map((check) => (
                      <span key={check.key}>
                        <I18nText id={check.label} /> · {check.status === 'completed' ? <I18nText id="Completed" /> : check.status === 'not_applicable' ? <I18nText id="Not applicable" /> : <I18nText id="Pending" />}
                      </span>
                    ))}
                  </div>
                  {granular.note && <p>{granular.note}</p>}
                  {verification.decision_reason && verification.decision_reason !== granular.note && <p>{verification.decision_reason}</p>}
                </div>
              );
            })()}

            <div className="detail-information">
              <div className="detail-information-block">
                <div className="eyebrow"><I18nText id="Investment thesis" /></div>
                <p>{opportunity.investment_thesis || asset.public_summary || '—'}</p>
              </div>
              <div className="detail-information-block">
                <div className="eyebrow"><I18nText id="Transaction structure" /></div>
                <p>{opportunity.structure || '—'}</p>
              </div>
            </div>

            <div className="panel transaction-path-panel">
              <div className="eyebrow"><I18nText id="TRANSACTION PATH" /></div>
              <div className="lifecycle">
                <div className="lifecycle-step"><span>01</span><strong><I18nText id="Interest" /></strong></div>
                <div className="lifecycle-step"><span>02</span><strong><I18nText id="Qualify" /></strong></div>
                <div className="lifecycle-step"><span>03</span><strong><I18nText id="NDA" /></strong></div>
                <div className="lifecycle-step"><span>04</span><strong><I18nText id="Data Room" /></strong></div>
                <div className="lifecycle-step"><span>05</span><strong><I18nText id="Due Diligence" /></strong></div>
                <div className="lifecycle-step"><span>06</span><strong><I18nText id="Offer" /></strong></div>
              </div>
            </div>
          </section>

          <aside className="deal-gate">
            <div className="eyebrow"><I18nText id="Investor access" /></div>
            <h2><I18nText id="Register qualified interest" /></h2>
            <p><I18nText id="Additional ownership, legal, financial or technical material may require qualification, confidentiality terms or Data Room access." /></p>
            <form action={registerInterest}>
              <input type="hidden" name="slug" value={slug} />
              <button className="button primary" type="submit"><I18nText id="Register interest" /></button>
            </form>
            <a className="button secondary" href={`/contact?opportunity=${encodeURIComponent(asset.title)}`}><I18nText id="Contact us" /></a>
            {location && <div className="deal-gate-location"><span><I18nText id="Location" /></span><strong>{location}</strong></div>}
          </aside>
        </div>

        {similar.length > 0 && (
          <section className="similar-properties">
            <div className="section-heading">
              <div className="eyebrow"><I18nText id="More opportunities" /></div>
              <h2><I18nText id="Similar properties" /></h2>
            </div>
            <div className="similar-properties-grid">
              {similar.map(({ opportunity: similarOpportunity, asset: similarAsset }) => similarAsset && (
                <a className="similar-property-card" href={`/opportunities/${similarOpportunity.slug}`} key={similarOpportunity.id}>
                  <div className="card-meta">
                    <span>{sectorKeys[similarAsset.asset_type] ? <I18nText id={sectorKeys[similarAsset.asset_type]} /> : similarAsset.asset_type}</span>
                    <span>{similarAsset.country_code || '—'}</span>
                  </div>
                  <h3>{similarAsset.title}</h3>
                  <span>{[similarAsset.city, similarAsset.country_code].filter(Boolean).join(', ') || '—'}</span>
                  <strong>{similarAsset.currency || 'USD'} {formatNumber(Number(similarAsset.asking_price))}</strong>
                </a>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
