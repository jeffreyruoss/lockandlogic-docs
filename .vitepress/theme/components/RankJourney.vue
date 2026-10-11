<script setup lang="ts">
// A short "where you ranked, check by check" strip, e.g. 9th → 3rd → 1st.
// The last step is the current position and is highlighted.
defineProps<{
  steps: { date: string; rank: string; note?: string }[]
}>()
</script>

<template>
  <ol class="rank-journey">
    <li v-for="(s, i) in steps" :key="s.date" :class="{ current: i === steps.length - 1 }">
      <div class="rank">{{ s.rank }}</div>
      <div class="date">{{ s.date }}</div>
      <div v-if="s.note" class="note">{{ s.note }}</div>
    </li>
  </ol>
</template>

<style scoped>
.rank-journey {
  display: flex;
  gap: 8px;
  margin: 20px 0;
  padding: 0;
  list-style: none;
}
.rank-journey li {
  flex: 1;
  margin: 0;
  padding: 14px 12px;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}
.rank-journey li + li {
  position: relative;
}
.rank-journey li + li::before {
  content: '→';
  position: absolute;
  left: -14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--vp-c-text-3);
}
.rank-journey li.current {
  border: 2px solid var(--vp-c-brand-1);
}
.rank {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.current .rank {
  color: var(--vp-c-brand-1);
}
.date {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}
.note {
  margin-top: 2px;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}
</style>
