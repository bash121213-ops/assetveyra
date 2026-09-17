import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { I18nText } from '@/components/LocaleShell';
import PublicAssetGallery from '@/components/PublicAssetGallery';
import '@/lib/i18nOpportunity';
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
  const { data: { user } } = await s.auth.getUser();
  if (!user) redirect('/login');

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

  const { data: images } = await s
    .from('asset_images')
    .select('id,storage_path,sort_order')
    .eq('asset_id', asset.id)
    .order('sort_order', { ascending: true });

  const gallery = await Promise.all((images ?? []).map(async (image) => {
    const { data } = await s.storage.from('property-images').createSignedUrl(image.storage_path, 60 * 60);
    return { id: image.id, sort_order: image.sort_order, signed_url: data?.signedUrl ?? '' };
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
        <h1>{asset.title}</h1>

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
            <a className="button secondary" href="/contact"><I18nText id="Contact us" /></a>
            {location && <div className="deal-gate-location"><span><I18nText id="Location" /></span><strong>{location}</strong></div>}
          </aside>
        </div>
      </article>
    </main>
  );
}
