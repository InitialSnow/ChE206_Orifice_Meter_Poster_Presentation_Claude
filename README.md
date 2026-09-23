# Calibration of Orifice Meter — ChE 206 Interactive Poster Site

Interactive digital extension of the ChE 206 poster "Calibration of Orifice Meter"
(Department of Chemical Engineering, BUET). Built with React + Vite for GitHub Pages.

## What's real vs. placeholder

- **Simulation constants, equations and the calibration table** are transcribed from the
  long report submitted by **Irfan Uddin Mazumder, Student ID 2302008** (the only report
  this site pulls data from). See `src/simulation/constants.js` for the source citation and
  `src/data/verification.js` for a numeric check against the report's own tabulated values.
- **The poster PDF** (`public/poster/placeholder-poster.pdf`) is a **placeholder** — the
  finished "Calibration of Orifice Meter" poster hadn't been exported yet, so a different
  ChE 206 poster (Reynolds Experiment) stands in for it. Replace that file with the real
  poster PDF when it's ready (keep the same filename, or update the path in
  `src/components/PosterSection.jsx`).
- **All nine participant `.docx` reports** are included under `public/reports/` exactly as
  submitted. Only 2302008's is used as a data source; the rest are provided purely as
  downloadable/viewable primary documents (see `src/data/reports.js`).
- The vena-contracta geometry, temperature correlations, and pressure-profile shape are
  clearly-labelled **visual/theoretical approximations**, not experimental measurements —
  see the in-app notes under the simulation and the `SIMULATION_REFERENCES` in
  `src/data/references.js`.

## Development

```bash
npm install
npm run dev
```

## Deploying to GitHub Pages

1. Push this folder to a new GitHub repository.
2. `vite.config.js` uses `base: './'`, so no config change is needed whether Pages serves
   this at the root of a user/org page or at a project subpath
   (`username.github.io/repo-name/`).
3. Either:
   - Run `npm run deploy` (uses `gh-pages` to publish `dist/` to the `gh-pages` branch), or
   - Add a GitHub Actions workflow that runs `npm run build` and deploys `dist/`.
4. In the repo's Settings → Pages, point Pages at the `gh-pages` branch (or the Actions
   deployment, if you used a workflow).
5. Generate a QR code pointing at the published URL and print it on the poster.

## Project structure

```text
src/
├── components/       UI sections (Hero, About, Poster, Reports, References, ...)
│   └── Simulation/    controls, SVG visualization, manometer, charts
├── simulation/
│   ├── constants.js  apparatus geometry + 2302008's experimental data table
│   ├── equations.js  the governing physics (continuity, Bernoulli, Reynolds, ...)
│   └── model.js       ties equations to live slider state
├── data/              reports.js, references.js, verification.js
└── styles/            global.css design tokens

public/
├── poster/placeholder-poster.pdf
├── reports/*.docx      all nine participant reports
└── images/buet-logo.png
```
