'use client'

import { useEffect, useRef, type RefObject } from 'react'

type Mote = {
  x: number
  y: number
  depth: number
  r: number
  a: number
  drift: number
}

type Bokeh = {
  x: number
  y: number
  r: number
  a: number
  px: number
  py: number
  phase: number
}

const AREA_PER_MOTE = 17000
const MIN_MOTES = 26
const MAX_MOTES = 100
const FLOW_SPEED = 0.16
const POINTER_RADIUS = 260

/**
 * Ambient dot field for the network workspace.
 * Crisp round motes ride a slow curl-like flow field — no constellation
 * lines, no trails. A handful of large, very faint bokeh orbs sit behind
 * them for depth. Motion is deliberately near-subliminal.
 */
export function NetworkParticleField({
  hostRef,
}: {
  hostRef: RefObject<HTMLElement | null>
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = hostRef.current
    if (!canvas || !host) return

    const context = canvas.getContext('2d')
    if (!context) return

    const ctx = context
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const finePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    ).matches

    let width = 0
    let height = 0
    let motes: Mote[] = []
    let bokeh: Bokeh[] = []
    let frameId = 0
    let lastTime = 0
    let clock = 0
    let running = false

    const pointer = { x: -9999, y: -9999, strength: 0, target: 0 }

    function seed() {
      const target = Math.round(
        Math.min(
          MAX_MOTES,
          Math.max(MIN_MOTES, (width * height) / AREA_PER_MOTE),
        ),
      )

      motes = Array.from({ length: target }, () => {
        const depth = Math.random()
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          depth,
          r: 0.7 + depth * 1.5,
          a: 0.12 + depth * 0.3,
          drift: 0.55 + depth * 0.75,
        }
      })

      bokeh = Array.from({ length: 7 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 44 + Math.random() * 62,
        a: 0.018 + Math.random() * 0.022,
        px: 0,
        py: 0,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    function resize() {
      const rect = canvas.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      seed()
    }

    /** Smooth pseudo-curl field built from layered sines — cheap and organic. */
    function flowAngle(x: number, y: number) {
      return (
        (Math.sin(x * 0.0017 + clock * 0.42) +
          Math.sin(y * 0.0022 - clock * 0.31) +
          Math.sin((x + y) * 0.0009 + clock * 0.24)) *
        1.15
      )
    }

    function drawBokeh() {
      for (const orb of bokeh) {
        const cx = orb.x + orb.px
        const cy = orb.y + orb.py
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb.r)
        gradient.addColorStop(0, `rgba(120, 205, 235, ${orb.a.toFixed(4)})`)
        gradient.addColorStop(1, 'rgba(120, 205, 235, 0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(cx, cy, orb.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function drawMotes() {
      for (const mote of motes) {
        let alpha = mote.a

        if (pointer.strength > 0.01) {
          const dist = Math.hypot(mote.x - pointer.x, mote.y - pointer.y)
          if (dist < POINTER_RADIUS) {
            const falloff = 1 - dist / POINTER_RADIUS
            alpha += falloff * falloff * 0.32 * pointer.strength
          }
        }

        ctx.fillStyle = `rgba(186, 232, 246, ${Math.min(alpha, 0.62).toFixed(4)})`
        ctx.beginPath()
        ctx.arc(mote.x, mote.y, mote.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function step(now: number) {
      const delta = Math.min((now - lastTime) / 16.667, 3)
      lastTime = now
      clock += delta * 0.0016

      pointer.strength += (pointer.target - pointer.strength) * 0.055 * delta

      ctx.clearRect(0, 0, width, height)

      for (const orb of bokeh) {
        orb.phase += delta * 0.0026
        orb.px = Math.sin(orb.phase) * 26
        orb.py = Math.cos(orb.phase * 0.82) * 18
      }

      for (const mote of motes) {
        const angle = flowAngle(mote.x, mote.y)
        const speed = FLOW_SPEED * mote.drift * delta

        mote.x += Math.cos(angle) * speed
        mote.y += Math.sin(angle) * speed - 0.035 * mote.drift * delta

        if (pointer.strength > 0.01) {
          const dx = mote.x - pointer.x
          const dy = mote.y - pointer.y
          const dist = Math.hypot(dx, dy)
          if (dist < POINTER_RADIUS && dist > 1) {
            const lift =
              (1 - dist / POINTER_RADIUS) * 0.16 * mote.depth * pointer.strength
            mote.x += (dx / dist) * lift * delta
            mote.y += (dy / dist) * lift * delta
          }
        }

        if (mote.x < -30) mote.x = width + 30
        if (mote.x > width + 30) mote.x = -30
        if (mote.y < -30) mote.y = height + 30
        if (mote.y > height + 30) mote.y = -30
      }

      drawBokeh()
      drawMotes()

      frameId = requestAnimationFrame(step)
    }

    function start() {
      if (running || reduceMotion) return
      running = true
      lastTime = performance.now()
      frameId = requestAnimationFrame(step)
    }

    function stop() {
      running = false
      cancelAnimationFrame(frameId)
    }

    function renderStatic() {
      ctx.clearRect(0, 0, width, height)
      drawBokeh()
      drawMotes()
    }

    function handlePointerMove(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.target = 1
    }

    function handlePointerLeave() {
      pointer.target = 0
    }

    resize()

    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (reduceMotion) renderStatic()
    })
    resizeObserver.observe(canvas)

    if (reduceMotion) {
      renderStatic()
      return () => resizeObserver.disconnect()
    }

    const visibility = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    )
    visibility.observe(canvas)

    if (finePointer) {
      host.addEventListener('pointermove', handlePointerMove)
      host.addEventListener('pointerleave', handlePointerLeave)
    }

    return () => {
      stop()
      resizeObserver.disconnect()
      visibility.disconnect()
      host.removeEventListener('pointermove', handlePointerMove)
      host.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [hostRef])

  return (
    <canvas
      ref={canvasRef}
      className="network-workspace__field-canvas"
      aria-hidden="true"
    />
  )
}
