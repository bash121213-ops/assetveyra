import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().min(5).max(40),
  matter_country: z.string().trim().min(2).max(100),
  jurisdiction: z.string().trim().min(2).max(120),
  matter_type: z.enum(['real_estate', 'transaction', 'investment', 'contract', 'due_diligence', 'dispute', 'corporate', 'other']),
  role: z.enum(['investor', 'seller', 'buyer', 'company', 'other']),
  urgency: z.enum(['standard', 'soon', 'urgent']),
  description: z.string().trim().min(20).max(6000),
  desired_outcome: z.string().trim().max(3000).optional().default(''),
  consent: z.literal('true'),
  locale: z.enum(['en', 'ar', 'zh', 'es', 'fr']).default('en'),
  website: z.string().max(0).optional().default(''),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Please check the information and try again.' }, { status: 400 });
    }

    if (parsed.data.website) return NextResponse.json({ ok: true });

    const supabase = await createClient();
    const { error } = await supabase.from('legal_consultation_requests').insert({
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      phone: parsed.data.phone,
      matter_country: parsed.data.matter_country,
      jurisdiction: parsed.data.jurisdiction,
      matter_type: parsed.data.matter_type,
      role: parsed.data.role,
      urgency: parsed.data.urgency,
      description: parsed.data.description,
      desired_outcome: parsed.data.desired_outcome || null,
      consent: true,
      consent_at: new Date().toISOString(),
      locale: parsed.data.locale,
      status: 'new',
    });

    if (error) {
      console.error('Legal consultation request storage failed:', error.message);
      return NextResponse.json({ error: 'We could not receive your request. Please try again later.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Legal consultation endpoint error:', error);
    return NextResponse.json({ error: 'We could not receive your request. Please try again later.' }, { status: 500 });
  }
}
