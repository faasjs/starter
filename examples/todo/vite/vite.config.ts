import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  root: `${__dirname}/../src`,
  base: '/examples/todo/vite/',
  plugins: [react()],
  build: {
    outDir: `${__dirname}/dist`,
  }
})
