<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { getProductById, getRelatedProducts, formatRupiah } from '@/data/products'
import { useCartStore } from '@/stores/cart'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import ProductCard from '@/components/ProductCard.vue'
import EmptyState from '@/components/EmptyState.vue'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const quantity = ref(1)
const activeImageIndex = ref(0)

// Fetch product based on route.params.id
const product = computed(() => {
  const id = route.params.id
  return getProductById(id)
})

// Reset quantity & active image when route parameter changes
watch(
  () => route.params.id,
  () => {
    quantity.value = 1
    activeImageIndex.value = 0
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
)

// Related products
const relatedProducts = computed(() => {
  if (!product.value) return []
  return getRelatedProducts(product.value.id, product.value.category, 4)
})

// Breadcrumbs items
const breadcrumbItems = computed(() => {
  if (!product.value) {
    return [
      { label: 'Beranda', to: '/' },
      { label: 'Produk', to: '/products' },
      { label: 'Produk Tidak Ditemukan' },
    ]
  }
  return [
    { label: 'Beranda', to: '/' },
    { label: 'Produk', to: '/products' },
    { 
      label: product.value.category, 
      to: { path: '/products', query: { category: product.value.category } } 
    },
    { label: product.value.name },
  ]
})

// Quantity handlers
function incrementQty() {
  if (product.value && quantity.value < product.value.stock) {
    quantity.value++
  } else if (product.value) {
    cartStore.showToast(`Batas stok maksimal adalah ${product.value.stock} unit`, 'warning')
  }
}

function decrementQty() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

function handleQtyInput(event) {
  const val = parseInt(event.target.value, 10)
  if (isNaN(val) || val < 1) {
    quantity.value = 1
  } else if (product.value && val > product.value.stock) {
    quantity.value = product.value.stock
  } else {
    quantity.value = val
  }
}

// Add to Cart Action
function handleAddToCart() {
  if (!product.value) return
  cartStore.addToCart(product.value, quantity.value)
}

function handleBuyNow() {
  if (!product.value) return
  cartStore.addToCart(product.value, quantity.value)
  router.push('/cart')
}
</script>

<template>
  <div class="product-detail-view section">
    <div class="container">
      <!-- Breadcrumb Navigation -->
      <Breadcrumbs :items="breadcrumbItems" />

      <!-- Case 1: Product Found -->
      <div v-if="product" class="product-detail-content">
        <!-- Main Product Card / Detail Grid -->
        <div class="detail-grid card">
          <!-- Left: Image Gallery Showcase -->
          <div class="gallery-column">
            <div class="main-image-container">
              <img 
                :src="product.images ? product.images[activeImageIndex] : product.image" 
                :alt="product.name" 
                class="main-product-image"
              />
              <span v-if="product.badge" class="detail-badge">{{ product.badge }}</span>
            </div>

            <!-- Thumbnail Selector (if multiple images) -->
            <div v-if="product.images && product.images.length > 1" class="thumbnails-row">
              <button 
                v-for="(img, idx) in product.images" 
                :key="idx" 
                type="button"
                class="thumbnail-btn"
                :class="{ 'active': activeImageIndex === idx }"
                @click="activeImageIndex = idx"
              >
                <img :src="img" :alt="`${product.name} thumb ${idx + 1}`" class="thumb-img" />
              </button>
            </div>
          </div>

          <!-- Right: Product Information & Purchase Controls -->
          <div class="info-column">
            <!-- Category & ID Tag -->
            <div class="info-header-meta">
              <RouterLink 
                :to="{ path: '/products', query: { category: product.category } }"
                class="badge badge-primary category-link"
              >
                {{ product.category }}
              </RouterLink>
              <span class="product-id-tag">ID: #{{ product.id }}</span>
            </div>

            <!-- Title -->
            <h1 class="detail-title">{{ product.name }}</h1>

            <!-- Rating & Review Count -->
            <div class="detail-rating-row">
              <div class="stars-wrap">
                <svg 
                  v-for="star in 5" 
                  :key="star" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  class="star-svg"
                  :class="{ 'star-muted': star > Math.round(product.rating) }"
                >
                  <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="detail-rating-score">{{ product.rating }}</span>
              <span class="rating-dot">•</span>
              <span class="detail-review-count">{{ product.reviewsCount }} Ulasan Pembeli</span>
              <span class="rating-dot">•</span>
              <span class="terjual-text">Terjual 350+</span>
            </div>

            <!-- Price Box -->
            <div class="detail-price-box">
              <div class="price-wrap">
                <span class="detail-current-price">{{ formatRupiah(product.price) }}</span>
                <span v-if="product.originalPrice" class="detail-original-price">
                  {{ formatRupiah(product.originalPrice) }}
                </span>
              </div>
              <div class="stock-badge-wrap">
                <span class="stock-pill" :class="{ 'warning': product.stock <= 10 }">
                  <span class="stock-dot"></span>
                  <span>Stok Tersedia (Sisa {{ product.stock }} unit)</span>
                </span>
              </div>
            </div>

            <!-- Description -->
            <div class="detail-desc-box">
              <h3 class="desc-heading">Deskripsi Produk</h3>
              <p class="desc-text">{{ product.description }}</p>
            </div>

            <!-- Highlights / Features -->
            <div v-if="product.features && product.features.length" class="detail-features-box">
              <h3 class="features-heading">Spesifikasi &amp; Keunggulan</h3>
              <ul class="features-list">
                <li v-for="(feat, fIdx) in product.features" :key="fIdx" class="feature-item">
                  <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span>{{ feat }}</span>
                </li>
              </ul>
            </div>

            <!-- Purchase & Quantity Controls -->
            <div class="purchase-section">
              <div class="qty-control-row">
                <span class="qty-label">Jumlah:</span>
                <div class="qty-selector">
                  <button 
                    type="button" 
                    class="qty-btn" 
                    :disabled="quantity <= 1"
                    @click="decrementQty"
                    aria-label="Kurangi jumlah"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="qty-icon">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                    </svg>
                  </button>
                  <input 
                    type="number" 
                    :value="quantity" 
                    min="1" 
                    :max="product.stock" 
                    class="qty-input"
                    @input="handleQtyInput"
                  />
                  <button 
                    type="button" 
                    class="qty-btn" 
                    :disabled="quantity >= product.stock"
                    @click="incrementQty"
                    aria-label="Tambah jumlah"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="qty-icon">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>
                <span class="subtotal-calc">
                  Subtotal: <strong>{{ formatRupiah(product.price * quantity) }}</strong>
                </span>
              </div>

              <!-- Action Buttons -->
              <div class="detail-action-buttons">
                <button 
                  type="button" 
                  class="btn btn-primary btn-lg btn-add-cart-detail" 
                  @click="handleAddToCart"
                >
                  <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  <span>Tambah ke Keranjang</span>
                </button>

                <button 
                  type="button" 
                  class="btn btn-outline btn-lg btn-buy-now" 
                  @click="handleBuyNow"
                >
                  <span>Beli Langsung</span>
                </button>
              </div>

              <!-- Back to Catalog Link -->
              <div class="back-link-wrap">
                <RouterLink to="/products" class="back-link">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="back-arrow">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                  <span>Kembali ke Daftar Produk</span>
                </RouterLink>
              </div>
            </div>

            <!-- Guarantee Badges -->
            <div class="guarantee-row">
              <div class="guarantee-item">
                <svg class="g-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
                <span>Garansi Resmi 100% Original</span>
              </div>
              <div class="guarantee-item">
                <svg class="g-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                <span>7 Hari Pengembalian Barang</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Products Section (Parent-Child navigation showcase) -->
        <div v-if="relatedProducts.length > 0" class="related-section">
          <div class="section-header">
            <h2 class="section-title" style="font-size: 1.5rem;">Produk Terkait dalam Kategori {{ product.category }}</h2>
            <RouterLink 
              :to="{ path: '/products', query: { category: product.category } }" 
              class="view-all-link"
            >
              <span>Lihat Kategori Lengkap</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="link-arrow">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </RouterLink>
          </div>

          <div class="products-grid">
            <ProductCard 
              v-for="rel in relatedProducts" 
              :key="rel.id" 
              :product="rel" 
            />
          </div>
        </div>
      </div>

      <!-- Case 2: Product Not Found (Invalid ID) -->
      <div v-else class="not-found-container">
        <EmptyState 
          title="Produk Tidak Ditemukan" 
          message="Produk dengan ID yang Anda cari tidak tersedia di sistem atau mungkin telah dihapus dari katalog." 
          icon="404"
          action-text="Kembali ke Katalog Produk"
          action-to="/products"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-detail-view {
  padding-top: 2rem;
  padding-bottom: 4rem;
}

/* Detail Card Layout */
.detail-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  padding: 1.5rem;
  background-color: #ffffff;
  margin-bottom: 3.5rem;
}

@media (min-width: 1024px) {
  .detail-grid {
    grid-template-columns: 1.05fr 1.35fr;
    padding: 2.5rem;
    gap: 3rem;
  }
}

/* Gallery Column */
.gallery-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background-color: #f1f5f9;
  border: 1px solid var(--color-border);
}

.main-product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  background-color: var(--color-primary);
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-full);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.thumbnails-row {
  display: flex;
  gap: 0.75rem;
}

.thumbnail-btn {
  width: 72px;
  height: 72px;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 2px solid var(--color-border);
  background: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  padding: 0;
}

.thumbnail-btn:hover,
.thumbnail-btn.active {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Info Column */
.info-column {
  display: flex;
  flex-direction: column;
}

.info-header-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.category-link {
  text-decoration: none;
  transition: opacity var(--transition-fast);
}

.category-link:hover {
  opacity: 0.85;
}

.product-id-tag {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  font-weight: 600;
}

.detail-title {
  font-size: 1.85rem;
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.25;
  letter-spacing: -0.02em;
  margin-bottom: 0.85rem;
}

@media (min-width: 768px) {
  .detail-title {
    font-size: 2.25rem;
  }
}

/* Rating Row */
.detail-rating-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.stars-wrap {
  display: flex;
  gap: 2px;
}

.star-svg {
  width: 17px;
  height: 17px;
  color: #f59e0b;
}

.star-svg.star-muted {
  color: var(--color-border);
}

.detail-rating-score {
  font-weight: 800;
  color: var(--color-text);
}

.rating-dot {
  color: var(--color-text-muted);
}

.detail-review-count {
  color: var(--color-text-secondary);
  font-weight: 500;
}

.terjual-text {
  color: var(--color-primary);
  font-weight: 600;
}

/* Price Box */
.detail-price-box {
  background-color: var(--color-surface-alt);
  border-radius: var(--radius-lg);
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 640px) {
  .detail-price-box {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.price-wrap {
  display: flex;
  align-items: baseline;
  gap: 0.85rem;
}

.detail-current-price {
  font-size: 1.85rem;
  font-weight: 800;
  color: var(--color-primary);
  letter-spacing: -0.02em;
}

.detail-original-price {
  font-size: 1.05rem;
  color: var(--color-text-muted);
  text-decoration: line-through;
}

.stock-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #15803d;
  background-color: #dcfce7;
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-full);
}

.stock-pill.warning {
  color: #b45309;
  background-color: #fef3c7;
}

.stock-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: currentColor;
}

/* Description */
.detail-desc-box {
  margin-bottom: 1.5rem;
}

.desc-heading {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.desc-text {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
}

/* Features */
.detail-features-box {
  margin-bottom: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.features-heading {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.75rem;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.check-icon {
  width: 18px;
  height: 18px;
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 2px;
}

/* Purchase Section */
.purchase-section {
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  margin-bottom: 1.5rem;
}

.qty-control-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.qty-label {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-text);
}

.qty-selector {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: #ffffff;
  overflow: hidden;
}

.qty-btn {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-surface-alt);
  color: var(--color-text);
  transition: background-color var(--transition-fast);
}

.qty-btn:hover:not(:disabled) {
  background-color: var(--color-border);
}

.qty-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.qty-icon {
  width: 16px;
  height: 16px;
}

.qty-input {
  width: 50px;
  height: 38px;
  text-align: center;
  border: none;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--color-text);
  outline: none;
}

/* Remove spin buttons */
.qty-input::-webkit-outer-spin-button,
.qty-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.subtotal-calc {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
}

.subtotal-calc strong {
  color: var(--color-primary);
  font-size: 1.05rem;
}

.detail-action-buttons {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

@media (min-width: 640px) {
  .detail-action-buttons {
    grid-template-columns: 1.5fr 1fr;
  }
}

.btn-add-cart-detail {
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.28);
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.back-link-wrap {
  margin-top: 0.75rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-secondary);
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color var(--transition-fast), transform var(--transition-fast);
}

.back-link:hover {
  color: var(--color-primary);
  transform: translateX(-3px);
}

.back-arrow {
  width: 16px;
  height: 16px;
}

/* Guarantee row */
.guarantee-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  padding: 1rem;
  background-color: var(--color-surface-alt);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

@media (min-width: 640px) {
  .guarantee-row {
    grid-template-columns: 1fr 1fr;
  }
}

.guarantee-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.g-icon {
  width: 18px;
  height: 18px;
  color: var(--color-primary);
  flex-shrink: 0;
}

/* Related section */
.related-section {
  margin-top: 3.5rem;
}

.products-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.not-found-container {
  max-width: 600px;
  margin: 3rem auto;
}
</style>
