import { viteFaasJsServer } from '@faasjs/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  plugins: [
    react(),
    viteFaasJsServer(),
  ],
  test: {
    projects: [
      {
        extends: true,
        test: {
          include: ['src/**/*.test.ts'],
          environment: 'node',
          setupFiles: ['vitest.node.setup.ts'],
        },
      },
      {
        extends: true,
        test: {
          include: ['src/**/*.test.tsx'],
          environment: 'jsdom',
          setupFiles: ['vitest.jsdom.setup.ts'],
        },
      },
    ],
  },
})
