import Image from 'next/image'

import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { partners } from '@/lib/content'

export function About() {
  return (
    <Section id="about" className="bg-[#f5f7f7] py-24 md:py-32 lg:py-40">
      <Reveal>
        <h2 className="font-sans text-[2.45rem] font-medium leading-[1.01] tracking-[-0.05em] text-[color:var(--color-dark-azure)] sm:text-[3.3rem] lg:text-[4.3rem]">
          About
        </h2>
      </Reveal>

      <PartnershipCards />
    </Section>
  )
}

function PartnershipCards() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 lg:mt-16 lg:grid-cols-12">
      <Reveal
        variant="image"
        className="relative min-h-[22rem] overflow-hidden rounded-[1.5rem] bg-[color:var(--color-navy)] sm:min-h-[28rem] lg:col-span-7 lg:min-h-[38rem]"
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
        className="flex min-h-[38rem] flex-col rounded-[1.5rem] bg-[color:var(--color-navy)] p-7 text-white shadow-[0_22px_60px_rgba(7,26,34,0.2)] ring-1 ring-inset ring-[color:var(--color-azure)]/18 sm:p-9 lg:col-span-5 lg:p-10"
      >
        <span className="font-['Poppins'] text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-azure)]">
          The partnership
        </span>

        <p className="mt-7 text-[1.08rem] leading-8 text-white/78">
          Public Private Partners LLC (P3 LLC) is a joint venture between
          Sunstone Cities and Fullerton Consulting Partners, bringing together
          decades of public-sector leadership, infrastructure development
          expertise, and private-sector project delivery experience.
        </p>

        <div className="mt-5">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className="flex items-center justify-between gap-6 border-t border-white/16 py-6 last:pb-0"
            >
              <div className="min-w-0">
                <h3 className="font-['Poppins'] text-[0.68rem] font-semibold uppercase leading-5 tracking-[0.14em] text-[color:var(--color-azure)]">
                  {partner.name}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-7 text-white/68">
                  {partner.description}
                </p>
              </div>

              <Image
                src={
                  index === 0
                    ? '/sunstone-cities-logo-horizontal.png'
                    : '/fullerton-consulting-partners-logo.webp'
                }
                alt={partner.name}
                width={index === 0 ? 813 : 415}
                height={index === 0 ? 297 : 200}
                className="h-auto w-[8rem] shrink-0 brightness-0 invert opacity-90 sm:w-[8.5rem]"
              />
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  )
}
