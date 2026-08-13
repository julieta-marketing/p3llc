import Image from 'next/image'

import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { partners } from '@/lib/content'

const partnerLogos = [
  { src: '/sunstone-cities-logo-horizontal.png', width: 813, height: 297 },
  { src: '/fullerton-consulting-partners-logo.webp', width: 415, height: 200 },
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
          src="/about-partner-finance-wide.png"
          alt="Project partners reviewing infrastructure plans, financial schedules, and a civic development model"
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
        <span className="font-['Poppins'] text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-azure)]">
          The partnership
        </span>

        <p className="mt-6 text-[1.12rem] leading-[1.95] text-white/85 sm:text-[1.2rem] sm:leading-[2.05]">
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
            className="flex flex-col rounded-[1.5rem] bg-white p-7 shadow-[0_18px_50px_rgba(7,26,34,0.07)] ring-1 ring-inset ring-[color:var(--color-dark-azure)]/8 sm:p-9 lg:p-10"
          >
            {/* Fixed-height box so the two logos share a baseline despite
                different aspect ratios. */}
            <div className="flex h-11 items-center sm:h-12">
              <Image
                src={logo.src}
                alt={partner.name}
                width={logo.width}
                height={logo.height}
                className="h-full w-auto object-contain object-left"
              />
            </div>

            <h3 className="mt-7 font-['Poppins'] text-[0.82rem] font-semibold uppercase leading-6 tracking-[0.12em] text-[color:var(--color-blue)]">
              {partner.name}
            </h3>

            <p className="mt-3 text-[1.08rem] leading-[1.8] text-[color:var(--color-dark-azure)]/78">
              {partner.description}
            </p>
          </Reveal>
        )
      })}
    </div>
  )
}
