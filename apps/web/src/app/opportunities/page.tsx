import { createClient } from '@/lib/supabase/server';

type Opportunity = {
  id: string;
  slug: string;
  status: string;
  investment_thesis: string | null;
  structure: string | null;
  minimum_ticket: number | null;
  target_return: number | null;
  asset_id: string;
};

type Asset = {
  id: string;
  title: string;
  asset_type: string;
  country_code: string | null;
  region: string | null;
  city: string | null;
  area_sqm: number | null;
  currency: string | null;
  asking_price: number | null;
  public_summary: string | null;
};

export default async function OpportunitiesPage() {
  const s = await createClient();
  const { data: opportunities, error: opportunityError } = await s
    .from('opportunities')
    .select('id,slug,status,investment_thesis,structure,minimum_ticket,target_return,asset_id')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  let assets: Asset[] = [];
  let assetError = null;

  if (!opportunityError && opportunities?.length) {
    const assetIds = (opportunities as Opportunity[]).map((item) => item.asset_id).filter(Boolean);
    if (assetIds.length) {
      const result = await s
        .from('assets')
        .select('id,title,asset_type,country_code,region,city,area_sqm,currency,asking_price,public_summary')
        .in('id', assetIds);
      assets = (result.data ?? []) as Asset[];
      assetError = result.error;
    }
  }

  const assetById = new Map(assets.map((asset) => [asset.id, asset]));
  const rows = (opportunities ?? []).map((opportunity) => ({
    opportunity: opportunity as Opportunity,
    asset: assetById.get((opportunity as Opportunity).asset_id),
  }));

  const error = opportunityError || assetError;

  return (
    <main className="app-shell">
      <header className="app-header">
        <a className="brand" href="/">ASSETVEYRA</a>
        <nav>
          <a href="/opportunities">Marketplace</a>
          <a href="/dashboard">Workspace</a>
          <a href="/login">Sign in</a>
        </nav>
      </header>
      <section className="page-head">
        <div className="eyebrow">GLOBAL MARKETPLACE</div>
        <h1>Verified opportunities</h1>
        <p>Only opportunities that pass the publication gate are displayed. Private diligence and seller records remain protected.</p>
      </section>
      {error ? (
        <div className="form-error">The marketplace is temporarily unable to load live inventory.</div>
      ) : (
        <section className="opportunity-grid">
          {rows.map(({ opportunity, asset }) => asset ? (
            <a className="opportunity-card" href={`/opportunities/${opportunity.slug}`} key={opportunity.id}>
              <div className="card-meta">
                <span>{asset.asset_type}</span>
                <span>{asset.country_code ?? '—'}</span>
              </div>
              <h2>{asset.title}</h2>
              <p>{asset.public_summary || opportunity.investment_thesis || 'Investment opportunity'}</p>
              <div className="card-data">
                <span>{asset.city || asset.region || '—'}</span>
                <strong>{asset.asking_price ? `${asset.currency || ''} ${Number(asset.asking_price).toLocaleString()}` : 'Price on request'}</strong>
              </div>
            </a>
          ) : null)}
          {!rows.some(({ asset }) => asset) && (
            <div className="empty-state wide">
              <strong>No published opportunities</strong>
              <span>Live inventory will appear here after verification and publication approval.</span>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
