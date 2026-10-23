<script setup>
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useEvents } from '@/composables/useEvents'

const cartStore = useCartStore()
const { tickets } = useEvents()
const route = useRoute()
const isMobileMenuOpen = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

// Menutup menu mobile secara otomatis setiap kali rute navigasi berpindah
watch(
  () => route.path,
  () => {
    closeMobileMenu()
  },
)
</script>

<template>
  <header class="navbar-header">
    <div class="container navbar-container">
      <!-- 1. Logo & Brand SHOPNEST (Entry Point Shortcut) -->
      <RouterLink to="/" class="brand-logo" @click="closeMobileMenu" aria-label="SHOPNEST Beranda">
        <div class="brand-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="icon-svg"
          >
            <path
              d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
            />
          </svg>
        </div>
        <div class="brand-text">
          <span class="brand-name">SHOPNEST</span>
          <span class="brand-tag">Online Store</span>
        </div>
      </RouterLink>

      <!-- 2. Menu Navigasi Desktop (Sesuai Site Map) -->
      <nav class="desktop-nav" aria-label="Navigasi Utama">
        <!-- Beranda -->
        <RouterLink to="/" class="nav-link" :class="{ active: route.path === '/' }">
          <svg
            class="nav-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <span>Beranda</span>
        </RouterLink>

        <!-- Produk (Aktif saat di /products atau di child /products/:id) -->
        <RouterLink
          to="/products"
          class="nav-link"
          :class="{ active: route.path.startsWith('/products') }"
        >
          <svg
            class="nav-icon"
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
          <span>Produk</span>
        </RouterLink>

        <!-- Modul 5: Events & Workshop Catalog -->
        <RouterLink
          to="/browse"
          class="nav-link"
          :class="{ active: route.path.startsWith('/browse') || route.path.startsWith('/events') }"
        >
          <svg
            class="nav-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
            />
          </svg>
          <span>Events</span>
        </RouterLink>

        <!-- Modul 5: Your Events (Dengan live ticket count badge) -->
        <RouterLink
          to="/your-events"
          class="nav-link ticket-nav-link"
          :class="{ active: route.path === '/your-events' || route.path.startsWith('/tickets') }"
        >
          <div class="cart-icon-container">
            <svg
              class="nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
              />
            </svg>
            <span v-if="tickets.length > 0" class="ticket-badge">{{ tickets.length }}</span>
          </div>
          <span>Your Events</span>
        </RouterLink>

        <!-- Keranjang (Dengan live counter badge) -->
        <RouterLink
          to="/cart"
          class="nav-link cart-nav-link"
          :class="{ active: route.path === '/cart' }"
        >
          <div class="cart-icon-container">
            <svg
              class="nav-icon"
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
            <span v-if="cartStore.totalItems > 0" class="cart-badge">{{
              cartStore.totalItems
            }}</span>
          </div>
          <span>Keranjang</span>
        </RouterLink>

        <!-- Profil -->
        <RouterLink to="/profile" class="nav-link" :class="{ active: route.path === '/profile' }">
          <svg
            class="nav-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          <span>Profil</span>
        </RouterLink>

        <!-- Modul 5: Organizer Dashboard -->
        <RouterLink
          to="/event-management"
          class="nav-link organizer-nav-link"
          :class="{ active: route.path === '/event-management' }"
          title="Organizer Dashboard Acara"
        >
          <svg
            class="nav-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
            />
          </svg>
          <span>Organizer</span>
        </RouterLink>

        <!-- Modul 2: Admin Toko Dashboard (Rail & Pane) -->
        <RouterLink
          to="/dashboard"
          class="nav-link admin-nav-pill"
          title="Buka Ruang Kerja Admin Toko"
        >
          <svg
            class="nav-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
            />
          </svg>
          <span class="admin-badge-txt">Admin</span>
          <span>Toko</span>
        </RouterLink>
      </nav>

      <!-- 3. Tombol Hamburger Menu (Mobile) -->
      <button
        type="button"
        class="mobile-toggle"
        @click="toggleMobileMenu"
        aria-label="Toggle navigation menu"
        :aria-expanded="isMobileMenuOpen"
      >
        <span class="hamburger-bar" :class="{ open: isMobileMenuOpen }"></span>
      </button>
    </div>

    <!-- 4. Menu Navigasi Mobile Dropdown -->
    <transition name="mobile-slide">
      <div v-if="isMobileMenuOpen" class="mobile-menu">
        <div class="container mobile-menu-inner">
          <RouterLink to="/" class="mobile-nav-link" :class="{ active: route.path === '/' }">
            <svg
              class="mobile-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <span>Beranda</span>
          </RouterLink>

          <RouterLink
            to="/products"
            class="mobile-nav-link"
            :class="{ active: route.path.startsWith('/products') }"
          >
            <svg
              class="mobile-icon"
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
            <span>Produk</span>
          </RouterLink>

          <!-- Modul 5: Events Catalog (Mobile) -->
          <RouterLink
            to="/browse"
            class="mobile-nav-link"
            :class="{ active: route.path.startsWith('/browse') || route.path.startsWith('/events') }"
          >
            <svg
              class="mobile-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
            <span>Events &amp; Workshop</span>
          </RouterLink>

          <!-- Modul 5: Your Events (Mobile) -->
          <RouterLink
            to="/your-events"
            class="mobile-nav-link ticket-nav-link"
            :class="{ active: route.path === '/your-events' || route.path.startsWith('/tickets') }"
          >
            <div class="cart-icon-container">
              <svg
                class="mobile-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                />
              </svg>
              <span v-if="tickets.length > 0" class="ticket-badge">{{ tickets.length }}</span>
            </div>
            <span>Your Events (Tiket)</span>
          </RouterLink>

          <RouterLink
            to="/cart"
            class="mobile-nav-link"
            :class="{ active: route.path === '/cart' }"
          >
            <div class="cart-icon-container">
              <svg
                class="mobile-icon"
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
              <span v-if="cartStore.totalItems > 0" class="cart-badge">{{
                cartStore.totalItems
              }}</span>
            </div>
            <span>Keranjang</span>
          </RouterLink>

          <RouterLink
            to="/profile"
            class="mobile-nav-link"
            :class="{ active: route.path === '/profile' }"
          >
            <svg
              class="mobile-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <span>Profil</span>
          </RouterLink>

          <!-- Modul 5: Organizer Dashboard (Mobile) -->
          <RouterLink
            to="/event-management"
            class="mobile-nav-link"
            :class="{ active: route.path === '/event-management' }"
          >
            <svg
              class="mobile-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
              />
            </svg>
            <span>Organizer Dashboard</span>
          </RouterLink>

          <RouterLink to="/dashboard" class="mobile-nav-link mobile-admin-link">
            <svg
              class="mobile-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
              />
            </svg>
            <span>Admin Kelola Toko</span>
          </RouterLink>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.navbar-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.05);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--nav-height);
}

/* Brand Logo */
.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  user-select: none;
}

.brand-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--color-primary) 0%, #1e40af 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
  transition: transform var(--transition-normal);
}

.brand-logo:hover .brand-icon {
  transform: scale(1.05) rotate(-2deg);
}

.icon-svg {
  width: 22px;
  height: 22px;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.brand-tag {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-primary);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* Desktop Navigation */
.desktop-nav {
  display: none;
  align-items: center;
  gap: 0.25rem;
  flex-wrap: nowrap;
}

@media (min-width: 1024px) {
  .desktop-nav {
    display: flex;
  }
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.75rem;
  color: var(--color-text-secondary);
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  text-decoration: none;
  position: relative;
  white-space: nowrap;
  flex-shrink: 0;
}

@media (min-width: 1024px) and (max-width: 1240px) {
  .nav-link {
    padding: 0.4rem 0.55rem;
    font-size: 0.82rem;
    gap: 0.3rem;
  }
  .desktop-nav {
    gap: 0.15rem;
  }
}

.nav-icon {
  width: 18px;
  height: 18px;
  transition: transform var(--transition-fast);
  flex-shrink: 0;
}

.nav-link:hover {
  color: var(--color-primary);
  background-color: var(--color-primary-light);
}

.nav-link:hover .nav-icon {
  transform: translateY(-1px);
}

/* Active Navigation State */
.nav-link.active {
  color: var(--color-primary);
  background-color: var(--color-primary-light);
  font-weight: 700;
  box-shadow: inset 0 0 0 1px rgba(37, 99, 235, 0.15);
}

/* Cart Badge & Icon */
.cart-icon-container {
  position: relative;
  display: flex;
  align-items: center;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -10px;
  background-color: var(--color-primary);
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.4);
  animation: badgePop 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.ticket-badge {
  position: absolute;
  top: -8px;
  right: -10px;
  background-color: #6644ff;
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 800;
  min-width: 18px;
  height: 18px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  box-shadow: 0 2px 6px rgba(102, 68, 255, 0.4);
  animation: badgePop 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Mobile Toggle Hamburger */
.mobile-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: var(--radius-md);
  background-color: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  cursor: pointer;
  padding: 0;
}

@media (min-width: 1024px) {
  .mobile-toggle {
    display: none;
  }
}

.hamburger-bar {
  position: relative;
  width: 20px;
  height: 2px;
  background-color: var(--color-text);
  transition: all 0.3s ease;
}

.hamburger-bar::before,
.hamburger-bar::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 2px;
  background-color: var(--color-text);
  transition: all 0.3s ease;
}

.hamburger-bar::before {
  transform: translateY(-6px);
}

.hamburger-bar::after {
  transform: translateY(6px);
}

.hamburger-bar.open {
  background-color: transparent;
}

.hamburger-bar.open::before {
  transform: rotate(45deg);
}

.hamburger-bar.open::after {
  transform: rotate(-45deg);
}

/* Mobile Dropdown Menu */
.mobile-menu {
  background-color: #ffffff;
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
}

@media (min-width: 768px) {
  .mobile-menu {
    display: none;
  }
}

.mobile-menu-inner {
  padding-top: 0.75rem;
  padding-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.85rem 1rem;
  color: var(--color-text);
  font-weight: 600;
  font-size: 1rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: background-color var(--transition-fast);
}

.mobile-nav-link:hover,
.mobile-nav-link.active {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  font-weight: 700;
}

.mobile-icon {
  width: 22px;
  height: 22px;
}

.mobile-slide-enter-active,
.mobile-slide-leave-active {
  transition: all 0.25s ease-out;
}

.mobile-slide-enter-from,
.mobile-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Modul 2: Admin Toko Pill Button (Tema Putih - Biru) */
.admin-nav-pill {
  background-color: #eff6ff;
  border: 1px solid rgba(37, 99, 235, 0.2);
  color: var(--color-primary);
  margin-left: 0.5rem;
  padding: 0.45rem 0.85rem;
}

.admin-nav-pill:hover {
  background-color: var(--color-primary);
  color: #ffffff !important;
  border-color: var(--color-primary);
}

.admin-nav-pill:hover .admin-badge-txt {
  background-color: #ffffff;
  color: var(--color-primary);
}

.admin-badge-txt {
  background-color: var(--color-primary);
  color: #ffffff;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 1px 5px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-right: -2px;
}

.mobile-admin-link {
  background-color: #eff6ff;
  border: 1px solid rgba(37, 99, 235, 0.2);
  color: var(--color-primary);
  margin-top: 0.35rem;
}
</style>
