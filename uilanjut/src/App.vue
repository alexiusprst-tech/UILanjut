<script setup>
import { computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import ToastNotification from '@/components/ToastNotification.vue'

const route = useRoute()
const isDashboard = computed(() => route.meta.layout === 'dashboard')
</script>

<template>
  <!-- Modul 2: Layout 1 - Admin Toko Rail & Pane (Full 100vh Shell) -->
  <div v-if="isDashboard" id="dashboard-app-wrapper">
    <RouterView />
  </div>

  <!-- Layout 2 - Public Storefront Layout (Navbar, Main Content, Footer) -->
  <div v-else id="app">
    <!-- Main Global Navbar -->
    <Navbar />

    <!-- Active Route View -->
    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <!-- Global Footer -->
    <Footer />

    <!-- Global Toast Notification Feedback -->
    <ToastNotification />
  </div>
</template>

<style scoped>
.page-fade-enter-active,
.page-fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
