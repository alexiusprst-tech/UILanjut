<script setup>
import { RouterLink } from 'vue-router'
import { userProfile } from '@/data/user'
import { formatRupiah } from '@/data/products'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

const breadcrumbItems = [
  { label: 'Beranda', to: '/' },
  { label: 'Profil Pengguna' },
]
</script>

<template>
  <div class="profile-view section">
    <div class="container">
      <!-- Breadcrumbs -->
      <Breadcrumbs :items="breadcrumbItems" />

      <!-- Profile Header Hero Card -->
      <div class="profile-hero-card card">
        <div class="profile-hero-inner">
          <div class="avatar-wrap">
            <img :src="userProfile.avatar" :alt="userProfile.name" class="profile-avatar" />
            <span class="online-indicator"></span>
          </div>

          <div class="profile-meta">
            <div class="profile-name-row">
              <h1 class="profile-name">{{ userProfile.name }}</h1>
              <span class="badge badge-primary">{{ userProfile.memberTier }}</span>
            </div>
            <p class="profile-joined">Bergabung sejak {{ userProfile.joinDate }}</p>
            <div class="profile-contact-pills">
              <span class="contact-pill">
                <svg class="pill-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                {{ userProfile.email }}
              </span>
              <span class="contact-pill">
                <svg class="pill-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                {{ userProfile.phone }}
              </span>
            </div>
          </div>
        </div>

        <!-- Quick Stats Strip -->
        <div class="profile-stats-strip">
          <div class="p-stat">
            <span class="p-stat-val">{{ userProfile.orderHistory.length }}</span>
            <span class="p-stat-lbl">Total Pesanan</span>
          </div>
          <div class="p-stat-div"></div>
          <div class="p-stat">
            <span class="p-stat-val">{{ userProfile.points.toLocaleString('id-ID') }}</span>
            <span class="p-stat-lbl">Poin Reward</span>
          </div>
          <div class="p-stat-div"></div>
          <div class="p-stat">
            <span class="p-stat-val">{{ userProfile.couponsCount }}</span>
            <span class="p-stat-lbl">Kupon Aktif</span>
          </div>
        </div>
      </div>

      <!-- Main Profile Grid -->
      <div class="profile-content-grid">
        <!-- Left Column: Order History -->
        <div class="order-history-column">
          <div class="card order-card-wrapper">
            <div class="card-header-row">
              <div class="header-title-box">
                <svg class="section-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <h2 class="card-title">Riwayat Pesanan</h2>
              </div>
              <RouterLink to="/products" class="btn btn-outline btn-sm">
                Belanja Lagi
              </RouterLink>
            </div>

            <div class="orders-list">
              <div 
                v-for="order in userProfile.orderHistory" 
                :key="order.id" 
                class="order-item card"
              >
                <!-- Order Top Bar -->
                <div class="order-item-header">
                  <div class="order-meta-info">
                    <span class="invoice-number">{{ order.id }}</span>
                    <span class="order-date">{{ order.date }}</span>
                  </div>
                  <span class="badge badge-success">{{ order.status }}</span>
                </div>

                <!-- Order Items Thumbnails -->
                <div class="order-products-list">
                  <div 
                    v-for="(pItem, pIdx) in order.items" 
                    :key="pIdx" 
                    class="order-product-row"
                  >
                    <img :src="pItem.image" :alt="pItem.name" class="order-item-img" />
                    <div class="order-item-info">
                      <span class="order-item-name">{{ pItem.name }}</span>
                      <span class="order-item-qty-price">
                        {{ pItem.quantity }}x {{ formatRupiah(pItem.price) }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Order Footer -->
                <div class="order-item-footer">
                  <div class="order-total-box">
                    <span class="total-label">Total Belanja:</span>
                    <strong class="total-amount">{{ formatRupiah(order.total) }}</strong>
                  </div>
                  <button type="button" class="btn btn-secondary btn-sm">
                    Lihat Bukti Transaksi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Shipping Address & Settings -->
        <div class="profile-side-column">
          <!-- Shipping Address Card -->
          <div class="card side-card">
            <div class="header-title-box">
              <svg class="section-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <h2 class="card-title">Alamat Pengiriman</h2>
            </div>

            <div class="address-box">
              <div class="address-tag-row">
                <span class="badge badge-primary">{{ userProfile.address.label }}</span>
                <span class="primary-badge">Utama</span>
              </div>
              <h3 class="recipient-name">{{ userProfile.address.recipient }}</h3>
              <p class="address-text">{{ userProfile.address.street }}</p>
              <p class="address-text">
                {{ userProfile.address.district }}, {{ userProfile.address.city }}, {{ userProfile.address.province }} {{ userProfile.address.postalCode }}
              </p>
              <p class="address-notes">
                <strong>Catatan:</strong> {{ userProfile.address.notes }}
              </p>
            </div>
          </div>

          <!-- Site Map Destination Info Card -->
          <div class="card side-card sitemap-info-card">
            <div class="header-title-box">
              <svg class="section-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
              <h2 class="card-title">Status Site Map</h2>
            </div>
            <p class="sitemap-text">
              Halaman ini merupakan <strong>Destination Node (Profil)</strong> dalam Site Map SHOPNEST. Berada sejajar dengan Produk dan Keranjang dari Entry Point Beranda.
            </p>
            <div class="sitemap-mini-path">
              <code>BERANDA &rarr; PROFIL</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-view {
  padding-top: 2rem;
  padding-bottom: 4rem;
}

/* Profile Hero Card */
.profile-hero-card {
  padding: 2rem;
  background-color: #ffffff;
  margin-bottom: 2.5rem;
}

.profile-hero-inner {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  text-align: center;
  margin-bottom: 2rem;
}

@media (min-width: 640px) {
  .profile-hero-inner {
    flex-direction: row;
    text-align: left;
    gap: 2rem;
  }
}

.avatar-wrap {
  position: relative;
  width: 100px;
  height: 100px;
  flex-shrink: 0;
}

.profile-avatar {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-full);
  object-fit: cover;
  border: 4px solid var(--color-primary-light);
  box-shadow: var(--shadow-md);
}

.online-indicator {
  position: absolute;
  bottom: 6px;
  right: 6px;
  width: 16px;
  height: 16px;
  border-radius: var(--radius-full);
  background-color: var(--color-success);
  border: 2px solid #ffffff;
}

.profile-meta {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.profile-name-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

@media (min-width: 640px) {
  .profile-name-row {
    justify-content: flex-start;
  }
}

.profile-name {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.profile-joined {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

.profile-contact-pills {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
  justify-content: center;
}

@media (min-width: 640px) {
  .profile-contact-pills {
    justify-content: flex-start;
  }
}

.contact-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  background-color: var(--color-surface-alt);
  padding: 0.3rem 0.75rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
}

.pill-icon {
  width: 15px;
  height: 15px;
  color: var(--color-primary);
}

/* Stats Strip */
.profile-stats-strip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  text-align: center;
}

.p-stat {
  display: flex;
  flex-direction: column;
}

.p-stat-val {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--color-primary);
}

.p-stat-lbl {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.p-stat-div {
  width: 1px;
  height: 36px;
  background-color: var(--color-border);
  margin: auto;
}

/* Grid Layout */
.profile-content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .profile-content-grid {
    grid-template-columns: 1.7fr 1.1fr;
  }
}

.order-card-wrapper {
  padding: 1.75rem;
  background-color: #ffffff;
}

.card-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
}

.header-title-box {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.section-icon {
  width: 22px;
  height: 22px;
  color: var(--color-primary);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text);
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.order-item {
  padding: 1.25rem;
  background-color: #ffffff;
  border: 1px solid var(--color-border);
}

.order-item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border-light);
}

.order-meta-info {
  display: flex;
  flex-direction: column;
}

.invoice-number {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-text);
}

.order-date {
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

.order-products-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.order-product-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.order-item-img {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-sm);
  object-fit: cover;
  background-color: #f1f5f9;
  border: 1px solid var(--color-border);
}

.order-item-info {
  display: flex;
  flex-direction: column;
}

.order-item-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
}

.order-item-qty-price {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
}

.order-item-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-border-light);
  flex-wrap: wrap;
  gap: 0.5rem;
}

.order-total-box {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.total-label {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

.total-amount {
  font-size: 1.05rem;
  color: var(--color-primary);
  font-weight: 800;
}

/* Side Column */
.profile-side-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.side-card {
  padding: 1.5rem;
  background-color: #ffffff;
}

.address-box {
  margin-top: 1rem;
}

.address-tag-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.primary-badge {
  font-size: 0.72rem;
  font-weight: 700;
  color: #065f46;
  background-color: #d1fae5;
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-full);
}

.recipient-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.35rem;
}

.address-text {
  font-size: 0.88rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: 0.25rem;
}

.address-notes {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  background-color: var(--color-surface-alt);
  padding: 0.6rem 0.75rem;
  border-radius: var(--radius-sm);
  margin-top: 0.75rem;
  line-height: 1.4;
}

.sitemap-info-card {
  background: linear-gradient(135deg, #eff6ff 0%, #ffffff 100%);
  border: 1.5px solid rgba(37, 99, 235, 0.2);
}

.sitemap-text {
  font-size: 0.88rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}

.sitemap-mini-path {
  background-color: #ffffff;
  border: 1px solid var(--color-border);
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-md);
  font-size: 0.82rem;
  color: var(--color-primary);
  font-weight: 700;
  display: inline-block;
}
</style>
