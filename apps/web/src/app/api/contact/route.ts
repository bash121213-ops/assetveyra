import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(40).optional().default(''),
  interest: z.enum(['investment', 'asset', 'partnership', 'general']),
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(0).optional().default(''),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: 'Please check the information and try again.' }, { status: 400 });
    if (parsed.data.website) return NextResponse.json({ ok: true });

    const { name, email, phone, interest, message } = parsed.data;
    const supabase = await createClient();
    const { error: insertError } = await supabase.from('contact_submissions').insert({ name, email, phone: phone || null, interest, message });
    if (insertError) {
      console.error('Contact submission storage failed:', insertError.message);
      return NextResponse.json({ error: 'We could not receive your request. Please try again later.' }, { status: 500 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;
    const interestLabel = { investment: 'Investment opportunity', asset: 'Submit an asset', partnership: 'Partnership', general: 'General enquiry' }[interest];

    if (apiKey && to && from) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject: `AssetVeyra enquiry — ${interestLabel}`,
          text: [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone || 'Not provided'}`, `Interest: ${interestLabel}`, '', message].join('\n'),
        }),
      });
      if (!response.ok) console.error('Resend rejected contact email:', await response.text());
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact endpoint error:', error);
    return NextResponse.json({ error: 'We could not receive your request. Please try again later.' }, { status: 500 });
  }
}
