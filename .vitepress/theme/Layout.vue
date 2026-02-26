<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import PasswordGate from './PasswordGate.vue'

const isAuthenticated = ref(false)
const isReady = ref(false)
const adminChecked = ref(false)
const { site } = useData()

const adminSidebar = [
  {
    text: 'Client-Facing',
    items: [
      { text: 'Features Overview', link: '/escape-room-features-client' },
      { text: 'SEO Strategy', link: '/seo-strategy' },
      { text: 'Google Ads Strategy', link: '/google-ads-strategy' },
      { text: 'Bookeo vs Resova', link: '/bookeo-vs-resova' },
      { text: 'Competitor Analysis', link: '/competitor-analysis' },
    ],
  },
  {
    text: 'Internal',
    items: [
      { text: 'Project Estimate', link: '/project-estimate' },
      { text: 'Tech Stack Options', link: '/tech-stack-options' },
      { text: 'Feature Estimator', link: '/feature-estimator' },
      { text: 'Scoping Questionnaire', link: '/questionnaire-1-scoping' },
      { text: 'Scoping Questionnaire v2', link: '/questionnaire-1-scoping-v2' },
      { text: 'Content Questionnaire', link: '/questionnaire-2-content' },
      { text: 'Facebook & Instagram Ads Strategy', link: '/facebook-instagram-ads-strategy' },
      { text: 'Top & Local Escape Room Websites', link: '/top-and-local-escape-room-websites' },
      { text: 'Client Brief', link: '/client-brief' },
      { text: 'Website Features (Research)', link: '/escape-room-website-features' },
      { text: 'Option 2 Detail', link: '/option-2-detail' },
      { text: 'Pre-Engagement Checklist', link: '/pre-engagement-checklist' },
    ],
  },
]

const ADMIN_IP = '45.11.81.248'

onMounted(async () => {
  isAuthenticated.value = localStorage.getItem('ll-docs-auth') === 'true'

  try {
    const res = await fetch('https://api.ipify.org?format=json')
    const data = await res.json()
    if (data.ip === ADMIN_IP) {
      site.value.themeConfig.sidebar = adminSidebar
    }
  } catch {
    // silently fail — default sidebar stays
  }

  adminChecked.value = true
  isReady.value = true
})

function onAuthenticated() {
  localStorage.setItem('ll-docs-auth', 'true')
  isAuthenticated.value = true
}
</script>

<template>
  <div v-if="!isReady" class="password-gate" />
  <PasswordGate v-else-if="!isAuthenticated" @authenticated="onAuthenticated" />
  <DefaultTheme.Layout v-else />
</template>
