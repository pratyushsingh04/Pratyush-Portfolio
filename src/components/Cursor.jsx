import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const INTERACTIVE = 'a, button, .spot, .pin-card'

/**
 * A soft glow that trails the pointer, plus a ring that snaps to it and
 * swells over anything clickable. The native cursor stays; fine pointers only.
 */
export default function Cursor() {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const rx = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 })
  const gx = useSpring(x, { stiffness: 50, damping: 18 })
  const gy = useSpring(y, { stiffness: 50, damping: 18 })
  const [on, setOn] = useState(false)
  const [hot, setHot] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setOn(true)
      setHot(Boolean(e.target.closest?.(INTERACTIVE)))
    }
    const leave = () => setOn(false)
    window.addEventListener('mousemove', move, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [x, y])

  return (
    <div className={`cursor ${on ? 'on' : ''} ${hot ? 'hot' : ''}`} aria-hidden="true">
      <motion.span className="cursor-glow" style={{ x: gx, y: gy }} />
      <motion.span className="cursor-ring" style={{ x: rx, y: ry }}><i /></motion.span>
    </div>
  )
}
