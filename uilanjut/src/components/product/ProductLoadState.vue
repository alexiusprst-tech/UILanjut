<script setup>
import AppButton from '@/components/ui/AppButton.vue'
defineProps({ loading: Boolean, error: String, count: { type: Number, default: 6 } })
defineEmits(['retry'])
</script>

<template>
  <div v-if="loading" class="api-skeleton-grid" role="status" aria-live="polite" aria-busy="true">
    <span class="api-sr-only">Memuat produk dari server...</span>
    <div v-for="n in count" :key="n" class="api-skeleton-card" aria-hidden="true">
      <div class="api-skeleton api-skeleton-image"></div>
      <div class="api-skeleton api-skeleton-line"></div>
      <div class="api-skeleton api-skeleton-line short"></div>
    </div>
  </div>
  <div v-else-if="error" class="api-error-state" role="alert">
    <span aria-hidden="true">⚠</span>
    <h2>Produk belum berhasil dimuat</h2>
    <p>{{ error }}</p>
    <AppButton variant="primary" size="sm" @click="$emit('retry')">Coba Lagi</AppButton>
  </div>
</template>
