<script setup>
import EmptyState from '@/components/EmptyState.vue'
</script>

<template>
  <div class="not-found-view section">
    <div class="container not-found-container">
      <EmptyState 
        title="Halaman Tidak Ditemukan (404)" 
        message="Halaman atau rute yang Anda tuju tidak tersedia di struktur Site Map SHOPNEST. Silakan kembali ke Beranda utama." 
        icon="404"
        action-text="Kembali ke Beranda"
        action-to="/"
      />
    </div>
  </div>
</template>

<style scoped>
.not-found-view {
  padding-top: 4rem;
  padding-bottom: 6rem;
}

.not-found-container {
  max-width: 600px;
  margin: 0 auto;
}
</style>
