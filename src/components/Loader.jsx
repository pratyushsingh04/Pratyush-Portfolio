import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data'

const STAGES = ['Provisioning', 'Building', 'Deploying', 'Live']
const ease = [0.76, 0, 0.24, 1]

/**
 * Boot screen: the name stands in outline and fills with white from the
 * baseline up as the deploy stages tick over. When it is full, the name
 * lifts away and the screen parts in two — one half up, one half down.
 */
export default function Loader({ onDone }) {
  const [visible, setVisible] = useState(true)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return finish()
    const iv = setInterval(() => {
      setPct((p) => {
        const n = p + Math.random() * 6 + 3
        if (n >= 100) {
          clearInterval(iv)
          setTimeout(finish, 450)
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

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="loader" exit={{ opacity: 1, transition: { duration: 1.35 } }}>
          <motion.span className="loader-panel top" exit={{ y: '-100%', transition: { duration: 0.95, delay: 0.3, ease } }} />
          <motion.span className="loader-panel bottom" exit={{ y: '100%', transition: { duration: 0.95, delay: 0.3, ease } }} />

          <motion.div className="loader-inner" exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)', transition: { duration: 0.4, ease: 'easeIn' } }}>
            <div className="loader-top mono">
              <span>{profile.role}</span>
              <span>{profile.location}</span>
            </div>

            <motion.div
              className="loader-name display"
              role="img"
              aria-label={profile.name}
              initial={{ opacity: 0, y: 26, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="ln-outline" aria-hidden="true">{profile.name}</span>
              <span className="ln-fill" aria-hidden="true" style={{ clipPath: `inset(${100 - pct}% 0 0 0)` }}>{profile.name}</span>
            </motion.div>

            <div className="loader-steps mono" aria-hidden="true">
              {STAGES.map((s, i) => (
                <span key={s} className={i < step ? 'done' : i === step ? 'now' : ''}><i />{s}</span>
              ))}
            </div>

            <span className="loader-count mono" aria-label={`Loading ${Math.floor(pct)} percent`}>
              {String(Math.floor(pct)).padStart(3, '0')}<i>%</i>
            </span>
            <div className="loader-line"><span style={{ transform: `scaleX(${pct / 100})` }} /></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
