import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { Reveal } from '@/components/reveal'
import { Eyebrow, Section } from '@/components/section'
import { NewsletterForm } from '@/components/newsletter-form'
import { newsPosts } from '@/lib/news'

export function News() {
  const featuredPost = newsPosts[0]

  return (
    <Section id="news" className="news-editorial">
      <Reveal className="news-editorial__header">
        <div>
          <Eyebrow>Latest Updates</Eyebrow>
          <h2>News</h2>
        </div>

        <Link href="/news" className="news-editorial__all">
          View all news
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </Reveal>

      {featuredPost ? (
        <Reveal className="news-editorial__feature">
          <Link
            href={`/news/${featuredPost.slug}`}
            className="news-editorial__feature-link"
            aria-label={`Read article: ${featuredPost.title}`}
          >
            <figure className="news-editorial__media">
              <Image
                src={featuredPost.image}
                alt={featuredPost.imageAlt}
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
              />
            </figure>

            <article className="news-editorial__story">
              <p className="news-editorial__meta">
                <span>{featuredPost.category}</span>
                <time dateTime={featuredPost.date}>{featuredPost.displayDate}</time>
              </p>
              <h3>{featuredPost.title}</h3>
              <p className="news-editorial__summary">{featuredPost.introduction}</p>
              <span className="news-editorial__read">
                Read article
                <span>
                  <ArrowUpRight aria-hidden="true" />
                </span>
              </span>
            </article>
          </Link>
        </Reveal>
      ) : (
        <Reveal className="news-editorial__empty">
          <h3>Perspectives Coming Soon</h3>
          <p>New project lessons and company updates will appear here.</p>
        </Reveal>
      )}

      <Reveal className="news-editorial__subscribe">
        <div>
          <h3>Stay Informed</h3>
          <p>Receive new perspectives and project updates from P3 LLC.</p>
        </div>
        <NewsletterForm id="news-email" variant="news" />
      </Reveal>
    </Section>
  )
}
