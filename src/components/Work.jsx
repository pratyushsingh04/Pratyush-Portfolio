import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { projects } from '../data'
import { useCountUp, useInView } from '../hooks'
import Reveal from './Reveal'
import Heading from './Heading'
import Tilt from './Tilt'
import ProjectVisual from './ProjectVisual'

/**
 * Each project is a sticky showcase: the summary card pins to the viewport
 * while its detailed points scroll past it, so the reader always knows which
 * project they are inside.
 */
function Metric({ m }) {
  const num = /^(\d+)(\+?)$/.exec(m.k)
  const [ref, inView] = useInView({ threshold: 0.6 })
  const n = useCountUp(num ? Number(num[1]) : 0, { start: inView, duration: 1400 })
  return (
    <div className="pm" ref={ref}>
      <span className="pm-k display grad">{num ? `${n}${num[2]}` : m.k}</span>
      <span className="pm-v mono">{m.v}</span>
    </div>
  )
}

function Showcase({ p }) {
  const body = useRef(null)
  const { scrollYProgress } = useScroll({ target: body, offset: ['start 75%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  return (
    <div className={`showcase accent-${p.accent}`}>
      <div className="showcase-pin">
        <div className="pin-sticky">
          <Tilt max={5}>
          <Reveal className="pin-card">
          <div className="pin-top">
            <span className="pin-index display">{p.index}</span>
            <span className="pin-kind mono">{p.kind}</span>
          </div>
          <h3 className="pin-name display">{p.name}</h3>
          <p className="pin-tagline">{p.tagline}</p>

          <ProjectVisual kind={p.visual} />

          <div className="pin-metrics">
            {p.metrics.map((m) => <Metric key={m.v} m={m} />)}
          </div>

          <div className="pin-stack">
            {p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}
          </div>
          <div className="pin-foot">
            <span className="pin-period mono">{p.period}</span>
            <span className="pin-links mono">
              <a href={p.links.live} target="_blank" rel="noreferrer">Live <i>↗</i></a>
              <a href={p.links.code} target="_blank" rel="noreferrer">Code <i>↗</i></a>
            </span>
          </div>
          </Reveal>
          </Tilt>
        </div>
      </div>

      <div className="showcase-body" ref={body}>
        <span className="rail" aria-hidden="true"><motion.span className="rail-fill" style={{ scaleY: fill }} /></span>
        {p.points.map((pt, i) => (
          <Reveal className="point" key={i} delay={0.04}>
            <span className="point-n mono">{String(i + 1).padStart(2, '0')}</span>
            <h4 className="point-h">{pt.h}</h4>
            <p className="point-p">{pt.p}</p>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export default function Work() {
  return (
    <section id="work" className="section work">
      <div className="container">
        <Reveal><span className="eyebrow">02 — Selected work</span></Reveal>
        <Heading lines={[[{ t: 'Two systems, built' }], [{ t: 'end to' }, { t: 'end.', grad: true }]]} />
        <Reveal delay={0.1}>
          <p className="lead">
            From schema design and authorization to real-time features, LLM integration and
            cloud deployment — both are live, and both are projects I would want to talk
            through in an interview.
          </p>
        </Reveal>

        <div className="showcases">
          {projects.map((p) => <Showcase key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  )
}
