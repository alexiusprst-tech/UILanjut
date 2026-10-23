<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEvents } from '@/composables/useEvents'
import EventCard from '@/components/event/EventCard.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import AppButton from '@/components/ui/AppButton.vue'

const route = useRoute()
const router = useRouter()
const { activeEvents } = useEvents()

const categoryName = computed(() => {
  return route.params.id || route.query.name || 'All'
})

const eventsInCategory = computed(() => {
  if (categoryName.value.toLowerCase() === 'all') {
    return activeEvents.value
  }
  return activeEvents.value.filter(
    (ev) => ev.category.toLowerCase() === categoryName.value.toLowerCase(),
  )
})

const breadcrumbItems = computed(() => [
  { label: 'Beranda', to: '/' },
  { label: 'Katalog Acara', to: '/browse' },
  { label: `Kategori: ${categoryName.value}` },
])
</script>

<template>
  <div class="category-page section">
    <div class="container">
      <Breadcrumbs :items="breadcrumbItems" />

      <div class="category-header">
        <span class="sub-lead">Event Category</span>
        <h1 class="page-title">{{ categoryName }} Events</h1>
        <p class="page-subtitle">
          Menampilkan seluruh workshop dan acara dalam kategori "{{ categoryName }}".
        </p>
      </div>

      <div v-if="eventsInCategory.length > 0" class="events-grid">
        <EventCard
          v-for="ev in eventsInCategory"
          :key="ev.id"
          :event="ev"
          @view-detail="router.push(`/events/${ev.id}`)"
        />
      </div>

      <div v-else class="empty-box card">
        <span class="empty-icon">📁</span>
        <h3>Belum Ada Acara Dalam Kategori Ini</h3>
        <p>Silakan telusuri kategori lainnya untuk melihat acara yang tersedia.</p>
        <AppButton variant="primary" size="sm" @click="$router.push('/browse')">
          Lihat Semua Acara
        </AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-page {
  padding-top: var(--space-8, 32px);
  padding-bottom: var(--space-16, 64px);
}

.category-header {
  margin-top: 1rem;
  margin-bottom: var(--space-8, 32px);
}

.sub-lead {
  display: block;
  font-size: 0.9rem;
  font-weight: 800;
  color: var(--color-primary, #6644ff);
  text-transform: uppercase;
  letter-spacing: 0.05em;
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
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-6, 24px);
}

.empty-box {
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

.empty-box h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e1b4b;
}

.empty-box p {
  color: #64748b;
  margin-bottom: 0.5rem;
}
</style>
