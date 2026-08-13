import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { Container, Eyebrow } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

const contactEmail = 'projects@teamp3llc.com'

export const metadata: Metadata = {
  title: 'Privacy Policy — P3 LLC',
  description: 'Privacy policy for P3 LLC.',
  robots: { index: false, follow: true },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main id="main" className="flex-1">
        <section className="case-library-hero">
          <Container>
            <Reveal className="max-w-[52rem]">
              <Eyebrow onDark>Legal</Eyebrow>
              <h1>Privacy Policy</h1>
              <Link
                href="/"
                className="group mt-8 inline-flex min-h-12 w-fit items-center gap-3 rounded-full border border-white/30 px-5 font-['Poppins'] text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white outline-none transition-colors hover:border-[color:var(--color-azure)] hover:bg-[color:var(--color-azure)] hover:text-[color:var(--color-dark-azure)] focus-visible:ring-2 focus-visible:ring-[color:var(--color-azure)]"
              >
                <ArrowLeft
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                />
                Back to Home
              </Link>
            </Reveal>
          </Container>
        </section>

        <section className="bg-white py-20 md:py-28">
          <Container>
            <Reveal className="max-w-[62ch]">
              <p className="font-sans text-xl font-medium leading-snug tracking-[-0.025em] text-[color:var(--color-dark-azure)] sm:text-2xl">
                Our privacy policy is being updated.
              </p>

              <p className="mt-6 text-base leading-7 text-muted-foreground">
                P3 LLC is currently revising this policy. The updated version
                will be published on this page once it is finalized.
              </p>

              <p className="mt-6 text-base leading-7 text-muted-foreground">
                For questions about how we handle information submitted through
                this site in the meantime, contact us at{' '}
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-[color:var(--color-blue)] underline underline-offset-4 outline-none transition-colors hover:text-[color:var(--color-dark-azure)] focus-visible:text-[color:var(--color-dark-azure)]"
                >
                  {contactEmail}
                </a>
                .
              </p>
            </Reveal>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
