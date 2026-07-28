import React from 'react';
import { ActiveView, GalleryItem } from '../types';
import { Compass, Image as ImageIcon, MessageCircle, Play, Shield, Sun, Waves, Wind, ArrowRight, Sparkles, MapPin, Award, Video } from 'lucide-react';
import { usePulauWeather } from '../utils/weather';

interface HeroProps {
  onExploreGallery: () => void;
  onContactAdmin: () => void;
  lang?: 'ID' | 'EN';
  latestMedia?: GalleryItem;
}

export const Hero: React.FC<HeroProps> = ({ onExploreGallery, onContactAdmin, lang, latestMedia }) => {
  const isEn = lang === 'EN';
  const { weather } = usePulauWeather(lang);

  return (
    <div id="hero-section" className="relative overflow-hidden bg-slate-950 pt-8 pb-16 md:py-24 border-b border-slate-800/80">
      
      {/* Background Glows and Atmospheric effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-bold tracking-wide shadow-inner animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isEn ? 'Marine Paradise of South Wakatobi & South Buton' : 'Surga Bahari Wakatobi Selatan & Buton Selatan'}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              {isEn ? 'Explore the Wonders of' : 'Eksplorasi Keajaiban'} <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                Pulau Batu Atas
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {isEn ? (
                <>
                  Experience the clearest coral reefs, pristine white sands, and the warmth of archipelago maritime culture. This official website is managed directly by <strong className="text-amber-300">Ihwal Pangalila</strong> with an easy-to-update interactive gallery system.
                </>
              ) : (
                <>
                  Nikmati pesona terumbu karang terjernih, pasir putih alami, dan kehangatan budaya bahari nusantara. Website resmi ini dikelola langsung oleh <strong className="text-amber-300">Ihwal Pangalila</strong> dengan sistem galeri interaktif yang mudah diperbarui.
                </>
              )}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreGallery}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <ImageIcon className="w-5 h-5 text-slate-950" />
                <span>{isEn ? 'Explore Exclusive Gallery (Photos & Videos)' : 'Lihat Galeri Khusus (Foto & Video)'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/6282345214218?text=Halo%20Pak%20Ihwal%20Pangalila,%20saya%20tertarik%20berwisata%20dan%20mengetahui%20lebih%20banyak%20tentang%20Pulau%20Batu%20Atas"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border-2 border-emerald-500/60 hover:border-emerald-500 text-emerald-400 font-bold text-sm shadow-lg flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>{isEn ? 'WhatsApp Manager: 082345214218' : 'WhatsApp Pengelola: 082345214218'}</span>
              </a>
            </div>

            {/* Key Highlight Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 text-left">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-base sm:text-lg">
                  <Waves className="w-4 h-4" />
                  <span>25m+</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{isEn ? 'Crystal Clear Underwater Visibility' : 'Jarak Pandang Air Bening'}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-base sm:text-lg">
                  <Award className="w-4 h-4" />
                  <span>4.9/5</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{isEn ? 'Traveler & Diver Rating' : 'Rating Traveler & Diver'}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-base sm:text-lg">
                  <MapPin className="w-4 h-4" />
                  <span>8+ Spot</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{isEn ? 'Featured Beaches & Wall Reefs' : 'Pantai & Wall Reef Unggulan'}</p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase & Weather Widget */}
          <div className="lg:col-span-5 relative">
            
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Feature Photo Card */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-cyan-500/50 shadow-2xl shadow-cyan-950/50 group bg-slate-900">
                {latestMedia?.type === 'video' ? (
                  <video
                    src={latestMedia.videoUrl || latestMedia.url}
                    poster={latestMedia.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition duration-700"
                  />
                ) : (
                  <img
                    src={latestMedia?.url || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"}
                    alt={latestMedia?.title || "Pantai Batu Atas"}
                    className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
                
                <div className="absolute top-4 left-4 bg-cyan-950/90 border border-cyan-400/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-cyan-300 text-[11px] font-bold shadow-lg animate-pulse z-10">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isEn ? '✨ Latest Uploaded Media at Front Website' : '✨ Tersimpan di Depan Website'}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 z-10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                      {latestMedia?.type === 'video' ? <Video className="w-3.5 h-3.5" /> : <ImageIcon className="w-3.5 h-3.5" />}
                      {latestMedia?.category || (isEn ? 'Featured Photo Spot' : 'Spot Foto Unggulan')}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold rounded-full border border-emerald-500/30">
                      {isEn ? 'Live Showcase Depan' : 'Live di Depan Web'}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">{latestMedia?.title || (isEn ? 'Batu Atas White Sand Beach' : 'Pantai Pasir Putih Batu Atas')}</h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    {latestMedia?.description || (isEn ? 'Presenting three-color ocean gradations with extremely soft and calm sands.' : 'Menyajikan gradasi tiga warna laut dengan pasir yang sangat lembut dan tenang.')}
                  </p>
                </div>
              </div>

              {/* Floating Weather & Tide Widget */}
              <div className="absolute -top-6 -right-4 sm:-right-6 bg-slate-900/95 backdrop-blur-xl p-4 rounded-2xl border border-cyan-800/80 shadow-2xl max-w-[210px] animate-in fade-in zoom-in duration-500">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-[11px] font-bold text-slate-300">{isEn ? 'Live Weather' : 'Cuaca Live'}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold font-mono">
                    <Sun className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{weather.temperature}°C</span>
                  </div>
                </div>

                <div className="pt-2 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5 text-cyan-400"><Waves className="w-3.5 h-3.5" /> {isEn ? 'Sea Condition' : 'Kondisi Laut'}</span>
                    <span className="font-semibold text-emerald-400 truncate max-w-[90px]" title={weather.waveHeight}>{weather.isMarineSafe ? (isEn ? 'Calm' : 'Tenang') : (isEn ? 'Waves' : 'Ombak')}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5 text-teal-400"><Wind className="w-3.5 h-3.5" /> {isEn ? 'Wind Speed' : 'Angin'}</span>
                    <span className="font-semibold font-mono">{weather.windSpeed} km/j</span>
                  </div>
                </div>
              </div>

              {/* Floating Admin & Logo Reminder */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-amber-500/95 text-slate-950 p-3.5 rounded-2xl shadow-xl max-w-[220px] border-2 border-amber-300">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-slate-950 flex-shrink-0" />
                  <div>
                    <p className="text-[11px] font-black leading-tight uppercase">{isEn ? 'Easy CMS Editing' : 'Mudah Diedit CMS'}</p>
                    <p className="text-[10px] font-semibold text-slate-900 leading-snug">
                      {isEn ? 'Admin login with password ' : 'Login admin dengan sandi '}<span className="font-mono bg-slate-950 text-amber-300 px-1 rounded">090806</span>
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
