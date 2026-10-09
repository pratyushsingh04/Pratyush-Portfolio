import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data'

/** A short, plain intro: the name, a hairline that fills, then the page. */
export default function Loader({ onDone }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const id = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onDone?.(), reduced ? 0 : 250)
    }, reduced ? 0 : 1100)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="intro" exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}>
          <motion.span
            className="intro-name display"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {profile.name}
          </motion.span>
          <span className="intro-line"><i /></span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
