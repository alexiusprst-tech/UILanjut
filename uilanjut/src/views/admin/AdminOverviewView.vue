<script setup>
import { RouterLink } from 'vue-router'
import { useStoreAdmin } from '@/stores/storeAdmin'
import { formatRupiah } from '@/data/products'

const adminStore = useStoreAdmin()
</script>

<template>
  <div class="admin-overview">
    <!-- Header Section -->
    <div class="overview-header">
      <div>
        <h1 class="page-title">Ringkasan Toko</h1>
        <p class="page-subtitle">
          Selamat datang kembali, <strong>{{ adminStore.storeInfo.owner }}</strong
          >. Pantau metrik penjualan dan operasional toko SHOPNEST Anda hari ini.
        </p>
      </div>

      <div class="header-actions">
        <RouterLink to="/dashboard/products" class="btn btn-primary btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            class="btn-icon"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Kelola Produk</span>
        </RouterLink>
        <RouterLink to="/dashboard/orders" class="btn btn-secondary btn-sm">
          <span>Lihat Pesanan ({{ adminStore.pendingOrdersCount }})</span>
        </RouterLink>
      </div>
    </div>

    <!-- 1. KPI Metrics Grid (Common Regions & Visual Hierarchy) -->
    <div class="metrics-grid">
      <!-- Card 1: Total Omzet -->
      <div class="metric-card card">
        <div class="metric-icon-box bg-blue">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <div class="metric-details">
          <span class="metric-label">Total Omzet Penjualan</span>
          <h2 class="metric-value">{{ formatRupiah(adminStore.totalOmzet) }}</h2>
          <span class="metric-trend text-success">&uarr; +14.8% dari bulan lalu</span>
        </div>
      </div>

      <!-- Card 2: Pesanan Perlu Diproses -->
      <div class="metric-card card">
        <div class="metric-icon-box bg-amber">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </div>
        <div class="metric-details">
          <span class="metric-label">Pesanan Baru Masuk</span>
          <h2 class="metric-value">{{ adminStore.pendingOrdersCount }} Pesanan</h2>
          <span class="metric-trend text-warning">Perlu segera dipacking</span>
        </div>
      </div>

      <!-- Card 3: Total Produk Toko -->
      <div class="metric-card card">
        <div class="metric-icon-box bg-indigo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
            />
          </svg>
        </div>
        <div class="metric-details">
          <span class="metric-label">Produk Terdaftar</span>
          <h2 class="metric-value">{{ adminStore.productList.length }} SKU</h2>
          <span class="metric-trend text-info">{{ adminStore.lowStockCount }} produk menipis</span>
        </div>
      </div>

      <!-- Card 4: Rating & Followers -->
      <div class="metric-card card">
        <div class="metric-icon-box bg-emerald">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        </div>
        <div class="metric-details">
          <span class="metric-label">Reputasi Toko</span>
          <h2 class="metric-value">{{ adminStore.storeInfo.rating }} / 5.0</h2>
          <span class="metric-trend text-success"
            >{{ adminStore.storeInfo.followers.toLocaleString('id-ID') }} Pelanggan</span
          >
        </div>
      </div>
    </div>

    <!-- 2. Dual Section Grid (Recent Orders & Store Performance) -->
    <div class="content-dual-grid">
      <!-- Left Column: Pesanan Terkini -->
      <div class="card panel-card">
        <div class="panel-header">
          <div class="panel-title-box">
            <h3 class="panel-title">Pesanan Masuk Terkini</h3>
            <span class="panel-badge">{{ adminStore.orderList.length }} Total</span>
          </div>
          <RouterLink to="/dashboard/orders" class="panel-link"> Kelola Semua &rarr; </RouterLink>
        </div>

        <div class="recent-orders-list">
          <div
            v-for="order in adminStore.orderList.slice(0, 3)"
            :key="order.id"
            class="recent-order-item"
          >
            <div class="order-main-meta">
              <span class="order-id">{{ order.id }}</span>
              <span class="order-buyer">{{ order.customerName }} &bull; {{ order.date }}</span>
              <span class="order-preview-items">
                {{ order.items.map((i) => `${i.qty}x ${i.name}`).join(', ') }}
              </span>
            </div>

            <div class="order-action-meta">
              <strong class="order-price">{{ formatRupiah(order.total) }}</strong>
              <span
                class="status-tag"
                :class="{
                  'tag-pending': order.status === 'Perlu Dikirim',
                  'tag-shipping': order.status === 'Sedang Dikirim',
                  'tag-done': order.status === 'Selesai',
                }"
              >
                {{ order.status }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Status Gudang & Quick Action -->
      <div class="card panel-card">
        <div class="panel-header">
          <h3 class="panel-title">Operasional &amp; Info Toko</h3>
          <RouterLink to="/dashboard/settings" class="panel-link"> Edit Pengaturan </RouterLink>
        </div>

        <div class="store-ops-content">
          <div class="info-row">
            <span class="info-label">Nama Toko:</span>
            <span class="info-val"
              ><strong>{{ adminStore.storeInfo.name }}</strong></span
            >
          </div>
          <div class="info-row">
            <span class="info-label">Status Toko:</span>
            <span class="badge badge-success">🟢 {{ adminStore.storeInfo.status }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Email Kontak:</span>
            <span class="info-val">{{ adminStore.storeInfo.email }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Alamat Pick-up:</span>
            <span class="info-val text-muted-sm">{{ adminStore.storeInfo.address }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Kurir Aktif:</span>
            <div class="partner-chips">
              <span
                v-for="c in adminStore.storeInfo.shippingPartners"
                :key="c"
                class="partner-chip"
              >
                {{ c }}
              </span>
            </div>
          </div>
        </div>

        <div class="rail-notice-box">
          <p class="notice-title">💡 Arsitektur Modul 2: Rail &amp; Pane</p>
          <p class="notice-text">
            Panel navigasi di sebelah kiri (Rail) beroperasi secara tetap dan mandiri, sementara
            area kerja ini (Pane) memiliki kapasitas scroll fleksibel.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-overview {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.overview-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

@media (min-width: 768px) {
  .overview-header {
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

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.btn-icon {
  width: 16px;
  height: 16px;
}

/* Metrics Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-5);
}

.metric-card {
  padding: var(--space-6);
  background-color: #ffffff;
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.metric-icon-box {
  width: 46px;
  height: 46px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.metric-icon-box svg {
  width: 24px;
  height: 24px;
}

.bg-blue {
  background-color: #eff6ff;
  color: #2563eb;
}

.bg-amber {
  background-color: #fef3c7;
  color: #d97706;
}

.bg-indigo {
  background-color: #e0e7ff;
  color: #4f46e5;
}

.bg-emerald {
  background-color: #ecfdf5;
  color: #059669;
}

.metric-details {
  display: flex;
  flex-direction: column;
}

.metric-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.metric-value {
  font-size: 1.45rem;
  font-weight: 800;
  color: var(--color-text);
  margin-top: 2px;
  letter-spacing: -0.02em;
}

.metric-trend {
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 4px;
}

.text-success {
  color: #059669;
}
.text-warning {
  color: #d97706;
}
.text-info {
  color: #2563eb;
}

/* Dual Content Grid */
.content-dual-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 1024px) {
  .content-dual-grid {
    grid-template-columns: 1.4fr 1fr;
  }
}

.panel-card {
  padding: var(--space-6);
  background-color: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(--space-4);
  margin-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border-light);
}

.panel-title-box {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.panel-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-text);
}

.panel-badge {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  background-color: #f1f5f9;
  color: var(--color-text-secondary);
  border-radius: var(--radius-full);
}

.panel-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
}

.panel-link:hover {
  text-decoration: underline;
}

.recent-orders-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.recent-order-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  background-color: #f8fafc;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-light);
}

.order-main-meta {
  display: flex;
  flex-direction: column;
}

.order-id {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--color-text);
}

.order-buyer {
  font-size: 0.78rem;
  color: var(--color-text-secondary);
}

.order-preview-items {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  max-width: 320px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}

.order-action-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.order-price {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--color-primary);
}

.status-tag {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-full);
}

.tag-pending {
  background-color: #fef3c7;
  color: #b45309;
}

.tag-shipping {
  background-color: #e0e7ff;
  color: #4338ca;
}

.tag-done {
  background-color: #d1fae5;
  color: #065f46;
}

/* Store Ops */
.store-ops-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 0.88rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed var(--color-border-light);
}

.info-label {
  color: var(--color-text-secondary);
  font-weight: 500;
}

.info-val {
  color: var(--color-text);
  text-align: right;
}

.text-muted-sm {
  max-width: 240px;
  font-size: 0.8rem;
  line-height: 1.4;
}

.partner-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: flex-end;
}

.partner-chip {
  font-size: 0.72rem;
  font-weight: 600;
  background-color: #f1f5f9;
  color: #475569;
  padding: 2px 6px;
  border-radius: 4px;
}

.rail-notice-box {
  margin-top: var(--space-6);
  padding: var(--space-4);
  background-color: #eff6ff;
  border-radius: var(--radius-md);
  border: 1px solid rgba(37, 99, 235, 0.2);
}

.notice-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 4px;
}

.notice-text {
  font-size: 0.8rem;
  color: #3b82f6;
  line-height: 1.4;
}
</style>
