import './LiveReadout.css'

function Item({ label, value, unit, highlight }) {
  return (
    <div className={`readout-item ${highlight ? 'readout-item-highlight' : ''}`}>
      <span className="readout-label">{label}</span>
      <span className="readout-value">
        {value} <small>{unit}</small>
      </span>
    </div>
  )
}

export default function LiveReadout({ state }) {
  const {
    qActual,
    beta,
    pipeVelocity,
    orificeVelocity,
    deltaH,
    reynolds,
    coefficientOfOrifice,
    venaContractaDiameter,
    isTurbulent,
    tempC,
    density,
  } = state

  return (
    <div className="readout card">
      <div className="readout-headline">
        <h3>Live Values</h3>
        <span className={`pill ${isTurbulent ? 'pill-accent' : ''}`}>
          {isTurbulent ? 'Turbulent · Re > 4000' : 'Transitional / Laminar regime'}
        </span>
      </div>
      <div className="readout-grid">
        <Item label="Q" value={(qActual * 1000).toFixed(2)} unit="L/s" highlight />
        <Item label="β" value={beta.toFixed(3)} unit="" highlight />
        <Item label="V₁ (pipe)" value={pipeVelocity.toFixed(3)} unit="m/s" />
        <Item label="V₂ (orifice)" value={orificeVelocity.toFixed(3)} unit="m/s" />
        <Item label="ΔH" value={deltaH.toFixed(4)} unit="m H₂O" highlight />
        <Item label="Re" value={Math.round(reynolds).toLocaleString()} unit="" />
        <Item label="C₀ (calibrated)" value={coefficientOfOrifice.toFixed(3)} unit="" />
        <Item label="Vena contracta ⌀" value={(venaContractaDiameter * 1000).toFixed(2)} unit="mm" />
        <Item label="T" value={tempC.toFixed(1)} unit="°C" />
        <Item label="ρ (water)" value={density.toFixed(2)} unit="kg/m³" />
      </div>
      <p className="readout-footnote">
        C₀ is held at 0.772, the average of 2302008's eight measured coefficients (fully
        turbulent regime, where C₀ is essentially constant) — ΔH is then solved from Q using
        that calibration. V₁, V₂, Re and the vena-contracta size follow directly.
      </p>
    </div>
  )
}
