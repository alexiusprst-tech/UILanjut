/**
 * Mock Data Pengguna & Riwayat Pesanan untuk SHOPNEST — Online Store
 */

export const userProfile = {
  id: 'usr-8821',
  name: 'Budi Pratama',
  email: 'budi.pratama@shopnest.id',
  phone: '+62 812-3456-7890',
  memberTier: 'Gold Member',
  points: 5420,
  couponsCount: 3,
  joinDate: '15 Januari 2024',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  address: {
    label: 'Alamat Utama (Rumah)',
    recipient: 'Budi Pratama (+62 812-3456-7890)',
    street: 'Jl. Jenderal Sudirman No. 45, RT 02 / RW 05, Kel. Karet Tengsin',
    district: 'Kecamatan Tanah Abang',
    city: 'Jakarta Pusat',
    province: 'DKI Jakarta',
    postalCode: '10220',
    notes: 'Pagar abu-abu sebelah minimarket, mohon titipkan satpam jika tidak di tempat.',
  },
  orderHistory: [
    {
      id: 'INV/20260918/SN/98214',
      date: '18 September 2026',
      status: 'Selesai',
      statusType: 'success',
      total: 1699000,
      itemCount: 1,
      items: [
        {
          name: 'Mechanical Keyboard Keychron K2 Pro',
          quantity: 1,
          price: 1699000,
          image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80',
        },
      ],
    },
    {
      id: 'INV/20260902/SN/76412',
      date: '02 September 2026',
      status: 'Selesai',
      statusType: 'success',
      total: 1939000,
      itemCount: 2,
      items: [
        {
          name: 'Wireless Mouse Logitech MX Master 3S',
          quantity: 1,
          price: 1450000,
          image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=400&q=80',
        },
        {
          name: 'Minimalist Urban Backpack 25L Waterproof',
          quantity: 1,
          price: 489000,
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80',
        },
      ],
    },
    {
      id: 'INV/20260814/SN/65109',
      date: '14 Agustus 2026',
      status: 'Selesai',
      statusType: 'success',
      total: 299000,
      itemCount: 1,
      items: [
        {
          name: 'Casual Oxford Cotton Slim Shirt',
          quantity: 1,
          price: 299000,
          image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80',
        },
      ],
    },
  ],
}
