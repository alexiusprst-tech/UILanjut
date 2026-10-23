<script setup>
import { ref } from 'vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import AppButton from '@/components/ui/AppButton.vue'

const breadcrumbs = [
  { label: 'Beranda', to: '/' },
  { label: 'Hubungi Kami' },
]

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const sent = ref(false)

function handleSubmit() {
  if (form.value.name && form.value.email && form.value.message) {
    sent.value = true
  }
}
</script>

<template>
  <div class="contact-page section">
    <div class="container">
      <Breadcrumbs :items="breadcrumbs" />

      <div class="contact-header">
        <span class="sub-lead">Get In Touch</span>
        <h1 class="page-title">Hubungi Tim Kami</h1>
        <p class="page-subtitle">
          Ada pertanyaan seputar pendaftaran acara, tiket resmi, atau produk belanja? Kami siap membantu Anda.
        </p>
      </div>

      <div class="contact-grid">
        <!-- Form Kontak -->
        <div class="contact-form-card card">
          <div v-if="sent" class="sent-success-box">
            <span class="success-icon">🎉</span>
            <h3>Pesan Terkirim!</h3>
            <p>Terima kasih, tim kami akan merespons pesan Anda dalam kurun waktu 1x24 jam kerja.</p>
            <AppButton variant="secondary" size="sm" @click="sent = false">
              Kirim Pesan Lain
            </AppButton>
          </div>

          <form v-else class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="c-name" class="form-label">Nama Lengkap *</label>
              <input
                id="c-name"
                v-model="form.name"
                type="text"
                class="form-input"
                required
                placeholder="Masukkan nama lengkap Anda"
              />
            </div>

            <div class="form-group">
              <label for="c-email" class="form-label">Alamat Email *</label>
              <input
                id="c-email"
                v-model="form.email"
                type="email"
                class="form-input"
                required
                placeholder="nama@domain.com"
              />
            </div>

            <div class="form-group">
              <label for="c-sub" class="form-label">Subjek / Topik</label>
              <input
                id="c-sub"
                v-model="form.subject"
                type="text"
                class="form-input"
                placeholder="Misal: Pertanyaan Pendaftaran Workshop"
              />
            </div>

            <div class="form-group">
              <label for="c-msg" class="form-label">Pesan / Pertanyaan *</label>
              <textarea
                id="c-msg"
                v-model="form.message"
                rows="4"
                class="form-input form-textarea"
                required
                placeholder="Tuliskan pertanyaan atau kebutuhan Anda secara detail..."
              ></textarea>
            </div>

            <AppButton variant="primary" size="md" type="submit" class="btn-submit">
              Kirim Pesan Sekarang &rarr;
            </AppButton>
          </form>
        </div>

        <!-- Info Kontak -->
        <aside class="contact-info-column">
          <div class="info-card card">
            <h3>Kantor &amp; Hub Operasional</h3>
            <p>📍 Gedung Creative Hub Lt. 4, Jl. Sudirman No. 120, Jakarta Pusat</p>
            <p>📧 support@shopnest.id / event@gatherly.id</p>
            <p>📞 +62 (21) 555-8900 (Senin - Jumat, 09.00 - 18.00 WIB)</p>
          </div>

          <div class="info-card card faq-card">
            <h3>Bantuan Cepat Pendaftaran</h3>
            <p>
              Perlu membatalkan tiket atau mengunduh lembar tanda terima tiket digital Anda? Anda dapat langsung mengakses dompet tiket resmi pada menu <strong>Your Events</strong>.
            </p>
            <AppButton variant="outline" size="sm" @click="$router.push('/your-events')">
              Buka Your Events &rarr;
            </AppButton>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-page {
  padding-top: var(--space-8, 32px);
  padding-bottom: var(--space-16, 64px);
}

.contact-header {
  margin-top: 1rem;
  margin-bottom: var(--space-8, 32px);
  text-align: center;
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;
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

.contact-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: var(--space-8, 32px);
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

.contact-form-card {
  padding: 2rem;
  border-radius: var(--radius-xl, 20px);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-label {
  font-size: 0.88rem;
  font-weight: 700;
  color: #334155;
}

.form-input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-md, 12px);
  background-color: #f8fafc;
  font-size: 0.95rem;
  color: #0f172a;
  outline: none;
  transition: all 0.2s ease;
}

.form-input:focus {
  border-color: var(--color-primary, #6644ff);
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(102, 68, 255, 0.12);
}

.form-textarea {
  resize: vertical;
}

.contact-info-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  padding: 1.75rem;
  border-radius: var(--radius-lg, 16px);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-card h3 {
  font-size: 1.15rem;
  font-weight: 800;
  color: #1e1b4b;
}

.info-card p {
  color: #64748b;
  font-size: 0.92rem;
  line-height: 1.55;
}

.faq-card {
  background-color: #f8fafc;
  border: 1px dashed var(--color-border, #cbd5e1);
}

.sent-success-box {
  padding: 3rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.success-icon {
  font-size: 3rem;
}

.sent-success-box h3 {
  font-size: 1.4rem;
  font-weight: 800;
  color: #1e1b4b;
}

.sent-success-box p {
  color: #64748b;
  max-width: 400px;
}
</style>
