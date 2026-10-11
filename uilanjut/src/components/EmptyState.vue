<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  title: {
    type: String,
    default: 'Data Tidak Ditemukan',
  },
  message: {
    type: String,
    default: 'Maaf, tidak ada informasi yang dapat ditampilkan saat ini.',
  },
  icon: {
    type: String,
    default: 'default', // 'cart', 'search', '404', 'default'
  },
  actionText: {
    type: String,
    default: 'Mulai Belanja',
  },
  actionTo: {
    type: String,
    default: '/products',
  },
  showAction: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div class="empty-state-card card">
    <div class="empty-icon-wrap">
      <!-- Cart Empty Icon -->
      <svg v-if="icon === 'cart'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="empty-svg">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>

      <!-- Search Empty Icon -->
      <svg v-else-if="icon === 'search'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="empty-svg">
        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>

      <!-- 404 Not Found Icon -->
      <svg v-else-if="icon === '404'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="empty-svg">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>

      <!-- Default Folder Empty Icon -->
      <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="empty-svg">
        <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
    </div>

    <h3 class="empty-title">{{ title }}</h3>
    <p class="empty-message">{{ message }}</p>

    <div v-if="showAction" class="empty-action">
      <RouterLink :to="actionTo" class="btn btn-primary btn-lg">
        <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
        <span>{{ actionText }}</span>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.empty-state-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3.5rem 2rem;
  background-color: #ffffff;
}

.empty-icon-wrap {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-full);
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.12);
}

.empty-svg {
  width: 40px;
  height: 40px;
}

.empty-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.empty-message {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  max-width: 440px;
  line-height: 1.5;
  margin-bottom: 2rem;
}

.btn-icon {
  width: 18px;
  height: 18px;
}
</style>
