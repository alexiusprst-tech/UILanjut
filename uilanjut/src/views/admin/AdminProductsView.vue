<script setup>
import { ref, computed } from 'vue'
import { useProducts } from '@/composables/useProducts'
import { formatRupiah, categories } from '@/data/products'
import AppButton from '@/components/ui/AppButton.vue'
import AppModal from '@/components/ui/AppModal.vue'

// ===========================================================================
// SINGLE SOURCE OF TRUTH — seluruh data berasal dari composable useProducts
// ===========================================================================
const {
  activeProducts,
  inactiveProducts,
  totalActiveProducts,
  totalInactiveProducts,
  addProduct,
  updateStock,
  deleteProduct,
  toggleProductStatus,
  resetToDefault,
  clearAllProducts,
} = useProducts()

// Tab: 'active' | 'create' | 'inactive'
const activeTab = ref('active')

// Search & filter kategori (berlaku untuk tab Aktif & Nonaktif)
const searchQuery = ref('')
const selectedCategory = ref('all')

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'

function createEmptyForm() {
  return {
    name: '',
    category: 'Electronics',
    price: '',
    stock: '',
    badge: '',
    description: '',
    image: DEFAULT_IMAGE,
  }
}

const newForm = ref(createEmptyForm())
const formError = ref('')
const formSuccess = ref('')

function handleTabChange(tab) {
  activeTab.value = tab
  formError.value = ''
  formSuccess.value = ''
}

// ===========================================================================
// CREATE — validasi form + alert error / sukses
// ===========================================================================
function submitNewProduct() {
  formError.value = ''
  formSuccess.value = ''

  const f = newForm.value
  if (!f.name.trim() || !f.price || f.stock === '' || !f.description.trim()) {
    formError.value = 'Harap isi semua bidang wajib sebelum mempublikasikan produk!'
    return
  }

  const created = addProduct({ ...f })
  formSuccess.value = `Produk "${created.name}" berhasil dipublikasikan dan sekarang aktif di katalog!`
  newForm.value = createEmptyForm()
}

function resetForm() {
  newForm.value = createEmptyForm()
  formError.value = ''
  formSuccess.value = ''
}

// ===========================================================================
// UPDATE / DELETE — dengan dialog konfirmasi (Destructive Action Confirmation)
// ===========================================================================
const isToggleModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const isClearModalOpen = ref(false)
const selectedProduct = ref(null)

const isReactivating = computed(() => selectedProduct.value?.status === 'inactive')

const toggleModalTitle = computed(() =>
  isReactivating.value ? 'Aktifkan Kembali Produk?' : 'Nonaktifkan Produk?',
)

const toggleModalMessage = computed(() => {
  const name = selectedProduct.value?.name || ''
  return isReactivating.value
    ? `Apakah Anda yakin ingin mengaktifkan kembali '${name}'? Produk akan kembali tampil dan dapat dibeli di katalog publik SHOPNEST.`
    : `Apakah Anda yakin ingin menonaktifkan '${name}'? Produk akan otomatis dihapus dari katalog publik dan dipindahkan ke tab Produk Nonaktif.`
})

function promptToggleStatus(product) {
  selectedProduct.value = product
  isToggleModalOpen.value = true
}

function confirmToggleStatus() {
  if (selectedProduct.value) toggleProductStatus(selectedProduct.value.id)
  selectedProduct.value = null
}

function promptDelete(product) {
  selectedProduct.value = product
  isDeleteModalOpen.value = true
}

function confirmDelete() {
  if (selectedProduct.value) deleteProduct(selectedProduct.value.id)
  selectedProduct.value = null
}

function confirmClearAll() {
  clearAllProducts()
}

function handleStockStep(id, currentStock, delta) {
  updateStock(id, currentStock + delta)
}

function onImgError(event) {
  event.target.src = DEFAULT_IMAGE
}

// ===========================================================================
// DERIVED STATE — daftar yang ditampilkan per tab
// ===========================================================================
function applyFilters(list) {
  const q = searchQuery.value.toLowerCase().trim()
  return list.filter((p) => {
    const matchesCat = selectedCategory.value === 'all' || p.category === selectedCategory.value
    const matchesSearch =
      !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    return matchesCat && matchesSearch
  })
}

const displayedProducts = computed(() =>
  applyFilters(activeTab.value === 'inactive' ? inactiveProducts.value : activeProducts.value),
)
</script>

<template>
  <div class="admin-products">
    <!-- Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Kontrol Manajemen Produk</h1>
        <p class="page-subtitle">
          Kelola siklus hidup produk: publikasikan produk baru, atur stok, dan arsipkan produk yang
          sudah tidak dijual.
        </p>
      </div>

      <div class="header-action-group">
        <AppButton variant="secondary" size="sm" @click="resetToDefault">
          ↺ Reset Data Contoh
        </AppButton>
        <AppButton variant="danger-outline" size="sm" @click="isClearModalOpen = true">
          Kosongkan Katalog
        </AppButton>
      </div>
    </div>

    <!-- ===================================================================
         TAB NAVIGASI: Produk Aktif | + Tambah Produk | Produk Nonaktif
         =================================================================== -->
    <div class="module-tabs-bar" role="tablist">
      <button
        id="tab-active-products"
        type="button"
        role="tab"
        class="tab-btn"
        :class="{ 'tab-btn-active': activeTab === 'active' }"
        @click="handleTabChange('active')"
      >
        <span class="tab-icon">⚡</span>
        <span>Produk Aktif ({{ totalActiveProducts }})</span>
      </button>

      <button
        id="tab-create-product"
        type="button"
        role="tab"
        class="tab-btn"
        :class="{ 'tab-btn-active': activeTab === 'create' }"
        @click="handleTabChange('create')"
      >
        <span class="tab-icon">＋</span>
        <span>Tambah Produk</span>
      </button>

      <button
        id="tab-inactive-products"
        type="button"
        role="tab"
        class="tab-btn"
        :class="{ 'tab-btn-active': activeTab === 'inactive' }"
        @click="handleTabChange('inactive')"
      >
        <span class="tab-icon">✅</span>
        <span>Produk Nonaktif ({{ totalInactiveProducts }})</span>
      </button>
    </div>

    <!-- ===================================================================
         TAB: FORM TAMBAH PRODUK
         =================================================================== -->
    <div v-if="activeTab === 'create'" class="form-card">
      <div class="form-card-header">
        <h2 class="form-title">Form Tambah Produk Baru</h2>
        <p class="form-subtitle">
          Informasi yang dimasukkan di sini akan langsung dipublikasikan ke katalog publik SHOPNEST.
        </p>
      </div>

      <div v-if="formError" class="alert-banner alert-error" role="alert">
        <span class="alert-icon">⚠️</span>
        <span>{{ formError }}</span>
      </div>

      <div v-if="formSuccess" class="alert-banner alert-success" role="status">
        <span class="alert-icon">🎉</span>
        <span>{{ formSuccess }}</span>
      </div>

      <form class="create-product-form" novalidate @submit.prevent="submitNewProduct">
        <div class="form-group">
          <label for="input-name" class="form-label">Nama Produk *</label>
          <input
            id="input-name"
            v-model="newForm.name"
            type="text"
            class="input-field"
            placeholder="cth. Wireless Earbuds Sony WF-1000XM5"
          />
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label for="input-category" class="form-label">Kategori Produk *</label>
            <select id="input-category" v-model="newForm.category" class="input-field">
              <option
                v-for="cat in categories.filter((c) => c.id !== 'all')"
                :key="cat.id"
                :value="cat.id"
              >
                {{ cat.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="input-price" class="form-label">Harga Jual (Rp) *</label>
            <input
              id="input-price"
              v-model="newForm.price"
              type="number"
              class="input-field"
              placeholder="cth. 1500000"
              min="1000"
            />
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label for="input-badge" class="form-label">Badge Promo</label>
            <input
              id="input-badge"
              v-model="newForm.badge"
              type="text"
              class="input-field"
              placeholder="cth. Best Seller / Baru"
            />
          </div>

          <div class="form-group">
            <label for="input-stock" class="form-label">Jumlah Stok *</label>
            <input
              id="input-stock"
              v-model="newForm.stock"
              type="number"
              class="input-field"
              placeholder="100"
              min="0"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="input-description" class="form-label">Deskripsi Produk *</label>
          <textarea
            id="input-description"
            v-model="newForm.description"
            class="input-field"
            rows="4"
            placeholder="Jelaskan spesifikasi, fitur utama, dan keunggulan produk..."
          ></textarea>
        </div>

        <div class="form-actions-row">
          <AppButton variant="secondary" size="md" @click="resetForm">Batal</AppButton>
          <AppButton id="btn-publish-product" type="submit" variant="primary" size="md">
            🚀 Publikasikan Produk
          </AppButton>
        </div>
      </form>
    </div>

    <!-- ===================================================================
         TAB: PRODUK AKTIF & PRODUK NONAKTIF (Card Grid)
         =================================================================== -->
    <div v-else class="products-section">
      <!-- Search & Filter -->
      <div class="filter-card">
        <div class="search-input-box">
          <svg
            class="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari produk berdasarkan nama atau kategori..."
            class="admin-search-input"
          />
        </div>

        <div class="cat-filter-pills">
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            class="cat-pill-btn"
            :class="{ active: selectedCategory === cat.id }"
            @click="selectedCategory = cat.id"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>

      <!-- Empty State per tab -->
      <div v-if="displayedProducts.length === 0" class="empty-tab-state">
        <div class="empty-tab-icon">{{ activeTab === 'inactive' ? '🗂️' : '📦' }}</div>
        <h3 class="empty-tab-title">
          {{ activeTab === 'inactive' ? 'Belum Ada Produk Nonaktif' : 'Belum Ada Produk Aktif' }}
        </h3>
        <p class="empty-tab-desc">
          {{
            activeTab === 'inactive'
              ? 'Produk yang Anda nonaktifkan akan diarsipkan dan muncul di sini.'
              : 'Tidak ada produk aktif yang cocok. Publikasikan produk baru agar tampil di katalog.'
          }}
        </p>
        <AppButton
          v-if="activeTab === 'active'"
          variant="primary"
          size="md"
          @click="handleTabChange('create')"
        >
          ＋ Tambah Produk Pertama
        </AppButton>
      </div>

      <!-- Card Grid -->
      <div v-else class="manage-grid">
        <article
          v-for="product in displayedProducts"
          :key="product.id"
          class="manage-card"
          :class="{ 'is-archived': product.status === 'inactive' }"
        >
          <div class="manage-card-media">
            <img :src="product.image" :alt="product.name" loading="lazy" @error="onImgError" />
          </div>

          <div class="manage-card-body">
            <div class="manage-card-top">
              <span class="cat-chip">{{ product.category }}</span>
              <span
                class="status-chip"
                :class="product.status === 'inactive' ? 'chip-inactive' : 'chip-active'"
              >
                {{ product.status === 'inactive' ? 'Nonaktif' : 'Aktif' }}
              </span>
            </div>

            <h3 class="manage-card-title">{{ product.name }}</h3>

            <div class="manage-card-meta">
              <span>💰 {{ formatRupiah(product.price) }}</span>
              <span class="meta-dot">•</span>
              <span>📦 {{ product.stock }} unit</span>
              <span v-if="product.badge" class="meta-badge">{{ product.badge }}</span>
            </div>

            <p class="manage-card-desc">{{ product.description }}</p>

            <!-- Kartu AKTIF: kelola stok + aksi -->
            <template v-if="product.status !== 'inactive'">
              <div class="stock-row">
                <span class="stock-label">Kelola Stok</span>
                <div class="stock-editor">
                  <button
                    type="button"
                    class="stock-step-btn"
                    :disabled="product.stock <= 0"
                    title="Kurangi 1"
                    @click="handleStockStep(product.id, product.stock, -1)"
                  >
                    −
                  </button>
                  <span class="stock-num" :class="{ 'stock-low': product.stock <= 5 }">
                    {{ product.stock }}
                  </span>
                  <button
                    type="button"
                    class="stock-step-btn"
                    title="Tambah 1"
                    @click="handleStockStep(product.id, product.stock, 1)"
                  >
                    +
                  </button>
                </div>
              </div>

              <div class="card-actions">
                <AppButton
                  variant="success-outline"
                  size="sm"
                  class="card-action-btn"
                  @click="promptToggleStatus(product)"
                >
                  ✅ Nonaktifkan
                </AppButton>
                <AppButton
                  variant="danger-outline"
                  size="sm"
                  class="card-action-btn"
                  @click="promptDelete(product)"
                >
                  🗑️ Hapus
                </AppButton>
              </div>
            </template>

            <!-- Kartu NONAKTIF: label arsip + aksi -->
            <template v-else>
              <div class="archived-notice">
                🔒 Produk ini telah dinonaktifkan dan diarsipkan dari katalog publik.
              </div>
              <div class="card-actions">
                <AppButton
                  variant="secondary"
                  size="sm"
                  class="card-action-btn"
                  @click="promptToggleStatus(product)"
                >
                  ↺ Aktifkan Kembali
                </AppButton>
                <AppButton
                  variant="danger-outline"
                  size="sm"
                  class="card-action-btn"
                  @click="promptDelete(product)"
                >
                  🗑️ Hapus
                </AppButton>
              </div>
            </template>
          </div>
        </article>
      </div>
    </div>

    <!-- Modal: Nonaktifkan / Aktifkan Kembali -->
    <AppModal
      v-model="isToggleModalOpen"
      :title="toggleModalTitle"
      :message="toggleModalMessage"
      :confirm-text="isReactivating ? 'Ya, Aktifkan' : 'Ya, Nonaktifkan'"
      cancel-text="Batal"
      :confirm-variant="isReactivating ? 'success' : 'danger'"
      icon="warning"
      @confirm="confirmToggleStatus"
    />

    <!-- Modal: Hapus Permanen -->
    <AppModal
      v-model="isDeleteModalOpen"
      title="Hapus Produk Permanen?"
      :message="`Apakah Anda yakin ingin menghapus '${selectedProduct?.name || ''}' secara permanen? Tindakan ini tidak dapat dibatalkan dan akan menghapus produk dari seluruh data toko.`"
      confirm-text="Ya, Hapus Permanen"
      cancel-text="Batal"
      confirm-variant="danger"
      icon="warning"
      @confirm="confirmDelete"
    />

    <!-- Modal: Kosongkan Katalog (demo Empty State) -->
    <AppModal
      v-model="isClearModalOpen"
      title="Kosongkan Seluruh Katalog?"
      message="Semua produk akan dihapus dari toko. Gunakan 'Reset Data Contoh' untuk memuat ulang produk bawaan."
      confirm-text="Ya, Kosongkan"
      cancel-text="Batal"
      confirm-variant="danger"
      icon="warning"
      @confirm="confirmClearAll"
    />
  </div>
</template>

<style scoped>
.admin-products {
  display: flex;
  flex-direction: column;
  gap: var(--space-6, 24px);
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-4, 16px);
}

@media (min-width: 768px) {
  .page-header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.page-title {
  font-size: 1.85rem;
  font-weight: 800;
  color: var(--color-text, #1c1948);
  letter-spacing: -0.02em;
}

.page-subtitle {
  font-size: 0.95rem;
  color: var(--color-text-secondary, #64748b);
  margin-top: var(--space-1, 4px);
  max-width: 620px;
}

.header-action-group {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

/* ---------------- Tabs ---------------- */
.module-tabs-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 0.4rem;
  background-color: #ffffff;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: 14px;
  width: fit-content;
  max-width: 100%;
}

.tab-btn {
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: var(--color-text-secondary, #64748b);
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.tab-btn:hover {
  background-color: #f8fafc;
  color: var(--color-text, #1c1948);
}

.tab-btn-active,
.tab-btn-active:hover {
  background-color: var(--color-primary, #6644ff);
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(102, 68, 255, 0.3);
}

.tab-icon {
  font-size: 0.95rem;
  line-height: 1;
}

/* ---------------- Form ---------------- */
.form-card {
  padding: 2.25rem;
  background-color: #ffffff;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-xl, 20px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  max-width: 820px;
}

.form-card-header {
  margin-bottom: 1.5rem;
}

.form-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--color-text, #1c1948);
  margin-bottom: 0.3rem;
}

.form-subtitle {
  font-size: 0.92rem;
  color: var(--color-text-secondary, #64748b);
}

.alert-banner {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.85rem 1.15rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.4rem;
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.alert-error {
  background-color: #fee2e2;
  border: 1px solid #fca5a5;
  color: #b91c1c;
}

.alert-success {
  background-color: #dcfce7;
  border: 1px solid #86efac;
  color: #15803d;
}

.alert-icon {
  font-size: 1.1rem;
  line-height: 1;
}

.create-product-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-grid-2 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .form-grid-2 {
    grid-template-columns: 1fr 1fr;
  }
}

.form-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-text, #1c1948);
}

.input-field {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: 10px;
  font-family: inherit;
  font-size: 0.92rem;
  color: var(--color-text, #1c1948);
  background-color: #ffffff;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.input-field:focus {
  border-color: var(--color-primary, #6644ff);
  box-shadow: 0 0 0 3px rgba(102, 68, 255, 0.12);
}

textarea.input-field {
  resize: vertical;
}

.form-actions-row {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-border-light, #f1f5f9);
}

/* ---------------- Filter ---------------- */
.products-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-5, 20px);
}

.filter-card {
  padding: 1rem 1.5rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-lg, 16px);
}

@media (min-width: 768px) {
  .filter-card {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.search-input-box {
  position: relative;
  flex: 1;
  max-width: 420px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--color-text-muted, #94a3b8);
}

.admin-search-input {
  width: 100%;
  padding: 0.65rem 1rem 0.65rem 2.4rem;
  background-color: #f8fafc;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: 10px;
  font-family: inherit;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s;
}

.admin-search-input:focus {
  border-color: var(--color-primary, #6644ff);
  background-color: #ffffff;
}

.cat-filter-pills {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.cat-pill-btn {
  padding: 0.4rem 0.85rem;
  border-radius: 9999px;
  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-text-secondary, #64748b);
  background-color: #f1f5f9;
  border: 1px solid var(--color-border, #e2e8f0);
  cursor: pointer;
  transition: all 0.2s;
}

.cat-pill-btn:hover {
  color: var(--color-primary, #6644ff);
  background-color: rgba(102, 68, 255, 0.06);
}

.cat-pill-btn.active {
  background-color: var(--color-primary, #6644ff);
  color: #ffffff;
  border-color: var(--color-primary, #6644ff);
}

/* ---------------- Empty per tab ---------------- */
.empty-tab-state {
  padding: 3.5rem 2rem;
  background-color: #ffffff;
  border: 1px dashed var(--color-border, #e2e8f0);
  border-radius: var(--radius-xl, 20px);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.empty-tab-icon {
  font-size: 2.6rem;
  margin-bottom: 0.25rem;
}

.empty-tab-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-text, #1c1948);
}

.empty-tab-desc {
  font-size: 0.9rem;
  color: var(--color-text-secondary, #64748b);
  max-width: 420px;
  margin-bottom: 0.75rem;
}

/* ---------------- Card Grid ---------------- */
.manage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: var(--space-5, 20px);
}

.manage-card {
  background-color: #ffffff;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-lg, 16px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.manage-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.06);
  border-color: rgba(102, 68, 255, 0.2);
}

.manage-card-media {
  aspect-ratio: 16 / 9;
  background-color: #f1f5f9;
  overflow: hidden;
}

.manage-card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    transform 0.3s ease,
    filter 0.3s ease;
}

.manage-card:hover .manage-card-media img {
  transform: scale(1.04);
}

.manage-card-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  flex: 1;
}

.manage-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cat-chip {
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-primary, #6644ff);
  background-color: rgba(102, 68, 255, 0.08);
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
}

.status-chip {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
}

.chip-active {
  background-color: #d1fae5;
  color: #065f46;
}

.chip-inactive {
  background-color: #f1f5f9;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

.manage-card-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--color-text, #1c1948);
  line-height: 1.35;
}

.manage-card-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  font-size: 0.83rem;
  font-weight: 600;
  color: var(--color-text-secondary, #64748b);
}

.meta-dot {
  color: #cbd5e1;
}

.meta-badge {
  font-size: 0.68rem;
  font-weight: 700;
  color: #b45309;
  background-color: #fef3c7;
  padding: 1px 6px;
  border-radius: 4px;
}

.manage-card-desc {
  font-size: 0.85rem;
  color: var(--color-text-secondary, #64748b);
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.stock-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-border-light, #f1f5f9);
}

.stock-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-text-secondary, #64748b);
}

.stock-editor {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: #f8fafc;
  padding: 3px 6px;
  border-radius: 8px;
  border: 1px solid var(--color-border, #e2e8f0);
}

.stock-step-btn {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  border: 1px solid var(--color-border, #e2e8f0);
  background-color: #ffffff;
  color: var(--color-text, #1c1948);
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.stock-step-btn:hover:not(:disabled) {
  background-color: var(--color-primary, #6644ff);
  color: #ffffff;
  border-color: var(--color-primary, #6644ff);
}

.stock-step-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.stock-num {
  font-size: 0.88rem;
  font-weight: 700;
  min-width: 28px;
  text-align: center;
}

.stock-low {
  color: #b45309;
}

.card-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.card-action-btn {
  width: 100%;
}

/* ---------------- Kartu Nonaktif (diarsipkan) ---------------- */
.manage-card.is-archived {
  background-color: #fafafa;
}

.manage-card.is-archived:hover {
  transform: none;
  box-shadow: none;
  border-color: var(--color-border, #e2e8f0);
}

.manage-card.is-archived .manage-card-media img {
  filter: grayscale(100%);
  opacity: 0.6;
}

.manage-card.is-archived .cat-chip {
  color: #94a3b8;
  background-color: #f1f5f9;
}

.manage-card.is-archived .manage-card-title {
  color: #94a3b8;
  text-decoration: line-through;
  text-decoration-thickness: 2px;
}

.manage-card.is-archived .manage-card-meta,
.manage-card.is-archived .manage-card-desc {
  color: #a1a1aa;
}

.archived-notice {
  margin-top: auto;
  font-size: 0.8rem;
  font-weight: 600;
  color: #92400e;
  background-color: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 8px;
  padding: 0.6rem 0.75rem;
  line-height: 1.45;
}
</style>
