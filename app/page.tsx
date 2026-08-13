import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Services } from '@/components/sections/services'
import { CaseStudies } from '@/components/sections/case-studies'
import { CaseContactCta } from '@/components/sections/case-contact-cta'
import { WhoWeServe } from '@/components/sections/who-we-serve'
import { OurApproach } from '@/components/sections/our-approach'
import { Team } from '@/components/sections/team'
import { PartnershipValueBar, WhyP3Bar } from '@/components/partnership-value-bar'
import { News } from '@/components/sections/news'
import { FinalCta } from '@/components/sections/final-cta'
import { caseStudies } from '@/lib/cases'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <PartnershipValueBar />
        <Team />
        <WhyP3Bar />
        <Services />
        <CaseStudies projects={caseStudies.slice(0, 4)} />
        <CaseContactCta />
        <div className="bg-[linear-gradient(180deg,#041820_0%,#063847_38%,#063847_64%,#041820_100%)]">
          <WhoWeServe />
          <OurApproach />
        </div>
        <News />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
