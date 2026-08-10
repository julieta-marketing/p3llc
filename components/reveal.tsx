'use client'

import { cn } from '@/lib/utils'
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react'

type RevealVariant = 'fade' | 'image' | 'line' | 'line-vertical'

const variantClass: Record<RevealVariant, string> = {
  fade: 'reveal',
  image: 'img-reveal',
  line: 'process-line',
  'line-vertical': 'process-line-vertical',
}

type RevealProps = {
  children: ReactNode
  as?: ElementType
  className?: string
  /** Optional stagger delay in ms */
  delay?: number
  /** Animation style: fade (default), image reveal, or process line draw */
  variant?: RevealVariant
  style?: CSSProperties
}

/**
 * Subtle reveal-on-scroll. Respects prefers-reduced-motion (handled in CSS)
 * and reveals immediately if IntersectionObserver is unavailable.
 */
export function Reveal({
  children,
  as,
  className,
  delay = 0,
  variant = 'fade',
  style,
}: RevealProps) {
  const Tag = (as ?? 'div') as ElementType
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={cn(variantClass[variant], visible && 'is-visible', className)}
      style={{
        ...style,
        ...(delay ? { transitionDelay: `${delay}ms` } : {}),
      }}
    >
      {children}
    </Tag>
  )
}
