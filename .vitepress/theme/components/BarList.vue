<script setup lang="ts">
// A single-series horizontal bar chart: one row per item, label on the left,
// value printed at the end of the bar. Bars share one scale (the largest value).
// Hovering a row shows its exact value and any note.
import { computed } from 'vue'

const props = defineProps<{
  title?: string
  rows: { label: string; value: number; display?: string; note?: string }[]
}>()

const max = computed(() => Math.max(...props.rows.map((r) => r.value), 1))
</script>

<template>
  <figure class="bar-list">
    <figcaption v-if="title">{{ title }}</figcaption>
    <div
      v-for="r in rows"
      :key="r.label"
      class="bar-row"
      :title="`${r.label}: ${r.display ?? r.value}${r.note ? ' (' + r.note + ')' : ''}`"
    >
      <div class="bar-label">{{ r.label }}</div>
      <div class="bar-track">
        <div class="bar-fill" :style="{ width: `${(r.value / max) * 100}%` }" />
        <span class="bar-value">{{ r.display ?? r.value }}</span>
      </div>
    </div>
  </figure>
</template>

<style scoped>
.bar-list {
  margin: 20px 0;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}
figcaption {
  margin-bottom: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.bar-row {
  display: grid;
  grid-template-columns: minmax(90px, 38%) 1fr;
  align-items: center;
  gap: 10px;
  padding: 4px 0;
  border-radius: 4px;
}
.bar-row:hover {
  background: var(--vp-c-default-soft);
}
.bar-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}
.bar-track {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.bar-fill {
  height: 14px;
  min-width: 4px;
  border-radius: 0 4px 4px 0;
  background: var(--vp-c-brand-1);
}
.bar-value {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
</style>
