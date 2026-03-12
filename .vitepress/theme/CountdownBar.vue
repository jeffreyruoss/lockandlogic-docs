<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const OPENING_DAY = new Date('2026-05-31T00:00:00')
const now = ref(new Date())
let timer: ReturnType<typeof setInterval>

const daysUntilOpening = computed(() => {
  const diff = OPENING_DAY.getTime() - now.value.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
})

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
  }, 60000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="countdown-bar">
    <span class="countdown-text">
      🔓 <strong>{{ daysUntilOpening }}</strong> days until aspirational opening day
    </span>
  </div>
</template>

<style scoped>
.countdown-bar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 8px 20px;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-3));
  color: black;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
  border-radius: 20px;
}

.countdown-text strong {
  font-size: 16px;
}
</style>
