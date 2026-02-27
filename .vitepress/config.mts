import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Lock & Logic',
  description: 'Project documentation for Lock & Logic',
  srcDir: 'docs',
  base: '/lockandlogic-docs/',

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/lockandlogic-docs/favicon.png' }],
  ],

  themeConfig: {
    siteTitle: 'Lock & Logic Docs',
    logo: '/logo.png',

    sidebar: [
      { text: '🧩 Features Overview', link: '/escape-room-features-client' },
      { text: '🔍 SEO Strategy', link: '/seo-strategy' },
      { text: '📢 Google Ads Strategy', link: '/google-ads-strategy' },
      { text: '📊 Bookeo vs Resova', link: '/bookeo-vs-resova' },
      { text: '🏆 Competitor Analysis', link: '/competitor-analysis' },
    ],

    search: {
      provider: 'local',
    },

    nav: [
      { text: 'Home', link: '/' },
    ],
  },
})
