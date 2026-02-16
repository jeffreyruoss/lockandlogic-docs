<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

const RATE = 75
const STORAGE_KEY = 'll-feature-estimates'

type Platform = 'bookeo' | 'resova'

const platform = ref<Platform>('bookeo')
const isReady = ref(false)

interface Feature {
  id: string
  name: string
  desc: string
  bookeo: number
  resova: number
}

interface Section {
  title: string
  desc: string
  defaultChecked: boolean
  features: Feature[]
}

const sections: Section[] = [
  {
    title: 'Must-Have at Launch',
    desc: 'Core features every escape room website needs.',
    defaultChecked: true,
    features: [
      {
        id: 'booking',
        name: 'Online Booking',
        desc: 'Customers pick a room, choose a date/time, and pay — no back-and-forth calls.',
        bookeo: 5,
        resova: 8,
      },
      {
        id: 'room-pages',
        name: 'Room Pages',
        desc: 'Each room gets its own page with photos, description, difficulty, group size, and price.',
        bookeo: 10,
        resova: 10,
      },
      {
        id: 'pricing',
        name: 'Clear Pricing',
        desc: 'Prices visible upfront — hidden pricing is the #1 reason people leave without booking.',
        bookeo: 2,
        resova: 2,
      },
      {
        id: 'mobile',
        name: 'Mobile-Friendly Design',
        desc: 'Over 60% of visitors are on phones. The site must work perfectly on all devices.',
        bookeo: 6,
        resova: 6,
      },
      {
        id: 'location',
        name: 'Location & Contact Info',
        desc: 'Address, phone, email, hours, and embedded Google Map on every page.',
        bookeo: 3,
        resova: 3,
      },
      {
        id: 'how-it-works',
        name: '"How It Works" Section',
        desc: 'Clear explanation for first-timers — reduces anxiety and drives more bookings.',
        bookeo: 3,
        resova: 3,
      },
      {
        id: 'seo',
        name: 'SEO Foundation',
        desc: "Technical setup to show up for 'escape room near me' and local searches.",
        bookeo: 4,
        resova: 4,
      },
      {
        id: 'analytics',
        name: 'Analytics',
        desc: 'Track visitors, traffic sources, and drop-off points to improve conversions.',
        bookeo: 2,
        resova: 2,
      },
      {
        id: 'design',
        name: 'Atmospheric Design',
        desc: 'Dark, immersive design that signals quality and matches your escape room experience.',
        bookeo: 16,
        resova: 16,
      },
      {
        id: 'legal',
        name: 'Legal Pages',
        desc: 'Privacy Policy and Terms of Service — required by law for collecting data and payments.',
        bookeo: 2,
        resova: 2,
      },
    ],
  },
  {
    title: 'Strongly Recommended',
    desc: 'Direct impact on bookings and revenue.',
    defaultChecked: false,
    features: [
      {
        id: 'gift-cards',
        name: 'Gift Cards',
        desc: 'Digital gift cards sold online — easy revenue, especially around holidays and birthdays.',
        bookeo: 3,
        resova: 4,
      },
      {
        id: 'private-public',
        name: 'Private vs. Public Booking',
        desc: 'Let customers choose whether to share a session with strangers.',
        bookeo: 2,
        resova: 2,
      },
      {
        id: 'corporate',
        name: 'Corporate / Team Building Page',
        desc: 'Dedicated page for companies — the highest-value customer segment.',
        bookeo: 5,
        resova: 5,
      },
      {
        id: 'reviews',
        name: 'Reviews & Testimonials',
        desc: 'Google ratings and customer quotes on the site. People rely on reviews before booking.',
        bookeo: 4,
        resova: 4,
      },
      {
        id: 'gbp',
        name: 'Google Business Profile',
        desc: 'Your listing on Google Maps — what people see first before your website.',
        bookeo: 2,
        resova: 2,
      },
      {
        id: 'waivers',
        name: 'Digital Waivers',
        desc: 'Online liability waivers signed before arrival. Less paperwork, better experience.',
        bookeo: 2,
        resova: 4,
      },
      {
        id: 'email-reminders',
        name: 'Automated Email Reminders',
        desc: 'Confirmation, reminders, and follow-ups. Reduces no-shows and drives reviews.',
        bookeo: 2,
        resova: 2,
      },
      {
        id: 'faq',
        name: 'FAQ Page',
        desc: 'Answers common questions about kids, cancellations, and lateness. Removes hesitation.',
        bookeo: 3,
        resova: 3,
      },
      {
        id: 'newsletter',
        name: 'Newsletter Signup',
        desc: 'Build an email list for promotions and new rooms — most cost-effective marketing.',
        bookeo: 3,
        resova: 3,
      },
      {
        id: 'accessibility',
        name: 'Accessibility Info',
        desc: 'Wheelchair access and physical considerations for each room. Builds trust.',
        bookeo: 2,
        resova: 2,
      },
      {
        id: 'structured-data',
        name: 'Structured Data',
        desc: 'Code that shows star ratings and prices directly in Google search results.',
        bookeo: 4,
        resova: 4,
      },
      {
        id: '404',
        name: 'Custom 404 Page',
        desc: 'Branded error page with helpful links instead of a dead end.',
        bookeo: 1,
        resova: 1,
      },
    ],
  },
  {
    title: 'Nice-to-Have',
    desc: 'Separates good escape room websites from great ones.',
    defaultChecked: false,
    features: [
      {
        id: 'birthday',
        name: 'Birthday Party Page',
        desc: 'Dedicated page with party packages and add-ons for birthday bookings.',
        bookeo: 4,
        resova: 4,
      },
      {
        id: 'gallery',
        name: 'Photo Gallery',
        desc: 'Standalone page showcasing rooms, venue, and happy teams.',
        bookeo: 5,
        resova: 5,
      },
      {
        id: 'photo-sharing',
        name: 'Post-Game Photo Sharing',
        desc: 'Branded team photos with social sharing buttons. Every share is free advertising.',
        bookeo: 8,
        resova: 8,
      },
      {
        id: 'leaderboard',
        name: 'Leaderboard',
        desc: 'Top escape times by room. Drives repeat bookings and social sharing.',
        bookeo: 10,
        resova: 10,
      },
      {
        id: 'blog',
        name: 'Blog',
        desc: 'Tips and behind-the-scenes content. Each post helps people find you on Google.',
        bookeo: 6,
        resova: 6,
      },
      {
        id: 'live-chat',
        name: 'Live Chat',
        desc: 'Quick answers to pre-booking questions in real time.',
        bookeo: 2,
        resova: 2,
      },
      {
        id: 'upsells',
        name: 'Checkout Upsells',
        desc: 'Add-ons during booking: photo packages, merch, extra clues.',
        bookeo: 3,
        resova: 3,
      },
      {
        id: 'loyalty',
        name: 'Loyalty Program',
        desc: 'Reward repeat visits — natural for escape rooms with multiple rooms.',
        bookeo: 8,
        resova: 8,
      },
      {
        id: 'referral',
        name: 'Referral Program',
        desc: "'Refer 5 friends, get a free game.' Happy customers become marketing.",
        bookeo: 10,
        resova: 10,
      },
      {
        id: 'abandoned',
        name: 'Abandoned Booking Recovery',
        desc: "Automated email when someone starts booking but doesn't finish.",
        bookeo: 1,
        resova: 1,
      },
      {
        id: 'social',
        name: 'Social Media Integration',
        desc: 'Instagram feed, customer photos, and branded hashtags on your site.',
        bookeo: 4,
        resova: 4,
      },
      {
        id: 'video',
        name: 'Video Trailers',
        desc: 'Short cinematic videos for each room — conveys atmosphere better than photos.',
        bookeo: 3,
        resova: 3,
      },
    ],
  },
  {
    title: 'Future / Growth Features',
    desc: 'For when the business scales. Not relevant at launch.',
    defaultChecked: false,
    features: [
      {
        id: 'dynamic-pricing',
        name: 'Dynamic Pricing',
        desc: 'Charge more on Friday nights, less on Tuesday afternoons.',
        bookeo: 3,
        resova: 4,
      },
      {
        id: 'multi-location',
        name: 'Multi-Location Management',
        desc: 'Run multiple venues from one dashboard.',
        bookeo: 16,
        resova: 16,
      },
      {
        id: 'advanced-analytics',
        name: 'Advanced Analytics',
        desc: 'Revenue by room, occupancy rates, and seasonal trend reporting.',
        bookeo: 8,
        resova: 8,
      },
      {
        id: 'crm',
        name: 'Customer Database (CRM)',
        desc: 'Track customer history and personalize marketing.',
        bookeo: 12,
        resova: 12,
      },
      {
        id: 'staff-scheduling',
        name: 'Staff Scheduling',
        desc: 'Tie game master schedules to the booking calendar.',
        bookeo: 8,
        resova: 8,
      },
      {
        id: 'integrations',
        name: 'Third-Party Integrations',
        desc: 'Connect to accounting, TripAdvisor, Viator, and marketing tools.',
        bookeo: 8,
        resova: 8,
      },
      {
        id: 'ab-testing',
        name: 'A/B Testing',
        desc: 'Test different booking page versions to improve conversions.',
        bookeo: 6,
        resova: 6,
      },
      {
        id: 'review-requests',
        name: 'Automated Review Requests',
        desc: 'Post-visit emails requesting Google reviews.',
        bookeo: 3,
        resova: 3,
      },
      {
        id: 'merch-shop',
        name: 'Merchandise Shop',
        desc: 'Sell branded merch (t-shirts, puzzles, mugs) online.',
        bookeo: 20,
        resova: 20,
      },
      {
        id: 'multi-language',
        name: 'Multi-Language Support',
        desc: 'Website in multiple languages for tourist-heavy areas.',
        bookeo: 14,
        resova: 14,
      },
    ],
  },
]

const checked = ref<Record<string, boolean>>({})

function initDefaults(): Record<string, boolean> {
  const state: Record<string, boolean> = {}
  for (const section of sections) {
    for (const f of section.features) {
      state[f.id] = section.defaultChecked
    }
  }
  return state
}

onMounted(() => {
  const defaults = initDefaults()
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      checked.value = { ...defaults, ...(parsed.checked || {}) }
      platform.value = parsed.platform || 'bookeo'
    } catch {
      checked.value = defaults
    }
  } else {
    checked.value = defaults
  }
  isReady.value = true
})

watch([checked, platform], () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      checked: checked.value,
      platform: platform.value,
    }),
  )
}, { deep: true })

function getHours(feature: Feature): number {
  return platform.value === 'bookeo' ? feature.bookeo : feature.resova
}

const sectionTotals = computed(() => {
  return sections.map((section) => {
    const hours = section.features.reduce((sum, f) => {
      return sum + (checked.value[f.id] ? getHours(f) : 0)
    }, 0)
    const count = section.features.filter((f) => checked.value[f.id]).length
    return { hours, cost: hours * RATE, count, total: section.features.length }
  })
})

const grandTotals = computed(() => {
  let bookeoHours = 0
  let rsovaHours = 0
  for (const section of sections) {
    for (const f of section.features) {
      if (checked.value[f.id]) {
        bookeoHours += f.bookeo
        rsovaHours += f.resova
      }
    }
  }
  return {
    bookeo: { hours: bookeoHours, cost: bookeoHours * RATE },
    resova: { hours: rsovaHours, cost: rsovaHours * RATE },
  }
})

const totalSelected = computed(() => {
  return Object.values(checked.value).filter(Boolean).length
})

const totalFeatures = computed(() => {
  return sections.reduce((sum, s) => sum + s.features.length, 0)
})

function toggleSection(index: number) {
  const section = sections[index]
  const allChecked = section.features.every((f) => checked.value[f.id])
  for (const f of section.features) {
    checked.value[f.id] = !allChecked
  }
}

function resetToDefaults() {
  checked.value = initDefaults()
  platform.value = 'bookeo'
}
</script>

<template>
  <div v-if="isReady" class="fe">
    <!-- Controls -->
    <div class="fe-controls">
      <div class="fe-platform">
        <span class="fe-label">Booking Platform</span>
        <div class="fe-toggle">
          <button
            :class="['fe-toggle-btn', { active: platform === 'bookeo' }]"
            @click="platform = 'bookeo'"
          >
            Bookeo
          </button>
          <button
            :class="['fe-toggle-btn', { active: platform === 'resova' }]"
            @click="platform = 'resova'"
          >
            Resova
          </button>
        </div>
      </div>
      <div class="fe-rate">
        Rate: <strong>${{ RATE }}/hr</strong>
      </div>
    </div>

    <!-- Sections -->
    <div v-for="(section, si) in sections" :key="section.title" class="fe-section">
      <div class="fe-section-header">
        <div class="fe-section-title">
          <h2>{{ section.title }}</h2>
          <p>{{ section.desc }}</p>
        </div>
        <div class="fe-section-meta">
          <span class="fe-section-count">
            {{ sectionTotals[si].count }}/{{ sectionTotals[si].total }} selected
          </span>
          <span class="fe-section-subtotal">
            {{ sectionTotals[si].hours }}h &mdash;
            ${{ sectionTotals[si].cost.toLocaleString() }}
          </span>
          <button class="fe-section-toggle" @click="toggleSection(si)">
            {{ section.features.every((f) => checked[f.id]) ? 'Uncheck All' : 'Check All' }}
          </button>
        </div>
      </div>

      <div class="fe-features">
        <label
          v-for="feature in section.features"
          :key="feature.id"
          :class="['fe-feature', { 'fe-feature--selected': checked[feature.id] }]"
        >
          <input
            type="checkbox"
            v-model="checked[feature.id]"
            class="fe-checkbox"
          />
          <span class="fe-check-icon" />
          <div class="fe-feature-info">
            <span class="fe-feature-name">{{ feature.name }}</span>
            <span class="fe-feature-desc">{{ feature.desc }}</span>
          </div>
          <div class="fe-feature-estimate">
            <span class="fe-hours">{{ getHours(feature) }}h</span>
            <span class="fe-cost">${{ (getHours(feature) * RATE).toLocaleString() }}</span>
          </div>
        </label>
      </div>
    </div>

    <!-- Grand Total -->
    <div class="fe-total">
      <div class="fe-total-header">
        <h2>Project Total</h2>
        <div class="fe-total-meta">
          <span>{{ totalSelected }} of {{ totalFeatures }} features selected</span>
          <button class="fe-reset" @click="resetToDefaults">Reset to Defaults</button>
        </div>
      </div>
      <div class="fe-total-platforms">
        <div
          :class="['fe-total-platform', { active: platform === 'bookeo' }]"
          @click="platform = 'bookeo'"
        >
          <span class="fe-total-label">Bookeo</span>
          <span class="fe-total-hours">{{ grandTotals.bookeo.hours }} hours</span>
          <span class="fe-total-cost">${{ grandTotals.bookeo.cost.toLocaleString() }}</span>
        </div>
        <div
          :class="['fe-total-platform', { active: platform === 'resova' }]"
          @click="platform = 'resova'"
        >
          <span class="fe-total-label">Resova</span>
          <span class="fe-total-hours">{{ grandTotals.resova.hours }} hours</span>
          <span class="fe-total-cost">${{ grandTotals.resova.cost.toLocaleString() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fe {
  max-width: 100%;
}

/* Controls */
.fe-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 12px;
}

.fe-platform {
  display: flex;
  align-items: center;
  gap: 12px;
}

.fe-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.fe-toggle {
  display: flex;
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 2px;
  border: 1px solid var(--vp-c-divider);
}

.fe-toggle-btn {
  padding: 6px 16px;
  border: none;
  background: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}

.fe-toggle-btn:hover {
  color: var(--vp-c-text-1);
}

.fe-toggle-btn.active {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white, #fff);
}

.fe-rate {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.fe-rate strong {
  color: var(--vp-c-text-1);
}

/* Sections */
.fe-section {
  margin-bottom: 40px;
}

.fe-section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
}

.fe-section-title h2 {
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  border-top: none !important;
  font-size: 20px;
  line-height: 1.4;
  letter-spacing: normal;
}

.fe-section-title p {
  margin: 4px 0 0;
  font-size: 14px;
  color: var(--vp-c-text-3);
}

.fe-section-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.fe-section-count {
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.fe-section-subtotal {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  white-space: nowrap;
}

.fe-section-toggle {
  padding: 4px 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
  white-space: nowrap;
}

.fe-section-toggle:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

/* Features */
.fe-features {
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-radius: 12px;
  overflow: hidden;
}

.fe-feature {
  display: flex;
  align-items: flex-start;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: background 0.15s;
  gap: 12px;
  position: relative;
}

.fe-feature:hover {
  background: var(--vp-c-bg-alt);
}

.fe-feature--selected {
  background: var(--vp-c-bg-alt);
  background: color-mix(in srgb, var(--vp-c-brand-1) 8%, var(--vp-c-bg-soft));
}

.fe-feature--selected:hover {
  background: var(--vp-c-bg-alt);
  background: color-mix(in srgb, var(--vp-c-brand-1) 12%, var(--vp-c-bg-soft));
}

/* Custom checkbox */
.fe-checkbox {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.fe-check-icon {
  width: 20px;
  height: 20px;
  min-width: 20px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  margin-top: 1px;
  position: relative;
}

.fe-checkbox:checked + .fe-check-icon {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.fe-checkbox:checked + .fe-check-icon::after {
  content: '';
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  position: absolute;
  top: 2px;
}

.fe-checkbox:focus-visible + .fe-check-icon {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

/* Feature info */
.fe-feature-info {
  flex: 1;
  min-width: 0;
}

.fe-feature-name {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.fe-feature-desc {
  display: block;
  font-size: 13px;
  color: var(--vp-c-text-3);
  line-height: 1.5;
  margin-top: 2px;
}

/* Estimates */
.fe-feature-estimate {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 80px;
  flex-shrink: 0;
}

.fe-hours {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.fe-cost {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

/* Grand Total */
.fe-total {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-brand-1);
  border-radius: 12px;
  padding: 24px;
  margin-top: 48px;
}

.fe-total-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 8px;
}

.fe-total-header h2 {
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  border-top: none !important;
  font-size: 20px;
}

.fe-total-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: var(--vp-c-text-3);
}

.fe-reset {
  padding: 6px 14px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}

.fe-reset:hover {
  border-color: var(--vp-c-danger-1);
  color: var(--vp-c-danger-1);
}

/* Platform comparison */
.fe-total-platforms {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.fe-total-platform {
  padding: 20px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.fe-total-platform.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-alt);
  background: color-mix(in srgb, var(--vp-c-brand-1) 8%, var(--vp-c-bg));
}

.fe-total-platform:hover {
  border-color: var(--vp-c-brand-1);
}

.fe-total-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.fe-total-hours {
  display: block;
  font-size: 16px;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.fe-total-cost {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

/* Responsive */
@media (max-width: 640px) {
  .fe-controls {
    flex-direction: column;
    align-items: flex-start;
  }

  .fe-section-header {
    flex-direction: column;
  }

  .fe-section-meta {
    flex-wrap: wrap;
  }

  .fe-feature {
    flex-wrap: wrap;
  }

  .fe-feature-estimate {
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 4px;
    padding-left: 32px;
  }

  .fe-total-platforms {
    grid-template-columns: 1fr;
  }

  .fe-total-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .fe-total-meta {
    flex-wrap: wrap;
  }
}
</style>
