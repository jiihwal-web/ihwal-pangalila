import React from 'react';
import { GUIDE_STEPS } from '../data/initialData';
import { BookOpen, Palette, Image as ImageIcon, Lock, LayoutDashboard, MapPin, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const GuideSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Palette': return Palette;
      case 'Image': return ImageIcon;
      case 'Lock': return Lock;
      case 'LayoutDashboard': return LayoutDashboard;
      default: return MapPin;
    }
  };

  return (
    <div className="py-16 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-bold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Dokumentasi & Tutorial Sistem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Langkah Pembuatan & <span className="text-cyan-400">Panduan Edit</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Panduan lengkap bagaimana website resmi Pulau Batu Atas dirancang dan bagaimana pengelola dapat memperbarui foto, video, serta fitur secara real-time tanpa perlu keahlian coding.
          </p>
        </div>

        {/* Steps Timeline Grid */}
        <div className="space-y-8">
          {GUIDE_STEPS.map((step) => {
            const IconComponent = getIcon(step.icon);
            return (
              <div
                key={step.stepNumber}
                className="bg-slate-900 rounded-3xl border border-slate-800/90 p-6 sm:p-8 shadow-xl hover:border-cyan-500/50 transition duration-300 relative overflow-hidden group"
              >
                {/* Step Number watermark */}
                <span className="absolute -top-4 -right-4 text-8xl font-black text-slate-800/30 group-hover:text-cyan-900/20 transition duration-500 pointer-events-none select-none">
                  0{step.stepNumber}
                </span>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
                  
                  {/* Left Column: Number Badge & Icon */}
                  <div className="md:col-span-3 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg shadow-cyan-600/20 flex-shrink-0">
                      #{step.stepNumber}
                    </div>
                    <div>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-slate-950 text-cyan-400 border border-slate-800 uppercase tracking-wider">
                        Langkah {step.stepNumber}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Middle Column: Description */}
                  <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-slate-800 md:pl-6 pt-4 md:pt-0">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-1">
                      {step.subtitle}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Right Column: Action Tip Box */}
                  <div className="md:col-span-4 bg-slate-950 p-4 rounded-2xl border border-slate-800/80 group-hover:border-amber-500/40 transition">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs mb-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Tips Pengelolaan Cepat:</span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">
                      {step.actionTip}
                    </p>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Quick Admin Access Banner */}
        <div className="mt-12 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-6 sm:p-10 text-slate-950 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 bg-slate-950 text-amber-300 rounded-full text-xs font-black uppercase tracking-wider inline-block shadow">
              Akses Admin Pengelola
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              Ingin Mencoba Menambah Foto atau Video?
            </h3>
            <p className="text-sm font-semibold text-slate-900 max-w-xl">
              Gunakan sandi rahasia <code className="bg-slate-950 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">090806</code> untuk membuka Dashboard Pengelolaan Konten yang Imajinasif.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={() => {
                const loginBtn = document.querySelector('header button');
                if (loginBtn) (loginBtn as HTMLElement).click();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-2xl bg-slate-950 hover:bg-slate-900 text-amber-400 font-black text-sm shadow-xl flex items-center gap-2.5 transition transform hover:-translate-y-0.5"
            >
              <span>Buka Jendela Login Admin</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
