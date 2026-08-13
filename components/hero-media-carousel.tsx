'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { heroImages } from '@/lib/content'
import { cn } from '@/lib/utils'

const AUTOPLAY_MS = 3_000

type HeroMediaCarouselProps = {
  className?: string
}

export function HeroMediaCarousel({ className }: HeroMediaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasReducedMotion, setHasReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setHasReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    if (hasReducedMotion) return

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroImages.length)
    }, AUTOPLAY_MS)

    return () => window.clearInterval(interval)
  }, [hasReducedMotion])

  return (
    <div
      className={cn(
        'relative min-h-[22rem] w-full overflow-hidden bg-[color:var(--color-dark-azure)] sm:min-h-[30rem] lg:min-h-[min(42rem,62svh)]',
        className,
      )}
      role="region"
      aria-roledescription="carousel"
      aria-label="Approved City of Long Beach photography"
    >
      {heroImages.map((image, index) => {
        const isActive = index === activeIndex

        return (
          <div
            key={image.src}
            className={cn(
              'absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none',
              isActive ? 'z-10 opacity-100' : 'z-0 opacity-0',
            )}
            aria-hidden={!isActive}
          >
            <Image
              src={image.src}
              alt={isActive ? image.alt : ''}
              fill
              /* All three slides sit in the viewport at once, so without an
                 explicit priority split they compete for bandwidth and the
                 visible one arrives last. */
              priority={index === 0}
              loading={index === 0 ? undefined : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'low'}
              sizes="(min-width: 1180px) 60vw, 100vw"
              className="object-cover"
              style={{ objectPosition: image.position }}
            />
          </div>
        )
      })}
    </div>
  )
}
