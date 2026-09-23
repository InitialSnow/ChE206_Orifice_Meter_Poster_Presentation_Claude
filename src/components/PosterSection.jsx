import { useRef } from 'react'
import './PosterSection.css'

const POSTER_URL = 'poster/placeholder-poster.pdf'

export default function PosterSection() {
  const frameRef = useRef(null)

  const goFullscreen = () => {
    const el = frameRef.current
    if (!el) return
    if (el.requestFullscreen) el.requestFullscreen()
    else window.open(POSTER_URL, '_blank', 'noopener')
  }

  return (
    <section id="poster" className="section poster-section">
      <div className="container">
        <span className="eyebrow">Digital poster</span>
        <h2 className="section-heading">The physical poster, viewable online</h2>
        <p className="section-lede">
          Print-poster preview, download, and full-screen viewing &mdash; the same document
          that will hang next to the QR code.
        </p>

        <div className="poster-card card">
          <div className="poster-placeholder-badge">
            <span className="pill pill-accent">Placeholder</span>
            <p>
              The final &ldquo;Calibration of Orifice Meter&rdquo; poster hasn&rsquo;t been
              exported yet. The preview below is a stand-in poster from a different ChE 206
              experiment (Reynolds Experiment) used only to demonstrate the viewer &mdash; swap
              <code> /public/poster/placeholder-poster.pdf</code> with the finished poster when
              it&rsquo;s ready.
            </p>
          </div>

          <div className="poster-frame-wrap" ref={frameRef}>
            <iframe title="Poster preview (placeholder)" src={`${POSTER_URL}#toolbar=1`} className="poster-frame" loading="lazy" />
          </div>

          <div className="poster-actions">
            <button className="btn btn-primary" onClick={goFullscreen}>
              Full-Screen View
            </button>
            <a className="btn btn-ghost" href={POSTER_URL} download>
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
