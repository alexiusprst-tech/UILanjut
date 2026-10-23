import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

/**
 * Site Map Router SHOPNEST — E-Commerce & Gatherly Event Management Platform
 *
 * Struktur Navigasi Terpadu:
 * 1. E-COMMERCE CORE:
 *    - Home ( / )
 *    - Products ( /products, /products/:id )
 *    - Cart ( /cart )
 *    - Profile ( /profile )
 *    - Admin Dashboard ( /dashboard )
 *
 * 2. MODUL 5: USER FLOW & INTERACTION FLOW:
 *    - Event Catalog ( /browse, /events )
 *    - Event Detail & Adaptive Action Panel ( /events/:id )
 *    - Two-Column Event Registration Form ( /events/:id/register )
 *    - Participant Ticket Wallet ( /your-events )
 *    - Full-Page Official Ticket Receipt Pass ( /tickets/:ticketId )
 *    - Organizer Dashboard & Cascade Deletion ( /event-management )
 *    - Info Pages ( /about, /contact, /category/:id? )
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
    // -------------------------------------------------------------------------
    // E-Commerce Routes
    // -------------------------------------------------------------------------
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

    // -------------------------------------------------------------------------
    // Modul 5: User Flow & Interaction Flow (Events & Tickets)
    // -------------------------------------------------------------------------
    {
      path: '/browse',
      name: 'browse',
      component: () => import('../views/Browse.vue'),
      meta: {
        title: 'Browse & Discover Events — SHOPNEST Gatherly',
      },
    },
    {
      path: '/events',
      name: 'events-list',
      component: () => import('../views/EventList.vue'),
      meta: {
        title: 'Katalog Acara & Workshop — SHOPNEST',
      },
    },
    {
      path: '/events/:id',
      name: 'event-detail',
      component: () => import('../views/EventDetail.vue'),
      meta: {
        title: 'Detail Acara & Registrasi — SHOPNEST',
      },
    },
    {
      path: '/events/:id/register',
      name: 'event-registration',
      component: () => import('../views/EventRegistration.vue'),
      meta: {
        title: 'Formulir Pendaftaran Acara — SHOPNEST',
      },
    },
    {
      path: '/your-events',
      name: 'your-events',
      component: () => import('../views/YourEvents.vue'),
      meta: {
        title: 'Your Events — Dompet Tiket Peserta',
      },
    },
    {
      path: '/tickets/:ticketId',
      name: 'ticket-receipt',
      component: () => import('../views/TicketReceipt.vue'),
      meta: {
        title: 'Official Digital Pass Ticket Receipt — Gatherly',
      },
    },
    {
      path: '/event-management',
      name: 'event-management',
      component: () => import('../views/EventManagement.vue'),
      meta: {
        title: 'Event Management Dashboard — Organizer',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue'),
      meta: {
        title: 'Tentang Kami — SHOPNEST',
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Contact.vue'),
      meta: {
        title: 'Hubungi Kami — SHOPNEST',
      },
    },
    {
      path: '/category/:id?',
      name: 'category',
      component: () => import('../views/Category.vue'),
      meta: {
        title: 'Kategori Acara — SHOPNEST',
      },
    },

    // -------------------------------------------------------------------------
    // Admin Storefront Dashboard (Rail & Pane Layout)
    // -------------------------------------------------------------------------
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
        {
          path: 'events',
          name: 'admin-events',
          component: () => import('../views/EventManagement.vue'),
          meta: {
            title: 'Manajemen Acara — Admin SHOPNEST',
            layout: 'dashboard',
          },
        },
      ],
      meta: {
        layout: 'dashboard',
      },
    },

    // -------------------------------------------------------------------------
    // 404 Catch-All Route
    // -------------------------------------------------------------------------
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
