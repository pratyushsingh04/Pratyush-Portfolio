import { useEffect, useRef } from 'react'

/**
 * Stars behind the hero: they twinkle, drift upward, shift with the pointer
 * by depth, and every few seconds one streaks across. Pauses off-screen.
 */
export default function Starfield() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    let w = 0, h = 0, stars = [], shot = null, nextShot = 1500, raf = 0, visible = true, last = performance.now()

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.min(220, Math.round((w * h) / 6500))
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.2 + Math.random() * 0.8,
        p: Math.random() * Math.PI * 2,
        s: 0.6 + Math.random() * 1.6,
      }))
    }

    const draw = (now) => {
      const dt = Math.min(now - last, 50)
      last = now
      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05
      ctx.clearRect(0, 0, w, h)

      for (const st of stars) {
        st.y -= st.z * 0.012 * dt
        if (st.y < -4) { st.y = h + 4; st.x = Math.random() * w }
        const a = (0.25 + 0.75 * (0.5 + 0.5 * Math.sin(now * 0.001 * st.s + st.p))) * st.z
        ctx.fillStyle = st.z > 0.85 ? `rgba(185, 190, 255, ${a})` : `rgba(255, 255, 255, ${a * 0.8})`
        ctx.beginPath()
        ctx.arc(st.x + mouse.x * st.z * 28, st.y + mouse.y * st.z * 28, st.z * 1.25, 0, Math.PI * 2)
        ctx.fill()
      }

      nextShot -= dt
      if (!shot && nextShot <= 0) {
        shot = { x: Math.random() * w * 0.7, y: Math.random() * h * 0.35, life: 0 }
        nextShot = 2600 + Math.random() * 3200
      }
      if (shot) {
        shot.life += dt
        const t = shot.life / 900
        const hx = shot.x + t * 520
        const hy = shot.y + t * 230
        const g = ctx.createLinearGradient(hx - 150, hy - 66, hx, hy)
        g.addColorStop(0, 'rgba(255, 255, 255, 0)')
        g.addColorStop(1, `rgba(255, 255, 255, ${Math.sin(Math.min(t, 1) * Math.PI) * 0.9})`)
        ctx.strokeStyle = g
        ctx.lineWidth = 1.4
        ctx.beginPath(); ctx.moveTo(hx - 150, hy - 66); ctx.lineTo(hx, hy); ctx.stroke()
        if (t >= 1) shot = null
      }
    }

    const loop = (now) => {
      draw(now)
      if (visible && !reduced) raf = requestAnimationFrame(loop)
    }
    const onMove = (e) => {
      mouse.tx = e.clientX / window.innerWidth - 0.5
      mouse.ty = e.clientY / window.innerHeight - 0.5
    }
    const onResize = () => { size(); if (reduced) draw(performance.now()) }
    const io = new IntersectionObserver(([e]) => {
      const was = visible
      visible = e.isIntersecting
      if (visible && !was && !reduced) { last = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(loop) }
    })

    size()
    loop(performance.now())
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

  return <canvas ref={ref} className="starfield" aria-hidden="true" />
}
