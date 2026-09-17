import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { I18nText } from '@/components/LocaleShell';
import { translate } from '@/lib/i18n';
import '@/lib/i18nWorkspace';

const SELLER_ROLES = ['seller_admin', 'operations_admin', 'deal_manager', 'platform_admin'] as const;

async function getContext(interestId: string) {
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) redirect('/login');

  const { data: interest } = await s
    .from('investor_interests')
    .select('id,status,created_at,updated_at,investor_organization_id,opportunity_id,opportunities(id,slug,owner_organization_id,investment_thesis,assets(title,currency,asking_price))')
    .eq('id', interestId)
    .maybeSingle();

  if (!interest) notFound();
  return { s, user, interest };
}

async function recordTransition(
  s: Awaited<ReturnType<typeof createClient>>,
  actorId: string,
  organizationId: string,
  interestId: string,
  from: string,
  to: string,
  reason: string,
) {
  const { error: workflowError } = await s.from('workflow_events').insert({
    organization_id: organizationId,
    actor_id: actorId,
    event_type: 'investor_interest.transitioned',
    entity_type: 'investor_interest',
    entity_id: interestId,
    payload: { from, to, reason },
  });
  if (workflowError) throw new Error(workflowError.message);

  const { error: auditError } = await s.from('audit_events').insert({
    organization_id: organizationId,
    actor_id: actorId,
    action: 'investor_interest.transitioned',
    entity_type: 'investor_interest',
    entity_id: interestId,
    previous_state: { status: from },
    new_state: { status: to },
    metadata: { reason },
  });
  if (auditError) throw new Error(auditError.message);
}

async function qualifyInterest(formData: FormData) {
  'use server';
  const interestId = String(formData.get('interest_id') || '');
  const { s, user, interest } = await getContext(interestId);
  const ownerOrg = (interest as any).opportunities?.owner_organization_id;
  if (!ownerOrg) throw new Error('Opportunity owner is missing.');

  const { data: sellerMember } = await s
    .from('organization_members')
    .select('organization_id,role')
    .eq('user_id', user.id)
    .eq('organization_id', ownerOrg)
    .in('role', [...SELLER_ROLES])
    .maybeSingle();
  if (!sellerMember) throw new Error('Only an authorized seller or deal operator can qualify an investor.');
  if (interest.status !== 'interest') throw new Error('Only a new investor interest can be qualified.');

  const { data: updated, error } = await s
    .from('investor_interests')
    .update({ status: 'qualified' })
    .eq('id', interestId)
    .eq('status', 'interest')
    .select('status')
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!updated) throw new Error('Interest changed before qualification could be completed.');
  await recordTransition(s, user.id, ownerOrg, interestId, 'interest', 'qualified', 'seller_qualification');
  redirect(`/workspace/interests/${interestId}`);
}

async function requestNda(formData: FormData) {
  'use server';
  const interestId = String(formData.get('interest_id') || '');
  const { s, user, interest } = await getContext(interestId);
  const ownerOrg = (interest as any).opportunities?.owner_organization_id;
  if (!ownerOrg) throw new Error('Opportunity owner is missing.');

  const { data: sellerMember } = await s
    .from('organization_members')
    .select('organization_id,role')
    .eq('user_id', user.id)
    .eq('organization_id', ownerOrg)
    .in('role', [...SELLER_ROLES])
    .maybeSingle();
  if (!sellerMember) throw new Error('Only an authorized seller or deal operator can request an NDA.');
  if (interest.status !== 'qualified') throw new Error('Investor qualification must be completed first.');

  const { data: updated, error } = await s
    .from('investor_interests')
    .update({ status: 'nda_pending' })
    .eq('id', interestId)
    .eq('status', 'qualified')
    .select('status')
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!updated) throw new Error('Interest changed before the NDA request could be recorded.');
  await recordTransition(s, user.id, ownerOrg, interestId, 'qualified', 'nda_pending', 'nda_requested');
  redirect(`/workspace/interests/${interestId}`);
}

async function advanceAfterNda(formData: FormData) {
  'use server';
  const interestId = String(formData.get('interest_id') || '');
  const { s, user, interest } = await getContext(interestId);
  if (interest.status !== 'nda_pending' && interest.status !== 'nda_signed') {
    throw new Error('The interest is not at the NDA gate.');
  }

  const investorOrg = interest.investor_organization_id;
  const { data: investorMember } = await s
    .from('organization_members')
    .select('organization_id')
    .eq('user_id', user.id)
    .eq('organization_id', investorOrg)
    .maybeSingle();
  if (!investorMember) throw new Error('Only an investor organization member can advance this interest.');

  const { data: nda } = await s
    .from('nda_acceptances')
    .select('id')
    .eq('opportunity_id', interest.opportunity_id)
    .eq('organization_id', investorOrg)
    .eq('user_id', user.id)
    .maybeSingle();
  if (!nda) throw new Error('The NDA must be accepted before the transaction can enter the data-room stage.');

  if (interest.status === 'nda_pending') {
    const { data: signed, error } = await s
      .from('investor_interests')
      .update({ status: 'nda_signed' })
      .eq('id', interestId)
      .eq('status', 'nda_pending')
      .select('status')
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!signed) throw new Error('Interest changed before NDA signing could be recorded.');
    await recordTransition(s, user.id, investorOrg, interestId, 'nda_pending', 'nda_signed', 'nda_acceptance_verified');
    redirect(`/workspace/interests/${interestId}`);
  }

  const { data: room } = await s
    .from('data_rooms')
    .select('id,status')
    .eq('opportunity_id', interest.opportunity_id)
    .in('status', ['active', 'open'])
    .maybeSingle();
  if (!room) throw new Error('No active data room is available for this opportunity.');

  const { data: membership } = await s
    .from('data_room_members')
    .select('id,expires_at')
    .eq('data_room_id', room.id)
    .eq('organization_id', investorOrg)
    .eq('user_id', user.id)
    .maybeSingle();
  if (!membership || (membership.expires_at && new Date(membership.expires_at) <= new Date())) {
    throw new Error('Data-room access has not been granted or has expired.');
  }

  const { data: moved, error } = await s
    .from('investor_interests')
    .update({ status: 'data_room' })
    .eq('id', interestId)
    .eq('status', 'nda_signed')
    .select('status')
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!moved) throw new Error('Interest changed before data-room access could be recorded.');
  await recordTransition(s, user.id, investorOrg, interestId, 'nda_signed', 'data_room', 'data_room_access_verified');
  redirect(`/workspace/interests/${interestId}`);
}

async function startDiligence(formData: FormData) {
  'use server';
  const interestId = String(formData.get('interest_id') || '');
  const { s, user, interest } = await getContext(interestId);
  if (interest.status !== 'data_room') throw new Error('Data-room access must be active before diligence begins.');

  const { data: member } = await s
    .from('organization_members')
    .select('organization_id')
    .eq('user_id', user.id)
    .eq('organization_id', interest.investor_organization_id)
    .maybeSingle();
  if (!member) throw new Error('Only the investor organization can start diligence.');

  const { data: openCase } = await s
    .from('due_diligence_cases')
    .select('id,status')
    .eq('opportunity_id', interest.opportunity_id)
    .eq('organization_id', interest.investor_organization_id)
    .in('status', ['open', 'in_review'])
    .maybeSingle();
  if (!openCase) {
    const { data: newCase, error: caseError } = await s
      .from('due_diligence_cases')
      .insert({ organization_id: interest.investor_organization_id, opportunity_id: interest.opportunity_id, status: 'open', started_at: new Date().toISOString() })
      .select('id')
      .single();
    if (caseError) throw new Error(caseError.message);
    await s.from('workflow_events').insert({
      organization_id: interest.investor_organization_id,
      actor_id: user.id,
      event_type: 'due_diligence.started',
      entity_type: 'due_diligence_case',
      entity_id: newCase.id,
      payload: { interest_id: interestId },
    });
  }

  const { data: moved, error } = await s
    .from('investor_interests')
    .update({ status: 'diligence' })
    .eq('id', interestId)
    .eq('status', 'data_room')
    .select('status')
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!moved) throw new Error('Interest changed before diligence could be started.');
  await recordTransition(s, user.id, interest.investor_organization_id, interestId, 'data_room', 'diligence', 'diligence_started');
  redirect(`/workspace/interests/${interestId}`);
}

async function submitOffer(formData: FormData) {
  'use server';
  const interestId = String(formData.get('interest_id') || '');
  const { s, user, interest } = await getContext(interestId);
  const amount = Number(formData.get('amount') || 0);
  const currency = String(formData.get('currency') || 'USD').toUpperCase();
  const terms = String(formData.get('terms') || '').trim();
  if (!amount || amount <= 0) throw new Error('Offer amount must be greater than zero.');
  if (!/^[A-Z]{3}$/.test(currency)) throw new Error('Currency must be a three-letter ISO code.');
  if (interest.status !== 'diligence' && interest.status !== 'offer') throw new Error('A formal offer is available only after diligence has started.');

  const { data: member } = await s
    .from('organization_members')
    .select('organization_id')
    .eq('user_id', user.id)
    .eq('organization_id', interest.investor_organization_id)
    .maybeSingle();
  if (!member) throw new Error('Only an investor organization member can submit this offer.');

  const { data: existing } = await s
    .from('offers')
    .select('id')
    .eq('interest_id', interestId)
    .in('status', ['submitted', 'countered'])
    .limit(1);
  if (existing?.length) throw new Error('An active offer already exists for this interest.');

  const { error } = await s.from('offers').insert({
    interest_id: interestId,
    submitted_by: user.id,
    amount,
    currency,
    terms: { summary: terms },
    status: 'submitted',
  });
  if (error) throw new Error(error.message);

  const previous = interest.status;
  const { error: updateError } = await s
    .from('investor_interests')
    .update({ status: 'offer' })
    .eq('id', interestId)
    .in('status', ['diligence', 'offer']);
  if (updateError) throw new Error(updateError.message);
  if (previous === 'diligence') await recordTransition(s, user.id, interest.investor_organization_id, interestId, 'diligence', 'offer', 'formal_offer_submitted');
  redirect('/workspace/interests');
}

async function acceptOffer(formData: FormData) {
  'use server';
  const interestId = String(formData.get('interest_id') || '');
  const offerId = String(formData.get('offer_id') || '');
  const { s, user, interest } = await getContext(interestId);
  if (interest.status !== 'offer' && interest.status !== 'negotiation') throw new Error('Only an active offer can be accepted.');
  const ownerOrg = (interest as any).opportunities?.owner_organization_id;
  if (!ownerOrg) throw new Error('Opportunity owner is missing.');

  const { data: ownerMember } = await s
    .from('organization_members')
    .select('organization_id,role')
    .eq('user_id', user.id)
    .eq('organization_id', ownerOrg)
    .in('role', [...SELLER_ROLES])
    .maybeSingle();
  if (!ownerMember) throw new Error('Only an authorized seller/deal operator can accept an offer.');

  const { data: offer } = await s
    .from('offers')
    .select('id,status,interest_id,amount,currency,submitted_by')
    .eq('id', offerId)
    .eq('interest_id', interestId)
    .maybeSingle();
  if (!offer) notFound();

  const { data: accepted } = await s
    .from('offers')
    .update({ status: 'accepted' })
    .eq('id', offerId)
    .in('status', ['submitted', 'countered'])
    .select('id')
    .maybeSingle();
  if (!accepted) throw new Error('Offer is no longer available for acceptance.');

  const { error: interestError } = await s
    .from('investor_interests')
    .update({ status: 'accepted' })
    .eq('id', interestId)
    .in('status', ['offer', 'negotiation']);
  if (interestError) throw new Error(interestError.message);

  const { data: deal, error: dealError } = await s.from('deals').insert({
    organization_id: ownerOrg,
    opportunity_id: interest.opportunity_id,
    buyer_organization_id: interest.investor_organization_id,
    seller_organization_id: ownerOrg,
    accepted_offer_id: offerId,
    status: 'initiated',
  }).select('id').single();
  if (dealError) throw new Error(dealError.message);

  const { error: participantsError } = await s.from('deal_participants').insert([
    { deal_id: deal.id, user_id: user.id, role: 'seller' },
    { deal_id: deal.id, user_id: offer.submitted_by, role: 'buyer' },
  ]);
  if (participantsError) throw new Error(participantsError.message);

  const { error: eventError } = await s.from('deal_events').insert({
    deal_id: deal.id,
    event_type: 'offer.accepted',
    actor_id: user.id,
    payload: { offer_id: offerId, amount: offer.amount, currency: offer.currency },
  });
  if (eventError) throw new Error(eventError.message);

  const { error: workflowError } = await s.from('workflow_events').insert({
    organization_id: ownerOrg,
    actor_id: user.id,
    event_type: 'deal.created',
    entity_type: 'deal',
    entity_id: deal.id,
    payload: { accepted_offer_id: offerId, interest_id: interestId },
  });
  if (workflowError) throw new Error(workflowError.message);
  redirect('/workspace/deals');
}

export default async function InterestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { s, user, interest: i } = await getContext(id);
  const { data: offers } = await s.from('offers').select('id,amount,currency,status,expires_at,created_at,terms,submitted_by').eq('interest_id', id).order('created_at', { ascending: false });

  const ownerOrg = (i as any).opportunities?.owner_organization_id as string | undefined;
  const { data: sellerMember } = ownerOrg ? await s.from('organization_members').select('organization_id,role').eq('user_id', user.id).eq('organization_id', ownerOrg).in('role', [...SELLER_ROLES]).maybeSingle() : { data: null };
  const isSeller = Boolean(sellerMember);
  const isInvestor = Boolean((await s.from('organization_members').select('organization_id').eq('user_id', user.id).eq('organization_id', i.investor_organization_id).maybeSingle()).data);

  const { data: nda } = isInvestor ? await s.from('nda_acceptances').select('id').eq('opportunity_id', i.opportunity_id).eq('organization_id', i.investor_organization_id).eq('user_id', user.id).maybeSingle() : { data: null };
  const { data: room } = isInvestor ? await s.from('data_rooms').select('id,status').eq('opportunity_id', i.opportunity_id).in('status', ['active', 'open']).maybeSingle() : { data: null };
  const { data: roomMembership } = room && isInvestor ? await s.from('data_room_members').select('id,expires_at').eq('data_room_id', room.id).eq('organization_id', i.investor_organization_id).eq('user_id', user.id).maybeSingle() : { data: null };
  const dataRoomReady = Boolean(roomMembership && (!roomMembership.expires_at || new Date(roomMembership.expires_at) > new Date()));

  return (
    <main className="app-shell">
      <header className="app-header"><a className="brand" href="/">ASSETVEYRA</a><nav><a href="/workspace"><I18nText id="Workspace" /></a><a href="/opportunities"><I18nText id="Marketplace" /></a></nav></header>
      <section className="page-head"><div className="eyebrow"><I18nText id="Investment interest" /></div><h1>{(i as any).opportunities?.assets?.title || 'Opportunity'}</h1><p><I18nText id="Pipeline state" />: <strong>{i.status}</strong>. <I18nText id="Each transaction stage is gated by authorization and the required evidence." /></p></section>

      <section className="panel">
        <div className="detail-grid">
          <section>
            <div className="facts">
              <div><span><I18nText id="Asking price" /></span><strong>{(i as any).opportunities?.assets?.asking_price ? `${(i as any).opportunities.assets.currency || ''} ${Number((i as any).opportunities.assets.asking_price).toLocaleString()}` : '—'}</strong></div>
              <div><span><I18nText id="Interest opened" /></span><strong>{new Date(i.created_at).toLocaleDateString()}</strong></div>
              <div><span><I18nText id="Offers" /></span><strong>{offers?.length || 0}</strong></div>
            </div>

            <div style={{ marginTop: 35 }}>
              <div className="eyebrow"><I18nText id="Transaction gates" /></div>
              <div className="table">
                {isSeller && i.status === 'interest' && <div className="row"><strong><I18nText id="Qualification" /></strong><span><I18nText id="Initial investor review" /></span><span><I18nText id="Required" /></span><form action={qualifyInterest}><input type="hidden" name="interest_id" value={id}/><button className="button primary" type="submit"><I18nText id="Qualify investor" /></button></form></div>}
                {isSeller && i.status === 'qualified' && <div className="row"><strong>NDA</strong><span><I18nText id="Request controlled disclosure" /></span><span><I18nText id="Required" /></span><form action={requestNda}><input type="hidden" name="interest_id" value={id}/><button className="button primary" type="submit"><I18nText id="Request NDA" /></button></form></div>}
                {isInvestor && (i.status === 'nda_pending' || i.status === 'nda_signed') && <div className="row"><strong><I18nText id="NDA / data room" /></strong><span>{nda ? (dataRoomReady ? translate('NDA accepted and data-room access verified', locale) : translate('NDA accepted; waiting for data-room access', locale)) : translate('Accept the NDA to continue', locale)}</span><span>{nda ? <I18nText id="Ready" /> : <I18nText id="Blocked" />}</span>{nda && <form action={advanceAfterNda}><input type="hidden" name="interest_id" value={id}/><button className="button primary" type="submit">{i.status === 'nda_pending' ? 'Record NDA signed' : 'Enter data room'}</button></form>}</div>}
                {isInvestor && i.status === 'data_room' && <div className="row"><strong><I18nText id="Due diligence" /></strong><span><I18nText id="Start the formal diligence case" /></span><span>{dataRoomReady ? <I18nText id="Ready" /> : <I18nText id="Blocked" />}</span>{dataRoomReady && <form action={startDiligence}><input type="hidden" name="interest_id" value={id}/><button className="button primary" type="submit"><I18nText id="Start diligence" /></button></form>}</div>}
              </div>
            </div>

            <div style={{ marginTop: 35 }}>
              <div className="eyebrow"><I18nText id="Offers" /></div>
              <div className="table">
                {(offers ?? []).map((o: any) => <div className="row" key={o.id}><strong>{o.currency} {Number(o.amount).toLocaleString()}</strong><span>{o.status}</span><span>{new Date(o.created_at).toLocaleDateString()}</span><span>{o.expires_at ? new Date(o.expires_at).toLocaleDateString() : translate('No expiry', locale)}</span>{isSeller && (i.status === 'offer' || i.status === 'negotiation') && ['submitted', 'countered'].includes(o.status) && <form action={acceptOffer}><input type="hidden" name="interest_id" value={id}/><input type="hidden" name="offer_id" value={o.id}/><button className="button primary" type="submit"><I18nText id="Accept & open deal" /></button></form>}</div>)}
                {!(offers?.length) && <div className="empty-state"><strong><I18nText id="No offers submitted." /></strong><span><I18nText id="Formal offers become available only after diligence has started." /></span></div>}
              </div>
            </div>
          </section>

          <aside className="deal-gate">
            <div className="eyebrow"><I18nText id="Formal offer" /></div><h2><I18nText id="Submit an offer" /></h2>
            <p><I18nText id="Offers are gated until the investor reaches the diligence stage. This prevents a commercial offer from bypassing qualification, NDA and controlled disclosure." /></p>
            {isInvestor && (i.status === 'diligence' || i.status === 'offer') ? <form action={submitOffer} className="form-grid" style={{ gridTemplateColumns: '1fr' }}><input type="hidden" name="interest_id" value={id}/><label><I18nText id="Amount" /><input name="amount" type="number" min="1" step="0.01" required/></label><label><I18nText id="Currency" /><input name="currency" maxLength={3} defaultValue={(i as any).opportunities?.assets?.currency || 'USD'}/></label><label><I18nText id="Commercial terms" /><textarea name="terms" rows={6} placeholder={translate('Key conditions, due diligence conditions, target closing…', locale)}/></label><button className="button primary" type="submit"><I18nText id="Submit formal offer" /></button></form> : <div className="empty-state"><strong><I18nText id="Offer gate locked" /></strong><span><I18nText id="Current stage" />: {i.status}. <I18nText id="Complete the required transaction gates first." /></span></div>}
          </aside>
        </div>
      </section>
    </main>
  );
}
