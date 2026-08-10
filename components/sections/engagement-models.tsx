import { Circle } from 'lucide-react'

import { Eyebrow, Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { engagementModels } from '@/lib/content'

const modelLabels = [
  'Advisory role',
  'Embedded owner-side role',
  'Full-process role',
] as const

const collaborationOffsets = ['1.75rem', '0.875rem', '0.1rem'] as const

const collaborationCaptions = [
  'Targeted Support',
  'Team-Embedded',
  'Fully Integrated',
] as const

export function EngagementModels() {
  return (
    <Section
      id="how-we-engage"
      tone="dark"
      className="overflow-hidden !bg-transparent !pb-20 !pt-16 md:!pb-24 md:!pt-20 lg:!pb-24 lg:!pt-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgb(101_200_229_/_10%),transparent_31%)]"
        aria-hidden="true"
      />

      <div className="relative">
        <Reveal>
          <div>
            <Eyebrow onDark bare>
              Engagement Models
            </Eyebrow>
            <h2 className="mt-6 max-w-[13ch] font-sans text-[2.85rem] font-normal leading-[0.98] tracking-[-0.055em] text-white sm:text-[3.7rem] lg:text-[4.3rem]">
              How Clients Hire Us
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100} className="mt-12 lg:mt-16">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            {engagementModels.map((model, index) => {
              return (
                <article
                  key={model.title}
                  tabIndex={0}
                  className="engagement-model-card group flex min-h-[25rem] flex-col rounded-[1.5rem] border border-white/11 bg-white/[0.035] p-7 outline-none transition-[border-color,background-color,transform] duration-300 ease-out hover:-translate-y-1 hover:border-[color:var(--color-azure)]/42 hover:bg-white/[0.055] focus-visible:border-[color:var(--color-azure)]/42 focus-visible:ring-2 focus-visible:ring-[color:var(--color-azure)]/25 sm:p-8"
                >
                  <p className="font-['Poppins'] text-[0.56rem] font-semibold uppercase tracking-[0.17em] text-[color:var(--color-azure)]">
                    {modelLabels[index]}
                  </p>
                  <h3 className="mt-4 max-w-[18ch] font-sans text-[1.9rem] font-medium leading-[1.05] tracking-[-0.045em] text-white sm:text-[2.15rem]">
                    {model.title}
                  </h3>
                  <p className="mt-6 max-w-[42ch] text-sm leading-6 text-white/62">
                    {model.description}
                  </p>

                  <div className="mt-auto pt-10">
                    <div
                      className="relative mx-auto h-9"
                      role="img"
                      aria-label={`Collaboration overlap ${index + 1} of 3`}
                      style={{
                        width: `calc(2.25rem + ${collaborationOffsets[index]})`,
                      }}
                    >
                      <Circle
                        className="absolute left-0 top-0 h-9 w-9 fill-white/[0.025] text-white/32"
                        strokeWidth={1.2}
                        aria-hidden="true"
                      />
                      <Circle
                        className="absolute top-0 h-9 w-9 fill-[rgb(101_200_229_/_14%)] text-[color:var(--color-azure)]"
                        strokeWidth={1.2}
                        style={{ left: collaborationOffsets[index] }}
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-3 text-center font-['Poppins'] text-[0.48rem] font-semibold uppercase tracking-[0.16em] text-white/38">
                      {collaborationCaptions[index]}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
