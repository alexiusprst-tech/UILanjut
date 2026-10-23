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
  { label: 'Events & Workshop', to: '/browse' },
]
</script>

<template>
  <div class="browse-events-page section">
    <div class="container">
      <Breadcrumbs :items="breadcrumbItems" />

      <!-- Page Header matching Screenshot 3 -->
      <div class="browse-header">
        <span class="sub-lead">Browse &amp; Discover</span>
        <h1 class="page-title">Upcoming Events</h1>
        <p class="page-subtitle">
          Discover workshops, seminars, tech meetups, and competitions near you.
        </p>
      </div>

      <!-- Search Bar & Category Filter Pills (Screenshot 3) -->
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

      <!-- Events Grid -->
      <div v-if="filteredEvents.length > 0" class="events-grid">
        <EventCard
          v-for="ev in filteredEvents"
          :key="ev.id"
          :event="ev"
          @view-detail="handleViewDetail"
        />
      </div>

      <!-- Friendly Empty State matching Screenshot 1 -->
      <div v-else class="empty-events-box card">
        <div class="empty-icon-wrap">📅</div>
        <h2 class="empty-title">
          {{ activeEvents.length === 0 ? 'No Events Available Yet' : 'Acara Tidak Ditemukan' }}
        </h2>
        <p class="empty-desc">
          {{
            activeEvents.length === 0
              ? 'There are currently no active events scheduled. Are you an organizer? Publish and manage your first event today through the Dashboard!'
              : 'Tidak ada acara yang cocok dengan pencarian atau kategori yang Anda pilih.'
          }}
        </p>

        <div class="empty-actions-row">
          <AppButton
            v-if="activeEvents.length === 0"
            variant="primary"
            size="md"
            @click="$router.push('/event-management')"
          >
            Go to Organizer Dashboard &rarr;
          </AppButton>
          <AppButton
            v-if="activeEvents.length === 0"
            variant="secondary"
            size="md"
            @click="resetEventsToDefault"
          >
            Muat Ulang Data Contoh
          </AppButton>
          <AppButton
            v-else
            variant="secondary"
            size="md"
            @click="clearFilters"
          >
            Reset Filter
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.browse-events-page {
  padding-top: 1.5rem;
  padding-bottom: 5rem;
}

.browse-header {
  margin-bottom: 2rem;
}

.sub-lead {
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--color-primary, #6644ff);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 0.25rem;
}

.page-title {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--color-text, #1c1948);
  letter-spacing: -0.02em;
}

.page-subtitle {
  font-size: 1rem;
  color: var(--color-text-secondary, #64748b);
  margin-top: 0.35rem;
}

/* Filter Controls Box */
.filter-controls-box {
  background-color: #ffffff;
  border-radius: var(--radius-xl, 20px);
  border: 1px solid var(--color-border, #e2e8f0);
  padding: 1.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.search-wrap {
  position: relative;
  width: 100%;
}

.search-svg {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: #94a3b8;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.6rem;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: 10px;
  font-family: inherit;
  font-size: 0.95rem;
  color: var(--color-text, #1c1948);
  outline: none;
  background-color: #f8fafc;
  transition: all 0.2s;
}

.search-input:focus {
  background-color: #ffffff;
  border-color: var(--color-primary, #6644ff);
  box-shadow: 0 0 0 3px rgba(102, 68, 255, 0.1);
}

.category-pills-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.cat-filter-btn {
  padding: 0.45rem 1rem;
  border-radius: 9999px;
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  border: 1px solid var(--color-border, #e2e8f0);
  background-color: #f1f5f9;
  color: var(--color-text-secondary, #64748b);
  cursor: pointer;
  transition: all 0.2s;
}

.cat-filter-btn:hover {
  background-color: #ede9fe;
  color: var(--color-primary, #6644ff);
}

.cat-filter-btn.active {
  background-color: var(--color-primary, #6644ff);
  color: #ffffff;
  border-color: var(--color-primary, #6644ff);
  box-shadow: 0 3px 10px rgba(102, 68, 255, 0.25);
}

/* Events Grid */
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.75rem;
}

/* Empty State */
.empty-events-box {
  background-color: #ffffff;
  border-radius: var(--radius-xl, 20px);
  border: 1px solid var(--color-border, #e2e8f0);
  padding: 4rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 620px;
  margin: 2rem auto;
}

.empty-icon-wrap {
  font-size: 3.5rem;
  margin-bottom: 1.25rem;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background-color: rgba(102, 68, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-text, #1c1948);
  margin-bottom: 0.5rem;
}

.empty-desc {
  font-size: 0.95rem;
  color: var(--color-text-secondary, #64748b);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.empty-actions-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
