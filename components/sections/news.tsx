import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { NewsletterForm } from '@/components/newsletter-form'
import { newsPosts, type NewsPost } from '@/lib/news'

/**
 * Photography already used elsewhere on the site. Reusing the exact same paths
 * means the browser has these cached by the time it reaches the newsroom, so
 * the strip costs almost nothing. The oversized hero JPEGs are deliberately
 * excluded.
 */
const siteImages = [
  '/solutions/alternative-financing-towers.jpg',
  '/case-studies/long-beach-civic-center-approved.webp',
  '/solutions/alternative-delivery-wilshire.jpg',
  '/case-studies/george-deukmejian-courthouse-approved.jpg',
  '/solutions/expert-network-lattice.jpg',
  '/case-studies/long-beach-convention-center-approved.jpg',
  '/solutions/economic-development-canyon.jpg',
  '/case-studies/queen-mary-approved.png',
] as const

const newsImageClasses = [
  'news-minimal__image--wide',
  'news-minimal__image--standard',
  'news-minimal__image--compact',
  'news-minimal__image--standard',
] as const

/**
 * How many stories the homepage teases. `newsPosts` arrives sorted newest-first,
 * so this is simply the latest one; everything else lives on /news.
 */
const HOMEPAGE_POST_COUNT = 1

export function News() {
  const publishedCount = newsPosts.length
  const featuredPosts = newsPosts.slice(0, HOMEPAGE_POST_COUNT)

  return (
    <Section id="news" className="news-minimal">
      <Reveal className="news-minimal__layout">
        <header className="news-minimal__heading">
          <h2>News</h2>
          <NewsletterForm id="news-email" variant="news" />
        </header>

        <section
          className={`news-minimal__card${
            publishedCount > 0 ? ' news-minimal__card--has-posts' : ''
          }`}
          aria-label="Articles and updates"
        >
          {publishedCount === 0 ? (
            <div className="news-minimal__empty" aria-label="Articles and updates coming soon">
              <div className="news-minimal__empty-kicker">
                <span>Articles and Updates</span>
                <span>Publishing soon</span>
              </div>

              <div className="news-minimal__empty-copy">
                <h3>Coming soon.</h3>
                <p>
                  P3 LLC is building a library of practical perspectives,
                  project lessons, and company updates.
                </p>
              </div>

              <NewsFilm posts={newsPosts} />
            </div>
          ) : (
            <div className="news-minimal__empty">
              <div className="news-minimal__empty-kicker">
                <span>Articles and Updates</span>
                <Link href="/news">View all</Link>
              </div>
              <div className="news-minimal__list">
                {featuredPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/news/${post.slug}`}
                    className="news-minimal__item"
                    aria-label={`Read full news story: ${post.title}`}
                  >
                    <div>
                      <div className="news-minimal__item-meta">
                        <span>{String(post.order).padStart(2, '0')}</span>
                        <span>{post.category}</span>
                        <time dateTime={post.date}>{post.displayDate}</time>
                      </div>
                      <h3>{post.title}</h3>
                      <span className="mt-5 inline-flex items-center gap-2 font-['Poppins'] text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-azure)]">
                        Read full story
                      </span>
                    </div>
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                ))}
              </div>
              <NewsFilm posts={newsPosts} />
            </div>
          )}
        </section>
      </Reveal>
    </Section>
  )
}

function NewsFilm({ posts }: { posts: NewsPost[] }) {
  // Post images lead, then the rest of the site's photography. De-duplicated:
  // the previous version padded to four slots with `index % posts.length`, so a
  // single post produced the same picture four times over.
  const sources = Array.from(
    new Set<string>([...posts.map((post) => post.image), ...siteImages]),
  )

  const newsroomImages = sources.map((src, index) => ({
    src,
    className: newsImageClasses[index % newsImageClasses.length],
  }))

  return (
    <div
      className="news-minimal__film"
      role="img"
      aria-label="P3 projects and public infrastructure"
    >
      <div className="news-minimal__film-track">
        {[false, true].map((isClone) => (
          <div
            key={String(isClone)}
            className="news-minimal__film-group"
            aria-hidden={isClone || undefined}
          >
            {newsroomImages.map((image, index) => (
              <figure
                key={`${image.src}-${index}`}
                className={`news-minimal__image ${image.className}`}
                aria-hidden="true"
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 70vw, 24vw"
                />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
