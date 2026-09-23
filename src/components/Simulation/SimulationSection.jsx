import { useMemo, useState } from 'react'
import { computeSimulationState } from '../../simulation/model'
import { BETA_EXPERIMENTAL, WATER_TEMP_C, Q_EXPERIMENTAL_MAX } from '../../simulation/constants'
import ControlsPanel from './ControlsPanel'
import OrificeVisualization from './OrificeVisualization'
import LiveReadout from './LiveReadout'
import ManometerPanel from './ManometerPanel'
import PressureProfileChart from './PressureProfileChart'
import CalibrationChart from './CalibrationChart'
import './SimulationSection.css'

export default function SimulationSection() {
  const [q, setQ] = useState(Q_EXPERIMENTAL_MAX)
  const [beta, setBeta] = useState(BETA_EXPERIMENTAL)
  const [tempC, setTempC] = useState(WATER_TEMP_C)

  const state = useMemo(() => computeSimulationState(q, beta, tempC), [q, beta, tempC])

  return (
    <section id="simulation" className="section simulation-section">
      <div className="container">
        <span className="eyebrow">Main feature</span>
        <h2 className="section-heading">Interactive Orifice-Meter Simulation</h2>
        <p className="section-lede">
          Drag Q and β to see the vena contracta move, the pressure field respond, and the
          discharge coefficient hold steady in the turbulent regime &mdash; exactly what
          2302008's calibration run demonstrated.
        </p>

        <div className="sim-layout">
          <div className="sim-col-controls">
            <ControlsPanel q={q} beta={beta} tempC={tempC} onChangeQ={setQ} onChangeBeta={setBeta} onChangeTempC={setTempC} />
            <ManometerPanel state={state} />
          </div>

          <div className="sim-col-main">
            <OrificeVisualization state={state} />
            <LiveReadout state={state} />
          </div>
        </div>

        <div className="sim-charts">
          <PressureProfileChart state={state} />
          <CalibrationChart state={state} />
        </div>
      </div>
    </section>
  )
}
