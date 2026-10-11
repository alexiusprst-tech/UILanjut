import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

/**
 * Site Map Router SHOPNEST — Online Store
 *
 * Struktur Navigasi:
 * HOME ( / )
 * ├── PRODUCTS ( /products )
 * │   └── PRODUCT DETAIL ( /products/:id )
 * ├── CART ( /cart )
 * └── PROFILE ( /profile )
 */

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Beranda — SHOPNEST Online Store',
      },
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue'),
      meta: {
        title: 'Katalog Produk — SHOPNEST',
      },
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      component: () => import('../views/ProductDetailView.vue'),
      meta: {
        title: 'Detail Produk — SHOPNEST',
      },
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
      meta: {
        title: 'Keranjang Belanja — SHOPNEST',
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: {
        title: 'Profil Pengguna — SHOPNEST',
      },
    },
    {
      path: '/dashboard',
      component: () => import('../layouts/DashboardLayout.vue'),
      children: [
        {
          path: '',
          name: 'dashboard-overview',
          component: () => import('../views/admin/AdminOverviewView.vue'),
          meta: {
            title: 'Ringkasan Toko — Admin SHOPNEST',
            layout: 'dashboard',
          },
        },
        {
          path: 'products',
          name: 'admin-products',
          component: () => import('../views/admin/AdminProductsView.vue'),
          meta: {
            title: 'Kelola Produk — Admin SHOPNEST',
            layout: 'dashboard',
          },
        },
        {
          path: 'orders',
          name: 'admin-orders',
          component: () => import('../views/admin/AdminOrdersView.vue'),
          meta: {
            title: 'Pesanan Masuk — Admin SHOPNEST',
            layout: 'dashboard',
          },
        },
        {
          path: 'settings',
          name: 'admin-settings',
          component: () => import('../views/admin/AdminSettingsView.vue'),
          meta: {
            title: 'Pengaturan Toko — Admin SHOPNEST',
            layout: 'dashboard',
          },
        },
      ],
      meta: {
        layout: 'dashboard',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: {
        title: 'Halaman Tidak Ditemukan — SHOPNEST',
      },
    },
  ],
})

// Dynamic title updates
router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
})

export default router
