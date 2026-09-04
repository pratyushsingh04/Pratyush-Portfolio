import { useState } from 'react'
import './App.css'

import GlowCursor from './components/GlowCursor'
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
    <>
      <div className="aurora" aria-hidden="true">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <span className="blob blob-3" />
      </div>
      <div className="aurora-veil" />
      <div className="grain" />

      <GlowCursor />
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
    </>
  )
}
