import Image from 'next/image'

import { Reveal } from '@/components/reveal'
import { containerClass } from '@/components/section'

export function PartnershipValueBar() {
  return (
    <aside
      className="relative isolate overflow-hidden border-y border-white/10 bg-[color:var(--color-navy)] py-12 text-white sm:py-14"
      aria-labelledby="partnership-value-title"
    >
      <Image
        src="/approved-long-beach-downtown.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center opacity-25"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(10,52,72,0.95)_0%,rgba(8,126,164,0.86)_100%)]"
        aria-hidden="true"
      />

      <div className={`${containerClass} grid gap-7 lg:grid-cols-12 lg:items-center lg:gap-12`}>
        <h2
          id="partnership-value-title"
          className="font-sans text-[2.8rem] font-medium leading-[1.02] tracking-[-0.05em] text-white sm:text-[3.5rem] lg:col-span-5 lg:text-[4rem]"
        >
          <Reveal as="span" className="block will-change-transform">
            Why
          </Reveal>
          <Reveal as="span" delay={90} className="block will-change-transform">
            public&#8209;private
          </Reveal>
          <Reveal as="span" delay={180} className="block will-change-transform">
            partnerships?
          </Reveal>
        </h2>

        <Reveal
          as="p"
          delay={320}
          className="max-w-[52ch] text-[1.08rem] font-medium leading-7 text-white/95 sm:text-[1.2rem] sm:leading-8 lg:col-span-7 lg:text-[1.3rem] lg:leading-9"
        >
          Public-private partnerships help agencies deliver projects faster,
          expand funding opportunities, and leverage private-sector expertise to
          achieve better outcomes.
        </Reveal>
      </div>
    </aside>
  )
}
