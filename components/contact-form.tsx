'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CtaButton } from '@/components/cta-button'

type Errors = Record<string, string>
type Status = 'idle' | 'submitting' | 'success' | 'error'

const fieldBase =
  'min-h-14 w-full rounded-xl border border-white/14 bg-white/[0.055] px-4 py-3 text-base text-white outline-none transition-[border-color,background-color,box-shadow] duration-300 placeholder:text-white/48 hover:border-white/24 hover:bg-white/[0.07] focus-visible:border-[#67cce5]/75 focus-visible:bg-white/[0.075] focus-visible:ring-4 focus-visible:ring-[#67cce5]/10 aria-[invalid=true]:border-[#ff9b96] aria-[invalid=true]:ring-[#ff9b96]/25'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [errorMessage, setErrorMessage] = useState('')

  function validate(data: FormData): Errors {
    const next: Errors = {}
    const name = String(data.get('name') ?? '').trim()
    const organization = String(data.get('organization') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    if (!name) next.name = 'Please enter your name.'
    if (!organization) next.organization = 'Please enter your organization.'
    if (!email) next.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = 'Please enter a valid email address.'
    if (!message) next.message = 'Please add a short message.'
    else if (message.length < 10)
      next.message = 'Please provide a little more detail.'

    return next
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const found = validate(data)
    setErrors(found)

    if (Object.keys(found).length > 0) {
      const firstField = Object.keys(found)[0]
      form.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus()
      return
    }

    setErrorMessage('')
    setStatus('submitting')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      })
      const result = (await response.json().catch(() => null)) as
        | { error?: string }
        | null

      if (!response.ok) {
        throw new Error(
          result?.error ?? 'Unable to send your message. Please try again.',
        )
      }

      setStatus('success')
      form.reset()
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to send your message. Please try again.',
      )
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 rounded-xl border border-white/12 bg-white/[0.035] p-8 text-white"
      >
        <CheckCircle2 className="h-8 w-8 text-accent" aria-hidden="true" />
        <div>
          <h3 className="text-xl font-semibold text-white">
            Message Received
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/52">
            A member of the P3 LLC team will follow up to discuss possible next
            steps. We appreciate you reaching out.
          </p>
        </div>
        <CtaButton
          variant="outlineInverse"
          onClick={() => {
            setStatus('idle')
            setErrorMessage('')
          }}
          className="mt-2"
        >
          Send another message
        </CtaButton>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div
        className="absolute left-[-10000px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name} required>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
            className={fieldBase}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
        </Field>
        <Field
          label="Organization"
          name="organization"
          error={errors.organization}
          required
        >
          <input
            type="text"
            id="organization"
            name="organization"
            required
            autoComplete="organization"
            className={fieldBase}
            aria-invalid={!!errors.organization}
            aria-describedby={
              errors.organization ? 'organization-error' : undefined
            }
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Title" name="title" optional>
          <input
            type="text"
            id="title"
            name="title"
            autoComplete="organization-title"
            className={fieldBase}
          />
        </Field>
        <Field label="Email" name="email" error={errors.email} required>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            className={fieldBase}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
        </Field>
      </div>

      <Field label="How Can We Help?" name="topic" optional>
        <input
          type="text"
          id="topic"
          name="topic"
          className={fieldBase}
          placeholder="e.g. Financing strategy, delivery model, partnership opportunity"
        />
      </Field>

      <Field label="Message" name="message" error={errors.message} required>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={cn(fieldBase, 'min-h-36 resize-y')}
          placeholder="Tell us about your project, funding needs, or delivery challenges."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
      </Field>

      {status === 'error' && (
        <p
          role="alert"
          className="flex items-center gap-2 rounded-sm border border-[#ff9b96]/60 bg-[#ff9b96]/8 px-3.5 py-2.5 text-sm text-[#ff9b96]"
        >
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          {errorMessage || 'Something went wrong. Please try again.'}
        </p>
      )}

      <div className="mt-1">
        <CtaButton
          type="submit"
          size="lg"
          disabled={status === 'submitting'}
          arrow={status !== 'submitting'}
          className="w-full border-[#67cce5] bg-[#67cce5] text-[color:var(--surface-dark)] shadow-[0_12px_34px_rgba(68,190,219,0.16)] hover:border-white hover:bg-white sm:w-auto sm:min-w-44"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            'Submit'
          )}
        </CtaButton>
      </div>
    </form>
  )
}

type FieldProps = {
  label: string
  name: string
  error?: string
  required?: boolean
  optional?: boolean
  children: React.ReactNode
}

function Field({ label, name, error, required, optional, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-white/76"
      >
        {label}
        {required && (
          <>
            <span className="ml-1 text-[#67cce5]" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        )}
        {optional && (
          <span className="ml-1 text-[0.72rem] font-normal normal-case tracking-normal text-white/58">
            (optional)
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="text-[0.85rem] text-[#ff9b96]">
          {error}
        </p>
      )}
    </div>
  )
}
