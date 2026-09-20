import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { I18nText } from '@/components/LocaleShell';
import SubmitPropertyForm from '@/components/SubmitPropertyForm';

const SELLER_ROLES = ['seller_admin', 'seller_member', 'platform_admin', 'operations_admin'] as const;

export default async function SubmitPage() {
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) redirect('/login');
  const { data: memberships } = await s.from('organization_members').select('role').eq('user_id', user.id);
  if (!(memberships ?? []).some((m) => SELLER_ROLES.includes(m.role as typeof SELLER_ROLES[number]))) redirect('/workspace');

  return (
    <main className="app-shell">
      <header className="app-header">
        <a className="brand" href="/">ASSETVEYRA</a>
        <nav><a href="/dashboard"><I18nText id="Workspace"/></a><a href="/opportunities"><I18nText id="Marketplace"/></a></nav>
      </header>
      <section className="form-page">
        <div className="eyebrow"><I18nText id="SELLER INTAKE"/></div>
        <h1><I18nText id="Submit an asset"/></h1>
        <p><I18nText id="The record enters verification first. It is not published automatically."/></p>
        <SubmitPropertyForm />
      </section>
    </main>
  );
}
