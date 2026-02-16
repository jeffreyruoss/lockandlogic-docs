import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Lock & Logic',
  description: 'Project documentation for Lock & Logic',
  srcDir: 'docs',
  base: '/lockandlogic-docs/',

  themeConfig: {
    siteTitle: 'Lock & Logic Docs',
    logo: '/logo.png',

    sidebar: [
      {
        text: 'Client-Facing',
        items: [
          { text: 'Project Estimate', link: '/project-estimate' },
          { text: 'Tech Stack Options', link: '/tech-stack-options' },
          { text: 'Features Overview (Client)', link: '/escape-room-features-client' },
          { text: 'Scoping Questionnaire', link: '/questionnaire-1-scoping' },
          { text: 'Scoping Questionnaire v2', link: '/questionnaire-1-scoping-v2' },
          { text: 'Content Questionnaire', link: '/questionnaire-2-content' },
        ],
      },
      {
        text: 'Internal',
        items: [
          { text: 'Client Brief', link: '/client-brief' },
          { text: 'Competitor Analysis', link: '/competitor-analysis' },
          { text: 'Website Features (Research)', link: '/escape-room-website-features' },
          { text: 'Option 2 Detail', link: '/option-2-detail' },
          { text: 'Pre-Engagement Checklist', link: '/pre-engagement-checklist' },
        ],
      },
    ],

    search: {
      provider: 'local',
    },

    nav: [
      { text: 'Home', link: '/' },
    ],
  },
})
