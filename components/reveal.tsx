'use client'

import { cn } from '@/lib/utils'
import {
  useLayoutEffect,
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
  const [pending, setPending] = useState(false)
  const [visible, setVisible] = useState(false)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return

    const rect = node.getBoundingClientRect()
    const hashId = window.location.hash.slice(1)
    const hashTarget = hashId ? document.getElementById(hashId) : null
    const isHashDestination = Boolean(
      hashTarget &&
        (hashTarget === node ||
          hashTarget.contains(node) ||
          node.contains(hashTarget)),
    )
    const isAlreadyVisible =
      isHashDestination ||
      (rect.bottom > 0 && rect.top < window.innerHeight * 0.92)

    // Never hide content the visitor can already see. This also prevents a
    // blank section while a slower device or LAN preview is hydrating.
    if (isAlreadyVisible) {
      setVisible(true)
      return
    }

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    setPending(true)

    // An element taller than the viewport can never expose a useful share of
    // itself at once, so use zero only when the normal threshold is unreachable.
    const reachableRatio =
      node.offsetHeight > 0 ? window.innerHeight / node.offsetHeight : 1
    const threshold = reachableRatio < 0.12 ? 0 : 0.08

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={cn(
        variantClass[variant],
        pending && !visible && 'is-pending',
        visible && 'is-visible',
        className,
      )}
      style={{
        ...style,
        ...(delay ? { transitionDelay: `${delay}ms` } : {}),
      }}
    >
      {children}
    </Tag>
  )
}
