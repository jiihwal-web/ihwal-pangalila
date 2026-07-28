import React, { useState, useEffect } from 'react';
import { ActiveView } from '../types';
import { Compass, Image as ImageIcon, MapPin, User, BookOpen, MessageCircle, Heart, Lock, Shield, Users, TrendingUp, Video } from 'lucide-react';

interface FooterProps {
  onNavClick: (view: ActiveView) => void;
  onOpenLoginModal: () => void;
  lang?: 'ID' | 'EN';
  logoUrl: string;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenLoginModal, lang = 'ID', logoUrl }) => {
  const isEn = lang === 'EN';
  const [liveCount, setLiveCount] = useState(24);
  const [totalVisits, setTotalVisits] = useState(() => {
    try {
      const saved = localStorage.getItem('pba_total_visits');
      const base = saved ? parseInt(saved, 10) : 14852;
      return base + 1;
    } catch (e) {
      return 14853;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pba_total_visits', totalVisits.toString());
    } catch (e) {}
  }, [totalVisits]);

  // Simulate subtle live fluctuation every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount((prev) => {
        const delta = Math.random() > 0.45 ? 1 : -1;
        const next = prev + delta;
        return next < 16 ? 16 : next > 38 ? 38 : next;
      });
      // Occasionally increment total visits
      if (Math.random() > 0.7) {
        setTotalVisits((t) => t + 1);
      }
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Mission Col */}
          <div className="lg:col-span-5 space-y-4">
            <div 
              onClick={() => onNavClick('beranda')}
              className="flex items-center gap-3 cursor-pointer group select-none w-fit"
            >
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-amber-400 shadow-md">
                <img 
                  src={logoUrl} 
                  alt="Logo Pulau Batu Atas (Foto 7)" 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight block">
                  Pulau Batu Atas
                </span>
                <span className="text-[10px] text-cyan-400 uppercase font-semibold">Official Ecotourism Portal</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Website resmi keindahan bahari, terumbu karang, dan budaya masyarakat Batu Atas di Buton Selatan. Dikelola dengan penuh kebanggaan oleh <strong className="text-amber-300">Ihwal Pangalila</strong>.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="text-[11px] font-bold text-slate-300">Dukungan Sistem:</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 text-[10px] font-semibold">
                Galeri CMS Imajinasif
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 text-[10px] font-semibold">
                WhatsApp Live Chat
              </span>
            </div>

            {/* Live Visitor & Popularity Counter Widget */}
            <div className="pt-3">
              <div className="inline-flex flex-wrap items-center gap-2.5 sm:gap-3 px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 shadow-md text-xs w-full sm:w-auto">
                <div className="flex items-center gap-1.5" title={isEn ? "Live tourists actively exploring the site" : "Wisatawan aktif menjelajahi website"}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-bold text-emerald-400 font-mono">{liveCount}</span>
                  <span className="text-slate-400 text-[11px]">{isEn ? 'online now' : 'sedang online'}</span>
                </div>
                <div className="h-3 w-px bg-slate-800 hidden sm:block" />
                <div className="flex items-center gap-1.5" title={isEn ? "Total cumulative visitor sessions" : "Total akumulasi kunjungan wisata"}>
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-bold text-white font-mono">{totalVisits.toLocaleString(isEn ? 'en-US' : 'id-ID')}</span>
                  <span className="text-slate-400 text-[11px]">{isEn ? 'tourist visits' : 'kunjungan wisata'}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-amber-300 font-semibold pl-1 sm:border-l sm:border-slate-800">
                  <TrendingUp className="w-3 h-3 text-amber-400" />
                  <span>{isEn ? 'Popular Destination 🏝️' : 'Destinasi Favorit 🏝️'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigasi Utama</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavClick('beranda')} className="hover:text-cyan-400 transition flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Beranda Utama</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('galeri')} className="hover:text-cyan-400 transition flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Galeri Khusus (Foto & Video)</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('video')} className="hover:text-cyan-400 transition flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Aplikasi Sinema & Video Hub</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('destinasi')} className="hover:text-cyan-400 transition flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Destinasi & Spot Diving</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('profil')} className="hover:text-cyan-400 transition flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Profil Ihwal Pangalila</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('panduan')} className="hover:text-cyan-400 transition flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Panduan & Langkah Edit</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Admin Shortcuts */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Kontak Cepat & Admin</h4>
            
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">WhatsApp Pengelola:</span>
                <a href="https://wa.me/6282345214218" target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-400 hover:underline">
                  0823-4521-4218
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Alamat E-mail:</span>
                <a href="mailto:ihwalpangalila@gmail.com" className="font-bold text-cyan-400 hover:underline">
                  ihwalpangalila@gmail.com
                </a>
              </div>
            </div>

            <button
              onClick={onOpenLoginModal}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 font-bold text-xs flex items-center justify-center gap-2 transition shadow"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Login Admin Khusus (Sandi: 090806)</span>
            </button>
          </div>

        </div>

        {/* Copyright Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Pesona Pulau Batu Atas. Dikelola oleh Ihwal Pangalila. Hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <span>Dibuat dengan</span>
              <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
              <span>untuk Wisata Bahari Indonesia</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
