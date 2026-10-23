<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useEvents } from '@/composables/useEvents'
import AppButton from '@/components/ui/AppButton.vue'
import AppModal from '@/components/ui/AppModal.vue'

const router = useRouter()
const { tickets, cancelRegistration } = useEvents()

const isCancelModalOpen = ref(false)
const selectedTicket = ref(null)

function promptCancel(ticket) {
  selectedTicket.value = ticket
  isCancelModalOpen.value = true
}

function confirmCancel() {
  if (selectedTicket.value) {
    cancelRegistration(selectedTicket.value.id)
    selectedTicket.value = null
  }
}

function viewTicket(ticket) {
  router.push(`/tickets/${ticket.bookingReference || ticket.id}`)
}
</script>

<template>
  <div class="your-events-page section">
    <div class="container">
      <!-- Breadcrumb Bar -->
      <div class="header-section">
        <span class="sub-lead">Browse &amp; Discover</span>
        <h1 class="page-title">Your Events</h1>
        <p class="page-subtitle">
          Review your confirmed event registrations and view official digital passes.
        </p>
      </div>

      <!-- Empty State -->
      <div v-if="tickets.length === 0" class="empty-tickets-card card">
        <div class="empty-icon">🎟️</div>
        <h2 class="empty-title">Belum Ada Acara Terdaftar</h2>
        <p class="empty-message">
          Anda belum mendaftar pada acara atau workshop apapun. Jelajahi katalog acara sekarang untuk
          mengamankan kursi Anda!
        </p>
        <AppButton variant="primary" size="md" @click="$router.push('/browse')">
          <span>Jelajahi Acara &rarr;</span>
        </AppButton>
      </div>

      <!-- Tickets Grid matching Screenshot 5 -->
      <div v-else class="tickets-grid">
        <article
          v-for="ticket in tickets"
          :key="ticket.id"
          class="ticket-pass-card card"
        >
          <!-- Top Badges & Booking Ref Code -->
          <div class="ticket-header-row">
            <div class="badge-group">
              <span class="category-pill">{{ ticket.eventCategory || 'WORKSHOP' }}</span>
              <span class="status-upcoming-pill">UPCOMING</span>
            </div>
            <span class="ref-code">#{{ ticket.bookingReference }}</span>
          </div>

          <!-- Event Title -->
          <h2 class="event-title" @click="viewTicket(ticket)">
            {{ ticket.eventTitle }}
          </h2>

          <!-- Event Details -->
          <div class="ticket-meta-block">
            <div class="meta-row">
              <span class="meta-label">Date:</span>
              <span class="meta-val">{{ ticket.eventDate }}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Location:</span>
              <span class="meta-val">{{ ticket.eventVenue || ticket.eventLocation }}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Attendee:</span>
              <span class="meta-val bold">{{ ticket.fullName }} ({{ ticket.email }})</span>
            </div>
          </div>

          <!-- Card Actions matching Screenshot 5 -->
          <div class="ticket-card-actions">
            <button
              type="button"
              class="btn-view-details"
              @click="viewTicket(ticket)"
            >
              View Ticket Details &rarr;
            </button>

            <button
              type="button"
              class="btn-cancel-ticket"
              @click="promptCancel(ticket)"
            >
              Cancel
            </button>
          </div>
        </article>
      </div>
    </div>

    <!-- Modal Konfirmasi Pembatalan Tiket (Destructive Action Confirmation) -->
    <AppModal
      v-model="isCancelModalOpen"
      title="Batalkan Tiket Acara?"
      :message="`Apakah Anda yakin ingin membatalkan tiket untuk '${selectedTicket?.eventTitle}'? Kuota kursi akan dipulihkan dan tiket digital ini akan dihapus dari akun Anda.`"
      confirm-text="Ya, Batalkan Tiket"
      cancel-text="Pertahankan Tiket"
      confirm-variant="danger"
      icon="warning"
      @confirm="confirmCancel"
    />
  </div>
</template>

<style scoped>
.your-events-page {
  padding-top: 2rem;
  padding-bottom: 5rem;
}

.header-section {
  margin-bottom: 2.5rem;
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
  margin-top: 0.4rem;
}

/* Empty State */
.empty-tickets-card {
  padding: 4rem 2rem;
  background-color: #ffffff;
  border-radius: var(--radius-xl, 20px);
  border: 1px solid var(--color-border, #e2e8f0);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 2rem auto;
}

.empty-icon {
  font-size: 3.5rem;
  margin-bottom: 1rem;
}

.empty-title {
  font-size: 1.45rem;
  font-weight: 800;
  color: var(--color-text, #1c1948);
  margin-bottom: 0.5rem;
}

.empty-message {
  font-size: 0.95rem;
  color: var(--color-text-secondary, #64748b);
  line-height: 1.55;
  margin-bottom: 1.75rem;
}

/* Tickets Grid */
.tickets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1.5rem;
}

/* Ticket Pass Card matching Screenshot 5 */
.ticket-pass-card {
  background-color: #ffffff;
  border-radius: var(--radius-xl, 20px);
  border: 1px solid var(--color-border, #e2e8f0);
  padding: 1.75rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.ticket-pass-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
}

.ticket-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.badge-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-pill {
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-primary, #6644ff);
  background-color: rgba(102, 68, 255, 0.08);
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
}

.status-upcoming-pill {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: #2563eb;
  background-color: #eff6ff;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
}

.ref-code {
  font-size: 0.85rem;
  font-weight: 800;
  color: #475569;
  letter-spacing: 0.04em;
}

.event-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text, #1c1948);
  line-height: 1.35;
  cursor: pointer;
}

.event-title:hover {
  color: var(--color-primary, #6644ff);
}

.ticket-meta-block {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.88rem;
  color: var(--color-text-secondary, #64748b);
}

.meta-row {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.meta-label {
  font-weight: 700;
  color: #475569;
  min-width: 70px;
}

.meta-val {
  color: var(--color-text, #1c1948);
}

.meta-val.bold {
  font-weight: 700;
}

/* Card Actions */
.ticket-card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-border-light, #f1f5f9);
}

.btn-view-details {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-primary, #6644ff);
  font-weight: 700;
  font-size: 0.92rem;
  padding: 0;
  transition: opacity 0.2s;
}

.btn-view-details:hover {
  text-decoration: underline;
}

.btn-cancel-ticket {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary, #64748b);
  font-weight: 600;
  font-size: 0.88rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  transition: all 0.2s;
}

.btn-cancel-ticket:hover {
  color: #ef4444;
  background-color: #fee2e2;
}
</style>
