import { motion, useScroll, useTransform } from 'framer-motion'
import { profile, projects } from '../data'
import Magnetic from './Magnetic'

const title = { hidden: {}, show: { transition: { staggerChildren: 0.022, delayChildren: 0.2 } } }
const char = {
  hidden: { y: '0.35em', opacity: 0, filter: 'blur(8px)' },
  show: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
}

// Split into words (kept unbreakable) of individually animated characters.
const chars = (text) =>
  text.split(' ').flatMap((w, i) => [
    <span className="hero-word" key={i}>
      {[...w].map((c, j) => <motion.span className="hero-char" key={j} variants={char}>{c}</motion.span>)}
    </span>,
    ' ',
  ])

const go = (id) => (e) => {
  e?.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Hero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.16], [0, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.13], [1, 0])

  return (
    <section id="home" className="hero">
      <motion.div className="container hero-in" style={{ y, opacity }}>
        <div className="hero-grid">
          <div className="hero-left">
            <motion.div className="hero-badge" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
              <span className="hero-ping" />
              <span>{profile.status}</span>
              <span className="hero-badge-sep" />
              <span className="mono">{profile.location}</span>
            </motion.div>

            <motion.h1 className="hero-title display" aria-label={profile.headline.join(' ')} variants={title} initial="hidden" animate="show">
              <span className="hero-line" aria-hidden="true">{chars(profile.headline[0])}</span>
              <span className="hero-line" aria-hidden="true">
                {chars('shipped to the')}{' '}
                <motion.span className="hero-word serif grad" variants={char}>cloud.</motion.span>
              </span>
            </motion.h1>

            <motion.p className="hero-sub" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.7 }}>
              I'm <strong>{profile.name}</strong>, a final-year CSE student at VIT Bhopal. I built{' '}
              <a href="#worknest" onClick={go('worknest')}>WorkNest</a>, a multi-tenant SaaS running on AWS, and{' '}
              <a href="#wardrobe-ai" onClick={go('wardrobe-ai')}>Wardrobe AI</a>, an outfit assistant on vision LLMs. Both are live.
            </motion.p>

            <motion.div className="hero-cta" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }}>
              <Magnetic>
                <button className="btn btn-sun" onClick={go('work')}>
                  <span>See the projects</span><span className="bi">→</span>
                </button>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a className="btn btn-line" href={`mailto:${profile.email}`}>Get in touch</a>
              </Magnetic>
              <div className="hero-socials mono">
                <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                <a href={profile.links.leetcode} target="_blank" rel="noreferrer">LeetCode</a>
              </div>
            </motion.div>
          </div>

          {/* The two projects themselves, as they look live. */}
          <div className="hero-stack">
            {projects.map((p, i) => (
              <motion.a
                className={`hs hs-${i + 1}`}
                href={`#${p.id}`}
                onClick={go(p.id)}
                key={p.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.18, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="hs-bar">
                  <span className="shot-dots"><i /><i /><i /></span>
                  <span className="hs-url mono">{p.links.live.replace('https://', '')}</span>
                </span>
                <img src={p.shots[0].src} alt={`${p.name} — live site`} width="1280" height="800" />
                <span className="hs-cap">
                  <b>{p.name}</b>
                  <span className="mono">{p.kind}</span>
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
