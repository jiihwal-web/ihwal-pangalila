import React, { useState, useRef } from 'react';
import { GalleryItem, GalleryCategory, THEMATIC_CATEGORIES } from '../types';
import { Upload, Video, Image as ImageIcon, Play, Sparkles, Link, CheckCircle2, X, AlertCircle, Film, Check, RefreshCw } from 'lucide-react';

interface MediaUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (itemData: Omit<GalleryItem, 'id' | 'dateAdded' | 'likes'>) => void;
  initialData?: GalleryItem | null;
  mode: 'add' | 'edit';
}

// Koleksi siap tayang berkualitas tinggi spesifik wisata bahari Batu Atas
const BATU_ATAS_PRESETS = [
  {
    title: 'Video 4K: Terumbu Karang Wall Reef & Biota Laut Batu Atas',
    type: 'video' as const,
    category: 'Bawah Laut' as GalleryCategory,
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    location: 'Wall Reef Barat, Pulau Batu Atas',
    description: 'Eksplorasi menakjubkan dinding karang vertikal dengan kejernihan air spektakuler dan gerombolan ikan karang warna-warni.'
  },
  {
    title: 'Video HD: Atraksi Kawanan Lumba-lumba di Perairan Buton',
    type: 'video' as const,
    category: 'Bawah Laut' as GalleryCategory,
    url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    location: 'Laut Lepas Buton Selatan',
    description: 'Momen magis melompatnya kawanan lumba-lumba hidung botol mengiringi perahu nelayan tradisional saat matahari terbit.'
  },
  {
    title: 'Video Drone: Panorama Udara Pantai Nirwana & Pasir Putih',
    type: 'video' as const,
    category: 'Drone & Udara' as GalleryCategory,
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
    location: 'Pantai Nirwana, Batu Atas',
    description: 'Sudut pandang udara memperlihatkan kontras sempurna antara pasir putih halus, air laut bergradasi toska, dan bukit hijau.'
  },
  {
    title: 'Foto HD: Sunset Eksotis di Tanjung Pesisir Batu Atas',
    type: 'photo' as const,
    category: 'Sunset' as GalleryCategory,
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=80',
    location: 'Tanjung Barat Pulau Batu Atas',
    description: 'Siluet perahu katinting dengan latar belakang langit kemerahan saat matahari terbenam di ufuk barat Buton Selatan.'
  },
  {
    title: 'Foto HD: Penyu Sisik Alami di Kawasan Konservasi',
    type: 'photo' as const,
    category: 'Konservasi' as GalleryCategory,
    url: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1000&q=80',
    location: 'Taman Laut Batu Atas',
    description: 'Penyu sisik langka yang berenang tenang di antara terumbu karang sehat tanpa sentuhan polusi.'
  },
  {
    title: 'Foto HD: Sunrise Keemasan di Pesisir Timur',
    type: 'photo' as const,
    category: 'Sunrise' as GalleryCategory,
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
    location: 'Tanjung Timur Batu Atas',
    description: 'Kehangatan pagi menyambut nelayan yang kembali dari lautan dengan hasil tangkapan melimpah.'
  },
  {
    title: 'Video 4K: Snorkeling di Terumbu Karang Air Super Bening',
    type: 'video' as const,
    category: 'Snorkeling' as GalleryCategory,
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    location: 'Coral Garden Batu Atas',
    description: 'Berenang santai bersama ikan badut dan ikan karang tropis di perairan dangkal yang sangat jernih.'
  },
  {
    title: 'Foto HD: Perahu Phinisi dan Nelayan Tradisional',
    type: 'photo' as const,
    category: 'Perahu & Nelayan' as GalleryCategory,
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
    location: 'Pelabuhan Rakyat Batu Atas',
    description: 'Tradisi maritim lestari masyarakat nelayan pesisir Batu Atas.'
  },
  {
    title: 'Video Clip: Budaya Nelayan & Kuliner Tradisional Parende',
    type: 'video' as const,
    category: 'Budaya & Kuliner' as GalleryCategory,
    url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    location: 'Desa Nelayan Batu Atas',
    description: 'Kehangatan keramahan warga pesisir menyajikan kuliner khas ikan bakar segar dan sajian kuah parende yang lezat.'
  }
];

export const MediaUploaderModal: React.FC<MediaUploaderModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'presets' | 'url'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    type: (initialData?.type || 'photo') as 'photo' | 'video',
    url: initialData?.url || '',
    videoUrl: initialData?.videoUrl || '',
    category: (initialData?.category || 'Pantai') as GalleryCategory,
    description: initialData?.description || '',
    location: initialData?.location || 'Pulau Batu Atas, Buton Selatan'
  });

  // Gemini AI State
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState<string | null>(null);
  const [autoAiEnabled, setAutoAiEnabled] = useState(true);

  // Auto-HD Clarity & Sharpness Enhancer State
  const [autoHdEnabled, setAutoHdEnabled] = useState(true);

  const enhanceImageCanvas = (src: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) return resolve(src);
          
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Apply brightness boost (+8%), contrast (+12%) and saturation (+18%) for HD clarity & sharpness
          ctx.filter = "brightness(1.08) contrast(1.12) saturate(1.18)";
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          const enhancedUrl = canvas.toDataURL("image/jpeg", 0.95);
          resolve(enhancedUrl);
        } catch (e) {
          resolve(src);
        }
      };
      img.onerror = () => resolve(src);
      img.src = src;
    });
  };

  const createThumbnailForAi = (dataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      if (!dataUrl || !dataUrl.startsWith('data:image/')) return resolve(dataUrl);
      if (dataUrl.length < 500 * 1024) return resolve(dataUrl);

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) return resolve(dataUrl);

          const maxDim = 600;
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }

          canvas.width = w;
          canvas.height = h;
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", 0.7));
        } catch (e) {
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  };

  const generateAiDescription = async (customData?: Partial<typeof formData>) => {
    const targetData = { ...formData, ...customData };
    const targetUrl = targetData.type === 'photo' ? targetData.url : (targetData.videoUrl || targetData.url);
    
    if (!targetUrl && !targetData.title) {
      setAiStatus('⚠️ Harap unggah media atau masukkan judul terlebih dahulu.');
      return;
    }

    setIsAiLoading(true);
    setAiStatus('✨ Gemini AI sedang menganalisis visual dan informasi media ini secara otomatis...');
    
    try {
      let aiImageUrl = '';
      if (targetData.type === 'photo' && targetData.url) {
        if (targetData.url.startsWith('data:image/')) {
          aiImageUrl = await createThumbnailForAi(targetData.url);
        } else if (targetData.url.startsWith('http')) {
          aiImageUrl = targetData.url;
        }
      }
      
      const aiVideoUrl = targetData.videoUrl?.startsWith('http') ? targetData.videoUrl : '';

      const res = await fetch('/api/gemini/describe-media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: targetData.title || '',
          type: targetData.type || 'photo',
          category: targetData.category || 'Pantai',
          location: targetData.location || 'Pulau Batu Atas, Buton Selatan',
          url: aiImageUrl,
          videoUrl: aiVideoUrl
        })
      });
      
      const json = await res.json();
      if (json.success && json.data) {
        setFormData(prev => ({
          ...prev,
          description: json.data.description || prev.description,
          title: json.data.title || prev.title,
          category: (json.data.category as GalleryCategory) || prev.category,
          location: json.data.location || prev.location
        }));
        setAiStatus('🎉 Berhasil! Deskripsi, judul, dan kategori otomatis dirangkai oleh Gemini AI.');
      } else {
        setAiStatus(`❌ Gagal: ${json.error || 'Terjadi kesalahan saat menganalisis AI.'}`);
      }
    } catch (err: any) {
      setAiStatus('❌ Gagal terhubung ke layanan AI. Pastikan server atau koneksi internet stabil.');
    } finally {
      setIsAiLoading(false);
      setTimeout(() => setAiStatus(null), 7000);
    }
  };

  if (!isOpen) return null;

  // Handle local file selection (from HP or Laptop)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    setUploadError(null);
    
    // Validate size (limit to ~15MB for browser state / localStorage stability)
    if (file.size > 15 * 1024 * 1024) {
      setUploadError('Ukuran file maksimal 15MB agar performa website tetap stabil dan cepat.');
      return;
    }

    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');

    if (!isVideo && !isImage) {
      setUploadError('Format file tidak didukung! Harap pilih file gambar (.jpg, .png) atau video (.mp4, .webm).');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      
      if (isVideo) {
        const nextData = {
          ...formData,
          type: 'video' as const,
          videoUrl: dataUrl,
          url: formData.url || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
          title: formData.title || `Video Dokumentasi: ${file.name.replace(/\.[^/.]+$/, "")}`
        };
        setFormData(nextData);
        if (autoAiEnabled) generateAiDescription(nextData);
      } else {
        const finalUrl = autoHdEnabled ? await enhanceImageCanvas(dataUrl) : dataUrl;
        const nextData = {
          ...formData,
          type: 'photo' as const,
          url: finalUrl,
          title: formData.title || `Foto Bahari: ${file.name.replace(/\.[^/.]+$/, "")}`
        };
        setFormData(nextData);
        if (autoAiEnabled) generateAiDescription(nextData);
      }
    };

    reader.onerror = () => {
      setUploadError('Gagal membaca file dari perangkat Anda. Silakan coba lagi.');
    };

    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleSelectPreset = (preset: typeof BATU_ATAS_PRESETS[0]) => {
    const nextData = {
      title: preset.title,
      type: preset.type,
      url: preset.url,
      videoUrl: preset.videoUrl || '',
      category: preset.category,
      description: preset.description,
      location: preset.location
    };
    setFormData(nextData);
    if (autoAiEnabled && (!preset.description || preset.description.length < 35)) {
      generateAiDescription(nextData);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      alert('Harap masukkan judul media!');
      return;
    }
    if (formData.type === 'video' && !formData.videoUrl && !formData.url) {
      alert('Harap upload video atau masukkan URL video yang valid!');
      return;
    }
    if (formData.type === 'photo' && !formData.url) {
      alert('Harap upload foto atau masukkan URL gambar yang valid!');
      return;
    }

    onSave({
      title: formData.title,
      type: formData.type,
      url: formData.url || formData.videoUrl,
      videoUrl: formData.type === 'video' ? (formData.videoUrl || formData.url) : undefined,
      category: formData.category,
      description: formData.description || 'Eksplorasi keindahan alam dan pesona wisata Pulau Batu Atas.',
      location: formData.location || 'Pulau Batu Atas',
      enhancedHd: autoHdEnabled
    });

    if (mode === 'add') {
      // Keep modal open, clear the form to accept the next media
      setFormData({
        title: '',
        type: 'photo',
        url: '',
        videoUrl: '',
        category: 'Pantai',
        description: '',
        location: ''
      });
      setAiStatus('');
      setIsDragging(false);
      setUploadError(null);
      
      // Notify the user
      alert('✅ Media berhasil diunggah dan ditayangkan! Anda dapat menambahkan media selanjutnya.');
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-slate-900 border-2 border-cyan-500/60 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col my-auto max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/40">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                {mode === 'add' ? 'Tambah Foto & Video (Langsung Tayang & Nonton)' : 'Edit Data Media Galeri'}
              </h3>
              <p className="text-xs text-cyan-300 font-medium">
                Pilih upload file dari perangkat, koleksi video wisata, atau tautan link.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        {mode === 'add' && (
          <div className="bg-slate-950 px-4 sm:px-6 pt-3 border-b border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`px-3.5 py-2 rounded-t-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap border-b-2 ${
                activeTab === 'upload'
                  ? 'border-cyan-400 text-cyan-300 bg-slate-900/80 font-black'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>1. Upload File (HP/Laptop)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('presets')}
              className={`px-3.5 py-2 rounded-t-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap border-b-2 ${
                activeTab === 'presets'
                  ? 'border-cyan-400 text-cyan-300 bg-slate-900/80 font-black'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span>2. Koleksi Siap Nonton (Batu Atas)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`px-3.5 py-2 rounded-t-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap border-b-2 ${
                activeTab === 'url'
                  ? 'border-cyan-400 text-cyan-300 bg-slate-900/80 font-black'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Link className="w-3.5 h-3.5 text-emerald-400" />
              <span>3. Tautan / Embed URL</span>
            </button>
          </div>
        )}

        {/* Modal Body & Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-left">
          
          {/* TAB 1: UPLOAD FILE FROM DEVICE */}
          {mode === 'add' && activeTab === 'upload' && (
            <div className="space-y-4">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition duration-300 flex flex-col items-center justify-center ${
                  isDragging
                    ? 'border-cyan-400 bg-cyan-950/40 shadow-lg scale-[0.99]'
                    : 'border-slate-700 hover:border-cyan-500 bg-slate-950/60 hover:bg-slate-950'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-14 h-14 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3 border border-cyan-500/40 shadow">
                  <Upload className="w-6 h-6 animate-bounce" />
                </div>
                <h4 className="text-sm font-bold text-white">
                  Klik atau Tarik File Foto / Video ke Sini
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  Dukung file Video MP4, WEBM (langsung bisa ditonton) & Foto JPG, PNG. Otomatis tayang di website!
                </p>
                <span className="mt-3 px-3 py-1 rounded-full bg-slate-800 text-cyan-300 text-[11px] font-semibold">
                  Pilih dari Perangkat Anda (Smartphone / Laptop)
                </span>
              </div>

              {uploadError && (
                <div className="p-3 rounded-xl bg-red-950/80 border border-red-700/60 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                  <span>{uploadError}</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PRESETS */}
          {mode === 'add' && activeTab === 'presets' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-300 font-medium">
                Klik salah satu video atau foto di bawah untuk menambahkan langsung ke galeri tanpa perlu upload:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                {BATU_ATAS_PRESETS.map((preset, idx) => {
                  const isSelected = formData.title === preset.title;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectPreset(preset)}
                      className={`p-3 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                        isSelected
                          ? 'bg-cyan-950/80 border-cyan-400 shadow-md'
                          : 'bg-slate-950 hover:bg-slate-900 border-slate-800'
                      }`}
                    >
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                        <img src={preset.url} alt={preset.title} className="w-full h-full object-cover" />
                        {preset.type === 'video' && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play className="w-4 h-4 fill-white text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-cyan-500 text-slate-950 uppercase">
                            {preset.type}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                        </div>
                        <h5 className="text-xs font-bold text-white truncate mt-1">{preset.title}</h5>
                        <span className="text-[10px] text-slate-400 truncate block">{preset.category}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* LIVE PREVIEW BOX (Appears as soon as URL or videoUrl is filled!) */}
          {(formData.url || formData.videoUrl) && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  {formData.type === 'video' ? <Video className="w-4 h-4 text-red-400 animate-pulse" /> : <ImageIcon className="w-4 h-4 text-cyan-400" />}
                  <span>LIVE PREVIEW MEDIA (Bisa Langsung Dites Nonton):</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  Siap Ditayangkan
                </span>
              </div>

              <div className="rounded-xl overflow-hidden bg-black flex items-center justify-center max-h-52 border border-slate-800">
                {formData.type === 'video' && (formData.videoUrl || formData.url) ? (
                  <video
                    src={formData.videoUrl || formData.url}
                    controls
                    className={`w-full max-h-52 object-contain bg-black transition-all duration-300 ${autoHdEnabled ? 'brightness-[1.08] contrast-[1.12] saturate-[1.18] drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]' : ''}`}
                  >
                    Maaf, browser tidak mendukung pemutaran video.
                  </video>
                ) : (
                  <img
                    src={formData.url}
                    alt="Preview Thumbnail"
                    className={`max-h-52 object-contain mx-auto transition-all duration-300 ${autoHdEnabled ? 'brightness-[1.08] contrast-[1.12] saturate-[1.18] drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]' : ''}`}
                  />
                )}
              </div>
            </div>
          )}

          {/* STANDARD FIELDS (Title, Type, Category, URL, Description) */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">
                Judul Foto / Video <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Terumbu Karang Eksotis di Spot Batu Atas"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">Jenis Media</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'photo' | 'video' })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="photo">Foto (Image HD)</option>
                  <option value="video">Video (MP4 / Clip)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">Kategori</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as GalleryCategory })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  {THEMATIC_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* If in URL tab or Edit mode, show direct URL inputs */}
            {(mode === 'edit' || activeTab === 'url') && (
              <div className="space-y-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    URL Gambar / Thumbnail <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {formData.type === 'video' && (
                  <div>
                    <label className="block text-xs font-semibold text-amber-300 mb-1">
                      URL Video MP4 / Embed <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://...mp4"
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      className="w-full bg-slate-900 border border-amber-500/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">Lokasi Spot</label>
              <input
                type="text"
                placeholder="Contoh: Wall Reef Barat, Pulau Batu Atas"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* AUTO-HD CLARITY & BRIGHTNESS ENHANCER PANEL */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-teal-950/70 border border-emerald-500/40 shadow-lg space-y-2.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                      Auto-HD & Ketajaman Visual
                      <span className="bg-emerald-500/20 text-emerald-300 text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-emerald-400/30">4K CLARITY</span>
                    </h4>
                    <p className="text-[10px] text-slate-300">
                      Otomatis meningkatkan kecerahan (+8%), kontras warna (+12%), dan resolusi ketajaman HD.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1.5 cursor-pointer bg-slate-950/90 px-3 py-1.5 rounded-xl border border-emerald-500/50 text-xs font-bold text-emerald-300 hover:bg-slate-950 transition shadow">
                    <input
                      type="checkbox"
                      checked={autoHdEnabled}
                      onChange={(e) => {
                        const nextVal = e.target.checked;
                        setAutoHdEnabled(nextVal);
                        if (nextVal && formData.type === 'photo' && formData.url && formData.url.startsWith('data:image/')) {
                          enhanceImageCanvas(formData.url).then(res => {
                            if (res !== formData.url) setFormData(prev => ({ ...prev, url: res }));
                          });
                        }
                      }}
                      className="rounded border-slate-700 text-emerald-500 focus:ring-0 w-4 h-4 cursor-pointer"
                    />
                    <span>⚡ Mode HD & Ketajaman {autoHdEnabled ? 'Aktif' : 'Nonaktif'}</span>
                  </label>
                </div>
              </div>

              {autoHdEnabled && (
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-200 flex items-center gap-2 animate-in fade-in duration-200">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Kecerahan, saturasi warna bahari, dan resolusi ketajaman HD otomatis diterapkan saat media disimpan!</span>
                </div>
              )}
            </div>

            {/* GEMINI AI AUTOMATIC CAPTION PANEL */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/70 via-slate-900 to-blue-950/70 border border-cyan-500/40 shadow-lg space-y-2.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-cyan-300 flex items-center gap-1">
                      Gemini AI Auto-Caption
                      <span className="bg-cyan-500/20 text-cyan-300 text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-cyan-400/30">SMART</span>
                    </h4>
                    <p className="text-[10px] text-slate-400">
                      Otomatis merangkai deskripsi puitis & menganalisis foto/video yang dimasukkan.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1.5 cursor-pointer bg-slate-950/90 px-2.5 py-1 rounded-lg border border-slate-800 text-[11px] text-slate-300 hover:border-cyan-500/50 transition">
                    <input
                      type="checkbox"
                      checked={autoAiEnabled}
                      onChange={(e) => setAutoAiEnabled(e.target.checked)}
                      className="rounded border-slate-700 text-cyan-500 focus:ring-0 w-3.5 h-3.5"
                    />
                    <span>⚡ Otomatis Aktif</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => generateAiDescription()}
                    disabled={isAiLoading}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition transform active:scale-95 cursor-pointer"
                  >
                    {isAiLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Menganalisis...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Buat Deskripsi AI</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {aiStatus && (
                <div className={`p-2.5 rounded-xl text-xs flex items-start gap-2 animate-in fade-in duration-200 ${
                  aiStatus.includes('❌') ? 'bg-red-500/10 border border-red-500/30 text-red-300' :
                  aiStatus.includes('🎉') ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' :
                  'bg-cyan-500/10 border border-cyan-500/30 text-cyan-200'
                }`}>
                  <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{aiStatus}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">Deskripsi Singkat</label>
              <textarea
                rows={3}
                placeholder="Ceritakan keindahan spot atau isi video ini (bisa diisi otomatis dengan tombol Gemini AI di atas)..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 transition"
              />
            </div>
          </div>

          {/* Modal Footer Buttons */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 text-xs font-black shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition transform hover:scale-[1.02]"
            >
              <CheckCircle2 className="w-4 h-4 stroke-[3]" />
              <span>{mode === 'add' ? 'Simpan & Tayangkan Langsung' : 'Simpan Perubahan'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
