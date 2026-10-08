import { useState } from 'react'
import { profile } from '../data'
import Reveal from './Reveal'
import Heading from './Heading'
import Magnetic from './Magnetic'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact-card">
          <span className="contact-halo" aria-hidden="true" />
          <Reveal><span className="eyebrow">05 — Contact</span></Reveal>
          <Heading className="contact-h display" lines={[[{ t: "Let's build something" }], [{ t: 'worth shipping.', grad: true }]]} />
          <Reveal delay={0.1}>
            <p className="contact-lead">
              I'm looking for SDE and cloud engineering roles. If you're hiring — or just want
              to talk about what I've built — my inbox is open.
            </p>
          </Reveal>

          <Reveal delay={0.16} className="contact-actions">
            <Magnetic>
              <a className="btn btn-sun btn-lg" href={`mailto:${profile.email}`}>
                <span>Email me</span><span className="bi">→</span>
              </a>
            </Magnetic>
            <button className="copy mono" onClick={copy} aria-live="polite">
              {copied ? 'copied ✓' : profile.email}
            </button>
          </Reveal>

          <Reveal delay={0.22} className="contact-links">
            <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub <i>↗</i></a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn <i>↗</i></a>
            <a href={profile.links.leetcode} target="_blank" rel="noreferrer">LeetCode <i>↗</i></a>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
            <a href={profile.resume} download>Résumé <i>↓</i></a>
          </Reveal>
        </div>

        <footer className="footer">
          <span className="footer-name">{profile.name}</span>
          <span className="footer-note mono">Built with React &amp; Framer Motion · {new Date().getFullYear()}</span>
          <button className="footer-top mono" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top ↑
          </button>
        </footer>
      </div>
      <div className="wordmark display" aria-hidden="true">{profile.name}</div>
    </section>
  )
}
