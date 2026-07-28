import React, { useState } from 'react';
import { GalleryItem, DestinationItem, ContactMessage, UserAccount, GalleryCategory } from '../types';
import { LayoutDashboard, Image as ImageIcon, MapPin, MessageSquare, BookOpen, Plus, Edit3, Trash2, CheckCircle2, ExternalLink, Phone, Mail, Sparkles, Heart, Eye, ArrowLeft, ShieldCheck, AlertCircle, Video, Star, Settings, Users, TrendingUp } from 'lucide-react';
import { MediaUploaderModal } from './MediaUploaderModal';
import { VisitorStatsChart } from './VisitorStatsChart';

interface AdminDashboardProps {
  galleryItems: GalleryItem[];
  destinations: DestinationItem[];
  messages: ContactMessage[];
  onAddItem: (item: Omit<GalleryItem, 'id' | 'dateAdded' | 'likes'>) => void;
  onEditItem: (item: GalleryItem) => void;
  onDeleteItem: (id: string) => void;
  onAddDestination: (dest: Omit<DestinationItem, 'id' | 'rating'>) => void;
  onEditDestination: (dest: DestinationItem) => void;
  onDeleteDestination: (id: string) => void;
  onDeleteMessage: (id: string) => void;
  onToggleReadMessage: (id: string) => void;
  onExitDashboard: () => void;
  currentUser: UserAccount;
  logoUrl: string;
  profileUrl: string;
  onUpdateLogo: (url: string) => void;
  onUpdateProfile: (url: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  galleryItems,
  destinations,
  messages,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onAddDestination,
  onEditDestination,
  onDeleteDestination,
  onDeleteMessage,
  onToggleReadMessage,
  onExitDashboard,
  currentUser,
  logoUrl,
  profileUrl,
  onUpdateLogo,
  onUpdateProfile
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'gallery' | 'destinations' | 'messages' | 'guide' | 'settings'>('overview');
  
  const [tempLogoUrl, setTempLogoUrl] = useState(logoUrl);
  const [tempProfileUrl, setTempProfileUrl] = useState(profileUrl);

  
  // Modal states for quick addition inside dashboard
  const [isAddGalOpen, setIsAddGalOpen] = useState(false);
  const [isEditGalOpen, setIsEditGalOpen] = useState(false);
  const [editGalTarget, setEditGalTarget] = useState<GalleryItem | null>(null);

  // Form state for gallery
  const [galForm, setGalForm] = useState({
    title: '',
    type: 'photo' as 'photo' | 'video',
    url: '',
    videoUrl: '',
    category: 'Pantai' as GalleryCategory,
    description: '',
    location: 'Batu Atas, Buton Selatan'
  });

  // Calculate statistics
  const totalPhotos = galleryItems.filter(i => i.type === 'photo').length;
  const totalVideos = galleryItems.filter(i => i.type === 'video').length;
  const totalLikes = galleryItems.reduce((acc, curr) => acc + curr.likes, 0);
  const unreadMessages = messages.filter(m => !m.read).length;

  const totalVisits = (() => {
    try {
      const saved = localStorage.getItem('pba_total_visits');
      return saved ? parseInt(saved, 10) : 14853;
    } catch (e) {
      return 14853;
    }
  })();

  const topDestination = destinations.length > 0 ? [...destinations].sort((a, b) => b.rating - a.rating)[0] : null;

  const handleOpenAddGal = () => {
    setGalForm({
      title: '',
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      category: 'Pantai',
      description: 'Eksplorasi spot pesisir dan terumbu karang Batu Atas.',
      location: 'Pulau Batu Atas'
    });
    setIsAddGalOpen(true);
  };

  const handleOpenEditGal = (item: GalleryItem) => {
    setEditGalTarget(item);
    setGalForm({
      title: item.title,
      type: item.type,
      url: item.url,
      videoUrl: item.videoUrl || '',
      category: item.category,
      description: item.description,
      location: item.location
    });
    setIsEditGalOpen(true);
  };

  const handleSubmitGalAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galForm.title || !galForm.url) return;
    onAddItem({
      title: galForm.title,
      type: galForm.type,
      url: galForm.url,
      videoUrl: galForm.type === 'video' ? galForm.videoUrl : undefined,
      category: galForm.category,
      description: galForm.description,
      location: galForm.location
    });
    setIsAddGalOpen(false);
  };

  const handleSubmitGalEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editGalTarget) return;
    onEditItem({
      ...editGalTarget,
      title: galForm.title,
      type: galForm.type,
      url: galForm.url,
      videoUrl: galForm.type === 'video' ? galForm.videoUrl : undefined,
      category: galForm.category,
      description: galForm.description,
      location: galForm.location
    });
    setIsEditGalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 border-b border-amber-500/50 p-6 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-xl bg-slate-900 flex-shrink-0">
              <img src={profileUrl} alt="Ihwal Pangalila" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-slate-950 text-amber-300 rounded-full text-[10px] font-black uppercase tracking-wider">
                  Admin Resmi • Sandi: 090806
                </span>
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Dashboard CMS Imajinasif
              </h1>
              <p className="text-xs text-amber-100 font-semibold">
                Selamat datang, <span className="underline decoration-white">Ihwal Pangalila</span> (Koordinator Wisata Pulau Batu Atas)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExitDashboard}
              className="px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>Kembali ke Halaman Publik</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Navigation Tabs */}
      <div className="border-b border-slate-800 bg-slate-900/80 sticky top-20 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Ringkasan Imajinasif</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'gallery'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Kelola Galeri Khusus ({galleryItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('destinations')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'destinations'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Kelola Destinasi ({destinations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap relative ${
              activeTab === 'messages'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Pesan Masuk (Inbox)</span>
            {unreadMessages > 0 && (
              <span className="px-1.5 py-0.2 bg-red-500 text-white rounded-full text-[10px] font-black animate-bounce">
                {unreadMessages}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Pengaturan Tema & Profil</span>
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'guide'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Tutorial & Aturan Web</span>
          </button>

        </div>
      </div>

      {/* Dashboard Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Quick Stat Counter Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Media Galeri</span>
                  <h3 className="text-3xl font-black text-white mt-1">{galleryItems.length}</h3>
                  <span className="text-xs text-cyan-400 font-semibold mt-1 block">{totalPhotos} Foto • {totalVideos} Video</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <ImageIcon className="w-7 h-7" />
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Suka / Apresiasi</span>
                  <h3 className="text-3xl font-black text-pink-400 mt-1">{totalLikes}</h3>
                  <span className="text-xs text-slate-400 font-semibold mt-1 block">Interaksi Pengunjung</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                  <Heart className="w-7 h-7 fill-pink-500/30" />
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Destinasi & Spot</span>
                  <h3 className="text-3xl font-black text-amber-400 mt-1">{destinations.length}</h3>
                  <span className="text-xs text-amber-300 font-semibold mt-1 block">Pantai & Wall Reef</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <MapPin className="w-7 h-7" />
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('messages')}
                className="bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/60 shadow-xl flex items-center justify-between cursor-pointer group transition"
              >
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Inkuiri Pesan Masuk</span>
                  <h3 className="text-3xl font-black text-emerald-400 mt-1">{messages.length}</h3>
                  <span className="text-xs text-red-400 font-bold mt-1 block group-hover:underline">
                    {unreadMessages} Pesan Baru Belum Dibaca →
                  </span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition">
                  <MessageSquare className="w-7 h-7" />
                </div>
              </div>

            </div>

            {/* Additional Analytics Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Simple Visit Counter */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Kunjungan Publik</span>
                  <h3 className="text-3xl font-black text-blue-400 mt-1">{totalVisits.toLocaleString('id-ID')}</h3>
                  <span className="text-xs text-blue-300 font-semibold mt-1 block flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Berdasarkan analitik lokal
                  </span>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                  <Users className="w-8 h-8" />
                </div>
              </div>

              {/* Most Popular Destination */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Destinasi Terpopuler</span>
                  <h3 className="text-xl sm:text-2xl font-black text-yellow-400 mt-1 truncate max-w-[200px] sm:max-w-[250px]">
                    {topDestination ? topDestination.name : 'Belum Ada'}
                  </h3>
                  <span className="text-xs text-yellow-300 font-semibold mt-1 block flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400" />
                    Rating {topDestination ? topDestination.rating.toFixed(1) : '0.0'} dari ulasan wisatawan
                  </span>
                </div>
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-yellow-500/30 shadow-lg bg-slate-800 flex-shrink-0">
                  {topDestination ? (
                    <img src={topDestination.image} alt={topDestination.name} className="w-full h-full object-cover" />
                  ) : (
                    <MapPin className="w-8 h-8 m-auto mt-4 text-slate-500" />
                  )}
                </div>
              </div>
            </div>

            {/* Live Visitor Analytics & Popularity Chart */}
            <VisitorStatsChart />

            {/* Quick Action Box & Logo Notice */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              <div className="lg:col-span-7 bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>Kemudahan Pembaruan Data Real-Time</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Kelola Konten dengan Imajinasi Tanpa Batas
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Semua perubahan yang Anda lakukan di dashboard ini (menambah foto baru, menambahkan video drone, atau membalas pesan travel) akan langsung diwujudkan pada halaman utama publik secara real-time.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('gallery')}
                    className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Kelola Galeri & Tambah Media</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('messages')}
                    className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Cek Inbox Pesan Masuk</span>
                  </button>
                </div>
              </div>

              {/* Logo & Profile verification showcase */}
              <div className="lg:col-span-5 bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-400 flex-shrink-0 bg-slate-950">
                  <img src={logoUrl} alt="Logo Foto 7" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500 text-slate-950 uppercase">
                    Foto Ke-7 Jadi Logo
                  </span>
                  <h4 className="text-base font-black text-white mt-1">Logo Resmi Aktif</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Foto ke-7 telah diintegrasikan sebagai identitas utama website dan favicon.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: GALLERY MANAGER */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-white">Kelola Galeri Foto & Video</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Setiap gambar/foto dan video yang dimasukkan di sini <strong className="text-cyan-400">otomatis disimpan dan dipajang langsung di posisi paling depan website (Beranda Utama)</strong>.
                </p>
              </div>

              <button
                onClick={handleOpenAddGal}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-lg flex items-center gap-2 w-fit transition"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>+ Tambah Media Baru (Foto / Video)</span>
              </button>
            </div>

            {/* Gallery Table/Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item) => (
                <div key={item.id} className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between shadow-lg">
                  <div>
                    <div className="relative h-44 bg-slate-950 overflow-hidden">
                      <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 flex gap-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 text-amber-400 border border-slate-700">
                          {item.category}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-black bg-cyan-500 text-slate-950">
                          {item.type.toUpperCase()}
                        </span>
                      </div>
                      {item.imageIndex && (
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-black bg-amber-500 text-slate-950">
                          Foto #{item.imageIndex}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-bold text-white truncate">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                      <p className="text-[11px] text-cyan-400 mt-2 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {item.location}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-2">
                    <span className="text-xs text-pink-400 font-bold flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 fill-pink-500" /> {item.likes} Suka
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditGal(item)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 text-xs font-bold transition flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Hapus item galeri "${item.title}"?`)) {
                            onDeleteItem(item.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-600 text-red-400 hover:text-white transition"
                        title="Hapus Media"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DESTINATIONS MANAGER */}
        {activeTab === 'destinations' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-white">Kelola Destinasi Wisata</h3>
                <p className="text-xs text-slate-400 mt-0.5">Daftar spot wisata unggulan yang ditampilkan pada halaman Destinasi.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {destinations.map((dest) => (
                <div key={dest.id} className="bg-slate-900 rounded-2xl border border-slate-800 p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={dest.image} alt={dest.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-amber-400 font-bold uppercase">{dest.category}</span>
                      <h4 className="text-base font-bold text-white">{dest.name}</h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">{dest.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => {
                        if (window.confirm(`Hapus destinasi "${dest.name}"?`)) {
                          onDeleteDestination(dest.id);
                        }
                      }}
                      className="p-2 rounded-xl bg-red-950/60 text-red-400 hover:bg-red-500 hover:text-white transition"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MESSAGES INBOX */}
        {activeTab === 'messages' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-white">Pusat Pesan Masuk (Inbox Pengelola)</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Semua pesan dari wisatawan yang masuk melalui Formulir Kontak atau fitur inkuiri.
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-bold rounded-full">
                {messages.length} Total Pesan
              </span>
            </div>

            {messages.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-slate-800">
                <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-400">Belum ada pesan masuk</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => {
                  const isNew = !msg.read;
                  const waNumber = msg.senderPhone ? msg.senderPhone.replace(/^0/, '62').replace(/\D/g, '') : null;

                  return (
                    <div
                      key={msg.id}
                      className={`p-6 rounded-3xl border transition flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                        isNew
                          ? 'bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/30 border-emerald-500/80 shadow-xl'
                          : 'bg-slate-900 border-slate-800'
                      }`}
                    >
                      <div className="space-y-2 max-w-3xl">
                        <div className="flex items-center gap-2 flex-wrap">
                          {isNew && (
                            <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-emerald-500 text-slate-950 uppercase animate-pulse">
                              Pesan Baru
                            </span>
                          )}
                          <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                            Topik: {msg.subject}
                          </span>
                          <span className="text-xs text-slate-500">• {msg.date}</span>
                        </div>

                        <h4 className="text-base sm:text-lg font-bold text-white">
                          Dari: <span className="text-cyan-300">{msg.senderName}</span>
                          <span className="text-xs font-normal text-slate-400 ml-2">({msg.senderEmail})</span>
                          {msg.senderPhone && <span className="text-xs font-bold text-emerald-400 ml-2">• WA: {msg.senderPhone}</span>}
                        </h4>

                        <p className="text-xs sm:text-sm text-slate-300 bg-slate-950 p-4 rounded-2xl border border-slate-800 leading-relaxed font-normal">
                          "{msg.message}"
                        </p>
                      </div>

                      {/* Action Buttons: Reply via WhatsApp / Email */}
                      <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 flex-shrink-0">
                        {waNumber ? (
                          <a
                            href={`https://wa.me/${waNumber}?text=Halo%20${encodeURIComponent(msg.senderName)},%20saya%20Ihwal%20Pangalila%20dari%20Pengelola%20Wisata%20Pulau%20Batu%20Atas.%20Menanggapi%20pesan%20Anda:%20"${encodeURIComponent(msg.subject)}"...`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => onToggleReadMessage(msg.id)}
                            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition"
                          >
                            <Phone className="w-3.5 h-3.5 fill-white" />
                            <span>Balas via WhatsApp</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <a
                            href={`mailto:${msg.senderEmail}?subject=Balasan:%20${encodeURIComponent(msg.subject)}&body=Halo%20${encodeURIComponent(msg.senderName)},%0D%0A%0D%0ASaya%20Ihwal%20Pangalila%20dari%20Pulau%20Batu%20Atas...`}
                            onClick={() => onToggleReadMessage(msg.id)}
                            className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Balas via Email</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onToggleReadMessage(msg.id)}
                            className="flex-1 py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition text-center"
                          >
                            {msg.read ? 'Tandai Belum Dibaca' : 'Tandai Sudah Dibaca'}
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm(`Hapus pesan dari "${msg.senderName}"?`)) {
                                onDeleteMessage(msg.id);
                              }
                            }}
                            className="p-2 rounded-xl bg-red-950/60 hover:bg-red-600 text-red-400 hover:text-white transition"
                            title="Hapus Pesan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: GUIDE & RULES */}
        {activeTab === 'guide' && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-10 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800 text-amber-400">
              <Sparkles className="w-6 h-6" />
              <h3 className="text-2xl font-black text-white">Panduan Pengelolaan Website (Untuk Pak Ihwal Pangalila)</h3>
            </div>

            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <p>
                Website ini telah didesain dengan struktur yang modular dan mudah dikelola. Berikut adalah 4 rahasia cepat menggunakan dashboard ini:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <h4 className="font-bold text-amber-300 text-base">1. Menambah Galeri Foto & Video</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Buka tab <strong>Kelola Galeri</strong> → Klik tombol <strong>+ Tambah Media Baru</strong> → Masukkan tautan foto atau video Anda. Langsung tayang tanpa perlu reload server.
                  </p>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <h4 className="font-bold text-emerald-400 text-base">2. Membalas Pesan Pengunjung</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Setiap kali ada pengunjung yang mengisi formulir kontak di website, pesannya akan muncul di tab <strong>Pesan Masuk (Inbox)</strong>. Klik tombol <strong>Balas via WhatsApp</strong> untuk langsung membuka obrolan WA dengan nomor pengirim!
                  </p>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <h4 className="font-bold text-cyan-400 text-base">3. Foto ke-7 & Foto ke-8</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Sesuai instruksi Anda, <strong>Foto ke-7</strong> telah ditetapkan sebagai Logo resmi di Navbar dan Footer, sedangkan <strong>Foto ke-8</strong> ditetapkan sebagai foto Profil resmi Ihwal Pangalila.
                  </p>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <h4 className="font-bold text-pink-400 text-base">4. Sandi Keamanan Admin</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Sandi admin ditetapkan secara eksklusif yaitu: <code className="bg-slate-900 text-amber-300 font-mono px-1.5 py-0.5 rounded">090806</code>. Simpan sandi ini dengan aman.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-white">Pengaturan Logo & Profil</h3>
                <p className="text-xs text-slate-400 mt-0.5">Ubah tautan (URL) gambar untuk mengganti Logo Resmi dan Foto Profil Pengelola.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Logo Settings */}
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
                <h4 className="text-sm font-bold text-amber-400">Pengaturan Logo Website</h4>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-400 bg-slate-950 flex-shrink-0">
                    <img src={logoUrl} alt="Logo Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-xs text-slate-400 font-bold block">Tautan Gambar Logo (URL)</label>
                    <input
                      type="url"
                      value={tempLogoUrl}
                      onChange={(e) => setTempLogoUrl(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      placeholder="https://..."
                    />
                    <button
                      onClick={() => onUpdateLogo(tempLogoUrl)}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition shadow"
                    >
                      Simpan Logo
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Settings */}
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
                <h4 className="text-sm font-bold text-cyan-400">Pengaturan Foto Profil Pengelola</h4>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white bg-slate-950 flex-shrink-0">
                    <img src={profileUrl} alt="Profile Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-xs text-slate-400 font-bold block">Tautan Foto Profil (URL)</label>
                    <input
                      type="url"
                      value={tempProfileUrl}
                      onChange={(e) => setTempProfileUrl(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      placeholder="https://..."
                    />
                    <button
                      onClick={() => onUpdateProfile(tempProfileUrl)}
                      className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-lg transition shadow"
                    >
                      Simpan Foto Profil
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ADD GALLERY MODAL IN DASHBOARD USING MEDIAUPLOADERMODAL */}
      <MediaUploaderModal
        isOpen={isAddGalOpen}
        onClose={() => setIsAddGalOpen(false)}
        onSave={(data) => {
          onAddItem(data);
          // Modal will not close immediately in 'add' mode, it will reset itself for next media
        }}
        mode="add"
      />

      {/* EDIT GALLERY MODAL IN DASHBOARD USING MEDIAUPLOADERMODAL */}
      <MediaUploaderModal
        isOpen={isEditGalOpen}
        onClose={() => {
          setIsEditGalOpen(false);
          setEditGalTarget(null);
        }}
        onSave={(updatedData) => {
          if (editGalTarget) {
            onEditItem({ ...editGalTarget, ...updatedData });
            setIsEditGalOpen(false);
            setEditGalTarget(null);
          }
        }}
        initialData={editGalTarget}
        mode="edit"
      />

    </div>
  );
};
