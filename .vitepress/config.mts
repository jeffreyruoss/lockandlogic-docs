import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Lock & Logic',
  description: 'Project documentation for Lock & Logic',
  srcDir: 'docs',
  base: '/lockandlogic-docs/',
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/lockandlogic-docs/favicon.png' }],
  ],

  themeConfig: {
    siteTitle: 'Lock & Logic Docs',
    logo: '/logo.png',

    sidebar: [
      { text: '📋 Project Proposal', link: '/proposal' },
      { text: '🧩 Features Overview', link: '/escape-room-features-client' },
      { text: '🔍 SEO Strategy', link: '/seo-strategy' },
      { text: '📢 Google Ads Strategy', link: '/google-ads-strategy' },
      { text: '📊 Bookeo vs Resova', link: '/bookeo-vs-resova' },
      { text: '🏆 Competitor Analysis', link: '/competitor-analysis' },
      { text: '🎮 Game Master Software', link: '/game-master-software' },
      { text: '🛠️ Houdini MC Setup Guide', link: '/houdini-mc-setup' },
      { text: '📘 Facebook Page Text', link: '/facebook-page' },
      { text: '📬 Forms System', link: '/forms-system' },
      { text: '🎁 Additional Work', link: '/extras' },
    ],

    search: {
      provider: 'local',
    },

    nav: [
      { text: 'Home', link: '/' },
    ],
  },
})
