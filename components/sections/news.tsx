import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { NewsletterForm } from '@/components/newsletter-form'
import { NewsCarousel } from '@/components/news-carousel'
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
 * How many stories the homepage carousel cycles through. `newsPosts` arrives
 * sorted newest-first. `null` means "all of them"; set a number to cap the
 * rotation and send the remainder to /news.
 */
const HOMEPAGE_POST_COUNT: number | null = null

export function News() {
  const publishedCount = newsPosts.length
  const featuredPosts =
    HOMEPAGE_POST_COUNT === null
      ? newsPosts
      : newsPosts.slice(0, HOMEPAGE_POST_COUNT)

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
              <NewsCarousel posts={featuredPosts} />
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
