import './AboutExperiment.css'

const TOPICS = [
  {
    title: 'What is an orifice meter?',
    body: 'A differential-pressure flowmeter: a thin plate with a sharp, concentric circular opening is installed perpendicular to the flow inside a pipe. Forcing fluid through the reduced opening is what creates a measurable pressure drop.',
  },
  {
    title: 'Principle of operation',
    body: 'Continuity requires velocity to rise as area falls; Bernoulli’s equation then requires static pressure to fall as velocity rises. The pressure drop across the plate is therefore a direct, repeatable proxy for flow rate.',
  },
  {
    title: 'Pressure difference across the orifice',
    body: 'Pressure taps upstream and downstream of the plate feed a differential U-tube manometer. In this experiment the indicating fluid was carbon tetrachloride, and the reading was converted to an equivalent head of water.',
  },
  {
    title: 'Vena contracta',
    body: 'Streamlines cannot turn the sharp edge of the orifice instantly, so the jet keeps contracting past the physical opening until it reaches a minimum area — the vena contracta — slightly downstream of the plate.',
  },
  {
    title: 'Purpose of calibration',
    body: 'Ideal Bernoulli flow assumes no friction and no contraction. Real discharge is always lower, so the meter must be calibrated against measured volumetric flow to determine how much lower, across a range of flow rates.',
  },
  {
    title: 'Coefficient of discharge',
    body: 'C₀ = Q_experimental / Q_theoretical folds every real-flow loss — friction, turbulence, jet contraction — into one empirical number. Once known for an installed meter, it turns a pressure reading directly into a flow rate.',
  },
  {
    title: 'Industrial applications',
    body: 'Because it has no moving parts, is cheap to fabricate, and needs only a pressure-tap connection, the orifice meter is a standard flow-measurement device across oil & gas pipelines, water networks, and chemical process plants.',
  },
]

export default function AboutExperiment() {
  return (
    <section id="experiment" className="section about">
      <div className="container">
        <span className="eyebrow">About the experiment</span>
        <h2 className="section-heading">Reading a pressure drop as a flow rate</h2>
        <p className="section-lede">
          Seven ideas carry the whole experiment, from the plate geometry to the number that
          calibrates it.
        </p>

        <div className="about-grid">
          {TOPICS.map((t, i) => (
            <div className="about-card card" key={t.title}>
              <span className="about-index">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="about-card-title">{t.title}</h3>
              <p>{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
