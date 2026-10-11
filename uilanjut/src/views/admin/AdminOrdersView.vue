<script setup>
import { ref, computed } from 'vue'
import { useStoreAdmin } from '@/stores/storeAdmin'
import { formatRupiah } from '@/data/products'

const adminStore = useStoreAdmin()
const activeTab = ref('Semua')

const tabs = ['Semua', 'Perlu Dikirim', 'Sedang Dikirim', 'Selesai']

const filteredOrders = computed(() => {
  if (activeTab.value === 'Semua') {
    return adminStore.orderList
  }
  return adminStore.orderList.filter((o) => o.status === activeTab.value)
})
</script>

<template>
  <div class="admin-orders">
    <!-- Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Kelola Pesanan Masuk</h1>
        <p class="page-subtitle">
          Proses pesanan pelanggan, atur pengemasan barang, dan perbarui nomor resi pengiriman.
        </p>
      </div>

      <div class="orders-count-pill">
        <span>{{ adminStore.pendingOrdersCount }} Pesanan Menunggu Diproses</span>
      </div>
    </div>

    <!-- Status Tabs -->
    <div class="tabs-card card">
      <div class="tabs-row">
        <button
          v-for="t in tabs"
          :key="t"
          type="button"
          class="order-tab-btn"
          :class="{ active: activeTab === t }"
          @click="activeTab = t"
        >
          <span>{{ t }}</span>
          <span v-if="t === 'Perlu Dikirim' && adminStore.pendingOrdersCount > 0" class="tab-badge">
            {{ adminStore.pendingOrdersCount }}
          </span>
        </button>
      </div>
    </div>

    <!-- Orders List -->
    <div class="orders-container">
      <div v-if="filteredOrders.length === 0" class="card empty-orders-card">
        <p class="empty-title">Tidak ada pesanan dalam status ini.</p>
        <p class="empty-subtitle">Silakan pilih tab filter status lainnya.</p>
      </div>

      <div v-for="order in filteredOrders" :key="order.id" class="order-detail-card card">
        <!-- Order Header -->
        <div class="order-card-header">
          <div class="order-id-meta">
            <span class="order-id-code">{{ order.id }}</span>
            <span class="order-time-text">{{ order.date }}</span>
          </div>

          <div class="order-badge-box">
            <span
              class="badge"
              :class="{
                'badge-warning': order.status === 'Perlu Dikirim',
                'badge-primary': order.status === 'Sedang Dikirim',
                'badge-success': order.status === 'Selesai',
              }"
            >
              {{ order.status }}
            </span>
          </div>
        </div>

        <!-- Order Body (Customer info & Items) -->
        <div class="order-card-body">
          <div class="customer-info-block">
            <h4 class="block-heading">Informasi Penerima</h4>
            <p class="cust-name">
              <strong>{{ order.customerName }}</strong> ({{ order.customerPhone }})
            </p>
            <p class="cust-address">{{ order.address }}</p>
            <p class="cust-payment">
              Metode Bayar: <strong>{{ order.paymentMethod }}</strong>
            </p>
          </div>

          <div class="items-info-block">
            <h4 class="block-heading">Rincian Barang</h4>
            <div class="order-items-sublist">
              <div v-for="(item, idx) in order.items" :key="idx" class="item-subrow">
                <span class="item-subname">{{ item.qty }}x {{ item.name }}</span>
                <span class="item-subprice">{{ formatRupiah(item.price * item.qty) }}</span>
              </div>
            </div>
            <div class="order-total-row">
              <span>Total Pesanan:</span>
              <strong class="total-bold">{{ formatRupiah(order.total) }}</strong>
            </div>
          </div>
        </div>

        <!-- Order Actions Footer -->
        <div class="order-card-footer">
          <span class="footer-hint">Perbarui Status Pesanan:</span>
          <div class="action-btn-group">
            <button
              v-if="order.status === 'Perlu Dikirim'"
              type="button"
              class="btn btn-primary btn-sm"
              @click="adminStore.updateOrderStatus(order.id, 'Sedang Dikirim')"
            >
              🚚 Kirim Barang Sekarang
            </button>
            <button
              v-if="order.status === 'Sedang Dikirim'"
              type="button"
              class="btn btn-success btn-sm btn-done"
              @click="adminStore.updateOrderStatus(order.id, 'Selesai')"
            >
              ✅ Selesaikan Pesanan
            </button>
            <button
              v-if="order.status === 'Perlu Dikirim'"
              type="button"
              class="btn btn-outline btn-sm"
              @click="adminStore.updateOrderStatus(order.id, 'Dibatalkan')"
            >
              Batalkan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-orders {
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

.orders-count-pill {
  padding: 0.4rem 0.9rem;
  background-color: #fef3c7;
  color: #b45309;
  font-size: 0.82rem;
  font-weight: 700;
  border-radius: var(--radius-full);
}

/* Tabs */
.tabs-card {
  padding: var(--space-3) var(--space-4);
  background-color: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.tabs-row {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.order-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.order-tab-btn:hover {
  background-color: #f1f5f9;
  color: var(--color-primary);
}

.order-tab-btn.active {
  background-color: #eff6ff;
  color: var(--color-primary);
  font-weight: 700;
}

.tab-badge {
  font-size: 0.7rem;
  font-weight: 800;
  background-color: #f59e0b;
  color: #ffffff;
  padding: 1px 6px;
  border-radius: var(--radius-full);
}

/* Orders Cards */
.orders-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.empty-orders-card {
  padding: var(--space-12);
  text-align: center;
  background-color: #ffffff;
}

.empty-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
}

.empty-subtitle {
  font-size: 0.88rem;
  color: var(--color-text-secondary);
  margin-top: 4px;
}

.order-detail-card {
  background-color: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.order-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-border-light);
}

.order-id-meta {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
}

.order-id-code {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--color-text);
}

.order-time-text {
  font-size: 0.82rem;
  color: var(--color-text-muted);
}

.order-card-body {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
  padding: var(--space-2) 0;
}

@media (min-width: 768px) {
  .order-card-body {
    grid-template-columns: 1.1fr 1fr;
  }
}

.block-heading {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: var(--space-2);
}

.cust-name {
  font-size: 0.95rem;
  color: var(--color-text);
}

.cust-address {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.4;
  margin-top: 2px;
}

.cust-payment {
  font-size: 0.82rem;
  color: var(--color-primary);
  margin-top: 4px;
}

.order-items-sublist {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-subrow {
  display: flex;
  justify-content: space-between;
  font-size: 0.88rem;
  color: var(--color-text);
}

.item-subname {
  max-width: 260px;
}

.order-total-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: var(--space-3);
  padding-top: var(--space-3);
  border-top: 1px dashed var(--color-border);
  font-size: 0.95rem;
}

.total-bold {
  font-size: 1.15rem;
  color: var(--color-primary);
}

.order-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border-light);
  flex-wrap: wrap;
  gap: var(--space-3);
}

.footer-hint {
  font-size: 0.82rem;
  color: var(--color-text-secondary);
}

.action-btn-group {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.btn-done {
  background-color: #059669;
  color: #ffffff;
}

.btn-done:hover {
  background-color: #047857;
}
</style>
