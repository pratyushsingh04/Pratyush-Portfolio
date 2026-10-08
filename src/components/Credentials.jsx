import { certifications, achievements } from '../data'
import Reveal from './Reveal'
import Heading from './Heading'
import SpotlightCard from './SpotlightCard'

export default function Credentials() {
  return (
    <section id="credentials" className="section creds">
      <div className="container">
        <Reveal><span className="eyebrow">04 — Credentials</span></Reveal>
        <Heading lines={[[{ t: 'Certified, and' }, { t: 'practised.', grad: true }]]} />

        <div className="cert-grid">
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={0.05 + i * 0.05}>
              <SpotlightCard as="a" href={c.url} target="_blank" rel="noreferrer" className={`cert ${c.featured ? 'featured' : ''}`}>
                <div className="cert-top">
                  <span className="cert-badge" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.7 6.7 19.5l1.1-6L3.4 9.3l6-.8L12 3z"
                            stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="cert-org mono">{c.org}</span>
                </div>
                <h3 className="cert-title">{c.title}</h3>
                <span className="cert-code mono">{c.code} <i className="cert-open">View ↗</i></span>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <div className="ach-grid">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={0.05 + i * 0.07}>
              <SpotlightCard className="ach-card">
                <span className="ach-place mono">{a.place}</span>
                <span className="ach-big display">{a.big}</span>
                <h4 className="ach-t">{a.title}</h4>
                <p className="ach-note">{a.note}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
