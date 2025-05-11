import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteFaasJsServer } from '@faasjs/vite'

export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  plugins: [
    react(),
    viteFaasJsServer({
      // base: '/pages',
    }),
  ],
})
