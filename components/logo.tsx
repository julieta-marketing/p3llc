import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
  priority?: boolean
}

/* The footer renders its own white wordmark, so only the header preset lives here. */
const logoSizes = {
  header: {
    frame: 'h-[38px] w-[119px] lg:h-[41px] lg:w-[129px] 2xl:h-[46px] 2xl:w-[144px]',
    sizes: '(min-width: 1536px) 144px, (min-width: 1024px) 129px, 119px',
  },
} as const

export function Logo({ className, priority = false }: LogoProps) {
  const dimensions = logoSizes.header

  return (
    <Link
      href="/"
      aria-label="P3 LLC home"
      className={cn(
        'relative block shrink-0 overflow-hidden bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-blue)] focus-visible:ring-offset-2',
        dimensions.frame,
        className,
      )}
    >
      <Image
        src="/p3-llc-header.png"
        alt=""
        width={1254}
        height={400}
        priority={priority}
        sizes={dimensions.sizes}
        className="pointer-events-none h-full w-full select-none object-contain"
      />
    </Link>
  )
}
