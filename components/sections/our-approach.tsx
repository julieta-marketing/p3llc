import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { processSteps } from '@/lib/content'

export function OurApproach() {
  return (
    <Section
      id="how-we-work"
      className="approach-suite-section overflow-hidden !bg-transparent !pb-20 !pt-0 text-[color:var(--color-dark-azure)] sm:!pb-24 lg:!pb-32"
    >
      <div className="public-approach">
        <Reveal className="public-approach__intro">
          <div className="public-suite__kicker">
            <span>02</span>
            <span>From vision to delivery</span>
          </div>
          <h2 className="mt-5 font-sans text-[2.8rem] font-medium leading-[0.98] tracking-normal text-[color:var(--color-dark-azure)] sm:text-[4rem] lg:text-[5.4rem]">
            Our Approach
          </h2>
          <p className="mt-6 max-w-[39rem] text-lg leading-8 text-[color:var(--muted-foreground)] md:text-xl md:leading-9">
            A practical sequence for turning public priorities into structured,
            partner-ready projects.
          </p>
        </Reveal>

        <div className="relative">
          <ol
            className="public-approach__steps"
            aria-label="Three-step project approach"
          >
            {processSteps.map((step, index) => (
              <Reveal
                as="li"
                key={step.number}
                delay={220 + index * 140}
                className="public-approach__step"
                tabIndex={0}
              >
                <div className="public-approach__step-top">
                  <span className="public-approach__number">
                    {step.number}
                  </span>
                  <span className="public-approach__flow-label">Step {index + 1}</span>
                </div>

                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
