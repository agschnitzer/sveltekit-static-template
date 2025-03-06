import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'

const config = defineConfig({
  plugins: [
    imagetools({
      defaultDirectives: new URLSearchParams({
        as: 'meta:src;width;height;format',
        format: 'avif',
      }),
    }),
    sveltekit(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',
  },
})

export default config
