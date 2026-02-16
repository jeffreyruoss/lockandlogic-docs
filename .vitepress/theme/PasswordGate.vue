<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ authenticated: [] }>()

const password = ref('')
const error = ref(false)

const SITE_PASSWORD = 'lockandlogic2026'

function submit() {
  if (password.value === SITE_PASSWORD) {
    emit('authenticated')
  } else {
    error.value = true
    password.value = ''
  }
}
</script>

<template>
  <div class="password-gate">
    <div class="password-card">
      <h1>Lock &amp; Logic</h1>
      <p>Enter the password to view project documentation.</p>
      <form @submit.prevent="submit">
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          autofocus
          autocomplete="one-time-code"
        />
        <button type="submit">Enter</button>
      </form>
      <p v-if="error" class="error-msg">Incorrect password. Please try again.</p>
    </div>
  </div>
</template>
