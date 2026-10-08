import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import './App.css'

import Loader from './components/Loader'
import Cursor from './components/Cursor'
import CommandPalette from './components/CommandPalette'
import ScrollBand from './components/ScrollBand'
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
      <Cursor />
      <Loader onDone={() => setBooted(true)} />

      {booted && (
        <>
          <Nav />
          <CommandPalette />
          <main>
            <Hero />
            <About />
            <ScrollBand text="Build · Ship · Scale ·" />
            <Work />
            <Skills />
            <Credentials />
            <ScrollBand text="Let’s talk ·" reverse />
            <Contact />
          </main>
        </>
      )}
    </MotionConfig>
  )
}
