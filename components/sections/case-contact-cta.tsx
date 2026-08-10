'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const contactVisuals = [
  { className: 'case-contact-visual__tile--one', position: '0% 0%' },
  { className: 'case-contact-visual__tile--two', position: '50% 0%' },
  { className: 'case-contact-visual__tile--three', position: '50% 50%' },
  { className: 'case-contact-visual__tile--four', position: '0% 85%' },
  { className: 'case-contact-visual__tile--five', position: '50% 100%' },
  { className: 'case-contact-visual__tile--six', position: '100% 100%' },
]

export function CaseContactCta() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting)
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
      },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`case-contact-visual${active ? ' is-active' : ''}`}
      aria-labelledby="case-contact-heading"
    >
      <div className="case-contact-visual__stage">
        <div className="case-contact-visual__images" aria-hidden="true">
          {contactVisuals.map((visual) => (
            <div
              key={visual.className}
              className={`case-contact-visual__tile ${visual.className}`}
              style={{ backgroundPosition: visual.position }}
            />
          ))}
        </div>

        <div className="case-contact-visual__content">
          <h2 id="case-contact-heading" className="case-contact-visual__heading">
            Consulting for <em className="brand-title-highlight">Your Project.</em>
          </h2>
          <p className="case-contact-visual__copy">
            Talk with our team about financing, delivery, or a public-private
            partnership.
          </p>
          <Link href="/contact" className="case-contact-visual__link">
            <span>Contact Us</span>
            <span className="case-contact-visual__link-icon">
              <ArrowUpRight aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
