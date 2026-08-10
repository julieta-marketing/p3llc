'use client'

import { useEffect, useRef } from 'react'

export function ContactRippleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    if (!canvas || !host) return

    const context = canvas.getContext('2d')
    if (!context) return

    const surface = canvas
    const container = host
    const drawing = context

    let width = 0
    let height = 0
    let frame = 0
    let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function resize() {
      const bounds = container.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = bounds.width
      height = bounds.height
      surface.width = Math.max(1, Math.round(width * ratio))
      surface.height = Math.max(1, Math.round(height * ratio))
      surface.style.width = `${width}px`
      surface.style.height = `${height}px`
      drawing.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    function draw(time: number) {
      drawing.clearRect(0, 0, width, height)
      const spacing = width < 640 ? 18 : 13
      const seconds = time * 0.001

      for (let y = -spacing; y < height + spacing; y += spacing) {
        for (let x = -spacing; x < width + spacing; x += spacing) {
          const waveA = Math.sin(x * 0.008 + seconds * 0.42)
          const waveB = Math.sin((x + y) * 0.0048 - seconds * 0.3)
          const waveC = Math.cos(y * 0.006 + seconds * 0.24)
          const elevation = waveA * 0.5 + waveB * 0.32 + waveC * 0.18
          const drawX = x + Math.sin(y * 0.004 + seconds * 0.2) * 1.2
          const drawY = y + elevation * 5.5
          const radius = 0.62 + (elevation + 1) * 0.08
          const opacity = 0.13 + (elevation + 1) * 0.035

          drawing.beginPath()
          drawing.arc(drawX, drawY, radius, 0, Math.PI * 2)
          drawing.fillStyle = `rgba(255, 255, 255, ${opacity})`
          drawing.fill()
        }
      }

      if (!reducedMotion) frame = requestAnimationFrame(draw)
    }

    const observer = new ResizeObserver(resize)
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const motionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches
      cancelAnimationFrame(frame)
      draw(performance.now())
    }

    resize()
    observer.observe(container)
    motion.addEventListener('change', motionChange)
    draw(performance.now())

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      motion.removeEventListener('change', motionChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  )
}
