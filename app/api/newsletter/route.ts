import { createHash } from 'node:crypto'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const email =
    typeof body === 'object' && body !== null && 'email' in body
      ? String(body.email).trim().toLowerCase()
      : ''

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 },
    )
  }

  const apiKey = process.env.MAILCHIMP_API_KEY
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID
  const campaignName = process.env.MAILCHIMP_CAMPAIGN_NAME?.trim()
  const requestedStatus = process.env.MAILCHIMP_SUBSCRIPTION_STATUS
  const status = requestedStatus === 'subscribed' ? 'subscribed' : 'pending'
  const dataCenter = apiKey?.split('-').at(-1)

  if (!apiKey || !audienceId || !dataCenter) {
    console.error('Mailchimp integration is missing required environment variables.')
    return NextResponse.json(
      { error: 'Newsletter signup is not configured yet.' },
      { status: 503 },
    )
  }

  const memberHash = createHash('md5').update(email).digest('hex')
  const memberUrl = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${encodeURIComponent(audienceId)}/members/${memberHash}`
  const authorization = `Basic ${Buffer.from(`website:${apiKey}`).toString('base64')}`

  try {
    const response = await fetch(memberUrl, {
      method: 'PUT',
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: status,
      }),
      signal: AbortSignal.timeout(10_000),
    })

    if (!response.ok) {
      const details = (await response.json().catch(() => null)) as
        | { detail?: string; title?: string }
        | null
      console.error('Mailchimp member update failed:', response.status, details?.title)
      return NextResponse.json(
        { error: details?.detail ?? 'Unable to subscribe right now. Please try again.' },
        { status: response.status >= 500 ? 502 : 400 },
      )
    }

    if (campaignName) {
      const tagResponse = await fetch(`${memberUrl}/tags`, {
        method: 'POST',
        headers: {
          Authorization: authorization,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tags: [{ name: campaignName, status: 'active' }] }),
        signal: AbortSignal.timeout(10_000),
      })

      if (!tagResponse.ok) {
        console.error('Mailchimp campaign tag update failed:', tagResponse.status)
      }
    }

    return NextResponse.json({
      message:
        status === 'pending'
          ? 'Check your inbox to confirm your subscription.'
          : 'You are subscribed. Thank you!',
    })
  } catch (error) {
    console.error('Mailchimp request failed:', error instanceof Error ? error.message : error)
    return NextResponse.json(
      { error: 'Unable to subscribe right now. Please try again.' },
      { status: 502 },
    )
  }
}
