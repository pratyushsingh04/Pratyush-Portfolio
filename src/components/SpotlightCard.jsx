import { useRef } from 'react'

/**
 * A card that tilts toward the cursor and catches a soft highlight under it. Pointer
 * position is written to CSS custom properties, so the effect costs one style
 * write per move — no re-renders, and it degrades to a plain card without JS.
 */
export default function SpotlightCard({ children, className = '', as: Tag = 'div', ...rest }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
    el.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 7}deg`)
    el.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - 0.5) * -7}deg`)
  }
  const reset = () => {
    ref.current?.style.setProperty('--ry', '0deg')
    ref.current?.style.setProperty('--rx', '0deg')
  }

  return (
    <Tag ref={ref} className={`spot ${className}`} onMouseMove={onMove} onMouseLeave={reset} {...rest}>
      <span className="spot-light" aria-hidden="true" />
      <span className="spot-inner">{children}</span>
    </Tag>
  )
}
