<script setup>
import { ref } from 'vue'
import { useStoreAdmin } from '@/stores/storeAdmin'

const adminStore = useStoreAdmin()

const form = ref({
  name: adminStore.storeInfo.name,
  tagline: adminStore.storeInfo.tagline,
  owner: adminStore.storeInfo.owner,
  email: adminStore.storeInfo.email,
  phone: adminStore.storeInfo.phone,
  address: adminStore.storeInfo.address,
  status: adminStore.storeInfo.status,
})

function saveSettings() {
  adminStore.saveStoreSettings(form.value)
}
</script>

<template>
  <div class="admin-settings">
    <!-- Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Pengaturan Toko</h1>
        <p class="page-subtitle">
          Konfigurasi identitas toko, lokasi gudang penjemputan paket, dan kontak resmi toko
          SHOPNEST.
        </p>
      </div>

      <button type="button" class="btn btn-primary btn-sm" @click="saveSettings">
        Simpan Perubahan
      </button>
    </div>

    <!-- Form Sections -->
    <div class="settings-grid">
      <!-- Section 1: Profil Toko -->
      <div class="card settings-card">
        <h2 class="card-section-title">Identitas &amp; Informasi Toko</h2>
        <div class="form-body">
          <div class="form-group">
            <label class="form-label">Nama Toko</label>
            <input v-model="form.name" type="text" class="input-field" />
          </div>

          <div class="form-group">
            <label class="form-label">Slogan / Tagline Toko</label>
            <input v-model="form.tagline" type="text" class="input-field" />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Nama Pengelola / Owner</label>
              <input v-model="form.owner" type="text" class="input-field" />
            </div>
            <div class="form-group">
              <label class="form-label">Status Toko</label>
              <select v-model="form.status" class="input-field">
                <option value="Buka">🟢 Buka (Menerima Pesanan)</option>
                <option value="Tutup Sementara">🔴 Tutup Sementara (Libur Toko)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 2: Kontak & Gudang Pengiriman -->
      <div class="card settings-card">
        <h2 class="card-section-title">Kontak &amp; Alamat Gudang Pick-Up</h2>
        <div class="form-body">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Email Resmi</label>
              <input v-model="form.email" type="email" class="input-field" />
            </div>
            <div class="form-group">
              <label class="form-label">Nomor WhatsApp / Telepon</label>
              <input v-model="form.phone" type="text" class="input-field" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Alamat Lengkap Gudang (Titik Jemput Kurir)</label>
            <textarea v-model="form.address" rows="3" class="input-field"></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Mitra Kurir Pengiriman Terdaftar</label>
            <div class="shipping-options-list">
              <span
                v-for="partner in adminStore.storeInfo.shippingPartners"
                :key="partner"
                class="shipping-badge"
              >
                ✅ {{ partner }}
              </span>
            </div>
          </div>
        </div>

        <div class="save-strip">
          <button type="button" class="btn btn-primary" @click="saveSettings">
            💾 Simpan Seluruh Pengaturan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-settings {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

@media (min-width: 768px) {
  .page-header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.page-title {
  font-size: 1.85rem;
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.page-subtitle {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  margin-top: var(--space-1);
}

.settings-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  max-width: 900px;
}

.settings-card {
  padding: var(--space-6);
  background-color: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.card-section-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-text);
  padding-bottom: var(--space-3);
  margin-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border-light);
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

@media (min-width: 640px) {
  .form-row {
    grid-template-columns: 1fr 1fr;
  }
}

.form-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-text);
}

.shipping-options-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: 4px;
}

.shipping-badge {
  padding: 0.35rem 0.75rem;
  background-color: #eff6ff;
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: var(--radius-md);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-primary);
}

.save-strip {
  margin-top: var(--space-6);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border-light);
  display: flex;
  justify-content: flex-end;
}
</style>
