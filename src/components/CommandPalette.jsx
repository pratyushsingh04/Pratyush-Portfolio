import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile, projects } from '../data'

const go = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
const open = (url) => () => window.open(url, '_blank', 'noopener,noreferrer')

const commands = [
  { group: 'Go to', label: 'Home', hint: 'Section', run: go('home') },
  { group: 'Go to', label: 'About', hint: 'Section', run: go('about') },
  { group: 'Go to', label: 'Work', hint: 'Section', run: go('work') },
  { group: 'Go to', label: 'Skills', hint: 'Section', run: go('skills') },
  { group: 'Go to', label: 'Credentials', hint: 'Section', run: go('credentials') },
  { group: 'Go to', label: 'Contact', hint: 'Section', run: go('contact') },
  ...projects.flatMap((p) => [
    { group: 'Projects', label: `Open ${p.name} — live`, hint: '↗', run: open(p.links.live) },
    { group: 'Projects', label: `Open ${p.name} — source code`, hint: '↗', run: open(p.links.code) },
  ]),
  { group: 'Links', label: 'GitHub', hint: '↗', run: open(profile.links.github) },
  { group: 'Links', label: 'LinkedIn', hint: '↗', run: open(profile.links.linkedin) },
  { group: 'Links', label: 'LeetCode', hint: '↗', run: open(profile.links.leetcode) },
  { group: 'Actions', label: 'Copy email address', hint: 'Copy', run: () => navigator.clipboard?.writeText(profile.email) },
  { group: 'Actions', label: 'Send an email', hint: 'Mail', run: () => { window.location.href = `mailto:${profile.email}` } },
  {
    group: 'Actions', label: 'Download résumé', hint: 'PDF',
    run: () => {
      const a = document.createElement('a')
      a.href = profile.resume
      a.download = ''
      a.click()
    },
  },
]

/** A ⌘K / Ctrl+K command palette: jump to sections, open links, copy the email. */
export default function CommandPalette() {
  const [shown, setShown] = useState(false)
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const list = useRef(null)

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return needle ? commands.filter((c) => `${c.group} ${c.label}`.toLowerCase().includes(needle)) : commands
  }, [q])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setShown((s) => !s)
      } else if (e.key === 'Escape') setShown(false)
    }
    const onOpen = () => setShown(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('palette:open', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('palette:open', onOpen)
    }
  }, [])

  useEffect(() => { if (shown) { setQ(''); setSel(0) } }, [shown])
  useEffect(() => { setSel(0) }, [q])
  useEffect(() => {
    list.current?.querySelector('.cmd-item.sel')?.scrollIntoView({ block: 'nearest' })
  }, [sel])

  const run = (c) => { setShown(false); c?.run() }
  const onInputKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); run(results[sel]) }
  }

  return (
    <AnimatePresence>
      {shown && (
        <motion.div className="cmd-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} onMouseDown={() => setShown(false)}>
          <motion.div
            className="cmd"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="cmd-top">
              <span className="cmd-icon" aria-hidden="true">⌕</span>
              <input autoFocus className="cmd-input" placeholder="Type a command or search…" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onInputKey} aria-label="Search commands" />
              <kbd className="cmd-kbd mono">esc</kbd>
            </div>
            <div className="cmd-list" ref={list}>
              {results.length === 0 && <p className="cmd-empty">Nothing matches “{q}”.</p>}
              {results.map((c, i) => (
                <div key={c.label}>
                  {(i === 0 || results[i - 1].group !== c.group) && <span className="cmd-group mono">{c.group}</span>}
                  <button className={`cmd-item ${i === sel ? 'sel' : ''}`} onMouseEnter={() => setSel(i)} onClick={() => run(c)}>
                    <span>{c.label}</span>
                    <span className="cmd-hint mono">{c.hint}</span>
                  </button>
                </div>
              ))}
            </div>
            <div className="cmd-foot mono"><span>↑↓ navigate</span><span>↵ run</span><span>esc close</span></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
