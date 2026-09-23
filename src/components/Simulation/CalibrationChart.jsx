import { useMemo } from 'react'
import { EXPERIMENTAL_DATA, CD_AVERAGE, PIPE_DIAMETER_M } from '../../simulation/constants'
import { deltaHFromFlowRate, areaFromDiameter } from '../../simulation/equations'
import './Charts.css'

const W = 640
const H = 260
const PAD_L = 56
const PAD_R = 16
const PAD_T = 18
const PAD_B = 40

export default function CalibrationChart({ state }) {
  const { qActual, deltaH, beta } = state

  const orificeArea = areaFromDiameter(beta * PIPE_DIAMETER_M)

  const curve = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 40; i++) {
      const q = 1.5e-4 + (9.5e-4 - 1.5e-4) * (i / 40)
      pts.push({ q, dh: deltaHFromFlowRate(q, CD_AVERAGE, orificeArea, beta) })
    }
    return pts
  }, [beta, orificeArea])

  const qMax = 9.5e-4
  const dhMax = Math.max(...curve.map((p) => p.dh), ...EXPERIMENTAL_DATA.map((d) => d.deltaH), deltaH) * 1.1

  const sx = (q) => PAD_L + (q / qMax) * (W - PAD_L - PAD_R)
  const sy = (dh) => PAD_T + (1 - dh / dhMax) * (H - PAD_T - PAD_B)

  const curvePath = curve.map((p, i) => `${i === 0 ? 'M' : 'L'} ${sx(p.q).toFixed(1)} ${sy(p.dh).toFixed(1)}`).join(' ')

  const xTicks = [2, 4, 6, 8].map((v) => v * 1e-4)
  const yTicks = [0, dhMax * 0.33, dhMax * 0.66, dhMax]

  return (
    <div className="chart card">
      <div className="chart-head">
        <h3>ΔH vs Q — Calibration Curve</h3>
        <span className="pill">2302008's data</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" role="img" aria-label="Scatter plot of the eight measured pressure-head/flow-rate pairs from the report, overlaid with the theoretical calibration curve and the current simulation state">
        {yTicks.map((t, i) => (
          <line key={i} x1={PAD_L} x2={W - PAD_R} y1={sy(t)} y2={sy(t)} stroke="var(--border-soft)" strokeWidth="1" />
        ))}
        {yTicks.map((t, i) => (
          <text key={i} x={PAD_L - 8} y={sy(t) + 4} textAnchor="end" className="chart-tick">{t.toFixed(3)}</text>
        ))}
        {xTicks.map((t, i) => (
          <text key={i} x={sx(t)} y={H - PAD_B + 18} textAnchor="middle" className="chart-tick">{(t * 1000).toFixed(1)}</text>
        ))}

        <line x1={PAD_L} x2={W - PAD_R} y1={H - PAD_B} y2={H - PAD_B} stroke="var(--border)" strokeWidth="1" />
        <line x1={PAD_L} x2={PAD_L} y1={PAD_T} y2={H - PAD_B} stroke="var(--border)" strokeWidth="1" />

        {/* theoretical/calibrated curve at current beta */}
        <path d={curvePath} fill="none" stroke="var(--info)" strokeWidth="2" strokeDasharray="0" />

        {/* experimental data points (fixed beta = 0.484, the apparatus tested) */}
        {EXPERIMENTAL_DATA.map((d) => (
          <circle key={d.obs} cx={sx(d.qExp)} cy={sy(d.deltaH)} r="4.5" fill="var(--ok)" stroke="var(--bg-1)" strokeWidth="1.5" />
        ))}

        {/* live marker */}
        <circle cx={sx(qActual)} cy={sy(deltaH)} r="6.5" fill="var(--accent)" stroke="#fff8f6" strokeWidth="2" />

        <text x={(PAD_L + W - PAD_R) / 2} y={H - 6} textAnchor="middle" className="chart-tick">Q (L/s)</text>
      </svg>
      <div className="chart-legend">
        <span><i className="dot" style={{ background: 'var(--ok)' }} /> measured (β ≈ 0.484)</span>
        <span><i className="dot" style={{ background: 'var(--info)' }} /> calibrated curve at current β</span>
        <span><i className="dot" style={{ background: 'var(--accent)' }} /> current simulation state</span>
      </div>
      <p className="chart-note">
        The green points are the eight observations actually measured by 2302008 at the
        apparatus's fixed β ≈ 0.484. The blue curve applies the same average C₀ = 0.772 at
        whatever β the slider is currently set to — it is the calibration model extrapolated,
        not new data.
      </p>
    </div>
  )
}
