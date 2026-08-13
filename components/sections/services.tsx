'use client'

import Image from 'next/image'
import { Section, Eyebrow } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { services } from '@/lib/content'

const serviceVisuals = [
  {
    image: '/solutions/alternative-financing-towers.jpg',
    backClass: 'bg-[color:var(--color-dark-azure)]',
  },
  {
    image: '/solutions/alternative-delivery-wilshire.jpg',
    backClass: 'bg-[color:var(--color-navy)]',
  },
  {
    image: '/solutions/expert-network-lattice.jpg',
    backClass: 'bg-[color:var(--color-blue)]',
  },
  {
    image: '/solutions/economic-development-canyon.jpg',
    backClass: 'bg-[#155a72]',
  },
] as const

export function Services() {
  return (
    <Section id="services" className="services-suite bg-[#f4f7f7]">
      <Reveal>
        <div>
          <Eyebrow>Solutions</Eyebrow>
          <h2 className="mt-7 max-w-[17ch] font-sans text-[2.45rem] font-medium leading-[1.01] tracking-[-0.05em] text-[color:var(--color-dark-azure)] sm:text-[3.3rem] lg:text-[4.5rem]">
            For public{' '}
            <span className="brand-title-highlight">
              infrastructure
            </span>{' '}
            and economic development projects.
          </h2>
        </div>
      </Reveal>

      <div
        className="why-card-rail mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-20 xl:flex"
        aria-label="Services"
      >
        {services.map((item, index) => {
          const visual = serviceVisuals[index]
          const number = String(index + 1).padStart(2, '0')

          return (
            <Reveal
              key={item.title}
              delay={index * 90}
              className="why-card-rail__item min-h-[14rem] sm:min-h-[23rem] lg:min-h-[27rem] xl:min-w-0 xl:flex-1"
            >
              <article
                tabIndex={0}
                aria-label={`${item.title}. ${item.description}`}
                className="why-flip-card group h-full min-h-[inherit] rounded-[1.15rem] outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-blue)] focus-visible:ring-offset-4 sm:rounded-[1.5rem]"
              >
                <div className="why-flip-card__inner min-h-[inherit]">
                  <div
                    className="why-flip-card__face why-flip-card__front shadow-[0_20px_70px_rgba(7,26,34,0.13)]"
                    aria-hidden="true"
                  >
                    <Image
                      src={visual.image}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="services-suite__image object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#031015]/95 via-[#071a22]/35 to-[#071a22]/10" />

                    <div className="relative flex min-h-[inherit] flex-col p-5 text-white sm:p-7 lg:p-8">
                      <div className="mt-auto pt-8 sm:pt-20">
                        <h3 className="max-w-[22ch] font-sans text-[1.45rem] font-medium leading-[1.04] tracking-[-0.04em] !text-white sm:max-w-[16ch] sm:text-[1.65rem] lg:text-[1.8rem]">
                          {item.title}
                        </h3>
                        <p className="mt-2.5 max-w-[38ch] text-[0.82rem] leading-[1.45] text-white/78 sm:mt-4 sm:text-sm sm:leading-6 md:hidden">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`why-flip-card__face why-flip-card__back ${visual.backClass} p-5 text-white shadow-[0_20px_70px_rgba(7,26,34,0.13)] sm:p-7 lg:p-8`}
                    aria-hidden="true"
                  >
                    <span className="absolute -right-5 -top-8 font-sans text-[7rem] font-semibold leading-none tracking-[-0.08em] text-white/[0.06] sm:-right-7 sm:-top-14 sm:text-[11rem]">
                      {index + 1}
                    </span>

                    <div className="relative flex h-full flex-col">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[0.62rem] font-semibold tracking-[0.16em] text-[color:var(--color-azure)]">
                          {number}
                        </span>
                        <span className="text-[0.54rem] font-semibold uppercase tracking-[0.12em] text-white/58">
                          Solutions
                        </span>
                      </div>

                      <div className="mt-auto pt-6 sm:pt-16">
                        <div className="mb-3 h-px w-12 bg-[color:var(--color-azure)] sm:mb-6" />
                        <h3 className="max-w-[20ch] font-sans text-[1.35rem] font-medium leading-[1.04] tracking-[-0.04em] !text-white sm:max-w-[15ch] sm:text-[1.5rem] lg:text-[1.65rem]">
                          {item.title}
                        </h3>
                        <p className="mt-3 max-w-[40ch] text-[0.82rem] leading-[1.45] text-white/78 sm:mt-5 sm:text-sm sm:leading-6">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
