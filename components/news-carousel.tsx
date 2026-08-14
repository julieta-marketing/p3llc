'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import type { NewsPost } from '@/lib/news'

/* Long enough to read a headline and its meta line without feeling hurried.
   Much under four seconds and the section reads as a ticker, not a newsroom. */
const AUTOPLAY_MS = 5_000

export function NewsCarousel({ posts }: { posts: NewsPost[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasReducedMotion, setHasReducedMotion] = useState(false)
  /* Hover and keyboard focus pause the rotation so a story cannot slide out
     from under someone who is part-way through reading or tabbing it. */
  const [isEngaged, setIsEngaged] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setHasReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  const canRotate = posts.length > 1
  const isPlaying = canRotate && !hasReducedMotion && !isEngaged

  useEffect(() => {
    if (!isPlaying) return

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % posts.length)
    }, AUTOPLAY_MS)

    return () => window.clearInterval(interval)
    /* Restarting after each transition keeps every story on screen for the
       full interval. */
  }, [isPlaying, posts.length, activeIndex])

  if (posts.length === 0) return null

  return (
    <div
      className="news-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Articles and updates"
      onMouseEnter={() => setIsEngaged(true)}
      onMouseLeave={() => setIsEngaged(false)}
      onFocus={() => setIsEngaged(true)}
      onBlur={() => setIsEngaged(false)}
    >
      {/* Silent while it rotates on its own — announcing every slide would talk
          over a screen reader user. Once focus pauses it, changes can be
          announced without interrupting the reader. */}
      <div
        className="news-carousel__stage"
        aria-live={isPlaying ? 'off' : 'polite'}
      >
        {posts.map((post, index) => {
          const isActive = index === activeIndex

          return (
            <div
              key={post.slug}
              className={`news-carousel__slide${isActive ? ' is-active' : ''}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${posts.length}`}
            >
              <Link
                href={`/news/${post.slug}`}
                className="news-minimal__item"
                aria-label={`Read full news story: ${post.title}`}
              >
                <div>
                  <div className="news-minimal__item-meta">
                    <span>{String(post.order).padStart(2, '0')}</span>
                    <span>{post.category}</span>
                    <time dateTime={post.date}>{post.displayDate}</time>
                  </div>
                  <h3>{post.title}</h3>
                  <span className="mt-4 inline-flex items-center gap-2 font-['Poppins'] text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-azure)]">
                    Read full story
                  </span>
                </div>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
