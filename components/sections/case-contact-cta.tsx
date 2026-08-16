'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import { Eyebrow } from '@/components/section'

const contactVisuals = [
  {
    className: 'case-contact-visual__tile--one',
    image: '/case-studies/long-beach-civic-center-approved.webp',
    position: '50% 48%',
  },
  {
    className: 'case-contact-visual__tile--two',
    image: '/case-studies/george-deukmejian-courthouse-approved.jpg',
    position: '53% 48%',
  },
  {
    className: 'case-contact-visual__tile--three',
    image: '/case-studies/long-beach-convention-center-approved.jpg',
    position: '48% 50%',
  },
  {
    className: 'case-contact-visual__tile--four',
    image: '/case-studies/queen-mary-approved.png',
    position: '52% 56%',
  },
  {
    className: 'case-contact-visual__tile--five',
    image: '/case-studies/city-of-thousand-oaks-approved.png',
    position: '54% 50%',
  },
  {
    className: 'case-contact-visual__tile--six',
    image: '/case-studies/space-beach-douglas-park-approved.jpg',
    position: '58% 50%',
  },
]

export function CaseContactCta() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(false)
  const [motionReady, setMotionReady] = useState(false)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const hashTarget = window.location.hash
      ? document.getElementById(window.location.hash.slice(1))
      : null
    const rect = section.getBoundingClientRect()
    const isAlreadyVisible =
      Boolean(hashTarget && (hashTarget === section || section.contains(hashTarget))) ||
      (rect.bottom > 0 && rect.top < window.innerHeight * 0.92)

    if (
      isAlreadyVisible ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setActive(true)
      return
    }

    setMotionReady(true)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setActive(true)
        observer.unobserve(entry.target)
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1,
      },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="project-consulting"
      ref={sectionRef}
      className={`case-contact-visual${motionReady ? ' is-motion-ready' : ''}${active ? ' is-active' : ''}`}
      aria-labelledby="case-contact-heading"
    >
      <div className="case-contact-visual__stage">
        <div className="case-contact-visual__images" aria-hidden="true">
          {contactVisuals.map((visual) => (
            <div
              key={visual.className}
              className={`case-contact-visual__tile ${visual.className}`}
            >
              <span
                className="case-contact-visual__photo"
                style={{
                  backgroundImage: `url('${visual.image}')`,
                  backgroundPosition: visual.position,
                }}
              />
            </div>
          ))}
        </div>

        <div className="case-contact-visual__content">
          <Eyebrow className="case-contact-visual__eyebrow">
            Consulting for Your Project
          </Eyebrow>
          <h2 id="case-contact-heading" className="case-contact-visual__heading">
            Move Complex Public Projects <em className="brand-title-highlight">Forward</em>
          </h2>
          <p className="case-contact-visual__copy">
            Bring us the mandate, constraints, and ambition. We help structure
            the financing, delivery strategy, and partnerships to advance the work.
          </p>
          <Link href="/contact" className="case-contact-visual__link">
            <span>Start a Conversation</span>
            <span className="case-contact-visual__link-icon">
              <ArrowUpRight aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
