import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import './App.css'

import Loader from './components/Loader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Skills from './components/Skills'
import Credentials from './components/Credentials'
import Contact from './components/Contact'

export default function App() {
  const [booted, setBooted] = useState(false)

  return (
    <MotionConfig reducedMotion="user">
      <Loader onDone={() => setBooted(true)} />

      {booted && (
        <>
          <Nav />
          <main>
            <Hero />
            <About />
            <Work />
            <Skills />
            <Credentials />
            <Contact />
          </main>
        </>
      )}
    </MotionConfig>
  )
}
