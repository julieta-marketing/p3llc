'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { MediaFrame } from '@/components/image-placeholder'
import { Reveal } from '@/components/reveal'
import { Section } from '@/components/section'
import type { CaseStudy } from '@/lib/cases'

export function CaseStudies({ projects }: { projects: CaseStudy[] }) {
  return (
    <Section id="case-studies" tone="dark" className="case-feature-section">
      <div
        className="ambient-orb pointer-events-none absolute -right-40 -top-44 h-[34rem] w-[34rem] rounded-full bg-[color:var(--color-blue)]/20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="max-w-[15ch] font-sans text-[2.55rem] font-medium leading-[1.01] tracking-[-0.055em] text-white sm:text-[3.4rem] lg:text-[4.65rem]">
              CASE STUDIES
            </h2>
          </div>

          <div className="lg:col-span-4 lg:flex lg:justify-end lg:pb-2">
            <Link
              href="/case-studies"
              className="case-feature-section__all group inline-flex items-center gap-4 font-['Poppins'] text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-white outline-none"
            >
              View all case studies
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition-colors group-hover:border-[color:var(--color-azure)] group-hover:bg-[color:var(--color-azure)] group-hover:text-[color:var(--color-dark-azure)]">
                <ArrowRight className="link-arrow h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </Reveal>

        <FeaturedCaseCarousel projects={projects} />
      </div>
    </Section>
  )
}

function FeaturedCaseCarousel({ projects }: { projects: CaseStudy[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [interactionPaused, setInteractionPaused] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const hoverTimerRef = useRef<number | null>(null)
  const transitionTimerRef = useRef<number | null>(null)
  const transitioningRef = useRef(false)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const swipedRef = useRef(false)
  const activeProject = projects[activeIndex]
  const activeNumber = formatCaseNumber(activeIndex)

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel || typeof IntersectionObserver === 'undefined') {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(carousel)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (!isInView || interactionPaused || reducedMotion) return

    const timer = window.setTimeout(() => {
      const nextIndex = (activeIndex + 1) % projects.length

      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current)
      }

      transitioningRef.current = true
      setIncomingIndex(nextIndex)
      setActiveIndex(nextIndex)
      transitionTimerRef.current = window.setTimeout(() => {
        setIncomingIndex(null)
        transitioningRef.current = false
        transitionTimerRef.current = null
      }, 780)
    }, 4800)

    return () => window.clearTimeout(timer)
  }, [activeIndex, interactionPaused, isInView, projects.length])

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current !== null) {
        window.clearTimeout(hoverTimerRef.current)
      }
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current)
      }
    }
  }, [])

  function transitionToProject(index: number) {
    if (index === activeIndex || transitioningRef.current) return

    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current)
    }

    transitioningRef.current = true
    setIncomingIndex(index)
    setActiveIndex(index)
    transitionTimerRef.current = window.setTimeout(() => {
      setIncomingIndex(null)
      transitioningRef.current = false
      transitionTimerRef.current = null
    }, 780)
  }

  function scheduleProject(index: number) {
    setInteractionPaused(true)

    if (transitioningRef.current) return

    if (hoverTimerRef.current !== null) {
      window.clearTimeout(hoverTimerRef.current)
    }

    hoverTimerRef.current = window.setTimeout(() => {
      transitionToProject(index)
      hoverTimerRef.current = null
    }, 160)
  }

  function cancelScheduledProject() {
    if (hoverTimerRef.current !== null) {
      window.clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
  }

  function releaseInteraction() {
    cancelScheduledProject()
    setInteractionPaused(false)
  }

  function goToOffset(offset: number) {
    const nextIndex =
      (activeIndex + offset + projects.length) % projects.length
    transitionToProject(nextIndex)
  }

  function handleTouchStart(event: React.TouchEvent) {
    const touch = event.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
    swipedRef.current = false
    // A swipe is deliberate navigation — stop the auto-advance for good.
    setInteractionPaused(true)
  }

  function handleTouchEnd(event: React.TouchEvent) {
    const start = touchStartRef.current
    touchStartRef.current = null
    if (!start) return

    const touch = event.changedTouches[0]
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y

    // Horizontal intent only, so vertical page scrolling still works.
    if (Math.abs(dx) < 45 || Math.abs(dx) <= Math.abs(dy)) return

    swipedRef.current = true
    goToOffset(dx < 0 ? 1 : -1)
  }

  // Without this, the end of a swipe registers as a tap on the card link.
  function handleCardClick(event: React.MouseEvent) {
    if (!swipedRef.current) return
    event.preventDefault()
    swipedRef.current = false
  }

  return (
    <Reveal
      as="section"
      className="mt-14 lg:mt-20"
      aria-label="Featured case studies"
    >
      <div
        ref={carouselRef}
        className="case-switcher case-switcher--featured"
        onMouseLeave={releaseInteraction}
        onFocusCapture={() => setInteractionPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setInteractionPaused(false)
          }
        }}
      >
        <div className="case-switcher__visual">
          <div
            className="case-switcher__deck"
            role="list"
            aria-label="Featured case studies"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {projects.map((project, index) => {
              const layer =
                (index - activeIndex + projects.length) % projects.length
              const isActive = layer === 0
              const isIncoming = index === incomingIndex

              return (
                <Link
                  key={project.slug}
                  href={`/case-studies/${project.slug}`}
                  className={`case-deck-card case-deck-card--layer-${layer} ${isIncoming ? 'is-transition-entering' : ''}`}
                  data-layer={layer}
                  role="listitem"
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={`See full case study: ${project.title}`}
                  onMouseEnter={() => scheduleProject(index)}
                  onMouseLeave={cancelScheduledProject}
                  onClick={handleCardClick}
                  onFocus={() => {
                    setInteractionPaused(true)
                    transitionToProject(index)
                  }}
                >
                  <div className="case-deck-card__media">
                    <MediaFrame
                      src={project.image}
                      alt={isActive ? project.title : ''}
                      label="Project Image Pending Client Approval"
                      aspect="absolute inset-0"
                      rounded={false}
                      className="border-0 [&_img]:object-cover"
                      sizes={
                        isActive
                          ? '(min-width: 1024px) 56vw, 100vw'
                          : '(min-width: 1024px) 42vw, 88vw'
                      }
                      priority={index === 0}
                    />
                    {!isActive ? (
                      <span
                        className="absolute inset-0 bg-[color:var(--color-dark-azure)]/12"
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>

                  <div className="case-deck-card__details">
                    <p className="case-deck-card__category">
                      {project.categories[0]}
                    </p>
                    <h3 className="case-deck-card__title">{project.title}</h3>
                    {isActive ? (
                      <span className="case-deck-card__active-indicator">
                        See full case study
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    ) : null}
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Mobile-only pager: the fanned deck reads as one card there, so the
              dots are what tell you the rest exist. */}
          <div className="case-switcher__dots" aria-label="Case study pager">
            {projects.map((project, index) => (
              <button
                key={project.slug}
                type="button"
                className={`case-switcher__dot ${index === activeIndex ? 'is-active' : ''}`}
                aria-label={`Show case study: ${project.title}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                onClick={() => {
                  setInteractionPaused(true)
                  transitionToProject(index)
                }}
              />
            ))}
          </div>
        </div>

        <div className="case-switcher__content" aria-live="polite">
          <div key={activeProject.slug} className="case-switcher__text">
            <p className="case-switcher__context">
              <span>{activeNumber}</span>
              {activeProject.categories[0]}
            </p>

            <h3 className="case-switcher__title">
              {activeProject.title}
            </h3>
            <p className="case-switcher__description">
              {activeProject.preview}
            </p>
            <Link
              href={`/case-studies/${activeProject.slug}`}
              className="case-switcher__detail-link group"
            >
              <span>See full case study</span>
            </Link>
          </div>

        </div>
      </div>
    </Reveal>
  )
}

function formatCaseNumber(index: number) {
  return String(index + 1).padStart(2, '0')
}
