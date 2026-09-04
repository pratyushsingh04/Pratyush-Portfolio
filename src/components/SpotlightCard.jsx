import { useRef } from 'react'

/**
 * A card whose surface catches a soft highlight under the cursor. Pointer
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
  }

  return (
    <Tag ref={ref} className={`spot ${className}`} onMouseMove={onMove} {...rest}>
      <span className="spot-light" aria-hidden="true" />
      <span className="spot-inner">{children}</span>
    </Tag>
  )
}
