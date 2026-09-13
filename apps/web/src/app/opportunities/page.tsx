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

const MIN_PUBLIC_VALUE = 100_000;

export default async function OpportunitiesPage() {
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
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
  const rows = (opportunities ?? [])
    .map((opportunity) => ({ opportunity: opportunity as Opportunity, asset: assetById.get((opportunity as Opportunity).asset_id) }))
    .filter(({ asset }) => Boolean(asset?.asking_price && Number(asset.asking_price) >= MIN_PUBLIC_VALUE));

  const error = opportunityError || assetError;

  return (
    <main className="app-shell">
      <header className="app-header">
        <a className="brand" href="/">ASSETVEYRA</a>
        <nav>
          <a href="/opportunities">Opportunities</a>
          <a href="/dashboard">Workspace</a>
          {user ? <form action="/logout" method="post"><button className="text-button">Sign out</button></form> : <a href="/login">Sign in</a>}
        </nav>
      </header>
      <section className="page-head">
        <div className="eyebrow">GLOBAL OPPORTUNITIES</div>
        <h1>Selected investment opportunities</h1>
        <p>Opportunities start at $100,000. Public visitors see only the country and value. Register to access the available opportunity information.</p>
      </section>
      {error ? (
        <div className="form-error">The marketplace is temporarily unable to load live inventory.</div>
      ) : (
        <section className="opportunity-grid">
          {rows.map(({ opportunity, asset }) => asset ? (
            <a className="opportunity-card" href={user ? `/opportunities/${opportunity.slug}` : '/login'} key={opportunity.id}>
              {user ? (
                <>
                  <div className="card-meta"><span>{asset.asset_type}</span><span>{asset.country_code ?? '—'}</span></div>
                  <h2>{asset.title}</h2>
                  <p>{asset.public_summary || opportunity.investment_thesis || 'Investment opportunity'}</p>
                  <div className="card-data"><span>{asset.city || asset.region || '—'}</span><strong>{asset.currency || 'USD'} {Number(asset.asking_price).toLocaleString()}</strong></div>
                </>
              ) : (
                <>
                  <div className="card-meta"><span>Investment opportunity</span><span>{asset.country_code ?? '—'}</span></div>
                  <h2>{asset.country_code ?? 'Global'}</h2>
                  <p>Register to view opportunity details.</p>
                  <div className="card-data"><span>Value</span><strong>{asset.currency || 'USD'} {Number(asset.asking_price).toLocaleString()}</strong></div>
                </>
              )}
            </a>
          ) : null)}
          {!rows.some(({ asset }) => asset) && (
            <div className="empty-state wide">
              <strong>No published opportunities</strong>
              <span>Eligible opportunities from $100,000 will appear here after verification and publication approval.</span>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
