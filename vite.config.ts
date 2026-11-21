import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import { FAQS } from './src/data/content';

/** Writes the FAQ as FAQPage structured data into index.html at build time (SEO). */
function faqJsonLd(): Plugin {
  return {
    name: 'aice-faq-jsonld',
    transformIndexHtml(html) {
      const data = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.flatMap((g) =>
          g.items.map((it) => ({
            '@type': 'Question',
            name: it.q,
            acceptedAnswer: { '@type': 'Answer', text: it.a },
          })),
        ),
      };
      const json = JSON.stringify(data).replace(/</g, '\\u003c');
      return html.replace('</head>', `<script type="application/ld+json">${json}</script>\n  </head>`);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), faqJsonLd()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
