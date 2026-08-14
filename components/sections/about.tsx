import Image from 'next/image'
import { Handshake } from 'lucide-react'

import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { partners } from '@/lib/content'

const partnerLogos = [
  {
    src: '/sunstone-cities-icon.png',
    width: 265,
    height: 275,
  },
  {
    src: '/fullerton-consulting-partners-icon.png',
    width: 87,
    height: 99,
  },
]

export function About() {
  return (
    <Section id="about" className="about-section bg-[color:var(--surface-2)] py-24 md:py-32 lg:py-40">
      <div className="about-section__glow" aria-hidden="true" />

      <Reveal>
        <h2 className="font-sans text-[2.45rem] font-medium leading-[1.01] tracking-[-0.05em] text-[color:var(--color-dark-azure)] sm:text-[3.3rem] lg:text-[4.3rem]">
          About
        </h2>
      </Reveal>

      <PartnershipStatement />
      <PartnerCards />
    </Section>
  )
}

/** Tier one: the photograph and the joint-venture statement. */
function PartnershipStatement() {
  return (
    <div className="about-feature mt-12 grid grid-cols-1 gap-4 sm:mt-14 lg:mt-16 lg:grid-cols-12">
      <Reveal
        variant="image"
        className="about-feature__image relative min-h-[19rem] overflow-hidden rounded-[1.5rem] bg-[color:var(--color-navy)] sm:min-h-[23rem] lg:col-span-7 lg:min-h-[28rem]"
      >
        <Image
          src="/case-studies/george-deukmejian-courthouse-approved.jpg"
          alt="The George Deukmejian Courthouse in Long Beach at dusk, delivered through a DBFOM public-private partnership"
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover object-center"
        />
      </Reveal>

      <Reveal
        as="article"
        delay={100}
        className="about-feature__statement flex flex-col rounded-[1.5rem] bg-[color:var(--color-navy)] p-7 text-white sm:p-9 lg:col-span-5 lg:p-10"
      >
        <span className="about-feature__title flex items-center gap-4 font-sans text-[1.85rem] font-semibold leading-[1.08] tracking-normal text-white sm:text-[2.05rem] lg:text-[2rem] xl:text-[2.15rem]">
          <span className="about-feature__icon flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-azure)]/28 bg-white/8 text-[color:var(--color-azure)]">
            <Handshake className="h-6 w-6" aria-hidden="true" />
          </span>
          The Partnership
        </span>

        <p className="mt-5 text-[1.1rem] leading-[1.62] text-white/85 sm:text-[1.18rem] sm:leading-[1.68]">
          Public Private Partners LLC (P3 LLC) is a joint venture between
          Sunstone Cities and Fullerton Consulting Partners, bringing together
          decades of public-sector leadership, infrastructure development
          expertise, and private-sector project delivery experience.
        </p>

        <div
          className="about-feature__expertise"
          aria-label="Combined expertise"
        >
          <span>Public leadership</span>
          <span>Infrastructure</span>
          <span>Project delivery</span>
        </div>
      </Reveal>
    </div>
  )
}

/** Tier two: one card per partner firm, lighter than the statement above. */
function PartnerCards() {
  return (
    <div className="about-partners mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
      {partners.map((partner, index) => {
        const logo = partnerLogos[index]

        return (
          <Reveal
            as="article"
            key={partner.name}
            delay={index * 90}
            className="about-partner-card flex min-h-[17rem] flex-col rounded-[1.5rem] bg-white p-7 sm:p-8 lg:p-9"
          >
            <div className="about-partner-card__identity">
              <h3 className="about-partner-card__title flex items-center gap-3 font-sans font-semibold leading-[1.08] tracking-normal text-[color:var(--color-dark-azure)] sm:gap-4">
                <span className="about-partner-card__logo flex h-12 w-12 shrink-0 items-center justify-center sm:h-14 sm:w-14" aria-hidden="true">
                  <Image
                    src={logo.src}
                    alt=""
                    width={logo.width}
                    height={logo.height}
                    className="about-partner-card__logo-image"
                  />
                </span>
                <span className="about-partner-card__name">
                  {partner.name}
                </span>
              </h3>
            </div>

            <p className="about-partner-card__description mt-7 text-[1.1rem] leading-[1.62] text-[color:var(--color-dark-azure)]/78 sm:text-[1.18rem] sm:leading-[1.68]">
              {partner.description}
            </p>
          </Reveal>
        )
      })}
    </div>
  )
}
