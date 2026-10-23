<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { formatRupiah } from '@/data/products'
import { useProducts } from '@/composables/useProducts'
import { useCartStore } from '@/stores/cart'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import ProductCard from '@/components/ProductCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppButton from '@/components/ui/AppButton.vue'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const { getProductById, products } = useProducts()

const quantity = ref(1)
const activeImageIndex = ref(0)

// Fetch product based on route.params.id from centralized state
// Produk nonaktif otomatis disembunyikan dari halaman publik
const product = computed(() => {
  const found = getProductById(route.params.id)
  return found && found.status !== 'inactive' ? found : undefined
})

// Reset quantity & active image when route parameter changes
watch(
  () => route.params.id,
  () => {
    quantity.value = 1
    activeImageIndex.value = 0
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
)

// Related products derived from centralized products state
const relatedProducts = computed(() => {
  if (!product.value) return []
  const currentId = Number(product.value.id)
  return products.value
    .filter((p) => p.id !== currentId && p.category === product.value.category && p.status !== 'inactive')
    .slice(0, 4)
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
      to: { path: '/products', query: { category: product.value.category } },
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

const fallbackImage =
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'

function onImgError(event) {
  event.target.src = fallbackImage
}
</script>

<template>
  <div class="product-detail-view section">
    <div class="container">
      <!-- Breadcrumb Navigation -->
      <Breadcrumbs :items="breadcrumbItems" />

      <!-- Case 1: Product Found -->
      <div v-if="product" class="product-detail-page">
        <!-- Detail Header -->
        <AppButton variant="secondary" size="sm" class="btn-back" @click="$router.push('/products')">
          &larr; Kembali ke Daftar Produk
        </AppButton>

        <div class="detail-header">
          <span class="product-tag-pill">{{ product.category }}</span>
          <h1 class="header-product-title">{{ product.name }}</h1>
          <div class="meta-info">
            <span class="meta-item"
              >⭐ Rating: {{ product.rating }} ({{ product.reviewsCount }} ulasan)</span
            >
            <span class="meta-item">📦 Stok: {{ product.stock }} unit</span>
            <span class="meta-item">🏷️ ID: #{{ product.id }}</span>
            <span class="meta-item">🚚 Siap Kirim Hari Ini</span>
          </div>
        </div>

        <!-- ===================================================================
             MODUL 2: ASYMMETRICAL LAYOUT (2fr : 1fr)
             2/3 Area Kiri: Deskripsi & Spesifikasi Terstruktur (F-Pattern)
             1/3 Area Kanan: Panel Transaksi Sticky (Focal Point & Squint Test)
             =================================================================== -->
        <div class="detail-content grid-asymmetric">
          <!-- F-PATTERN: Kolom Kiri (2fr) -->
          <div class="main-desc">
            <!-- Image Gallery Showcase -->
            <div class="gallery-card card">
              <div class="main-image-container">
                <img
                  :src="product.images ? product.images[activeImageIndex] : product.image"
                  :alt="product.name"
                  class="main-product-image"
                  @error="onImgError"
                />
                <span v-if="product.badge" class="detail-badge">{{ product.badge }}</span>
              </div>

              <!-- Thumbnail Selector -->
              <div v-if="product.images && product.images.length > 1" class="thumbnails-row">
                <button
                  v-for="(img, idx) in product.images"
                  :key="idx"
                  type="button"
                  class="thumbnail-btn"
                  :class="{ active: activeImageIndex === idx }"
                  @click="activeImageIndex = idx"
                >
                  <img
                    :src="img"
                    :alt="`${product.name} thumb ${idx + 1}`"
                    class="thumb-img"
                    @error="onImgError"
                  />
                </button>
              </div>
            </div>

            <!-- F-Pattern Section 1: Deskripsi Paragraf -->
            <h2>Deskripsi Lengkap Produk</h2>
            <p>{{ product.description }}</p>
            <p>
              Dapatkan pengalaman belanja terbaik dengan jaminan keaslian 100% dan garansi resmi.
              Produk {{ product.name }} dirancang menggunakan material terbaik dan standar kendali
              mutu tinggi untuk memastikan keawetan, kenyamanan pemakaian, serta kepuasan maksimal
              Anda.
            </p>

            <!-- F-Pattern Section 2: Spesifikasi & Keunggulan (Bullet Points) -->
            <h2>Spesifikasi &amp; Keunggulan Produk</h2>
            <ul class="agenda-list">
              <li v-for="(feat, fIdx) in product.features" :key="fIdx">
                <strong>Keunggulan {{ fIdx + 1 }}:</strong> {{ feat }}
              </li>
              <li>
                <strong>Garansi:</strong> 1 Tahun Garansi Resmi Distributor SHOPNEST Indonesia
              </li>
              <li>
                <strong>Pengiriman:</strong> Tersedia kurir Instant (2 jam), Sameday, dan Reguler
                Bebas Ongkir
              </li>
            </ul>

            <!-- F-Pattern Section 3: Ringkasan Ulasan Pembeli -->
            <h2>Ulasan Pelanggan Terverifikasi</h2>
            <div class="review-summary-card card">
              <div class="rating-large-score">
                <span class="rating-num">{{ product.rating }}</span>
                <span class="rating-max">/ 5.0</span>
              </div>
              <div class="rating-text-block">
                <p class="rating-highlight">Kepuasan Pembeli Sangat Baik (98% Positif)</p>
                <p class="rating-sub">
                  Dihitung dari total {{ product.reviewsCount }} pembeli yang telah menerima barang
                  dengan status transaksi selesai.
                </p>
              </div>
            </div>
          </div>

          <!-- FOCAL POINT & STICKY PANE: Kolom Kanan (1fr) -->
          <div class="sidebar">
            <AppCard :hoverable="false" class="ticket-card sticky-pane">
              <span class="pane-tag">TRANSAKSI LANGSUNG</span>
              <h3 class="pane-title">Atur Pesanan</h3>

              <!-- Price -->
              <p class="price">{{ formatRupiah(product.price) }}</p>
              <div v-if="product.originalPrice" class="original-price-wrap">
                <span class="price-strikethrough">{{ formatRupiah(product.originalPrice) }}</span>
                <span class="discount-badge">Diskon Spesial</span>
              </div>
              <p class="ticket-desc">Stok tersedia dan siap dikemas langsung.</p>

              <!-- Quantity Selector -->
              <div class="qty-section">
                <span class="qty-heading">Jumlah:</span>
                <div class="qty-selector">
                  <button
                    type="button"
                    class="qty-btn"
                    :disabled="quantity <= 1"
                    @click="decrementQty"
                    aria-label="Kurangi jumlah"
                  >
                    &minus;
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
                    &plus;
                  </button>
                </div>
              </div>

              <div class="subtotal-display">
                <span>Subtotal:</span>
                <strong>{{ formatRupiah(product.price * quantity) }}</strong>
              </div>

              <!-- STRONGEST FOCAL POINT (Squint Test) via AppButton -->
              <AppButton variant="primary" size="lg" class="btn-register" @click="handleAddToCart">
                🛒 Tambah ke Keranjang
              </AppButton>

              <AppButton variant="secondary" size="md" class="btn-buy-secondary" @click="handleBuyNow">
                ⚡ Beli Sekarang Langsung
              </AppButton>

              <p class="spots" v-if="product.stock <= 10">
                ⚠️ Hanya tersisa {{ product.stock }} unit lagi!
              </p>
              <p class="spots in-stock" v-else>✅ Stok Aman (Sisa {{ product.stock }} unit)</p>

              <!-- Trust Assurance Badges -->
              <div class="trust-perks-list">
                <div class="perk-item">
                  <svg
                    class="perk-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                    />
                  </svg>
                  <span>100% Produk Original &amp; Resmi</span>
                </div>
                <div class="perk-item">
                  <svg
                    class="perk-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                  <span>Jaminan Retur 7 Hari Bebas Repot</span>
                </div>
              </div>
            </AppCard>
          </div>
        </div>

        <!-- Related Products Section (Adaptive Grid) -->
        <div v-if="relatedProducts.length > 0" class="related-section">
          <div class="section-header">
            <h2 class="section-title" style="font-size: 1.5rem">
              Produk Terkait dalam Kategori {{ product.category }}
            </h2>
            <RouterLink
              :to="{ path: '/products', query: { category: product.category } }"
              class="view-all-link"
            >
              <span>Lihat Kategori Lengkap &rarr;</span>
            </RouterLink>
          </div>

          <div class="adaptive-products-grid">
            <ProductCard v-for="rel in relatedProducts" :key="rel.id" :product="rel" />
          </div>
        </div>
      </div>

      <!-- Case 2: Product Not Found -->
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
  padding-top: var(--space-6);
  padding-bottom: var(--space-16);
}

.btn-back {
  background: none;
  border: none;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: var(--space-6);
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0;
  transition:
    color 0.2s,
    transform 0.2s;
}

.btn-back:hover {
  color: var(--primary);
  transform: translateX(-3px);
}

/* Detail Header Banner */
.detail-header {
  background: var(--bg-light);
  border-radius: var(--space-4);
  border: 1px solid var(--border-color);
  padding: var(--space-8) var(--space-8);
  margin-bottom: var(--space-8);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.product-tag-pill {
  display: inline-block;
  background: rgba(37, 99, 235, 0.1);
  color: var(--primary);
  padding: var(--space-1) var(--space-4);
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.85rem;
  margin-bottom: var(--space-3);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.header-product-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: var(--space-4);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

@media (min-width: 768px) {
  .header-product-title {
    font-size: 2.75rem;
  }
}

.meta-info {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-6);
}

.meta-item {
  color: var(--text-muted);
  font-weight: 500;
  font-size: 0.95rem;
}

/* ==========================================================================
   MODUL 2: ASYMMETRICAL GRID (2fr : 1fr)
   ========================================================================== */
.grid-asymmetric {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--space-12);
  align-items: start;
}

/* Gallery Showcase Box */
.gallery-card {
  padding: var(--space-6);
  background: white;
  border-radius: var(--space-4);
  margin-bottom: var(--space-8);
}

.main-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: var(--space-3);
  overflow: hidden;
  background-color: #f8fafc;
  border: 1px solid var(--border-color);
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
  background-color: var(--primary);
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 700;
  padding: var(--space-1) var(--space-3);
  border-radius: 50px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.thumbnails-row {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-4);
}

.thumbnail-btn {
  width: 70px;
  height: 70px;
  border-radius: var(--space-2);
  overflow: hidden;
  border: 2px solid var(--border-color);
  background: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s;
}

.thumbnail-btn.active,
.thumbnail-btn:hover {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ==========================================================================
   MODUL 2: F-PATTERN SCANNING (KOLOM KIRI)
   ========================================================================== */
.main-desc h2 {
  margin-top: var(--space-8);
  margin-bottom: var(--space-4);
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--text-main);
  border-left: 4px solid var(--primary);
  padding-left: var(--space-3);
}

.main-desc p {
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: var(--space-6);
  font-size: 1.05rem;
}

.agenda-list {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--space-8) 0;
}

.agenda-list li {
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.6;
}

.agenda-list li strong {
  color: var(--text-main);
}

.review-summary-card {
  padding: var(--space-6);
  display: flex;
  align-items: center;
  gap: var(--space-6);
  background: white;
  border-radius: var(--space-3);
}

.rating-large-score {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.rating-num {
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--primary);
  line-height: 1;
}

.rating-max {
  font-size: 1.1rem;
  color: var(--text-muted);
  font-weight: 600;
}

.rating-highlight {
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 4px;
}

.rating-sub {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin: 0;
}

/* ==========================================================================
   MODUL 2: FOCAL POINT & STICKY PANE (KOLOM KANAN)
   ========================================================================== */
.ticket-card {
  background: white;
  padding: var(--space-8);
  border-radius: var(--space-4);
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  text-align: center;
}

/* STICKY BEHAVIOR: Panel menempel saat halaman di-scroll */
.sticky-pane {
  position: sticky;
  top: 100px;
}

.pane-tag {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: var(--text-muted);
}

.pane-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text-main);
  margin-top: var(--space-1);
  margin-bottom: var(--space-2);
}

.price {
  font-size: 2.4rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: var(--space-1);
  letter-spacing: -0.02em;
}

.original-price-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.price-strikethrough {
  font-size: 0.95rem;
  color: var(--text-muted);
  text-decoration: line-through;
}

.discount-badge {
  background: #fef2f2;
  color: #ef4444;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
}

.ticket-desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: var(--space-6);
}

.qty-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  margin-bottom: var(--space-4);
}

.qty-heading {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-main);
}

.qty-selector {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: var(--space-2);
  overflow: hidden;
}

.qty-btn {
  width: 34px;
  height: 34px;
  border: none;
  background: var(--color-surface-alt);
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-main);
  transition: background 0.2s;
}

.qty-btn:hover:not(:disabled) {
  background: #e2e8f0;
}

.qty-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.qty-input {
  width: 44px;
  height: 34px;
  text-align: center;
  border: none;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text-main);
  outline: none;
}

.subtotal-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
  font-size: 0.95rem;
  color: var(--text-muted);
}

.subtotal-display strong {
  font-size: 1.15rem;
  color: var(--text-main);
}

/* SQUINT TEST: Kontras tertinggi yang memikat perhatian pengguna */
.btn-register {
  width: 100%;
  padding: var(--space-4);
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.35);
  transition: all 0.2s ease;
  margin-bottom: var(--space-3);
}

.btn-register:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.45);
}

.btn-buy-secondary {
  width: 100%;
  padding: var(--space-3);
  background: white;
  color: var(--primary);
  border: 1.5px solid var(--primary);
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-buy-secondary:hover {
  background: rgba(37, 99, 235, 0.05);
}

.spots {
  margin-top: var(--space-4);
  font-weight: 600;
  font-size: 0.88rem;
  color: #e63946;
}

.spots.in-stock {
  color: #10b981;
}

.trust-perks-list {
  margin-top: var(--space-6);
  padding-top: var(--space-4);
  border-top: 1px dashed var(--border-color);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  text-align: left;
}

.perk-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 500;
}

.perk-icon {
  width: 16px;
  height: 16px;
  color: var(--primary);
  flex-shrink: 0;
}

/* Related Products Grid (Adaptive Grid) */
.related-section {
  margin-top: var(--space-16);
  padding-top: var(--space-12);
  border-top: 1px solid var(--border-color);
}

.view-all-link {
  color: var(--primary);
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
}

.adaptive-products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-6);
}

.not-found-container {
  max-width: 600px;
  margin: var(--space-12) auto;
}

@media (max-width: 900px) {
  .grid-asymmetric {
    grid-template-columns: 1fr;
  }
  .sticky-pane {
    position: static;
  }
}
</style>
