<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import PasswordGate from './PasswordGate.vue'

const isAuthenticated = ref(false)
const isReady = ref(false)

onMounted(() => {
  isAuthenticated.value = localStorage.getItem('ll-docs-auth') === 'true'
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
