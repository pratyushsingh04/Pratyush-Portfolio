import { profile, stats, education } from '../data'
import { useCountUp, useInView } from '../hooks'
import Reveal from './Reveal'
import Heading from './Heading'
import SpotlightCard from './SpotlightCard'

function Stat({ s, start }) {
  const n = useCountUp(s.value, { start })
  return (
    <div className="stat">
      <span className="stat-n display">{n}<i className="grad">{s.suffix}</i></span>
      <span className="stat-l">{s.label}</span>
    </div>
  )
}

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.25 })

  return (
    <section id="about" className="section about">
      <div className="container">
        <Reveal><span className="eyebrow">01 — About</span></Reveal>
        <Heading lines={[[{ t: 'I like problems that live' }], [{ t: 'between the' }, { t: 'app and the cloud.', grad: true }]]} />

        <div className="about-grid" ref={ref}>
          <Reveal delay={0.1} className="about-copy">
            <p className="lead">{profile.summary}</p>
            <p className="about-note">
              Proficient in <strong>AWS, Docker, Git and GitHub</strong>, with a strong backend
              foundation in <strong>Node.js, REST APIs and PostgreSQL</strong>. Graduating from
              VIT Bhopal in May 2027 — and solving DSA problems in between deploys.
            </p>
          </Reveal>

          <Reveal delay={0.16} className="about-stats">
            {stats.map((s) => <Stat key={s.label} s={s} start={inView} />)}
          </Reveal>
        </div>

        <div className="edu-grid">
          {education.map((e, i) => (
            <Reveal key={e.school} delay={0.1 + i * 0.06}>
              <SpotlightCard className="edu-card">
                <span className="edu-k mono">{i === 0 ? 'UNIVERSITY' : 'SCHOOL'}</span>
                <h3 className="edu-school">{e.school}</h3>
                <p className="edu-detail">{e.detail}</p>
                <div className="edu-foot">
                  <span className="mono">{e.place}</span>
                  {e.score && <span className="edu-score">{e.score}</span>}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
