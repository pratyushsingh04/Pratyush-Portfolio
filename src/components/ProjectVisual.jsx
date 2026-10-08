import { motion } from 'framer-motion'
import { architecture, sampleScore } from '../data'

function Architecture() {
  return (
    <div className="arch" role="img" aria-label="Architecture: Next.js on Vercel talks over REST and WebSockets to Express and Socket.IO on AWS EC2, which reaches PostgreSQL on Neon through Prisma">
      {architecture.map((n, i) =>
        n.link ? (
          <div className="arch-link" key={i} aria-hidden="true">
            <span className="arch-link-l mono">{n.link}</span>
            <span className="arch-wire"><i /><i /></span>
          </div>
        ) : (
          <div className="arch-node" key={i}>
            <span className="arch-k">{n.k}</span>
            <span className="arch-v mono">{n.v}</span>
          </div>
        ),
      )}
    </div>
  )
}

function Score() {
  const overall = Math.round(sampleScore.reduce((a, s) => a + s.v, 0) / sampleScore.length)
  return (
    <div className="score">
      <div className="score-head">
        <span className="score-n display">{overall}</span>
        <span className="score-l mono">/ 100 · sample analysis</span>
      </div>
      <div className="score-rows">
        {sampleScore.map((s, i) => (
          <div className="score-row" key={s.k}>
            <span className="score-k mono">{s.k}</span>
            <span className="score-track">
              <motion.span
                className="score-fill"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: s.v / 100 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
            <span className="score-v mono">{s.v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProjectVisual({ kind }) {
  if (kind === 'arch') return <Architecture />
  if (kind === 'score') return <Score />
  return null
}
