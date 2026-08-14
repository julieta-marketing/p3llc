'use client'

import { useEffect, type MouseEvent } from 'react'
import { ArrowRight } from 'lucide-react'

export function HeroProjectLink() {
  useEffect(() => {
    const hash = window.location.hash.slice(1)

    if (hash) {
      const scrollToHash = () => {
        const target = document.getElementById(decodeURIComponent(hash))
        target?.scrollIntoView({ block: 'start', behavior: 'auto' })
      }

      const frame = window.requestAnimationFrame(scrollToHash)
      const timeout = window.setTimeout(scrollToHash, 250)

      return () => {
        window.cancelAnimationFrame(frame)
        window.clearTimeout(timeout)
      }
    }

    const navigation = performance.getEntriesByType(
      'navigation',
    )[0] as PerformanceNavigationTiming | undefined

    if (navigation?.type !== 'reload') return

    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  function scrollToProjects(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()

    const target = document.getElementById('case-studies')
    if (!target) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    target.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <a
      href="#case-studies"
      onClick={scrollToProjects}
      className="group relative z-30 inline-flex min-h-12 cursor-pointer items-center gap-3 rounded-full border border-white/26 px-6 font-sans text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-white/78 outline-none transition-[border-color,background-color,color] duration-300 hover:border-[color:var(--color-azure)]/70 hover:bg-white/7 hover:text-white focus-visible:border-[color:var(--color-azure)] focus-visible:ring-2 focus-visible:ring-[color:var(--color-azure)]"
    >
      Case Studies
      <ArrowRight className="link-arrow h-4 w-4" aria-hidden="true" />
    </a>
  )
}
