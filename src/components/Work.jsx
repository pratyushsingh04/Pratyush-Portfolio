import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../data'
import { useCountUp, useInView } from '../hooks'
import Reveal from './Reveal'
import Heading from './Heading'
import ProjectVisual from './ProjectVisual'

const ADVANCE_MS = 4500

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

/**
 * Real screens from the live site in a browser frame. Steps through them on
 * its own while on screen; picking a thumbnail takes over.
 */
function Gallery({ p }) {
  const [ref, inView] = useInView({ threshold: 0.35 })
  const [at, setAt] = useState(0)
  const [auto, setAuto] = useState(true)
  const shot = p.shots[at]

  useEffect(() => {
    if (!inView || !auto) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setTimeout(() => setAt((i) => (i + 1) % p.shots.length), ADVANCE_MS)
    return () => clearTimeout(id)
  }, [inView, auto, at, p.shots.length])

  const pick = (i) => () => { setAuto(false); setAt(i) }

  return (
    <div className="gal" ref={ref}>
      <div className="gal-frame">
        <div className="shot-bar">
          <span className="shot-dots"><i /><i /><i /></span>
          <a className="shot-url mono" href={p.links.live} target="_blank" rel="noreferrer">{p.links.live.replace('https://', '')}</a>
          <span className="shot-live mono"><i />live</span>
        </div>
        <div className="gal-view">
          <AnimatePresence initial={false}>
            <motion.img
              key={shot.src}
              src={shot.src}
              alt={`${p.name} — ${shot.cap}`}
              width="1280"
              height="800"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
          <span className="gal-cap mono">{String(at + 1).padStart(2, '0')} / {String(p.shots.length).padStart(2, '0')} · {shot.cap}</span>
        </div>
      </div>

      <div className="gal-thumbs" style={{ gridTemplateColumns: `repeat(${p.shots.length}, 1fr)` }}>
        {p.shots.map((s, i) => (
          <button className={`gal-thumb ${i === at ? 'on' : ''} ${auto && inView ? 'auto' : ''}`} key={s.src} onClick={pick(i)} aria-label={`Show ${s.cap}`} aria-pressed={i === at}>
            <img src={s.thumb} alt="" loading="lazy" width="360" height="225" />
            <span className="gal-thumb-c mono">{s.cap}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function Project({ p }) {
  return (
    <article id={p.id} className="proj">
      <Reveal className="proj-hd">
        <div>
          <div className="proj-top mono">
            <span className="proj-index">{p.index}</span>
            <span className="proj-kind">{p.kind}</span>
            <span className="proj-kind">{p.period}</span>
          </div>
          <h3 className="proj-name display">{p.name}</h3>
        </div>
        <span className="pin-links mono">
          <a href={p.links.live} target="_blank" rel="noreferrer">Open live site <i>↗</i></a>
          <a href={p.links.code} target="_blank" rel="noreferrer">Source code <i>↗</i></a>
        </span>
      </Reveal>

      <Reveal delay={0.08}><Gallery p={p} /></Reveal>

      <div className="proj-sum">
        <Reveal>
          <p className="proj-tagline">{p.tagline}</p>
          <div className="pin-stack">
            {p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}
          </div>
        </Reveal>
        <Reveal className="proj-metrics" delay={0.08}>
          {p.metrics.map((m) => <Metric key={m.v} m={m} />)}
        </Reveal>
      </div>

      <Reveal className="proj-visual">
        <span className="b-k mono">{p.flowTitle}</span>
        <ProjectVisual flow={p.flow} label={p.flowLabel} />
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
        <Reveal><span className="eyebrow">01 — Projects</span></Reveal>
        <Heading lines={[[{ t: 'Two systems, built' }], [{ t: 'end to' }, { t: 'end.', grad: true }]]} />
        <Reveal delay={0.1}>
          <p className="lead">
            Both are deployed and open to try. The screens below are the live sites as they
            look today — click through them, or open the real thing.
          </p>
        </Reveal>

        <div className="projects">
          {projects.map((p) => <Project key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  )
}
