import Image from 'next/image'

import { Eyebrow, Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { whoWeServe } from '@/lib/content'

export function WhoWeServe() {
  const [publicGroup, privateGroup] = whoWeServe

  return (
    <Section
      id="who-we-serve"
      className="executive-network"
    >
      <Reveal className="delivery-story__intro">
        <Eyebrow>Our Network</Eyebrow>
        <div>
          <h2>
            Trusted by <span className="delivery-story__accent">Public &amp; Private Leaders</span>
          </h2>
          <p>
            P3 aligns public priorities with the delivery partners, capital, and
            technical expertise needed to move projects forward.
          </p>
        </div>
      </Reveal>

      <Reveal delay={100} className="delivery-network__reveal">
        <div id="network-alignment" className="delivery-network">
          <EcosystemGroup
            eyebrow="Public mandate"
            heading={publicGroup.heading}
            items={publicGroup.items}
          />

          <div className="delivery-network__bridge" aria-label="P3 LLC alignment role">
            <span className="delivery-network__bridge-rail" aria-hidden="true" />
            <div className="delivery-network__bridge-mark">
              <Image
                src="/p3-llc-header.png"
                alt="P3 LLC — Public Private Partners"
                width={1254}
                height={400}
                sizes="180px"
                className="delivery-network__bridge-logo"
              />
            </div>
          </div>

          <EcosystemGroup
            eyebrow="Delivery capacity"
            heading={privateGroup.heading}
            items={privateGroup.items}
          />
        </div>
      </Reveal>
    </Section>
  )
}

function EcosystemGroup({
  eyebrow,
  heading,
  items,
}: {
  eyebrow: string
  heading: string
  items: string[]
}) {
  return (
    <article className="delivery-network__group">
      <div className="delivery-network__heading">
        <span>{eyebrow}</span>
        <h3>{heading}</h3>
      </div>

      <ul className="delivery-network__list" aria-label={heading}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  )
}
