'use client'

import { useEffect, useRef } from 'react'
import { Building2, Landmark, Network, Sparkles } from 'lucide-react'
import { Section, Eyebrow } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { whoWeServe } from '@/lib/content'

export function WhoWeServe() {
  const [publicGroup, privateGroup] = whoWeServe
  const dotFieldRef = useRef<HTMLDivElement>(null)
  const dotCanvasRef = useRef<HTMLCanvasElement>(null)
  const graphRef = useRef<HTMLDivElement>(null)
  const connectorCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const field = dotFieldRef.current
    const canvas = dotCanvasRef.current
    if (!field || !canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const fieldElement = field
    const drawing = context
    const surface = canvas
    const spacing = 12
    const tau = Math.PI * 2
    let width = 0
    let height = 0
    let pixelRatio = 1
    let frame = 0
    let isVisible = true
    let animationStart: number | null = null
    let dots: Array<{ x: number; y: number }> = []

    const desktopRidges = [
      { start: -0.14, end: 1.14, width: 0.105, tilt: 0.18, travel: 0.042, pulse: 0.66, phase: 0.06 },
      { start: -0.14, end: 1.14, width: 0.115, tilt: 0.15, travel: 0.042, pulse: 0.72, phase: 0.46 },
    ]
    const mobileRidges = [
      { start: -0.22, end: 1.22, width: 0.18, tilt: 0.24, travel: 0.042, pulse: 0.66, phase: 0.06 },
      { start: -0.22, end: 1.22, width: 0.19, tilt: 0.2, travel: 0.042, pulse: 0.72, phase: 0.46 },
    ]

    function resizeField() {
      const bounds = fieldElement.getBoundingClientRect()
      width = bounds.width
      height = bounds.height
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      surface.width = Math.max(1, Math.round(width * pixelRatio))
      surface.height = Math.max(1, Math.round(height * pixelRatio))
      surface.style.width = `${width}px`
      surface.style.height = `${height}px`

      dots = []
      const offset = spacing / 2

      for (let y = offset; y < height; y += spacing) {
        for (let x = offset; x < width; x += spacing) {
          dots.push({ x, y })
        }
      }
    }

    function drawField(timestamp: number) {
      if (!width || !height) {
        frame = requestAnimationFrame(drawField)
        return
      }

      animationStart ??= timestamp
      const seconds = (timestamp - animationStart) / 1000
      const ridges = width < 600 ? mobileRidges : desktopRidges
      const ridgeStates = ridges.map((ridge) => {
        const cycle = (seconds * ridge.travel + ridge.phase) % 1
        const enterProgress = Math.min(1, cycle / 0.12)
        const exitProgress = Math.min(1, (1 - cycle) / 0.12)
        const smoothEnter = enterProgress * enterProgress * (3 - 2 * enterProgress)
        const smoothExit = exitProgress * exitProgress * (3 - 2 * exitProgress)
        const edgeStrength = smoothEnter * smoothExit
        const inhale = 0.5 + 0.5 * Math.sin(seconds * ridge.pulse + ridge.phase * tau)
        const easedInhale = inhale * inhale * (3 - 2 * inhale)
        const strength = edgeStrength * (0.58 + easedInhale * 0.42)
        const slope = (width * ridge.tilt) / height
        const normalLength = Math.hypot(1, slope)

        return {
          center: width * (ridge.start + (ridge.end - ridge.start) * cycle),
          spread: Math.max(
            width < 600 ? 48 : 78,
            width * ridge.width * (0.88 + strength * 0.24),
          ),
          strength,
          slope,
          normalX: 1 / normalLength,
          normalY: -slope / normalLength,
        }
      })
      const paths = Array.from({ length: 12 }, () => new Path2D())

      drawing.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      drawing.clearRect(0, 0, width, height)

      for (const dot of dots) {
        let horizontalPush = 0
        let verticalPush = 0
        let combinedLift = 0

        ridgeStates.forEach((ridge) => {
          const centerAtY = ridge.center + ridge.slope * (dot.y - height / 2)
          const signedDistance = (dot.x - centerAtY) * ridge.normalX
          const normalized = signedDistance / ridge.spread
          const normalizedSquared = normalized * normalized
          const profile = Math.exp(-0.5 * normalizedSquared * normalizedSquared)
          const pushProfile = normalized * Math.exp(-0.5 * normalizedSquared)
          const lift = profile * ridge.strength
          const normalPush = 25 * ridge.strength * pushProfile

          horizontalPush += normalPush * ridge.normalX
          verticalPush += normalPush * ridge.normalY
          combinedLift = 1 - (1 - combinedLift) * (1 - lift * 0.88)
        })

        const displacedX = dot.x + 28 * Math.tanh(horizontalPush / 28)
        const displacedY = dot.y + 22 * Math.tanh(verticalPush / 22) - combinedLift * 3.5
        const level = Math.min(11, Math.max(0, Math.round(combinedLift * 11)))
        const radius = 0.68 + level * 0.052

        paths[level].moveTo(displacedX + radius, displacedY)
        paths[level].arc(displacedX, displacedY, radius, 0, tau)
      }

      paths.forEach((path, level) => {
        const strength = level / 11
        drawing.save()
        drawing.fillStyle = `rgba(235, 250, 253, ${0.17 + strength * 0.77})`
        if (level >= 9) {
          drawing.shadowBlur = 3 + strength * 2
          drawing.shadowColor = `rgba(209, 246, 253, ${0.12 + strength * 0.2})`
        }
        drawing.fill(path)
        drawing.restore()
      })

      if (isVisible) frame = requestAnimationFrame(drawField)
    }

    const resizeObserver = new ResizeObserver(resizeField)
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      cancelAnimationFrame(frame)
      if (isVisible) frame = requestAnimationFrame(drawField)
    }, { rootMargin: '120px' })

    resizeObserver.observe(fieldElement)
    visibilityObserver.observe(fieldElement)
    resizeField()
    frame = requestAnimationFrame(drawField)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const graph = graphRef.current
    const canvas = connectorCanvasRef.current
    if (!graph || !canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const container = graph
    const surface = canvas
    const drawing = context
    let frame = 0

    function drawConnections() {
      const graphBounds = container.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      const width = graphBounds.width
      const height = graphBounds.height
      surface.width = Math.max(1, Math.round(width * pixelRatio))
      surface.height = Math.max(1, Math.round(height * pixelRatio))
      surface.style.width = `${width}px`
      surface.style.height = `${height}px`
      drawing.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      drawing.clearRect(0, 0, width, height)

      if (width < 768) return

      const source = container.querySelector<HTMLElement>('.network-node--core')
      const targets = Array.from(
        container.querySelectorAll<HTMLElement>('.network-ecosystem__header'),
      )
      if (!source || targets.length !== 2) return

      const sourceBounds = source.getBoundingClientRect()
      const startX = sourceBounds.left - graphBounds.left + sourceBounds.width / 2
      const startY = sourceBounds.bottom - graphBounds.top

      drawing.lineWidth = 1
      drawing.strokeStyle = 'rgba(168, 215, 226, 0.28)'

      targets.forEach((target) => {
        const targetBounds = target.getBoundingClientRect()
        const endX = targetBounds.left - graphBounds.left + targetBounds.width / 2
        const endY = targetBounds.top - graphBounds.top
        const verticalSpace = Math.max(48, endY - startY)

        drawing.beginPath()
        drawing.strokeStyle = 'rgba(168, 215, 226, 0.28)'
        drawing.moveTo(startX, startY)
        drawing.bezierCurveTo(
          startX,
          startY + verticalSpace * 0.46,
          endX,
          endY - verticalSpace * 0.5,
          endX,
          endY,
        )
        drawing.stroke()

        drawing.beginPath()
        drawing.arc(endX, endY, 3.2, 0, Math.PI * 2)
        drawing.fillStyle = '#07141a'
        drawing.fill()
        drawing.strokeStyle = 'rgba(181, 224, 234, 0.52)'
        drawing.stroke()
      })

      drawing.beginPath()
      drawing.arc(startX, startY, 3.4, 0, Math.PI * 2)
      drawing.fillStyle = '#07141a'
      drawing.fill()
      drawing.strokeStyle = 'rgba(181, 224, 234, 0.58)'
      drawing.stroke()
    }

    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(drawConnections)
    })
    observer.observe(container)
    container
      .querySelectorAll<HTMLElement>('.network-node--core, .network-ecosystem__header')
      .forEach((element) => observer.observe(element))
    frame = requestAnimationFrame(drawConnections)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [])

  return (
    <Section
      id="who-we-serve"
      className="network-workspace-section overflow-hidden !bg-transparent !pt-20 !pb-0 text-white md:!pt-24 lg:!pt-28"
    >
      <Reveal className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Eyebrow onDark>Our Network</Eyebrow>
          <h2 className="mt-7 max-w-none whitespace-nowrap font-sans text-[clamp(0.9rem,4.8vw,4.3rem)] font-medium leading-[1.02] tracking-[-0.05em] text-white">
            Trusted by Public &amp; Private Leaders
          </h2>
        </div>
      </Reveal>

      <Reveal delay={140} className="mt-10 lg:mt-12">
        <div className="network-workspace">
          <div ref={dotFieldRef} className="network-workspace__field" aria-hidden="true">
            <canvas ref={dotCanvasRef} className="network-workspace__field-canvas" />
          </div>

          <div ref={graphRef} className="network-graph">
            <canvas
              ref={connectorCanvasRef}
              className="network-graph__connections"
              aria-hidden="true"
            />
            <article className="network-node network-node--core">
              <div className="network-node__topbar">
                <span className="network-node__icon network-node__icon--core">
                  <Sparkles aria-hidden="true" />
                </span>
                <span className="network-node__title">P3 Connector</span>
                <span className="network-node__status">Active</span>
              </div>
              <div className="network-node__core-body">
                <strong>P3</strong>
                <span>Public Purpose / Private Expertise</span>
              </div>
              <div className="network-node__footer">
                <Network aria-hidden="true" />
                <span>Aligning strategy, capital, and delivery</span>
              </div>
            </article>

            <div className="network-graph__panels">
              <EcosystemPanel
                type="public"
                heading={publicGroup.heading}
                items={publicGroup.items}
              />
              <EcosystemPanel
                type="private"
                heading={privateGroup.heading}
                items={privateGroup.items}
              />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

function EcosystemPanel({
  type,
  heading,
  items,
}: {
  type: 'public' | 'private'
  heading: string
  items: string[]
}) {
  const Icon = type === 'public' ? Landmark : Building2

  return (
    <article className={`network-ecosystem network-ecosystem--${type}`}>
      <header className="network-ecosystem__header">
        <span className="network-ecosystem__corner" aria-hidden="true" />
        <span className="network-node__icon">
          <Icon aria-hidden="true" />
        </span>
        <div className="network-ecosystem__heading">
          <span>{type} ecosystem</span>
          <h3>{heading}</h3>
        </div>
        <span className="network-ecosystem__menu" aria-hidden="true">•••</span>
      </header>

      <ul className="network-ecosystem__nodes">
        {items.map((item, itemIndex) => (
          <li key={item}>
            <span className="network-ecosystem__index">
              {String(itemIndex + 1).padStart(2, '0')}
            </span>
            <span>{item}</span>
            <i aria-hidden="true" />
          </li>
        ))}
      </ul>
    </article>
  )
}
