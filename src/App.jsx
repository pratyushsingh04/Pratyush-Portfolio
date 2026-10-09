import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import './App.css'

import Loader from './components/Loader'
import CommandPalette from './components/CommandPalette'
import IntroCard from './components/IntroCard'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Skills from './components/Skills'
import Credentials from './components/Credentials'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [booted, setBooted] = useState(false)

  return (
    <MotionConfig reducedMotion="user">
      <Loader onDone={() => setBooted(true)} />

      {booted && (
        <>
          <Nav />
          <CommandPalette />
          <IntroCard />
          <main>
            <Hero />
            <Contact />
            <Work />
            <About />
            <Skills />
            <Credentials />
          </main>
          <Footer />
        </>
      )}
    </MotionConfig>
  )
}
