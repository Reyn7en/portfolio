'use client'

import { useEffect, useRef } from 'react'

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let raf = 0
    const COUNT = 60
    const particles: Array<{
      x: number; y: number; vx: number; vy: number
      r: number; baseR: number; alpha: number
    }> = []
    const mouse = { x: -9999, y: -9999 }

    function resize() {
      w = canvas!.width = window.innerWidth
      h = canvas!.height = document.documentElement.scrollHeight
    }

    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX
      mouse.y = e.clientY + window.scrollY
    }

    function create() {
      const r = Math.random() * 2 + 0.8
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r,
        baseR: r,
        alpha: Math.random() * 0.35 + 0.1,
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h)
      const color = '96, 165, 250' // blue-400

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          const force = (150 - dist) / 150
          p.vx -= dx * force * 0.0006
          p.vy -= dy * force * 0.0006
          p.r = p.baseR + force * 2.5
        } else {
          p.r += (p.baseR - p.r) * 0.1
        }
        p.vx *= 0.999
        p.vy *= 0.999

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${color},${p.alpha})`
        ctx!.fill()
      }

      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx2 = particles[i].x - particles[j].x
          const dy2 = particles[i].y - particles[j].y
          const d = Math.sqrt(dx2 * dx2 + dy2 * dy2)
          if (d < 120) {
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.strokeStyle = `rgba(${color},${0.06 * (1 - d / 120)})`
            ctx!.lineWidth = 0.5
            ctx!.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    for (let i = 0; i < COUNT; i++) particles.push(create())
    draw()

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', resize, { passive: true })
    document.addEventListener('mousemove', onMouseMove)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', resize)
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  )
}
