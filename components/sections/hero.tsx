import Image from 'next/image'

import { CtaLink } from '@/components/cta-button'
import { HeroProjectLink } from '@/components/hero-project-link'
import { HeroMediaCarousel } from '@/components/hero-media-carousel'
import { containerClass } from '@/components/section'
import { cn } from '@/lib/utils'

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[color:var(--color-dark-azure)] text-white min-[1180px]:h-[clamp(38rem,75svh,54rem)]">
      <div
        className="executive-grid pointer-events-none absolute inset-y-0 left-0 w-full opacity-30 min-[1180px]:w-[52%]"
        aria-hidden="true"
      />
      <div
        className="ambient-orb pointer-events-none absolute -left-40 top-1/3 h-[34rem] w-[34rem] rounded-full bg-[color:var(--color-blue)]/15 blur-[140px]"
        aria-hidden="true"
      />

      <div
        className={cn(
          containerClass,
          'hero-layout-shell relative z-10 grid grid-cols-1 border-t border-white/14 pb-14 pt-28 sm:pb-16 sm:pt-32 min-[1180px]:h-full min-[1180px]:min-h-0 min-[1180px]:grid-cols-12 min-[1180px]:items-center min-[1180px]:!pb-4 min-[1180px]:!pt-20',
        )}
      >
        <div className="max-w-[44rem] min-[1180px]:col-span-5 min-[1180px]:-translate-y-2 min-[1180px]:max-w-none min-[1180px]:pr-10 xl:pr-14 2xl:pr-5">
          <Image
            src="/p3-logo-white.png"
            alt="P3 LLC — Public Private Partners"
            width={520}
            height={162}
            priority
            className="hero-kicker h-auto w-[8.75rem] sm:w-[10.5rem] 2xl:w-[12rem]"
          />

          <h1 className="mt-5 max-w-[10ch] font-sans text-[clamp(2.85rem,13.75vw,3.35rem)] font-medium leading-[0.9] tracking-[-0.06em] text-white sm:text-[clamp(2.9rem,6vw,4rem)] min-[1180px]:text-[clamp(4.25rem,4.25vw,5.1rem)]">
            <span className="hero-title-mask block">
              <span className="hero-title-line block">Helping</span>
            </span>
            <span className="hero-title-mask block">
              <span className="hero-title-line block">Governments</span>
            </span>
            <span className="hero-title-mask block">
              <span className="hero-title-line block">
                Build <span className="brand-title-highlight">More</span>
              </span>
            </span>
          </h1>

          <p className="hero-copy mt-5 max-w-[40ch] font-['Poppins'] text-base font-normal leading-7 text-white/70 min-[1180px]:text-[1.1rem] min-[1180px]:leading-8 2xl:text-[1.2rem] 2xl:leading-[2.1rem]">
            P3 LLC helps public agencies and private-sector partners finance,
            structure, and deliver infrastructure and economic development projects.
          </p>

          <div className="hero-actions mt-5 flex flex-wrap items-center gap-x-6 gap-y-5">
            <CtaLink href="/contact" variant="light" size="lg" arrow className="text-[0.8rem]">
              Contact Us
            </CtaLink>
            <HeroProjectLink />
          </div>
        </div>
      </div>

      <div className="relative z-[5] min-h-[28rem] overflow-hidden border-y border-white/14 sm:min-h-[36rem] min-[1180px]:absolute min-[1180px]:inset-y-0 min-[1180px]:right-0 min-[1180px]:min-h-0 min-[1180px]:w-[60%] min-[1180px]:rounded-bl-[3.5rem] min-[1180px]:border-y-0 min-[1180px]:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]">
        <div className="hero-media-enter absolute inset-0">
          <HeroMediaCarousel className="h-full min-h-[28rem] rounded-none border-0 shadow-none sm:min-h-[36rem] min-[1180px]:min-h-full" />

          <div
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[color:var(--color-dark-azure)]/30 via-[color:var(--color-dark-azure)]/8 to-transparent"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}
