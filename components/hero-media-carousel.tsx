'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Pause, Play } from 'lucide-react'

import { heroImages } from '@/lib/content'
import { cn } from '@/lib/utils'

const AUTOPLAY_MS = 3_000

type HeroMediaCarouselProps = {
  className?: string
}

export function HeroMediaCarousel({ className }: HeroMediaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasReducedMotion, setHasReducedMotion] = useState(false)
  /* WCAG 2.2.2 requires an in-page way to stop content that moves for more
     than five seconds. Honouring prefers-reduced-motion is not a substitute. */
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setHasReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  const isPlaying = !hasReducedMotion && !isPaused

  useEffect(() => {
    if (!isPlaying) return

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroImages.length)
    }, AUTOPLAY_MS)

    return () => window.clearInterval(interval)
  }, [isPlaying])

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

      {/* Hidden when the OS already asks for reduced motion — nothing is
          moving, so a pause control would be misleading. */}
      {!hasReducedMotion && (
        <button
          type="button"
          onClick={() => setIsPaused((paused) => !paused)}
          aria-pressed={isPaused}
          className="hero-carousel__toggle absolute bottom-4 right-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full text-white outline-none sm:bottom-5 sm:right-5"
        >
          {isPaused ? (
            <Play className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Pause className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="sr-only">
            {isPaused
              ? 'Play the background image slideshow'
              : 'Pause the background image slideshow'}
          </span>
        </button>
      )}
    </div>
  )
}
