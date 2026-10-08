import { useEffect, useRef } from 'react'

const DOTS = 1150
const CAMERA = 3.2
const REGIONS = [
  { name: 'ap-south-1', lat: 19.1, lon: 72.9 },
  { name: 'us-east-1', lat: 38.9, lon: -77.4 },
  { name: 'eu-central-1', lat: 50.1, lon: 8.7 },
  { name: 'ap-southeast-1', lat: 1.4, lon: 103.8 },
  { name: 'sa-east-1', lat: -23.5, lon: -46.6 },
  { name: 'ap-northeast-1', lat: 35.7, lon: 139.7 },
]
const LINKS = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 4], [3, 5], [2, 3]]

const toVec = ({ lat, lon }) => {
  const a = (lat * Math.PI) / 180
  const o = (lon * Math.PI) / 180
  return [Math.cos(a) * Math.sin(o), Math.sin(a), Math.cos(a) * Math.cos(o)]
}

/**
 * A 3D globe drawn on a 2D canvas: a sphere of dots with perspective, cloud
 * regions joined by arcs that carry packets, and two orbiting satellites.
 * It spins on its own, leans toward the pointer, and can be dragged.
 */
export default function Globe() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const golden = Math.PI * (3 - Math.sqrt(5))
    const dots = Array.from({ length: DOTS }, (_, i) => {
      const y = 1 - (i / (DOTS - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const t = golden * i
      return { v: [Math.cos(t) * r, y, Math.sin(t) * r], hue: 232 + 92 * ((y + 1) / 2) }
    })
    const nodes = REGIONS.map((r) => ({ ...r, v: toVec(r) }))
    const arcs = LINKS.map(([a, b], i) => {
      const A = nodes[a].v, B = nodes[b].v
      const omega = Math.acos(Math.min(1, A[0] * B[0] + A[1] * B[1] + A[2] * B[2]))
      const pts = Array.from({ length: 41 }, (_, k) => {
        const t = k / 40
        const s1 = Math.sin((1 - t) * omega) / Math.sin(omega)
        const s2 = Math.sin(t * omega) / Math.sin(omega)
        const lift = 1 + 0.24 * Math.sin(Math.PI * t)
        return [(A[0] * s1 + B[0] * s2) * lift, (A[1] * s1 + B[1] * s2) * lift, (A[2] * s1 + B[2] * s2) * lift]
      })
      return { pts, offset: i * 0.37, speed: 0.00022 + (i % 3) * 0.00006 }
    })

    let w = 0, h = 0, R = 0, raf = 0, visible = true, last = performance.now()
    let rotY = 1.2, rotX = 0.32, velY = 0.00028, tiltTarget = 0.32
    let drag = null

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      R = Math.min(w, h) * 0.33
    }

    // Rotate by the globe's spin and tilt, then project with perspective.
    const project = (v, sy = rotY, sx = rotX) => {
      const cy = Math.cos(sy), sny = Math.sin(sy), cx = Math.cos(sx), snx = Math.sin(sx)
      const x1 = v[0] * cy + v[2] * sny
      const z1 = -v[0] * sny + v[2] * cy
      const y2 = v[1] * cx - z1 * snx
      const z2 = v[1] * snx + z1 * cx
      const p = CAMERA / (CAMERA - z2)
      return [w / 2 + x1 * R * p, h / 2 - y2 * R * p, z2, p]
    }

    const draw = (now) => {
      const dt = Math.min(now - last, 50)
      last = now
      if (!drag) {
        rotY += velY * dt
        velY += (0.00028 - velY) * 0.02
        rotX += (tiltTarget - rotX) * 0.04
      }
      ctx.clearRect(0, 0, w, h)

      // atmosphere
      const g = ctx.createRadialGradient(w / 2, h / 2, R * 0.6, w / 2, h / 2, R * 1.55)
      g.addColorStop(0, 'rgba(124, 134, 255, 0.20)')
      g.addColorStop(0.55, 'rgba(244, 114, 182, 0.07)')
      g.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      // orbit rings (fixed in space) with a satellite each
      ;[[1.42, 1.15, 0.35, 0.0005], [1.68, -0.75, -0.5, -0.00032]].forEach(([rad, tx, tz, sp], ri) => {
        const ring = (th) => {
          const x = Math.cos(th) * rad, z = Math.sin(th) * rad
          const y1 = -z * Math.sin(tx), z1 = z * Math.cos(tx)
          const x2 = x * Math.cos(tz) - y1 * Math.sin(tz), y2 = x * Math.sin(tz) + y1 * Math.cos(tz)
          const p = CAMERA / (CAMERA - z1)
          return [w / 2 + x2 * R * p, h / 2 - y2 * R * p, z1]
        }
        for (let k = 0; k < 120; k++) {
          const a = ring((k / 120) * Math.PI * 2), b = ring(((k + 1) / 120) * Math.PI * 2)
          const behind = a[2] < 0 && Math.hypot(a[0] - w / 2, a[1] - h / 2) < R
          ctx.strokeStyle = `rgba(185, 190, 255, ${behind ? 0.03 : 0.1 + 0.12 * (a[2] / rad + 1) / 2})`
          ctx.lineWidth = 1
          ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke()
        }
        const s = ring(now * sp + ri * 2)
        if (!(s[2] < 0 && Math.hypot(s[0] - w / 2, s[1] - h / 2) < R)) {
          ctx.fillStyle = ri ? '#f472b6' : '#22d3ee'
          ctx.shadowColor = ctx.fillStyle
          ctx.shadowBlur = 14
          ctx.beginPath(); ctx.arc(s[0], s[1], 3.2, 0, Math.PI * 2); ctx.fill()
          ctx.shadowBlur = 0
        }
      })

      // sphere of dots
      for (const d of dots) {
        const [x, y, z, p] = project(d.v)
        const a = z > 0 ? 0.3 + 0.7 * z : 0.07 + 0.07 * (1 + z)
        ctx.fillStyle = `hsla(${d.hue + Math.sin(now * 0.0004) * 14}, 92%, ${z > 0 ? 74 : 60}%, ${a})`
        const s = (z > 0 ? 1.35 : 0.9) * p
        ctx.fillRect(x - s / 2, y - s / 2, s, s)
      }

      // arcs + packets
      ctx.lineWidth = 1.2
      for (const arc of arcs) {
        let prev = project(arc.pts[0])
        for (let k = 1; k < arc.pts.length; k++) {
          const cur = project(arc.pts[k])
          const z = (prev[2] + cur[2]) / 2
          ctx.strokeStyle = `rgba(34, 211, 238, ${z > 0 ? 0.25 + 0.5 * z : 0.05})`
          ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(cur[0], cur[1]); ctx.stroke()
          prev = cur
        }
        const t = (now * arc.speed + arc.offset) % 1
        const f = t * (arc.pts.length - 1)
        const i0 = Math.floor(f), fr = f - i0
        const A = arc.pts[i0], B = arc.pts[Math.min(i0 + 1, arc.pts.length - 1)]
        const pk = project([A[0] + (B[0] - A[0]) * fr, A[1] + (B[1] - A[1]) * fr, A[2] + (B[2] - A[2]) * fr])
        if (pk[2] > -0.1) {
          ctx.fillStyle = '#fff'
          ctx.shadowColor = '#22d3ee'
          ctx.shadowBlur = 16
          ctx.beginPath(); ctx.arc(pk[0], pk[1], 2.4 * pk[3], 0, Math.PI * 2); ctx.fill()
          ctx.shadowBlur = 0
        }
      }

      // region nodes
      ctx.font = '500 10px "Geist Mono", ui-monospace, monospace'
      nodes.forEach((n, i) => {
        const [x, y, z, p] = project(n.v)
        if (z < -0.05) return
        const pulse = ((now * 0.0008 + i * 0.3) % 1)
        ctx.strokeStyle = `rgba(244, 114, 182, ${(1 - pulse) * 0.8 * Math.max(z, 0.15)})`
        ctx.lineWidth = 1
        ctx.beginPath(); ctx.arc(x, y, (4 + pulse * 15) * p, 0, Math.PI * 2); ctx.stroke()
        ctx.fillStyle = '#fff'
        ctx.shadowColor = '#f472b6'
        ctx.shadowBlur = 14
        ctx.beginPath(); ctx.arc(x, y, 3 * p, 0, Math.PI * 2); ctx.fill()
        ctx.shadowBlur = 0
        if (z > 0.3) {
          ctx.fillStyle = `rgba(237, 237, 237, ${Math.min(1, (z - 0.3) * 1.8)})`
          ctx.fillText(n.name, x + 9, y - 8)
        }
      })
    }

    const loop = (now) => {
      draw(now)
      if (visible && !reduced) raf = requestAnimationFrame(loop)
    }

    const onDown = (e) => {
      drag = { x: e.clientX, y: e.clientY, t: performance.now() }
      canvas.setPointerCapture?.(e.pointerId)
      canvas.classList.add('grabbing')
    }
    const onMove = (e) => {
      if (drag) {
        const dx = e.clientX - drag.x, dy = e.clientY - drag.y
        const now = performance.now()
        rotY += dx * 0.006
        rotX = Math.max(-1, Math.min(1, rotX + dy * 0.004))
        velY = (dx * 0.006) / Math.max(now - drag.t, 8)
        drag = { x: e.clientX, y: e.clientY, t: now }
      } else {
        tiltTarget = 0.32 + (e.clientY / window.innerHeight - 0.5) * 0.5
      }
    }
    const onUp = () => { drag = null; tiltTarget = rotX; canvas.classList.remove('grabbing') }
    const onResize = () => { size(); if (reduced) draw(performance.now()) }
    const io = new IntersectionObserver(([e]) => {
      const was = visible
      visible = e.isIntersecting
      if (visible && !was && !reduced) { last = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(loop) }
    })

    size()
    loop(performance.now())
    io.observe(canvas)
    canvas.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onUp)
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      canvas.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={ref} className="globe" role="img" aria-label="A rotating globe of cloud regions connected by live data arcs" />
}
