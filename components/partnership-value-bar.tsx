import Image from 'next/image'

import { Reveal } from '@/components/reveal'
import { containerClass } from '@/components/section'
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
    <aside className="insight-banner" aria-labelledby={id}>
      <div className={cn(containerClass, 'insight-banner__inner')}>
        <Reveal
          className={cn(
            'insight-banner__copy',
            tone === 'navy' ? 'insight-banner__copy--navy' : 'insight-banner__copy--blue',
          )}
        >
          <p className="insight-banner__eyebrow">{eyebrow}</p>
          <h2 id={id}>{title}</h2>
          <p className="insight-banner__body">{body}</p>
        </Reveal>

        <Reveal variant="image" delay={120} className="insight-banner__media">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 34vw, 100vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    </aside>
  )
}

export function PartnershipValueBar() {
  return (
    <InsightBanner
      id="partnership-value-title"
      eyebrow="Why public-private partnerships?"
      title="Move complex civic projects forward."
      body="Expand funding, accelerate delivery, and bring private expertise to public goals."
      image="/why/why-public-private-v3.png"
      imageAlt="Contemporary public civic building in warm late-afternoon light"
      tone="blue"
    />
  )
}

export function WhyP3Bar() {
  return (
    <InsightBanner
      id="why-p3-band-title"
      eyebrow="Why P3 LLC?"
      title="Public leadership meets delivery expertise."
      body="A trusted network for structuring, financing, and delivering complex projects."
      image="/why/why-capital-expertise-v2.png"
      imageAlt="Illuminated transit, bridge, and waterfront infrastructure at dusk"
      tone="navy"
    />
  )
}
