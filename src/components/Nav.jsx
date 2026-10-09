import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { useActiveSection } from '../hooks'
import { profile } from '../data'

const items = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
]
const ids = items.map((i) => i.id)

export default function Nav() {
  const active = useActiveSection(ids)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#home" className="nav-brand" onClick={go('home')}>
          <span className="nav-mark" />
          <span className="nav-brand-txt">
            <span className="nav-name">{profile.name}</span>
            <span className="nav-role mono">{profile.role}</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {items.map((it) => (
            <a key={it.id} href={`#${it.id}`} onClick={go(it.id)} className={`nav-link ${active === it.id ? 'active' : ''}`}>
              {it.label}
              {active === it.id && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
            </a>
          ))}
        </nav>

        <button className="nav-k mono" onClick={() => window.dispatchEvent(new Event('palette:open'))} aria-label="Open command palette">
          <span>Search</span><kbd>Ctrl K</kbd>
        </button>

        <a className="nav-cta" href={profile.resume} download>
          Résumé <span className="nav-cta-i">↓</span>
        </a>

        <button className={`burger ${open ? 'open' : ''}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <span /><span />
        </button>

        <motion.span className="nav-progress" style={{ scaleX }} aria-hidden="true" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div className="sheet" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            {items.map((it) => (
              <a key={it.id} href={`#${it.id}`} onClick={go(it.id)} className={active === it.id ? 'active' : ''}>{it.label}</a>
            ))}
            <a className="sheet-cta" href={profile.resume} download onClick={() => setOpen(false)}>Download résumé ↓</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
