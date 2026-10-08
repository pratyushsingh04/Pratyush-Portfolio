import { useEffect, useState } from 'react'
import { useInView } from '../hooks'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/_<>'

/** Text that decodes itself, left to right, the first time it scrolls into view. */
export default function Scramble({ text }) {
  const [ref, inView] = useInView({ threshold: 0.6 })
  const [out, setOut] = useState(text)

  useEffect(() => {
    if (!inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const id = setInterval(() => {
      frame++
      const solved = frame / 2
      if (solved >= text.length) { clearInterval(id); setOut(text); return }
      setOut([...text].map((c, i) => (c === ' ' || i < solved ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join(''))
    }, 34)
    return () => clearInterval(id)
  }, [inView, text])

  return <span ref={ref} aria-label={text}>{out}</span>
}
