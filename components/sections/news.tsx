import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { NewsletterForm } from '@/components/newsletter-form'
import { newsPosts, type NewsPost } from '@/lib/news'

const fallbackNewsroomImages = [
  {
    src: '/news/long-beach-civic-center.jpg',
    className: 'news-minimal__image--wide',
  },
  {
    src: '/about-generated-public-waterfront.png',
    className: 'news-minimal__image--standard',
  },
  {
    src: '/service-alternative-financing.jpg',
    className: 'news-minimal__image--compact',
  },
  {
    src: '/case-studies/george-deukmejian-courthouse-approved.jpg',
    className: 'news-minimal__image--standard',
  },
] as const

const newsImageClasses = [
  'news-minimal__image--wide',
  'news-minimal__image--standard',
  'news-minimal__image--compact',
  'news-minimal__image--standard',
] as const

export function News() {
  const publishedCount = newsPosts.length

  return (
    <Section id="news" className="news-minimal">
      <Reveal className="news-minimal__layout">
        <header className="news-minimal__heading">
          <h2>News</h2>
          <NewsletterForm id="news-email" variant="news" />
        </header>

        <section className="news-minimal__card" aria-label="Articles and updates">
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
                {newsPosts.map((post) => (
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
  const newsroomImages = posts.length
    ? Array.from({ length: Math.max(4, posts.length) }, (_, index) => ({
        src: posts[index % posts.length].image,
        className: newsImageClasses[index % newsImageClasses.length],
      }))
    : fallbackNewsroomImages

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
