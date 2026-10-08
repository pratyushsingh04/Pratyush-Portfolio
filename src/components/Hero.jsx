import { motion, useScroll, useTransform } from 'framer-motion'
import { profile } from '../data'
import Magnetic from './Magnetic'
import DeployConsole from './DeployConsole'
import Tilt from './Tilt'
import Starfield from './Starfield'
import Globe from './Globe'

const title = { hidden: {}, show: { transition: { staggerChildren: 0.03, delayChildren: 0.25 } } }
const char = {
  hidden: { y: '0.5em', opacity: 0, filter: 'blur(14px)', rotateX: -80 },
  show: { y: 0, opacity: 1, filter: 'blur(0px)', rotateX: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
}

// Split into words (kept unbreakable) of individually animated characters.
const chars = (text) =>
  text.split(' ').flatMap((w, i) => [
    <span className="hero-word" key={i}>
      {[...w].map((c, j) => <motion.span className="hero-char" key={j} variants={char}>{c}</motion.span>)}
    </span>,
    ' ',
  ])

const tags = ['AWS EC2', 'Vercel', 'Neon · Postgres', 'Socket.IO']

export default function Hero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.16], [0, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.13], [1, 0])

  const go = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="hero">
      <Starfield />
      <div className="hero-beams" aria-hidden="true"><i /><i /><i /><i /><i /></div>

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
                <motion.span className="hero-word grad" variants={char}>cloud.</motion.span>
              </span>
            </motion.h1>

            <motion.p className="hero-sub" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.7 }}>
              I'm <strong>{profile.name}</strong> — a {profile.role.toLowerCase()} who builds secure,
              multi-tenant platforms, real-time services and REST APIs, then deploys them on AWS.
            </motion.p>

            <motion.div className="hero-cta" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }}>
              <Magnetic>
                <button className="btn btn-sun" onClick={go('work')}>
                  <span>View my work</span><span className="bi">→</span>
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

          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.86 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}>
            <Globe />
            {tags.map((t, i) => (
              <span className={`hero-tag mono t${i + 1}`} key={t} aria-hidden="true"><i />{t}</span>
            ))}
            <motion.div className="hero-console" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <Tilt><DeployConsole /></Tilt>
            </motion.div>
            <span className="hero-drag mono" aria-hidden="true">drag to spin</span>
          </motion.div>
        </div>
      </motion.div>

      <button className="hero-scroll mono" onClick={go('about')} aria-label="Scroll to about">
        <span className="hero-mouse"><i /></span>scroll
      </button>
    </section>
  )
}
