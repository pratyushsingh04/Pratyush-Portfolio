import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data'

const ease = [0.76, 0, 0.24, 1]

// The file the loader "writes": lines of [token class, text] pairs.
const CODE = [
  [['kc', 'import'], ['p', ' { '], ['n', 'deploy'], ['p', ' } '], ['kc', 'from'], ['s', ' "./cloud"'], ['p', ';']],
  [['kc', 'import'], ['k', ' type'], ['p', ' { '], ['t', 'Engineer'], ['p', ' } '], ['kc', 'from'], ['s', ' "./types"'], ['p', ';']],
  [],
  [['k', 'const'], ['n', ' engineer'], ['p', ': '], ['t', 'Engineer'], ['p', ' = {']],
  [['n', '  name'], ['p', ': '], ['s', `"${profile.name}"`], ['p', ',']],
  [['n', '  role'], ['p', ': '], ['s', `"${profile.role}"`], ['p', ',']],
  [['n', '  stack'], ['p', ': ['], ['s', '"Next.js"'], ['p', ', '], ['s', '"Node.js"'], ['p', ', '], ['s', '"AWS"'], ['p', '],']],
  [['n', '  openToWork'], ['p', ': '], ['k', 'true'], ['p', ',']],
  [['p', '};']],
  [],
  [['kc', 'export default await'], ['f', ' deploy'], ['p', '('], ['n', 'engineer'], ['p', ');']],
]
const lineLength = (line) => line.reduce((n, [, t]) => n + t.length, 0)
const TOTAL = CODE.reduce((n, line) => n + lineLength(line) + 1, 0)

const TREE = [
  { d: 0, dir: true, name: 'src' },
  { d: 1, dir: true, name: 'components' },
  { d: 2, icon: 'tsx', name: 'Hero.tsx' },
  { d: 2, icon: 'tsx', name: 'Globe.tsx' },
  { d: 1, icon: 'ts', name: 'cloud.ts' },
  { d: 1, icon: 'ts', name: 'portfolio.ts', active: true },
  { d: 1, icon: 'ts', name: 'types.ts' },
  { d: 0, icon: 'json', name: 'package.json' },
  { d: 0, icon: 'md', name: 'README.md' },
]
const ICON = { ts: 'TS', tsx: 'TS', json: '{}', md: 'M↓' }

const Glyph = ({ d }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
)
const ACTIVITY = [
  'M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7l-4-4zM14 3v4h4',
  'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5L21 21',
  'M7 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM17 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 9v6M17 12c0 3-4 2-8 4',
  'M4 4h6v6H4zM4 14h6v6H4zM14 14h6v6h-6zM17 3l4 4-4 4-4-4z',
]

/**
 * Boot screen: a code editor, as close to the real thing as CSS allows. It
 * types out portfolio.ts while the integrated terminal builds and deploys,
 * then the editor lifts away and the screen parts in two.
 */
export default function Loader({ onDone }) {
  const [visible, setVisible] = useState(true)
  const [pct, setPct] = useState(0)
  const started = useRef(performance.now())
  const builtIn = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return finish()
    const iv = setInterval(() => {
      setPct((p) => {
        const n = p + Math.random() * 2.6 + 1.3
        if (n >= 100) {
          clearInterval(iv)
          setTimeout(finish, 750)
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

  // How much of the file is typed so far, and where the caret sits.
  let left = Math.floor((Math.min(pct, 84) / 84) * TOTAL)
  let caretLine = 0
  let caretCol = 1
  const typed = CODE.map((line, i) => {
    const budget = left
    left -= lineLength(line) + 1
    if (budget <= 0) return null
    caretLine = i
    caretCol = Math.min(budget, lineLength(line)) + 1
    let room = budget
    return line.map(([cls, t]) => {
      const part = t.slice(0, Math.max(room, 0))
      room -= t.length
      return [cls, part]
    })
  })
  const saved = pct >= 84
  if (pct >= 72 && builtIn.current === null) builtIn.current = ((performance.now() - started.current) / 1000).toFixed(2)

  const term = [
    pct >= 4 && ['cmd', 'npm run build'],
    pct >= 10 && ['dim', '> portfolio@1.0.0 build'],
    pct >= 10 && ['dim', '> vite build'],
    pct >= 22 && ['out', 'vite v5.4 building for production...'],
    pct >= 52 && ['ok', 'modules transformed.'],
    pct >= 72 && ['ok', `built in ${builtIn.current}s`],
    pct >= 86 && ['cmd', 'vercel --prod'],
    pct >= 100 && ['ok', `Production: ${window.location.host}  [live]`],
  ].filter(Boolean)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="loader" exit={{ opacity: 1, transition: { duration: 1.4 } }}>
          <motion.span className="loader-panel top" exit={{ y: '-100%', transition: { duration: 0.95, delay: 0.32, ease } }} />
          <motion.span className="loader-panel bottom" exit={{ y: '100%', transition: { duration: 0.95, delay: 0.32, ease } }} />

          <motion.div className="loader-inner" exit={{ opacity: 0, scale: 1.1, filter: 'blur(12px)', transition: { duration: 0.45, ease: 'easeIn' } }}>
            <span className="loader-grid" aria-hidden="true" />

            <motion.div
              className="vsc"
              role="img"
              aria-label={`Loading ${profile.name}'s portfolio`}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="vsc-title" aria-hidden="true">
                <span className="vsc-dots"><i /><i /><i /></span>
                <span className="vsc-title-t">portfolio.ts — pratyush-portfolio</span>
              </div>

              <div className="vsc-main" aria-hidden="true">
                <div className="vsc-act">
                  {ACTIVITY.map((d, i) => <span className={i === 0 ? 'on' : ''} key={i}><Glyph d={d} /></span>)}
                </div>

                <div className="vsc-side">
                  <span className="vsc-side-h">Explorer</span>
                  <span className="vsc-side-root">⌄ PRATYUSH-PORTFOLIO</span>
                  {TREE.map((f) => (
                    <span className={`vsc-file ${f.active ? 'on' : ''}`} style={{ paddingLeft: 14 + f.d * 12 }} key={f.name}>
                      {f.dir ? <i className="vsc-chev">⌄</i> : <i className={`vsc-ic ${f.icon}`}>{ICON[f.icon]}</i>}
                      {f.name}
                      {f.active && <b>{saved ? '' : 'M'}</b>}
                    </span>
                  ))}
                </div>

                <div className="vsc-edit">
                  <div className="vsc-tabs">
                    <span className="vsc-tab on"><i className="vsc-ic ts">TS</i>portfolio.ts<b className={saved ? 'x' : 'dot'}>{saved ? '×' : '●'}</b></span>
                    <span className="vsc-tab"><i className="vsc-ic ts">TS</i>types.ts</span>
                  </div>
                  <div className="vsc-crumbs">src <i>›</i> <span className="vsc-ic ts">TS</span> portfolio.ts <i>›</i> engineer</div>

                  <div className="vsc-code mono">
                    <div className="vsc-lines">
                      {CODE.map((_, i) => (
                        <div className={`vsc-line ${i === caretLine ? 'on' : ''}`} key={i}>
                          <span className="vsc-n">{i + 1}</span>
                          <span className="vsc-t">
                            {typed[i]?.map(([cls, t], j) => <span className={`vt-${cls}`} key={j}>{t}</span>)}
                            {i === caretLine && <i className="vsc-caret" />}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="vsc-map">
                      {CODE.map((line, i) => (
                        <i key={i} style={{ width: typed[i] ? `${Math.min(100, typed[i].reduce((n, [, t]) => n + t.length, 0) * 2.2)}%` : 0 }} />
                      ))}
                    </div>
                  </div>

                  <div className="vsc-panel">
                    <div className="vsc-panel-h"><span>Problems</span><span>Output</span><span>Debug Console</span><span className="on">Terminal</span></div>
                    <div className="vsc-term mono">
                      {term.map(([k, t], i) => (
                        <div className={`tl tl-${k}`} key={i}>
                          {k === 'cmd' && <><span className="tl-path">~/pratyush-portfolio</span><span className="tl-br"> (main)</span> $ </>}
                          {k === 'ok' && <span className="tl-tick">✓ </span>}
                          {t}
                        </div>
                      ))}
                      {pct < 100 && <div className="tl"><i className="vsc-caret blk" /></div>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="vsc-status mono" aria-hidden="true">
                <span className="vsc-remote">&gt;&lt;</span>
                <span>⎇ main{saved ? '' : '*'}</span>
                <span className="hide-s">⊗ 0 &nbsp;⚠ 0</span>
                <span className="vsc-sp" />
                <span>Ln {caretLine + 1}, Col {caretCol}</span>
                <span className="hide-s">Spaces: 2</span>
                <span className="hide-s">UTF-8</span>
                <span className="hide-s">LF</span>
                <span>{'{ }'} TypeScript</span>
              </div>
            </motion.div>

            <div className="loader-line"><span style={{ transform: `scaleX(${pct / 100})` }} /></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
