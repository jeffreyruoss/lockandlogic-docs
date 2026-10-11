<script setup lang="ts">
// Headline numbers for the monthly report: a big value, a label, and an
// optional "was X" comparison line underneath.
defineProps<{
  tiles: { label: string; value: string; was?: string; note?: string }[]
}>()
</script>

<template>
  <div class="stat-tiles">
    <div v-for="t in tiles" :key="t.label" class="stat-tile">
      <div class="stat-value">{{ t.value }}</div>
      <div class="stat-label">{{ t.label }}</div>
      <div v-if="t.was" class="stat-was">{{ t.was }}</div>
      <div v-if="t.note" class="stat-note">{{ t.note }}</div>
    </div>
  </div>
</template>

<style scoped>
.stat-tiles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 12px;
  margin: 20px 0;
}
.stat-tile {
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}
.stat-value {
  font-size: 1.9rem;
  font-weight: 700;
  line-height: 1.1;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}
.stat-label {
  margin-top: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}
.stat-was {
  margin-top: 4px;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}
.stat-note {
  margin-top: 4px;
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
</style>
