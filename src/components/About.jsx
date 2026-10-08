import { profile, stats, education, marquee } from '../data'
import { useCountUp, useInView } from '../hooks'
import Reveal from './Reveal'
import Heading from './Heading'
import SpotlightCard from './SpotlightCard'

function Stat({ s, start }) {
  const n = useCountUp(s.value, { start })
  return (
    <div className="stat">
      <span className="stat-n display">{n}<i>{s.suffix}</i></span>
      <span className="stat-l">{s.label}</span>
    </div>
  )
}

const now = [
  { k: 'Status', v: profile.status, live: true },
  { k: 'Based in', v: profile.location },
  { k: 'Graduating', v: 'May 2027 · VIT Bhopal' },
  { k: 'Focus', v: 'Backend & cloud engineering' },
]

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.25 })
  const half = Math.ceil(marquee.length / 2)
  const rows = [marquee.slice(0, half), marquee.slice(half)]

  return (
    <section id="about" className="section about">
      <div className="container">
        <Reveal><span className="eyebrow">01 — About</span></Reveal>
        <Heading lines={[[{ t: 'I like problems that live' }], [{ t: 'between the' }, { t: 'app and the cloud.', grad: true }]]} />

        <div className="bento">
          <Reveal className="b-intro" delay={0.05}>
            <SpotlightCard>
              <span className="b-k mono">Who</span>
              <p className="b-lead">{profile.summary}</p>
              <p className="about-note">
                Skilled in <strong>REST API design, JWT authentication and role-based access
                control</strong>, <strong>real-time WebSocket services</strong> and <strong>LLM
                integration</strong>. Microsoft Azure Data Fundamentals certified, with 300+ DSA
                problems completed on LeetCode.
              </p>
            </SpotlightCard>
          </Reveal>

          <Reveal className="b-stats" delay={0.1}>
            <div className="about-stats" ref={ref}>
              {stats.map((s) => <Stat key={s.label} s={s} start={inView} />)}
            </div>
          </Reveal>

          {education.map((e, i) => (
            <Reveal className="b-edu" key={e.school} delay={0.08 + i * 0.06}>
              <SpotlightCard>
                <span className="b-k mono">{i === 0 ? 'University' : 'School'}</span>
                <h3 className="edu-school">{e.school}</h3>
                <p className="edu-detail">{e.detail}</p>
                <div className="edu-foot">
                  <span className="mono">{e.place}</span>
                  {e.score && <span className="edu-score">{e.score}</span>}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}

          <Reveal className="b-now" delay={0.2}>
            <SpotlightCard>
              <span className="b-k mono">Right now</span>
              <ul className="now-list">
                {now.map((n) => (
                  <li key={n.k}>
                    <span className="now-k mono">{n.k}</span>
                    <span className="now-v">{n.live && <i className="hero-ping" />}{n.v}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>

          <Reveal className="b-stack" delay={0.12}>
            <div className="stack-tile" aria-label={`Technologies: ${marquee.join(', ')}`}>
              <span className="b-k mono">Stack I reach for</span>
              {rows.map((row, r) => (
                <div className="stack-row" key={r} aria-hidden="true">
                  <div className={`stack-track ${r ? 'rev' : ''}`}>
                    {[...row, ...row, ...row, ...row].map((m, i) => <span className="stack-pill" key={i}><i />{m}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
