import { useMemo } from 'react'
import { PIPE_DIAMETER_M } from '../../simulation/constants'
import './OrificeVisualization.css'

const VIEW_W = 900
const VIEW_H = 250
const PIPE_LEFT = 30
const PIPE_RIGHT = 870
const CENTER_Y = 115
const HALF_H = 72
const PLATE_X = 470
const PLATE_THICKNESS = 12
const SCALE_PX_PER_M = (2 * HALF_H) / PIPE_DIAMETER_M

const STREAMLINE_OFFSETS = [-0.86, -0.56, -0.28, 0, 0.28, 0.56, 0.86].map((f) => f * HALF_H)

function buildStreamlinePath(baseline, vcX, vcHalfPx) {
  const yBase = CENTER_Y + baseline
  const contractStartX = PLATE_X - 95
  const targetFrac = Math.max(-1, Math.min(1, baseline / (HALF_H - 6)))
  const yAtVc = CENTER_Y + targetFrac * Math.max(vcHalfPx - 3, 3)
  const reExpandEndX = Math.min(vcX + 210, PIPE_RIGHT - 40)
  return [
    `M ${PIPE_LEFT} ${yBase}`,
    `L ${contractStartX} ${yBase}`,
    `C ${contractStartX + 45} ${yBase}, ${PLATE_X - 6} ${yAtVc}, ${vcX} ${yAtVc}`,
    `C ${vcX + 95} ${yAtVc}, ${reExpandEndX - 45} ${yBase}, ${reExpandEndX} ${yBase}`,
    `L ${PIPE_RIGHT} ${yBase}`,
  ].join(' ')
}

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v))
}

export default function OrificeVisualization({ state }) {
  const { beta, venaContractaDiameter, venaContractaDistanceFromPlate, pipeVelocity, isTurbulent } = state

  const geometry = useMemo(() => {
    const gapHalfPx = clamp(HALF_H * beta, 10, HALF_H - 6)
    const vcX = clamp(PLATE_X + venaContractaDistanceFromPlate * SCALE_PX_PER_M, PLATE_X + 30, PIPE_RIGHT - 170)
    const vcHalfPx = clamp((venaContractaDiameter / 2) * SCALE_PX_PER_M, 6, gapHalfPx - 2)
    const paths = STREAMLINE_OFFSETS.map((offset, i) => ({
      id: `sl-${i}`,
      d: buildStreamlinePath(offset, vcX, vcHalfPx),
    }))
    return { gapHalfPx, vcX, vcHalfPx, paths }
  }, [beta, venaContractaDiameter, venaContractaDistanceFromPlate])

  // Reference velocity ~0.27 m/s sits mid-range of the tested flow rates;
  // duration scales inversely with pipe velocity so faster flow -> faster particles.
  const duration = clamp(3.0 * (0.27 / Math.max(pipeVelocity, 0.02)), 0.9, 6)
  const durationStr = `${duration.toFixed(2)}s`

  return (
    <div className="orifice-viz card">
      <div className="orifice-viz-head">
        <h3>Interactive Orifice-Meter Cross-Section</h3>
        <span className="pill">live geometry &middot; β = {beta.toFixed(3)}</span>
      </div>

      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="orifice-svg" role="img" aria-label="Cross-section of fluid flowing through a variable orifice plate, showing streamline contraction to a vena contracta">
        <defs>
          <linearGradient id="fluidFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#25b8e0" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#25b8e0" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* pipe fill */}
        <rect x={PIPE_LEFT} y={CENTER_Y - HALF_H} width={PIPE_RIGHT - PIPE_LEFT} height={HALF_H * 2} fill="url(#fluidFill)" />

        {/* pipe walls */}
        <line x1={PIPE_LEFT} y1={CENTER_Y - HALF_H} x2={PIPE_RIGHT} y2={CENTER_Y - HALF_H} stroke="var(--border)" strokeWidth="3" />
        <line x1={PIPE_LEFT} y1={CENTER_Y + HALF_H} x2={PIPE_RIGHT} y2={CENTER_Y + HALF_H} stroke="var(--border)" strokeWidth="3" />

        {/* streamlines + traveling particles */}
        {geometry.paths.map((p, i) => (
          <g key={p.id}>
            <path id={p.id} d={p.d} fill="none" stroke="var(--info)" strokeOpacity="0.28" strokeWidth="1.5" />
            {[0, 1, 2].map((n) => (
              <circle key={n} r="3.4" fill="var(--info)">
                <animateMotion
                  dur={durationStr}
                  begin={`${-(i * 0.11 + n * (duration / 3)).toFixed(2)}s`}
                  repeatCount="indefinite"
                  keyPoints="0;0.40;0.60;1"
                  keyTimes="0;0.45;0.55;1"
                  calcMode="linear"
                >
                  <mpath href={`#${p.id}`} />
                </animateMotion>
              </circle>
            ))}
          </g>
        ))}

        {/* orifice plate */}
        <rect x={PLATE_X} y={CENTER_Y - HALF_H} width={PLATE_THICKNESS} height={HALF_H - geometry.gapHalfPx} fill="var(--bg-3)" stroke="var(--text-2)" strokeWidth="1.5" />
        <rect x={PLATE_X} y={CENTER_Y + geometry.gapHalfPx} width={PLATE_THICKNESS} height={HALF_H - geometry.gapHalfPx} fill="var(--bg-3)" stroke="var(--text-2)" strokeWidth="1.5" />

        {/* recirculation eddies just downstream of the plate corners (illustrative) */}
        {[-1, 1].map((sign) => (
          <g key={sign} transform={`translate(${PLATE_X + 34}, ${CENTER_Y + sign * (HALF_H - 12)})`}>
            <g className="orifice-eddy">
              <path d="M0,0 a10,10 0 1,1 -0.1,0" fill="none" stroke="var(--warn)" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="3 3" />
            </g>
          </g>
        ))}

        {/* vena contracta marker */}
        <line x1={geometry.vcX} y1={CENTER_Y - geometry.vcHalfPx} x2={geometry.vcX} y2={CENTER_Y + geometry.vcHalfPx} stroke="var(--accent-soft)" strokeWidth="1.5" strokeDasharray="4 4" />
        <text x={geometry.vcX} y={CENTER_Y - HALF_H - 10} textAnchor="middle" className="orifice-svg-label orifice-svg-label-accent">
          vena contracta
        </text>

        {/* pressure taps */}
        <line x1={PLATE_X - 55} y1={CENTER_Y - HALF_H} x2={PLATE_X - 55} y2={CENTER_Y - HALF_H - 16} stroke="var(--text-2)" strokeWidth="1.5" />
        <text x={PLATE_X - 55} y={CENTER_Y - HALF_H - 22} textAnchor="middle" className="orifice-svg-label">P₁</text>
        <line x1={geometry.vcX} y1={CENTER_Y - HALF_H} x2={geometry.vcX} y2={CENTER_Y - HALF_H - 16} stroke="var(--text-2)" strokeWidth="1.5" />
        <text x={geometry.vcX} y={CENTER_Y - HALF_H - 34} textAnchor="middle" className="orifice-svg-label">P₂</text>

        <text x={130} y={CENTER_Y + HALF_H + 26} textAnchor="middle" className="orifice-svg-label">upstream pipe</text>
        <text x={PLATE_X} y={CENTER_Y + HALF_H + 26} textAnchor="middle" className="orifice-svg-label">orifice plate</text>
        <text x={760} y={CENTER_Y + HALF_H + 26} textAnchor="middle" className="orifice-svg-label">downstream pipe</text>

        <g transform={`translate(${PIPE_LEFT + 10}, ${CENTER_Y - HALF_H - 26})`}>
          <line x1="0" y1="0" x2="46" y2="0" stroke="var(--accent-soft)" strokeWidth="2" markerEnd="url(#arrowHead)" />
        </g>
        <defs>
          <marker id="arrowHead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="var(--accent-soft)" />
          </marker>
        </defs>
        <text x={PIPE_LEFT + 33} y={CENTER_Y - HALF_H - 32} textAnchor="middle" className="orifice-svg-label">flow</text>
      </svg>

      <p className="orifice-viz-note">
        {isTurbulent
          ? 'Flow is fully turbulent (Re > 4000): the discharge coefficient stays essentially constant, matching 2302008\'s finding.'
          : 'Below Re ≈ 4000 the discharge coefficient would begin to drift with Reynolds number — outside the fully-turbulent range the report calibrated.'}{' '}
        Vena-contracta size and position are drawn from a typical contraction coefficient
        (C<sub>c</sub> ≈ 0.62) — a visual approximation, not a measurement from this experiment.
      </p>
    </div>
  )
}
