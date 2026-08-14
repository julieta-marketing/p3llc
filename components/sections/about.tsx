import Image from 'next/image'
import { Handshake } from 'lucide-react'

import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { partners } from '@/lib/content'

const partnerLogos = [
  { src: '/sunstone-cities-icon.png', width: 265, height: 275 },
  { src: '/fullerton-consulting-partners-icon.png', width: 87, height: 99 },
]

export function About() {
  return (
    <Section id="about" className="bg-[#f5f7f7] py-24 md:py-32 lg:py-40">
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
    <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 lg:mt-16 lg:grid-cols-12">
      <Reveal
        variant="image"
        className="relative min-h-[18rem] overflow-hidden rounded-[1.5rem] bg-[color:var(--color-navy)] sm:min-h-[22rem] lg:col-span-7 lg:min-h-[25rem]"
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
        className="flex flex-col justify-center rounded-[1.5rem] bg-[color:var(--color-navy)] p-7 text-white shadow-[0_22px_60px_rgba(7,26,34,0.2)] ring-1 ring-inset ring-[color:var(--color-azure)]/18 sm:p-9 lg:col-span-5 lg:p-10"
      >
        <span className="flex items-center gap-4 font-sans text-[1.85rem] font-semibold leading-[1.08] tracking-normal text-white sm:text-[2.05rem] lg:text-[2rem] xl:text-[2.15rem]">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-azure)]/28 bg-white/8 text-[color:var(--color-azure)]">
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
      </Reveal>
    </div>
  )
}

/** Tier two: one card per partner firm, lighter than the statement above. */
function PartnerCards() {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {partners.map((partner, index) => {
        const logo = partnerLogos[index]

        return (
          <Reveal
            as="article"
            key={partner.name}
            delay={index * 90}
            className="flex min-h-[15.5rem] flex-col rounded-[1.5rem] bg-white p-7 shadow-[0_18px_50px_rgba(7,26,34,0.07)] ring-1 ring-inset ring-[color:var(--color-dark-azure)]/8 sm:p-8 lg:p-9"
          >
            <div>
              <h3 className="flex items-center gap-4 font-sans text-[1.85rem] font-semibold leading-[1.08] tracking-normal text-[color:var(--color-dark-azure)] sm:text-[2.05rem] md:whitespace-nowrap lg:text-[2rem] xl:text-[2.15rem]">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center sm:h-13 sm:w-13" aria-hidden="true">
                  <Image
                    src={logo.src}
                    alt=""
                    width={logo.width}
                    height={logo.height}
                    className="h-full w-full object-contain"
                  />
                </span>
                <span>{partner.name}</span>
              </h3>
            </div>

            <p className="mt-7 text-[1.1rem] leading-[1.62] text-[color:var(--color-dark-azure)]/78 sm:text-[1.18rem] sm:leading-[1.68]">
              {partner.description}
            </p>
          </Reveal>
        )
      })}
    </div>
  )
}
