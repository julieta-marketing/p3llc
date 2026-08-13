/**
 * Centralized, CMS-ready content for the P3 LLC site.
 * All editable copy lives in these arrays so a CMS can be wired in later
 * without touching component markup. Source of truth: P3 LLC Website Outline
 * and Case Studies document. Do not invent claims, results, or credentials.
 */

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export type NavItem = {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: 'About', href: '/#about' },
  { label: 'Leadership', href: '/#leadership' },
  { label: 'Case Studies', href: '/#case-studies' },
  { label: 'Solutions', href: '/#services' },
  { label: 'Our Network', href: '/#who-we-serve' },
  { label: 'Our Approach', href: '/#how-we-work' },
  { label: 'News', href: '/#news' },
]

/* ------------------------------------------------------------------ */
/* About — partner organizations                                       */
/* ------------------------------------------------------------------ */

/** Client-approved City of Long Beach photography. */
export const heroImages = [
  {
    src: '/approved-long-beach-cityscape.jpg',
    alt: 'Aerial view of the Long Beach waterfront with the Queen Mary, marina, downtown skyline, and snow-capped mountains',
    position: '50% center',
  },
  {
    src: '/approved-long-beach-hero.jpg',
    alt: 'Long Beach waterfront and downtown skyline illuminated at dusk, viewed across the marina',
    position: '52% center',
  },
  {
    src: '/approved-long-beach-downtown.jpg',
    alt: 'Aerial view along a downtown Long Beach boulevard with high-rise buildings and the port in the distance',
    position: '52% center',
  },
] as const
export const aboutImage = null

/** Minimal metadata shown beneath the approved hero project image. */
export const heroMeta = {
  project: 'Long Beach Convention Center & Entertainment District',
  type: 'Waterfront Revitalization · Public-Private Partnership',
}

export const aboutIntro =
  'A joint venture of Sunstone Cities and Fullerton Consulting Partners, uniting public-sector leadership with private-sector delivery.'

export type Partner = {
  name: string
  description: string
}

export const partners: Partner[] = [
  {
    name: 'Sunstone Cities',
    description:
      'Economic development consulting firm supporting public agencies with project delivery and capital access.',
  },
  {
    name: 'Fullerton Consulting Partners',
    description:
      'Infrastructure Development and procurement advisory firm with a specialty of creating cost-neutral, sustainable public projects by leveraging private sector resources.',
  },
]

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type Service = {
  title: string
  description: string
}

export const services: Service[] = [
  {
    title: 'Alternative Financing',
    description:
      'Private capital, bridge financing, grants, and incentives for public projects.',
  },
  {
    title: 'Alternative Delivery',
    description:
      'P3, DBFOM, and Design-Build models evaluated to improve project outcomes.',
  },
  {
    title: 'Expert Network',
    description:
      'Access to developers, operators, capital providers, and subject-matter experts.',
  },
  {
    title: 'Economic Development Implementation',
    description:
      'Planning, financial analysis, and investment-attraction strategy.',
  },
]

/* ------------------------------------------------------------------ */
/* Why public agencies work with us                                    */
/* ------------------------------------------------------------------ */

export type ValuePoint = {
  title: string
  description: string
}

export const whyPoints: ValuePoint[] = [
  {
    title: 'Public + Private Experience',
    description: 'Government insight with private-sector execution.',
  },
  {
    title: 'Tailored Solutions',
    description: 'Strategies shaped around each project.',
  },
  {
    title: 'Capital & Expertise',
    description: 'Direct access to funding and specialists.',
  },
  {
    title: 'Public Benefit',
    description: 'Lower risk and lasting community value.',
  },
]

/* ------------------------------------------------------------------ */
/* Case studies                                                        */
/* ------------------------------------------------------------------ */

/* Case studies are loaded from content/cases by lib/cases.ts. */

/* ------------------------------------------------------------------ */
/* Engagement models                                                   */
/* ------------------------------------------------------------------ */

export type EngagementModel = {
  title: string
  description: string
}

export const engagementModels: EngagementModel[] = [
  {
    title: 'Consultant',
    description:
      'Choose this when your team will lead the project but needs targeted expertise in financing, structuring, procurement, or capital strategy.',
  },
  {
    title: "Owner's Representative",
    description:
      'Choose this when you need a trusted extension of your staff to coordinate planning, procurement, development, and delivery on the owner’s behalf.',
  },
  {
    title: 'Turnkey / Full-Process Coordination',
    description:
      'Choose this when you want one team to coordinate partners, capital, decisions, and execution from early concept through completion.',
  },
]

/* ------------------------------------------------------------------ */
/* Who we serve                                                        */
/* ------------------------------------------------------------------ */

export type ServeGroup = {
  heading: string
  items: string[]
}

export const whoWeServe: ServeGroup[] = [
  {
    heading: 'Public Sector Project Owners',
    items: [
      'Cities',
      'Counties',
      'Special Districts',
      'Infrastructure Agencies',
      'Economic Development Organizations',
    ],
  },
  {
    heading: 'Private Sector Service Providers',
    items: [
      'Developers',
      'Infrastructure Operators',
      'Capital Providers',
      'Engineering Firms',
      'Construction Companies',
      'Technical Consultants',
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Our approach — 3-step process                                       */
/* ------------------------------------------------------------------ */

export type ProcessStep = {
  number: string
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Assess',
    description:
      'Evaluate project goals, constraints, and opportunities.',
  },
  {
    number: '02',
    title: 'Structure',
    description:
      'Develop the right financing, delivery strategy, and partnership model.',
  },
  {
    number: '03',
    title: 'Deliver',
    description:
      'Connect the right partners and support project execution.',
  },
]

/* ------------------------------------------------------------------ */
/* Team                                                                */
/* ------------------------------------------------------------------ */

export type TeamMember = {
  name: string
  role: string
  expertise: string[]
  achievements: Array<{
    value: string
    label: string
  }>
  image: string
  /** Decorative case-study photo that fills the inner half of the leadership panel. */
  caseImage: string
  /** Alt text / caption for the case-study photo. */
  caseImageAlt: string
  linkedin: string
  email: string
  bio: string
}

export const team: TeamMember[] = [
  {
    name: 'Jeff Fullerton',
    role: 'CEO & Managing Member, P3 LLC',
    expertise: [
      '20+ Years of Infrastructure Development and P3 Expertise',
      '$6B+ in Project Experience',
    ],
    achievements: [
      { value: '20+', label: 'Years in infrastructure and P3 delivery' },
      { value: '$6B+', label: 'Project experience' },
    ],
    image: '/leadership-jeff-fullerton-2026.jpg',
    caseImage: '/case-studies/long-beach-civic-center-approved.webp',
    caseImageAlt: 'Long Beach Civic Center',
    linkedin: 'https://www.linkedin.com/in/jeffreyfullerton/',
    email: 'projects@P3LLC.net',
    bio:
      'Jeff Fullerton is a real estate development, infrastructure, finance, and public-private partnership professional with more than 20 years of experience delivering technically complex public and private projects. His work spans development, procurement, financing, project structuring, and multiple alternative-delivery models.',
  },
  {
    name: 'John Keisler',
    role: 'CFO & Managing Member, P3 LLC',
    expertise: ['20+ Years of Government Experience'],
    achievements: [
      { value: '20+', label: 'Years of government experience' },
      { value: 'Public + Private', label: 'Partnership leadership' },
    ],
    image: '/leadership-john-keisler.jpg',
    caseImage: '/case-studies/queen-mary-approved.png',
    caseImageAlt: 'Queen Mary',
    linkedin: 'https://www.linkedin.com/in/jpkeisler/',
    email: 'john.keisler@sunstonecities.com',
    bio:
      'John P. Keisler is an economic development leader with more than two decades of public-sector experience. His work spans public-private partnerships, strategic investment, innovation districts, workforce development, and major civic and economic-development initiatives.',
  },
]

/* ------------------------------------------------------------------ */
/* News & Insights                                                     */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* FAQ — Contact page only                                             */
/* ------------------------------------------------------------------ */

export type FaqItem = {
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    question: 'What is a public-private partnership (P3)?',
    answer:
      'A public-private partnership (P3) is a collaborative approach that brings together public agencies and private-sector partners to finance, develop, operate, or maintain public infrastructure and economic development projects.',
  },
  {
    question: 'What types of projects does P3 LLC support?',
    answer:
      'We support a wide range of infrastructure and economic development projects, including civic facilities, mixed-use developments, tourism assets, innovation districts, public spaces, transportation infrastructure, and other community-serving projects.',
  },
  {
    question: 'Who does P3 LLC work with?',
    answer:
      'Our primary clients are public sector project owners, including cities, counties, special districts, and economic development organizations. We also work with developers, capital providers, operators, and other private-sector partners.',
  },
  {
    question: 'How can P3 LLC help fund a project?',
    answer:
      'We help identify and evaluate financing solutions that may include private capital, bridge financing, grants, incentives, EB-5 funding, and other alternative financing strategies.',
  },
  {
    question: 'Does every project require a public-private partnership?',
    answer:
      'No. We evaluate each project independently and recommend the delivery and financing approach that best aligns with project goals, risk considerations, and public benefit objectives.',
  },
  {
    question: 'What project delivery models do you evaluate?',
    answer:
      'We help clients assess a variety of delivery models, including Design-Build, Design-Build-Finance-Operate-Maintain, public-private partnerships, and other alternative delivery structures.',
  },
  {
    question: "What is P3 LLC's role in a project?",
    answer:
      "Depending on project needs, we may serve as a strategic advisor, owner's representative, or coordinate project delivery by connecting clients with qualified partners and resources.",
  },
  {
    question: 'Do you have a network of private-sector partners?',
    answer:
      'Yes. P3 LLC maintains relationships with developers, capital providers, operators, technical consultants, and subject matter experts to help support project delivery.',
  },
  {
    question: 'How early should we engage P3 LLC?',
    answer:
      'The earlier the better. We can provide value during project planning, feasibility analysis, financing strategy development, procurement planning, and throughout implementation.',
  },
  {
    question: 'How do I get started?',
    answer:
      "Contact our team to discuss your project, funding needs, delivery challenges, or partnership opportunities. We'll help identify potential next steps and resources available to support your goals.",
  },
]

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

/** Single source of truth — used by the footer and the contact page. */
export const contactEmail = 'projects@teamp3llc.com'

export const contactInfo = {
  emails: [contactEmail],
}
