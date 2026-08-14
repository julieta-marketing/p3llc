import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { contactEmail, navItems } from '@/lib/content'
import { Container } from '@/components/section'

const footerContactEmail = contactEmail

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer border-t border-white/10 bg-[color:var(--surface-dark-deep)] text-white">
      <Container className="py-10 md:py-14">
        <div className="grid grid-cols-1 gap-10 border-b border-white/15 pb-10 lg:grid-cols-12 lg:gap-10 lg:pb-12">
          <div className="lg:col-span-5">
            <Link
              href="/"
              aria-label="P3 LLC home"
              className="inline-block outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-azure)]"
            >
              <Image
                src="/p3-logo-white.png"
                alt=""
                width={520}
                height={162}
                sizes="108px"
                className="h-auto w-[5.75rem] sm:w-[6.75rem]"
              />
            </Link>

            <p className="mt-7 max-w-[25ch] font-sans text-xl font-medium leading-snug tracking-[-0.025em] text-white sm:text-2xl">
              Public-private expertise for projects that move communities forward.
            </p>
          </div>

          <div className="grid gap-9 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:gap-0">
            <nav aria-label="Footer" className="sm:pr-8 lg:pr-12">
              <h2 className="font-sans text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-azure)]">
                Navigate
              </h2>
              <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-11 items-center py-2 text-sm text-white/70 outline-none transition-colors hover:text-white focus-visible:text-white focus-visible:underline sm:min-h-0 sm:py-0.5"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/contact#faq"
                    className="inline-flex min-h-11 items-center py-2 text-sm text-white/70 outline-none transition-colors hover:text-white focus-visible:text-white focus-visible:underline sm:min-h-0 sm:py-0.5"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="inline-flex min-h-11 items-center py-2 text-sm text-white/70 outline-none transition-colors hover:text-white focus-visible:text-white focus-visible:underline sm:min-h-0 sm:py-0.5"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="border-t border-white/15 pt-8 sm:border-t-0 sm:pl-8 sm:pt-0 lg:pl-12">
              <h2 className="font-sans text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-azure)]">
                Contact
              </h2>
              <a
                href={`mailto:${footerContactEmail}`}
                className="group mt-6 inline-flex items-center gap-2 text-sm text-white/72 outline-none transition-colors hover:text-white focus-visible:text-white focus-visible:underline"
              >
                {footerContactEmail}
                <ArrowUpRight
                  className="h-3.5 w-3.5 shrink-0 text-[color:var(--color-azure)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-6 text-[0.68rem] uppercase tracking-[0.12em] text-white/62 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright &copy; {year} P3 LLC - All Rights Reserved.</p>
          <Link
            href="/privacy"
            className="inline-flex min-h-11 items-center transition-colors hover:text-white focus-visible:text-white focus-visible:underline sm:min-h-0"
          >
            Privacy Policy
          </Link>
        </div>
      </Container>
    </footer>
  )
}
