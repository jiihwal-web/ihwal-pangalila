import React, { useState, useEffect, useRef } from 'react';
import { GalleryItem, GalleryCategory, UserAccount, THEMATIC_CATEGORIES } from '../types';
import { Play, Video, Film, Sparkles, Plus, Heart, Share2, Eye, MessageSquare, MapPin, Calendar, CheckCircle2, Search, Filter, Maximize2, Minimize2, Radio, Send, ArrowRight, ShieldCheck, Download } from 'lucide-react';

interface VideoCenterViewProps {
  galleryItems: GalleryItem[];
  onAddVideo: (item: GalleryItem) => void;
  onLikeItem: (id: string) => void;
  lang?: 'ID' | 'EN';
  currentUser?: UserAccount | null;
}

interface VideoComment {
  id: string;
  author: string;
  text: string;
  time: string;
}

export const VideoCenterView: React.FC<VideoCenterViewProps> = ({
  galleryItems,
  onAddVideo,
  onLikeItem,
  lang,
  currentUser
}) => {
  const isEn = lang === 'EN';
  
  // Filter only video items
  const videoItems = galleryItems.filter(item => item.type === 'video');
  
  // Currently playing video in the cinema player
  const [activeVideo, setActiveVideo] = useState<GalleryItem | null>(() => {
    return videoItems[0] || null;
  });

  // Theater mode (full width cinema)
  const [theaterMode, setTheaterMode] = useState(false);
  
  // Filter & Search state
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Add new video modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<GalleryCategory>('Drone & Udara');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newThumbnailUrl, setNewThumbnailUrl] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newLocation, setNewLocation] = useState('');
  
  // Comments state for the active video
  const [comments, setComments] = useState<Record<string, VideoComment[]>>(() => {
    const saved = localStorage.getItem('pba_video_comments');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      'gal-vid-1': [
        { id: 'c1', author: 'Dr. Hendra (Kelautan)', text: 'Kejernihan air dari atas drone benar-benar spektakuler. Potensi wisata bahari nomor satu di Sultra!', time: '2 jam yang lalu' },
        { id: 'c2', author: 'Sarah Jenkins', text: 'Stunning 4K drone footage! We are definitely visiting Batu Atas next summer.', time: '5 jam yang lalu' }
      ],
      'gal-vid-2': [
        { id: 'c3', author: 'Ahmad Diver', text: 'Terumbu karangnya masih sangat sehat, tidak ada coral bleaching. Pertahankan keasriannya!', time: 'Kemarin' }
      ]
    };
  });
  const [newCommentText, setNewCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState(currentUser?.name || 'Wisatawan / Tamu');

  const playerRef = useRef<HTMLDivElement>(null);

  // Update active video when videoItems change if none selected
  useEffect(() => {
    if (!activeVideo && videoItems.length > 0) {
      setActiveVideo(videoItems[0]);
    }
  }, [videoItems, activeVideo]);

  // Save comments to localStorage
  useEffect(() => {
    localStorage.setItem('pba_video_comments', JSON.stringify(comments));
  }, [comments]);

  // Handle playing a video when clicked
  const handleSelectVideo = (video: GalleryItem) => {
    setActiveVideo(video);
    if (playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle submitting new video
  const handleSubmitVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newVideoUrl.trim()) return;

    const defaultThumbnail = newThumbnailUrl.trim() || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80';

    const newItem: GalleryItem = {
      id: `gal-vid-${Date.now()}`,
      title: newTitle.trim(),
      type: 'video',
      url: defaultThumbnail,
      videoUrl: newVideoUrl.trim(),
      category: newCategory,
      description: newDescription.trim() || (isEn ? 'High quality video exploration of Batu Atas Island.' : 'Eksplorasi video kualitas tinggi keindahan Pulau Batu Atas.'),
      location: newLocation.trim() || 'Pulau Batu Atas, Buton Selatan',
      dateAdded: new Date().toISOString().split('T')[0],
      likes: 1,
      featured: true
    };

    onAddVideo(newItem);
    setActiveVideo(newItem);
    setIsAddModalOpen(false);

    // Reset form
    setNewTitle('');
    setNewVideoUrl('');
    setNewThumbnailUrl('');
    setNewDescription('');
    setNewLocation('');
  };

  // Handle adding comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeVideo || !newCommentText.trim()) return;

    const currentList = comments[activeVideo.id] || [];
    const updatedList = [
      {
        id: `com-${Date.now()}`,
        author: commentAuthor.trim() || 'Wisatawan',
        text: newCommentText.trim(),
        time: isEn ? 'Just now' : 'Baru saja'
      },
      ...currentList
    ];

    setComments(prev => ({
      ...prev,
      [activeVideo.id]: updatedList
    }));
    setNewCommentText('');
  };

  // Filtered catalog
  const filteredVideos = videoItems.filter(v => {
    let matchesCat = false;
    
    // Map English translated categories back to underlying Indonesian types for matching
    let checkCategory = selectedCategory;
    if (selectedCategory === 'Aerial & Drone') checkCategory = 'Drone & Udara';
    if (selectedCategory === 'Underwater') checkCategory = 'Bawah Laut';
    if (selectedCategory === 'Conservation') checkCategory = 'Konservasi';

    if (checkCategory === 'Semua' || checkCategory === 'All') {
      matchesCat = true;
    } else if (checkCategory === 'Nature') {
      matchesCat = ['Nature', 'Bawah Laut', 'Sunset', 'Sunrise', 'Konservasi', 'Drone & Udara', 'Pantai'].includes(v.category);
    } else if (checkCategory === 'Culture') {
      matchesCat = ['Culture', 'Budaya & Kuliner', 'Perahu & Nelayan'].includes(v.category);
    } else if (checkCategory === 'Activities') {
      matchesCat = ['Activities', 'Snorkeling'].includes(v.category);
    } else {
      matchesCat = v.category === checkCategory;
    }
    
    const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const categories = isEn 
    ? ['All', 'Nature', 'Culture', 'Activities', 'Aerial & Drone', 'Underwater', 'Conservation', 'Sunset']
    : ['Semua', 'Nature', 'Culture', 'Activities', 'Drone & Udara', 'Bawah Laut', 'Snorkeling', 'Perahu & Nelayan', 'Sunset', 'Konservasi', 'Budaya & Kuliner'];

  // Sample video presets for fast testing
  const videoPresets = [
    { label: 'Drone Udara 4K Pantai Pasir Putih', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', thumb: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
    { label: 'Snorkeling Bersama Ikan & Terumbu Karang', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', thumb: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80' },
    { label: 'Sunset Keemasan Di Atas Laut Flores', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', thumb: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80' },
    { label: 'Pelayaran Perahu Nelayan Phinisi', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', thumb: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20 pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800 mb-8" ref={playerRef}>
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-500/50 text-cyan-300 text-xs font-black tracking-wide uppercase mb-3 shadow-lg shadow-cyan-950/50">
              <Film className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>{isEn ? '✨ Batu Atas Cinema & Video Library Hub' : '✨ Pusat Sinema & Aplikasi Video Bahari'}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {isEn ? 'Video Center &' : 'Aplikasi Video &'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">{isEn ? 'Marine Cinema' : 'Sinema Bahari'}</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
              {isEn
                ? 'Dedicated video application designed to accommodate, organize, and showcase all documentary, aerial drone, and underwater videos of Batu Atas Island. Watch in Cinema Mode or upload new videos directly into the website.'
                : 'Aplikasi khusus yang menampung dan menampilkan seluruh koleksi video wisata, dokumenter bawah laut, dan rekaman drone udara Pulau Batu Atas. Setiap video yang dibuka akan diputar langsung di layar sinema interaktif.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-center">
              <span className="block text-xs text-slate-400 font-medium">{isEn ? 'Total Videos' : 'Koleksi Video'}</span>
              <span className="text-xl font-black text-cyan-400">{videoItems.length} <span className="text-xs font-bold text-slate-400">HD / 4K</span></span>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-cyan-500/20 flex items-center gap-2.5 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Plus className="w-5 h-5 text-slate-950 stroke-[3]" />
              <span>{isEn ? '+ Upload Video to App' : '+ Tambah & Simpan Video'}</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            CINEMA THEATER PLAYER SECTION ("ketika video dibuka")
           ======================================================== */}
        {activeVideo ? (
          <div className={`mb-12 transition-all duration-500 ${theaterMode ? 'w-full' : 'max-w-6xl mx-auto'}`}>
            <div className="bg-slate-900/90 rounded-3xl border-2 border-cyan-500/40 shadow-2xl shadow-cyan-950/80 overflow-hidden">
              
              {/* Top Theater Bar */}
              <div className="px-5 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
                  <span className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Radio className="w-4 h-4 text-emerald-400" />
                    {isEn ? 'LIVE CINEMA SCREEN — NOW PLAYING' : 'LAYAR SINEMA UTAMA — SEDANG DIPUTAR'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    {activeVideo.category}
                  </span>
                  <button
                    onClick={() => setTheaterMode(!theaterMode)}
                    className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition"
                    title={isEn ? 'Toggle Theater Mode' : 'Ganti Mode Bioskop'}
                  >
                    {theaterMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                    <span>{theaterMode ? (isEn ? 'Standard View' : 'Layar Normal') : (isEn ? 'Cinema Mode' : 'Mode Bioskop')}</span>
                  </button>
                </div>
              </div>

              {/* Video Player Box */}
              <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
                <video
                  key={activeVideo.id}
                  src={activeVideo.videoUrl || activeVideo.url}
                  poster={activeVideo.url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain bg-black"
                />
                
                {/* Overlay watermarks */}
                <div className="absolute top-4 right-4 pointer-events-none bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700/50 text-[10px] font-bold text-slate-300 tracking-wider">
                  BATU ATAS CINEMA HD
                </div>
              </div>

              {/* Video Details & Interaction Panel */}
              <div className="p-6 sm:p-8 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-800">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-2">
                      <span className="flex items-center gap-1 text-cyan-400 font-semibold">
                        <MapPin className="w-3.5 h-3.5" />
                        {activeVideo.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {activeVideo.dateAdded}
                      </span>
                      <span>•</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 text-[10px]">
                        {isEn ? 'Verified HD Video' : 'Video Resmi Tersimpan'}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {activeVideo.title}
                    </h2>
                    <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
                      {activeVideo.description}
                    </p>
                  </div>

                  {/* Actions (Like, Share, Download status) */}
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => onLikeItem(activeVideo.id)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 border border-slate-700 hover:border-rose-500/50 text-slate-200 hover:text-rose-400 font-bold text-xs flex items-center gap-2 transition"
                    >
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                      <span>{activeVideo.likes} {isEn ? 'Likes' : 'Suka'}</span>
                    </button>

                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({ title: activeVideo.title, url: window.location.href });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          alert(isEn ? 'Video link copied!' : 'Tautan video berhasil disalin!');
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/50 text-slate-200 hover:text-cyan-400 font-bold text-xs flex items-center gap-2 transition"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{isEn ? 'Share' : 'Bagikan'}</span>
                    </button>
                  </div>
                </div>

                {/* ========================================================
                    VIEWER DISCUSSION & COMMENTS BOX ("Kolom Komentar Video")
                   ======================================================== */}
                <div className="mt-8 pt-6 border-t border-slate-800/80">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-cyan-400" />
                      <span>{isEn ? 'Viewer Responses & Discussion' : 'Respon & Komentar Penonton'} ({comments[activeVideo.id]?.length || 0})</span>
                    </h3>
                    <span className="text-xs text-slate-400">{isEn ? 'Open public discussion' : 'Diskusi terbuka penonton'}</span>
                  </div>

                  {/* Comment input form */}
                  <form onSubmit={handleAddComment} className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                      <input
                        type="text"
                        placeholder={isEn ? "Your Name (e.g. Budi Diver)" : "Nama Anda (cth: Budi Wisatawan)"}
                        value={commentAuthor}
                        onChange={(e) => setCommentAuthor(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                        required
                      />
                      <div className="sm:col-span-2 flex items-center gap-2">
                        <input
                          type="text"
                          placeholder={isEn ? "Write a comment or impression about this video..." : "Tulis kesan atau komentar tentang video ini..."}
                          value={newCommentText}
                          onChange={(e) => setNewCommentText(e.target.value)}
                          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                          required
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition shrink-0"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{isEn ? 'Post' : 'Kirim'}</span>
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* Comment list */}
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {(comments[activeVideo.id] || []).length === 0 ? (
                      <div className="text-center py-6 bg-slate-950/40 rounded-xl border border-slate-800/60 text-slate-500 text-xs">
                        {isEn ? 'No comments yet on this video. Be the first to leave a response!' : 'Belum ada komentar pada video ini. Jadilah yang pertama memberikan respon!'}
                      </div>
                    ) : (
                      (comments[activeVideo.id] || []).map((com) => (
                        <div key={com.id} className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center text-slate-950 font-black text-xs shrink-0 shadow">
                            {com.author.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-bold text-white">{com.author}</h4>
                              <span className="text-[10px] text-slate-500">{com.time}</span>
                            </div>
                            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{com.text}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/60 rounded-3xl border border-slate-800 mb-12">
            <Video className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm font-semibold">{isEn ? 'No video selected. Choose a video below to start playing.' : 'Belum ada video terpilih. Klik salah satu video di bawah untuk memutar.'}</p>
          </div>
        )}

        {/* ========================================================
            PLAYLIST & VIDEO CATALOG SECTION ("Menampung banyak video")
           ======================================================== */}
        <div className="mt-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                <Video className="w-7 h-7 text-cyan-400" />
                <span>{isEn ? 'Video Library & Playlists' : 'Daftar Putar & Koleksi Video'}</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">{filteredVideos.length} Video</span>
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                {isEn
                  ? 'Click any video card below to open and play it immediately in the top Cinema Screen.'
                  : 'Klik video mana pun di bawah ini untuk langsung memutarnya di Layar Sinema Utama di atas.'}
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder={isEn ? "Search videos by title or location..." : "Cari video judul atau lokasi..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-md shadow-cyan-500/20 scale-105'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Video Grid Cards */}
          {filteredVideos.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800/80">
              <Film className="w-16 h-16 text-slate-600 mx-auto mb-4 animate-bounce" />
              <h3 className="text-lg font-bold text-white mb-2">{isEn ? 'No Videos Found' : 'Tidak Ada Video Ditemukan'}</h3>
              <p className="text-slate-400 text-xs max-w-md mx-auto mb-6">
                {isEn ? 'Try changing your search query or category filter.' : 'Coba ubah kata kunci pencarian atau kategori filter Anda.'}
              </p>
              <button
                onClick={() => { setSelectedCategory(isEn ? 'All' : 'Semua'); setSearchQuery(''); }}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition"
              >
                {isEn ? 'Reset Filter' : 'Tampilkan Semua Video'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredVideos.map((item) => {
                const isCurrent = activeVideo?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectVideo(item)}
                    className={`group relative rounded-2xl overflow-hidden bg-slate-900 border transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                      isCurrent
                        ? 'border-cyan-400 shadow-xl shadow-cyan-500/20 ring-2 ring-cyan-500/50 scale-[1.02]'
                        : 'border-slate-800/80 hover:border-slate-700 hover:shadow-lg hover:-translate-y-1.5'
                    }`}
                  >
                    {/* Thumbnail box */}
                    <div className="relative aspect-video overflow-hidden bg-slate-950">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 brightness-90 group-hover:brightness-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                      
                      {/* Playing Indicator / Play overlay button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {isCurrent ? (
                          <div className="w-12 h-12 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/50 animate-pulse">
                            <Radio className="w-6 h-6" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-slate-900/80 text-white border border-white/30 flex items-center justify-center transform scale-90 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:border-transparent transition shadow-lg">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>
                        )}
                      </div>

                      {/* Top badges */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 text-cyan-300 border border-cyan-500/40 backdrop-blur-md">
                          {item.category}
                        </span>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-red-600 text-white animate-pulse">
                            {isEn ? 'PLAYING' : 'DIPUTAR'}
                          </span>
                        )}
                      </div>

                      {/* Duration / HD badge */}
                      <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-black/80 text-slate-200 border border-slate-700 backdrop-blur-md">
                        HD 4K
                      </div>
                    </div>

                    {/* Card content */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-1">
                          <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </div>
                        <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition line-clamp-2 leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                          <span className="font-semibold text-slate-300">{item.likes}</span>
                        </span>
                        <span className="text-[11px] text-cyan-400 font-bold group-hover:underline flex items-center gap-1">
                          <span>{isEn ? 'Watch Now' : 'Putar Sekarang'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ========================================================
            ADD VIDEO MODAL ("Khusus untuk menyimpan video kedalam website")
           ======================================================== */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-slate-900 border-2 border-cyan-500/40 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Plus className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      {isEn ? 'Upload New Video to Website' : 'Tambah & Simpan Video Baru ke Website'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {isEn ? 'Video will be saved here in Video Hub & displayed on Front Website.' : 'Video akan disimpan di Pusat Sinema ini & langsung tampil di Depan Website.'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmitVideo} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    {isEn ? '1. Video Title / Name *' : '1. Judul Video Wisata *'}
                  </label>
                  <input
                    type="text"
                    placeholder={isEn ? "e.g. 4K Aerial Drone of Batu Atas Coral Reefs..." : "cth: Video Drone 4K Terumbu Karang & Pantai Pasir Putih..."}
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      {isEn ? '2. Category *' : '2. Kategori Video *'}
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as GalleryCategory)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500 transition"
                    >
                      {THEMATIC_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      {isEn ? '3. Location / Spot *' : '3. Lokasi / Spot di Pulau *'}
                    </label>
                    <input
                      type="text"
                      placeholder={isEn ? "e.g. West Beach, Batu Atas" : "cth: Pantai Barat, Batu Atas"}
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    {isEn ? '4. Video URL / Embed Link (MP4 or YouTube/Vimeo) *' : '4. Link URL Video / MP4 (Atau Pilih Preset di Bawah) *'}
                  </label>
                  <input
                    type="text"
                    placeholder="https://.../video.mp4 atau link video Anda..."
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition font-mono text-[11px]"
                    required
                  />
                  
                  {/* Quick video presets */}
                  <div className="mt-2 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                    <span className="block text-[11px] font-bold text-cyan-400 mb-1.5 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      {isEn ? 'Or pick a sample HD video preset for testing:' : 'Atau pilih preset video HD contoh untuk tes instan:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {videoPresets.map((pre, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setNewVideoUrl(pre.url);
                            if (!newThumbnailUrl) setNewThumbnailUrl(pre.thumb);
                          }}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 text-[10px] font-bold border border-slate-700 transition"
                        >
                          + {pre.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    {isEn ? '5. Thumbnail Image URL (Optional)' : '5. Link URL Foto Thumbnail / Cover (Opsional)'}
                  </label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={newThumbnailUrl}
                    onChange={(e) => setNewThumbnailUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    {isEn ? '6. Description & Story' : '6. Keterangan & Cerita Video'}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={isEn ? "Describe what viewers will see in this video..." : "Jelaskan keindahan atau pesan apa yang ditampilkan dalam video ini..."}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>

                <div className="p-3.5 bg-cyan-950/40 rounded-xl border border-cyan-800/60 flex items-start gap-2.5 text-xs text-cyan-300">
                  <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">{isEn ? 'Automatic Front Website & Video Hub Storage' : 'Otomatis Tersimpan di 2 Tempat sekaligus:'}</span>
                    <span className="text-slate-300 text-[11px]">
                      {isEn
                        ? 'Once uploaded, this video will be stored inside this Video Hub AND prominently displayed at the very front of the website.'
                        : 'Saat Anda klik simpan, video ini langsung ditampung di Aplikasi Sinema Video ini DAN otomatis dipajang di posisi depan website (Beranda Utama).'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
                  >
                    {isEn ? 'Cancel' : 'Batal'}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/30 flex items-center gap-2 transition"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>{isEn ? 'Save Video to Website' : 'Simpan & Tayangkan Video'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
