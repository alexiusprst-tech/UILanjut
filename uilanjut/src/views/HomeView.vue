<script setup>
import { RouterLink } from 'vue-router'
import { categories, getFeaturedProducts } from '@/data/products'
import ProductCard from '@/components/ProductCard.vue'
import CategoryCard from '@/components/CategoryCard.vue'

const featuredProducts = getFeaturedProducts()
const mainCategories = categories.filter((c) => c.id !== 'all')
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container hero-container">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="hero-badge-pill">SHOPNEST 2026</span>
            <span>Platform Toko Online Resmi</span>
          </div>

          <h1 class="hero-title">
            Temukan Produk Terbaik untuk Kebutuhan
            <span class="highlight-text">Gaya &amp; Teknologi</span> Anda
          </h1>

          <p class="hero-description">
            Belanja ribuan produk pilihan dari gadget terkini, pakaian trendi, aksesoris premium,
            hingga perlengkapan rumah dengan jaminan 100% original dan garansi resmi.
          </p>

          <div class="hero-actions">
            <RouterLink to="/products" class="btn btn-primary btn-lg hero-btn-primary">
              <span>Belanja Sekarang</span>
              <svg
                class="btn-arrow"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </RouterLink>

            <RouterLink to="/cart" class="btn btn-secondary btn-lg hero-btn-secondary">
              <svg
                class="cart-hero-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <span>Lihat Keranjang</span>
            </RouterLink>
          </div>

          <!-- Trust Proof Metrics -->
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">10.000+</span>
              <span class="stat-label">Pelanggan Puas</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">100%</span>
              <span class="stat-label">Produk Asli &amp; Garansi</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">4.9 / 5.0</span>
              <span class="stat-label">Rating Rata-rata</span>
            </div>
          </div>
        </div>

        <!-- Hero Visual / Showcase Banner -->
        <div class="hero-visual">
          <div class="visual-card">
            <img
              src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=900&q=80"
              alt="SHOPNEST Showcase Products"
              class="hero-main-img"
            />
            <div class="floating-deal-badge">
              <div class="badge-icon-box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="sparkle-icon"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813a3.75 3.75 0 0 0 2.576-2.576l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="deal-text">
                <span class="deal-title">Promo Spesial Hari Ini</span>
                <span class="deal-subtitle">Diskon s.d. 30% untuk Gadget</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Value Propositions / Benefit Strip -->
    <section class="benefits-strip">
      <div class="container">
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.8"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
            </div>
            <div class="benefit-info">
              <h4 class="benefit-title">Gratis Ongkos Kirim</h4>
              <p class="benefit-desc">Untuk seluruh pesanan minimal Rp 500.000</p>
            </div>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.8"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
            </div>
            <div class="benefit-info">
              <h4 class="benefit-title">100% Produk Original</h4>
              <p class="benefit-desc">Barang langsung dari distributor resmi</p>
            </div>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.8"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </div>
            <div class="benefit-info">
              <h4 class="benefit-title">Garansi Retur 7 Hari</h4>
              <p class="benefit-desc">Kemudahan pengembalian jika barang cacat</p>
            </div>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.8"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <div class="benefit-info">
              <h4 class="benefit-title">Transaksi Aman &amp; Mudah</h4>
              <p class="benefit-desc">Dukungan berbagai metode pembayaran</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="section categories-section">
      <div class="container">
        <div class="section-header">
          <div class="section-title-wrap">
            <h2 class="section-title">Kategori Pilihan</h2>
            <p class="section-subtitle">
              Jelajahi berbagai kategori produk unggulan yang dirancang untuk memenuhi kebutuhan
              harian Anda.
            </p>
          </div>
          <RouterLink to="/products" class="view-all-link">
            <span>Lihat Semua Produk</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="link-arrow"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </RouterLink>
        </div>

        <div class="categories-grid">
          <CategoryCard v-for="cat in mainCategories" :key="cat.id" :category="cat" />
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="section featured-section">
      <div class="container">
        <div class="section-header">
          <div class="section-title-wrap">
            <span class="badge badge-primary">Rekomendasi Terbaik</span>
            <h2 class="section-title" style="margin-top: 0.5rem">Produk Unggulan</h2>
            <p class="section-subtitle">
              Koleksi terlaris dengan rating tertinggi minggu ini. Klik produk untuk melihat detail
              spesifikasinya.
            </p>
          </div>
          <RouterLink to="/products" class="btn btn-outline">
            <span>Buka Katalog Lengkap</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="link-arrow"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </RouterLink>
        </div>

        <div class="products-grid">
          <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ==========================================================================
   MODUL 2: AREA PEMASARAN (Z-PATTERN & THE FOLD)
   ========================================================================== */

/* THE FOLD: Memaksa tinggi Hero minimal 65vh agar tombol CTA utama berada Above the Fold */
.hero-section {
  min-height: 65vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #f8fafc 0%, #eff6ff 100%);
  padding: var(--space-12) 0;
  border-bottom: 1px solid var(--color-border);
}

@media (min-width: 768px) {
  .hero-section {
    min-height: 70vh;
    padding: var(--space-16) 0;
  }
}

.hero-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
  align-items: center;
  width: 100%;
}

@media (min-width: 1024px) {
  .hero-container {
    grid-template-columns: 1.15fr 0.85fr;
    gap: var(--space-12);
  }
}

.hero-content {
  display: flex;
  flex-direction: column;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.35rem 0.85rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  width: fit-content;
  margin-bottom: var(--space-4);
  box-shadow: var(--shadow-xs);
}

.hero-badge-pill {
  background-color: var(--color-primary);
  color: #ffffff;
  padding: 0.15rem 0.55rem;
  border-radius: var(--radius-full);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

/* SCALE: Massive font sets the highest Ranked Importance */
.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.12;
  color: var(--color-text);
  letter-spacing: -0.03em;
  margin-bottom: var(--space-4);
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 3.6rem;
  }
}

.highlight-text {
  background: linear-gradient(135deg, var(--color-primary) 0%, #1d4ed8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-6);
  max-width: 580px;
}

/* Z-PATTERN: Eye navigates from title directly to contrasting CTA button */
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

/* SQUINT TEST: Make button pop with vibrant primary background & intense elevation */
.hero-btn-primary {
  background-color: var(--color-primary);
  color: #ffffff;
  font-size: 1.05rem;
  font-weight: 700;
  padding: var(--space-3) var(--space-8);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.35);
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;
}

.hero-btn-primary:hover {
  background-color: var(--color-primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.45);
}

.cart-hero-icon {
  width: 20px;
  height: 20px;
}

.hero-stats {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.stat-divider {
  width: 1px;
  height: 32px;
  background-color: var(--color-border);
  display: none;
}

@media (min-width: 640px) {
  .stat-divider {
    display: block;
  }
}

/* Hero Visual */
.hero-visual {
  position: relative;
}

.visual-card {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  border: 4px solid #ffffff;
  background-color: #ffffff;
}

.hero-main-img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.visual-card:hover .hero-main-img {
  transform: scale(1.03);
}

.floating-deal-badge {
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  padding: 0.85rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
}

.badge-icon-box {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sparkle-icon {
  width: 22px;
  height: 22px;
}

.deal-text {
  display: flex;
  flex-direction: column;
}

.deal-title {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--color-text);
}

.deal-subtitle {
  font-size: 0.78rem;
  color: var(--color-primary);
  font-weight: 600;
}

/* Benefits Strip */
.benefits-strip {
  background-color: #ffffff;
  padding: 2rem 0;
  border-bottom: 1px solid var(--color-border);
}

.benefits-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .benefits-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.benefit-card {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.benefit-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.benefit-icon svg {
  width: 22px;
  height: 22px;
}

.benefit-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.15rem;
}

.benefit-desc {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  line-height: 1.4;
}

/* Section Header Shared */
.section-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

@media (min-width: 768px) {
  .section-header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.view-all-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-primary);
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  transition: transform var(--transition-fast);
}

.view-all-link:hover {
  transform: translateX(4px);
}

.link-arrow {
  width: 16px;
  height: 16px;
}

/* Categories Grid */
.categories-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .categories-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Products Grid */
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
</style>
