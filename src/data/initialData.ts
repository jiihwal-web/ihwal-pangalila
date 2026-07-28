import { GalleryItem, DestinationItem, FeatureItem, ContactMessage, GuideStep } from '../types';

// Foto ke-7: Dijadikan LOGO WEBSITE Resmi Pulau Batu Atas
export const WEBSITE_LOGO_IMAGE = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80';

// Foto ke-8: Dijadikan foto PROFIL PENGELOLA (Ihwal Pangalila)
export const PROFILE_IHWAL_IMAGE = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80';

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Pantai Pasir Putih Surga Tersembunyi',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    category: 'Pantai',
    description: 'Hamparan pasir putih bersih dengan air laut gradasi turkuis bening di pesisir barat Pulau Batu Atas.',
    location: 'Pantai Barat, Batu Atas',
    dateAdded: '2026-07-20',
    likes: 342,
    featured: true,
    imageIndex: 1
  },
  {
    id: 'gal-2',
    title: 'Taman Terumbu Karang & Penyu Bawah Laut',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    category: 'Snorkeling',
    description: 'Kekayaan biodiversitas laut Batu Atas dengan terumbu karang alami yang masih sangat terjaga dan koloni penyu hijau.',
    location: 'Spot Diving Selatan',
    dateAdded: '2026-07-21',
    likes: 489,
    featured: true,
    imageIndex: 2
  },
  {
    id: 'gal-3',
    title: 'Senja Emas di Tebing Panorama Batu Atas',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=80',
    category: 'Sunset',
    description: 'Pemandangan sunset keemasan dari puncak tebing batu karang yang berhadapan langsung dengan Laut Flores.',
    location: 'Tebing Sunset Timur',
    dateAdded: '2026-07-22',
    likes: 512,
    featured: true,
    imageIndex: 3
  },
  {
    id: 'gal-4',
    title: 'Tradisi Bahari & Perahu Nelayan Phinisi',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
    category: 'Perahu & Nelayan',
    description: 'Kehidupan masyarakat maritim Batu Atas yang ramah dengan kapal-kapal kayu tradisional pembelah ombak nusantara.',
    location: 'Pelabuhan Rakyat Batu Atas',
    dateAdded: '2026-07-23',
    likes: 278,
    featured: false,
    imageIndex: 4
  },
  {
    id: 'gal-5',
    title: 'Sajian Kuliner Seafood Bakar & Kelapa Segar',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?auto=format&fit=crop&w=1000&q=80',
    category: 'Budaya & Kuliner',
    description: 'Ikan kerapu segar tangkapan nelayan lokal dinikmati bersama kelapa muda di tepi pantai bersaus rempah khas Buton.',
    location: 'Pusat Kuliner Pantai',
    dateAdded: '2026-07-24',
    likes: 395,
    featured: false,
    imageIndex: 5
  },
  {
    id: 'gal-6',
    title: 'Suasana Resor Eksotis & Homestay Warga',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
    category: 'Pantai',
    description: 'Penginapan berkonsep ramah lingkungan yang menyatu dengan keasrian kebun kelapa dan desiran ombak santai.',
    location: 'Desa Wisata Batu Atas Barat',
    dateAdded: '2026-07-25',
    likes: 310,
    featured: false,
    imageIndex: 6
  },
  {
    id: 'gal-7',
    title: 'Emblem Identitas Pulau Batu Atas (Foto 7 - Logo)',
    type: 'photo',
    url: WEBSITE_LOGO_IMAGE,
    category: 'Budaya & Kuliner',
    description: 'Foto ke-7 yang dijadikan sebagai Logo Resmi dan ikon identitas eksotisme Pulau Batu Atas di Buton Selatan.',
    location: 'Pusat Informasi Batu Atas',
    dateAdded: '2026-07-26',
    likes: 620,
    featured: true,
    imageIndex: 7
  },
  {
    id: 'gal-8',
    title: 'Koordinator Wisata: Ihwal Pangalila (Foto 8 - Profil)',
    type: 'photo',
    url: PROFILE_IHWAL_IMAGE,
    category: 'Konservasi',
    description: 'Sosok Ihwal Pangalila sebagai pengelola dan penggerak ekowisata berkelanjutan di Pulau Batu Atas.',
    location: 'Kantor Pengelola Wisata',
    dateAdded: '2026-07-27',
    likes: 780,
    featured: true,
    imageIndex: 8
  },
  {
    id: 'gal-vid-1',
    title: 'Video Cinematic: Eksplorasi Drone Udara Batu Atas',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    category: 'Drone & Udara',
    description: 'Rekaman udara 4K memperlihatkan keseluruhan gugusan Pulau Batu Atas dari ketinggian dengan air laut super jernih.',
    location: 'Udara Pulau Batu Atas',
    dateAdded: '2026-07-28',
    likes: 450,
    featured: true
  },
  {
    id: 'gal-vid-2',
    title: 'Video Bawah Laut: Menyelam Bersama Gerombolan Ikan',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    category: 'Bawah Laut',
    description: 'Petualangan menyelam di kedalaman 15 meter menyaksikan terumbu karang warna-warni dan ikan hias tropis.',
    location: 'South Reef Wall',
    dateAdded: '2026-07-28',
    likes: 589,
    featured: true
  },
  {
    id: 'gal-sunrise-1',
    title: 'Sunrise Keemasan di Tanjung Timur Batu Atas',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
    category: 'Sunrise',
    description: 'Semburat warna jingga dan keemasan menyambut pagi hari di ujung timur Pulau Batu Atas dengan udara laut yang segar.',
    location: 'Tanjung Timur, Batu Atas',
    dateAdded: '2026-07-28',
    likes: 412,
    featured: true
  },
  {
    id: 'gal-snorkeling-1',
    title: 'Snorkeling di Coral Garden Air Super Jernih',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    category: 'Snorkeling',
    description: 'Menikmati keindahan terumbu karang dangkal (coral garden) dengan kejernihan air laut hingga jarak pandang 25 meter.',
    location: 'Pantai Barat Batu Atas',
    dateAdded: '2026-07-28',
    likes: 530,
    featured: true
  },
  {
    id: 'gal-vid-3',
    title: 'Video Dokumenter: Jejak Nelayan Tradisional Phinisi Batu Atas',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    category: 'Perahu & Nelayan',
    description: 'Dokumenter singkat mengenai ketangguhan pelaut dan nelayan tradisional Pulau Batu Atas dengan perahu kayu layar penjelajah samudra.',
    location: 'Pelabuhan Rakyat Batu Atas',
    dateAdded: '2026-07-28',
    likes: 380,
    featured: true
  },
  {
    id: 'gal-vid-4',
    title: 'Video Timelapse: Detik-detik Sunset Emas di Laut Flores',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    category: 'Sunset',
    description: 'Rekaman timelapse memukau matahari terbenam dengan perubahan warna langit dari jingga muda, keemasan, hingga ungu magis.',
    location: 'Tebing Barat Batu Atas',
    dateAdded: '2026-07-28',
    likes: 512,
    featured: true
  },
  {
    id: 'gal-vid-5',
    title: 'Video Snorkeling: Berenang Bersama Penyu Hijau & Ikan Badut',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoy.mp4',
    category: 'Snorkeling',
    description: 'Pengalaman bawah air menyapa penyu hijau dan koloni ikan badut (clownfish) di tengah anemon laut yang sehat.',
    location: 'Spot Snorkeling Utara',
    dateAdded: '2026-07-28',
    likes: 640,
    featured: true
  },
  {
    id: 'gal-vid-6',
    title: 'Video Wisata: Menyusuri Desa Nelayan & Kuliner Seafood Bakar',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    category: 'Budaya & Kuliner',
    description: 'Vlog perjalanan kuliner menikmati ikan kerapu bakar segar langsung di tepi pantai bersama ramahnya warga lokal.',
    location: 'Desa Wisata Pantai Barat',
    dateAdded: '2026-07-28',
    likes: 425,
    featured: false
  },
  {
    id: 'gal-vid-7',
    title: 'Video Konservasi: Pelepasan Tukik Penyu ke Samudra Hindia',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    category: 'Konservasi',
    description: 'Kegiatan pelestarian alam oleh pengelola wisata Batu Atas dalam menjaga kelestarian penyu endemik perairan Buton Selatan.',
    location: 'Pusat Konservasi Penyu',
    dateAdded: '2026-07-28',
    likes: 710,
    featured: true
  },
  {
    id: 'gal-vid-8',
    title: 'Video Drone Udara: Panorama 360 Derajat Tebing Batu Atas',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
    category: 'Drone & Udara',
    description: 'Menyorot benteng tebing karang alami yang mengelilingi pulau dengan ombak samudera yang berdebur indah di kejauhan.',
    location: 'Tebing Selatan Batu Atas',
    dateAdded: '2026-07-28',
    likes: 590,
    featured: false
  }
];

export const INITIAL_DESTINATIONS: DestinationItem[] = [
  {
    id: 'dest-1',
    name: 'Pantai Nirwana Batu Atas',
    category: 'Pantai & Santai',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description: 'Pantai dengan pasir selembut tepung dan air laut jernih tiga warna. Cocok untuk berjemur, berenang bersama keluarga, dan fotografi.',
    highlights: ['Pasir Putih Alami', 'Ombak Tenang', 'Spot Sunset Paling Favorit'],
    bestTime: '07:00 - 18:00 WITA',
    rating: 4.9,
    reviews: [
      {
        id: 'rev-n1',
        author: 'Nadia Pratama',
        origin: 'Jakarta',
        rating: 5,
        date: '20 Juli 2026',
        comment: 'Pasir putihnya benar-benar halus dan bersih! Kami sekeluarga sangat menikmati waktu bersantai di sini. Air lautnya jernih banget sampai ikan kecil kelihatan jelas di pinggir pantai.',
        verified: true
      },
      {
        id: 'rev-n2',
        author: 'Budi Santoso',
        origin: 'Surabaya',
        rating: 5,
        date: '15 Juli 2026',
        comment: 'Sunset di Pantai Nirwana Batu Atas juara! Suasananya tenang, cocok banget untuk healing dari kebisingan kota besar.',
        verified: true
      }
    ]
  },
  {
    id: 'dest-2',
    name: 'Taman Laut Karang Batu Atas',
    category: 'Diving & Snorkeling',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    description: 'Salah satu surga bawah laut terbaik di timur Indonesia. Jarak pandang air mencapai 25 meter dengan biota laut yang sangat beragam.',
    highlights: ['Wall Diving', 'Penyu & Pari Manta', 'Coral Garden Warna-Warni'],
    bestTime: '08:00 - 15:00 WITA',
    rating: 5.0,
    reviews: [
      {
        id: 'rev-d1',
        author: 'Michael Rodriguez',
        origin: 'Wisatawan Asing (Spanyol)',
        rating: 5,
        date: '22 Juli 2026',
        comment: 'One of the best diving spots I have ever visited in Eastern Indonesia! The coral reef is completely pristine and we encountered three sea turtles during our morning dive.',
        verified: true
      },
      {
        id: 'rev-d2',
        author: 'dr. Andi Hidayat',
        origin: 'Kendari',
        rating: 5,
        date: '18 Juli 2026',
        comment: 'Snorkeling di coral garden sini luar biasa. Karangnya masih sangat sehat, warna-warni, dan arus juga ramah untuk pemula dengan pemandu lokal.',
        verified: true
      }
    ]
  },
  {
    id: 'dest-3',
    name: 'Tebing Karang Puncak Senja',
    category: 'Trekking & Panorama',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
    description: 'Menawarkan pemandangan spektakuler samudera lepas dari ketinggian bukit karang. Tempat terbaik melihat matahari terbenam tanpa halangan.',
    highlights: ['Panorama 360 Derajat', 'Spot Foto Instagramable', 'Udara Segar Laut'],
    bestTime: '16:30 - 18:30 WITA',
    rating: 4.8,
    reviews: [
      {
        id: 'rev-t1',
        author: 'Siti Rahmawati',
        origin: 'Makassar',
        rating: 5,
        date: '25 Juli 2026',
        comment: 'Perjuangan trekking ringan ke puncak langsung terbayar lunas pas lihat pemandangan laut Flores dari atas tebing. Foto-foto di sini auto keren!',
        verified: true
      },
      {
        id: 'rev-t2',
        author: 'Rian Kurniawan',
        origin: 'Baubau',
        rating: 4,
        date: '10 Juli 2026',
        comment: 'Tempatnya keren abis untuk nikmati angin sore. Jangan lupa bawa air minum dan pakai sepatu yang nyaman pas naik ke tebing.',
        verified: true
      }
    ]
  },
  {
    id: 'dest-4',
    name: 'Desa Tradisional Bahari & Kuliner',
    category: 'Budaya & Edukasi',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    description: 'Berinteraksi langsung dengan keramahan warga lokal, melihat proses pembuatan perahu tradisional, serta menikmati hidangan khas laut.',
    highlights: ['Kerajinan Tangan Warga', 'Kuliner Seafood Bakar', 'Homestay Ramah'],
    bestTime: 'Sepanjang Hari',
    rating: 4.9,
    reviews: [
      {
        id: 'rev-b1',
        author: 'Lina & Hendra',
        origin: 'Bandung',
        rating: 5,
        date: '24 Juli 2026',
        comment: 'Warga Pulau Batu Atas sangat ramah dan bersahabat! Kami diajak mencicipi ikan bakar khas parende yang bumbunya meresap sempurna. Pengalaman homestay yang tak terlupakan.',
        verified: true
      },
      {
        id: 'rev-b2',
        author: 'Arif Fathur',
        origin: 'Jakarta',
        rating: 5,
        date: '12 Juli 2026',
        comment: 'Melihat langsung proses pembuatan perahu nelayan tradisional oleh para tetua desa memberi pelajaran kebudayaan bahari yang sangat berharga.',
        verified: true
      }
    ]
  }
];

export const ISLAND_FEATURES: FeatureItem[] = [
  {
    id: 'feat-1',
    iconName: 'Camera',
    title: 'Galeri Media Khusus & Mudah Ditambah',
    description: 'Sistem galeri interaktif untuk foto & video resolusi tinggi yang dapat ditambahkan dan diedit secara real-time oleh admin.'
  },
  {
    id: 'feat-2',
    iconName: 'Compass',
    title: 'Eksplorasi Spot Wisata Terbaik',
    description: 'Panduan lengkap destinasi bahari, terumbu karang, dan desa wisata di Pulau Batu Atas, Buton Selatan.'
  },
  {
    id: 'feat-3',
    iconName: 'UserCheck',
    title: 'Pengelolaan Konten Imajinasif',
    description: 'Dashboard admin dengan kemudahan memperbarui data, merespons pesan masuk, dan mengatur tampilan dalam 1 klik.'
  },
  {
    id: 'feat-4',
    iconName: 'MessageSquare',
    title: 'Integrasi WhatsApp & Email Langsung',
    description: 'Hubungi pengelola Ihwal Pangalila (082345214218) untuk booking kapal, homestay, atau paket tur privat.'
  }
];

export const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    senderName: 'Dr. Hendra Kusuma',
    senderEmail: 'hendratory@gmail.com',
    senderPhone: '081234567890',
    subject: 'Inkuiri Paket Trip Diving 3 Hari 2 Malam',
    message: 'Halo Pak Ihwal Pangalila, saya dan tim dari komunitas selam Jakarta berencana berkunjung ke Pulau Batu Atas bulan depan. Mohon informasi paket homestay dan sewa kapal perahu pesiar setempat.',
    date: '2026-07-28 09:15',
    read: false
  },
  {
    id: 'msg-2',
    senderName: 'Siti Nurhaliza (Traveler Nusantara)',
    senderEmail: 'sitinur.travels@yahoo.com',
    senderPhone: '085799887766',
    subject: 'Apresiasi Website & Saran Foto Sunset',
    message: 'Selamat siang! Website Pesona Pulau Batu Atas ini sangat keren dan modern! Fotonya sangat jernih. Saya sudah submit 1 foto rekomendasi saat sunset di Puncak Senja kemarin. Sukses selalu untuk Pak Ihwal!',
    date: '2026-07-27 14:40',
    read: true,
    replied: true
  }
];

export const GUIDE_STEPS: GuideStep[] = [
  {
    stepNumber: 1,
    title: 'Perencanaan Desain & Identitas Modern',
    subtitle: 'Logo dari Foto Ke-7 & Palet Warna Pesisir Tropis',
    description: 'Website dibangun dengan pendekatan desain pesisir modern (Cyan Laut, Emas Pasir, Putih Bersih). Foto ke-7 secara otomatis ditetapkan sebagai Logo Resmi website agar khas dan autentik.',
    actionTip: 'Anda dapat mengganti foto logo sewaktu-waktu melalui menu Pengaturan di Dashboard Admin.',
    icon: 'Palette'
  },
  {
    stepNumber: 2,
    title: 'Halaman Galeri Khusus (Foto & Video)',
    subtitle: 'Mudah Ditambah, Diedit, dan Difilter',
    description: 'Galeri dikelompokkan dalam tab interaktif: Semua, Foto, Video, Bawah Laut, dan Budaya. Dilengkapi Lightbox modal untuk perbesaran foto dan pemutar video terintegrasi.',
    actionTip: 'Untuk menambah foto atau video baru: Masuk sebagai Admin -> Klik tombol "+ Tambah Galeri" -> Masukkan URL foto/video -> Simpan! Langsung tayang di publik.',
    icon: 'Image'
  },
  {
    stepNumber: 3,
    title: 'Sistem Login Keamanan Ganda',
    subtitle: 'Password Admin (090806) & Login Publik Email',
    description: 'Terdapat 2 jenis akses: Akses Publik (pengunjung bisa login menggunakan akun email untuk menyimpan spot favorit) dan Akses Admin Khusus dengan password rahasia 090806.',
    actionTip: 'Klik tombol "Login" di pojok kanan atas, pilih tab "Admin Khusus", lalu masukkan sandi 090806 untuk mengaktifkan mode kendali.',
    icon: 'Lock'
  },
  {
    stepNumber: 4,
    title: 'Dashboard Pengelolaan Konten yang Imajinasif',
    subtitle: 'Kendali Penuh Tanpa Coding',
    description: 'Setelah admin login, Dashboard Imajinasif terbuka. Di sini Anda bisa melihat statistik pengunjung, membaca pesan masuk dari formulir kontak, dan membalas langsung via WhatsApp atau Email.',
    actionTip: 'Di tab "Galeri Editor", Anda juga bisa menekan tombol "Edit" atau "Hapus" pada item yang ingin diperbarui.',
    icon: 'LayoutDashboard'
  },
  {
    stepNumber: 5,
    title: 'Integrasi Kontak & Google Maps',
    subtitle: 'Terhubung Langsung dengan Pak Ihwal Pangalila',
    description: 'Setiap tombol kontak dihubungkan langsung ke nomor WhatsApp Ihwal Pangalila (082345214218) dan Email ihwalpangalila@gmail.com, serta dilampirkan peta interaktif letak Pulau Batu Atas.',
    actionTip: 'Uji coba klik tombol WhatsApp di bagian profil atau kontak untuk memulai obrolan instan dengan pengelola.',
    icon: 'MapPin'
  }
];
