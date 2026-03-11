<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import PasswordGate from './PasswordGate.vue'

const isAuthenticated = ref(false)
const isReady = ref(false)
const isAdmin = ref(false)

// Countdown to opening day: May 31, 2026
const OPENING_DAY = new Date('2026-05-31T00:00:00')
const now = ref(new Date())
let countdownTimer: ReturnType<typeof setInterval>

const daysUntilOpening = computed(() => {
  const diff = OPENING_DAY.getTime() - now.value.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
})
const { site } = useData()
const route = useRoute()

const adminSidebar = [
  {
    text: 'Client-Facing',
    items: [
      { text: '🧩 Features Overview', link: '/escape-room-features-client' },
      { text: '🔍 SEO Strategy', link: '/seo-strategy' },
      { text: '📢 Google Ads Strategy', link: '/google-ads-strategy' },
      { text: '📊 Bookeo vs Resova', link: '/bookeo-vs-resova' },
      { text: '🏆 Competitor Analysis', link: '/competitor-analysis' },
      { text: '🎮 Game Master Software', link: '/game-master-software' },
      { text: '🛠️ Houdini MC Setup Guide', link: '/houdini-mc-setup' },
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
      { text: 'Data Backup Strategy', link: '/data-backup-strategy' },
      { text: 'GM Software (Technical)', link: '/game-master-software-internal' },
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
  isAuthenticated.value = localStorage.getItem('ll-docs-auth') === 'true'

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

  countdownTimer = setInterval(() => {
    now.value = new Date()
  }, 60000) // update every minute
})

onUnmounted(() => {
  clearInterval(countdownTimer)
})

function onAuthenticated() {
  localStorage.setItem('ll-docs-auth', 'true')
  isAuthenticated.value = true
}
</script>

<template>
  <div v-if="!isReady" class="password-gate" />
  <PasswordGate v-else-if="!isAuthenticated" @authenticated="onAuthenticated" />
  <DefaultTheme.Layout v-else>
    <template #sidebar-nav-before>
      <div v-if="isAdmin" class="admin-note">
        Admin view — clients only see the Client-Facing docs.
      </div>
    </template>
  </DefaultTheme.Layout>
</template>

<style scoped>
.admin-note {
  padding: 8px 12px;
  margin: 0 0 12px;
  font-size: 12px;
  line-height: 1.4;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}
</style>
