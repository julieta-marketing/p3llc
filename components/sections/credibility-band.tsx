import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { Reveal } from '@/components/reveal'
import { containerClass } from '@/components/section'
import { cn } from '@/lib/utils'

const metrics = [
  {
    value: '$6B+',
    label: 'In Project Value',
    href: '#case-studies',
    featured: true,
  },
  {
    value: '20+',
    label: 'Years of Experience',
    href: '#leadership',
    featured: false,
  },
  {
    value: '18M+',
    label: 'Square Feet Delivered',
    href: '#case-studies',
    featured: false,
  },
  {
    value: 'Public + Private',
    label: 'Sector Leadership',
    href: '#about',
    featured: false,
  },
]

export function CredibilityBand() {
  return (
    <section
      id="experience"
      aria-labelledby="track-record-title"
      className="relative z-20 bg-[color:var(--color-lgb-soft)] pb-20 md:pb-24 lg:pb-28"
    >
      <div className={cn(containerClass, 'relative')}>
        <div className="-mt-7 border-x border-b border-black/[0.07] border-t border-t-[color:var(--color-dark-azure)] bg-[#f7f9f9] px-4 py-7 shadow-[0_14px_40px_rgba(7,26,34,0.055)] sm:-mt-9 sm:px-6 sm:py-8 lg:-mt-10 lg:px-8 lg:py-9">
          <Reveal className="grid grid-cols-1 gap-4 px-1 md:grid-cols-12 md:items-center md:gap-8">
            <p className="flex items-center gap-3 font-['Poppins'] text-[0.69rem] font-medium uppercase tracking-[0.18em] text-[color:var(--color-navy)] md:col-span-4">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-blue)]"
                aria-hidden="true"
              />
              Track Record
            </p>
            <h2
              id="track-record-title"
              className="max-w-[52ch] font-sans text-base font-normal leading-7 tracking-[-0.015em] text-[color:var(--color-dark-azure)] md:col-span-7 md:col-start-6 md:text-lg"
            >
              A concise snapshot of the experience behind P3 LLC.
            </h2>
          </Reveal>

          <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:mt-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_minmax(0,1.05fr)] lg:gap-4">
            {metrics.map((metric, index) => (
              <Reveal
                key={metric.label}
                as="li"
                delay={index * 70}
                className={cn(
                  metric.featured && 'sm:col-span-2 md:col-span-3 lg:col-span-1',
                  index === metrics.length - 1 &&
                    'sm:col-span-2 md:col-span-1',
                )}
              >
                <Link
                  href={metric.href}
                  aria-label={`${metric.value} ${metric.label}`}
                  className={cn(
                    'group relative flex h-full min-h-[12.5rem] flex-col overflow-hidden rounded-[5px] border p-5 outline-none transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(7,26,34,0.09)] focus-visible:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[color:var(--color-blue)] focus-visible:ring-offset-3 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0 sm:min-h-[13.5rem] sm:p-6 lg:min-h-[15rem]',
                    metric.featured
                      ? 'border-[color:var(--color-azure)]/45 bg-[#dff3f8] hover:border-[color:var(--color-blue)]/45 hover:bg-[#d4eef5]'
                      : 'border-black/[0.09] bg-white/78 hover:border-[color:var(--color-blue)]/35 hover:bg-white',
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-['Poppins'] text-[0.6rem] font-medium tracking-[0.18em] text-[color:var(--color-blue)]">
                      {String(index + 1).padStart(2, '0')}
                      {metric.featured && (
                        <span className="ml-2 text-[color:var(--color-navy)]/55">
                          Featured
                        </span>
                      )}
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.12] bg-white/70 text-[color:var(--color-navy)] transition-[background-color,color,border-color] duration-300 group-hover:border-[color:var(--color-blue)] group-hover:bg-[color:var(--color-blue)] group-hover:text-white group-focus-visible:border-[color:var(--color-blue)] group-focus-visible:bg-[color:var(--color-blue)] group-focus-visible:text-white">
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                        aria-hidden="true"
                      />
                    </span>
                  </div>

                  <p
                    className={cn(
                      'mt-7 font-sans font-normal leading-[0.92] tracking-[-0.06em] text-[color:var(--color-dark-azure)]',
                      metric.value.length > 6
                        ? 'max-w-[9ch] text-[2.25rem] sm:text-[2.5rem] lg:text-[2.7rem]'
                        : metric.featured
                          ? 'text-[4rem] sm:text-[4.5rem] lg:text-[5rem]'
                          : 'text-[3.25rem] sm:text-[3.5rem] lg:text-[3.8rem]',
                    )}
                  >
                    {metric.value}
                  </p>

                  <p className="mt-auto max-w-[18ch] pt-7 font-['Poppins'] text-[0.67rem] font-medium uppercase leading-5 tracking-[0.12em] text-[color:var(--color-navy)]/62">
                    {metric.label}
                  </p>

                  <span
                    className="absolute inset-x-5 bottom-0 h-0.5 origin-left scale-x-0 bg-[color:var(--color-blue)] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none sm:inset-x-6"
                    aria-hidden="true"
                  />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
