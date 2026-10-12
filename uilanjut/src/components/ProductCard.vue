<script setup>
import { RouterLink } from 'vue-router'
import { formatRupiah } from '@/data/products'
import { useCartStore } from '@/stores/cart'
import AppCard from '@/components/ui/AppCard.vue'
import AppButton from '@/components/ui/AppButton.vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['add-to-cart', 'view-detail'])

const cartStore = useCartStore()

function handleAddToCart(event) {
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  cartStore.addToCart(props.product, 1)
  emit('add-to-cart', props.product)
}

function handleViewDetail() {
  emit('view-detail', props.product.id)
}

const fallbackImage =
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'

function onImageError(event) {
  event.target.src = fallbackImage
}
</script>

<template>
  <AppCard class="product-card">
    <!-- Image Area with Router Link -->
    <RouterLink :to="`/products/${product.id}`" class="product-image-wrap" @click="handleViewDetail">
      <img
        :src="product.image"
        :alt="product.name"
        class="product-image"
        loading="lazy"
        @error="onImageError"
      />
      <span v-if="product.badge" class="product-tag">{{ product.badge }}</span>
      <span v-else class="product-category-tag">{{ product.category }}</span>
    </RouterLink>

    <!-- Content Area -->
    <div class="product-info">
      <!-- Category & Rating -->
      <div class="product-meta">
        <span class="product-category">{{ product.category }}</span>
        <div class="product-rating">
          <svg
            class="star-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="rating-value">{{ product.rating }}</span>
          <span class="reviews-count">({{ product.reviewsCount }})</span>
        </div>
      </div>

      <!-- Product Title -->
      <h3 class="product-title">
        <RouterLink :to="`/products/${product.id}`" class="title-link" @click="handleViewDetail">
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

      <!-- Action Buttons via Universal AppButton -->
      <div class="product-actions">
        <RouterLink :to="`/products/${product.id}`" class="detail-link-wrap" @click="handleViewDetail">
          <AppButton variant="secondary" size="sm" class="btn-detail-app">
            <span>Detail</span>
            <svg
              class="arrow-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </AppButton>
        </RouterLink>

        <AppButton
          variant="primary"
          size="sm"
          class="btn-add-cart-app"
          title="Tambah ke Keranjang"
          @click="handleAddToCart"
        >
          <svg
            class="cart-btn-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Keranjang</span>
        </AppButton>
      </div>
    </div>
  </AppCard>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
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
  transition: transform var(--transition-slow, 0.3s ease);
}

.product-card:hover .product-image {
  transform: scale(1.06);
}

.product-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: var(--color-primary, #6644ff);
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-full, 9999px);
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
  border-radius: var(--radius-full, 9999px);
}

.product-info {
  padding: var(--space-6, 24px);
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
  color: var(--color-primary, #6644ff);
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
  width: 0.95rem;
  height: 0.95rem;
  color: #f59e0b;
}

.rating-value {
  font-weight: 700;
  color: var(--color-text, #1c1948);
}

.reviews-count {
  color: var(--color-text-muted, #94a3b8);
  font-size: 0.75rem;
}

.product-title {
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.8em;
}

.title-link {
  color: var(--color-text, #1c1948);
  text-decoration: none;
  transition: color var(--transition-fast, 0.15s ease);
}

.title-link:hover {
  color: var(--color-primary, #6644ff);
}

.product-price-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: auto;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border-subtle, #f1f5f9);
}

.price-container {
  display: flex;
  flex-direction: column;
}

.current-price {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-primary, #6644ff);
  letter-spacing: -0.01em;
}

.original-price {
  font-size: 0.8rem;
  color: var(--color-text-muted, #94a3b8);
  text-decoration: line-through;
}

.stock-status {
  font-size: 0.75rem;
  font-weight: 600;
  color: #10b981;
}

.stock-status.low-stock {
  color: #ef4444;
}

.product-actions {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 0.5rem;
  margin-top: 1rem;
}

.detail-link-wrap {
  text-decoration: none;
  display: flex;
}

.btn-detail-app {
  width: 100%;
}

.btn-add-cart-app {
  width: 100%;
}

.arrow-icon,
.cart-btn-icon {
  width: 0.95rem;
  height: 0.95rem;
}
</style>
