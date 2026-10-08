import { motion } from 'framer-motion'
import { skills } from '../data'
import Reveal, { parent, item } from './Reveal'
import Heading from './Heading'
import SpotlightCard from './SpotlightCard'

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <Reveal><span className="eyebrow">03 — Toolkit</span></Reveal>
        <Heading lines={[[{ t: 'What I build' }, { t: 'with.', grad: true }]]} />

        <div className="skills-grid">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={0.05 + i * 0.05}>
              <SpotlightCard className="skill-card">
                <span className="skill-k mono">{g.group}</span>
                <motion.ul className="skill-items" variants={parent} initial="hidden" whileInView="show" viewport={{ once: true }}>
                  {g.items.map((it) => (
                    <motion.li key={it} variants={item}>
                      <span className="skill-bullet" />
                      {it}
                    </motion.li>
                  ))}
                </motion.ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
