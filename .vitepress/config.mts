import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Lock & Logic',
  description: 'Project documentation for Lock & Logic',
  srcDir: 'docs',
  base: '/lockandlogic-docs/',
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/lockandlogic-docs/favicon.png' }],
    // Keep these docs out of search results. The password gate is client-side
    // only, so the pages are fully readable to anything that crawls them — and
    // the QR campaign page publishes the tracked URLs in plain text, which put
    // crawler hits into the client's Analytics campaign data.
    //
    // This has to be a meta tag, not robots.txt: on a GitHub Pages *project*
    // site, robots.txt is only honoured at jeffreyruoss.github.io/robots.txt,
    // which is served from a different repo.
    ['meta', { name: 'robots', content: 'noindex, nofollow' }],
  ],

  themeConfig: {
    siteTitle: 'Lock & Logic Docs',
    logo: '/logo.png',

    sidebar: [
      { text: '📋 Project Proposal', link: '/proposal' },
      { text: '🚀 Launch Plan', link: '/launch-plan' },
      { text: '🧩 Features Overview', link: '/escape-room-features-client' },
      { text: '🔍 SEO Strategy', link: '/seo-strategy' },
      { text: '🏷️ NAP Consistency', link: '/nap-consistency' },
      { text: '📢 Google Ads Strategy', link: '/google-ads-strategy' },
      { text: '📊 Bookeo vs Resova', link: '/bookeo-vs-resova' },
      { text: '🏆 Competitor Analysis', link: '/competitor-analysis' },
      { text: '🎮 Game Master Software', link: '/game-master-software' },
      { text: '🛠️ Houdini MC Setup Guide', link: '/houdini-mc-setup' },
      { text: '📘 Facebook Page Text', link: '/facebook-page' },
      { text: '🎨 Branding Style Guide', link: '/brand-style-guide' },
      { text: '📣 Marketing Examples', link: '/marketing-examples' },
      { text: '📬 Forms System', link: '/forms-system' },
      { text: '🎛️ Admin Dashboard', link: '/admin-dashboard' },
      { text: '🌐 Website Hosting', link: '/hosting' },
      { text: '📧 Email Opt-In Campaign', link: '/email-opt-in-campaign' },
      { text: '📅 Booking Flow Checklist', link: '/booking-flow' },
      { text: '🆚 Bookeo Embed vs. Hosted Page', link: '/bookeo-embed-vs-hosted' },
      { text: '🎟️ Return Visit Discount', link: '/return-visit-discount' },
      { text: '🚫 Bookeo Closing Periods', link: '/bookeo-closing-periods' },
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
