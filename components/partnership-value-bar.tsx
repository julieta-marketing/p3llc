'use client'

import { useEffect, useRef, type RefObject } from 'react'

import { Reveal } from '@/components/reveal'
import { containerClass } from '@/components/section'
import { cn } from '@/lib/utils'

type InsightBandProps = {
  id: string
  title: string
  body: string
  tone?: 'navy' | 'mist'
}

/**
 * Writes a 0→1 progress value to `--band-p` as the element travels through the
 * viewport. rAF-throttled and only active while the band is on screen.
 */
function useBandProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let visible = false

    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const viewport = window.innerHeight || 1
      const progress = (viewport - rect.top) / (viewport + rect.height)
      el.style.setProperty(
        '--band-p',
        Math.min(1, Math.max(0, progress)).toFixed(3),
      )
    }

    const schedule = () => {
      if (frame || !visible) return
      frame = requestAnimationFrame(update)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) schedule()
      },
      { threshold: 0 },
    )
    observer.observe(el)

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ref])
}

/**
 * Compact full-bleed banner used to bracket the leadership section.
 * Typography-led: no photography, no pattern fills — a left accent stripe,
 * a display heading, and a lede beneath it. Ambient layers drift with scroll.
 */
function InsightBand({
  id,
  title,
  body,
  tone = 'navy',
}: InsightBandProps) {
  const isNavy = tone === 'navy'
  const bandRef = useRef<HTMLElement>(null)

  useBandProgress(bandRef)

  return (
    <aside
      ref={bandRef}
      className={cn(
        'insight-band relative isolate overflow-hidden',
        isNavy ? 'insight-band--navy text-white' : 'insight-band--mist',
      )}
      aria-labelledby={id}
    >
      <span className="insight-band__stripe" aria-hidden="true" />
      <span className="insight-band__sheen" aria-hidden="true" />
      <span className="insight-band__aura" aria-hidden="true" />
      {/* Dot grain only reads on the navy surface. */}
      {isNavy ? <span className="insight-band__grain" aria-hidden="true" /> : null}

      <div className={cn(containerClass, 'py-6 md:py-7 lg:py-8')}>
        <Reveal>
          <h2
            id={id}
            className={cn(
              'font-sans text-[1.9rem] font-medium leading-[1.05] tracking-[-0.05em] sm:text-[2.35rem] lg:whitespace-nowrap lg:text-[2.8rem]',
              isNavy ? 'text-white' : 'text-[color:var(--color-dark-azure)]',
            )}
          >
            {title}
          </h2>
        </Reveal>

        <Reveal delay={140} className="insight-band__lede mt-3 lg:mt-4">
          <p
            className={cn(
              'text-[1.35rem] leading-9 sm:text-[1.5rem] sm:leading-10 lg:text-[1.62rem] lg:leading-[2.5rem]',
              isNavy ? 'text-white/78' : 'text-[color:var(--color-dark-azure)]/72',
            )}
          >
            {body}
          </p>
        </Reveal>
      </div>
    </aside>
  )
}

export function PartnershipValueBar() {
  return (
    <InsightBand
      id="partnership-value-title"
      title="Why public-private partnerships?"
      body="Public-private partnerships help agencies deliver projects faster, expand funding opportunities, and leverage private-sector expertise to achieve better outcomes."
      tone="navy"
    />
  )
}

export function WhyP3Bar() {
  return (
    <InsightBand
      id="why-p3-band-title"
      title="Why P3 LLC?"
      body="We bring together public-sector leadership, private-sector expertise, and a trusted network of partners to help deliver complex projects."
      tone="mist"
    />
  )
}
