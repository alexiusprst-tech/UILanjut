<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import ToastNotification from '@/components/ToastNotification.vue'
</script>

<template>
  <div class="app-layout">
    <Navbar />
    <main class="main-content">
      <slot>
        <RouterView />
      </slot>
    </main>
    <Footer />
    <ToastNotification />
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  width: 100%;
}
</style>
