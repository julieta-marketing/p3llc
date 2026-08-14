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
    <Section id="leadership" className="leadership-section bg-[color:var(--surface-1)]">
      <Reveal>
        <h2 className="font-sans text-[2.45rem] font-medium leading-[1.01] tracking-[-0.05em] text-[color:var(--color-dark-azure)] sm:text-[3.3rem] lg:text-[4.3rem]">
          Leadership
        </h2>
      </Reveal>

      <div
        className="leadership-pair mt-14 lg:mt-20"
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
  const achievements = member.achievements

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
          <div className="leadership-profile__column">
            <div className="leadership-profile__portrait">
              <Image
                src={member.image}
                alt={`Portrait of ${member.name}`}
                fill
                sizes="(min-width: 1024px) 12rem, 10rem"
                className="object-cover object-top"
                style={{
                  transform: `scale(${member.portraitZoom ?? 1.035}) translate(${
                    member.portraitOffsetX ?? '0%'
                  }, ${member.portraitOffsetY ?? '0%'})`,
                }}
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
        </div>

        <figure className="leadership-profile__media">
          <Image
            src={member.caseImage}
            alt={member.caseImageAlt}
            fill
            sizes="(min-width: 1024px) 75vw, 100vw"
            className="object-cover"
          />
        </figure>
      </article>
    </Reveal>
  )
}

function AnimatedMetric({ value }: { value: string }) {
  const match = value.match(/^(\$?)(\d+)([A-Za-z]?)(\+?)$/)
  const target = match ? Number(match[2]) : null

  // Seeded with the final number, not "0". If the count-up never runs — mobile,
  // reduced motion, no IntersectionObserver — the metric still reads correctly
  // instead of being stuck on zero.
  const [displayValue, setDisplayValue] = useState(
    target === null ? null : String(target),
  )
  const [isAnimating, setIsAnimating] = useState(false)
  const metricRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (target === null || !metricRef.current) return

    // The count-up is a desktop flourish; below 1024px the metric is static.
    const canAnimate =
      typeof IntersectionObserver !== 'undefined' &&
      window.matchMedia('(min-width: 1024px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!canAnimate) {
      setDisplayValue(String(target))
      return
    }

    setDisplayValue('0')

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
      // 0.55 was fragile: the pill is small and never cleared the ratio on
      // some viewports, leaving the number frozen at its start value.
      { threshold: 0.2 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frameId)
    }
  }, [target])

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
