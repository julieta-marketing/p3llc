import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { CaseStudyLibrary } from '@/components/case-study-library'
import { Container, Eyebrow } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { caseStudies } from '@/lib/cases'

export const metadata: Metadata = {
  title: 'Case Studies — P3 LLC',
  description:
    'Explore P3 LLC project experience across alternative financing, alternative delivery, expert networks, and economic development implementation.',
}

export default function CaseStudiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main">
        <section className="case-library-hero">
          <Container>
            <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-12">
                <Eyebrow onDark>Project Library</Eyebrow>
                <h1>All Case Studies</h1>
                <Link
                  href="/#case-studies"
                  className="group mt-8 inline-flex min-h-12 w-fit items-center gap-3 rounded-full border border-white/30 px-5 font-['Poppins'] text-[0.76rem] font-semibold uppercase tracking-[0.13em] text-white outline-none transition-colors hover:border-[color:var(--color-azure)] hover:bg-[color:var(--color-azure)] hover:text-[color:var(--color-dark-azure)] focus-visible:ring-2 focus-visible:ring-[color:var(--color-azure)]"
                >
                  <ArrowLeft
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                  />
                  Back to Featured Case Studies
                </Link>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="case-library-section">
          <Container>
            <CaseStudyLibrary studies={caseStudies} />
          </Container>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
