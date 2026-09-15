import { NextResponse } from 'next/server';
import { connect as tlsConnect, TLSSocket } from 'node:tls';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(40).optional().default(''),
  interest: z.enum(['investment', 'asset', 'partnership', 'general']),
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(0).optional().default(''),
});

const interestLabel = {
  investment: 'Investment opportunity',
  asset: 'Submit an asset',
  partnership: 'Partnership',
  general: 'General enquiry',
} as const;

function smtpError(message: string): Error {
  return new Error(`SMTP error: ${message}`);
}

async function readSmtpResponse(socket: TLSSocket, expected: number | number[]) {
  const expectedCodes = Array.isArray(expected) ? expected : [expected];

  return new Promise<string>((resolve, reject) => {
    let buffer = '';
    const timeout = setTimeout(() => {
      cleanup();
      reject(smtpError('SMTP response timeout'));
    }, 15000);

    const cleanup = () => {
      clearTimeout(timeout);
      socket.off('data', onData);
      socket.off('error', onError);
      socket.off('close', onClose);
    };

    const finish = (value: string) => {
      cleanup();
      resolve(value);
    };

    const onData = (chunk: Buffer) => {
      buffer += chunk.toString('utf8');
      const lines = buffer.split('\r\n');
      buffer = lines.pop() ?? '';
      if (!lines.length) return;

      const lastLine = lines[lines.length - 1];
      const match = lastLine.match(/^(\d{3})([ -])(.*)$/);
      if (!match || match[2] !== ' ') return;

      const code = Number(match[1]);
      if (!expectedCodes.includes(code)) {
        finish(smtpError(`${code} ${match[3]}`).message);
        return;
      }
      finish(lines.join('\r\n'));
    };

    const onError = (error: Error) => {
      cleanup();
      reject(error);
    };

    const onClose = () => {
      cleanup();
      reject(smtpError('SMTP connection closed unexpectedly'));
    };

    socket.on('data', onData);
    socket.once('error', onError);
    socket.once('close', onClose);
  });
}

async function smtpCommand(socket: TLSSocket, command: string, expected: number | number[]) {
  socket.write(`${command}\r\n`);
  return readSmtpResponse(socket, expected);
}

async function sendContactEmail({
  name,
  email,
  phone,
  interest,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  interest: keyof typeof interestLabel;
  message: string;
}) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || '465');
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const receiver = process.env.CONTACT_RECEIVER_EMAIL || user;

  if (!host || !user || !password || !receiver) {
    throw smtpError('SMTP environment variables are not configured');
  }

  const safeReplyTo = email.replace(/[\r\n]/g, '');
  const subject = `AssetVeyra enquiry — ${interestLabel[interest]}`;
  const body = [
    'New AssetVeyra contact enquiry',
    '',
    `Name: ${name}`,
    `Email: ${safeReplyTo}`,
    `Phone: ${phone || 'Not provided'}`,
    `Interest: ${interestLabel[interest]}`,
    '',
    'Message:',
    message,
  ].join('\r\n');

  const socket = await new Promise<TLSSocket>((resolve, reject) => {
    const connection = tlsConnect({
      host,
      port,
      servername: host,
      rejectUnauthorized: true,
    });
    const timeout = setTimeout(() => {
      connection.destroy();
      reject(smtpError('SMTP connection timeout'));
    }, 15000);
    connection.once('secureConnect', () => {
      clearTimeout(timeout);
      resolve(connection);
    });
    connection.once('error', (error) => {
      clearTimeout(timeout);
      reject(error);
    });
  });

  try {
    await readSmtpResponse(socket, 220);
    await smtpCommand(socket, 'EHLO assetveyra.com', 250);
    await smtpCommand(socket, 'AUTH LOGIN', 334);
    await smtpCommand(socket, Buffer.from(user, 'utf8').toString('base64'), 334);
    await smtpCommand(socket, Buffer.from(password, 'utf8').toString('base64'), 235);
    await smtpCommand(socket, `MAIL FROM:<${user}>`, 250);
    await smtpCommand(socket, `RCPT TO:<${receiver}>`, [250, 251]);

    const data = [
      `From: AssetVeyra <${user}>`,
      `To: ${receiver}`,
      `Reply-To: ${safeReplyTo}`,
      `Subject: ${subject}`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=UTF-8',
      'Content-Transfer-Encoding: 8bit',
      '',
      body,
    ]
      .join('\r\n')
      .replace(/(^|\r\n)\./g, '$1..');

    await smtpCommand(socket, 'DATA', 354);
    await smtpCommand(socket, `${data}\r\n.`, 250);
    await smtpCommand(socket, 'QUIT', 221);
  } finally {
    socket.end();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Please check the information and try again.' }, { status: 400 });
    }
    if (parsed.data.website) return NextResponse.json({ ok: true });

    const { name, email, phone, interest, message } = parsed.data;
    const supabase = await createClient();
    const { error: insertError } = await supabase
      .from('contact_submissions')
      .insert({ name, email, phone: phone || null, interest, message });

    if (insertError) {
      console.error('Contact submission storage failed:', insertError.message);
      return NextResponse.json({ error: 'We could not receive your request. Please try again later.' }, { status: 500 });
    }

    try {
      await sendContactEmail({ name, email, phone, interest, message });
    } catch (error) {
      console.error('Contact notification email failed:', error);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact endpoint error:', error);
    return NextResponse.json({ error: 'We could not receive your request. Please try again later.' }, { status: 500 });
  }
}
