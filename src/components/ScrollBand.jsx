import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'

/**
 * A band of huge outlined type that slides sideways as the page scrolls and
 * leans into the scroll direction with its speed.
 */
export default function ScrollBand({ text, reverse = false }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], reverse ? ['-32%', '0%'] : ['0%', '-32%'])
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const skewX = useSpring(useTransform(velocity, [-2600, 2600], [-11, 11], { clamp: true }), { stiffness: 220, damping: 40 })

  return (
    <div className="band" ref={ref} aria-hidden="true">
      <motion.div className="band-track" style={{ x, skewX }}>
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} className={i % 2 ? 'band-fill' : ''}>{text}</span>
        ))}
      </motion.div>
    </div>
  )
}
