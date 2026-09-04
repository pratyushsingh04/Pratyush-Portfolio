import { motion, useScroll, useTransform } from 'framer-motion'
import { profile, marquee } from '../data'
import Magnetic from './Magnetic'

const line = {
  hidden: { y: '110%' },
  show: (i) => ({ y: 0, transition: { delay: 0.35 + i * 0.11, duration: 0.9, ease: [0.22, 1, 0.36, 1] } }),
}

export default function Hero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.16], [0, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.13], [1, 0])

  const go = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="hero">
      <motion.div className="container hero-in" style={{ y, opacity }}>
        <motion.div className="hero-badge" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
          <span className="hero-ping" />
          <span>{profile.status}</span>
          <span className="hero-badge-sep" />
          <span className="mono">{profile.location}</span>
        </motion.div>

        <h1 className="hero-title display">
          {profile.headline.map((l, i) => (
            <span className="hero-line" key={i}>
              <motion.span className="hero-line-in" custom={i} variants={line} initial="hidden" animate="show">
                {i === 1 ? (
                  <>
                    shipped to the <span className="serif grad">cloud.</span>
                  </>
                ) : (
                  l
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p className="hero-sub" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.7 }}>
          I'm <strong>{profile.name}</strong> — a {profile.role.toLowerCase()} who builds
          multi-tenant platforms, real-time features and REST APIs, then deploys them on AWS.
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
      </motion.div>

      <div className="hero-marquee" aria-hidden="true">
        <div className="hero-marquee-track">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i}>{m}<i className="dot">●</i></span>
          ))}
        </div>
      </div>
    </section>
  )
}
