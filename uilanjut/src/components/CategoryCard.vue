<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  category: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <RouterLink
    :to="{
      path: '/products',
      query: { category: category.id !== 'all' ? category.id : undefined },
    }"
    class="category-card card card-hover"
  >
    <div class="category-icon-box">
      <!-- Electronics Icon -->
      <svg
        v-if="category.id === 'Electronics'"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        stroke="currentColor"
        class="cat-icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75v-9a.75.75 0 0 1 .75-.75Z"
        />
      </svg>
      <!-- Fashion Icon -->
      <svg
        v-else-if="category.id === 'Fashion'"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        stroke="currentColor"
        class="cat-icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>
      <!-- Accessories Icon -->
      <svg
        v-else-if="category.id === 'Accessories'"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        stroke="currentColor"
        class="cat-icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      <!-- Home Icon -->
      <svg
        v-else-if="category.id === 'Home'"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        stroke="currentColor"
        class="cat-icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
      <!-- Default Grid Icon -->
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        stroke="currentColor"
        class="cat-icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
        />
      </svg>
    </div>

    <div class="category-text">
      <h3 class="category-name">{{ category.name }}</h3>
      <p v-if="category.description" class="category-desc">{{ category.description }}</p>
    </div>

    <div class="category-arrow">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="arrow-svg"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    </div>
  </RouterLink>
</template>

<style scoped>
.category-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem 1.5rem;
  text-decoration: none;
}

.category-icon-box {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-md);
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all var(--transition-normal);
}

.category-card:hover .category-icon-box {
  background-color: var(--color-primary);
  color: #ffffff;
  transform: scale(1.08);
}

.cat-icon {
  width: 26px;
  height: 26px;
}

.category-text {
  flex: 1;
}

.category-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.2rem;
}

.category-desc {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.4;
}

.category-arrow {
  color: var(--color-text-muted);
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
}

.arrow-svg {
  width: 18px;
  height: 18px;
}

.category-card:hover .category-arrow {
  color: var(--color-primary);
  transform: translateX(4px);
}
</style>
