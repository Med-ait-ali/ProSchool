import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If deploying to GitHub Pages at https://username.github.io/proschool/
// change base to '/proschool/' — for custom domain or Netlify keep '/'
export default defineConfig({
  plugins: [react()],
  base: '/proschool/',
})
