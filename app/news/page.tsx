import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

import { Container, Eyebrow } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { newsPosts } from '@/lib/news'

export const metadata: Metadata = {
  title: 'News — P3 LLC',
  description:
    'Read P3 LLC news, project features, public-private partnership insights, and company updates.',
}

export default function NewsLibraryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main">
        <section className="case-library-hero">
          <Container>
            <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-9">
                <Eyebrow onDark>Articles and Updates</Eyebrow>
                <h1>News</h1>
                <Link
                  href="/#news"
                  className="group mt-8 inline-flex min-h-12 w-fit items-center gap-3 rounded-full border border-white/30 px-5 font-['Poppins'] text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white outline-none transition-colors hover:border-[color:var(--color-azure)] hover:bg-[color:var(--color-azure)] hover:text-[color:var(--color-dark-azure)] focus-visible:ring-2 focus-visible:ring-[color:var(--color-azure)]"
                >
                  <ArrowLeft
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                  />
                  Back to Featured News
                </Link>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="case-library-section">
          <Container>
            <Reveal className="case-library__toolbar">
              <div>
                <p className="font-['Poppins'] text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-blue)]">
                  Latest
                </p>
                <h2 className="mt-3 font-sans text-3xl font-medium tracking-[-0.04em] text-[color:var(--color-dark-azure)] md:text-4xl">
                  Articles and Updates
                </h2>
              </div>
            </Reveal>

            <div className="case-library__grid">
              {newsPosts.map((post, index) => (
                <Reveal key={post.slug} delay={index * 90}>
                  <Link
                    href={`/news/${post.slug}`}
                    className="case-library-card block h-full"
                    aria-label={`Read full news story: ${post.title}`}
                  >
                    <div className="case-library-card__media">
                      <Image
                        src={post.image}
                        alt={post.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                      <span className="case-library-card__number">
                        {String(post.order).padStart(2, '0')}
                      </span>
                      <span className="case-library-card__action" aria-hidden="true">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="case-library-card__body">
                      <div className="case-library-card__tags">
                        <span>{post.category}</span>
                        <span>{post.publication}</span>
                        <time dateTime={post.date}>{post.displayDate}</time>
                      </div>
                      <h2>{post.title}</h2>
                      <p>{post.introduction}</p>
                      <span className="case-library-card__link">
                        Read full story
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
