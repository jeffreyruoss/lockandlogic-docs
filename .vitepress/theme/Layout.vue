<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import PasswordGate from './PasswordGate.vue'
import CountdownBar from './CountdownBar.vue'

const isAuthenticated = ref(false)
const isReady = ref(false)
const isAdmin = ref(false)
const { site, page, frontmatter } = useData()
const route = useRoute()

const adminSidebar = [
  {
    text: 'Client-Facing',
    items: [
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
      { text: '🌐 Website Hosting', link: '/hosting' },
      { text: '🎁 Additional Work', link: '/extras' },
    ],
  },
  {
    text: 'Internal',
    items: [
      { text: 'Tech Stack Options', link: '/tech-stack-options' },
      { text: 'Scoping Questionnaire', link: '/questionnaire-1-scoping' },
      { text: 'Scoping Questionnaire v2', link: '/questionnaire-1-scoping-v2' },
      { text: 'Content Questionnaire', link: '/questionnaire-2-content' },
      { text: 'Facebook & Instagram Ads Strategy', link: '/facebook-instagram-ads-strategy' },
      { text: 'Top & Local Escape Room Websites', link: '/top-and-local-escape-room-websites' },
      { text: 'Client Brief', link: '/client-brief' },
      { text: 'Website Features (Research)', link: '/escape-room-website-features' },
      { text: 'Pre-Engagement Checklist', link: '/pre-engagement-checklist' },
      { text: 'Data Backup Strategy', link: '/data-backup-strategy' },
      { text: 'GM Software (Technical)', link: '/game-master-software-internal' },
      { text: 'Hosting (Technical)', link: '/hosting-technical' },
    ],
  },
]

const ADMIN_IP = '45.11.81.248'

function applyAdminSidebar() {
  if (isAdmin.value) {
    site.value.themeConfig.sidebar = adminSidebar
  }
}

// Re-apply admin sidebar on every route change
watch(() => route.path, () => {
  applyAdminSidebar()
})

onMounted(async () => {
  // Allow authentication via ?pw= query parameter
  const params = new URLSearchParams(window.location.search)
  const pw = params.get('pw')
  if (pw === 'SiL$C6$Td4*wA6se') {
    localStorage.setItem('ll-docs-auth', 'true')
    isAuthenticated.value = true
    // Clean the URL so the password isn't visible/bookmarked
    const url = new URL(window.location.href)
    url.searchParams.delete('pw')
    window.history.replaceState({}, '', url.toString())
  } else {
    isAuthenticated.value = localStorage.getItem('ll-docs-auth') === 'true'
  }

  // Check cached admin status first for instant sidebar
  if (localStorage.getItem('ll-docs-admin') === 'true') {
    isAdmin.value = true
    applyAdminSidebar()
  }

  try {
    const res = await fetch('https://api.ipify.org?format=json')
    const data = await res.json()
    const admin = data.ip === ADMIN_IP
    isAdmin.value = admin
    localStorage.setItem('ll-docs-admin', String(admin))
    applyAdminSidebar()
  } catch {
    // silently fail — use cached status or default sidebar
  }

  isReady.value = true
})

function onAuthenticated() {
  localStorage.setItem('ll-docs-auth', 'true')
  isAuthenticated.value = true
}
</script>

<template>
  <!-- Always render Layout so VitePress can hydrate page content on hard navigation -->
  <DefaultTheme.Layout>
    <template #home-hero-info-after>
      <CountdownBar />
    </template>
    <template #doc-before>
      <div v-if="page.lastUpdated && frontmatter.layout !== 'home'" class="last-updated">
        Last updated: {{ new Date(page.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
      </div>
    </template>
    <template #sidebar-nav-before>
      <div v-if="isAdmin" class="admin-note">
        Admin view — clients only see the Client-Facing docs.
      </div>
    </template>
  </DefaultTheme.Layout>

  <!-- Full-screen overlay for loading / auth gate -->
  <div v-if="!isReady" class="password-gate password-gate--overlay" />
  <PasswordGate v-else-if="!isAuthenticated" class="password-gate--overlay" @authenticated="onAuthenticated" />
</template>

<style scoped>
.last-updated {
  margin-bottom: 16px;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.admin-note {
  padding: 8px 12px;
  margin: 0 0 12px;
  font-size: 12px;
  line-height: 1.4;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.password-gate--overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
}
</style>
