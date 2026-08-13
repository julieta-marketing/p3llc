'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import { Section, Eyebrow } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { whoWeServe } from '@/lib/content'

export function WhoWeServe() {
  const [publicGroup, privateGroup] = whoWeServe
  const workspaceRef = useRef<HTMLDivElement>(null)
  const glowFieldRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const workspace = workspaceRef.current
    const field = glowFieldRef.current
    if (!workspace || !field) return

    if (
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    function handlePointerMove(event: PointerEvent) {
      const bounds = workspace!.getBoundingClientRect()
      const x = ((event.clientX - bounds.left) / bounds.width) * 100
      const y = ((event.clientY - bounds.top) / bounds.height) * 100
      field!.style.setProperty('--mx', `${x}%`)
      field!.style.setProperty('--my', `${y}%`)
      field!.classList.add('is-active')
    }

    function handlePointerLeave() {
      field!.classList.remove('is-active')
    }

    workspace.addEventListener('pointermove', handlePointerMove)
    workspace.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      workspace.removeEventListener('pointermove', handlePointerMove)
      workspace.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  return (
    <Section
      id="who-we-serve"
      className="network-workspace-section overflow-hidden !bg-transparent !pt-14 !pb-0 text-white md:!pt-16 lg:!pt-20"
    >
      <Reveal className="relative z-10">
        <Eyebrow onDark>Our Network</Eyebrow>
        <h2 className="mt-5 max-w-[16ch] text-balance font-sans text-[clamp(2.1rem,8vw,3rem)] font-medium leading-[1.06] tracking-[-0.045em] text-white lg:max-w-none lg:whitespace-nowrap lg:text-[clamp(2.6rem,4.8vw,4.3rem)] lg:leading-[1.02] lg:tracking-[-0.05em]">
          Trusted by Public &amp; Private Leaders
        </h2>
      </Reveal>

      <Reveal delay={140} className="mt-7 lg:mt-8">
        <div ref={workspaceRef} className="network-workspace">
          <div ref={glowFieldRef} className="network-workspace__field network-glow" aria-hidden="true">
            <div className="network-glow__ambient" />
            <div className="network-glow__grid" />
            <div className="network-glow__grid-wave" />
            <div className="network-glow__grid-lit" />
          </div>

          <div className="network-lists relative z-10 mx-auto w-full max-w-[82rem]">
            <EcosystemList
              type="public"
              heading={publicGroup.heading}
              items={publicGroup.items}
            />
            <EcosystemList
              type="private"
              heading={privateGroup.heading}
              items={privateGroup.items}
            />
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

function EcosystemList({
  type,
  heading,
  items,
}: {
  type: 'public' | 'private'
  heading: string
  items: string[]
}) {
  return (
    <div className="network-list">
      <div className="network-list__heading">
        <span>{type} ecosystem</span>
        <h3>{heading}</h3>
      </div>

      <ul
        style={
          {
            '--list-rows': String(Math.ceil(items.length / 2)),
          } as CSSProperties
        }
      >
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
