import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Eyebrow, Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { team } from '@/lib/content'

type TeamMember = (typeof team)[number]

export function Team() {
  return (
    <Section id="leadership" className="executive-leadership">
      <Reveal className="executive-leadership__intro">
        <Eyebrow>Executive Leadership</Eyebrow>
        <div>
          <h2>Government &amp; Project Delivery Experience</h2>
        </div>
      </Reveal>

      <div className="executive-leadership__grid" aria-label="Executive leadership profiles">
        {team.map((person, index) => (
          <LeaderCard key={person.name} member={person} index={index} />
        ))}
      </div>
    </Section>
  )
}

function LeaderCard({ member, index }: { member: TeamMember; index: number }) {
  const headingId = `leadership-member-${index + 1}`
  const achievements = member.achievements

  return (
    <Reveal delay={index * 80} className="executive-leader__reveal">
      <article id={`leader-card-${index + 1}`} className="executive-leader" aria-labelledby={headingId}>
        <figure className="executive-leader__portrait">
          <Image
            src={member.image}
            alt={`Portrait of ${member.name}`}
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="executive-leader__portrait-image object-cover"
            style={{
              objectPosition: member.portraitPosition ?? '50% 30%',
              transform: `translate(${member.portraitOffsetX ?? '0'}, ${member.portraitOffsetY ?? '0'}) scale(${member.portraitZoom ?? 1})`,
            }}
          />
        </figure>

        <div className="executive-leader__body">
          <p className="executive-leader__role">{member.role}</p>
          <h3 id={headingId}>{member.name}</h3>
          <p className="executive-leader__bio">{member.bio}</p>

          <dl className="executive-leader__credentials" aria-label={`${member.name} credentials`}>
            {achievements.map((achievement) => (
              <div key={achievement.label}>
                <dt>{achievement.value}</dt>
                <dd>{achievement.label}</dd>
              </div>
            ))}
          </dl>

          <div className="executive-leader__links">
            <a href={`mailto:${member.email}`}>
              Email <ArrowUpRight aria-hidden="true" />
            </a>
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  )
}
