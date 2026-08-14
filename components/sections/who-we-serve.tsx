import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { whoWeServe } from '@/lib/content'
import type { CSSProperties } from 'react'

export function WhoWeServe() {
  const [publicGroup, privateGroup] = whoWeServe

  return (
    <Section
      id="who-we-serve"
      className="network-workspace-section overflow-hidden !bg-transparent !pt-16 !pb-0 text-[color:var(--color-dark-azure)] md:!pt-20 lg:!pt-24"
    >
      <Reveal className="delivery-suite-intro relative z-10">
        <h2 className="delivery-suite-intro__long-title">
          Trusted by Public &amp; Private Leaders
        </h2>
        <p>
          P3 starts with the public owner’s mandate, then aligns delivery partners,
          capital, and technical expertise around a structure that can move.
        </p>
      </Reveal>

      <Reveal delay={140} className="mt-10 lg:mt-12">
        <div className="network-workspace public-ecosystem">
          <div className="public-ecosystem__connector" aria-hidden="true" />

          <div className="public-ecosystem__panel">
            <EcosystemGroup
              eyebrow="Public Ecosystem"
              heading={publicGroup.heading}
              items={publicGroup.items}
            />

            <EcosystemGroup
              eyebrow="Private Ecosystem"
              heading={privateGroup.heading}
              items={privateGroup.items}
            />
          </div>
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
    <div className="public-ecosystem__group">
      <div className="public-ecosystem__heading">
        <span>{eyebrow}</span>
        <h3>{heading}</h3>
      </div>

      <ul
        className="public-ecosystem__owners"
        aria-label={heading}
        style={
          {
            '--ecosystem-rows': String(Math.ceil(items.length / 2)),
          } as CSSProperties
        }
      >
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
