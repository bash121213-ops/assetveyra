import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request, { params }: { params: Promise<{ id: string; documentId: string }> }) {
  const { id, documentId } = await params;
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: room } = await s.from('data_rooms').select('id,organization_id,opportunity_id,nda_required,download_enabled').eq('id', id).maybeSingle();
  if (!room) return NextResponse.json({ error: 'Data room not found' }, { status: 404 });
  const { data: membership } = await s.from('data_room_members').select('expires_at').eq('data_room_id', id).eq('user_id', user.id).maybeSingle();
  const { data: orgMember } = await s.from('organization_members').select('organization_id').eq('organization_id', room.organization_id).eq('user_id', user.id).maybeSingle();
  if (!membership && !orgMember) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  if (membership?.expires_at && new Date(membership.expires_at).getTime() <= Date.now()) return NextResponse.json({ error: 'Access expired' }, { status: 403 });

  if (room.nda_required && membership && !orgMember) {
    const { data: nda } = await s.from('nda_acceptances').select('id').eq('opportunity_id', room.opportunity_id).eq('organization_id', room.organization_id).eq('user_id', user.id).maybeSingle();
    if (!nda) return NextResponse.json({ error: 'NDA acceptance required' }, { status: 403 });
  }

  const { data: document } = await s.from('documents').select('id,storage_path,download_enabled').eq('id', documentId).eq('opportunity_id', room.opportunity_id).maybeSingle();
  if (!document) return NextResponse.json({ error: 'Document not found' }, { status: 404 });
  if (!room.download_enabled && !orgMember) return NextResponse.json({ error: 'Downloads are disabled for this room' }, { status: 403 });

  const { data: signed, error } = await s.storage.from('assetveyra-private').createSignedUrl(document.storage_path, 300);
  if (error || !signed?.signedUrl) return NextResponse.json({ error: error?.message || 'Unable to create signed URL' }, { status: 500 });
  return NextResponse.redirect(signed.signedUrl);
}
