import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { consoleLines } from '../data'

const CHAR_MS = 42
const LINE_MS = 340

/**
 * A terminal that types out the WorkNest deployment. Commands are typed
 * character by character; output lines land whole, one beat apart.
 */
export default function DeployConsole({ delay = 1400 }) {
  const reduced = useReducedMotion()
  const [line, setLine] = useState(reduced ? consoleLines.length : 0)
  const [chars, setChars] = useState(0)

  useEffect(() => {
    if (reduced || line >= consoleLines.length) return
    const cur = consoleLines[line]
    const typing = cur.t === 'cmd' && chars < cur.text.length
    const wait = line === 0 && chars === 0 ? delay : typing ? CHAR_MS : LINE_MS
    const id = setTimeout(() => {
      if (typing) setChars((c) => c + 1)
      else { setLine((l) => l + 1); setChars(0) }
    }, wait)
    return () => clearTimeout(id)
  }, [line, chars, reduced, delay])

  const done = line >= consoleLines.length

  return (
    <div className="console" aria-label="Deployment of WorkNest: Next.js on Vercel, Express and Socket.IO on AWS EC2, PostgreSQL on Neon">
      <div className="console-bar" aria-hidden="true">
        <span className="console-dots"><i /><i /><i /></span>
        <span className="console-title mono">pratyush@cloud — deploy</span>
      </div>
      <div className="console-body mono" aria-hidden="true">
        {consoleLines.map((l, i) => {
          if (i > line) return <div className="cl cl-ghost" key={i}>&nbsp;</div>
          const active = i === line
          if (l.t === 'cmd') {
            return (
              <div className="cl" key={i}>
                <span className="cl-prompt">~ $</span> {active ? l.text.slice(0, chars) : l.text}
                {active && <span className="cl-caret" />}
              </div>
            )
          }
          if (active) return <div className="cl cl-ghost" key={i}>&nbsp;</div>
          if (l.t === 'ok') {
            return (
              <div className="cl cl-ok" key={i}>
                <span className="cl-tick">✓</span>
                <span className="cl-k">{l.k}</span>
                <span className="cl-txt">{l.text}</span>
                <span className="cl-arrow">→</span>
                <span className="cl-to">{l.to}</span>
              </div>
            )
          }
          if (l.t === 'live') {
            return (
              <div className="cl cl-live" key={i}>
                <span className="cl-dot" /> live <span className="cl-txt">{l.text}</span>
              </div>
            )
          }
          return <div className="cl cl-out" key={i}>{l.text}</div>
        })}
        {done && (
          <div className="cl"><span className="cl-prompt">~ $</span> <span className="cl-caret" /></div>
        )}
      </div>
    </div>
  )
}
