import Image from 'next/image'

import { Reveal } from '@/components/reveal'
import { containerClass, Eyebrow } from '@/components/section'
import { cn } from '@/lib/utils'

type InsightBannerProps = {
  id: string
  eyebrow: string
  title: string
  body: string
  image: string
  imageAlt: string
  tone?: 'blue' | 'navy'
}

function InsightBanner({
  id,
  eyebrow,
  title,
  body,
  image,
  imageAlt,
  tone = 'blue',
}: InsightBannerProps) {
  return (
    <aside id={`${id}-section`} className="insight-banner" aria-labelledby={id}>
      <Reveal className={cn(containerClass, 'insight-banner__inner')}>
        <div
          className={cn(
            'insight-banner__copy',
            tone === 'navy' ? 'insight-banner__copy--navy' : 'insight-banner__copy--blue',
          )}
        >
          <Eyebrow onDark className="insight-banner__eyebrow">{eyebrow}</Eyebrow>
          <h2 id={id}>{title}</h2>
          <p className="insight-banner__body">{body}</p>
        </div>

        <div className="insight-banner__media">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 34vw, 100vw"
            className="object-cover"
          />
        </div>
      </Reveal>
    </aside>
  )
}

export function PartnershipValueBar() {
  return (
    <InsightBanner
      id="partnership-value-title"
      eyebrow="Why Public-Private Partnerships"
      title="Move Complex Civic Projects Forward"
      body="Expand funding, accelerate delivery, and bring private expertise to public goals."
      image="/case-studies/george-deukmejian-courthouse-approved.jpg"
      imageAlt="George Deukmejian Courthouse illuminated at dusk in Long Beach"
      tone="navy"
    />
  )
}

export function WhyP3Bar() {
  return (
    <InsightBanner
      id="why-p3-band-title"
      eyebrow="Why P3 LLC"
      title="Public Leadership Meets Delivery Expertise"
      body="A trusted network for structuring, financing, and delivering complex projects."
      image="/why/why-capital-expertise-v2.png"
      imageAlt="Illuminated transit, bridge, and waterfront infrastructure at dusk"
      tone="navy"
    />
  )
}
