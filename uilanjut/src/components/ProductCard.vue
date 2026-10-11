<script setup>
import { RouterLink } from 'vue-router'
import { formatRupiah } from '@/data/products'
import { useCartStore } from '@/stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const cartStore = useCartStore()

function handleAddToCart(event) {
  event.preventDefault()
  event.stopPropagation()
  cartStore.addToCart(props.product, 1)
}
</script>

<template>
  <div class="product-card card card-hover">
    <!-- Image Area with Router Link -->
    <RouterLink :to="`/products/${product.id}`" class="product-image-wrap">
      <img :src="product.image" :alt="product.name" class="product-image" loading="lazy" />
      <span v-if="product.badge" class="product-tag">{{ product.badge }}</span>
      <span v-else class="product-category-tag">{{ product.category }}</span>
    </RouterLink>

    <!-- Content Area -->
    <div class="product-info">
      <!-- Category & Rating -->
      <div class="product-meta">
        <span class="product-category">{{ product.category }}</span>
        <div class="product-rating">
          <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
          </svg>
          <span class="rating-value">{{ product.rating }}</span>
          <span class="reviews-count">({{ product.reviewsCount }})</span>
        </div>
      </div>

      <!-- Product Title -->
      <h3 class="product-title">
        <RouterLink :to="`/products/${product.id}`" class="title-link">
          {{ product.name }}
        </RouterLink>
      </h3>

      <!-- Price Block -->
      <div class="product-price-row">
        <div class="price-container">
          <span class="current-price">{{ formatRupiah(product.price) }}</span>
          <span v-if="product.originalPrice" class="original-price">
            {{ formatRupiah(product.originalPrice) }}
          </span>
        </div>
        <span class="stock-status" :class="{ 'low-stock': product.stock <= 10 }">
          Stok: {{ product.stock }}
        </span>
      </div>

      <!-- Action Buttons -->
      <div class="product-actions">
        <RouterLink :to="`/products/${product.id}`" class="btn btn-secondary btn-sm btn-detail">
          <span>Lihat Detail</span>
          <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </RouterLink>

        <button 
          type="button" 
          class="btn btn-primary btn-sm btn-add-cart" 
          @click="handleAddToCart"
          title="Tambah ke Keranjang"
          aria-label="Tambah ke Keranjang"
        >
          <svg class="cart-btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Keranjang</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}

.product-image-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background-color: #f1f5f9;
  display: block;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.product-card:hover .product-image {
  transform: scale(1.06);
}

.product-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: var(--color-primary);
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-full);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  letter-spacing: 0.02em;
}

.product-category-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(4px);
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-full);
}

.product-info {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.product-category {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
}

.star-icon {
  width: 14px;
  height: 14px;
  color: #f59e0b;
}

.rating-value {
  font-weight: 700;
  color: var(--color-text);
}

.reviews-count {
  color: var(--color-text-muted);
  font-size: 0.75rem;
}

.product-title {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.8em;
}

.title-link {
  color: var(--color-text);
  transition: color var(--transition-fast);
}

.title-link:hover {
  color: var(--color-primary);
}

.product-price-row {
  margin-top: auto;
  padding-top: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.price-container {
  display: flex;
  flex-direction: column;
}

.current-price {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-primary);
  letter-spacing: -0.01em;
}

.original-price {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  text-decoration: line-through;
}

.stock-status {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  background-color: var(--color-surface-alt);
  padding: 0.15rem 0.45rem;
  border-radius: var(--radius-xs);
}

.stock-status.low-stock {
  color: #b45309;
  background-color: #fef3c7;
}

.product-actions {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 0.5rem;
}

.btn-detail {
  font-size: 0.8rem;
  padding: 0.55rem 0.6rem;
  gap: 0.35rem;
}

.arrow-icon {
  width: 14px;
  height: 14px;
}

.btn-add-cart {
  font-size: 0.8rem;
  padding: 0.55rem 0.6rem;
  gap: 0.35rem;
}

.cart-btn-icon {
  width: 14px;
  height: 14px;
}
</style>
