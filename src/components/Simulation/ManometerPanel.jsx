import { useMemo } from 'react'
import './ManometerPanel.css'

const BASE_Y = 150
const MID_DROP = 40 // px the liquid drops toward the U-bend from each limb top
const MAX_SWING = 55 // max px one limb moves up/down for the largest realistic reading

export default function ManometerPanel({ state }) {
  const { manometerReading, deltaH } = state

  const swing = useMemo(() => {
    // Typical readings span roughly 0-40 cm across the slider ranges; scale
    // and clamp so the animation stays legible at both ends.
    const px = (manometerReading / 0.40) * MAX_SWING
    return Math.max(-MAX_SWING, Math.min(MAX_SWING, px))
  }, [manometerReading])

  const leftLevel = BASE_Y - swing // upstream tap: higher pressure -> liquid pushed down less... see note
  const rightLevel = BASE_Y + swing

  return (
    <div className="manometer card">
      <div className="manometer-head">
        <h3>Differential Manometer</h3>
        <span className="pill">CCl₄ indicating fluid</span>
      </div>

      <svg viewBox="0 0 260 220" className="manometer-svg" role="img" aria-label="U-tube differential manometer showing a liquid level difference proportional to the pressure head across the orifice">
        {/* tubes */}
        <path d="M60,20 V150 Q60,190 100,190 H160 Q200,190 200,150 V20" fill="none" stroke="var(--border)" strokeWidth="4" />

        {/* CCl4 liquid */}
        <path
          d={`M60,${leftLevel} V150 Q60,182 100,182 H160 Q200,182 200,150 V${rightLevel}`}
          fill="none"
          stroke="var(--warn)"
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* taps to pipe */}
        <line x1="60" y1="20" x2="60" y2="8" stroke="var(--text-2)" strokeWidth="2" />
        <line x1="200" y1="20" x2="200" y2="8" stroke="var(--text-2)" strokeWidth="2" />
        <text x="60" y="0" textAnchor="middle" className="manometer-label">P₁ tap</text>
        <text x="200" y="0" textAnchor="middle" className="manometer-label">P₂ tap</text>

        {/* reading bracket */}
        <line x1="228" y1={leftLevel} x2="238" y2={leftLevel} stroke="var(--accent-soft)" strokeWidth="1.5" />
        <line x1="228" y1={rightLevel} x2="238" y2={rightLevel} stroke="var(--accent-soft)" strokeWidth="1.5" />
        <line x1="233" y1={leftLevel} x2="233" y2={rightLevel} stroke="var(--accent-soft)" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="245" y={(leftLevel + rightLevel) / 2 + 4} className="manometer-label manometer-label-accent">R</text>
      </svg>

      <div className="manometer-readout">
        <div>
          <span>R (reading)</span>
          <strong>{(manometerReading * 100).toFixed(2)} cm</strong>
        </div>
        <div>
          <span>ΔH (head, water)</span>
          <strong>{deltaH.toFixed(4)} m</strong>
        </div>
      </div>
      <p className="manometer-note">
        R is computed from ΔH = R(ρ<sub>CCl₄</sub>/ρ<sub>water</sub> − 1), the same relation used
        to reduce the raw manometer readings in Appendix A of the report. The illustration is
        schematic, not to the apparatus's exact scale.
      </p>
    </div>
  )
}
