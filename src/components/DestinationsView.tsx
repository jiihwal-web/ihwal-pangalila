import React, { useState } from 'react';
import { DestinationItem, UserAccount, ReviewItem } from '../types';
import { MapPin, Star, Clock, Plus, Edit3, Trash2, X, ExternalLink, Sparkles, Compass, MessageSquare, CheckCircle2, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { ImageWithSkeleton } from './MediaSkeleton';

interface DestinationsViewProps {
  destinations: DestinationItem[];
  onAddDestination: (dest: Omit<DestinationItem, 'id' | 'rating'>) => void;
  onEditDestination: (dest: DestinationItem) => void;
  onDeleteDestination: (id: string) => void;
  onAddReview?: (destId: string, review: Omit<ReviewItem, 'id' | 'date'>) => void;
  currentUser: UserAccount | null;
  lang?: 'ID' | 'EN';
}

export const DestinationsView: React.FC<DestinationsViewProps> = ({
  destinations,
  onAddDestination,
  onEditDestination,
  onDeleteDestination,
  onAddReview,
  currentUser,
  lang
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<DestinationItem | null>(null);

  // Visitor Reviews State
  const [expandedReviews, setExpandedReviews] = useState<{ [key: string]: boolean }>({});
  const [activeReviewDestId, setActiveReviewDestId] = useState<string | null>(null);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewOrigin, setReviewOrigin] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    category: 'Pantai & Santai',
    image: '',
    description: '',
    highlights: 'Pasir Putih, Air Jernih, Spot Foto',
    bestTime: '08:00 - 17:00 WITA'
  });

  const isAdmin = currentUser?.role === 'admin';

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      category: 'Pantai & Santai',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      description: 'Destinasi wisata bahari unggulan di pesisir Pulau Batu Atas dengan panorama alam luar biasa.',
      highlights: 'Air Bening, Terumbu Karang, Sunset',
      bestTime: 'Sepanjang Hari'
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (dest: DestinationItem) => {
    setEditTarget(dest);
    setFormData({
      name: dest.name,
      category: dest.category,
      image: dest.image,
      description: dest.description,
      highlights: dest.highlights.join(', '),
      bestTime: dest.bestTime
    });
    setIsEditModalOpen(true);
  };

  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.image) return;
    onAddDestination({
      name: formData.name,
      category: formData.category,
      image: formData.image,
      description: formData.description,
      highlights: formData.highlights.split(',').map(s => s.trim()).filter(Boolean),
      bestTime: formData.bestTime
    });
    setIsAddModalOpen(false);
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTarget) return;
    onEditDestination({
      ...editTarget,
      name: formData.name,
      category: formData.category,
      image: formData.image,
      description: formData.description,
      highlights: formData.highlights.split(',').map(s => s.trim()).filter(Boolean),
      bestTime: formData.bestTime
    });
    setIsEditModalOpen(false);
  };

  return (
    <div className="py-16 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Panduan Eksplorasi Wisata</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Destinasi Unggulan <span className="text-amber-400">Batu Atas</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
              Jelajahi keindahan laut tiga warna, wall reef diving kelas dunia, puncak tebing sunset, dan keramahtamahan desa bahari.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={handleOpenAdd}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg flex items-center gap-2 transition"
            >
              <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
              <span>+ Tambah Destinasi Baru</span>
            </button>
          )}
        </div>

        {/* Destination Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="group bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-amber-500/50 shadow-xl transition duration-300 flex flex-col lg:flex-row"
            >
              {/* Image Column */}
              <div className="relative lg:w-2/5 h-64 lg:h-auto overflow-hidden bg-slate-950">
                <ImageWithSkeleton
                  src={dest.image}
                  alt={dest.name}
                  isDestination={true}
                  lang={lang}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden pointer-events-none"></div>
                
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-500/40 text-[10px] font-bold z-20 shadow">
                  {dest.category}
                </span>

                {isAdmin && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-950/90 p-1 rounded-xl border border-slate-700 z-20">
                    <button
                      onClick={() => handleOpenEdit(dest)}
                      className="p-1.5 text-amber-400 hover:bg-amber-500 hover:text-slate-950 rounded-lg transition"
                      title="Edit Destinasi"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Hapus destinasi "${dest.name}"?`)) {
                          onDeleteDestination(dest.id);
                        }
                      }}
                      className="p-1.5 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition"
                      title="Hapus Destinasi"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Text & Info Column */}
              <div className="p-6 lg:w-3/5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>{dest.rating} / 5.0</span>
                    </div>
                    <span className="flex items-center gap-1 text-slate-400 text-xs">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{dest.bestTime}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mt-2 group-hover:text-amber-300 transition">
                    {dest.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    {dest.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                      Sorotan & Daya Tarik:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dest.highlights.map((h, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-950 text-cyan-300 text-xs font-semibold border border-slate-800">
                          ✓ {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* VISITOR REVIEW SYSTEM & AUTHENTIC TESTIMONIALS */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <button
                        onClick={() => setExpandedReviews(prev => ({ ...prev, [dest.id]: !prev[dest.id] }))}
                        className="flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 transition"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>
                          Testimoni Wisatawan ({dest.reviews?.length || 0})
                        </span>
                        {expandedReviews[dest.id] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => {
                          setActiveReviewDestId(dest.id);
                          setReviewAuthor(currentUser?.name || '');
                          setReviewOrigin('');
                          setReviewRating(5);
                          setReviewComment('');
                        }}
                        className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-500/30 hover:from-amber-500 hover:to-amber-400 text-amber-300 hover:text-slate-950 font-bold text-[11px] border border-amber-500/40 flex items-center gap-1 transition shadow cursor-pointer"
                      >
                        <Send className="w-3 h-3" />
                        <span>+ Tulis Ulasan Asli</span>
                      </button>
                    </div>

                    {/* Review List Preview */}
                    <div className="mt-2.5 space-y-2">
                      {(expandedReviews[dest.id] ? (dest.reviews || []) : (dest.reviews || []).slice(0, 1)).map((rev) => (
                        <div key={rev.id} className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800/80 text-left space-y-1.5 animate-in fade-in duration-200 shadow-inner">
                          <div className="flex items-center justify-between flex-wrap gap-1">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[11px] border border-amber-500/30 shrink-0">
                                {rev.author.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5 flex-wrap">
                                  <span>{rev.author}</span>
                                  {rev.verified && (
                                    <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30 font-semibold inline-flex items-center gap-0.5">
                                      <CheckCircle2 className="w-2.5 h-2.5" /> Terverifikasi
                                    </span>
                                  )}
                                </div>
                                {rev.origin && <p className="text-[10px] text-slate-400">📍 Asal: {rev.origin}</p>}
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <div className="flex text-amber-400">
                                {[...Array(rev.rating)].map((_, idx) => (
                                  <Star key={idx} className="w-3 h-3 fill-amber-400" />
                                ))}
                              </div>
                              <span className="text-[10px] text-slate-400 font-medium">{rev.date}</span>
                            </div>
                          </div>
                          <p className="text-xs text-slate-300 italic leading-relaxed pl-8">
                            "{rev.comment}"
                          </p>
                        </div>
                      ))}

                      {!expandedReviews[dest.id] && (dest.reviews?.length || 0) > 1 && (
                        <button
                          onClick={() => setExpandedReviews(prev => ({ ...prev, [dest.id]: true }))}
                          className="w-full py-1.5 text-center text-[11px] font-semibold text-slate-400 hover:text-amber-300 transition block bg-slate-950/40 rounded-xl border border-slate-800/50 cursor-pointer hover:border-amber-500/30"
                        >
                          💬 Lihat {(dest.reviews?.length || 0) - 1} testimoni wisatawan lainnya...
                        </button>
                      )}

                      {(dest.reviews?.length || 0) === 0 && (
                        <div className="p-3 text-center bg-slate-950/50 rounded-xl border border-slate-800/50 text-xs text-slate-400">
                          Belum ada testimoni. Jadilah wisatawan pertama yang membagikan ulasan asli setelah berkunjung ke sini!
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={`https://wa.me/6282345214218?text=Halo%20Pak%20Ihwal%20Pangalila,%20saya%20berminat%20mengunjungi%20spot%20"${encodeURIComponent(dest.name)}"%20di%20Pulau%20Batu%20Atas.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/50 text-xs font-bold flex items-center justify-center gap-2 transition shadow"
                  >
                    <span>Tanya Jadwal & Kapal via WA</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* ADD / EDIT MODAL */}
      {(isAddModalOpen || (isEditModalOpen && editTarget)) && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {isAddModalOpen ? 'Tambah Destinasi Baru' : `Edit Destinasi: ${editTarget?.name}`}
              </h3>
              <button onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={isAddModalOpen ? handleSubmitAdd : handleSubmitEdit} className="mt-4 space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Destinasi *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Kategori</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Waktu Terbaik</label>
                  <input
                    type="text"
                    value={formData.bestTime}
                    onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">URL Foto HD *</label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Sorotan (Pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Deskripsi Lengkap</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow"
                >
                  Simpan Destinasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WRITE VISITOR REVIEW MODAL */}
      {activeReviewDestId && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-md w-full p-6 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Tulis Testimoni Pengunjung
                  </h3>
                  <p className="text-[11px] text-amber-400 font-medium">
                    {destinations.find(d => d.id === activeReviewDestId)?.name}
                  </p>
                </div>
              </div>
              <button onClick={() => setActiveReviewDestId(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!reviewAuthor || !reviewComment) return;
                if (onAddReview) {
                  onAddReview(activeReviewDestId, {
                    author: reviewAuthor,
                    origin: reviewOrigin || 'Wisatawan Nusantara',
                    rating: reviewRating,
                    comment: reviewComment
                  });
                  setExpandedReviews(prev => ({ ...prev, [activeReviewDestId]: true }));
                }
                setActiveReviewDestId(null);
              }}
              className="mt-4 space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Wisatawan / Inisial *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso atau Famili dari Jakarta"
                  value={reviewAuthor}
                  onChange={(e) => setReviewAuthor(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Asal Kota / Negara Wisatawan *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Surabaya, Makassar, Kendari, atau Spanyol"
                  value={reviewOrigin}
                  onChange={(e) => setReviewOrigin(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Rating Kepuasan Kunjungan</label>
                <div className="flex items-center gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setReviewRating(starVal)}
                      className="p-1 focus:outline-none transition transform hover:scale-110 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          starVal <= reviewRating ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]' : 'text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-bold text-amber-400">
                    {reviewRating === 5 ? '5/5 - Sangat Puas!' : `${reviewRating}/5 Bintang`}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Ulasan & Testimoni Asli Setelah Berkunjung *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Ceritakan keindahan panorama laut, kejernihan air, pengalaman homestay bersama warga, atau sensasi berkunjung ke spot ini..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 leading-relaxed transition"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Testimoni yang Anda kirimkan akan ditandai dengan lencana <strong>✓ Kunjungan Terverifikasi</strong> dan langsung dapat dibaca oleh calon wisatawan lainnya!</span>
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveReviewDestId(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-xs font-bold shadow-lg flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Kirim Testimoni Sekarang</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
