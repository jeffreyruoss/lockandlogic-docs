<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import PasswordGate from './PasswordGate.vue'

const isAuthenticated = ref(false)

onMounted(() => {
  isAuthenticated.value = localStorage.getItem('ll-docs-auth') === 'true'
})

function onAuthenticated() {
  localStorage.setItem('ll-docs-auth', 'true')
  isAuthenticated.value = true
}
</script>

<template>
  <PasswordGate v-if="!isAuthenticated" @authenticated="onAuthenticated" />
  <DefaultTheme.Layout v-else />
</template>
