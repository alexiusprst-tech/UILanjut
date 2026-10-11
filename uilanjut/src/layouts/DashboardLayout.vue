<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useStoreAdmin } from '@/stores/storeAdmin'

const adminStore = useStoreAdmin()
const route = useRoute()

const navItems = [
  {
    to: '/dashboard',
    name: 'dashboard-overview',
    label: 'Ringkasan Toko',
    icon: 'M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z',
    badge: null,
  },
  {
    to: '/dashboard/products',
    name: 'admin-products',
    label: 'Kelola Produk',
    icon: 'm21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9',
    badge: adminStore.productList.length,
  },
  {
    to: '/dashboard/orders',
    name: 'admin-orders',
    label: 'Pesanan Masuk',
    icon: 'M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z',
    badge: adminStore.pendingOrdersCount > 0 ? adminStore.pendingOrdersCount : null,
    badgeColor: 'badge-warning',
  },
  {
    to: '/dashboard/settings',
    name: 'admin-settings',
    label: 'Pengaturan Toko',
    icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.216.456a1.125 1.125 0 0 1-1.37-.49l-1.296-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z',
    badge: null,
  },
]
</script>

<template>
  <div class="dashboard-shell">
    <!-- =======================================================================
         MODUL 2: RAIL SYSTEM (SIDEBAR NAVIGASI PUTIH-BIRU)
         Fixed sidebar navigation, white surface with bright blue accents.
         ======================================================================= -->
    <aside class="dashboard-rail" aria-label="Sidebar Navigasi Admin Toko">
      <!-- Rail Header / Branding -->
      <div class="rail-header">
        <RouterLink to="/dashboard" class="rail-brand">
          <div class="rail-brand-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="shop-svg"
            >
              <path
                d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
              />
            </svg>
          </div>
          <div class="rail-brand-info">
            <span class="rail-brand-title">SHOPNEST</span>
            <span class="rail-brand-badge">ADMIN TOKO</span>
          </div>
        </RouterLink>

        <!-- Store status pill -->
        <div class="store-status-pill">
          <span class="status-dot"></span>
          <span class="status-label">{{ adminStore.storeInfo.name }}</span>
        </div>
      </div>

      <!-- Rail Navigation Links -->
      <nav class="rail-nav">
        <span class="rail-section-label">MENU UTAMA</span>
        <ul class="rail-menu-list">
          <li v-for="item in navItems" :key="item.to">
            <RouterLink
              :to="item.to"
              class="rail-nav-link"
              :class="{
                active:
                  route.path === item.to ||
                  (item.to !== '/dashboard' && route.path.startsWith(item.to)),
              }"
            >
              <svg
                class="rail-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
              </svg>
              <span class="rail-link-text">{{ item.label }}</span>
              <span
                v-if="item.badge !== null"
                class="rail-badge"
                :class="item.badgeColor || 'badge-primary-soft'"
              >
                {{ item.badge }}
              </span>
            </RouterLink>
          </li>
        </ul>

        <span class="rail-section-label">PINTASAN</span>
        <ul class="rail-menu-list">
          <li>
            <RouterLink
              to="/"
              class="rail-nav-link public-store-link"
              title="Buka Halaman Toko Pembeli"
            >
              <svg
                class="rail-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
              <span class="rail-link-text">Lihat Toko Publik</span>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- Rail Footer (User Profile Card) -->
      <div class="rail-footer">
        <div class="rail-user-card">
          <div class="rail-avatar">
            <span>SN</span>
          </div>
          <div class="rail-user-meta">
            <span class="rail-user-name">{{ adminStore.storeInfo.owner }}</span>
            <span class="rail-user-role">Administrator</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- =======================================================================
         MODUL 2: PANE SYSTEM (AREA KONTEN MANDIRI DENGAN SCROLL INDEPENDEN)
         Independent scrollable main workspace pane.
         ======================================================================= -->
    <main class="dashboard-pane" aria-label="Area Konten Workspace Admin">
      <!-- Pane Top Bar -->
      <header class="pane-topbar">
        <div class="pane-topbar-left">
          <span class="topbar-breadcrumb">Admin Toko &bull; {{ adminStore.storeInfo.name }}</span>
        </div>
        <div class="pane-topbar-right">
          <div class="quick-status-chip">
            <span class="chip-pulse"></span>
            <span>Toko Beroperasi Aktif</span>
          </div>
          <RouterLink to="/products" class="btn btn-outline btn-sm topbar-btn">
            Katalog Publik &rarr;
          </RouterLink>
        </div>
      </header>

      <!-- Pane Content Body (Scrollable independently) -->
      <div class="pane-content-body">
        <RouterView v-slot="{ Component }">
          <transition name="pane-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </RouterView>
      </div>

      <!-- Admin Toast Feedback -->
      <transition name="toast-slide">
        <div v-if="adminStore.isToastVisible" class="admin-toast" :class="adminStore.toastType">
          <span class="toast-dot"></span>
          <span>{{ adminStore.toastMessage }}</span>
        </div>
      </transition>
    </main>
  </div>
</template>

<style scoped>
/* ==========================================================================
   MODUL 2: RAIL & PANE SYSTEM
   - Layout Shell: 100vh tanpa scroll horizontal
   - Rail (Sidebar): Fixed width, white background, blue accenting
   - Pane (Content): Flex-1, independent scroll, standard spacing
   ========================================================================== */
.dashboard-shell {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #f8fafc;
}

/* ==========================
   1. RAIL COMPONENT (SIDEBAR)
   ========================== */
.dashboard-rail {
  width: 270px;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-right: 1px solid var(--color-border);
  box-shadow: 2px 0 12px rgba(15, 23, 42, 0.04);
  z-index: 40;
}

/* Rail Header */
.rail-header {
  padding: var(--space-6) var(--space-5);
  border-bottom: 1px solid var(--color-border-light);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.rail-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.rail-brand-icon {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--color-primary) 0%, #1d4ed8 100%);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);
}

.shop-svg {
  width: 20px;
  height: 20px;
}

.rail-brand-info {
  display: flex;
  flex-direction: column;
}

.rail-brand-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.rail-brand-badge {
  font-size: 0.65rem;
  font-weight: 800;
  color: var(--color-primary);
  letter-spacing: 0.08em;
}

.store-status-pill {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.65rem;
  background-color: #eff6ff;
  border: 1px solid rgba(37, 99, 235, 0.15);
  border-radius: var(--radius-sm);
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #10b981;
  flex-shrink: 0;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
}

.status-label {
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Rail Navigation */
.rail-nav {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-4) var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.rail-section-label {
  font-size: 0.68rem;
  font-weight: 800;
  color: var(--color-text-muted);
  letter-spacing: 0.08em;
  padding: var(--space-2) var(--space-3) var(--space-1);
}

.rail-menu-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.rail-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.85rem;
  color: #475569;
  font-size: 0.92rem;
  font-weight: 600;
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
}

.rail-icon {
  width: 19px;
  height: 19px;
  color: #64748b;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.rail-link-text {
  flex: 1;
}

/* Rail Link Hover (Putih-Biru) */
.rail-nav-link:hover {
  background-color: #f1f5f9;
  color: var(--color-primary);
}

.rail-nav-link:hover .rail-icon {
  color: var(--color-primary);
  transform: translateX(1px);
}

/* Rail Link Active (Aksen Biru Utama) */
.rail-nav-link.active {
  background-color: #eff6ff;
  color: var(--color-primary);
  font-weight: 700;
  box-shadow: inset 3px 0 0 0 var(--color-primary);
}

.rail-nav-link.active .rail-icon {
  color: var(--color-primary);
}

.public-store-link {
  color: #64748b;
  border: 1px dashed var(--color-border);
}

.public-store-link:hover {
  border-color: var(--color-primary);
  background-color: #eff6ff;
}

.rail-badge {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-full);
}

.badge-primary-soft {
  background-color: #dbeafe;
  color: var(--color-primary);
}

.badge-warning {
  background-color: #fef3c7;
  color: #b45309;
}

/* Rail Footer */
.rail-footer {
  padding: var(--space-4) var(--space-4);
  border-top: 1px solid var(--color-border-light);
  background-color: #ffffff;
}

.rail-user-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.4rem;
}

.rail-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #eff6ff;
  color: var(--color-primary);
  font-weight: 800;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid rgba(37, 99, 235, 0.2);
}

.rail-user-meta {
  display: flex;
  flex-direction: column;
}

.rail-user-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.2;
}

.rail-user-role {
  font-size: 0.74rem;
  color: var(--color-text-secondary);
}

/* ==========================
   2. PANE COMPONENT (CONTENT)
   ========================== */
.dashboard-pane {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: #f8fafc;
  position: relative;
}

/* Pane Topbar */
.pane-topbar {
  height: 64px;
  flex-shrink: 0;
  background-color: #ffffff;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-8);
  position: sticky;
  top: 0;
  z-index: 30;
}

.topbar-breadcrumb {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.pane-topbar-right {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.quick-status-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: #065f46;
  background-color: #d1fae5;
  padding: 0.3rem 0.75rem;
  border-radius: var(--radius-full);
}

.chip-pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #10b981;
}

.topbar-btn {
  font-size: 0.82rem;
  padding: 0.45rem 0.9rem;
}

/* Pane Content Body */
.pane-content-body {
  flex: 1;
  padding: var(--space-8);
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}

/* Admin Toast */
.admin-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background-color: #0f172a;
  color: #ffffff;
  padding: 0.85rem 1.4rem;
  border-radius: var(--radius-md);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.9rem;
  font-weight: 600;
  z-index: 100;
}

.admin-toast.success {
  background-color: #065f46;
  border-left: 4px solid #10b981;
}

.admin-toast.warning {
  background-color: #78350f;
  border-left: 4px solid #f59e0b;
}

.admin-toast.info {
  background-color: #1e3a8a;
  border-left: 4px solid #3b82f6;
}

.toast-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: currentColor;
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.3s ease;
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

/* Transitions */
.pane-fade-enter-active,
.pane-fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.pane-fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.pane-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .dashboard-shell {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
    overflow-y: auto;
  }

  .dashboard-rail {
    width: 100%;
    height: auto;
  }

  .pane-topbar {
    padding: 0 var(--space-4);
  }

  .pane-content-body {
    padding: var(--space-4);
  }
}
</style>
