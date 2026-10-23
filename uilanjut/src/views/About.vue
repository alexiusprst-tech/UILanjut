<script setup>
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import AppButton from '@/components/ui/AppButton.vue'

const breadcrumbs = [
  { label: 'Beranda', to: '/' },
  { label: 'Tentang Kami' },
]
</script>

<template>
  <div class="about-page section">
    <div class="container">
      <Breadcrumbs :items="breadcrumbs" />

      <header class="about-hero">
        <span class="sub-lead">About SHOPNEST &amp; Gatherly</span>
        <h1 class="page-title">Bridging Commerce, Creative Education &amp; Events</h1>
        <p class="hero-desc">
          SHOPNEST adalah platform e-commerce dan hub komunitas kreatif yang mengintegrasikan penjualan produk unggulan dengan masterclass, seminar, dan workshop industri terbaik.
        </p>
      </header>

      <div class="about-grid">
        <div class="about-card card">
          <div class="card-icon">🛍️</div>
          <h3>Curated Products</h3>
          <p>
            Koleksi barang pilihan dari brand terpercaya dengan kualitas terjamin dan pengiriman cepat ke seluruh Indonesia.
          </p>
        </div>

        <div class="about-card card">
          <div class="card-icon">🎓</div>
          <h3>Industry Masterclasses</h3>
          <p>
            Pelatihan mendalam yang dipandu oleh praktisi dan creative director untuk menutup celah antara dunia akademis dan industri nyata.
          </p>
        </div>

        <div class="about-card card">
          <div class="card-icon">🎟️</div>
          <h3>Seamless Event Experience</h3>
          <p>
            Pendaftaran cepat, penerbitan digital pass resmi secara instan, serta manajemen kuota terintegrasi tanpa ribet.
          </p>
        </div>
      </div>

      <div class="cta-banner card">
        <h2>Siap Memulai Langkah Anda?</h2>
        <p>Jelajahi katalog workshop terkini atau temukan produk favorit Anda hari ini.</p>
        <div class="cta-actions">
          <AppButton variant="primary" size="lg" @click="$router.push('/browse')">
            Jelajahi Acara &rarr;
          </AppButton>
          <AppButton variant="secondary" size="lg" @click="$router.push('/products')">
            Katalog Produk
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  padding-top: var(--space-8, 32px);
  padding-bottom: var(--space-16, 64px);
}

.about-hero {
  margin-top: 1rem;
  margin-bottom: var(--space-10, 40px);
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.sub-lead {
  display: block;
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--color-primary, #6644ff);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e1b4b;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
}

.hero-desc {
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.6;
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6, 24px);
  margin-bottom: var(--space-12, 48px);
}

.about-card {
  padding: 2rem;
  border-radius: var(--radius-lg, 16px);
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.card-icon {
  font-size: 2.5rem;
}

.about-card h3 {
  font-size: 1.35rem;
  font-weight: 800;
  color: #1e1b4b;
}

.about-card p {
  color: #64748b;
  line-height: 1.55;
  font-size: 0.95rem;
}

.cta-banner {
  padding: 3rem 2rem;
  background: linear-gradient(135deg, rgba(102, 68, 255, 0.05) 0%, rgba(37, 99, 235, 0.08) 100%);
  border: 1px solid rgba(102, 68, 255, 0.15);
  border-radius: var(--radius-xl, 24px);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.cta-banner h2 {
  font-size: 1.85rem;
  font-weight: 800;
  color: #1e1b4b;
}

.cta-banner p {
  color: #64748b;
  max-width: 500px;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0.5rem;
}
</style>
