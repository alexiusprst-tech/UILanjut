<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEvents } from '@/composables/useEvents'
import RegistrationSummary from '@/components/event/RegistrationSummary.vue'
import RegistrationForm from '@/components/event/RegistrationForm.vue'
import RegistrationReceipt from '@/components/event/RegistrationReceipt.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppButton from '@/components/ui/AppButton.vue'

const route = useRoute()
const router = useRouter()
const { getEventById, registerEvent } = useEvents()

const event = computed(() => getEventById(route.params.id))

const regFormRef = ref(null)
const isSubmitting = ref(false)
const serverError = ref('')

// Modal Konfirmasi Sukses Pendaftaran (Screenshot 2)
const isSuccessModalOpen = ref(false)
const confirmedTicket = ref(null)

// Modal Konfirmasi Pembatalan jika formulir sudah terisi (Dirty check)
const isCancelModalOpen = ref(false)
const pendingNavigation = ref(null)

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

// Eksekusi Pendaftaran
function handleFormSubmit(formData) {
  if (!event.value) return

  isSubmitting.value = true
  serverError.value = ''

  try {
    const ticket = registerEvent(event.value.id, formData)
    confirmedTicket.value = ticket
    isSuccessModalOpen.value = true
  } catch (err) {
    serverError.value = err.message || 'Terjadi kesalahan saat memproses pendaftaran.'
  } finally {
    isSubmitting.value = false
  }
}

// Handler Pembatalan
function handleCancelClick(isDirty) {
  if (isDirty) {
    isCancelModalOpen.value = true
    pendingNavigation.value = () => router.push(`/events/${event.value.id}`)
  } else {
    router.push(`/events/${event.value.id}`)
  }
}

function handleBackLink() {
  if (regFormRef.value?.isDirty) {
    isCancelModalOpen.value = true
    pendingNavigation.value = () => router.push(`/events/${event.value.id}`)
  } else {
    router.push(`/events/${event.value.id}`)
  }
}

function confirmCancelNavigation() {
  isCancelModalOpen.value = false
  if (pendingNavigation.value) {
    pendingNavigation.value()
    pendingNavigation.value = null
  }
}

// Navigasi Modal Sukses (Screenshot 2)
function goToCatalog() {
  isSuccessModalOpen.value = false
  router.push('/browse')
}

function goToYourEvents() {
  isSuccessModalOpen.value = false
  router.push('/your-events')
}
</script>

<template>
  <div class="event-registration-page section">
    <div class="container">
      <!-- Back Link -->
      <div class="back-link-bar">
        <button type="button" class="back-link-btn" @click="handleBackLink">
          &larr; Back to Event Detail
        </button>
      </div>

      <!-- Jika event tidak ditemukan -->
      <div v-if="!event" class="not-found-box card">
        <h3>Acara Tidak Ditemukan</h3>
        <p>Acara yang Anda tuju mungkin telah dihapus atau tidak tersedia.</p>
        <AppButton variant="primary" size="md" @click="$router.push('/browse')">
          Kembali ke Katalog
        </AppButton>
      </div>

      <!-- Tampilan Two-Column Formulir Pendaftaran (Screenshot 1) -->
      <div v-else class="two-column-grid">
        <!-- Kolom Kiri: Kartu Ringkasan Acara Lekat (Sticky) -->
        <aside class="left-column">
          <RegistrationSummary :event="event" />
        </aside>

        <!-- Kolom Kanan: Formulir Pendaftaran dan Validasi Masukan -->
        <main class="right-column">
          <RegistrationForm
            ref="regFormRef"
            :submitting="isSubmitting"
            :server-error="serverError"
            @submit="handleFormSubmit"
            @cancel="handleCancelClick"
          />
        </main>
      </div>
    </div>

    <!-- ===================================================================
         MODAL KONFIRMASI PENDAFTARAN SUKSES (Screenshot 2)
         Pop-up Modal "Registration Confirmed" dengan Booking Reference Unik
         =================================================================== -->
    <AppModal
      v-model="isSuccessModalOpen"
      title="Registration Confirmed"
      icon="none"
    >
      <RegistrationReceipt v-if="confirmedTicket" :ticket="confirmedTicket" />

      <!-- Named Slot Footer matching Screenshot 2 Buttons -->
      <template #footer>
        <div class="modal-receipt-footer">
          <AppButton
            variant="secondary"
            size="md"
            class="btn-footer-catalog"
            @click="goToCatalog"
          >
            Back to Event Catalog
          </AppButton>

          <AppButton
            variant="primary"
            size="md"
            class="btn-footer-events"
            @click="goToYourEvents"
          >
            Go to Your Events &rarr;
          </AppButton>
        </div>
      </template>
    </AppModal>

    <!-- ===================================================================
         MODAL KONFIRMASI PEMBATALAN FORMULIR
         Tampil jika formulir sudah terisi dan pengguna ingin keluar
         =================================================================== -->
    <AppModal
      v-model="isCancelModalOpen"
      title="Batalkan Pendaftaran?"
      message="Informasi yang Anda ketikkan pada formulir pendaftaran belum disimpan. Apakah Anda yakin ingin meninggalkan halaman ini?"
      confirm-text="Ya, Batalkan"
      cancel-text="Lanjutkan Mengisi"
      confirm-variant="danger"
      icon="warning"
      @confirm="confirmCancelNavigation"
    />
  </div>
</template>

<style scoped>
.event-registration-page {
  padding-top: 1.5rem;
  padding-bottom: 5rem;
}

.back-link-bar {
  margin-bottom: 1.5rem;
}

.back-link-btn {
  background: none;
  border: none;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-primary, #6644ff);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0;
  transition: opacity 0.2s;
}

.back-link-btn:hover {
  text-decoration: underline;
}

/* Two-Column Grid matching Screenshot 1 */
.two-column-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: flex-start;
}

@media (min-width: 992px) {
  .two-column-grid {
    grid-template-columns: 360px 1fr;
    gap: 2.5rem;
  }
}

@media (min-width: 1200px) {
  .two-column-grid {
    grid-template-columns: 390px 1fr;
    gap: 3rem;
  }
}

.not-found-box {
  padding: 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

/* Modal Receipt Footer Buttons (Screenshot 2) */
.modal-receipt-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  width: 100%;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.btn-footer-catalog {
  flex: 1;
}

.btn-footer-events {
  flex: 1.2;
}
</style>
