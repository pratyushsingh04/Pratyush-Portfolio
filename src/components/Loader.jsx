import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data'

/**
 * A sunrise: a warm arc rises from the bottom edge while the name fades in,
 * then the whole curtain lifts away to reveal the page.
 */
export default function Loader({ onDone }) {
  const [visible, setVisible] = useState(true)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return finish()
    const iv = setInterval(() => {
      setPct((p) => {
        const n = p + Math.random() * 9 + 5
        if (n >= 100) {
          clearInterval(iv)
          setTimeout(finish, 460)
          return 100
        }
        return n
      })
    }, 125)
    return () => clearInterval(iv)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function finish() {
    setVisible(false)
    setTimeout(() => onDone?.(), 950)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* rising sun */}
          <motion.span
            className="loader-sun"
            initial={{ y: 260, scale: 0.7, opacity: 0 }}
            animate={{ y: 120 - pct * 1.5, scale: 0.7 + pct / 260, opacity: 0.25 + pct / 190 }}
            transition={{ type: 'spring', stiffness: 40, damping: 18 }}
          />
          <span className="loader-horizon" />

          <div className="loader-mid">
            <motion.div
              className="loader-name display"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {profile.name}
            </motion.div>
            <motion.div
              className="loader-role mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
              {profile.role}
            </motion.div>
          </div>

          <div className="loader-foot">
            <div className="loader-bar"><span style={{ transform: `scaleX(${pct / 100})` }} /></div>
            <span className="loader-pct mono">{String(Math.floor(pct)).padStart(3, '0')}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
