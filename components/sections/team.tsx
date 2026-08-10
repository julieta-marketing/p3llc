'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { team } from '@/lib/content'
import { cn } from '@/lib/utils'

type TeamMember = (typeof team)[number]

export function Team() {
  return (
    <Section id="leadership" className="leadership-section bg-white">
      <h2 className="sr-only">Leadership</h2>
      <div
        className="leadership-pair"
        aria-label="Executive leadership profiles"
      >
        {team.map((person, index) => (
          <LeaderCard key={person.name} member={person} index={index} />
        ))}
      </div>
    </Section>
  )
}

function LeaderCard({ member, index }: { member: TeamMember; index: number }) {
  const headingId = `leadership-member-${index + 1}`
  const achievements = index === 1 ? member.achievements.slice(0, 1) : member.achievements

  return (
    <Reveal delay={index * 140} className="leadership-profile__reveal">
      <article
        className={cn(
          'leadership-profile',
          index % 2 === 1 && 'leadership-profile--reverse',
        )}
        aria-labelledby={headingId}
      >
        <div className="leadership-profile__body">
          <div className="leadership-profile__portrait">
            <Image
              src={member.image}
              alt={`Portrait of ${member.name}`}
              fill
              sizes="(min-width: 1024px) 46vw, (min-width: 641px) 42rem, calc(100vw - 3.5rem)"
              className="object-cover object-top"
            />
          </div>

          <div className="leadership-profile__heading">
            <h3 id={headingId}>{member.name}</h3>
            <p>{member.role}</p>
          </div>

          <div className="leadership-profile__metrics" aria-label={`${member.name} achievements`}>
            {achievements.map((achievement) => (
              <div key={achievement.label} className="leadership-profile__metric">
                <p><AnimatedMetric value={achievement.value} /></p>
                <span>{achievement.label}</span>
              </div>
            ))}
          </div>

          <p className="leadership-profile__bio">{member.bio}</p>

          <div className="leadership-profile__links">
            <a href={`mailto:${member.email}`}>
              Email
              <ArrowRight aria-hidden="true" />
            </a>
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

function AnimatedMetric({ value }: { value: string }) {
  const match = value.match(/^(\$?)(\d+)([A-Za-z]?)(\+?)$/)
  const [displayValue, setDisplayValue] = useState(match ? '0' : null)
  const [isAnimating, setIsAnimating] = useState(false)
  const metricRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!match || !metricRef.current) return

    const target = Number(match[2])
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      setDisplayValue(String(target))
      return
    }

    let frameId = 0
    let hasAnimated = false
    const element = metricRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated) return
        hasAnimated = true
        observer.disconnect()
        setIsAnimating(true)

        const startedAt = performance.now() + 520
        const duration = 2200

        const tick = (now: number) => {
          if (now < startedAt) {
            frameId = requestAnimationFrame(tick)
            return
          }

          const progress = Math.min((now - startedAt) / duration, 1)
          const eased = progress * progress * (3 - 2 * progress)
          const current = target * eased
          const nextValue =
            progress === 1
              ? String(target)
              : target < 10
                ? current.toFixed(1)
                : String(Math.floor(current))

          setDisplayValue((previousValue) =>
            previousValue === nextValue ? previousValue : nextValue,
          )

          if (progress < 1) {
            frameId = requestAnimationFrame(tick)
          } else {
            setIsAnimating(false)
          }
        }

        frameId = requestAnimationFrame(tick)
      },
      { threshold: 0.55 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frameId)
    }
  }, [value])

  if (!match) return <>{value}</>

  return (
    <span
      ref={metricRef}
      className={cn('leadership-metric-number', isAnimating && 'is-counting')}
      aria-label={value}
    >
      <span aria-hidden="true">
        {match[1]}
        {displayValue}
        {match[3]}
        {match[4]}
      </span>
    </span>
  )
}
