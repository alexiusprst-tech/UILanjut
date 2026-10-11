<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import ToastNotification from '@/components/ToastNotification.vue'
</script>

<template>
  <div id="app">
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
  transition: opacity 0.2s ease, transform 0.2s ease;
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
