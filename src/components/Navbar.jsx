import { useEffect, useState } from 'react'
import './Navbar.css'

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#experiment', label: 'Experiment' },
  { href: '#simulation', label: 'Simulation' },
  { href: '#poster', label: 'Poster' },
  { href: '#reports', label: 'Reports' },
  { href: '#references', label: 'References' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-inner container">
          <a href="#home" className="navbar-brand" onClick={() => setOpen(false)}>
            <img src="images/buet-logo.png" alt="BUET" className="navbar-logo" />
            <span className="navbar-brand-text">
              <strong>ChE 206</strong>
              <small>Orifice Meter</small>
            </span>
          </a>

          <nav className="navbar-links" aria-label="Primary">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <button
            className={`navbar-toggle ${open ? 'is-open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Rendered outside <header> deliberately: the header's backdrop-filter
          establishes a containing block for position:fixed descendants,
          which would collapse this panel to the header's own height. */}
      <nav className={`navbar-mobile ${open ? 'is-open' : ''}`} aria-label="Mobile">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </nav>
    </>
  )
}
