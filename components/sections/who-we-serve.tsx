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
      <Reveal className="relative z-10">
        <h2 className="mt-5 max-w-[18ch] text-balance font-sans text-[2.35rem] font-medium leading-[1.04] tracking-normal text-[color:var(--color-dark-azure)] sm:text-[3.2rem] lg:max-w-[20ch] lg:text-[4.45rem] lg:leading-[0.98]">
          Trusted by Public &amp; Private Leaders
        </h2>
        <p className="mt-5 max-w-[44rem] text-base leading-7 text-[color:var(--muted-foreground)] md:text-lg md:leading-8">
          P3 starts with the public owner’s mandate, then aligns delivery partners,
          capital, and technical expertise around a structure that can move.
        </p>
      </Reveal>

      <Reveal delay={140} className="mt-7 lg:mt-8">
        <div className="public-suite__kicker public-suite__kicker--between">
          <span>01</span>
          <span>Our Network</span>
        </div>

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
