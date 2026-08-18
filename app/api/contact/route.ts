import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const RESEND_ENDPOINT = 'https://api.resend.com/emails'
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clean(value: unknown, maximumLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maximumLength) : ''
}

function escapeHtml(value: string) {
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  }
  return value.replace(/[&<>'"]/g, (character) => entities[character])
}

type Submission = {
  name: string
  organization: string
  title: string
  email: string
  topic: string
  message: string
}

function emailHtml(submission: Submission) {
  const safe = {
    name: escapeHtml(submission.name),
    organization: escapeHtml(submission.organization),
    title: escapeHtml(submission.title || 'Not provided'),
    email: escapeHtml(submission.email),
    topic: escapeHtml(submission.topic || 'Not provided'),
    message: escapeHtml(submission.message).replace(/\n/g, '<br>'),
  }

  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>New P3 LLC project inquiry</title>
      <style>
        @media only screen and (max-width: 620px) {
          .email-shell { padding: 16px 8px !important; }
          .email-panel { border-radius: 16px !important; }
          .email-header, .email-body { padding: 28px 22px !important; }
          .detail-label, .detail-value { display: block !important; width: auto !important; }
          .detail-label { padding-bottom: 4px !important; }
          .detail-value { padding-top: 0 !important; }
        }
      </style>
    </head>
    <body style="margin:0;padding:0;background:#e9f0f3;color:#062f47;font-family:Arial,Helvetica,sans-serif">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">New project inquiry from ${safe.name} via the P3 LLC website.</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#e9f0f3">
        <tr>
          <td class="email-shell" align="center" style="padding:42px 16px">
            <table class="email-panel" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:680px;overflow:hidden;border:1px solid #d7e2e7;border-radius:22px;background:#ffffff;box-shadow:0 18px 50px rgba(6,47,71,0.10)">
              <tr>
                <td class="email-header" style="padding:34px 40px;background:#062f47;color:#ffffff">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="color:#75d6ee;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase">P3 LLC / Contact</td>
                      <td align="right" style="color:rgba(255,255,255,0.46);font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase">New inquiry</td>
                    </tr>
                  </table>
                  <h1 style="margin:26px 0 0;color:#ffffff;font-size:32px;font-weight:500;line-height:1.12;letter-spacing:-0.8px">New project inquiry</h1>
                  <p style="margin:12px 0 0;color:rgba(255,255,255,0.62);font-size:14px;line-height:1.65">A new contact request was submitted through the P3 LLC website.</p>
                </td>
              </tr>
              <tr>
                <td class="email-body" style="padding:38px 40px 40px">
                  <p style="margin:0 0 14px;color:#6a7f8a;font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase">Contact details</p>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border:1px solid #dbe5e9;border-radius:14px;background:#f8fbfc;border-collapse:separate;overflow:hidden">
                    <tr>
                      <td class="detail-label" style="width:155px;padding:15px 18px;border-bottom:1px solid #e1e9ec;color:#71858f;font-size:11px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase">Name</td>
                      <td class="detail-value" style="padding:15px 18px;border-bottom:1px solid #e1e9ec;color:#0b344a;font-size:14px;font-weight:600;line-height:1.5">${safe.name}</td>
                    </tr>
                    <tr>
                      <td class="detail-label" style="width:155px;padding:15px 18px;border-bottom:1px solid #e1e9ec;color:#71858f;font-size:11px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase">Email</td>
                      <td class="detail-value" style="padding:15px 18px;border-bottom:1px solid #e1e9ec;font-size:14px;line-height:1.5"><a href="mailto:${safe.email}" style="color:#087ca3;text-decoration:none">${safe.email}</a></td>
                    </tr>
                    <tr>
                      <td class="detail-label" style="width:155px;padding:15px 18px;border-bottom:1px solid #e1e9ec;color:#71858f;font-size:11px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase">Organization</td>
                      <td class="detail-value" style="padding:15px 18px;border-bottom:1px solid #e1e9ec;color:#173f55;font-size:14px;line-height:1.5">${safe.organization}</td>
                    </tr>
                    <tr>
                      <td class="detail-label" style="width:155px;padding:15px 18px;color:#71858f;font-size:11px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase">Title <span style="color:#9babb3;font-size:9px;font-weight:400;letter-spacing:0;text-transform:none">(optional)</span></td>
                      <td class="detail-value" style="padding:15px 18px;color:#173f55;font-size:14px;line-height:1.5">${safe.title}</td>
                    </tr>
                  </table>

                  <p style="margin:30px 0 14px;color:#6a7f8a;font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase">Project brief</p>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border:1px solid #dbe5e9;border-radius:14px;background:#ffffff;border-collapse:separate;overflow:hidden">
                    <tr>
                      <td style="padding:18px 20px;border-bottom:1px solid #e1e9ec">
                        <p style="margin:0 0 8px;color:#71858f;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase">How can we help? <span style="color:#9babb3;font-size:9px;font-weight:400;letter-spacing:0;text-transform:none">(optional)</span></p>
                        <p style="margin:0;color:#173f55;font-size:14px;line-height:1.65">${safe.topic}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:20px;background:#f3f8fa">
                        <p style="margin:0 0 10px;color:#71858f;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase">Message</p>
                        <p style="margin:0;color:#173f55;font-size:15px;line-height:1.75">${safe.message}</p>
                      </td>
                    </tr>
                  </table>

                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px">
                    <tr>
                      <td>
                        <a href="mailto:${safe.email}" style="display:inline-block;padding:13px 20px;border-radius:999px;background:#062f47;color:#ffffff;font-size:11px;font-weight:700;letter-spacing:1px;text-decoration:none;text-transform:uppercase">Reply to ${safe.name}</a>
                      </td>
                    </tr>
                  </table>
                  <p style="margin:24px 0 0;color:#91a1a9;font-size:11px;line-height:1.6">Submitted through the P3 LLC website contact form. Replying to this email will contact the sender directly.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`
}

export async function POST(request: Request) {
  let body: Record<string, unknown>

  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Bots commonly populate this field. Silently accept without sending.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true })

  const submission: Submission = {
    name: clean(body.name, 100),
    organization: clean(body.organization, 140),
    title: clean(body.title, 120),
    email: clean(body.email, 254).toLowerCase(),
    topic: clean(body.topic, 180),
    message: clean(body.message, 5000),
  }

  if (
    submission.name.length < 2 ||
    !submission.organization ||
    !emailPattern.test(submission.email) ||
    submission.message.length < 10
  ) {
    return NextResponse.json(
      { error: 'Please complete all required fields with valid information.' },
      { status: 422 },
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    'Epictopia <contact@epictopia.ai>'
  const to = process.env.CONTACT_TO_EMAIL?.trim() || 'Projects@P3LLC.net'

  if (!apiKey) {
    console.error('Contact form is missing RESEND_API_KEY.')
    return NextResponse.json(
      { error: 'Email delivery is not configured yet.' },
      { status: 503 },
    )
  }

  const subjectName = submission.name.replace(/[\r\n]+/g, ' ')

  try {
    const resendResponse = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: submission.email,
        subject: `P3 LLC website inquiry — ${subjectName}`,
        html: emailHtml(submission),
        text: [
          'New P3 LLC website inquiry',
          `Name: ${submission.name}`,
          `Organization: ${submission.organization}`,
          `Title: ${submission.title || 'Not provided'}`,
          `Email: ${submission.email}`,
          `Topic: ${submission.topic || 'General inquiry'}`,
          '',
          submission.message,
        ].join('\n'),
      }),
      signal: AbortSignal.timeout(10_000),
    })

    const resendResult = (await resendResponse.json().catch(() => null)) as
      | { id?: string; message?: string }
      | null

    if (!resendResponse.ok) {
      console.error(
        'Resend rejected contact email:',
        resendResponse.status,
        resendResult?.message,
      )
      return NextResponse.json(
        { error: 'Unable to send your message right now. Please try again.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true, id: resendResult?.id })
  } catch (error) {
    console.error(
      'Contact email delivery failed:',
      error instanceof Error ? error.message : error,
    )
    return NextResponse.json(
      { error: 'Unable to send your message right now. Please try again.' },
      { status: 502 },
    )
  }
}
