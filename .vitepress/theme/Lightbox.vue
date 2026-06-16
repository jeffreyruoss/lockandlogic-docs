<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Simple, dependency-free lightbox for doc images.
// Activates on:
//   1. The click-to-enlarge pattern  [![alt](/img.png)](/img.png)  (an <a> whose href is an image)
//   2. Any bare, reasonably-large <img> in the doc content (general future use)
// Click the backdrop / press Esc / click ✕ to close.

const open = ref(false)
const src = ref('')
const alt = ref('')

const IMG_EXT = /\.(png|jpe?g|gif|webp|svg|avif)(\?.*)?$/i
const MIN_BARE_IMG_WIDTH = 240 // skip small decorative images (logos in mockups, etc.)

function show(imageSrc: string, caption: string) {
  src.value = imageSrc
  alt.value = caption
  open.value = true
}

function close() {
  open.value = false
}

function onClick(e: MouseEvent) {
  // Respect modified clicks (open in new tab, etc.) and already-handled events.
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

  const target = e.target as HTMLElement | null
  if (!target || !target.closest('.vp-doc')) return

  // Case 1: a link wrapping an image (intentional click-to-enlarge).
  const link = target.closest('a') as HTMLAnchorElement | null
  if (link && IMG_EXT.test(link.getAttribute('href') || '')) {
    e.preventDefault()
    const img = link.querySelector('img')
    show(link.href, (img && img.getAttribute('alt')) || '')
    return
  }

  // Case 2: a bare, large image (no wrapping link).
  if (target.tagName === 'IMG' && !link) {
    const img = target as HTMLImageElement
    if ((img.naturalWidth || 0) < MIN_BARE_IMG_WIDTH) return
    e.preventDefault()
    show(img.currentSrc || img.src, img.alt || '')
  }
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) close()
}

onMounted(() => {
  document.addEventListener('click', onClick)
  document.addEventListener('keydown', onKey)
})

onUnmounted(() => {
  document.removeEventListener('click', onClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox-fade">
      <div
        v-if="open"
        class="lightbox-overlay"
        role="dialog"
        aria-modal="true"
        :aria-label="alt || 'Image preview'"
        @click="close"
      >
        <button class="lightbox-close" aria-label="Close" @click.stop="close">&times;</button>
        <img :src="src" :alt="alt" class="lightbox-img" @click.stop />
        <p v-if="alt" class="lightbox-caption">{{ alt }}</p>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 4vmin;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(4px);
  cursor: zoom-out;
}

.lightbox-img {
  max-width: 92vw;
  max-height: 84vh;
  border-radius: 8px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
  cursor: default;
}

.lightbox-caption {
  margin: 0;
  max-width: 92vw;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.875rem;
  text-align: center;
}

.lightbox-close {
  position: fixed;
  top: 16px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-size: 1.75rem;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.25);
}

.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.18s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}
</style>
