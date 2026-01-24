import { join } from 'node:path'
import { viteFaasJsServer } from '@faasjs/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  plugins: [
    react(),
    viteFaasJsServer({
      root: join(__dirname, 'src'),
    }),
  ],
  test: {
    setupFiles: ['./vitest.setup.ts'],
  },
})
