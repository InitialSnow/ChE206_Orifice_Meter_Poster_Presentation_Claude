import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // This repository is deployed at a project-site subpath on GitHub Pages.
  // Use an explicit base so generated JS/CSS URLs cannot resolve from the domain root.
  base: '/ChE206_Orifice_Meter_Poster_Presentation_Claude/',
})
