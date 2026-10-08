import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { projects } from '../data'
import { useCountUp, useInView } from '../hooks'
import Reveal from './Reveal'
import Heading from './Heading'
import Scramble from './Scramble'
import ProjectVisual from './ProjectVisual'
import Tilt from './Tilt'

function Metric({ m }) {
  const num = /^(\d+)(\+?)$/.exec(m.k)
  const [ref, inView] = useInView({ threshold: 0.6 })
  const n = useCountUp(num ? Number(num[1]) : 0, { start: inView, duration: 1400 })
  return (
    <div className="pm" ref={ref}>
      <span className="pm-k display">{num ? `${n}${num[2]}` : m.k}</span>
      <span className="pm-v mono">{m.v}</span>
    </div>
  )
}

/** The project's live site in a browser frame; drifts against the scroll and tilts. */
function Shot({ p }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <motion.div className="shot-wrap" ref={ref} style={{ y }}>
      <Tilt max={6}>
        <a className="shot" href={p.links.live} target="_blank" rel="noreferrer" aria-label={`Open ${p.name} — live site`}>
          <span className="shot-bar">
            <span className="shot-dots"><i /><i /><i /></span>
            <span className="shot-url mono">{p.links.live.replace('https://', '')}</span>
            <span className="shot-live mono"><i />live</span>
          </span>
          <span className="shot-img">
            <img src={p.shot} alt={`${p.name} home page`} loading="lazy" width="800" height="500" />
            <span className="shot-open mono">Open live site ↗</span>
          </span>
        </a>
      </Tilt>
    </motion.div>
  )
}

function Project({ p }) {
  return (
    <article className={`proj accent-${p.accent}`}>
      <div className="proj-head">
        <Reveal className="proj-info">
          <div className="proj-top mono">
            <span className="proj-index">{p.index}</span>
            <span className="proj-kind">{p.kind}</span>
          </div>
          <h3 className="proj-name display">{p.name}</h3>
          <p className="proj-tagline">{p.tagline}</p>
          <div className="proj-metrics">
            {p.metrics.map((m) => <Metric key={m.v} m={m} />)}
          </div>
          <div className="pin-stack">
            {p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}
          </div>
          <div className="pin-foot">
            <span className="pin-links mono">
              <a href={p.links.live} target="_blank" rel="noreferrer">Live <i>↗</i></a>
              <a href={p.links.code} target="_blank" rel="noreferrer">Code <i>↗</i></a>
            </span>
            <span className="pin-period mono">{p.period}</span>
          </div>
        </Reveal>
        <Shot p={p} />
      </div>

      <Reveal className="proj-visual">
        <span className="b-k mono">{p.visual === 'arch' ? 'How it is deployed' : 'What it returns'}</span>
        <ProjectVisual kind={p.visual} />
      </Reveal>

      <div className={`proj-points cols-${p.points.length % 3 === 0 ? 3 : 2}`}>
        {p.points.map((pt, i) => (
          <Reveal className="point" key={i} delay={(i % 3) * 0.07}>
            <span className="point-n mono">{String(i + 1).padStart(2, '0')}</span>
            <h4 className="point-h">{pt.h}</h4>
            <p className="point-p">{pt.p}</p>
          </Reveal>
        ))}
      </div>
    </article>
  )
}

export default function Work() {
  return (
    <section id="work" className="section work">
      <div className="container">
        <Reveal><span className="eyebrow"><Scramble text="02 — Selected work" /></span></Reveal>
        <Heading lines={[[{ t: 'Two systems, built' }], [{ t: 'end to' }, { t: 'end.', grad: true }]]} />
        <Reveal delay={0.1}>
          <p className="lead">
            From schema design and authorization to real-time features, LLM integration and
            cloud deployment — both are live, and both are projects I would want to talk
            through in an interview.
          </p>
        </Reveal>

        <div className="projects">
          {projects.map((p) => <Project key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  )
}
