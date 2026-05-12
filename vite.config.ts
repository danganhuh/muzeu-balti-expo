import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * For GitHub Pages project sites, set at build time, e.g.:
 *   VITE_BASE_URL=/lab6/ npm run build
 * The included workflow sets this from the repository name.
 */
const base = process.env.VITE_BASE_URL ?? '/'

export default defineConfig({
  plugins: [react()],
  base,
})
