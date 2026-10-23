<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useEvents } from '@/composables/useEvents'
import OrganizerEventCard from '@/components/event/OrganizerEventCard.vue'
import EventCreateForm from '@/components/event/EventCreateForm.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppButton from '@/components/ui/AppButton.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

const router = useRouter()
const {
  events,
  activeEvents,
  completedEvents,
  totalEvents,
  totalTickets,
  toggleEventStatus,
  deleteEvent,
} = useEvents()

const activeTab = ref('active') // 'active' | 'create' | 'completed'

// Modal Konfirmasi Hapus Berantai (Cascade Delete)
const isDeleteModalOpen = ref(false)
const eventToDelete = ref(null)

function promptDelete(event) {
  eventToDelete.value = event
  isDeleteModalOpen.value = true
}

function confirmDelete() {
  if (eventToDelete.value) {
    deleteEvent(eventToDelete.value.id)
    eventToDelete.value = null
  }
}

function handleToggleStatus(event) {
  toggleEventStatus(event.id)
}

function onEventCreated() {
  activeTab.value = 'active'
}

const breadcrumbItems = [
  { label: 'Beranda', to: '/' },
  { label: 'Organizer Dashboard', to: '/event-management' },
]
</script>

<template>
  <div class="event-management-page section">
    <div class="container">
      <Breadcrumbs :items="breadcrumbItems" />

      <!-- Page Title & Subtitle -->
      <div class="management-header">
        <div class="header-left">
          <span class="sub-lead">Event Organizer Space</span>
          <h1 class="page-title">Event Management Dashboard</h1>
          <p class="page-subtitle">
            Kelola publikasi acara, pantau kuota tiket peserta, dan kelola alur partisipasi.
          </p>
        </div>

        <div class="header-actions">
          <AppButton
            variant="primary"
            size="md"
            @click="activeTab = 'create'"
          >
            + Create New Event
          </AppButton>
        </div>
      </div>

      <!-- Quick Metrics Bar -->
      <div class="metrics-grid">
        <div class="metric-card card">
          <div class="metric-icon bg-indigo">📅</div>
          <div class="metric-info">
            <span class="metric-num">{{ totalEvents }}</span>
            <span class="metric-label">Total Acara</span>
          </div>
        </div>

        <div class="metric-card card">
          <div class="metric-icon bg-green">🟢</div>
          <div class="metric-info">
            <span class="metric-num">{{ activeEvents.length }}</span>
            <span class="metric-label">Acara Aktif</span>
          </div>
        </div>

        <div class="metric-card card">
          <div class="metric-icon bg-purple">🏁</div>
          <div class="metric-info">
            <span class="metric-num">{{ completedEvents.length }}</span>
            <span class="metric-label">Acara Selesai</span>
          </div>
        </div>

        <div class="metric-card card">
          <div class="metric-icon bg-amber">🎟️</div>
          <div class="metric-info">
            <span class="metric-num">{{ totalTickets }}</span>
            <span class="metric-label">Tiket Terdaftar</span>
          </div>
        </div>
      </div>

      <!-- Tab Navigation Orchestrator -->
      <div class="tabs-nav-bar">
        <button
          type="button"
          class="tab-btn"
          :class="{ active: activeTab === 'active' }"
          @click="activeTab = 'active'"
        >
          <span>Active Events</span>
          <span class="tab-badge">{{ activeEvents.length }}</span>
        </button>

        <button
          type="button"
          class="tab-btn"
          :class="{ active: activeTab === 'create' }"
          @click="activeTab = 'create'"
        >
          <span>+ Create Event</span>
        </button>

        <button
          type="button"
          class="tab-btn"
          :class="{ active: activeTab === 'completed' }"
          @click="activeTab = 'completed'"
        >
          <span>Completed Events</span>
          <span class="tab-badge">{{ completedEvents.length }}</span>
        </button>
      </div>

      <!-- TAB 1: ACTIVE EVENTS -->
      <section v-if="activeTab === 'active'" class="tab-content animate-fade-in">
        <div v-if="activeEvents.length > 0" class="events-grid">
          <OrganizerEventCard
            v-for="ev in activeEvents"
            :key="ev.id"
            :event="ev"
            @toggle-status="handleToggleStatus"
            @delete="promptDelete"
          />
        </div>

        <div v-else class="empty-tab-box card">
          <span class="empty-emoji">🎉</span>
          <h3>Tidak Ada Acara Aktif</h3>
          <p>Saat ini tidak ada acara yang sedang aktif atau dibuka untuk pendaftaran.</p>
          <AppButton variant="primary" size="sm" @click="activeTab = 'create'">
            Buat Acara Baru
          </AppButton>
        </div>
      </section>

      <!-- TAB 2: CREATE EVENT FORM -->
      <section v-else-if="activeTab === 'create'" class="tab-content animate-fade-in">
        <EventCreateForm
          @created="onEventCreated"
          @cancel="activeTab = 'active'"
        />
      </section>

      <!-- TAB 3: COMPLETED EVENTS -->
      <section v-else-if="activeTab === 'completed'" class="tab-content animate-fade-in">
        <div v-if="completedEvents.length > 0" class="events-grid">
          <OrganizerEventCard
            v-for="ev in completedEvents"
            :key="ev.id"
            :event="ev"
            @toggle-status="handleToggleStatus"
            @delete="promptDelete"
          />
        </div>

        <div v-else class="empty-tab-box card">
          <span class="empty-emoji">📂</span>
          <h3>Belum Ada Arsip Acara Selesai</h3>
          <p>Acara yang telah selesai atau ditutup akan diarsipkan pada tab ini.</p>
        </div>
      </section>
    </div>

    <!-- =======================================================================
         MODAL PEMBERSIHAN BERANTAI (CASCADE DELETE CONFIRMATION)
         Memperingatkan panitia bahwa menghapus acara akan menghapus seluruh tiket terkait
         ======================================================================= -->
    <AppModal
      v-model="isDeleteModalOpen"
      title="Hapus Acara &amp; Tiket Terkait?"
      :message="`Peringatan: Menghapus acara '${eventToDelete?.title}' akan secara otomatis menghapus seluruh tiket peserta yang terdaftar pada acara ini (pembersihan berantai). Tindakan ini tidak dapat dibatalkan.`"
      confirm-text="Ya, Hapus Permanen"
      cancel-text="Batal"
      confirm-variant="danger"
      icon="danger"
      @confirm="confirmDelete"
    />
  </div>
</template>

<style scoped>
.event-management-page {
  padding-top: var(--space-8, 32px);
  padding-bottom: var(--space-16, 64px);
}

.management-header {
  margin-top: 1rem;
  margin-bottom: var(--space-8, 32px);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.sub-lead {
  display: block;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-primary, #6644ff);
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
  max-width: 650px;
}

/* Metrics Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
  margin-bottom: var(--space-8, 32px);
}

.metric-card {
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: var(--radius-lg, 16px);
}

.metric-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
}

.bg-indigo {
  background-color: #ede9fe;
}
.bg-green {
  background-color: #d1fae5;
}
.bg-purple {
  background-color: #fae8ff;
}
.bg-amber {
  background-color: #fef3c7;
}

.metric-info {
  display: flex;
  flex-direction: column;
}

.metric-num {
  font-size: 1.65rem;
  font-weight: 800;
  color: #1e1b4b;
  line-height: 1.1;
}

.metric-label {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 600;
}

/* Tab Navigation Bar */
.tabs-nav-bar {
  display: flex;
  gap: 0.5rem;
  border-bottom: 2px solid var(--color-border, #e2e8f0);
  margin-bottom: 2rem;
  overflow-x: auto;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.25rem;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  font-size: 0.95rem;
  font-weight: 700;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.tab-btn:hover {
  color: #1e1b4b;
}

.tab-btn.active {
  color: var(--color-primary, #6644ff);
  border-bottom-color: var(--color-primary, #6644ff);
}

.tab-badge {
  background-color: #f1f5f9;
  color: #475569;
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 800;
}

.tab-btn.active .tab-badge {
  background-color: rgba(102, 68, 255, 0.12);
  color: var(--color-primary, #6644ff);
}

/* Content */
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: var(--space-6, 24px);
}

.empty-tab-box {
  padding: 4rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.empty-emoji {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.empty-tab-box h3 {
  font-size: 1.35rem;
  font-weight: 800;
  color: #1e1b4b;
}

.empty-tab-box p {
  color: #64748b;
  max-width: 440px;
  margin-bottom: 0.75rem;
}
</style>
