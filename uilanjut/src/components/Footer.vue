<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-container">
      <div class="footer-grid">
        <!-- Brand Info -->
        <div class="footer-col brand-col">
          <RouterLink to="/" class="footer-brand">
            <div class="brand-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="icon-svg"
              >
                <path
                  d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
                />
              </svg>
            </div>
            <span class="brand-name">SHOPNEST</span>
          </RouterLink>
          <p class="footer-desc">
            Platform toko online modern dengan navigasi intuitif dan katalog produk terlengkap.
            Memenuhi kebutuhan gaya, teknologi, dan hunian Anda.
          </p>
          <div class="workshop-badge">
            <span class="badge-dot"></span>
            <span>Tugas Workshop: Menyusun Site Map</span>
          </div>
        </div>

        <!-- Site Map Links -->
        <div class="footer-col">
          <h4 class="footer-heading">Site Map Navigasi</h4>
          <ul class="footer-links">
            <li><RouterLink to="/" class="footer-link">Beranda (Entry Point)</RouterLink></li>
            <li><RouterLink to="/products" class="footer-link">Katalog Produk</RouterLink></li>
            <li><RouterLink to="/cart" class="footer-link">Keranjang Belanja</RouterLink></li>
            <li><RouterLink to="/profile" class="footer-link">Profil Pengguna</RouterLink></li>
          </ul>
        </div>

        <!-- Categories Links -->
        <div class="footer-col">
          <h4 class="footer-heading">Kategori Pilihan</h4>
          <ul class="footer-links">
            <li>
              <RouterLink
                :to="{ path: '/products', query: { category: 'Electronics' } }"
                class="footer-link"
                >Electronics & Gadget</RouterLink
              >
            </li>
            <li>
              <RouterLink
                :to="{ path: '/products', query: { category: 'Fashion' } }"
                class="footer-link"
                >Fashion & Pakaian</RouterLink
              >
            </li>
            <li>
              <RouterLink
                :to="{ path: '/products', query: { category: 'Accessories' } }"
                class="footer-link"
                >Accessories & Lifestyle</RouterLink
              >
            </li>
            <li>
              <RouterLink
                :to="{ path: '/products', query: { category: 'Home' } }"
                class="footer-link"
                >Home & Living</RouterLink
              >
            </li>
          </ul>
        </div>

        <!-- Contact & Service -->
        <div class="footer-col">
          <h4 class="footer-heading">Hubungi Kami</h4>
          <ul class="footer-contact">
            <li>
              <svg
                class="contact-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              <span>support@shopnest.id</span>
            </li>
            <li>
              <svg
                class="contact-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
              <span>+62 (021) 555-8900</span>
            </li>
            <li>
              <svg
                class="contact-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <span>Jakarta Pusat, DKI Jakarta</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <p class="copyright">
          © 2026 <strong>SHOPNEST Online Store</strong>. Seluruh hak cipta dilindungi undang-undang.
        </p>
        <div class="site-map-structure-tag">
          Struktur Navigasi: <code>HOME &gt; PRODUCTS &gt; PRODUCT DETAIL | CART | PROFILE</code>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: #ffffff;
  border-top: 1px solid var(--color-border);
  margin-top: auto;
  padding-top: 3.5rem;
  padding-bottom: 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

@media (min-width: 640px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns: 2fr 1fr 1fr 1.2fr;
  }
}

.footer-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
  margin-bottom: 1rem;
}

.brand-icon {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.icon-svg {
  width: 18px;
  height: 18px;
}

.brand-name {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.footer-desc {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  max-width: 340px;
  margin-bottom: 1.25rem;
}

.workshop-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  font-size: 0.78rem;
  font-weight: 600;
  border-radius: var(--radius-full);
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-primary);
}

.footer-heading {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-link {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  transition:
    color var(--transition-fast),
    transform var(--transition-fast);
  text-decoration: none;
  display: inline-block;
}

.footer-link:hover {
  color: var(--color-primary);
  transform: translateX(4px);
}

.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.footer-contact li {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.contact-icon {
  width: 18px;
  height: 18px;
  color: var(--color-primary);
  flex-shrink: 0;
}

.footer-bottom {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  text-align: center;
}

@media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
    text-align: left;
  }
}

.copyright {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

.site-map-structure-tag {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.site-map-structure-tag code {
  background-color: var(--color-surface-alt);
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-xs);
  font-size: 0.75rem;
  color: var(--color-primary);
  font-weight: 600;
}
</style>
