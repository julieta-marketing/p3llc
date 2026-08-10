import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'
import { Reveal } from '@/components/reveal'

type Tone = 'default' | 'soft' | 'panel' | 'dark'

const toneClass: Record<Tone, string> = {
  default: 'bg-background text-foreground',
  soft: 'bg-[color:var(--color-lgb-soft)] text-foreground',
  panel: 'bg-[#f5f7f7] text-foreground',
  dark: 'bg-[color:var(--color-dark-azure)] text-white',
}

export const containerClass =
  'mx-auto w-full max-w-[96rem] px-5 sm:px-7 md:px-10 lg:px-12'

export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn(containerClass, className)}>{children}</div>
}

type SectionProps = {
  id?: string
  children: ReactNode
  className?: string
  tone?: Tone
  bordered?: boolean
}

export function Section({
  id,
  children,
  className,
  tone = 'default',
  bordered = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative scroll-mt-24 overflow-hidden py-20 md:py-28 lg:py-40',
        toneClass[tone],
        bordered && 'border-t border-border',
        className,
      )}
    >
      <div className={containerClass}>{children}</div>
    </section>
  )
}

type EyebrowProps = {
  children: ReactNode
  className?: string
  onDark?: boolean
  bare?: boolean
}

export function Eyebrow({
  children,
  className,
  onDark = false,
  bare = false,
}: EyebrowProps) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.2em]',
        onDark ? 'text-[color:var(--color-azure)]' : 'text-[color:var(--color-blue)]',
        className,
      )}
    >
      {!bare && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            onDark ? 'bg-[color:var(--color-azure)]' : 'bg-[color:var(--color-blue)]',
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </p>
  )
}

type SectionHeadingProps = {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  className?: string
  onDark?: boolean
  aside?: ReactNode
  index?: string
}

export function SectionHeading({
  title,
  lead,
  className,
  onDark = false,
  aside,
  index,
}: SectionHeadingProps) {
  const rightNode =
    aside ??
    (index ? (
      <span
        className={cn(
          'shrink-0 font-sans text-[0.62rem] font-semibold tabular-nums tracking-[0.28em]',
          onDark ? 'text-white/65' : 'text-muted-foreground',
        )}
      >
        {index}
      </span>
    ) : null)

  return (
    <Reveal
      className={cn(
        'flex items-start justify-between gap-8',
        className,
      )}
    >
      <div className="min-w-0">
        <h2
          className={cn(
            'max-w-[20ch] text-pretty font-serif text-[2.25rem] leading-[1.05] tracking-[-0.035em] md:text-[3rem] lg:text-[3.7rem]',
            onDark && 'text-white',
          )}
        >
          {title}
        </h2>
        {lead ? (
          <p
            className={cn(
              'mt-5 max-w-[56ch] text-base leading-7 md:text-lg md:leading-8',
              onDark ? 'text-white/68' : 'text-muted-foreground',
            )}
          >
            {lead}
          </p>
        ) : null}
      </div>
      {rightNode}
    </Reveal>
  )
}
