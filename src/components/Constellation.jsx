import { useEffect, useRef } from 'react'

const LINK = 130
const REACH = 190

/**
 * A drifting network of nodes behind the hero. Nearby nodes link up, and
 * nodes near the pointer link to it in amber. Pauses when scrolled away.
 */
export default function Constellation() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mouse = { x: -9999, y: -9999 }
    let w = 0, h = 0, nodes = [], raf = 0, visible = true

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.min(80, Math.round((w * h) / 16000))
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of nodes) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK) {
            ctx.strokeStyle = `rgba(247, 243, 238, ${0.11 * (1 - d / LINK)})`
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (dm < REACH) {
          ctx.strokeStyle = `rgba(251, 146, 60, ${0.45 * (1 - dm / REACH)})`
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke()
        }
        ctx.fillStyle = dm < REACH ? 'rgba(251, 146, 60, 0.9)' : 'rgba(247, 243, 238, 0.32)'
        ctx.beginPath(); ctx.arc(a.x, a.y, 1.4, 0, Math.PI * 2); ctx.fill()
      }
    }

    const loop = () => {
      draw()
      if (visible && !reduced) raf = requestAnimationFrame(loop)
    }
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onResize = () => { size(); if (reduced) draw() }

    const io = new IntersectionObserver(([e]) => {
      const was = visible
      visible = e.isIntersecting
      if (visible && !was && !reduced) { cancelAnimationFrame(raf); raf = requestAnimationFrame(loop) }
    })

    size()
    loop()
    io.observe(canvas)
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return <canvas ref={ref} className="constellation" aria-hidden="true" />
}
