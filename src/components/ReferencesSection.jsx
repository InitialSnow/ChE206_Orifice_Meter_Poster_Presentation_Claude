import { useState } from 'react'
import { REFERENCES, SIMULATION_REFERENCES } from '../data/references'
import './ReferencesSection.css'

function RefCard({ r }) {
  const [expanded, setExpanded] = useState(false)
  const hasExtra = Boolean(r.note || r.doi || r.url)

  return (
    <div className={`ref-card card ${r.placeholder ? 'ref-card-placeholder' : ''}`}>
      <div className="ref-card-main">
        <span className="ref-index">[{r.id}]</span>
        <div>
          <p className="ref-title">{r.title}</p>
          <p className="ref-meta">
            {r.authors} &middot; {r.source} &middot; {r.year}
          </p>
        </div>
        {r.placeholder && <span className="pill pill-accent">Placeholder</span>}
      </div>

      {hasExtra && (
        <button className="ref-toggle" onClick={() => setExpanded((v) => !v)}>
          {expanded ? 'Hide details' : 'Show details'}
        </button>
      )}

      {expanded && (
        <div className="ref-details">
          {r.doi && (
            <p>
              DOI:{' '}
              <a href={`https://doi.org/${r.doi}`} target="_blank" rel="noreferrer">
                {r.doi}
              </a>
            </p>
          )}
          {r.url && (
            <p>
              URL:{' '}
              <a href={r.url} target="_blank" rel="noreferrer">
                {r.url}
              </a>
            </p>
          )}
          {r.accessed && <p>Accessed: {r.accessed}</p>}
          {r.note && <p className="ref-note">{r.note}</p>}
        </div>
      )}
    </div>
  )
}

export default function ReferencesSection() {
  return (
    <section id="references" className="section references-section">
      <div className="container">
        <span className="eyebrow">References</span>
        <h2 className="section-heading">Cited in 2302008&rsquo;s report</h2>
        <p className="section-lede">
          Reproduced exactly as listed in the source report&rsquo;s Reference section.
        </p>

        <div className="ref-list">
          {REFERENCES.map((r) => (
            <RefCard key={r.id} r={r} />
          ))}
        </div>

        <h3 className="ref-subheading">Additional references used for this simulation</h3>
        <p className="section-lede">
          These support the interactive tool&rsquo;s teaching approximations (vena-contracta
          geometry, temperature correlations) and are not part of the original report&rsquo;s
          citation list.
        </p>
        <div className="ref-list">
          {SIMULATION_REFERENCES.map((r) => (
            <RefCard key={r.id} r={r} />
          ))}
        </div>
      </div>
    </section>
  )
}
