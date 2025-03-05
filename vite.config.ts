import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

const config = defineConfig({
  plugins: [
    sveltekit(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',
  },
})

export default config
