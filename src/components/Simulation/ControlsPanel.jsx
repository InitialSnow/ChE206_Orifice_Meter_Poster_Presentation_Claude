import {
  Q_SLIDER_MIN,
  Q_SLIDER_MAX,
  BETA_SLIDER_MIN,
  BETA_SLIDER_MAX,
  TEMP_SLIDER_MIN,
  TEMP_SLIDER_MAX,
} from '../../simulation/constants'
import './ControlsPanel.css'

function Slider({ label, unit, value, min, max, step, onChange, format, hint }) {
  return (
    <div className="control">
      <div className="control-head">
        <label htmlFor={label}>{label}</label>
        <span className="control-value">
          {format ? format(value) : value} <small>{unit}</small>
        </span>
      </div>
      <input
        id={label}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {hint && <p className="control-hint">{hint}</p>}
    </div>
  )
}

export default function ControlsPanel({ q, beta, tempC, onChangeQ, onChangeBeta, onChangeTempC }) {
  return (
    <div className="controls card">
      <h3 className="controls-title">Inputs</h3>

      <Slider
        label="Volumetric Flow Rate, Q"
        unit="L/s"
        value={q * 1000}
        min={Q_SLIDER_MIN * 1000}
        max={Q_SLIDER_MAX * 1000}
        step={0.01}
        onChange={(v) => onChangeQ(v / 1000)}
        format={(v) => v.toFixed(2)}
      />

      <Slider
        label="Diameter Ratio, β = d/D"
        unit=""
        value={beta}
        min={BETA_SLIDER_MIN}
        max={BETA_SLIDER_MAX}
        step={0.005}
        onChange={onChangeBeta}
        format={(v) => v.toFixed(3)}
        hint="2302008's apparatus used a fixed plate at β ≈ 0.484 (1 in orifice / 2 in Sch. 40 pipe) — that is the only geometry the calibration table below was measured at."
      />

      <Slider
        label="Water Temperature, T"
        unit="°C"
        value={tempC}
        min={TEMP_SLIDER_MIN}
        max={TEMP_SLIDER_MAX}
        step={0.5}
        onChange={onChangeTempC}
        format={(v) => v.toFixed(1)}
        hint="Drives density ρ(T) and viscosity μ(T) via standard correlations — the report itself only measured at 28 °C."
      />
    </div>
  )
}
