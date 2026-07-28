import React, { useState } from 'react';
import { GalleryItem, GalleryCategory, UserAccount } from '../types';
import { Image as ImageIcon, Video, Play, Heart, Plus, Search, Filter, MapPin, Calendar, Sparkles, Edit3, Trash2, X, ExternalLink, Share2, Check } from 'lucide-react';
import { MediaUploaderModal } from './MediaUploaderModal';
import { ImageWithSkeleton, VideoWithSkeleton } from './MediaSkeleton';

interface GalleryViewProps {
  galleryItems: GalleryItem[];
  onAddItem: (item: Omit<GalleryItem, 'id' | 'dateAdded' | 'likes'>) => void;
  onEditItem: (item: GalleryItem) => void;
  onDeleteItem: (id: string) => void;
  onLikeItem: (id: string) => void;
  currentUser: UserAccount | null;
  onToggleFavorite: (id: string) => void;
  lang?: 'ID' | 'EN';
  isHomePage?: boolean;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  galleryItems,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onLikeItem,
  currentUser,
  onToggleFavorite,
  lang,
  isHomePage
}) => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<GalleryItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [globalHdMode, setGlobalHdMode] = useState(true);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    title: '',
    type: 'photo' as 'photo' | 'video',
    url: '',
    videoUrl: '',
    category: 'Pantai' as GalleryCategory,
    description: '',
    location: 'Pulau Batu Atas, Buton Selatan'
  });

  const categories: GalleryCategory[] = ['Semua', 'Foto', 'Video', 'Bawah Laut', 'Pantai', 'Budaya & Kuliner'];

  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory =
      activeCategory === 'Semua' ? true :
      activeCategory === 'Foto' ? item.type === 'photo' :
      activeCategory === 'Video' ? item.type === 'video' :
      item.category === activeCategory;

    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleOpenAddModal = () => {
    setFormData({
      title: '',
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      category: 'Pantai',
      description: 'Pemandangan alam eksotis Pulau Batu Atas dengan laut jernih memukau.',
      location: 'Spot Pesisir Batu Atas'
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (item: GalleryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditTarget(item);
    setFormData({
      title: item.title,
      type: item.type,
      url: item.url,
      videoUrl: item.videoUrl || '',
      category: item.category,
      description: item.description,
      location: item.location
    });
    setIsEditModalOpen(true);
  };

  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.url) return;
    onAddItem({
      title: formData.title,
      type: formData.type,
      url: formData.url,
      videoUrl: formData.type === 'video' ? formData.videoUrl : undefined,
      category: formData.category,
      description: formData.description,
      location: formData.location
    });
    setIsAddModalOpen(false);
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTarget) return;
    onEditItem({
      ...editTarget,
      title: formData.title,
      type: formData.type,
      url: formData.url,
      videoUrl: formData.type === 'video' ? formData.videoUrl : undefined,
      category: formData.category,
      description: formData.description,
      location: formData.location
    });
    setIsEditModalOpen(false);
  };

  const handleCopyShare = (item: GalleryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="py-12 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {isHomePage
                  ? (lang === 'EN' ? '✨ Front Website Showcase — Direct Save & Display' : '✨ Tersimpan di Depan Depan Website')
                  : (lang === 'EN' ? 'Dedicated Gallery Page (Photos & Videos)' : 'Halaman Galeri Khusus (Foto & Video)')}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {isHomePage ? (
                <>
                  {lang === 'EN' ? 'Front Showcase:' : 'Etalase Depan Website:'}{' '}
                  <span className="text-cyan-400">{lang === 'EN' ? 'All Uploaded Photos & Videos' : 'Semua Foto & Video'}</span>
                </>
              ) : (
                <>
                  {lang === 'EN' ? 'Tourism Gallery of' : 'Galeri Wisata'}{' '}
                  <span className="text-cyan-400">Pulau Batu Atas</span>
                </>
              )}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
              {isHomePage ? (
                lang === 'EN'
                  ? 'Every photo and video uploaded into the website is automatically stored and displayed right here at the very front of the website.'
                  : 'Setiap gambar/foto dan video yang dimasukkan ke dalam website otomatis disimpan dan dipajang langsung di posisi depan website ini.'
              ) : (
                lang === 'EN'
                  ? 'Visual collection of pristine coral reefs, nirvana beaches, maritime traditions, and aerial drone videos. Easy to add and edit in real-time.'
                  : 'Koleksi visual keindahan terumbu karang, pantai nirwana, tradisi nelayan, dan video udara. Mudah ditambahkan dan diedit secara real-time.'
              )}
            </p>
          </div>

          {/* Add Media Button */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleOpenAddModal}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-cyan-600/20 flex items-center gap-2 transition transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
              <span>{lang === 'EN' ? '+ Add Photo / Video to Front Website' : '+ Tambah Foto/Video ke Depan Website'}</span>
            </button>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/30'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat === 'Foto' && <ImageIcon className="w-3.5 h-3.5" />}
                  {cat === 'Video' && <Video className="w-3.5 h-3.5" />}
                  {cat === 'Semua' && <Filter className="w-3.5 h-3.5" />}
                  <span>{cat}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-black ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {cat === 'Semua' ? galleryItems.length :
                     cat === 'Foto' ? galleryItems.filter(i => i.type === 'photo').length :
                     cat === 'Video' ? galleryItems.filter(i => i.type === 'video').length :
                     galleryItems.filter(i => i.category === cat).length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari spot, pantai, atau video..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* AI HD Visual Enhancer Banner */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border border-emerald-500/40 flex items-center justify-between flex-wrap gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-emerald-300 flex items-center gap-1.5">
                AI Visual Enhancer: Mode HD, Kecerahan & Ketajaman Otomatis
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded border border-emerald-400/30 uppercase">4K HD Active</span>
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Setiap foto dan video otomatis ditingkatkan kecerahannya (+8%), ketajaman HD, dan saturasi warna laut agar tampil jernih & memukau.
              </p>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer bg-slate-950 px-3.5 py-2 rounded-xl border border-emerald-500/50 text-xs font-bold text-emerald-300 hover:bg-slate-900 transition shadow">
            <input
              type="checkbox"
              checked={globalHdMode}
              onChange={(e) => setGlobalHdMode(e.target.checked)}
              className="rounded border-slate-700 text-emerald-500 focus:ring-0 w-4 h-4 cursor-pointer"
            />
            <span>⚡ Mode HD & Ketajaman: {globalHdMode ? 'AKTIF' : 'NONAKTIF'}</span>
          </label>
        </div>

        {/* Media Grid */}
        {filteredItems.length === 0 ? (
          <div className="mt-12 text-center py-16 bg-slate-900/50 rounded-3xl border border-slate-800/80">
            <ImageIcon className="w-12 h-12 text-slate-600 mx-auto mb-3 animate-pulse" />
            <h3 className="text-base font-bold text-slate-300">Belum ada media yang cocok dengan filter</h3>
            <p className="text-xs text-slate-500 mt-1">Coba pilih kategori lain atau tekan tombol "+ Tambah Foto / Video" untuk mengupload item baru.</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const isFav = currentUser?.favorites?.includes(item.id);
              const isAdmin = currentUser?.role === 'admin';

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800/90 hover:border-cyan-500/60 shadow-lg transition duration-300 cursor-pointer flex flex-col"
                >
                  {/* Media Thumbnail */}
                  <div className="relative h-56 overflow-hidden bg-slate-950">
                    <ImageWithSkeleton
                      src={item.url}
                      alt={item.title}
                      isVideo={item.type === 'video'}
                      lang={lang}
                      className={`w-full h-full object-cover group-hover:scale-105 transition duration-500 ${(globalHdMode || item.enhancedHd) ? 'brightness-[1.08] contrast-[1.12] saturate-[1.18]' : ''}`}
                      loading="lazy"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 pointer-events-none"></div>

                    {/* Type & Category Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap z-20">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-950/80 backdrop-blur-md text-cyan-400 border border-slate-700 flex items-center gap-1">
                        {item.type === 'video' ? <Video className="w-3 h-3 text-red-400 animate-pulse" /> : <ImageIcon className="w-3 h-3 text-cyan-400" />}
                        <span>{item.type === 'video' ? 'VIDEO 4K' : 'FOTO HD'}</span>
                      </span>
                      
                      {item.imageIndex && (
                        <span className="px-2 py-1 rounded-lg text-[10px] font-black bg-amber-500 text-slate-950 shadow">
                          Foto #{item.imageIndex}
                        </span>
                      )}
                    </div>

                    {/* Action buttons: Share, Delete (Hapus) for all, Edit for admin */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
                      <button
                        onClick={(e) => handleCopyShare(item, e)}
                        title="Bagikan Tautan Media"
                        className="p-1.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-700/80 backdrop-blur-md transition"
                      >
                        {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Yakin ingin menghapus media "${item.title}" dari galeri website?`)) {
                            onDeleteItem(item.id);
                          }
                        }}
                        title="Hapus Foto/Video Ini Langsung"
                        className="p-1.5 rounded-xl bg-red-950/80 hover:bg-red-600 text-red-300 hover:text-white border border-red-700/60 backdrop-blur-md transition group/del"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {isAdmin && (
                        <button
                          onClick={(e) => handleOpenEditModal(item, e)}
                          title="Edit Item Galeri"
                          className="p-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/50 backdrop-blur-md transition"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Video Play Icon Indicator if Video */}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition duration-300 border-2 border-white/50 animate-pulse">
                          <Play className="w-6 h-6 fill-white ml-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Location Badge bottom left */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300">
                      <span className="flex items-center gap-1 text-slate-200 truncate font-medium">
                        <MapPin className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </span>
                    </div>

                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                        {item.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white mt-1 group-hover:text-cyan-300 transition line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Footer Actions: Likes & Favorite */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onLikeItem(item.id);
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition group/btn"
                      >
                        <Heart className="w-3.5 h-3.5 text-pink-500 group-hover/btn:fill-pink-500 transition" />
                        <span>{item.likes} Suka</span>
                      </button>

                      {currentUser && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(item.id);
                          }}
                          className={`p-1.5 rounded-lg text-xs font-semibold transition border ${
                            isFav
                              ? 'bg-pink-500/20 text-pink-400 border-pink-500/40'
                              : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
                          }`}
                          title={isFav ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-pink-400 text-pink-400' : ''}`} />
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* LIGHTBOX / VIDEO PLAYER MODAL */}
      {selectedItem && (
        <div 
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 uppercase">
                    {selectedItem.category} • {selectedItem.type === 'video' ? 'VIDEO PLAYER' : 'FOTO HD'}
                  </span>
                  {selectedItem.imageIndex && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500 text-slate-950">
                      Foto #{selectedItem.imageIndex}
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">{selectedItem.title}</h3>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Photo / Video Viewport */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center max-h-[500px] min-h-[280px]">
                {selectedItem.type === 'video' ? (
                  <VideoWithSkeleton
                    src={selectedItem.videoUrl || selectedItem.url}
                    controls
                    autoPlay
                    lang={lang}
                    className={`w-full max-h-[480px] object-contain bg-black transition duration-300 ${(globalHdMode || selectedItem.enhancedHd) ? 'brightness-[1.08] contrast-[1.12] saturate-[1.18] drop-shadow-[0_0_20px_rgba(16,185,129,0.35)]' : ''}`}
                    poster={selectedItem.url}
                  />
                ) : (
                  <ImageWithSkeleton
                    src={selectedItem.url}
                    alt={selectedItem.title}
                    lang={lang}
                    className={`max-w-full max-h-[480px] object-contain mx-auto transition duration-300 ${(globalHdMode || selectedItem.enhancedHd) ? 'brightness-[1.08] contrast-[1.12] saturate-[1.18] drop-shadow-[0_0_20px_rgba(16,185,129,0.35)]' : ''}`}
                  />
                )}
              </div>

              {/* Details & Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-3">
                  <h4 className="text-sm font-bold text-slate-200">Deskripsi Media</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedItem.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <MapPin className="w-4 h-4" />
                      {selectedItem.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      Ditambahkan: {selectedItem.dateAdded}
                    </span>
                  </div>
                </div>

                {/* Actions Box */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 block mb-1">Interaksi Pengunjung</span>
                    <button
                      onClick={() => onLikeItem(selectedItem.id)}
                      className="w-full py-2.5 rounded-xl bg-pink-950/50 hover:bg-pink-900/60 border border-pink-800/60 text-pink-300 font-bold text-xs flex items-center justify-center gap-2 transition"
                    >
                      <Heart className="w-4 h-4 fill-pink-500 text-pink-500 animate-bounce" />
                      <span>Beri Suka ({selectedItem.likes})</span>
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Yakin ingin menghapus media "${selectedItem.title}" dari galeri website?`)) {
                          onDeleteItem(selectedItem.id);
                          setSelectedItem(null);
                        }
                      }}
                      className="w-full py-2 rounded-xl bg-red-950/80 hover:bg-red-600 text-red-300 hover:text-white border border-red-800/60 font-bold text-xs flex items-center justify-center gap-2 transition shadow"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus Media Ini Sekarang</span>
                    </button>
                  </div>

                  <a
                    href={`https://wa.me/6282345214218?text=Halo%20Pak%20Ihwal%20Pangalila,%20saya%20tertarik%20mengunjungi%20spot%20"${encodeURIComponent(selectedItem.title)}"%20di%20Pulau%20Batu%20Atas.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition"
                  >
                    <span>Tanya Spot via WA</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW MEDIA MODAL (UPLOAD FILE, PRESET, OR URL) */}
      <MediaUploaderModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={onAddItem}
        mode="add"
      />

      {/* EDIT EXISTING MEDIA MODAL */}
      <MediaUploaderModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditTarget(null);
        }}
        onSave={(updatedData) => {
          if (editTarget) {
            onEditItem({ ...editTarget, ...updatedData });
          }
        }}
        initialData={editTarget}
        mode="edit"
      />

    </div>
  );
};
