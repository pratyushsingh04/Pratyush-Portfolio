import { useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data'
import Reveal from './Reveal'
import Heading from './Heading'

const ICONS = {
  github: { fill: true, d: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' },
  linkedin: { fill: true, d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  leetcode: { fill: true, d: 'M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z' },
  mail: { d: 'M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11zM3.5 7l8.5 6 8.5-6' },
  phone: { d: 'M6.6 3h2.6l1.4 4.2-2 1.5a12.5 12.5 0 0 0 6.7 6.7l1.5-2L21 14.8v2.6A2.6 2.6 0 0 1 18.4 20 15.4 15.4 0 0 1 4 5.6 2.6 2.6 0 0 1 6.6 3z' },
  file: { d: 'M14 3H7.5A1.5 1.5 0 0 0 6 4.5v15A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5V7l-4-4zM14 3v4h4M12 11v6M9.5 14.5L12 17l2.5-2.5' },
}

const handle = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '').split('/').pop()

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }
const tile = {
  hidden: { opacity: 0, y: 34, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 170, damping: 16 } },
}
const logo = {
  hidden: { scale: 0, rotate: -120 },
  show: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 240, damping: 11, delay: 0.12 } },
}

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async (e) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const links = [
    { id: 'mail', icon: 'mail', label: 'Email', value: copied ? 'Copied to clipboard ✓' : profile.email, href: `mailto:${profile.email}`, onClick: copy, hint: 'copy' },
    { id: 'github', icon: 'github', label: 'GitHub', value: `@${handle(profile.links.github)}`, href: profile.links.github, ext: true },
    { id: 'linkedin', icon: 'linkedin', label: 'LinkedIn', value: 'Pratyush Singh', href: profile.links.linkedin, ext: true },
    { id: 'leetcode', icon: 'leetcode', label: 'LeetCode', value: `@${handle(profile.links.leetcode)}`, href: profile.links.leetcode, ext: true },
    { id: 'phone', icon: 'phone', label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, hint: 'call' },
    { id: 'resume', icon: 'file', label: 'Résumé', value: 'Download PDF', href: profile.resume, download: true, hint: '↓' },
  ]

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact-card">
          <span className="contact-halo" aria-hidden="true" />
          <Reveal><span className="eyebrow">01 — Contact</span></Reveal>
          <Heading className="contact-h display" lines={[[{ t: "Let's build something" }], [{ t: 'worth shipping.', grad: true }]]} />
          <Reveal delay={0.1}>
            <p className="contact-lead">
              I'm looking for SDE and cloud engineering roles. If you're hiring — or just want
              to talk about what I've built — reach me on any of these.
            </p>
          </Reveal>

          <motion.div className="links" variants={grid} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {links.map((l) => (
              <motion.a
                className={`lk lk-${l.id}`}
                key={l.id}
                href={l.href}
                variants={tile}
                onClick={l.onClick}
                {...(l.ext ? { target: '_blank', rel: 'noreferrer' } : {})}
                {...(l.download ? { download: true } : {})}
              >
                <motion.span className="lk-ic" variants={logo}>
                  <svg viewBox="0 0 24 24" aria-hidden="true" className={ICONS[l.icon].fill ? 'solid' : 'line'}>
                    <path d={ICONS[l.icon].d} />
                  </svg>
                </motion.span>
                <span className="lk-txt">
                  <span className="lk-k mono">{l.label}</span>
                  <span className="lk-v">{l.value}</span>
                </span>
                <span className="lk-go mono" aria-hidden="true">{l.ext ? '↗' : l.hint}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
