import { EXPERIMENT_META } from '../simulation/constants'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-title">{EXPERIMENT_META.title}</p>
          <p className="footer-sub">
            {EXPERIMENT_META.courseCode} &middot; {EXPERIMENT_META.department},{' '}
            {EXPERIMENT_META.university}
          </p>
        </div>
        <p className="footer-note">
          Interactive digital extension of the poster &mdash; built to accompany the printed
          QR code.
        </p>
      </div>
    </footer>
  )
}
