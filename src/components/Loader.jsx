import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data'

const ease = [0.76, 0, 0.24, 1]
const BAR = 22

// The file the loader "writes": lines of [token class, text] pairs.
const CODE = [
  [['c', '// portfolio.ts']],
  [['k', 'const'], ['n', ' engineer'], ['p', ' = {']],
  [['pr', '  name'], ['p', ': '], ['s', `"${profile.name}"`], ['p', ',']],
  [['pr', '  role'], ['p', ': '], ['s', `"${profile.role}"`], ['p', ',']],
  [['pr', '  stack'], ['p', ': ['], ['s', '"Next.js"'], ['p', ', '], ['s', '"Node.js"'], ['p', ', '], ['s', '"AWS"'], ['p', '],']],
  [['pr', '  openToWork'], ['p', ': '], ['b', 'true'], ['p', ',']],
  [['p', '};']],
  [],
  [['k', 'await'], ['f', ' deploy'], ['p', '('], ['n', 'engineer'], ['p', ');']],
]
const lineLength = (line) => line.reduce((n, [, t]) => n + t.length, 0)
const TOTAL = CODE.reduce((n, line) => n + lineLength(line) + 1, 0)

/**
 * Boot screen: an editor types out a small TypeScript file describing the
 * engineer while a terminal bar runs the deploy. When it reaches 100% the
 * editor lifts away and the screen parts, one half up, one half down.
 */
export default function Loader({ onDone }) {
  const [visible, setVisible] = useState(true)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return finish()
    const iv = setInterval(() => {
      setPct((p) => {
        const n = p + Math.random() * 3.4 + 1.6
        if (n >= 100) {
          clearInterval(iv)
          setTimeout(finish, 650)
          return 100
        }
        return n
      })
    }, 60)
    return () => clearInterval(iv)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function finish() {
    setVisible(false)
    setTimeout(() => onDone?.(), 380)
  }

  // How many characters of the file are typed so far, and on which line the caret sits.
  let left = Math.floor((pct / 100) * TOTAL)
  let caretLine = 0
  const typed = CODE.map((line, i) => {
    const budget = left
    left -= lineLength(line) + 1
    if (budget <= 0) return null
    caretLine = i
    let room = budget
    return line.map(([cls, t]) => {
      const part = t.slice(0, Math.max(room, 0))
      room -= t.length
      return [cls, part]
    })
  })
  const done = pct >= 100
  const filled = Math.round((pct / 100) * BAR)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="loader" exit={{ opacity: 1, transition: { duration: 1.4 } }}>
          <motion.span className="loader-panel top" exit={{ y: '-100%', transition: { duration: 0.95, delay: 0.32, ease } }} />
          <motion.span className="loader-panel bottom" exit={{ y: '100%', transition: { duration: 0.95, delay: 0.32, ease } }} />

          <motion.div className="loader-inner" exit={{ opacity: 0, scale: 1.12, filter: 'blur(12px)', transition: { duration: 0.45, ease: 'easeIn' } }}>
            <span className="loader-grid" aria-hidden="true" />
            <div className="loader-top mono">
              <span>{profile.name}</span>
              <span>{profile.location}</span>
            </div>

            <motion.div
              className="ide"
              role="img"
              aria-label={`Loading ${profile.name}'s portfolio`}
              initial={{ opacity: 0, y: 26, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="ide-bar" aria-hidden="true">
                <span className="ide-dots"><i /><i /><i /></span>
                <span className="ide-tab mono"><b>TS</b>portfolio.ts</span>
                <span className="ide-lang mono">TypeScript</span>
              </div>

              <div className="ide-code mono" aria-hidden="true">
                {CODE.map((_, i) => (
                  <div className={`ide-line ${i === caretLine ? 'on' : ''}`} key={i}>
                    <span className="ide-n">{typed[i] ? i + 1 : ''}</span>
                    <span className="ide-t">
                      {typed[i]?.map(([cls, t], j) => <span className={`tk-${cls}`} key={j}>{t}</span>)}
                      {i === caretLine && <i className="ide-caret" />}
                    </span>
                  </div>
                ))}
              </div>

              <div className="ide-term mono" aria-hidden="true">
                <span className="ide-prompt">$</span>
                <span className="ide-cmd">deploy --prod</span>
                <span className="ide-meter">
                  <b>{'█'.repeat(filled)}</b>{'░'.repeat(BAR - filled)}
                </span>
                <span className={`ide-pct ${done ? 'ok' : ''}`}>{done ? '✓ live' : `${String(Math.floor(pct)).padStart(2, '0')}%`}</span>
              </div>
            </motion.div>

            <div className="loader-line"><span style={{ transform: `scaleX(${pct / 100})` }} /></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
