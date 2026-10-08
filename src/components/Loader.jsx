import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data'

const STAGES = ['Provisioning', 'Building', 'Deploying', 'Live']
const ease = [0.76, 0, 0.24, 1]

// One wave crest every 250 units, long enough to slide a full period sideways.
const WAVE = `M0 0 ${'q62.5 -22 125 0 t125 0 '.repeat(6)}V320 H0 Z`
const text = { x: 500, y: 158, textAnchor: 'middle', textLength: 960, lengthAdjust: 'spacingAndGlyphs' }

/**
 * Boot screen: the name stands in outline and fills with liquid — two waves
 * rising inside the letters — as the deploy stages tick over. When it is
 * full, the name lifts away and the screen parts, one half up, one half down.
 */
export default function Loader({ onDone }) {
  const [visible, setVisible] = useState(true)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return finish()
    const iv = setInterval(() => {
      setPct((p) => {
        const n = p + Math.random() * 5 + 2.5
        if (n >= 100) {
          clearInterval(iv)
          setTimeout(finish, 520)
          return 100
        }
        return n
      })
    }, 90)
    return () => clearInterval(iv)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function finish() {
    setVisible(false)
    setTimeout(() => onDone?.(), 380)
  }

  const step = pct >= 100 ? 3 : Math.floor(pct / 34)
  // Liquid surface: below the baseline at 0, above the cap height at 100.
  const level = 196 - pct * 1.9

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="loader" exit={{ opacity: 1, transition: { duration: 1.4 } }}>
          <motion.span className="loader-panel top" exit={{ y: '-100%', transition: { duration: 0.95, delay: 0.32, ease } }} />
          <motion.span className="loader-panel bottom" exit={{ y: '100%', transition: { duration: 0.95, delay: 0.32, ease } }} />

          <motion.div className="loader-inner" exit={{ opacity: 0, scale: 1.25, filter: 'blur(14px)', transition: { duration: 0.45, ease: 'easeIn' } }}>
            <span className="loader-grid" aria-hidden="true" />
            <div className="loader-top mono">
              <span>{profile.role}</span>
              <span>{profile.location}</span>
            </div>

            <motion.svg
              className="loader-name"
              viewBox="0 0 1000 200"
              role="img"
              aria-label={profile.name}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <defs>
                <clipPath id="loader-name-clip"><text {...text}>{profile.name}</text></clipPath>
              </defs>
              <text className="ln-outline" {...text}>{profile.name}</text>
              <g clipPath="url(#loader-name-clip)">
                <g className="ln-level" style={{ transform: `translateY(${level}px)` }}>
                  <path className="ln-wave back" d={WAVE} />
                  <path className="ln-wave front" d={WAVE} />
                </g>
              </g>
            </motion.svg>

            <div className="loader-steps mono" aria-hidden="true">
              {STAGES.map((s, i) => (
                <span key={s} className={i < step ? 'done' : i === step ? 'now' : ''}><i />{s}</span>
              ))}
            </div>

            <span className="loader-count display" aria-label={`Loading ${Math.floor(pct)} percent`}>
              {String(Math.floor(pct)).padStart(2, '0')}<i>%</i>
            </span>
            <div className="loader-line"><span style={{ transform: `scaleX(${pct / 100})` }} /></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
