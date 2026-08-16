import Image from 'next/image'

import { Eyebrow, Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { partners } from '@/lib/content'

const partnerLogos = [
  {
    src: '/sunstone-cities-icon.png',
    width: 265,
    height: 275,
  },
  {
    src: '/fullerton-consulting-partners-icon.png',
    width: 87,
    height: 99,
  },
]

export function About() {
  return (
    <Section id="about" className="executive-about">
      <Reveal className="executive-about__intro">
        <Eyebrow>About P3 LLC</Eyebrow>
        <div>
          <h2>Built for Public Delivery</h2>
        </div>
      </Reveal>

      <PartnershipStatement />
      <PartnerCards />
    </Section>
  )
}

/** Tier one: the photograph and the joint-venture statement. */
function PartnershipStatement() {
  return (
    <div className="executive-about__feature">
      <Reveal
        variant="image"
        as="figure"
        className="executive-about__image"
      >
        <Image
          src="/case-studies/george-deukmejian-courthouse-approved.jpg"
          alt="The George Deukmejian Courthouse in Long Beach at dusk, delivered through a DBFOM public-private partnership"
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover object-center"
        />
        <figcaption>George Deukmejian Courthouse · Long Beach, California</figcaption>
      </Reveal>

      <Reveal
        as="article"
        delay={70}
        className="executive-about__statement"
      >
        <Eyebrow onDark>The joint venture</Eyebrow>
        <h3>Public Leadership &amp; Private Delivery Discipline</h3>

        <p className="executive-about__statement-copy">
          Public Private Partners LLC (P3 LLC) is a joint venture between
          Sunstone Cities and Fullerton Consulting Partners. Together, the firms
          combine decades of government leadership, infrastructure development,
          finance, and project delivery experience.
        </p>

        <ul className="executive-about__capabilities" aria-label="Combined expertise">
          <li><span>01</span>Public-sector strategy</li>
          <li><span>02</span>Infrastructure finance</li>
          <li><span>03</span>Project delivery</li>
        </ul>
      </Reveal>
    </div>
  )
}

/** Tier two: one card per partner firm, lighter than the statement above. */
function PartnerCards() {
  return (
    <div className="executive-about__partners">
      {partners.map((partner, index) => {
        const logo = partnerLogos[index]

        return (
          <Reveal
            as="article"
            key={partner.name}
            delay={index * 70}
            className="executive-partner-card"
          >
            <div className="executive-partner-card__topline">
              <span>Partner {String(index + 1).padStart(2, '0')}</span>
              <span className="executive-partner-card__logo" aria-hidden="true">
                  <Image
                    src={logo.src}
                    alt=""
                    width={logo.width}
                    height={logo.height}
                    className="executive-partner-card__logo-image"
                  />
              </span>
            </div>

            <h3>{partner.name}</h3>
            <p>{partner.description}</p>
          </Reveal>
        )
      })}
    </div>
  )
}
