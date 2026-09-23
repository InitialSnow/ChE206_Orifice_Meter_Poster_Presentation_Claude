import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base: every built asset reference resolves against the page's own
// URL, so the same build works unmodified whether it's served from a GitHub
// Pages project URL (username.github.io/repo-name/), a user/org root page,
// or opened directly as a local file.
export default defineConfig({
  plugins: [react()],
  base: './',
})
