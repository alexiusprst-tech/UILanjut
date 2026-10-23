<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEvents } from '@/composables/useEvents'
import AppButton from '@/components/ui/AppButton.vue'

const route = useRoute()
const router = useRouter()
const { getTicketById } = useEvents()

const ticket = computed(() => getTicketById(route.params.ticketId))

function printTicket() {
  window.print()
}
</script>

<template>
  <div class="ticket-receipt-page section">
    <div class="container receipt-container">
      <!-- Action Bar (Not printed) -->
      <div class="receipt-actions-bar no-print">
        <button
          type="button"
          class="back-btn"
          @click="$router.push('/your-events')"
        >
          &larr; Back to Your Events
        </button>

        <div class="action-buttons">
          <AppButton variant="secondary" size="sm" @click="$router.push('/browse')">
            Katalog Acara
          </AppButton>
          <AppButton variant="primary" size="sm" @click="printTicket">
            🖨️ Cetak / Simpan PDF
          </AppButton>
        </div>
      </div>

      <!-- Ticket Not Found -->
      <div v-if="!ticket" class="ticket-not-found card">
        <h3>Tiket Tidak Ditemukan</h3>
        <p>Kode tiket atau booking reference yang Anda tuju tidak valid.</p>
        <AppButton variant="primary" size="md" @click="$router.push('/your-events')">
          Buka Dompet Tiket
        </AppButton>
      </div>

      <!-- Official Digital Pass Sheet -->
      <div v-else class="official-ticket-sheet">
        <!-- Top Colored Banner -->
        <div class="ticket-header-banner">
          <div class="banner-brand">
            <span class="brand-logo-txt">GATHERLY</span>
            <span class="brand-sub">OFFICIAL DIGITAL PASS</span>
          </div>
          <span class="ticket-status-pill">CONFIRMED PASS</span>
        </div>

        <div class="ticket-sheet-body">
          <!-- Main Event Section -->
          <div class="ticket-main-section">
            <div class="category-tag-row">
              <span class="cat-pill">{{ ticket.eventCategory }}</span>
              <span class="schedule-pill">TICKET REF: {{ ticket.bookingReference }}</span>
            </div>

            <h1 class="ticket-event-title">{{ ticket.eventTitle }}</h1>

            <div class="ticket-grid-info">
              <div class="info-block">
                <span class="info-label">DATE &amp; TIME</span>
                <span class="info-val highlight">{{ ticket.eventDate }}</span>
              </div>

              <div class="info-block">
                <span class="info-label">VENUE / LOCATION</span>
                <span class="info-val">{{ ticket.eventVenue || ticket.eventLocation }}</span>
              </div>

              <div class="info-block">
                <span class="info-label">ATTENDEE NAME</span>
                <span class="info-val highlight">{{ ticket.fullName }}</span>
              </div>

              <div class="info-block">
                <span class="info-label">CONTACT EMAIL</span>
                <span class="info-val">{{ ticket.email }}</span>
              </div>

              <div class="info-block">
                <span class="info-label">PHONE / WA</span>
                <span class="info-val">{{ ticket.phone }}</span>
              </div>

              <div class="info-block">
                <span class="info-label">ISSUED DATE</span>
                <span class="info-val">
                  {{ new Date(ticket.registeredAt).toLocaleDateString('id-ID', { dateStyle: 'medium' }) }}
                </span>
              </div>
            </div>

            <div v-if="ticket.reason" class="reason-note-box">
              <span class="note-label">Catatan Peserta:</span>
              <p class="note-text">{{ ticket.reason }}</p>
            </div>
          </div>

          <!-- Stub / Perforated Line with Barcode & QR -->
          <div class="ticket-stub-section">
            <div class="barcode-box">
              <!-- Visual Barcode Representation -->
              <div class="barcode-visual">
                <div v-for="i in 36" :key="i" class="barcode-bar" :style="{ width: (i % 3 === 0 ? '4px' : '2px') }"></div>
              </div>
              <span class="barcode-txt">{{ ticket.bookingReference }}</span>
            </div>

            <div class="qr-placeholder-box">
              <div class="qr-fake-pattern">
                <div class="qr-corner top-left"></div>
                <div class="qr-corner top-right"></div>
                <div class="qr-corner bottom-left"></div>
                <div class="qr-center-dot"></div>
              </div>
              <span class="qr-instruction">Scan at gate for instant check-in</span>
            </div>
          </div>
        </div>

        <!-- Footer Terms -->
        <div class="ticket-footer-terms">
          <p>
            Harap tunjukkan tanda terima digital ini (di ponsel atau cetak) pada meja registrasi.
            Tiket ini berlaku untuk 1 orang peserta dan tidak dapat dipindahtangankan tanpa konfirmasi panitia.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ticket-receipt-page {
  padding-top: 1.5rem;
  padding-bottom: 5rem;
}

.receipt-container {
  max-width: 860px;
}

.receipt-actions-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;
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

.action-buttons {
  display: flex;
  gap: 0.75rem;
}

.ticket-not-found {
  padding: 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

/* Official Digital Pass Sheet */
.official-ticket-sheet {
  background-color: #ffffff;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.ticket-header-banner {
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%);
  color: #ffffff;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.banner-brand {
  display: flex;
  flex-direction: column;
}

.brand-logo-txt {
  font-size: 1.4rem;
  font-weight: 900;
  letter-spacing: 0.05em;
}

.brand-sub {
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  opacity: 0.85;
}

.ticket-status-pill {
  background-color: #10b981;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
}

.ticket-sheet-body {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .ticket-sheet-body {
    grid-template-columns: 1.7fr 1fr;
  }
}

.ticket-main-section {
  padding: 2.25rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.category-tag-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.cat-pill {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  color: #6644ff;
  background-color: #ede9fe;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
}

.schedule-pill {
  font-size: 0.75rem;
  font-weight: 700;
  color: #475569;
}

.ticket-event-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1e1b4b;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.ticket-grid-info {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 540px) {
  .ticket-grid-info {
    grid-template-columns: 1fr 1fr;
  }
}

.info-block {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.info-label {
  font-size: 0.7rem;
  font-weight: 800;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-val {
  font-size: 0.95rem;
  color: #0f172a;
  font-weight: 600;
}

.info-val.highlight {
  color: #4338ca;
  font-weight: 700;
}

.reason-note-box {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.85rem 1rem;
  font-size: 0.85rem;
}

.note-label {
  font-weight: 700;
  color: #475569;
  display: block;
  margin-bottom: 2px;
}

.note-text {
  color: #64748b;
  line-height: 1.5;
}

/* Stub Section */
.ticket-stub-section {
  background-color: #faf5ff;
  border-top: 1px dashed #c084fc;
  padding: 2.25rem 1.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  text-align: center;
}

@media (min-width: 768px) {
  .ticket-stub-section {
    border-top: none;
    border-left: 1px dashed #c084fc;
  }
}

.barcode-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}

.barcode-visual {
  display: flex;
  align-items: center;
  height: 48px;
  gap: 2px;
}

.barcode-bar {
  background-color: #1e1b4b;
  height: 100%;
}

.barcode-txt {
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: #4338ca;
}

.qr-placeholder-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.qr-fake-pattern {
  width: 110px;
  height: 110px;
  background-color: #ffffff;
  border: 2px solid #1e1b4b;
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-corner {
  position: absolute;
  width: 22px;
  height: 22px;
  border: 4px solid #1e1b4b;
}

.top-left {
  top: 6px;
  left: 6px;
}

.top-right {
  top: 6px;
  right: 6px;
}

.bottom-left {
  bottom: 6px;
  left: 6px;
}

.qr-center-dot {
  width: 14px;
  height: 14px;
  background-color: #6644ff;
  border-radius: 2px;
}

.qr-instruction {
  font-size: 0.72rem;
  color: #64748b;
  font-weight: 600;
}

.ticket-footer-terms {
  background-color: #f8fafc;
  border-top: 1px solid #e2e8f0;
  padding: 1rem 2rem;
  font-size: 0.78rem;
  color: #64748b;
  line-height: 1.5;
  text-align: center;
}

/* Print Styles */
@media print {
  .no-print {
    display: none !important;
  }

  .ticket-receipt-page {
    padding: 0 !important;
  }

  .official-ticket-sheet {
    box-shadow: none !important;
    border: 1px solid #000000 !important;
  }
}
</style>
