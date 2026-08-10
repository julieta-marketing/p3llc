import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MediaFrame } from '@/components/image-placeholder'
import { CtaLink } from '@/components/cta-button'
import { Container } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { caseStudies } from '@/lib/cases'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const study = caseStudies.find((item) => item.slug === slug)
  if (!study) return { title: 'Case Study — P3 LLC' }

  return {
    title: `${study.title} — P3 LLC`,
    description: study.overview,
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const studyIndex = caseStudies.findIndex((item) => item.slug === slug)
  const study = caseStudies[studyIndex]
  if (!study) notFound()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main">
        <section className="bg-[#f5f7f7] pb-10 pt-28 md:pb-12 md:pt-36">
          <Container>
            <Reveal>
              <Link
                href="/#case-studies"
                className="group inline-flex min-h-8 items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[color:var(--color-navy)] outline-none transition-colors hover:text-[color:var(--color-blue)] focus-visible:text-[color:var(--color-blue)]"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                Back to Featured Case Studies
              </Link>

              <div className="mt-8 flex items-start justify-between gap-8 md:mt-9">
                <div className="min-w-0">
                  <h1 className="max-w-[17ch] font-serif text-[2.9rem] leading-[0.98] tracking-[-0.04em] text-[color:var(--color-navy)] sm:text-6xl lg:text-[4.8rem]">
                    {study.title}
                  </h1>
                  <p className="mt-6 max-w-[55ch] text-xl leading-8 text-muted-foreground">
                    {study.preview}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {study.categories.map((category) => (
                      <span
                        key={category}
                        className="rounded-full border border-[color:var(--color-blue)]/20 bg-white/65 px-3.5 py-2.5 font-['Poppins'] text-[0.6rem] font-semibold uppercase tracking-[0.09em] text-[color:var(--color-blue)]"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="shrink-0 border-t border-[color:var(--color-navy)]/25 pt-4 text-[0.68rem] font-semibold tracking-[0.2em] text-muted-foreground">
                  {String(studyIndex + 1).padStart(2, '0')} / {String(caseStudies.length).padStart(2, '0')}
                </p>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="bg-[#f5f7f7]">
          <Container className="pb-12 md:pb-16">
            <Reveal variant="image">
              <div className="relative">
                <MediaFrame
                  src={study.image}
                  alt={study.title}
                  label="Project Image Pending Client Approval"
                  aspect="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2/1]"
                  sizes="(min-width: 1440px) 1408px, 100vw"
                  priority
                  rounded
                  className="project-image"
                />
                {study.image ? (
                  <>
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(3,28,43,0.35)] to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-0 left-0 border-r border-t border-white/30 bg-[color:var(--color-dark-azure)]/92 px-5 py-4 text-white backdrop-blur-sm md:px-7">
                      <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-azure)]">
                        Selected Outcome
                      </p>
                      <p className="mt-1.5 text-lg leading-7 text-white/90">{study.results[0]}</p>
                    </div>
                  </>
                ) : null}
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="case-detail-narrative bg-white py-10 md:py-12 lg:py-14">
          <Container>
            <Reveal>
              <div className="case-overview grid grid-cols-1 gap-7 border-b border-[color:var(--color-navy)]/12 pb-9 md:pb-10 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-4">
                  <span className="font-['Poppins'] text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-blue)]">
                    01 / Project Overview
                  </span>
                  <h2 className="mt-4 font-sans text-3xl font-medium tracking-[-0.04em] text-[color:var(--color-dark-azure)] md:text-[2.1rem]">
                    The project in context
                  </h2>
                  <p className="mt-4 text-base leading-7 text-[color:var(--color-navy)]/76 md:text-lg md:leading-8">
                    {study.overview}
                  </p>
                </div>

                <aside className="lg:col-span-7 lg:col-start-6">
                  <p className="font-['Poppins'] text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-blue)]">
                    Our Role
                  </p>
                  <p className="mt-3.5 text-lg leading-8 text-[color:var(--color-navy)]/76 md:text-xl">
                    {study.role}
                  </p>
                </aside>
              </div>
            </Reveal>

            <Reveal className="mt-8 md:mt-10">
              <span className="font-['Poppins'] text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-blue)]">
                02 / Project Pathway
              </span>
            </Reveal>

            <Reveal as="ol" className="case-flow mt-5 md:mt-6">
              <li className="case-flow__stage">
                <span className="case-flow__marker">01</span>
                <div className="case-flow__body">
                  <h3>Challenge</h3>
                  <p>{study.challenge}</p>
                </div>
              </li>

              <li className="case-flow__stage">
                <span className="case-flow__marker">02</span>
                <div className="case-flow__body">
                  <h3>Approach</h3>
                  <p>{study.approach}</p>
                </div>
              </li>

              <li className="case-flow__stage">
                <span className="case-flow__marker">03</span>
                <div className="case-flow__body">
                  <h3>Results</h3>
                  <ul className="case-flow__results">
                    {study.results.map((result) => (
                      <li key={result}>{result}</li>
                    ))}
                  </ul>
                </div>
              </li>
            </Reveal>
          </Container>
        </section>

        <section className="border-t border-border bg-[#f5f7f7] py-12 md:py-14">
          <Container>
            <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-blue)]">
                  Project Library
                </p>
                <h2 className="mt-4 max-w-[18ch] font-sans text-3xl font-medium leading-tight tracking-[-0.04em] text-[color:var(--color-dark-azure)] md:text-4xl">
                  Explore the complete project portfolio.
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-end">
                <Link
                  href="/#case-studies"
                  className="group inline-flex min-h-12 w-fit items-center gap-3 rounded-full border border-[color:var(--color-navy)] bg-[color:var(--color-navy)] px-5 font-['Poppins'] text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white outline-none transition-colors hover:border-[color:var(--color-blue)] hover:bg-[color:var(--color-blue)] focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                  Back to Featured Case Studies
                </Link>
                <Link
                  href="/case-studies"
                  className="group inline-flex min-h-12 w-fit items-center gap-3 rounded-full border border-[color:var(--color-navy)]/25 px-5 font-['Poppins'] text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-navy)] outline-none transition-colors hover:border-[color:var(--color-navy)] hover:bg-[color:var(--color-navy)] hover:text-white focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                  Return to Case Study Library
                </Link>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="bg-[color:var(--color-navy)] text-white">
          <Container className="py-16 md:py-20">
            <Reveal className="grid grid-cols-1 gap-9 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7 lg:col-start-2">
                <span className="block h-px w-12 bg-[color:var(--color-azure)]" aria-hidden="true" />
                <h2 className="mt-7 font-serif text-4xl leading-tight tracking-[-0.025em] text-white md:text-5xl">
                  Let&apos;s discuss your project
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                  Connect with our team to discuss your project, funding needs,
                  delivery challenges, or partnership opportunities.
                </p>
              </div>
              <div className="lg:col-span-3 lg:flex lg:justify-end">
                <CtaLink href="/contact" variant="light" size="lg" arrow>
                  Contact Us
                </CtaLink>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
