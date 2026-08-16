import type { Metadata } from 'next'
import { ArrowUpRight, Mail } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Container, Eyebrow } from '@/components/section'
import { ContactForm } from '@/components/contact-form'
import { Faq } from '@/components/faq'
import { Reveal } from '@/components/reveal'
import { contactInfo } from '@/lib/content'
import { ContactRippleField } from '@/components/contact-ripple-field'

export const metadata: Metadata = {
  title: 'Discuss Your Project — P3 LLC',
  description:
    'Share your project goals, constraints, and timeline with the P3 LLC team.',
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main" className="bg-[color:var(--surface-dark)]">
        <section className="relative isolate overflow-hidden bg-[color:var(--surface-dark)] pb-24 pt-36 text-white md:pb-32 md:pt-44 lg:pb-36">
          <div className="contact-open pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="absolute inset-0 z-[1]" aria-hidden="true">
            <ContactRippleField />
          </div>
          <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(6,20,26,0.28),rgba(6,20,26,0.08)_40%,rgba(6,20,26,0.48))]" aria-hidden="true" />
          <Container className="relative z-10">
            <Reveal>
              <Eyebrow onDark>Contact P3 LLC</Eyebrow>
              <div className="mt-8">
                <h1 className="max-w-[13ch] font-sans text-[3.15rem] font-medium leading-[0.98] tracking-[-0.05em] text-white sm:text-[4rem] lg:text-[4.9rem]">
                  Discuss Your Project
                </h1>
                <p className="mt-7 max-w-[80ch] text-[1.02rem] leading-7 text-white/68 md:text-[1.08rem] md:leading-8">
                  Share your goals, constraints, and timeline. We’ll help identify
                  practical next steps.
                </p>
              </div>
            </Reveal>

            <div className="mt-16 grid grid-cols-1 gap-4 lg:mt-20 lg:grid-cols-12">
              <aside className="relative rounded-[1.4rem] bg-white/[0.055] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.25)] ring-1 ring-white/8 backdrop-blur-xl sm:p-9 lg:col-span-4 lg:p-10">
                <Reveal>
                  <Eyebrow onDark>Direct Contact</Eyebrow>
                  <h2 className="mt-7 max-w-[11ch] font-sans text-[2rem] font-medium leading-[1.04] tracking-[-0.04em] !text-white sm:text-[2.45rem]">
                    Email Our Team
                  </h2>
                  <p className="mt-6 max-w-[36ch] text-[0.98rem] leading-7 text-white/68">
                    For project and partnership inquiries, contact us directly.
                  </p>
                  <ul className="mt-10 flex flex-col gap-3">
                    {contactInfo.emails.map((email) => (
                      <li key={email}>
                        <a
                          href={`mailto:${email}`}
                          className="group flex min-h-14 items-center gap-3 rounded-xl bg-white/[0.065] px-4 py-3 text-[0.95rem] text-white/78 outline-none ring-1 ring-white/8 transition-[background-color,color] hover:bg-white/[0.1] hover:text-white focus-visible:ring-2 focus-visible:ring-[#67cce5]"
                        >
                          <Mail className="h-4 w-4 shrink-0 text-[#67cce5]" aria-hidden="true" />
                          <span className="min-w-0 break-all">{email}</span>
                          <ArrowUpRight
                            className="ml-auto h-4 w-4 shrink-0 text-[#67cce5] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </aside>
              <Reveal className="rounded-[1.4rem] bg-[color:var(--surface-dark-deep)]/74 p-7 shadow-[0_30px_80px_rgba(0,0,0,0.25)] ring-1 ring-white/8 backdrop-blur-xl sm:p-9 lg:col-span-8 lg:p-11 xl:p-14">
                <div className="mb-9">
                  <Eyebrow onDark>Project Details</Eyebrow>
                  <h2 className="mt-5 font-sans text-[1.75rem] font-medium tracking-[-0.035em] text-white sm:text-[2.1rem]">
                    Tell Us About Your Project
                  </h2>
                </div>
                <ContactForm />
              </Reveal>
            </div>
          </Container>
        </section>

        <section
          id="faq"
          className="scroll-mt-24 bg-[color:var(--surface-2)] py-20 text-[color:var(--color-dark-azure)] md:py-28 lg:py-32"
        >
          <Container>
            <div>
              <Reveal>
                <Eyebrow>FAQ</Eyebrow>
                <h2 className="mt-7 font-sans text-[2.6rem] font-medium leading-[1.03] tracking-[-0.045em] text-[color:var(--color-dark-azure)] md:text-[3.5rem]">
                  Frequently Asked Questions
                </h2>
              </Reveal>
              <Reveal className="mt-12 md:mt-14">
                <Faq />
              </Reveal>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
