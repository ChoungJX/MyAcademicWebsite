// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://me.rabbitravel.xyz',
  // Build into out/ so the deploy routine stays the same: upload out/, then purge the Cloudflare cache.
  outDir: './out',
  integrations: [react()],
});
