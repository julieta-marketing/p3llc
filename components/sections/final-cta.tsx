import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { Reveal } from '@/components/reveal'
import { Container } from '@/components/section'

export function FinalCta() {
  return (
    <section className="final-contact-echo" aria-labelledby="final-cta-title">
      <Container className="final-contact-echo__container">
        <Reveal className="final-contact-echo__content">
          <p className="final-contact-echo__eyebrow">Start a conversation</p>

          <h2
            id="final-cta-title"
            className="case-contact-visual__heading final-contact-echo__heading"
          >
            <span>
              <span>Let&apos;s discuss your</span>
            </span>
            <span>
              <span>
                <em className="brand-title-highlight">project.</em>
              </span>
            </span>
          </h2>

          <p className="case-contact-visual__copy final-contact-echo__copy">
            Talk with our team about financing, delivery, or a public-private
            partnership.
          </p>

          <Link
            href="/contact"
            className="case-contact-visual__link final-contact-echo__link"
          >
            <span className="final-contact-echo__link-label">Contact Us</span>
            <span className="case-contact-visual__link-icon">
              <ArrowUpRight aria-hidden="true" />
            </span>
          </Link>
        </Reveal>
      </Container>
    </section>
  )
}
