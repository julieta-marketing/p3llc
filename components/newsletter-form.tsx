'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'

type NewsletterFormProps = {
  id: string
  variant?: 'footer' | 'case-study' | 'news'
}

export function NewsletterForm({ id, variant = 'footer' }: NewsletterFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const email = String(new FormData(form).get('email') ?? '').trim()

    setStatus('submitting')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const result = (await response.json()) as { message?: string; error?: string }

      if (!response.ok) throw new Error(result.error || 'Unable to subscribe.')

      setStatus('success')
      setMessage(result.message || 'Thank you for subscribing!')
      form.reset()
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Unable to subscribe.')
    }
  }

  const isCaseStudy = variant === 'case-study'
  const isNews = variant === 'news'
  const isLightSurface = isCaseStudy || isNews

  return (
    <form
      onSubmit={handleSubmit}
      className={
        isCaseStudy
          ? 'case-contact-visual__signup'
          : isNews
            ? 'news-minimal__signup'
            : 'mt-7 max-w-md'
      }
    >
      <label
        htmlFor={id}
        className={
          isCaseStudy
            ? 'case-contact-visual__signup-label'
            : isNews
              ? 'sr-only'
              : 'text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white/68'
        }
      >
        {isCaseStudy || isNews
          ? 'Receive P3 news and project updates'
          : 'Sign up for email updates'}
      </label>
      <div
        className={
          isCaseStudy
            ? 'case-contact-visual__signup-field'
            : isNews
              ? 'news-minimal__signup-field'
              : 'mt-3 flex min-h-12 items-center rounded-md border border-white/30 px-4 transition-colors focus-within:border-[color:var(--color-azure)]'
        }
      >
        <input
          id={id}
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={status === 'submitting'}
          placeholder={
            isCaseStudy
              ? 'Enter your email address'
              : isNews
                ? 'Email for P3 news & updates'
                : 'Your email address'
          }
          className={
            isCaseStudy
              ? undefined
              : isNews
                ? 'news-minimal__signup-input'
                : 'min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/58'
          }
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={
            isCaseStudy
              ? undefined
              : isNews
                ? 'news-minimal__signup-button'
                : 'group ml-3 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/75 outline-none transition-colors hover:bg-white hover:text-[color:var(--color-dark-azure)] focus-visible:ring-2 focus-visible:ring-[color:var(--color-azure)] disabled:opacity-60'
          }
          aria-label="Sign up for P3 email updates"
        >
          {status === 'submitting' ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : status === 'success' ? (
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ArrowRight
              className={
                isCaseStudy
                  ? undefined
                  : isNews
                    ? 'h-4 w-4'
                    : 'h-4 w-4 transition-transform group-hover:translate-x-0.5'
              }
              aria-hidden="true"
            />
          )}
        </button>
      </div>
      {message && (
        <p
          role={status === 'error' ? 'alert' : 'status'}
          className={`mt-2 text-xs ${
            status === 'error'
              ? isLightSurface
                ? 'text-red-700'
                : 'text-red-300'
              : isLightSurface
                ? 'text-[color:var(--color-dark-azure)]/65'
                : 'text-white/65'
          }`}
        >
          {message}
        </p>
      )}
    </form>
  )
}
