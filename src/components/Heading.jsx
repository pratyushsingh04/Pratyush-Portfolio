import { motion } from 'framer-motion'

const wrap = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
const word = {
  hidden: { y: '118%', rotate: 7 },
  show: { y: 0, rotate: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

const pop = {
  hidden: { scale: 0, rotate: -16, opacity: 0 },
  show: { scale: 1, rotate: -2, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 13 } },
}

/**
 * A heading whose words rise out of a mask one after another. `lines` is an
 * array of lines, each an array of segments: { t: 'text', grad?: true }.
 * Accent segments are sticker-style highlights that pop in as one unit.
 */
export default function Heading({ lines, className = 'h2' }) {
  return (
    <motion.h2 className={className} variants={wrap} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-70px' }}>
      {lines.map((segs, i) => (
        <span className="hl" key={i}>
          {segs.flatMap((s, j) => {
            const parts = s.grad ? [s.t] : s.t.split(' ')
            return parts.flatMap((w, k) => [
              <span className={`hw ${s.grad ? 'hw-free' : ''}`} key={`${j}-${k}`}>
                <motion.span className={`hw-in ${s.grad ? 'serif grad' : ''}`} variants={s.grad ? pop : word}>{w}</motion.span>
              </span>,
              ' ',
            ])
          })}
        </span>
      ))}
    </motion.h2>
  )
}
