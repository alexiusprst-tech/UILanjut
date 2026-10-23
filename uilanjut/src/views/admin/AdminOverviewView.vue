<script setup>
import { RouterLink } from 'vue-router'
import { useStoreAdmin } from '@/stores/storeAdmin'
import { useProducts } from '@/composables/useProducts'
import { formatRupiah } from '@/data/products'

const adminStore = useStoreAdmin()
const {
  products,
  totalProducts,
  totalActiveProducts,
  totalInactiveProducts,
} = useProducts()
</script>

<template>
  <div class="admin-overview">
    <!-- Header Section matching Screenshot 1 & 3 -->
    <div class="overview-header">
      <div>
        <h1 class="page-title">Ringkasan &amp; Analisis Toko</h1>
        <p class="page-subtitle">
          Pantau statistik real-time dan lacak status seluruh produk yang dikelola pada katalog SHOPNEST.
        </p>
      </div>

      <div class="header-actions">
        <RouterLink to="/dashboard/products" class="btn btn-primary btn-sm btn-manage-events">
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
          <span>Kelola Produk &rarr;</span>
        </RouterLink>
      </div>
    </div>

    <!-- ===================================================================
         MODUL 4: 3 METRIC CARDS (DERIVED STATE VIA COMPUTED)
         Screenshots 1 & 3 (Total Products, Active Products, Inactive Products)
         =================================================================== -->
    <div class="modul4-metrics-grid">
      <!-- Card 1: TOTAL PRODUK (TOTAL EVENTS) -->
      <div class="modul4-metric-card card">
        <span class="modul4-metric-label">TOTAL PRODUK</span>
        <h2 class="modul4-metric-value val-purple">{{ totalProducts }}</h2>
        <span class="modul4-metric-subtext">Semua produk tercatat di sistem</span>
      </div>

      <!-- Card 2: PRODUK AKTIF (ACTIVE EVENTS) -->
      <div class="modul4-metric-card card">
        <span class="modul4-metric-label">PRODUK AKTIF</span>
        <h2 class="modul4-metric-value val-green">{{ totalActiveProducts }}</h2>
        <span class="modul4-metric-subtext">Aktif tayang di katalog publik</span>
      </div>

      <!-- Card 3: PRODUK NONAKTIF / SELESAI (COMPLETED EVENTS) -->
      <div class="modul4-metric-card card">
        <span class="modul4-metric-label">PRODUK NONAKTIF</span>
        <h2 class="modul4-metric-value val-gray">{{ totalInactiveProducts }}</h2>
        <span class="modul4-metric-subtext">Diarsipkan / disembunyikan</span>
      </div>
    </div>

    <!-- ===================================================================
         MODUL 4: RECENT PRODUCTS STATUS OVERVIEW (Screenshots 1 & 3)
         =================================================================== -->
    <div class="card recent-status-card">
      <div class="recent-status-header">
        <div>
          <h2 class="recent-status-title">Status Produk Terkini</h2>
          <p class="recent-status-subtitle">
            Master data seluruh produk yang dikelola pada platform SHOPNEST.
          </p>
        </div>
        <RouterLink to="/dashboard/products" class="recent-status-link">
          Buka Kelola Produk &rarr;
        </RouterLink>
      </div>

      <!-- Empty State for Overview (Screenshot 1) -->
      <div v-if="totalProducts === 0" class="overview-empty-box">
        <div class="overview-empty-icon">📊</div>
        <p class="overview-empty-text">Belum ada produk tercatat di sistem.</p>
        <RouterLink to="/dashboard/products" class="btn btn-primary btn-sm">
          <span>+ Tambah Produk Pertama</span>
        </RouterLink>
      </div>

      <!-- Table with Active/Inactive Badges (Screenshot 3) -->
      <div v-else class="table-responsive">
        <table class="status-table">
          <thead>
            <tr>
              <th>NAMA PRODUK</th>
              <th>KATEGORI</th>
              <th>HARGA &amp; STOK</th>
              <th>STATUS STOK</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products.slice(0, 5)" :key="product.id">
              <td>
                <div class="product-title-cell">
                  <span class="title-bold">{{ product.name }}</span>
                  <span v-if="product.badge" class="badge-sub">{{ product.badge }}</span>
                </div>
              </td>
              <td>
                <span class="category-pill">{{ product.category }}</span>
              </td>
              <td>
                <span class="date-loc-text">
                  {{ formatRupiah(product.price) }} &bull; 📦 {{ product.stock }} Unit
                </span>
              </td>
              <td>
                <span class="quota-text">{{ product.stock > 0 ? `${product.stock} Tersedia` : 'Habis' }}</span>
              </td>
              <td>
                <span
                  class="status-badge"
                  :class="product.status === 'inactive' ? 'status-inactive' : 'status-active'"
                >
                  {{ product.status === 'inactive' ? 'Nonaktif' : 'Aktif' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
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

/* Modul 4: 3 Metric Cards matching Screenshots 1 & 3 */
.modul4-metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--space-5, 20px);
}

.modul4-metric-card {
  padding: 1.75rem 2rem;
  background-color: #ffffff;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-xl, 20px);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.modul4-metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.modul4-metric-label {
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--color-text-secondary, #64748b);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.modul4-metric-value {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin: 0.25rem 0;
  letter-spacing: -0.03em;
}

.val-purple {
  color: var(--color-primary, #6644ff);
}

.val-green {
  color: #10b981;
}

.val-gray {
  color: #64748b;
}

.modul4-metric-subtext {
  font-size: 0.85rem;
  color: var(--color-text-secondary, #94a3b8);
  font-weight: 500;
}

/* Modul 4: Recent Status Overview Card & Table */
.recent-status-card {
  padding: var(--space-6, 24px);
  background-color: #ffffff;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-xl, 20px);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.recent-status-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border-light, #f1f5f9);
}

@media (min-width: 768px) {
  .recent-status-header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.recent-status-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text, #1c1948);
}

.recent-status-subtitle {
  font-size: 0.88rem;
  color: var(--color-text-secondary, #64748b);
  margin-top: 2px;
}

.recent-status-link {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--color-primary, #6644ff);
  text-decoration: none;
  transition: opacity 0.2s;
}

.recent-status-link:hover {
  text-decoration: underline;
}

.overview-empty-box {
  padding: 3rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.overview-empty-icon {
  font-size: 2.5rem;
}

.overview-empty-text {
  font-size: 0.95rem;
  color: var(--color-text-secondary, #64748b);
  font-weight: 500;
}

.status-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.status-table th {
  padding: 0.85rem 1rem;
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--color-text-secondary, #64748b);
  letter-spacing: 0.05em;
  background-color: #f8fafc;
  border-bottom: 1px solid var(--color-border, #e2e8f0);
}

.status-table td {
  padding: 1.1rem 1rem;
  border-bottom: 1px solid var(--color-border-light, #f1f5f9);
  vertical-align: middle;
}

.status-table tr:hover {
  background-color: #fcfcfd;
}

.product-title-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.title-bold {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-text, #1c1948);
}

.badge-sub {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--color-primary, #6644ff);
  background-color: rgba(102, 68, 255, 0.08);
  padding: 1px 6px;
  border-radius: 4px;
  width: fit-content;
}

.category-pill {
  font-size: 0.75rem;
  font-weight: 700;
  color: #4f46e5;
  background-color: #eef2ff;
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full, 9999px);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.date-loc-text {
  font-size: 0.88rem;
  color: var(--color-text, #1c1948);
  font-weight: 500;
}

.quota-text {
  font-size: 0.85rem;
  color: var(--color-text-secondary, #64748b);
  font-weight: 600;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full, 9999px);
  font-size: 0.78rem;
  font-weight: 700;
}

.status-active {
  background-color: #d1fae5;
  color: #065f46;
}

.status-inactive {
  background-color: #f1f5f9;
  color: #64748b;
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
