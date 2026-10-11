<script setup>
import { ref, computed } from 'vue'
import { useStoreAdmin } from '@/stores/storeAdmin'
import { formatRupiah, categories } from '@/data/products'

const adminStore = useStoreAdmin()

const searchQuery = ref('')
const selectedCategory = ref('all')
const isAddModalOpen = ref(false)

// Form Tambah Produk
const newForm = ref({
  name: '',
  category: 'Electronics',
  price: '',
  stock: '',
  description: '',
  badge: 'Baru',
  image:
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
})

const filteredProducts = computed(() => {
  return adminStore.productList.filter((p) => {
    const matchesCat = selectedCategory.value === 'all' || p.category === selectedCategory.value
    const matchesSearch =
      !searchQuery.value.trim() ||
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase().trim()) ||
      p.category.toLowerCase().includes(searchQuery.value.toLowerCase().trim())
    return matchesCat && matchesSearch
  })
})

function submitNewProduct() {
  if (!newForm.value.name.trim() || !newForm.value.price) {
    adminStore.showNotification('Harap isi nama dan harga produk!', 'warning')
    return
  }

  adminStore.addProduct({
    name: newForm.value.name,
    category: newForm.value.category,
    price: newForm.value.price,
    stock: newForm.value.stock || 10,
    description: newForm.value.description,
    badge: newForm.value.badge,
    image: newForm.value.image,
  })

  // Reset form & close modal
  newForm.value = {
    name: '',
    category: 'Electronics',
    price: '',
    stock: '',
    description: '',
    badge: 'Baru',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
  }
  isAddModalOpen.value = false
}

function handleUpdateStock(id, currentStock, delta) {
  adminStore.updateStock(id, currentStock + delta)
}

function handleDelete(id, name) {
  if (confirm(`Apakah Anda yakin ingin menghapus produk "${name}" dari toko?`)) {
    adminStore.deleteProduct(id)
  }
}
</script>

<template>
  <div class="admin-products">
    <!-- Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Manajemen Produk Toko</h1>
        <p class="page-subtitle">
          Kelola katalog produk, stok etalase, dan harga jual produk toko SHOPNEST.
        </p>
      </div>

      <button type="button" class="btn btn-primary btn-sm" @click="isAddModalOpen = true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          stroke="currentColor"
          class="btn-icon"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <span>+ Tambah Produk Baru</span>
      </button>
    </div>

    <!-- Filter & Search Bar -->
    <div class="filter-card card">
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

    <!-- Products Table Card -->
    <div class="table-card card">
      <div class="table-meta-bar">
        <span class="count-text"
          >Menampilkan <strong>{{ filteredProducts.length }}</strong> produk</span
        >
      </div>

      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th style="width: 70px">Foto</th>
              <th>Nama Produk</th>
              <th>Kategori</th>
              <th>Harga Jual</th>
              <th style="width: 160px">Kelola Stok</th>
              <th>Status</th>
              <th style="text-align: right; width: 100px">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in filteredProducts" :key="product.id">
              <!-- Foto -->
              <td>
                <img :src="product.image" :alt="product.name" class="product-thumb" />
              </td>

              <!-- Nama & Badge -->
              <td>
                <div class="product-name-col">
                  <span class="product-name-text">{{ product.name }}</span>
                  <span v-if="product.badge" class="badge-mini">{{ product.badge }}</span>
                </div>
              </td>

              <!-- Kategori -->
              <td>
                <span class="cat-badge-label">{{ product.category }}</span>
              </td>

              <!-- Harga -->
              <td>
                <span class="price-text">{{ formatRupiah(product.price) }}</span>
              </td>

              <!-- Stok Controls -->
              <td>
                <div class="stock-editor">
                  <button
                    type="button"
                    class="stock-step-btn"
                    :disabled="product.stock <= 0"
                    @click="handleUpdateStock(product.id, product.stock, -1)"
                    title="Kurangi 1"
                  >
                    -
                  </button>
                  <span class="stock-num" :class="{ 'stock-low': product.stock <= 5 }">
                    {{ product.stock }}
                  </span>
                  <button
                    type="button"
                    class="stock-step-btn"
                    @click="handleUpdateStock(product.id, product.stock, 1)"
                    title="Tambah 1"
                  >
                    +
                  </button>
                </div>
              </td>

              <!-- Status -->
              <td>
                <span
                  class="badge"
                  :class="
                    product.stock > 10
                      ? 'badge-success'
                      : product.stock > 0
                        ? 'badge-warning'
                        : 'badge-danger'
                  "
                >
                  {{
                    product.stock > 10 ? 'Stok Cukup' : product.stock > 0 ? 'Stok Menipis' : 'Habis'
                  }}
                </span>
              </td>

              <!-- Aksi -->
              <td style="text-align: right">
                <button
                  type="button"
                  class="btn-trash"
                  @click="handleDelete(product.id, product.name)"
                  title="Hapus produk"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="trash-icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Tambah Produk -->
    <div v-if="isAddModalOpen" class="modal-backdrop" @click.self="isAddModalOpen = false">
      <div class="modal-dialog card">
        <div class="modal-header">
          <h2 class="modal-title">Tambah Produk Baru</h2>
          <button type="button" class="btn-close" @click="isAddModalOpen = false">&times;</button>
        </div>

        <form class="modal-form" @submit.prevent="submitNewProduct">
          <div class="form-group">
            <label class="form-label">Nama Produk *</label>
            <input
              v-model="newForm.name"
              type="text"
              class="input-field"
              placeholder="Contoh: Smart TV 43 Inch 4K UHD"
              required
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Kategori *</label>
              <select v-model="newForm.category" class="input-field">
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Accessories">Accessories</option>
                <option value="Home">Home</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Harga Jual (Rp) *</label>
              <input
                v-model="newForm.price"
                type="number"
                class="input-field"
                placeholder="1500000"
                min="1000"
                required
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Jumlah Stok *</label>
              <input
                v-model="newForm.stock"
                type="number"
                class="input-field"
                placeholder="15"
                min="0"
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label">Badge Promo (Opsional)</label>
              <input
                v-model="newForm.badge"
                type="text"
                class="input-field"
                placeholder="Baru / Best Seller"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Deskripsi Singkat</label>
            <textarea
              v-model="newForm.description"
              class="input-field"
              rows="3"
              placeholder="Jelaskan fitur dan spesifikasi utama produk..."
            ></textarea>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn btn-secondary btn-sm" @click="isAddModalOpen = false">
              Batal
            </button>
            <button type="submit" class="btn btn-primary btn-sm">Simpan &amp; Publikasikan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-products {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
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
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.page-subtitle {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  margin-top: var(--space-1);
}

.btn-icon {
  width: 16px;
  height: 16px;
}

/* Filter Card */
.filter-card {
  padding: var(--space-4) var(--space-6);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
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
  max-width: 450px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--color-text-muted);
}

.admin-search-input {
  width: 100%;
  padding: 0.65rem 1rem 0.65rem 2.4rem;
  background-color: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s;
}

.admin-search-input:focus {
  border-color: var(--color-primary);
  background-color: #ffffff;
}

.cat-filter-pills {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.cat-pill-btn {
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-full);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  background-color: #f1f5f9;
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all 0.2s;
}

.cat-pill-btn:hover {
  background-color: #eff6ff;
  color: var(--color-primary);
}

.cat-pill-btn.active {
  background-color: var(--color-primary);
  color: #ffffff;
  border-color: var(--color-primary);
}

/* Table Card */
.table-card {
  background-color: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.table-meta-bar {
  padding: var(--space-4) var(--space-6);
  border-bottom: 1px solid var(--color-border-light);
  background-color: #ffffff;
}

.count-text {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.admin-table th {
  padding: 0.85rem 1.25rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-text-secondary);
  background-color: #f8fafc;
  border-bottom: 1px solid var(--color-border);
  white-space: nowrap;
}

.admin-table td {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--color-border-light);
  vertical-align: middle;
}

.admin-table tr:hover {
  background-color: #f8fafc;
}

.product-thumb {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-sm);
  object-fit: cover;
  border: 1px solid var(--color-border);
  background-color: #f1f5f9;
}

.product-name-col {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.product-name-text {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.3;
}

.badge-mini {
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--color-primary);
  background-color: #eff6ff;
  padding: 1px 6px;
  border-radius: 4px;
  width: fit-content;
}

.cat-badge-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #475569;
  background-color: #f1f5f9;
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-sm);
}

.price-text {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--color-text);
}

.stock-editor {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: #f8fafc;
  padding: 3px 6px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

.stock-step-btn {
  width: 26px;
  height: 26px;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  background-color: #ffffff;
  color: var(--color-text);
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.stock-step-btn:hover:not(:disabled) {
  background-color: var(--color-primary);
  color: #ffffff;
  border-color: var(--color-primary);
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

.btn-trash {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 6px;
  border-radius: var(--radius-sm);
  transition:
    color 0.2s,
    background-color 0.2s;
}

.btn-trash:hover {
  color: #ef4444;
  background-color: #fef2f2;
}

.trash-icon {
  width: 18px;
  height: 18px;
}

/* Modal Backdrop & Dialog */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-dialog {
  background-color: #ffffff;
  border-radius: var(--radius-xl);
  max-width: 540px;
  width: 100%;
  padding: var(--space-6);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  animation: modalPop 0.25s ease-out;
}

@keyframes modalPop {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text);
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--color-text-muted);
  cursor: pointer;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-top: var(--space-4);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.form-label {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-text);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border-light);
  margin-top: var(--space-2);
}
</style>
