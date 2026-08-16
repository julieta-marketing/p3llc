import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MediaFrame } from '@/components/image-placeholder'
import { CtaLink } from '@/components/cta-button'
import { Container, Eyebrow } from '@/components/section'
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
        <section className="bg-[color:var(--surface-2)] pb-10 pt-28 md:pb-12 md:pt-36">
          <Container>
            <Reveal>
              <Link
                href="/case-studies"
                className="group inline-flex min-h-10 items-center gap-2 text-[0.76rem] font-semibold uppercase tracking-[0.13em] text-[color:var(--color-navy)] outline-none transition-colors hover:text-[color:var(--color-blue)] focus-visible:text-[color:var(--color-blue)]"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                All Case Studies
              </Link>

              <div className="mt-8 md:mt-9">
                <div className="min-w-0">
                  <h1 className="max-w-[20ch] text-balance font-sans text-[2.35rem] font-medium leading-[1.03] tracking-[-0.05em] text-[color:var(--color-navy)] sm:text-[3.45rem] sm:leading-[1.01] lg:text-[4rem]">
                    {study.title}
                  </h1>
                  <p className="mt-6 max-w-[68ch] text-[1.05rem] leading-8 text-muted-foreground md:text-[1.15rem]">
                    {study.preview}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {study.categories.map((category) => (
                      <span
                        key={category}
                        className="rounded-full border border-[color:var(--color-blue)]/20 bg-white/65 px-3.5 py-2.5 font-['Poppins'] text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--color-blue)]"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="bg-[color:var(--surface-2)]">
          <Container className="pb-12 md:pb-16">
            <Reveal variant="image">
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
            </Reveal>
          </Container>
        </section>

        <section className="case-detail-narrative bg-white py-10 md:py-12 lg:py-14">
          <Container>
            <Reveal>
              <div className="case-overview grid grid-cols-1 gap-7 border-b border-[color:var(--color-navy)]/12 pb-9 md:pb-10 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-4">
                  <Eyebrow>Project Overview</Eyebrow>
                  <h2 className="mt-4 font-sans text-3xl font-medium tracking-[-0.04em] text-[color:var(--color-dark-azure)] md:text-[2.1rem]">
                    The Project in Context
                  </h2>
                  <p className="mt-4 text-base leading-7 text-[color:var(--color-navy)]/76 md:text-lg md:leading-8">
                    {study.overview}
                  </p>
                </div>

                <aside className="lg:col-span-7 lg:col-start-6">
                  <Eyebrow>Our Role</Eyebrow>
                  <p className="mt-3.5 text-lg leading-8 text-[color:var(--color-navy)]/76 md:text-xl">
                    {study.role}
                  </p>
                </aside>
              </div>
            </Reveal>

            <Reveal className="mt-8 md:mt-10">
              <Eyebrow>Project Pathway</Eyebrow>
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

        <section className="border-t border-border bg-[color:var(--surface-2)] py-12 md:py-14">
          <Container>
            <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="max-w-[18ch] font-sans text-3xl font-medium leading-tight tracking-[-0.04em] text-[color:var(--color-dark-azure)] md:text-4xl">
                  Explore More Projects
                </h2>
              </div>
              <CtaLink href="/case-studies" variant="dark" size="lg" arrow>
                View All Case Studies
              </CtaLink>
            </Reveal>
          </Container>
        </section>

      </main>
      <SiteFooter />
    </div>
  )
}
