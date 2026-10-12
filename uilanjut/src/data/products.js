/**
 * Mock Data Produk untuk SHOPNEST — Online Store
 * Memenuhi kebutuhan kategori: Electronics, Fashion, Accessories, Home
 */

export const categories = [
  { id: 'all', name: 'Semua', icon: 'grid' },
  {
    id: 'Electronics',
    name: 'Electronics',
    icon: 'cpu',
    description: 'Gadget & perangkat pintar berkualitas',
  },
  { id: 'Fashion', name: 'Fashion', icon: 'shirt', description: 'Pakaian & gaya tren terkini' },
  {
    id: 'Accessories',
    name: 'Accessories',
    icon: 'watch',
    description: 'Pelengkap gaya hidup harian',
  },
  { id: 'Home', name: 'Home', icon: 'home', description: 'Perabot & kenyamanan rumah modern' },
]

export const products = [
  {
    id: 1,
    name: 'Laptop ASUS ROG Zephyrus G14',
    slug: 'laptop-asus-rog-zephyrus-g14',
    category: 'Electronics',
    price: 23499000,
    originalPrice: 25999000,
    rating: 4.9,
    reviewsCount: 128,
    stock: 8,
    isFeatured: true,
    badge: 'Best Seller',
    image:
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Laptop gaming ultra-portable dengan performa monster. Ditenagai prosesor AMD Ryzen 9 dan kartu grafis NVIDIA GeForce RTX 4060, layar OLED 120Hz ROG Nebula Display yang sangat tajam dan akurat untuk desainer maupun gamer profesional.',
    features: [
      'Prosesor AMD Ryzen 9 7940HS Series',
      'Grafis NVIDIA GeForce RTX 4060 8GB GDDR6',
      'RAM 16GB LPDDR5X 6400MHz & SSD 1TB NVMe PCIe 4.0',
      'Layar 14 inci 3K OLED 120Hz 100% DCI-P3 Color Gamut',
      'Baterai tahan lama hingga 10 jam pemakaian normal',
      'Garansi Resmi ASUS Indonesia 2 Tahun',
    ],
  },
  {
    id: 2,
    name: 'Wireless Mouse Logitech MX Master 3S',
    slug: 'wireless-mouse-logitech-mx-master-3s',
    category: 'Electronics',
    price: 1450000,
    originalPrice: 1699000,
    rating: 4.8,
    reviewsCount: 342,
    stock: 24,
    isFeatured: true,
    badge: 'Populer',
    image:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Mouse ergonomis nirkabel paling ikonik dengan scroll wheel MagSpeed elektromagnetik yang super presisi dan klik senyap Quiet Clicks. Sensor 8.000 DPI yang dapat bekerja di semua permukaan kaca.',
    features: [
      'Quiet Clicks — 90% lebih hening dari generasi sebelumnya',
      'MagSpeed Scroll Wheel berkecepatan 1.000 baris per detik',
      'Sensor Darkfield 8.000 DPI untuk akurasi tinggi',
      'Koneksi ganda Bluetooth LE & Logi Bolt USB Receiver',
      'Baterai isi ulang USB-C tahan hingga 70 hari',
    ],
  },
  {
    id: 3,
    name: 'Mechanical Keyboard Keychron K2 Pro',
    slug: 'mechanical-keyboard-keychron-k2-pro',
    category: 'Electronics',
    price: 1699000,
    originalPrice: 1899000,
    rating: 4.9,
    reviewsCount: 215,
    stock: 14,
    isFeatured: true,
    badge: 'Trending',
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Keyboard mekanik nirkabel 75% QMK/VIA custom. Dilengkapi hot-swappable switch, keycaps double-shot PBT OSA profile, dan peredam suara busa acoustic foam untuk pengalaman mengetik yang renyah dan empuk.',
    features: [
      'Kustomisasi tombol tak terbatas via QMK/VIA Web App',
      'Hot-swappable PCB kompatibel switch 3-pin & 5-pin MX',
      'Keycaps OSA Profile Double-shot PBT tahan aus',
      'Konektivitas Bluetooth 5.1 & Type-C wired mode',
      'Mendukung layout Mac dan Windows',
    ],
  },
  {
    id: 4,
    name: 'Gaming Headset SteelSeries Arctis Nova 7',
    slug: 'gaming-headset-steelseries-arctis-nova-7',
    category: 'Electronics',
    price: 2890000,
    originalPrice: 3200000,
    rating: 4.7,
    reviewsCount: 96,
    stock: 9,
    isFeatured: true,
    badge: 'Diskon 10%',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Headset gaming nirkabel multi-platform dengan Almighty Audio dan driver speaker High Fidelity. Dilengkapi mikrofon ClearCast Gen 2 yang ditenagai Sonar AI Noise Cancellation.',
    features: [
      'Sistem Akustik Nova dengan Driver Hi-Fi kustom',
      'Koneksi Simultan 2.4GHz Nirkabel dan Bluetooth',
      'Baterai tahan 38 jam dengan Fast Charging USB-C',
      'Mikrofon AI-Powered Noise Cancelling ClearCast',
      '360° Spatial Audio untuk deteksi posisi musuh akurat',
    ],
  },
  {
    id: 5,
    name: 'Smartwatch Garmin Venu 3 AMOLED',
    slug: 'smartwatch-garmin-venu-3-amoled',
    category: 'Electronics',
    price: 6899000,
    originalPrice: 7499000,
    rating: 4.8,
    reviewsCount: 84,
    stock: 12,
    isFeatured: false,
    badge: 'Premium',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Smartwatch fitness GPS canggih dengan layar AMOLED 1.4 inci yang memukau. Dilengkapi fitur Sleep Coach, Body Battery Energy Monitoring, dan speaker/mic built-in untuk panggilan suara langsung dari pergelangan tangan.',
    features: [
      'Layar Sentuh AMOLED 1.4 inci Always-On Display',
      'Baterai tahan hingga 14 hari dalam mode smartwatch',
      'Lebih dari 30 aplikasi olahraga indoor & GPS bawaan',
      'Sensor detak jantung Gen 5 + Pulse Ox saturation',
      'Speaker dan mikrofon internal untuk menerima telepon',
    ],
  },
  {
    id: 6,
    name: 'Minimalist Urban Backpack 25L Waterproof',
    slug: 'minimalist-urban-backpack-25l',
    category: 'Accessories',
    price: 489000,
    originalPrice: 599000,
    rating: 4.7,
    reviewsCount: 167,
    stock: 35,
    isFeatured: false,
    badge: 'Favorit',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Tas ransel urban berkapasitas 25 liter berbahan kain Cordura tahan air (water repellent). Dilengkapi kompartemen empuk khusus laptop hingga ukuran 16 inci, port pengisian USB eksternal, dan desain ergonomis anti-pegal.',
    features: [
      'Material High-Grade Cordura Ballistic Nylon Water-Repellent',
      'Kompartemen empuk laptop 16 inci + tablet pocket',
      'Sistem sirkulasi udara di bantalan punggung (Airflow)',
      'Hidden anti-theft pocket untuk dompet dan paspor',
      'Kapasitas lega 25 Liter dengan 8 kantong partisi',
    ],
  },
  {
    id: 7,
    name: 'Wireless Noise-Cancelling Earbuds Pro',
    slug: 'wireless-noise-cancelling-earbuds-pro',
    category: 'Electronics',
    price: 1899000,
    originalPrice: 2199000,
    rating: 4.8,
    reviewsCount: 198,
    stock: 20,
    isFeatured: false,
    badge: 'ANC Pro',
    image:
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Earbuds TWS nirkabel dengan Active Noise Cancellation hybrid tingkat lanjut yang mampu meredam suara bising lingkungan hingga 45dB. Menghadirkan audio spasial 3D resolusi tinggi Hi-Res LDAC.',
    features: [
      'Hybrid ANC Peredam Bising Aktif adaptif hingga 45dB',
      'Driver Dinamis 11mm dengan sertifikasi Hi-Res Wireless',
      'Ketahanan baterai total 32 jam bersama charging case',
      'Sertifikasi ketahanan air & keringat IPX5',
      'Fitur Transparency Mode untuk mendengar suara sekitar',
    ],
  },
  {
    id: 8,
    name: 'Smartphone Flagship Edge 5G 256GB',
    slug: 'smartphone-flagship-edge-5g-256gb',
    category: 'Electronics',
    price: 11299000,
    originalPrice: 12499000,
    rating: 4.9,
    reviewsCount: 76,
    stock: 11,
    isFeatured: true,
    badge: 'Flagship',
    image:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Ponsel pintar flagship dengan layar Dynamic AMOLED 2X 120Hz, kamera utama 108MP dengan OIS, prosesor 4nm super kencang, dan teknologi pengisian daya kilat 67W Super Fast Charging.',
    features: [
      'Layar 6.7 inci Curved AMOLED 120Hz HDR10+',
      'Chipset Flagship Octa-core 4nm fabrikasi terdepan',
      'Kamera Pro 108MP + 12MP Ultra-Wide + 10MP Telephoto 3x',
      'Baterai 5.000 mAh dengan 67W Fast Charging & Wireless',
      'Penyimpanan internal UFS 3.1 256GB & RAM 12GB',
    ],
  },
  {
    id: 9,
    name: 'Casual Oxford Cotton Slim Shirt',
    slug: 'casual-oxford-cotton-slim-shirt',
    category: 'Fashion',
    price: 299000,
    originalPrice: 389000,
    rating: 4.6,
    reviewsCount: 154,
    stock: 42,
    isFeatured: false,
    badge: 'Fashion Pria',
    image:
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Kemeja lengan panjang berbahan katun Oxford 100% premium dengan potongan modern slim-fit. Bahan lembut, sejuk dipakai seharian, serta mudah disetrika. Sangat cocok untuk gaya kasual maupun semi-formal ke kantor.',
    features: [
      '100% Katun Oxford Grade A breathable',
      'Potongan Slim-Fit modern proporsional',
      'Kancing jahitan silang kokoh & awet',
      'Kerah Button-down yang rapi tegak',
      'Tersedia ukuran S, M, L, XL, XXL',
    ],
  },
  {
    id: 10,
    name: 'Ergonomic Mesh Office Chair Pro',
    slug: 'ergonomic-mesh-office-chair-pro',
    category: 'Home',
    price: 1750000,
    originalPrice: 2100000,
    rating: 4.8,
    reviewsCount: 88,
    stock: 15,
    isFeatured: false,
    badge: 'Ergonomis',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Kursi kerja ergonomis dengan sandaran jaring mesh elastis yang menjaga sirkulasi udara punggung. Dilengkapi lumbar support yang dapat diatur ketinggiannya dan sandaran tangan 3D untuk kenyamanan kerja berjam-jam.',
    features: [
      'Bahan Breathable Korean Mesh elastis tinggi',
      'Lumbar Support 2D yang dapat disesuaikan',
      'Mekanisme Reclining sandaran hingga 135 derajat',
      'Hidrolik Kelas 4 bersertifikasi SGS & BIFMA',
      'Roda nilon senyap anti-gores pada lantai kayu/keramik',
    ],
  },
  {
    id: 11,
    name: 'Premium Leather Minimalist Cardholder Wallet',
    slug: 'premium-leather-cardholder-wallet',
    category: 'Accessories',
    price: 215000,
    originalPrice: 279000,
    rating: 4.7,
    reviewsCount: 210,
    stock: 50,
    isFeatured: false,
    badge: 'RFID Protected',
    image:
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Dompet kartu kulit asli (genuine top-grain leather) berdesain ramping dan elegan. Dilengkapi lapisan pelindung anti RFID untuk mencegah pencurian data kartu nirkabel.',
    features: [
      '100% Kulit Sapi Asli Top-Grain Leather',
      'Pelindung RFID Blocking Technology bawaan',
      'Kapasitas hingga 8 kartu kredit + 1 slot uang kertas',
      'Desain ultra-tipis hanya 0.6 cm ketebalan',
      'Jahitan presisi tangan dengan benang wax nilon',
    ],
  },
  {
    id: 12,
    name: 'Aromatherapy Ultrasonic Diffuser & Humidifier',
    slug: 'aromatherapy-ultrasonic-diffuser',
    category: 'Home',
    price: 349000,
    originalPrice: 420000,
    rating: 4.8,
    reviewsCount: 145,
    stock: 28,
    isFeatured: false,
    badge: 'Best Seller',
    image:
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Diffuser aromaterapi ultrasonik berkapasitas 500ml dengan lampu LED 7 warna suasana. Mengubah minyak esensial menjadi uap halus yang menenangkan ruangan dan meningkatkan kualitas tidur.',
    features: [
      'Kapasitas tangki air 500ml hingga 12 jam pemakaian',
      'Lampu Mood LED 7 Warna dengan mode tidur senyap',
      'Teknologi getaran ultrasonik 2.4 MHz super halus',
      'Fitur Auto-Off mati otomatis ketika air habis',
      'Termasuk Remote Control pengatur timer 1H/3H/6H',
    ],
  },
  // ==========================================
  // Kategori: Electronics (+2 Produk Baru)
  // ==========================================
  {
    id: 13,
    name: 'Tablet Pro Max 11-inch 128GB Wi-Fi',
    slug: 'tablet-pro-max-11-inch-128gb-wifi',
    category: 'Electronics',
    price: 8499000,
    originalPrice: 9299000,
    rating: 4.9,
    reviewsCount: 112,
    stock: 16,
    isFeatured: true,
    badge: 'Best Tablet',
    image:
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Tablet multifungsi dengan layar Liquid Retina 11 inci 120Hz ProMotion yang memukau. Sangat bertenaga untuk ilustrasi digital, multitasking dokumen kantor, hingga editing video 4K dengan efisiensi daya luar biasa.',
    features: [
      'Layar 11 inci Liquid Retina 120Hz ProMotion Display',
      'Chipset Octa-Core kencang dengan grafis 10-core',
      'Mendukung Stylus Pen generasi ke-2 dan Magic Keyboard',
      'Kamera depan Ultra Wide 12MP dengan Center Stage',
      'Audio 4 Speaker stereo studio-quality',
    ],
  },
  {
    id: 14,
    name: 'Wireless Portable Bluetooth Speaker Waterproof 30W',
    slug: 'wireless-portable-bluetooth-speaker-waterproof',
    category: 'Electronics',
    price: 1199000,
    originalPrice: 1450000,
    rating: 4.8,
    reviewsCount: 185,
    stock: 25,
    isFeatured: false,
    badge: 'Bass Boost',
    image:
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Speaker Bluetooth portabel berdaya 30W RMS dengan dentuman bass mendalam dan sertifikasi tahan air IPX7. Desain kokoh tahan banting yang siap menemani petualangan outdoor maupun pesta musik di rumah.',
    features: [
      'Daya audio 30W RMS dengan dual passive radiator bass',
      'Sertifikasi IPX7 tahan air hingga kedalaman 1 meter',
      'Baterai 5.200 mAh memutar musik nonstop hingga 20 jam',
      'Koneksi Bluetooth 5.3 jangkauan hingga 20 meter',
      'Fitur PartyBoost untuk menghubungkan dua speaker bersamaan',
    ],
  },
  // ==========================================
  // Kategori: Fashion (+2 Produk Baru)
  // ==========================================
  {
    id: 15,
    name: 'Jaket Hoodie Fleece Oversized Japanese Streetwear',
    slug: 'jaket-hoodie-fleece-oversized-japanese-streetwear',
    category: 'Fashion',
    price: 359000,
    originalPrice: 459000,
    rating: 4.8,
    reviewsCount: 240,
    stock: 30,
    isFeatured: true,
    badge: 'Best Hoodie',
    image:
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Hoodie streetwear berbahan katun fleece 330 gsm tebal dan hangat namun tetap sejuk di kulit. Potongan santai oversized dengan tudung ganda dan saku kanguru yang luas untuk kenyamanan maksimal gaya kasual harian.',
    features: [
      'Material Katun Heavyweight Fleece 330 GSM super lembut',
      'Potongan Boxy Oversized khas Japanese Streetwear',
      'Tudung Double-layered dengan tali serut logam tahan karat',
      'Karet rib elastis padat pada pergelangan tangan dan pinggang',
      'Sablon plastisol premium tidak mudah retak atau luntur',
    ],
  },
  {
    id: 16,
    name: 'Sepatu Sneakers Classic Canvas Low White',
    slug: 'sepatu-sneakers-classic-canvas-low-white',
    category: 'Fashion',
    price: 429000,
    originalPrice: 520000,
    rating: 4.7,
    reviewsCount: 198,
    stock: 38,
    isFeatured: false,
    badge: 'Unisex',
    image:
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Sneakers kanvas klasik dengan sol vulkanisir karet alami yang fleksibel dan awet. Menggunakan insole empuk berbahan memory foam yang nyaman dipakai jalan santai, kuliah, hingga aktivitas nongkrong seharian.',
    features: [
      'Bahan 12oz Premium Cotton Canvas tahan gesek',
      'Insole bantalan Memory Foam anti-pegal empuk',
      'Outsole Rubber Vulcanized grip anti-slip di lantai licin',
      'Desain timeless netral cocok dipadukan pakaian apa pun',
      'Tersedia ukuran 38 hingga 44',
    ],
  },
  // ==========================================
  // Kategori: Accessories (+2 Produk Baru)
  // ==========================================
  {
    id: 17,
    name: 'Jam Tangan Pria Chronograph Leather Strap Luxury',
    slug: 'jam-tangan-chronograph-leather-strap-luxury',
    category: 'Accessories',
    price: 899000,
    originalPrice: 1199000,
    rating: 4.9,
    reviewsCount: 176,
    stock: 18,
    isFeatured: true,
    badge: 'Eksklusif',
    image:
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Jam tangan analog chronograph dengan dial safir anti-gores dan tali kulit sapi asli bertekstur elegan. Ditenagai movement kuarsa presisi tinggi dari Jepang dengan fungsi stopwatch aktif dan ketahanan air hingga 50 meter.',
    features: [
      'Kaca Sapphire Crystal Glass tahan goresan tajam',
      'Tali Kulit Sapi Asli Genuine Leather dengan gesper baja tahan karat',
      'Japanese Quartz Chronograph Movement dengan 3 sub-dial aktif',
      'Water Resistant 5 ATM (50 meter) aman untuk cuci tangan dan hujan',
      'Luminova hands jarum berpendar terang dalam kegelapan',
    ],
  },
  {
    id: 18,
    name: 'Kacamata Polarized UV400 Sunglasses Matte Black',
    slug: 'kacamata-polarized-uv400-sunglasses-matte-black',
    category: 'Accessories',
    price: 249000,
    originalPrice: 329000,
    rating: 4.8,
    reviewsCount: 225,
    stock: 45,
    isFeatured: false,
    badge: 'UV400 Protected',
    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Kacamata hitam berdesain modern dengan lensa polarized multi-layer yang mereduksi silau terik matahari secara maksimal. Memberikan perlindungan penuh UV400 dari sinar UVA/UVB untuk kegiatan berkendara, traveling, dan pantai.',
    features: [
      'Lensa TAC Polarized 9-Layer anti-glare dan pantulan air',
      'Perlindungan 100% UV400 memblokir sinar radiasi berbahaya',
      'Bingkai Polycarbonate ultralight hanya berbobot 22 gram',
      'Engsel baja fleksibel tahan patah dan nyaman di berbagai bentuk wajah',
      'Termasuk hardcase kulit, pouch microfiber, dan lap pembersih',
    ],
  },
  // ==========================================
  // Kategori: Home (+2 Produk Baru)
  // ==========================================
  {
    id: 19,
    name: 'Lampu Meja LED Smart Desk Lamp Wireless Charging',
    slug: 'lampu-meja-led-smart-desk-lamp-wireless-charging',
    category: 'Home',
    price: 399000,
    originalPrice: 499000,
    rating: 4.9,
    reviewsCount: 132,
    stock: 22,
    isFeatured: false,
    badge: 'Smart Lighting',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Lampu meja belajar minimalis dengan pengaturan temperatur warna (Warm, Natural, Cool) dan kecerahan stepless. Dilengkapi bantalan pengisian daya cepat nirkabel 10W (Qi Wireless Charger) pada alasnya untuk mengisi daya smartphone Anda.',
    features: [
      'Fast Wireless Charging Pad 10W terintegrasi di dasar lampu',
      '3 Mode Temperatur Warna (3000K, 4500K, 6000K) + Stepless Dimming',
      'Teknologi Eye-Care Anti Blue-Light & Flicker-Free tanpa radiasi mata',
      'Leher lampu fleksibel silikon dapat ditekuk bebas 360 derajat',
      'Fitur timer otomatis 45 menit untuk istirahat mata berkala',
    ],
  },
  {
    id: 20,
    name: 'Electric Kettle Gooseneck Smart Temperature Control 1L',
    slug: 'electric-kettle-gooseneck-smart-temperature-control',
    category: 'Home',
    price: 589000,
    originalPrice: 699000,
    rating: 4.8,
    reviewsCount: 94,
    stock: 15,
    isFeatured: false,
    badge: 'Barista Choice',
    image:
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Teko listrik leher angsa presisi berbahan stainless steel SUS304 food-grade. Dirancang khusus untuk pecinta kopi manual brew dan teh dengan layar LED digital pengatur suhu presisi per 1 derajat Celsius serta fitur penjaga suhu (Keep Warm).',
    features: [
      'Bahan Full Stainless Steel SUS304 Food-Grade bebas BPA',
      'Cerat Leher Angsa (Gooseneck Spout) 90 derajat untuk aliran air presisi',
      'Pengaturan Suhu Digital presisi 40°C hingga 100°C pada layar LED',
      'Fitur Keep Warm otomatis menjaga suhu panas hingga 120 menit',
      'Pemanasan cepat 1.000 Watt mendidihkan 1 liter air hanya dalam 4 menit',
    ],
  },
]

// Format Currency Helper
export function formatRupiah(amount) {
  if (typeof amount !== 'number') return 'Rp 0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount)
}

// Find product by ID (handles both string and number)
export function getProductById(id) {
  const numericId = Number(id)
  return products.find((p) => p.id === numericId)
}

// Get featured products
export function getFeaturedProducts() {
  return products.filter((p) => p.isFeatured)
}

// Get related products
export function getRelatedProducts(currentId, category, limit = 4) {
  const numericId = Number(currentId)
  return products.filter((p) => p.id !== numericId && p.category === category).slice(0, limit)
}
