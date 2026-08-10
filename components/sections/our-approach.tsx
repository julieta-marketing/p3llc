import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { processSteps } from '@/lib/content'

export function OurApproach() {
  return (
    <Section
      id="how-we-work"
      className="overflow-hidden !bg-transparent !py-20 text-white sm:!py-24 lg:!pb-32 lg:!pt-28"
    >
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-3 lg:pt-1">
          <span className="mb-6 block font-sans text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-azure)]/80">
            From vision to delivery
          </span>
          <h2 className="font-sans text-[3.1rem] font-medium leading-[0.96] tracking-[-0.055em] text-white sm:text-[4rem] lg:text-[4.25rem]">
            Our
            <br className="hidden lg:block" /> Approach
          </h2>
          <p className="mt-6 max-w-[22rem] text-sm leading-6 text-white/52 lg:max-w-[16rem]">
            A clear path from project priorities to execution.
          </p>
        </Reveal>

        <div className="relative lg:col-span-9 lg:pt-2">
          <ol
            className="approach-timeline grid gap-12 sm:grid-cols-3 sm:gap-8"
            aria-label="Three-step project approach"
          >
            {processSteps.map((step, index) => (
              <Reveal
                as="li"
                key={step.number}
                delay={220 + index * 140}
                className="approach-timeline__step relative min-w-0"
              >
                <div className="flex items-end justify-between gap-4 sm:block">
                  <span className="approach-timeline__number block font-['Poppins'] text-[4rem] font-semibold leading-none tabular-nums tracking-[-0.075em] sm:text-[4.6rem] lg:text-[5.15rem]">
                    {step.number}
                  </span>
                  <span className="mb-2 font-sans text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-white/62 sm:hidden">
                    Step {index + 1}
                  </span>
                </div>

                <div className="approach-timeline__marker relative mt-6 h-6 sm:mt-5">
                  {index === 0 && (
                    <Reveal
                      variant="line"
                      delay={120}
                      className="approach-timeline__rail absolute left-[0.575rem] top-[0.61rem] z-0 hidden h-px w-[calc(200%+4rem)] sm:block"
                    >
                      {null}
                    </Reveal>
                  )}
                  <span className="approach-timeline__node" aria-hidden="true">
                    <span />
                  </span>
                </div>

                <div className="approach-timeline__content mt-7 max-w-[29ch] border-t border-white/10 pt-6 sm:mt-8 sm:border-0 sm:pt-0">
                  <h3 className="font-sans text-[1.85rem] font-medium leading-none tracking-[-0.04em] text-white lg:text-[2.15rem]">
                    {step.title}
                  </h3>
                  <p className="mt-5 text-base leading-7 text-white/60 lg:text-[1.06rem] lg:leading-8">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
