import React from 'react';
import { User, MessageCircle, Mail, MapPin, Award, ShieldCheck, Heart, Sparkles, ExternalLink, PhoneCall, CheckCircle } from 'lucide-react';

interface ProfileSectionProps {
  profileUrl: string;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ profileUrl }) => {
  return (
    <div className="py-16 bg-slate-950 min-h-screen relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Badge */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-bold mb-3">
            <User className="w-3.5 h-3.5" />
            <span>Koordinator & Pengelola Resmi Wisata</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Profil Pengelola <span className="text-amber-400">Pulau Batu Atas</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Berkenalan langsung dengan sosok penggerak ekowisata, pelestari laut, dan fasilitator kunjungan Anda di pesisir Buton Selatan.
          </p>
        </div>

        {/* Profile Card Showcase */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Col: Photo 8 (Ihwal Pangalila) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm">
                
                {/* Decorative Frame */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500 via-amber-500 to-teal-500 rounded-3xl blur-md opacity-40"></div>
                
                <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-2xl bg-slate-950 aspect-[3/4]">
                  <img
                    src={profileUrl}
                    alt="Ihwal Pangalila - Pengelola Wisata Pulau Batu Atas (Foto 8)"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Badge Label */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pt-12 pb-4 px-4 text-center">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow">
                      Foto Ke-8 • Profil Resmi
                    </span>
                    <h3 className="text-xl font-black text-white mt-1">Ihwal Pangalila</h3>
                    <p className="text-xs font-semibold text-cyan-300">Koordinator Wisata Pulau Batu Atas</p>
                  </div>
                </div>

                {/* Floating Verified Badge */}
                <div className="absolute -bottom-4 -right-2 bg-slate-950 text-white p-3 rounded-2xl border border-cyan-500 shadow-xl flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Status Akun</p>
                    <p className="text-xs font-black text-white">Verified Admin</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Col: Biography, Mission & Direct Contact */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>"Menjaga Kelestarian Alam, Membangun Ekonomi Desa"</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Selamat Datang di Pulau Batu Atas
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Halo! Saya <strong className="text-white font-bold">Ihwal Pangalila</strong>. Sebagai koordinator pengelola wisata Pulau Batu Atas, misi utama kami adalah memadukan keindahan bahari yang masih alami dengan kenyamanan fasilitas bagi setiap traveler dan penyelam yang berkunjung ke selatan Sulawesi Tenggara.
                </p>
                <p className="text-sm text-slate-400 leading-relaxed font-normal">
                  Website ini dirancang secara modern dengan teknologi interaktif agar memudahkan wisatawan melihat galeri foto, membandingkan spot terbaik, dan menghubungi kami langsung tanpa perantara untuk penyewaan kapal pesiar lokal, homestay warga, hingga panduan diving.
                </p>
              </div>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 mt-0.5">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Pelayanan Ramah 24 Jam</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Panduan lokal terpercaya sejak keberangkatan dari Baubau/Wakatobi.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-950 text-amber-400 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Konservasi Terumbu Karang</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Wisata bebas sampah plastik dan perlindungan penuh penyu laut.</p>
                  </div>
                </div>
              </div>

              {/* Direct Contact Buttons */}
              <div className="pt-4 border-t border-slate-800">
                <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                  Hubungi Langsung Pengelola (Fast Response):
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href="https://wa.me/6282345214218?text=Halo%20Pak%20Ihwal%20Pangalila,%20saya%20ingin%20berkonsultasi%20tentang%20wisata%20Pulau%20Batu%20Atas."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl transition transform hover:-translate-y-0.5 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 fill-white" />
                      </div>
                      <div>
                        <span className="block text-[10px] text-emerald-100 font-normal">WhatsApp Resmi</span>
                        <span className="text-base font-black">082345214218</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white opacity-80 group-hover:translate-x-0.5 transition" />
                  </a>

                  <a
                    href="mailto:ihwalpangalila@gmail.com?subject=Inkuiri%20Wisata%20Pulau%20Batu%20Atas"
                    className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 font-bold text-xs sm:text-sm shadow transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 font-normal">E-mail Pengelola</span>
                        <span className="text-xs sm:text-sm font-bold text-white">ihwalpangalila@gmail.com</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
