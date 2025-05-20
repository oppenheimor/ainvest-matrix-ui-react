import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// import { componentTagger } from 'lovable-tagger'

// https://vite.dev/config/
export default defineConfig(({mode}) => ({
  // plugins: [react(), mode === 'development' && componentTagger()].filter(Boolean),
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'packages'),
    }
  }
}))
