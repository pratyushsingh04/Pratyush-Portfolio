import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile, projects, stats, education } from '../data'

const STAY_MS = 5200
const stack = ['Next.js', 'React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'AWS EC2', 'Docker']
const initials = `${profile.first[0]}${profile.last[0]}`

/**
 * A profile card shown once the page has loaded: everything about me at a
 * glance. It stays a few seconds (hover holds it), then slides off to the
 * side. Clicking outside, pressing a key or scrolling sends it away sooner.
 */
export default function IntroCard() {
  const [open, setOpen] = useState(true)
  const [hold, setHold] = useState(false)

  useEffect(() => {
    if (!open || hold) return
    const id = setTimeout(() => setOpen(false), STAY_MS)
    return () => clearTimeout(id)
  }, [open, hold])

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    window.addEventListener('keydown', close)
    window.addEventListener('wheel', close, { passive: true })
    window.addEventListener('touchmove', close, { passive: true })
    return () => {
      window.removeEventListener('keydown', close)
      window.removeEventListener('wheel', close)
      window.removeEventListener('touchmove', close)
    }
  }, [open])

  const uni = education[0]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="idc-scrim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, delay: 0.15 } }}
          transition={{ duration: 0.4 }}
          onClick={() => setOpen(false)}
        >
          <motion.aside
            className={`idc ${hold ? 'hold' : ''}`}
            aria-label={`About ${profile.name}`}
            initial={{ opacity: 0, y: 40, scale: 0.94, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ x: '115vw', rotate: 14, opacity: 0, transition: { duration: 0.75, ease: [0.7, 0, 0.84, 0] } }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setHold(true)}
            onMouseLeave={() => setHold(false)}
          >
            <header className="idc-head">
              <span className="idc-avatar display" aria-hidden="true">{initials}</span>
              <div className="idc-id">
                <h2 className="idc-name display">{profile.name}</h2>
                <p className="idc-role">Full-Stack &amp; Cloud Engineer</p>
              </div>
              <span className="idc-open mono"><i className="hero-ping" />open to work</span>
            </header>

            <p className="idc-bio">
              Final-year B.Tech CSE student specializing in Cloud Computing and Automation.
              I build full-stack products end to end and deploy them on the cloud.
            </p>

            <dl className="idc-rows">
              <div><dt className="mono">Education</dt><dd>{uni.school} · May 2027</dd></div>
              <div><dt className="mono">CGPA</dt><dd>8.00 / 10</dd></div>
              <div><dt className="mono">Based in</dt><dd>{profile.location}</dd></div>
              <div><dt className="mono">Projects</dt><dd>{projects.map((p) => p.name).join(' · ')}</dd></div>
              <div><dt className="mono">Certified</dt><dd>Microsoft Azure Data Fundamentals</dd></div>
            </dl>

            <div className="idc-stats">
              {stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <b className="display">{s.value}{s.suffix}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            <div className="idc-stack">
              {stack.map((s) => <span className="chip" key={s}>{s}</span>)}
            </div>

            <footer className="idc-foot mono">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <span className="idc-links">
                <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                <a href={profile.links.leetcode} target="_blank" rel="noreferrer">LeetCode</a>
              </span>
            </footer>

            <button className="idc-skip mono" onClick={() => setOpen(false)}>Enter site →</button>
            <span className="idc-timer" aria-hidden="true"><i /></span>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
