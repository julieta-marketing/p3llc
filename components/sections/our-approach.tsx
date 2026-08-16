import { Eyebrow, Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { processSteps } from '@/lib/content'

export function OurApproach() {
  return (
    <Section
      id="how-we-work"
      className="executive-approach"
    >
      <Reveal className="delivery-story__intro">
        <Eyebrow>How We Work</Eyebrow>
        <div>
          <h2>
            Our <span className="delivery-story__accent">Approach</span>
          </h2>
          <p>
            A disciplined three-step process keeps decisions clear, partners
            aligned, and momentum focused on the public outcome.
          </p>
        </div>
      </Reveal>

      <ol className="delivery-approach__steps" aria-label="Three-step project approach">
        {processSteps.map((step, index) => (
          <Reveal
            as="li"
            key={step.number}
            delay={100 + index * 80}
            className="delivery-approach__step"
          >
            <div className="delivery-approach__step-top">
              <span>{step.number}</span>
              <small>Step {index + 1} of {processSteps.length}</small>
            </div>

            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
