import { useEffect, useRef } from 'react'

/**
 * A soft warm light that follows the pointer and lifts the aurora beneath it.
 * The native cursor stays visible, so nothing feels broken — this only adds
 * atmosphere. Disabled for coarse pointers via CSS.
 */
export default function GlowCursor() {
  const ref = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let gx = mx
    let gy = my
    let raf
    let shown = false

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (!shown) { shown = true; ref.current?.classList.add('on') }
    }
    const loop = () => {
      gx += (mx - gx) * 0.09
      gy += (my - gy) * 0.09
      const el = ref.current
      if (el) el.style.transform = `translate3d(${gx}px, ${gy}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    const onLeave = () => { shown = false; ref.current?.classList.remove('on') }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <div ref={ref} className="glow-cursor" aria-hidden="true" />
}
