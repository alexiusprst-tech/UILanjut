import { ref, computed, watch } from 'vue'

const EVENTS_STORAGE_KEY = 'shopnest_ecommerce_events_store_v1'
const TICKETS_STORAGE_KEY = 'shopnest_ecommerce_tickets_store_v1'

// Data Awal Acara & Workshop Bertema E-Commerce
const initialEvents = [
  {
    id: 1,
    title: 'E-Commerce Conversion & UX Masterclass: Designing High-Converting Digital Stores',
    category: 'Workshop',
    date: 'Oct 23, 2026 • 10:30 AM',
    location: 'Jakarta Convention Center',
    venue: 'Hall B, Jakarta Convention Center (JCC)',
    quota: 1000,
    availableSeats: 1000,
    status: 'active', // 'active' | 'completed'
    image:
      'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
    description:
      'Bawa Toko Online Anda ke Level Selanjutnya! Pelajari strategi mendesain pengalaman belanja digital kelas dunia yang memaksimalkan konversi penjualan, alur checkout tanpa friksi, dan loyalitas pembeli. Bedah langsung studi kasus funnel toko online, arsitektur keranjang belanja, hingga psikologi visual dalam platform e-commerce modern.',
    highlights: [
      'Conversion Funnel Optimization: Bedah UX Checkout & Keranjang Belanja',
      'Design Systems for Scalable E-Commerce Catalogs',
      'High-Level Networking dengan Retail Director & E-Commerce Experts',
      'Sertifikat Resmi SHOPNEST & Goodie Bag Eksklusif',
    ],
  },
  {
    id: 2,
    title: 'Next-Gen E-Commerce Architecture & Performance Summit 2026',
    category: 'Conference',
    date: 'Nov 05, 2026 • 08:30 AM',
    location: 'ICE BSD City, Tangerang',
    venue: 'Grand Ballroom ICE BSD',
    quota: 500,
    availableSeats: 480,
    status: 'active',
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    description:
      'Konferensi tahunan terbesar yang mempertemukan engineer e-commerce terkemuka, CTO retail digital, dan pakar infrastruktur web. Membahas tren headless commerce, payment gateway real-time, dan rekayasa performa toko online saat lonjakan promo festival belanja.',
    highlights: [
      'Headless Commerce & Microservices di Platform Toko Skala Besar',
      'Payment Gateway Resilience & Strategi Anti-Fraud Real-Time',
      'Live Profiling Website & Bottleneck Analysis Saat Flash Sale',
      'Networking Dinner & Exhibition Booth Brand Digital',
    ],
  },
  {
    id: 3,
    title: 'Omnichannel Retail & Smart Logistics Masterclass',
    category: 'Workshop',
    date: 'Nov 12, 2026 • 09:00 AM',
    location: 'Design Centre Building, Bandung',
    venue: 'Auditorium 3, Design Centre Building',
    quota: 150,
    availableSeats: 148,
    status: 'active',
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    description:
      'Kupas tuntas integrasi inventaris toko fisik dan marketplace online (omnichannel), otomatisasi fulfillment gudang, strategi pengiriman Same-Day Delivery, dan optimasi rantai pasok retail modern.',
    highlights: [
      'Sinkronisasi Stok Inventaris Real-Time Multi-Kanal',
      'Live Demo Manajemen Gudang Pintar & Routing Kurir Otomatis',
      'Studi Kasus Efisiensi Biaya Logistik E-Commerce hingga 35%',
      'Review Sistem 1-on-1 dengan Konsultan Supply Chain Senior',
    ],
  },
  {
    id: 4,
    title: 'Live Commerce & Social Shopping Growth Seminar',
    category: 'Seminar',
    date: 'Nov 18, 2026 • 13:00 PM',
    location: 'Auditorium Telkom University, Bandung',
    venue: 'Gedung Damar Lt. 2, Bandung',
    quota: 250,
    availableSeats: 210,
    status: 'active',
    image:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    description:
      'Panduan praktis menguasai tren live shopping, kolaborasi affiliate kreator, dan strategi retargeting otomatis untuk mendongkrak penjualan toko online hingga berlipat ganda.',
    highlights: [
      'Formula Live Streaming Interaktif dengan Retensi Penonton Tinggi',
      'Manajemen Flash Sale & Dynamic Pricing Anti-Crash',
      'Toolkit Automasi Notifikasi Keranjang Belanja Tertinggal',
      'Sesi Q&A Interaktif dengan Top Live Commerce Creator',
    ],
  },
  {
    id: 5,
    title: 'E-Commerce AI Innovation Hackathon & Competition',
    category: 'Competition',
    date: 'Dec 05, 2026 • 09:00 AM',
    location: 'Digital Hub BSD, Tangerang',
    venue: 'Innovation Hall, Digital Hub',
    quota: 200,
    availableSeats: 175,
    status: 'active',
    image:
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    description:
      'Kompetisi rekayasa produk e-commerce 48 jam untuk menciptakan fitur rekomendasi belanja berbasis kecerdasan buatan (AI), pencarian visual produk (visual search), dan asisten belanja interaktif masa depan.',
    highlights: [
      'Total Hadiah Ratusan Juta Rupiah & Akses Inkubasi Eksklusif',
      'Solusi Pemenang Berkesempatan Diintegrasikan ke Ekosistem SHOPNEST',
      'Penjurian oleh CPO & Head of Engineering Marketplace Terkemuka',
    ],
  },
  {
    id: 6,
    title: 'D2C Brand Founders & Merchant Networking Meetup',
    category: 'Meetup',
    date: 'Dec 12, 2026 • 18:30 PM',
    location: 'SCBD Creative Space, Jakarta Selatan',
    venue: 'The Space Lt. 2, SCBD Lot 8',
    quota: 100,
    availableSeats: 92,
    status: 'active',
    image:
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
    description:
      'Temu santai para perintis brand Direct-to-Consumer (D2C), merchant marketplace, dan pelaku ekosistem digital untuk bertukar wawasan seputar margin produk, retensi pembeli, dan strategi pendanaan ekspansi toko.',
    highlights: [
      'Diskusi Meja Bundar: Strategi Profitabilitas vs Burn Rate di Retail Digital',
      'Sesi Pitching & Kemitraan Antar Merchant Toko',
      'Free Flow Coffee & Networking Session Hangat',
    ],
  },
]

// Memuat data acara dari localStorage atau fallback ke initialEvents
function loadStoredEvents() {
  if (typeof window === 'undefined') return initialEvents
  try {
    const saved = localStorage.getItem(EVENTS_STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (err) {
    console.error('[useEvents] Gagal memuat acara dari localStorage:', err)
  }
  return initialEvents
}

// Memuat data tiket konfirmasi dari localStorage
function loadStoredTickets() {
  if (typeof window === 'undefined') return []
  try {
    const saved = localStorage.getItem(TICKETS_STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed)) {
        return parsed
      }
    }
  } catch (err) {
    console.error('[useEvents] Gagal memuat tiket dari localStorage:', err)
  }
  return []
}

// Module-level reactive Single Source of Truth
const events = ref(loadStoredEvents())
const tickets = ref(loadStoredTickets())

// Watchers untuk persistensi otomatis ke localStorage
if (typeof window !== 'undefined') {
  watch(
    events,
    (val) => {
      try {
        localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(val))
      } catch (err) {
        console.error('[useEvents] Gagal menyimpan acara ke localStorage:', err)
      }
    },
    { deep: true },
  )

  watch(
    tickets,
    (val) => {
      try {
        localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(val))
      } catch (err) {
        console.error('[useEvents] Gagal menyimpan tiket ke localStorage:', err)
      }
    },
    { deep: true },
  )
}

export function useEvents() {
  // =========================================================================
  // DERIVED STATE: Dihitung secara reaktif dengan computed()
  // =========================================================================
  const totalEvents = computed(() => events.value.length)
  const activeEvents = computed(() => events.value.filter((e) => e.status !== 'completed'))
  const completedEvents = computed(() => events.value.filter((e) => e.status === 'completed'))
  const totalTickets = computed(() => tickets.value.length)

  // =========================================================================
  // HELPER PENCARIAN
  // =========================================================================
  function getEventById(id) {
    const numericId = Number(id)
    return events.value.find((e) => e.id === numericId)
  }

  function getTicketById(ticketIdOrRef) {
    if (!ticketIdOrRef) return null
    return (
      tickets.value.find(
        (t) =>
          t.id === ticketIdOrRef ||
          t.bookingReference === ticketIdOrRef ||
          t.bookingReference === `GTH-${ticketIdOrRef}` ||
          t.id === `TKT-${ticketIdOrRef}`,
      ) || null
    )
  }

  /**
   * Cek apakah user (berdasarkan email atau acara) sudah terdaftar pada acara ini
   * Digunakan untuk menampilkan lencana "Registered" dan adaptasi tombol detail
   */
  function isUserRegistered(eventId, email = null) {
    const numericId = Number(eventId)
    if (email) {
      const cleanEmail = email.trim().toLowerCase()
      return tickets.value.some(
        (t) => t.eventId === numericId && t.email.toLowerCase() === cleanEmail,
      )
    }
    // Jika tidak spesifik email, cek apakah sudah ada tiket terdaftar untuk event ini di sesi pengguna
    return tickets.value.some((t) => t.eventId === numericId)
  }

  function getTicketForEvent(eventId) {
    const numericId = Number(eventId)
    return tickets.value.find((t) => t.eventId === numericId) || null
  }

  // =========================================================================
  // MUTASI STATE PENDAFTARAN (MODUL 5)
  // =========================================================================

  /**
   * 1. Register Event:
   * - Menghasilkan booking reference unik GTH-XXXX
   * - Mengurangi kuota kursi tersedia pada acara (kuota berkurang)
   * - Menyimpan tiket baru ke state reaktif dan localStorage
   */
  function registerEvent(eventId, formData) {
    const event = getEventById(eventId)
    if (!event) {
      throw new Error('Acara tidak ditemukan.')
    }

    if (event.availableSeats <= 0) {
      throw new Error('Mohon maaf, kuota kursi untuk acara ini sudah penuh.')
    }

    // Cek pendaftaran ganda
    if (isUserRegistered(event.id, formData.email)) {
      throw new Error(
        `Alamat email ${formData.email} sudah terdaftar pada acara ini. Pendaftaran ganda tidak diperbolehkan.`,
      )
    }

    // Buat nomor tiket acak unik (Format: GTH-XXXX)
    const randomCode = Math.floor(1000 + Math.random() * 9000)
    const bookingReference = `GTH-${randomCode}`
    const ticketId = `TKT-${randomCode}`

    const newTicket = {
      id: ticketId,
      bookingReference,
      eventId: event.id,
      eventTitle: event.title,
      eventCategory: event.category,
      eventDate: event.date,
      eventLocation: event.location,
      eventVenue: event.venue || event.location,
      eventImage: event.image,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      dob: formData.dob || '',
      reason: formData.reason ? formData.reason.trim() : '',
      registeredAt: new Date().toISOString(),
      status: 'confirmed',
    }

    // Mutasi 1: Kurangi kuota acara
    event.availableSeats = Math.max(0, event.availableSeats - 1)

    // Mutasi 2: Simpan tiket terkonfirmasi
    tickets.value.unshift(newTicket)

    return newTicket
  }

  /**
   * 2. Cancel Registration (Pembatalan Tiket):
   * - Mengembalikan / memulihkan kuota kursi pada acara
   * - Menghapus tiket dari daftar tiket peserta
   */
  function cancelRegistration(ticketIdOrRef) {
    const ticketIndex = tickets.value.findIndex(
      (t) => t.id === ticketIdOrRef || t.bookingReference === ticketIdOrRef,
    )

    if (ticketIndex === -1) {
      return false
    }

    const removedTicket = tickets.value.splice(ticketIndex, 1)[0]

    // Pulihkan kuota pada acara
    const event = getEventById(removedTicket.eventId)
    if (event) {
      event.availableSeats = Math.min(event.quota, (event.availableSeats || 0) + 1)
    }

    return true
  }

  // =========================================================================
  // PEMBERSIHAN BERANTAI (CASCADE DELETE)
  // Menghapus tiket terkait secara otomatis ketika acara dihapus panitia
  // =========================================================================
  function deleteEvent(eventId) {
    const numericId = Number(eventId)
    const eventIndex = events.value.findIndex((e) => e.id === numericId)
    if (eventIndex !== -1) {
      events.value.splice(eventIndex, 1)

      // Pembersihan berantai: Hapus seluruh tiket yang terasosiasi dengan acara ini
      tickets.value = tickets.value.filter((t) => t.eventId !== numericId)
      return true
    }
    return false
  }

  function toggleEventStatus(eventId) {
    const event = getEventById(eventId)
    if (event) {
      event.status = event.status === 'completed' ? 'active' : 'completed'
      return event
    }
    return null
  }

  function addEvent(eventData) {
    const nextId =
      events.value.length > 0 ? Math.max(...events.value.map((e) => Number(e.id) || 0)) + 1 : 1

    const quotaNum = Number(eventData.quota) || 100
    const newEvent = {
      id: nextId,
      title: eventData.title.trim(),
      category: eventData.category || 'Workshop',
      date: eventData.date || 'TBD',
      location: eventData.location || 'Online',
      venue: eventData.venue || eventData.location || 'Online',
      quota: quotaNum,
      availableSeats: quotaNum,
      status: 'active',
      image:
        eventData.image ||
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      description: eventData.description ? eventData.description.trim() : '',
      highlights: eventData.highlights || ['Materi Praktis Komprehensif', 'Sertifikat Kehadiran'],
    }

    events.value.unshift(newEvent)
    return newEvent
  }

  function resetEventsToDefault() {
    events.value = JSON.parse(JSON.stringify(initialEvents))
    tickets.value = []
    if (typeof window !== 'undefined') {
      localStorage.removeItem(EVENTS_STORAGE_KEY)
      localStorage.removeItem(TICKETS_STORAGE_KEY)
    }
  }

  return {
    events,
    tickets,
    totalEvents,
    activeEvents,
    completedEvents,
    totalTickets,
    getEventById,
    getTicketById,
    isUserRegistered,
    getTicketForEvent,
    registerEvent,
    cancelRegistration,
    deleteEvent,
    toggleEventStatus,
    addEvent,
    resetEventsToDefault,
  }
}
