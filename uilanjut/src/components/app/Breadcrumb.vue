<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  items: {
    type: Array,
    required: true,
    // Format: [{ label: 'Beranda', to: '/' }, { label: 'Produk', to: '/products' }, { label: 'Laptop ASUS' }]
  },
})
</script>

<template>
  <nav class="breadcrumb-nav" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
      <li v-for="(item, index) in items" :key="index" class="breadcrumb-item">
        <!-- If item has a destination link and is not the last item -->
        <RouterLink
          v-if="item.to && index < items.length - 1"
          :to="item.to"
          class="breadcrumb-link"
        >
          <svg
            v-if="index === 0"
            class="home-icon"
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
          <span>{{ item.label }}</span>
        </RouterLink>

        <!-- If item is current active destination -->
        <span v-else class="breadcrumb-current" aria-current="page">
          {{ item.label }}
        </span>

        <!-- Separator slash icon -->
        <svg
          v-if="index < items.length - 1"
          class="separator-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumb-nav {
  margin-bottom: 1.5rem;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.35rem;
  font-size: 0.85rem;
}

.breadcrumb-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.breadcrumb-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--color-text-secondary);
  font-weight: 500;
  transition: color var(--transition-fast);
  text-decoration: none;
}

.breadcrumb-link:hover {
  color: var(--color-primary);
}

.home-icon {
  width: 14px;
  height: 14px;
}

.breadcrumb-current {
  color: var(--color-text);
  font-weight: 600;
  max-width: 260px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (min-width: 640px) {
  .breadcrumb-current {
    max-width: 400px;
  }
}

.separator-icon {
  width: 12px;
  height: 12px;
  color: var(--color-text-muted);
  flex-shrink: 0;
}
</style>
