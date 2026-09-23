import { useState } from 'react'
import { PARTICIPANT_REPORTS } from '../data/reports'
import './ReportsSection.css'

function absoluteReportUrl(file) {
  return new URL(`reports/${file}`, document.baseURI).href
}

function officeViewerUrl(file) {
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absoluteReportUrl(file))}`
}

export default function ReportsSection() {
  const [openId, setOpenId] = useState(null)
  const open = PARTICIPANT_REPORTS.find((r) => r.id === openId)

  return (
    <section id="reports" className="section reports-section">
      <div className="container">
        <span className="eyebrow">Lab reports</span>
        <h2 className="section-heading">All nine participant reports</h2>
        <p className="section-lede">
          Original long reports for Experiment 05, as submitted. Only{' '}
          <strong>2302008&rsquo;s report</strong> supplies the data, constants, and equations
          behind the simulation above &mdash; the rest are provided here as primary documents,
          untouched.
        </p>

        <div className="reports-grid">
          {PARTICIPANT_REPORTS.map((r) => (
            <div key={r.id} className={`report-card card ${r.isPrimarySource ? 'report-card-primary' : ''}`}>
              {r.isPrimarySource && <span className="pill pill-accent report-card-flag">Primary data source</span>}
              <h3 className="report-card-name">{r.name}</h3>
              <p className="report-card-id">ID {r.id}</p>
              <div className="report-card-actions">
                <button className="btn btn-ghost btn-sm" onClick={() => setOpenId(r.id)}>
                  View
                </button>
                <a className="btn btn-ghost btn-sm" href={`reports/${r.file}`} download>
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {open && (
        <div className="report-modal" role="dialog" aria-modal="true" aria-label={`Preview of ${open.name}'s report`}>
          <div className="report-modal-backdrop" onClick={() => setOpenId(null)} />
          <div className="report-modal-panel">
            <div className="report-modal-head">
              <span>{open.name} &middot; {open.id}</span>
              <div className="report-modal-actions">
                <a className="btn btn-ghost btn-sm" href={`reports/${open.file}`} download>Download</a>
                <button className="btn btn-primary btn-sm" onClick={() => setOpenId(null)}>Close</button>
              </div>
            </div>
            <iframe title={`${open.name} report preview`} src={officeViewerUrl(open.file)} className="report-modal-frame" loading="lazy" />
            <p className="report-modal-note">
              Preview requires this site to be reachable at a public URL (it works once deployed
              to GitHub Pages; on localhost, use Download instead).
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
