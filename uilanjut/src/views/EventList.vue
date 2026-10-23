<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useEvents } from '@/composables/useEvents'
import EventCard from '@/components/event/EventCard.vue'
import AppButton from '@/components/ui/AppButton.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

const router = useRouter()
const { activeEvents, resetEventsToDefault } = useEvents()

const searchQuery = ref('')
const selectedCategory = ref('All')

const categoriesList = [
  'All',
  'Workshop',
  'Meetup',
  'Competition',
  'Seminar',
  'Conference',
]

const filteredEvents = computed(() => {
  return activeEvents.value.filter((ev) => {
    const matchesCat =
      selectedCategory.value === 'All' ||
      ev.category.toLowerCase() === selectedCategory.value.toLowerCase()

    const q = searchQuery.value.trim().toLowerCase()
    const matchesSearch =
      !q ||
      ev.title.toLowerCase().includes(q) ||
      (ev.location && ev.location.toLowerCase().includes(q)) ||
      (ev.description && ev.description.toLowerCase().includes(q))

    return matchesCat && matchesSearch
  })
})

function handleViewDetail(eventId) {
  router.push(`/events/${eventId}`)
}

function clearFilters() {
  searchQuery.value = ''
  selectedCategory.value = 'All'
}

const breadcrumbItems = [
  { label: 'Beranda', to: '/' },
  { label: 'Katalog Acara & Workshop', to: '/events' },
]
</script>

<template>
  <div class="event-list-page section">
    <div class="container">
      <Breadcrumbs :items="breadcrumbItems" />

      <!-- Page Header -->
      <div class="page-header-box">
        <span class="sub-lead">Browse &amp; Discover</span>
        <h1 class="page-title">Upcoming Events</h1>
        <p class="page-subtitle">
          Temukan workshop, seminar, tech meetup, dan kompetisi kreatif pilihan Anda.
        </p>
      </div>

      <!-- Search Bar & Category Filter Pills -->
      <div class="filter-controls-box card">
        <div class="search-wrap">
          <svg
            class="search-svg"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            class="search-input"
            placeholder="Search events by title or location..."
          />
        </div>

        <div class="category-pills-row">
          <button
            v-for="cat in categoriesList"
            :key="cat"
            type="button"
            class="cat-filter-btn"
            :class="{ active: selectedCategory === cat }"
            @click="selectedCategory = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Events Catalog Grid: Pengaliran status pendaftaran ke kartu katalog -->
      <div v-if="filteredEvents.length > 0" class="events-catalog-grid">
        <EventCard
          v-for="ev in filteredEvents"
          :key="ev.id"
          :event="ev"
          @view-detail="handleViewDetail"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state-box card">
        <div class="empty-icon">🔍</div>
        <h3>Tidak Ada Acara Ditemukan</h3>
        <p>Tidak ada acara yang cocok dengan kriteria pencarian "{{ searchQuery }}".</p>
        <div class="empty-actions">
          <AppButton variant="secondary" size="sm" @click="clearFilters">
            Reset Pencarian
          </AppButton>
          <AppButton variant="primary" size="sm" @click="resetEventsToDefault">
            Pulihkan Acara Awal
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-list-page {
  padding-top: var(--space-8, 32px);
  padding-bottom: var(--space-16, 64px);
}

.page-header-box {
  margin-top: 1rem;
  margin-bottom: var(--space-8, 32px);
}

.sub-lead {
  display: block;
  font-size: 1.15rem;
  font-weight: 800;
  color: #1e1b4b;
  margin-bottom: 0.35rem;
}

.page-title {
  font-size: 2.25rem;
  font-weight: 800;
  color: #1e1b4b;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1rem;
  color: #64748b;
  max-width: 600px;
}

.filter-controls-box {
  padding: 1.25rem;
  margin-bottom: var(--space-8, 32px);
  border-radius: var(--radius-lg, 16px);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-wrap {
  position: relative;
  width: 100%;
}

.search-svg {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #94a3b8;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 2.85rem;
  border-radius: var(--radius-md, 12px);
  border: 1px solid var(--color-border, #e2e8f0);
  background-color: #ffffff;
  font-size: 0.95rem;
  color: var(--color-text, #0f172a);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  outline: none;
}

.search-input:focus {
  border-color: var(--color-primary, #6644ff);
  box-shadow: 0 0 0 3px rgba(102, 68, 255, 0.12);
}

.category-pills-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cat-filter-btn {
  padding: 0.45rem 1rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid var(--color-border, #e2e8f0);
  background-color: #ffffff;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cat-filter-btn:hover {
  background-color: #f8fafc;
  border-color: #cbd5e1;
  color: #1e1b4b;
}

.cat-filter-btn.active {
  background-color: var(--color-primary, #6644ff);
  border-color: var(--color-primary, #6644ff);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(102, 68, 255, 0.25);
}

.events-catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-6, 24px);
}

.empty-state-box {
  padding: 3.5rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.empty-state-box h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e1b4b;
}

.empty-state-box p {
  color: #64748b;
  max-width: 440px;
  margin-bottom: 0.5rem;
}

.empty-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
