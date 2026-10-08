import { motion, useScroll, useTransform } from 'framer-motion'
import { profile, marquee } from '../data'
import Magnetic from './Magnetic'
import DeployConsole from './DeployConsole'
import Tilt from './Tilt'

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
      <div className="shapes" aria-hidden="true">
        <svg className="shape s-star" viewBox="-6 -6 112 112"><path d="M50 0C55 35 65 45 100 50C65 55 55 65 50 100C45 65 35 55 0 50C35 45 45 35 50 0Z" /></svg>
        <svg className="shape s-dot" viewBox="-6 -6 112 112"><circle cx="50" cy="50" r="50" /></svg>
        <svg className="shape s-pill" viewBox="-6 -6 172 82"><rect width="160" height="70" rx="35" /></svg>
        <svg className="shape s-zig" viewBox="-8 -8 176 56"><path d="M0 35L27 5L53 35L80 5L107 35L133 5L160 35" /></svg>
        <svg className="shape s-plus" viewBox="-6 -6 112 112"><path d="M35 0H65V35H100V65H65V100H35V65H0V35H35Z" /></svg>
      </div>
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

        <div className="hero-row">
        <div className="hero-copy">
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

        <motion.div className="hero-console" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <svg className="spin-badge" viewBox="0 0 120 120" aria-hidden="true">
            <defs><path id="spin-path" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" /></defs>
            <circle cx="60" cy="60" r="58" />
            <text><textPath href="#spin-path" textLength="262">OPEN TO WORK ✦ SDE ✦ CLOUD ✦ 2027 ✦</textPath></text>
            <text className="spin-badge-c" x="60" y="72" textAnchor="middle">★</text>
          </svg>
          <Tilt><DeployConsole /></Tilt>
        </motion.div>
        </div>
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
