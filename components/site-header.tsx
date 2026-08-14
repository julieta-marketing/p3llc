'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Menu, X } from 'lucide-react'

import { Logo } from '@/components/logo'
import { navItems } from '@/lib/content'
import { cn } from '@/lib/utils'

const desktopNavItems = [
  'About',
  'Leadership',
  'Solutions',
  'Case Studies',
  'Our Approach',
].map((label) => navItems.find((item) => item.label === label)!)

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    const backgroundRegions = Array.from(
      document.querySelectorAll<HTMLElement>('main, footer'),
    )
    const previousAriaHidden = backgroundRegions.map((region) =>
      region.getAttribute('aria-hidden'),
    )

    if (open) {
      backgroundRegions.forEach((region) => {
        region.setAttribute('inert', '')
        region.setAttribute('aria-hidden', 'true')
      })
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
      backgroundRegions.forEach((region, index) => {
        region.removeAttribute('inert')
        const previousValue = previousAriaHidden[index]
        if (previousValue === null) region.removeAttribute('aria-hidden')
        else region.setAttribute('aria-hidden', previousValue)
      })
    }
  }, [open])

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-2 z-[110] -translate-y-20 rounded-[4px] bg-[color:var(--color-navy)] px-4 py-2.5 font-['Poppins'] text-xs font-semibold text-white transition-transform duration-200 focus:translate-y-0"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'site-header fixed inset-x-0 top-0 z-50 w-full',
          scrolled && 'is-scrolled',
          open && 'is-open',
        )}
      >
        <div
          className={cn(
            'site-header__inner mx-auto grid h-[3.75rem] w-full max-w-[96rem] grid-cols-[1fr_auto] items-center px-9 sm:px-12 md:px-16 min-[1180px]:h-[4.25rem] min-[1180px]:grid-cols-[1fr_auto_1fr] min-[1180px]:px-20 xl:px-24 2xl:h-[4.5rem] 2xl:px-28',
          )}
        >
          <Logo priority className="justify-self-start" />

          <nav
            aria-label="Primary"
            className="site-header__nav hidden items-center min-[1180px]:flex"
          >
            {desktopNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="site-header__link whitespace-nowrap font-['Poppins'] text-[0.72rem] font-medium tracking-[0.035em] text-[color:var(--color-navy)] outline-none 2xl:text-[0.78rem]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="site-header__cta group hidden items-center justify-center justify-self-end font-['Poppins'] text-[0.7rem] font-semibold tracking-[0.045em] text-white outline-none min-[1180px]:inline-flex 2xl:text-[0.75rem]"
          >
            <span>Contact Us</span>
            <ArrowUpRight
              className="site-header__cta-arrow h-3.5 w-3.5"
              aria-hidden="true"
            />
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className="site-header__toggle inline-flex h-10 w-10 items-center justify-center justify-self-end rounded-full text-[color:var(--color-navy)] outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-blue)] focus-visible:ring-offset-2 min-[1180px]:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
            ) : (
              <Menu className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
            )}
          </button>
        </div>

        <div
          id="mobile-nav"
          aria-hidden={!open}
          className={cn(
            'site-header__mobile absolute inset-x-0 top-full h-[calc(100svh-3.75rem)] overflow-y-auto text-[color:var(--color-navy)] min-[1180px]:hidden',
            open ? 'is-open visible opacity-100' : 'invisible opacity-0',
          )}
        >
          <nav
            aria-label="Mobile"
            className="mx-auto flex min-h-full w-full flex-col px-9 py-6 sm:px-12 md:px-16"
          >
            <div className="flex flex-col">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className="site-header__mobile-link flex items-center gap-5 border-b border-black/[0.07] py-4 font-['Poppins'] text-[1rem] font-medium tracking-[-0.01em] outline-none"
                >
                  <span className="text-[0.55rem] font-semibold tracking-[0.18em] text-[color:var(--color-blue)]/65">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
            <Link
              href="/contact"
              tabIndex={open ? 0 : -1}
              className="site-header__cta mt-7 inline-flex h-12 items-center justify-center gap-3 rounded-full px-5 font-['Poppins'] text-[0.75rem] font-semibold tracking-[0.04em] text-white outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-blue)] focus-visible:ring-offset-2"
              onClick={() => setOpen(false)}
            >
              <span>Contact Us</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </header>
    </>
  )
}
