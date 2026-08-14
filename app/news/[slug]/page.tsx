import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

import { CtaLink } from '@/components/cta-button'
import { Container } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getNewsPost, newsPosts } from '@/lib/news'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return newsPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getNewsPost(slug)
  if (!post) return { title: 'News — P3 LLC' }

  return {
    title: `${post.title} — P3 LLC`,
    description: post.introduction,
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const post = getNewsPost(slug)
  if (!post) notFound()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main">
        <article>
          <header className="bg-[color:var(--surface-2)] pb-12 pt-32 md:pb-16 md:pt-40">
            <Container>
              <Reveal>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  <Link
                    href="/#news"
                    className="group inline-flex min-h-8 items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[color:var(--color-navy)] outline-none transition-colors hover:text-[color:var(--color-blue)] focus-visible:text-[color:var(--color-blue)]"
                  >
                    <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                    Back to Featured News
                  </Link>
                  <Link
                    href="/news"
                    className="group inline-flex min-h-8 items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[color:var(--color-blue)] outline-none transition-colors hover:text-[color:var(--color-navy)] focus-visible:text-[color:var(--color-navy)]"
                  >
                    All News
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
                  <div className="lg:col-span-9">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-['Poppins'] text-[0.58rem] font-semibold uppercase tracking-[0.15em] text-[color:var(--color-blue)]">
                      <span>{post.category}</span>
                      <span aria-hidden="true">/</span>
                      <span>{post.publication}</span>
                      <span aria-hidden="true">/</span>
                      <time dateTime={post.date}>{post.displayDate}</time>
                    </div>
                    <h1 className="mt-7 max-w-[19ch] font-serif text-[2.9rem] leading-[0.98] tracking-[-0.04em] text-[color:var(--color-navy)] sm:text-6xl lg:text-[4.8rem]">
                      {post.title}
                    </h1>
                    <p className="mt-7 max-w-[58ch] text-lg leading-8 text-muted-foreground">
                      {post.introduction}
                    </p>
                  </div>
                  <div className="border-t border-[color:var(--color-navy)]/20 pt-4 lg:col-span-3">
                    <p className="font-sans text-lg font-medium text-[color:var(--color-dark-azure)]">
                      {post.publication}
                    </p>
                  </div>
                </div>
              </Reveal>
            </Container>
          </header>

          <section className="bg-[color:var(--surface-2)]">
            <Container className="pb-16 md:pb-24">
              <Reveal variant="image">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[color:var(--color-navy)] sm:aspect-[16/9] lg:aspect-[2/1]">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    priority
                    sizes="(min-width: 1440px) 1408px, 100vw"
                    className="object-cover"
                  />
                </div>
                {post.imageCredit ? (
                  <p className="mt-4 text-right text-[0.62rem] text-muted-foreground">
                    Image source:{' '}
                    {post.imageCreditUrl ? (
                      <a
                        href={post.imageCreditUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-[color:var(--color-blue)]/35 underline-offset-4 transition-colors hover:text-[color:var(--color-blue)]"
                      >
                        {post.imageCredit}
                      </a>
                    ) : (
                      post.imageCredit
                    )}
                  </p>
                ) : null}
              </Reveal>
            </Container>
          </section>

          <section className="bg-[color:var(--surface-1)] py-16 md:py-20 lg:py-24">
            <Container>
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
                <Reveal as="aside" className="lg:col-span-3">
                  <div className="border-t border-[color:var(--color-navy)]/15 pt-5 lg:sticky lg:top-28">
                    <p className="font-['Poppins'] text-[0.56rem] font-semibold uppercase tracking-[0.17em] text-[color:var(--color-blue)]">
                      About this repost
                    </p>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      {post.aboutThisRepost}
                    </p>
                  </div>
                </Reveal>

                <Reveal className="lg:col-span-7 lg:col-start-5">
                  <div className="space-y-7">
                    {post.content.map((block, index) =>
                      block.type === 'heading' ? (
                        <h2
                          key={`${block.type}-${index}`}
                          className="pt-6 font-sans text-2xl font-medium tracking-[-0.03em] text-[color:var(--color-dark-azure)] md:text-3xl"
                        >
                          {block.text}
                        </h2>
                      ) : block.type === 'quote' ? (
                        <blockquote
                          key={`${block.type}-${index}`}
                          className="my-10 border-l-2 border-[color:var(--color-azure)] bg-[color:var(--surface-2)] px-6 py-7 md:px-8 md:py-9"
                        >
                          <p className="font-serif text-2xl leading-snug tracking-[-0.02em] text-[color:var(--color-dark-azure)] md:text-3xl">
                            “{block.text}”
                          </p>
                          <footer className="mt-5 font-['Poppins'] text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-blue)]">
                            {block.attribution}
                          </footer>
                        </blockquote>
                      ) : (
                        <p
                          key={`${block.type}-${index}`}
                          className="font-serif text-[1.2rem] leading-[1.85] text-[color:var(--color-navy)]/82 md:text-[1.35rem]"
                        >
                          {block.text}
                        </p>
                      ),
                    )}
                  </div>
                </Reveal>
              </div>
            </Container>
          </section>
        </article>

        <section className="border-t border-border bg-[color:var(--surface-2)] py-16 md:py-20">
          <Container>
            <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-blue)]">
                  Articles and Updates
                </p>
                <h2 className="mt-4 max-w-[18ch] font-sans text-3xl font-medium leading-tight tracking-[-0.04em] text-[color:var(--color-dark-azure)] md:text-4xl">
                  {post.title}
                </h2>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Explore more P3 news and perspectives.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-end">
                <Link
                  href="/#news"
                  className="group inline-flex min-h-12 w-fit items-center gap-3 rounded-full border border-[color:var(--color-navy)] bg-[color:var(--color-navy)] px-5 font-['Poppins'] text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white outline-none transition-colors hover:border-[color:var(--color-blue)] hover:bg-[color:var(--color-blue)] focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                  Back to Featured News
                </Link>
                <Link
                  href="/news"
                  className="group inline-flex min-h-12 w-fit items-center gap-3 rounded-full border border-[color:var(--color-navy)]/25 px-5 font-['Poppins'] text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-navy)] outline-none transition-colors hover:border-[color:var(--color-navy)] hover:bg-[color:var(--color-navy)] hover:text-white focus-visible:ring-2 focus-visible:ring-ring"
                >
                  View all News
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="bg-[color:var(--color-navy)] text-white">
          <Container className="py-20 md:py-24">
            <Reveal className="grid grid-cols-1 gap-9 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7 lg:col-start-2">
                <span className="block h-px w-12 bg-[color:var(--color-azure)]" aria-hidden="true" />
                <h2 className="mt-7 font-serif text-4xl leading-tight tracking-[-0.025em] text-white md:text-5xl">
                  Let's discuss your project
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-white/68">
                  Connect with our team to discuss your project, funding needs, delivery challenges, or partnership opportunities.
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
