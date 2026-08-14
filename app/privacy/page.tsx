import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

import { Container, Eyebrow } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { contactEmail } from '@/lib/content'

const EFFECTIVE_DATE = 'August 2026'
const WEBSITE_LABEL = 'publicprivatepartnersllc.com'
const WEBSITE_URL = 'https://publicprivatepartnersllc.com'

const LEAD =
  'Public Private Partners LLC (“P3 LLC,” “we,” “us,” or “our”) respects your privacy and is committed to protecting the information you provide through our website.'

const LEAD_SUPPORT =
  'This Privacy Policy explains what information we collect, how we use it, and the choices available to you.'

type PolicyBlock =
  | { type: 'text'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'contact' }

type PolicySection = {
  number: string
  title: string
  blocks: PolicyBlock[]
}

/**
 * Source of truth: the P3 LLC Privacy Policy document, effective August 2026.
 * Copy is reproduced verbatim — do not paraphrase legal text when editing.
 */
const sections: PolicySection[] = [
  {
    number: '01',
    title: 'Information We Collect',
    blocks: [
      {
        type: 'text',
        text: 'We may collect information you voluntarily provide when you use our website, contact us, request information, or engage with our services. This may include:',
      },
      {
        type: 'list',
        items: [
          'Name',
          'Organization',
          'Job title',
          'Email address',
          'Phone number',
          'Information submitted through contact forms',
          'Project or inquiry information',
          'Newsletter or communication preferences',
        ],
      },
      {
        type: 'text',
        text: 'We may also automatically collect limited technical information when you visit our website, such as:',
      },
      {
        type: 'list',
        items: [
          'IP address',
          'Browser and device information',
          'Pages visited',
          'Date and time of your visit',
          'Website usage information',
        ],
      },
    ],
  },
  {
    number: '02',
    title: 'How We Use Your Information',
    blocks: [
      { type: 'text', text: 'We use information we collect to:' },
      {
        type: 'list',
        items: [
          'Respond to inquiries and requests',
          'Communicate about our services and opportunities',
          'Evaluate and support potential projects',
          'Provide requested information',
          'Send newsletters or updates when you have opted in',
          'Improve our website and user experience',
          'Maintain website security and functionality',
        ],
      },
      {
        type: 'text',
        text: 'We do not use information submitted through our website to provide financial, legal, or other professional advice unless expressly agreed through a separate engagement.',
      },
    ],
  },
  {
    number: '03',
    title: 'Information Sharing',
    blocks: [
      { type: 'text', text: 'We do not sell your personal information.' },
      {
        type: 'text',
        text: 'We may share information with trusted service providers that help us operate our website, manage communications, host data, or provide other business services. These providers may only use information as necessary to perform services on our behalf.',
      },
      {
        type: 'text',
        text: 'We may also disclose information when required by law, legal process, or to protect our rights, property, or safety.',
      },
    ],
  },
  {
    number: '04',
    title: 'Cookies & Website Technologies',
    blocks: [
      {
        type: 'text',
        text: 'Our website may use cookies and similar technologies to:',
      },
      {
        type: 'list',
        items: [
          'Support website functionality',
          'Understand website traffic and usage',
          'Improve website performance and user experience',
        ],
      },
      {
        type: 'text',
        text: 'You may control cookies through your browser settings. Disabling cookies may affect certain website features.',
      },
    ],
  },
  {
    number: '05',
    title: 'Third-Party Links',
    blocks: [
      {
        type: 'text',
        text: 'Our website may contain links to third-party websites, platforms, or services, including event registration, social media, or other external resources.',
      },
      {
        type: 'text',
        text: 'We are not responsible for the privacy practices, security, or content of third-party websites. We encourage you to review their privacy policies before providing personal information.',
      },
    ],
  },
  {
    number: '06',
    title: 'Data Security',
    blocks: [
      {
        type: 'text',
        text: 'We maintain reasonable administrative, technical, and physical safeguards designed to protect personal information from unauthorized access, disclosure, alteration, or misuse.',
      },
      {
        type: 'text',
        text: 'However, no method of transmitting or storing information is completely secure, and we cannot guarantee absolute security.',
      },
    ],
  },
  {
    number: '07',
    title: 'Your Privacy Rights',
    blocks: [
      {
        type: 'text',
        text: 'Depending on where you live and applicable law, you may have rights regarding your personal information, including the right to:',
      },
      {
        type: 'list',
        items: [
          'Request access to personal information we maintain about you',
          'Request correction of inaccurate information',
          'Request deletion of your personal information, where applicable',
          'Opt out of certain marketing communications',
        ],
      },
      {
        type: 'text',
        text: 'To make a privacy-related request, please contact us using the information below.',
      },
    ],
  },
  {
    number: '08',
    title: 'Children’s Privacy',
    blocks: [
      {
        type: 'text',
        text: 'Our website is not directed to children under 13, and we do not knowingly collect personal information from children under 13.',
      },
    ],
  },
  {
    number: '09',
    title: 'Changes to This Policy',
    blocks: [
      {
        type: 'text',
        text: 'We may update this Privacy Policy periodically to reflect changes in our practices, services, or legal requirements.',
      },
      {
        type: 'text',
        text: 'Any updates will be posted on this page with a revised effective date.',
      },
    ],
  },
  {
    number: '10',
    title: 'Contact Us',
    blocks: [
      {
        type: 'text',
        text: 'If you have questions about this Privacy Policy or our privacy practices, please contact us:',
      },
      { type: 'contact' },
    ],
  },
]

export const metadata: Metadata = {
  title: 'Privacy Policy — P3 LLC',
  description:
    'How P3 LLC collects, uses, shares, and protects information submitted through this website.',
}

const linkClass =
  'group inline-flex items-center gap-2 text-[color:var(--color-blue)] underline underline-offset-4 outline-none transition-colors hover:text-[color:var(--color-dark-azure)] focus-visible:text-[color:var(--color-dark-azure)]'

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main id="main" className="flex-1">
        <section className="case-library-hero">
          <Container>
            <Reveal className="max-w-[52rem]">
              <Eyebrow onDark>Legal</Eyebrow>
              <h1>Privacy Policy</h1>
              <Link
                href="/"
                className="group mt-8 inline-flex min-h-12 w-fit items-center gap-3 rounded-full border border-white/30 px-5 font-['Poppins'] text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white outline-none transition-colors hover:border-[color:var(--color-azure)] hover:bg-[color:var(--color-azure)] hover:text-[color:var(--color-dark-azure)] focus-visible:ring-2 focus-visible:ring-[color:var(--color-azure)]"
              >
                <ArrowLeft
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                />
                Back to Home
              </Link>
            </Reveal>
          </Container>
        </section>

        <section className="bg-[color:var(--surface-1)] py-20 md:py-28">
          <Container>
            <Reveal className="max-w-[68ch]">
              <p className="font-['Poppins'] text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--blue-ink)]">
                Effective {EFFECTIVE_DATE}
              </p>
              <p className="mt-6 font-sans text-xl font-medium leading-snug tracking-[-0.025em] text-[color:var(--color-dark-azure)] sm:text-2xl">
                {LEAD}
              </p>
              <p className="mt-6 text-base leading-7 text-muted-foreground">
                {LEAD_SUPPORT}
              </p>
            </Reveal>

            <div className="mt-16 max-w-[68ch] space-y-12 md:mt-20">
              {sections.map((section, index) => (
                <Reveal key={section.number} delay={Math.min(index, 4) * 60}>
                  <section className="border-t border-[color:var(--hairline)] pt-8">
                    <div>
                      {/* Section number reads as a kicker above the heading —
                          the site's standard eyebrow idiom. Baseline-aligning a
                          9px numeral beside a 30px heading made it look like a
                          stray mark. */}
                      <span
                        aria-hidden="true"
                        className="block font-['Poppins'] text-[0.62rem] font-semibold uppercase tabular-nums tracking-[0.2em] text-[color:var(--blue-ink)]"
                      >
                        {section.number}
                      </span>
                      <h2 className="mt-3 font-sans text-xl font-medium tracking-[-0.03em] text-[color:var(--color-dark-azure)] md:text-2xl">
                        {section.title}
                      </h2>
                    </div>

                    <div className="mt-6 space-y-5">
                      {section.blocks.map((block, blockIndex) => {
                        if (block.type === 'list') {
                          return (
                            <ul
                              key={`list-${blockIndex}`}
                              className="space-y-2.5"
                            >
                              {block.items.map((item) => (
                                <li
                                  key={item}
                                  className="relative pl-5 text-base leading-7 text-muted-foreground before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[color:var(--color-blue)]"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )
                        }

                        if (block.type === 'contact') {
                          return (
                            <div
                              key={`contact-${blockIndex}`}
                              className="flex flex-col gap-3 pt-1"
                            >
                              <a
                                href={`mailto:${contactEmail}`}
                                className={linkClass}
                              >
                                {contactEmail}
                              </a>
                              <a
                                href={WEBSITE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={linkClass}
                              >
                                {WEBSITE_LABEL}
                                <ArrowUpRight
                                  aria-hidden="true"
                                  className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                              </a>
                            </div>
                          )
                        }

                        return (
                          <p
                            key={`text-${blockIndex}`}
                            className="text-base leading-7 text-muted-foreground"
                          >
                            {block.text}
                          </p>
                        )
                      })}
                    </div>
                  </section>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
