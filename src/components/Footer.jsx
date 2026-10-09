import { profile } from '../data'

export default function Footer() {
  return (
    <footer className="site-foot">
      <div className="container">
        <div className="footer">
          <span className="footer-name">{profile.name}</span>
          <span className="footer-note mono">Built with React &amp; Framer Motion · {new Date().getFullYear()}</span>
          <button className="footer-top mono" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top ↑
          </button>
        </div>
      </div>
      <div className="wordmark display" aria-hidden="true">{profile.name}</div>
    </footer>
  )
}
