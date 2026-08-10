'use client'

import { useState } from 'react'
import Image from 'next/image'

import { Eyebrow } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { whyPoints } from '@/lib/content'
import { cn } from '@/lib/utils'

const advantageVisuals: Array<{
  image: string
  position: string
}> = [
  {
    image: '/about-generated-civic-campus.png',
    position: '48% 50%',
  },
  {
    image: '/about-generated-courthouse.png',
    position: '55% 50%',
  },
  {
    image: '/about-generated-public-waterfront.png',
    position: '58% 50%',
  },
  {
    image: '/why/why-public-benefit-v2.png',
    position: '50% 50%',
  },
]

export function WhyP3() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  return (
    <div id="why" className="why-integrated scroll-mt-24">
      <div className="why-integrated__layout">
        <Reveal className="why-integrated__intro">
          <Eyebrow>Why P3 LLC</Eyebrow>
          <h2>Why Public Agencies Work With Us</h2>
          <p>
            Public insight, private execution, and better public outcomes.
          </p>
        </Reveal>

        <Reveal delay={120} className="why-integrated__accordion">
          <div className="service-vertical" aria-label="Why P3 LLC advantages">
            {whyPoints.map((point, index) => {
              const isActive = index === activeIndex
              const { image, position } = advantageVisuals[index]

              return (
                <article
                  key={point.title}
                  className={cn(
                    'service-vertical__item',
                    isActive && 'is-active',
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(isActive ? null : index)}
                    className="service-vertical__trigger"
                    aria-expanded={isActive}
                    aria-controls={`advantage-detail-${index}`}
                    aria-label={`${isActive ? 'Collapse' : 'Expand'} ${point.title}`}
                  >
                    <span className="service-vertical__number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <strong>{point.title}</strong>
                    <span
                      className="service-vertical__toggle"
                      aria-hidden="true"
                    >
                      <i />
                      <i />
                    </span>
                  </button>

                  <div
                    id={`advantage-detail-${index}`}
                    className="service-vertical__drawer"
                  >
                    <div className="service-vertical__drawer-inner">
                      <div className="service-vertical__copy">
                        <h3>{point.title}</h3>
                        <p>{point.description}</p>
                      </div>
                      <div className="service-vertical__media">
                        <Image
                          src={image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 52vw, 100vw"
                          className="object-cover"
                          style={{ objectPosition: position }}
                        />
                        <span aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </Reveal>
      </div>
    </div>
  )
}
