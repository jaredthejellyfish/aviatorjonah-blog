import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  prefetch: true,
  site: process.env.CI ? 'https://aviatorjonah.com' : 'http://localhost:4321',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
})
