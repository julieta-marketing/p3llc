import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

const base =
  'group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border font-sans text-[0.76rem] font-semibold uppercase tracking-[0.13em] transition-[color,background-color,border-color] duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-3 disabled:pointer-events-none disabled:opacity-50'

const sizes = {
  md: 'h-11 px-5',
  lg: 'h-13 px-6 md:px-7',
} as const

const variants = {
  accent:
    'border-[color:var(--color-blue)] bg-[color:var(--color-blue)] text-white hover:border-[color:var(--color-dark-azure)] hover:bg-[color:var(--color-dark-azure)]',
  dark:
    'border-[color:var(--color-navy)] bg-[color:var(--color-navy)] text-white hover:border-[color:var(--color-dark-azure)] hover:bg-[color:var(--color-dark-azure)]',
  light:
    'border-white bg-white text-[color:var(--color-dark-azure)] hover:border-[color:var(--color-azure)] hover:bg-[color:var(--color-azure)]',
  outline:
    'border-[color:var(--color-navy)]/35 bg-transparent text-[color:var(--color-navy)] hover:border-[color:var(--color-navy)] hover:bg-[color:var(--color-navy)] hover:text-white',
  outlineInverse:
    'border-white/45 bg-transparent text-white hover:border-white hover:bg-white hover:text-[color:var(--color-dark-azure)]',
} as const

type CtaLinkProps = ComponentProps<typeof Link> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  arrow?: boolean
}

export function CtaLink({
  variant = 'accent',
  size = 'md',
  arrow = false,
  className,
  children,
  ...props
}: CtaLinkProps) {
  return (
    <Link className={cn(base, sizes[size], variants[variant], className)} {...props}>
      <span>{children}</span>
      {arrow && <ArrowRight className="link-arrow h-3.5 w-3.5" aria-hidden="true" />}
    </Link>
  )
}

type CtaButtonProps = ComponentProps<'button'> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  arrow?: boolean
}

export function CtaButton({
  variant = 'accent',
  size = 'md',
  arrow = false,
  className,
  type = 'button',
  children,
  ...props
}: CtaButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    >
      <span>{children}</span>
      {arrow && <ArrowRight className="link-arrow h-3.5 w-3.5" aria-hidden="true" />}
    </button>
  )
}
