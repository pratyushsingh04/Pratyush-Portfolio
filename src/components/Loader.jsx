import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data'

// The full stack, top to bottom — every item is on the résumé.
const LAYERS = [
  { k: 'Frontend', v: ['React.js', 'Next.js', 'TypeScript'] },
  { k: 'Backend', v: ['Node.js', 'Express.js', 'REST APIs'] },
  { k: 'Database', v: ['PostgreSQL', 'MongoDB', 'MySQL'] },
  { k: 'Cloud', v: ['AWS EC2', 'Docker', 'Vercel'] },
]
const STEP_MS = 420
const ease = [0.22, 1, 0.36, 1]

/**
 * Intro: who this is, then the stack assembling one layer at a time —
 * frontend, backend, database, cloud — before the page opens.
 */
export default function Loader({ onDone }) {
  const [visible, setVisible] = useState(true)
  const [layer, setLayer] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setVisible(false); onDone?.(); return }
    const timers = LAYERS.map((_, i) => setTimeout(() => setLayer(i + 1), 500 + i * STEP_MS))
    timers.push(setTimeout(() => {
      setVisible(false)
      setTimeout(() => onDone?.(), 300)
    }, 500 + LAYERS.length * STEP_MS + 650))
    return () => timers.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="intro" exit={{ opacity: 0, y: -24, transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }}>
          <div className="intro-box">
            <motion.div className="intro-who" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
              <span className="intro-name display">{profile.name}</span>
              <span className="intro-role">Full-Stack <i className="serif">&amp;</i> Cloud Engineer</span>
              <span className="intro-about mono">B.Tech CSE · VIT Bhopal · Class of 2027</span>
            </motion.div>

            <ul className="intro-stack" aria-label="Full stack: frontend, backend, database, cloud">
              {LAYERS.map((l, i) => (
                <li className={`intro-layer ${layer > i ? 'on' : ''}`} key={l.k}>
                  <span className="il-n mono">{String(i + 1).padStart(2, '0')}</span>
                  <span className="il-k">{l.k}</span>
                  <span className="il-v mono">{l.v.join(' · ')}</span>
                  <span className="il-bar"><i /></span>
                </li>
              ))}
            </ul>

            <span className="intro-foot mono">{layer < LAYERS.length ? `assembling the stack — ${layer}/${LAYERS.length}` : 'ready'}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
