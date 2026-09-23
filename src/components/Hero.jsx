import { EXPERIMENT_META } from '../simulation/constants'
import './Hero.css'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-badges">
          <img src="images/buet-logo.png" alt="BUET crest" className="hero-badge-logo" />
          <div className="hero-badge-che" aria-hidden="true">
            ChE
          </div>
        </div>

        <span className="eyebrow">{EXPERIMENT_META.courseName} &middot; {EXPERIMENT_META.courseCode}</span>
        <h1 className="hero-title">Calibration of Orifice Meter</h1>
        <p className="hero-sub">
          {EXPERIMENT_META.department}
          <br />
          {EXPERIMENT_META.university}
        </p>
        <p className="hero-desc">
          A sharp-edged concentric orifice meter accelerates a fluid through a restriction,
          converting static pressure into velocity. This interactive site rebuilds that
          experiment as a live model &mdash; adjust flow rate and orifice geometry and watch the
          vena contracta, pressure field, and discharge coefficient respond in real time.
        </p>

        <div className="hero-actions">
          <a href="#simulation" className="btn btn-primary">
            Explore Simulation
          </a>
          <a href="#poster" className="btn btn-ghost">
            View Poster
          </a>
        </div>

        <OrificeIllustration />
      </div>
    </section>
  )
}

function OrificeIllustration() {
  return (
    <div className="hero-illustration" role="img" aria-label="Animated schematic of fluid flowing through an orifice plate, accelerating and forming a vena contracta">
      <svg viewBox="0 0 760 220" className="hero-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="pipeFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#25b8e0" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#25b8e0" stopOpacity="0.05" />
          </linearGradient>
          <marker id="heroArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="var(--accent-soft)" />
          </marker>
        </defs>

        {/* pipe walls */}
        <path d="M20,40 H320 Q370,40 390,90 Q410,40 460,40 H740" fill="none" stroke="var(--border)" strokeWidth="3" />
        <path d="M20,180 H320 Q370,180 390,130 Q410,180 460,180 H740" fill="none" stroke="var(--border)" strokeWidth="3" />

        {/* fluid body */}
        <path
          d="M20,42 H320 Q368,42 388,90 Q408,42 460,42 H740 V178 H460 Q408,178 388,130 Q368,178 320,178 H20 Z"
          fill="url(#pipeFill)"
        />

        {/* orifice plate */}
        <rect x="378" y="40" width="8" height="55" fill="var(--bg-3)" stroke="var(--text-2)" strokeWidth="1.5" />
        <rect x="378" y="125" width="8" height="55" fill="var(--bg-3)" stroke="var(--text-2)" strokeWidth="1.5" />

        {/* streamlines */}
        {[55, 80, 105, 130, 155].map((y, i) => (
          <path
            key={y}
            className="hero-streamline"
            style={{ animationDelay: `${i * 0.18}s` }}
            d={`M40,${y} H320 Q368,${y} ${388 + (i - 2) * 2},${88 + (i - 2) * 10 + (110 - y) * 0.15} Q408,${88 + (i - 2) * 6} 460,${y} H720`}
            fill="none"
            stroke="var(--info)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 10"
          />
        ))}

        {/* vena contracta marker */}
        <ellipse cx="415" cy="110" rx="7" ry="34" fill="none" stroke="var(--accent-soft)" strokeWidth="1.5" strokeDasharray="3 4" />
        <text x="415" y="205" textAnchor="middle" className="hero-svg-label">
          vena contracta
        </text>

        <text x="120" y="205" textAnchor="middle" className="hero-svg-label">
          upstream
        </text>
        <text x="620" y="205" textAnchor="middle" className="hero-svg-label">
          downstream
        </text>

        <line x1="30" y1="20" x2="90" y2="20" stroke="var(--accent-soft)" strokeWidth="2" markerEnd="url(#heroArrow)" />
        <text x="60" y="14" textAnchor="middle" className="hero-svg-label">
          flow
        </text>
      </svg>
    </div>
  )
}
