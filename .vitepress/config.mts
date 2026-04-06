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
      { text: '🎨 Branding Style Guide', link: '/brand-style-guide' },
      { text: '📣 Marketing Examples', link: '/marketing-examples' },
      { text: '📬 Forms System', link: '/forms-system' },
      { text: '🌐 Website Hosting', link: '/hosting' },
      { text: '📧 Email Opt-In Campaign', link: '/email-opt-in-campaign' },
      { text: '📅 Booking Flow Checklist', link: '/booking-flow' },
      { text: '🎟️ Return Visit Discount', link: '/return-visit-discount' },
      { text: '🔗 Bookeo API AI Integration', link: '/bookeo-api' },
      { text: '📈 Google Analytics AI', link: '/google-analytics-ai' },
      { text: '📱 QR Code Campaigns', link: '/qr-campaigns' },
      { text: '🕐 Room Schedule', link: '/room-schedule' },
      { text: '📍 Google Business Verification', link: '/google-business-verification' },
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
