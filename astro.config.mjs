// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.pooltidal.com',

  prefetch: {
    prefetchAll: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      // /thank-you is a post-submission confirmation page, not content —
      // noindex'd in Layout.astro and excluded here so it never shows up
      // as a landing page in search results.
      filter: (page) => !page.endsWith('/thank-you/'),
    }),
  ],
});
