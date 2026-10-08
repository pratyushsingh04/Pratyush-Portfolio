import { useRef } from 'react'

/**
 * Tilts its content toward the pointer in 3D. Angles are written to CSS
 * custom properties, so a move costs one style write and no re-render.
 */
export default function Tilt({ children, max = 7, className = '' }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--ry', `${px * max}deg`)
    el.style.setProperty('--rx', `${-py * max}deg`)
  }
  const reset = () => {
    ref.current?.style.setProperty('--ry', '0deg')
    ref.current?.style.setProperty('--rx', '0deg')
  }

  return (
    <div ref={ref} className={`tilt ${className}`} onMouseMove={onMove} onMouseLeave={reset}>
      {children}
    </div>
  )
}
