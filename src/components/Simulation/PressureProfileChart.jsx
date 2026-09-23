import { useMemo } from 'react'
import { pressureHeadProfile } from '../../simulation/model'
import './Charts.css'

const W = 640
const H = 260
const PAD_L = 52
const PAD_R = 16
const PAD_T = 18
const PAD_B = 34

export default function PressureProfileChart({ state }) {
  const points = useMemo(() => pressureHeadProfile(state), [state])

  const xMin = points[0].x
  const xMax = points[points.length - 1].x
  const yMin = Math.min(...points.map((p) => p.head)) * 1.15 - 0.001
  const yMax = 0.01

  const sx = (x) => PAD_L + ((x - xMin) / (xMax - xMin)) * (W - PAD_L - PAD_R)
  const sy = (y) => PAD_T + (1 - (y - yMin) / (yMax - yMin)) * (H - PAD_T - PAD_B)

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${sx(p.x).toFixed(1)} ${sy(p.head).toFixed(1)}`).join(' ')
  const areaPath = `${path} L ${sx(xMax).toFixed(1)} ${sy(0).toFixed(1)} L ${sx(xMin).toFixed(1)} ${sy(0).toFixed(1)} Z`

  const plateX = sx(0)
  const yTicks = [yMax, (yMax + yMin) / 2, yMin]

  return (
    <div className="chart card">
      <div className="chart-head">
        <h3>Pressure Head vs Axial Position</h3>
        <span className="pill">live</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" role="img" aria-label="Line chart of pressure head against axial position along the pipe, dropping sharply at the orifice plate and partially recovering downstream">
        {yTicks.map((t, i) => (
          <g key={i}>
            <line x1={PAD_L} x2={W - PAD_R} y1={sy(t)} y2={sy(t)} stroke="var(--border-soft)" strokeWidth="1" />
            <text x={PAD_L - 8} y={sy(t) + 4} textAnchor="end" className="chart-tick">{t.toFixed(3)}</text>
          </g>
        ))}

        <line x1={plateX} x2={plateX} y1={PAD_T} y2={H - PAD_B} stroke="var(--accent)" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x={plateX} y={PAD_T - 4} textAnchor="middle" className="chart-tick chart-tick-accent">plate</text>

        <path d={areaPath} fill="var(--info)" fillOpacity="0.12" stroke="none" />
        <path d={path} fill="none" stroke="var(--info)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        <line x1={PAD_L} x2={W - PAD_R} y1={H - PAD_B} y2={H - PAD_B} stroke="var(--border)" strokeWidth="1" />
        <text x={(PAD_L + W - PAD_R) / 2} y={H - 6} textAnchor="middle" className="chart-tick">axial position, x / D (pipe diameters)</text>
      </svg>
      <p className="chart-note">
        Qualitative model: constant upstream head, a smoothstep drop through the vena contracta,
        then partial recovery downstream (unrecovered fraction = C₀² of ΔH, per Section 2.2 of
        the report). A visual approximation, not a CFD result.
      </p>
    </div>
  )
}
