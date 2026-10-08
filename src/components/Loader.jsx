import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data'

const STAGES = ['Provisioning', 'Building', 'Deploying', 'Live']
const initials = `${profile.first[0]}${profile.last[0]}`

/**
 * A quiet boot screen: a hairline ring closes around the initials while a
 * large counter climbs and the stage word changes, then the screen wipes up.
 */
export default function Loader({ onDone }) {
  const [visible, setVisible] = useState(true)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return finish()
    const iv = setInterval(() => {
      setPct((p) => {
        const n = p + Math.random() * 7 + 4
        if (n >= 100) {
          clearInterval(iv)
          setTimeout(finish, 420)
          return 100
        }
        return n
      })
    }, 95)
    return () => clearInterval(iv)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function finish() {
    setVisible(false)
    setTimeout(() => onDone?.(), 700)
  }

  const stage = pct >= 100 ? STAGES[3] : STAGES[Math.floor(pct / 34)]

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="loader-top mono">
            <span>{profile.name}</span>
            <span>Portfolio — {new Date().getFullYear()}</span>
          </div>

          <motion.div className="loader-mid" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <svg className="loader-ring" viewBox="0 0 120 120" aria-hidden="true">
              <circle className="lr-track" cx="60" cy="60" r="56" />
              <circle className="lr-fill" cx="60" cy="60" r="56" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - pct} />
            </svg>
            <span className="loader-mark display">{initials}</span>
          </motion.div>

          <div className="loader-foot">
            <span className="loader-stage">
              <AnimatePresence mode="wait">
                <motion.span key={stage} className="serif" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                  {stage}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="loader-pct display" aria-label={`Loading ${Math.floor(pct)} percent`}>{String(Math.floor(pct)).padStart(2, '0')}</span>
          </div>
          <div className="loader-line"><span style={{ transform: `scaleX(${pct / 100})` }} /></div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
