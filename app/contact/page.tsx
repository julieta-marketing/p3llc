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
  title: "Let's Discuss Your Project — P3 LLC",
  description:
    'Tell us about your project, funding needs, delivery challenges, or partnership opportunities. Our team will follow up to discuss possible next steps.',
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
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/25 px-4 py-2 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#67cce5] shadow-[0_0_12px_#67cce5]" />
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/56">P3 / Contact</span>
              </div>
              <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
                <h1 className="max-w-[11ch] font-serif text-[3.25rem] leading-[0.96] tracking-[-0.045em] text-white sm:text-6xl lg:col-span-8 lg:text-[5.65rem]">
                  Move complex projects forward.
                </h1>
                <p className="max-w-[46ch] text-base leading-7 text-white/52 md:text-lg md:leading-8 lg:col-span-4">
                  Tell us about your project, funding needs, delivery challenges,
                  or partnership opportunities. Our team will follow up to
                  discuss possible next steps.
                </p>
              </div>
            </Reveal>

            <div className="mt-16 grid grid-cols-1 overflow-hidden rounded-[1.4rem] border border-white/12 bg-[color:var(--surface-dark-deep)]/82 shadow-[0_36px_100px_rgba(0,0,0,0.42)] backdrop-blur-xl lg:mt-24 lg:grid-cols-12">
              <aside className="relative border-b border-white/10 p-7 sm:p-9 lg:col-span-4 lg:border-b-0 lg:border-r lg:p-11">
                <Reveal>
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#67cce5]">Project brief / 01</p>
                  <h2 className="mt-8 max-w-[10ch] font-serif text-3xl leading-[1.05] tracking-[-0.03em] !text-white sm:text-4xl">Start with a conversation.</h2>
                  <p className="mt-6 max-w-[34ch] text-sm leading-6 text-white/58">
                    Whether you are exploring an idea or advancing an active
                    project, we are glad to help you identify potential next
                    steps and resources.
                  </p>
                  <div className="mt-12 border-t border-white/10 pt-6">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/62">Direct contact</p>
                    <ul className="mt-5 flex flex-col gap-4">
                      {contactInfo.emails.map((email) => (
                        <li key={email}>
                          <a
                            href={`mailto:${email}`}
                            className="group inline-flex items-center gap-2 break-all text-sm text-white/66 outline-none transition-colors hover:text-[#67cce5] focus-visible:text-[#67cce5]"
                          >
                            <Mail className="h-3.5 w-3.5 shrink-0 text-[#67cce5]" aria-hidden="true" />
                            {email}
                            <ArrowUpRight
                              className="h-3.5 w-3.5 shrink-0 opacity-0 transition-[opacity,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-14 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.18em] text-white/62">
                    <span className="h-px w-10 bg-[#67cce5]/50" /> Confidential inquiry
                  </div>
                </Reveal>
              </aside>
              <Reveal className="p-7 sm:p-9 lg:col-span-8 lg:p-11 xl:p-14">
                <div className="mb-9 flex items-center justify-between border-b border-white/10 pb-5">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.19em] text-white/62">Tell us what you are working on</p>
                  <span className="text-[0.68rem] tabular-nums tracking-[0.15em] text-white/62">02 / 02</span>
                </div>
                <ContactForm />
              </Reveal>
            </div>
          </Container>
        </section>

        <section
          id="faq"
          className="scroll-mt-24 border-t border-white/8 bg-[color:var(--surface-dark-deep)] py-20 text-white md:py-28 lg:py-32"
        >
          <Container>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
              <Reveal className="lg:col-span-3">
                <Eyebrow onDark>FAQ</Eyebrow>
                <h2 className="mt-7 max-w-[12ch] font-serif text-4xl leading-[1.05] tracking-[-0.025em] text-white md:text-5xl">
                  Frequently Asked Questions
                </h2>
              </Reveal>
              <Reveal className="lg:col-span-8 lg:col-start-5">
                <Faq tone="dark" />
              </Reveal>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
