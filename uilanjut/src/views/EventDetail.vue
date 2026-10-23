<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEvents } from '@/composables/useEvents'
import AppButton from '@/components/ui/AppButton.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

const route = useRoute()
const router = useRouter()
const { getEventById, isUserRegistered, getTicketForEvent } = useEvents()

const event = computed(() => getEventById(route.params.id))
const isRegistered = computed(() => (event.value ? isUserRegistered(event.value.id) : false))
const userTicket = computed(() => (event.value ? getTicketForEvent(event.value.id) : null))

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

function handleRegisterNavigation() {
  if (!event.value) return
  // Navigasi programatik menuju formulir pendaftaran dua kolom (Modul 5)
  router.push(`/events/${event.value.id}/register`)
}

function handleViewTicket() {
  if (userTicket.value) {
    router.push(`/tickets/${userTicket.value.bookingReference || userTicket.value.id}`)
  } else {
    router.push('/your-events')
  }
}

const breadcrumbItems = computed(() => [
  { label: 'Beranda', to: '/' },
  { label: 'Events & Workshop', to: '/browse' },
  { label: event.value ? event.value.title : 'Detail Acara' },
])
</script>

<template>
  <div class="event-detail-page section">
    <div class="container">
      <Breadcrumbs :items="breadcrumbItems" />

      <!-- Back Link -->
      <div class="back-bar">
        <button type="button" class="back-btn" @click="$router.push('/browse')">
          &larr; Kembali ke Katalog Acara
        </button>
      </div>

      <!-- Jika event tidak ditemukan -->
      <div v-if="!event" class="not-found-card card">
        <h2>Acara Tidak Ditemukan</h2>
        <p>Acara yang Anda cari tidak tersedia atau telah dihapus oleh panitia.</p>
        <AppButton variant="primary" size="md" @click="$router.push('/browse')">
          Lihat Semua Acara
        </AppButton>
      </div>

      <!-- Detail Konten -->
      <div v-else class="event-detail-content">
        <!-- Hero Header -->
        <header class="event-hero card">
          <div class="hero-badges">
            <span class="cat-pill">{{ event.category }}</span>
            <span v-if="event.status === 'completed'" class="status-pill status-closed">
              Acara Selesai
            </span>
            <span v-else-if="event.availableSeats > 0" class="status-pill status-open">
              Open Registration
            </span>
            <span v-else class="status-pill status-full">
              Sold Out
            </span>
          </div>

          <h1 class="hero-title">{{ event.title }}</h1>

          <div class="hero-meta-row">
            <span class="meta-item"><strong>Date:</strong> {{ event.date }}</span>
            <span class="meta-dot">•</span>
            <span class="meta-item"><strong>Location:</strong> {{ event.venue || event.location }}</span>
            <span class="meta-dot">•</span>
            <span class="meta-item">
              <strong>Remaining Quota:</strong> {{ event.availableSeats }} Attendees
            </span>
          </div>
        </header>

        <!-- Main Body Grid: 2 Column Layout -->
        <div class="detail-body-grid">
          <!-- Left Column: About This Event -->
          <div class="about-section card">
            <h2 class="section-title-line">About This Event</h2>
            <p class="about-description">{{ event.description }}</p>

            <div v-if="event.highlights && event.highlights.length" class="highlights-box">
              <h3 class="highlights-heading">Highlights &amp; Key Takeaways</h3>
              <ul class="highlights-list">
                <li v-for="(h, idx) in event.highlights" :key="idx" class="highlight-point">
                  <span class="point-icon">🚀</span>
                  <span>{{ h }}</span>
                </li>
              </ul>
            </div>

            <div class="venue-info-box">
              <h3 class="venue-heading">📍 Venue &amp; Petunjuk Lokasi</h3>
              <p class="venue-text">{{ event.venue || event.location }}</p>
              <span class="venue-note">
                Tunjukkan digital ticket / booking reference saat tiba di meja registrasi.
              </span>
            </div>
          </div>

          <!-- Right Column: Panel Aksi Adaptif (Screenshot 4) -->
          <aside class="action-sidebar">
            <div class="registration-panel-card card">
              <h3 class="panel-card-title">Event Registration</h3>
              <p class="panel-card-subtitle">
                Secure your spot now before the remaining quota is filled.
              </p>

              <!-- Tombol Adaptif sesuai status pendaftaran & kuota (Screenshot 4) -->
              <div class="panel-action-wrap">
                <!-- Kasus 1: Sudah terdaftar -->
                <div v-if="isRegistered" class="already-registered-box">
                  <div class="registered-alert">
                    <span class="alert-check">✓</span>
                    <div>
                      <strong>Anda Sudah Terdaftar!</strong>
                      <span class="ref-sub">Ref: #{{ userTicket?.bookingReference }}</span>
                    </div>
                  </div>

                  <AppButton
                    variant="primary"
                    size="lg"
                    class="btn-adaptive"
                    @click="handleViewTicket"
                  >
                    🎟️ Lihat Tiket Saya
                  </AppButton>
                </div>

                <!-- Kasus 2: Belum terdaftar & kuota masih ada (Tombol Register Now Ungu) -->
                <div v-else-if="event.availableSeats > 0 && event.status !== 'completed'">
                  <AppButton
                    variant="primary"
                    size="lg"
                    class="btn-adaptive"
                    @click="handleRegisterNavigation"
                  >
                    Register Now
                  </AppButton>

                  <div class="seats-available-footer">
                    <span class="seats-text">{{ event.availableSeats }} seats available</span>
                  </div>
                </div>

                <!-- Kasus 3: Kuota Penuh / Sold Out -->
                <div v-else class="sold-out-box">
                  <AppButton
                    variant="secondary"
                    size="lg"
                    class="btn-adaptive"
                    :disabled="true"
                  >
                    Sold Out / Kuota Penuh
                  </AppButton>
                  <p class="sold-out-note">Pendaftaran untuk acara ini telah ditutup.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-detail-page {
  padding-top: 1.5rem;
  padding-bottom: 5rem;
}

.back-bar {
  margin-bottom: 1.5rem;
}

.back-btn {
  background: none;
  border: none;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-primary, #6644ff);
  cursor: pointer;
  padding: 0;
}

.back-btn:hover {
  text-decoration: underline;
}

.not-found-card {
  padding: 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

/* Hero Header Card */
.event-hero {
  padding: 2.5rem;
  background-color: #ffffff;
  border-radius: var(--radius-xl, 20px);
  border: 1px solid var(--color-border, #e2e8f0);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.hero-badges {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.cat-pill {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--color-primary, #6644ff);
  background-color: rgba(102, 68, 255, 0.08);
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  letter-spacing: 0.05em;
}

.status-pill {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
}

.status-open {
  background-color: #ecfdf5;
  color: #059669;
}

.status-closed {
  background-color: #f1f5f9;
  color: #64748b;
}

.status-full {
  background-color: #fee2e2;
  color: #dc2626;
}

.hero-title {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--color-text, #1c1948);
  letter-spacing: -0.02em;
  line-height: 1.25;
}

.hero-meta-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  font-size: 0.95rem;
  color: var(--color-text-secondary, #64748b);
}

.hero-meta-row strong {
  color: var(--color-text, #1c1948);
}

.meta-dot {
  color: #cbd5e1;
}

/* Detail Body Grid */
.detail-body-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: flex-start;
}

@media (min-width: 992px) {
  .detail-body-grid {
    grid-template-columns: 1fr 380px;
    gap: 2.5rem;
  }
}

.about-section {
  padding: 2.25rem;
  background-color: #ffffff;
  border-radius: var(--radius-xl, 20px);
  border: 1px solid var(--color-border, #e2e8f0);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-title-line {
  font-size: 1.45rem;
  font-weight: 800;
  color: var(--color-text, #1c1948);
  border-left: 4px solid var(--color-primary, #6644ff);
  padding-left: 0.75rem;
  line-height: 1.2;
}

.about-description {
  font-size: 1rem;
  color: var(--color-text-secondary, #475569);
  line-height: 1.7;
}

.highlights-box {
  background-color: #faf5ff;
  border: 1px solid #ede9fe;
  border-radius: 14px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.highlights-heading {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--color-primary, #6644ff);
}

.highlights-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.highlight-point {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  font-size: 0.9rem;
  color: #334155;
  line-height: 1.5;
}

.point-icon {
  font-size: 0.95rem;
}

.venue-info-box {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.venue-heading {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-text, #1c1948);
}

.venue-text {
  font-size: 0.92rem;
  color: var(--color-text-secondary, #475569);
}

.venue-note {
  font-size: 0.8rem;
  color: #64748b;
  margin-top: 4px;
}

/* Adaptive Action Sidebar Panel (Screenshot 4) */
.action-sidebar {
  position: sticky;
  top: 96px;
}

.registration-panel-card {
  padding: 2rem;
  background-color: #ffffff;
  border-radius: var(--radius-xl, 20px);
  border: 1px solid var(--color-border, #e2e8f0);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  text-align: center;
}

.panel-card-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--color-text, #1c1948);
}

.panel-card-subtitle {
  font-size: 0.88rem;
  color: var(--color-text-secondary, #64748b);
  line-height: 1.45;
}

.panel-action-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.btn-adaptive {
  width: 100%;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.9rem 1.5rem;
  border-radius: 10px;
  background-color: #6644ff !important;
  color: #ffffff !important;
  box-shadow: 0 4px 14px rgba(102, 68, 255, 0.28) !important;
  border: none !important;
  transition: all 0.2s ease;
}

.btn-adaptive:hover {
  background-color: #5533ee !important;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(102, 68, 255, 0.38) !important;
}

.seats-available-footer {
  text-align: center;
  margin-top: 0.5rem;
}

.seats-text {
  font-size: 0.85rem;
  font-weight: 700;
  color: #059669;
}

.already-registered-box {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.registered-alert {
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1e40af;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-align: left;
}

.alert-check {
  font-size: 1.2rem;
  font-weight: 900;
  color: #2563eb;
}

.ref-sub {
  display: block;
  font-size: 0.75rem;
  color: #3b82f6;
  font-weight: 600;
}

.sold-out-box {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sold-out-note {
  font-size: 0.82rem;
  color: #ef4444;
  font-weight: 600;
}
</style>
