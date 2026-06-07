<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const OPENING_DAY = new Date('2026-08-08T00:00:00')
const SOFT_LAUNCH_DAY = new Date('2026-07-25T00:00:00')
const now = ref(new Date())
let timer: ReturnType<typeof setInterval>

const daysUntilOpening = computed(() => {
  const diff = OPENING_DAY.getTime() - now.value.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
})

const daysUntilSoftLaunch = computed(() => {
  const diff = SOFT_LAUNCH_DAY.getTime() - now.value.getTime()
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
  <div class="countdown-wrapper">
    <div class="opening-date">Opening Day: August 8, 2026</div>
    <div class="countdown-bar">
      <span class="countdown-text">
        🔓 <strong>{{ daysUntilOpening }}</strong> days until opening day
      </span>
    </div>
    <div class="soft-launch-label">Soft launch ~2 weeks before</div>
    <div class="countdown-bar soft">
      <span class="countdown-text">
        🚀 <strong>{{ daysUntilSoftLaunch }}</strong> days until soft launch
      </span>
    </div>
  </div>
</template>

<style scoped>
.countdown-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-top: 20px;
}

.opening-date {
  font-size: 15px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  letter-spacing: 0.01em;
}

.soft-launch-label {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

.countdown-bar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-3));
  color: black;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
  border-radius: 20px;
}

.countdown-bar.soft {
  background: linear-gradient(135deg, var(--vp-c-brand-3), var(--vp-c-brand-2));
  opacity: 0.85;
}

.countdown-text strong {
  font-size: 16px;
}
</style>
