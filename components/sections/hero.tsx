import { CtaLink } from '@/components/cta-button'
import { HeroProjectLink } from '@/components/hero-project-link'
import { HeroMediaCarousel } from '@/components/hero-media-carousel'
import { containerClass } from '@/components/section'
import { cn } from '@/lib/utils'

export function Hero() {
  return (
    <section className="hero-band relative isolate overflow-hidden text-white lg:h-[clamp(38rem,75svh,54rem)]">
      <div
        className="executive-grid pointer-events-none absolute inset-y-0 left-0 w-full opacity-30 lg:w-[52%]"
        aria-hidden="true"
      />
      <div
        className="ambient-orb pointer-events-none absolute -left-40 top-1/3 h-[34rem] w-[34rem] rounded-full bg-[color:var(--color-blue)]/15 blur-[140px]"
        aria-hidden="true"
      />

      <div
        className={cn(
          containerClass,
          'hero-layout-shell relative z-10 grid grid-cols-1 border-t border-white/14 pb-10 pt-[5.5rem] sm:pb-14 sm:pt-28 lg:h-full lg:min-h-0 lg:grid-cols-12 lg:items-center lg:!pb-4 lg:!pt-20',
        )}
      >
        <div className="max-w-[44rem] lg:col-span-5 lg:max-w-none lg:-translate-y-2 lg:pr-8 xl:pr-14 2xl:pr-5">
          <p className="hero-kicker">Public Project Delivery</p>

          <h1 className="hero-headline mt-5 max-w-[10ch] font-sans text-[clamp(2.85rem,13.75vw,3.35rem)] font-medium leading-[0.9] tracking-[-0.06em] text-white sm:text-[clamp(2.9rem,6vw,4rem)] lg:text-[clamp(3.15rem,5vw,4rem)] xl:text-[clamp(4.25rem,4.25vw,5.1rem)]">
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

          <p className="hero-copy mt-6 max-w-[36ch] font-['Poppins'] text-base font-normal leading-7 text-white/70 sm:mt-7 xl:text-[1.1rem] xl:leading-8 2xl:text-[1.2rem] 2xl:leading-[2.1rem]">
            P3 LLC helps public and private partners finance, structure, and
            deliver infrastructure and economic development projects.
          </p>

          <div className="hero-actions mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 sm:mt-12">
            <CtaLink href="/contact" variant="light" size="lg" arrow className="text-[0.8rem]">
              Contact Us
            </CtaLink>
            <HeroProjectLink />
          </div>
        </div>
      </div>

      <div className="relative z-[5] min-h-[20rem] overflow-hidden border-y border-white/14 sm:min-h-[26rem] lg:absolute lg:inset-y-0 lg:right-0 lg:min-h-0 lg:w-[60%] lg:rounded-bl-[3.5rem] lg:border-y-0 lg:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]">
        <div className="hero-media-enter absolute inset-0">
          <HeroMediaCarousel className="h-full min-h-[20rem] rounded-none border-0 shadow-none sm:min-h-[26rem] lg:min-h-full" />

          <div
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[color:var(--color-dark-azure)]/30 via-[color:var(--color-dark-azure)]/8 to-transparent"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}
