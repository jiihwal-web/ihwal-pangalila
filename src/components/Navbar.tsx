import React, { useState } from 'react';
import { ActiveView, UserAccount } from '../types';
import { Compass, Image as ImageIcon, MapPin, User, BookOpen, MessageSquare, LogIn, LogOut, ShieldCheck, Menu, X, LayoutDashboard, Sparkles, Heart, Video } from 'lucide-react';

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  currentUser: UserAccount | null;
  onOpenLoginModal: () => void;
  onLogout: () => void;
  favoriteCount: number;
  lang?: 'ID' | 'EN';
  onLanguageChange?: (lang: 'ID' | 'EN') => void;
  logoUrl: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  currentUser,
  onOpenLoginModal,
  onLogout,
  favoriteCount,
  lang,
  onLanguageChange,
  logoUrl
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentLang = lang || 'ID';
  const isEn = currentLang === 'EN';

  const navItems = [
    { id: 'beranda' as ActiveView, label: isEn ? 'Home' : 'Beranda', icon: Compass },
    { id: 'galeri' as ActiveView, label: isEn ? 'Exclusive Gallery' : 'Galeri Khusus', icon: ImageIcon, badge: isEn ? '8+ Media' : '8+ Media' },
    { id: 'video' as ActiveView, label: isEn ? 'Video Hub & Cinema' : 'Aplikasi Video', icon: Video, badge: isEn ? 'NEW HUB' : 'NEW APP' },
    { id: 'destinasi' as ActiveView, label: isEn ? 'Destinations' : 'Destinasi', icon: MapPin },
    { id: 'profil' as ActiveView, label: isEn ? 'Manager Profile' : 'Profil Pengelola', icon: User },
    { id: 'panduan' as ActiveView, label: isEn ? 'Travel Guide' : 'Langkah & Panduan', icon: BookOpen },
    { id: 'kontak' as ActiveView, label: isEn ? 'Contact & Map' : 'Kontak & Peta', icon: MessageSquare }
  ];

  const handleNavClick = (view: ActiveView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - Foto ke-7 */}
          <div 
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400/90 shadow-md bg-slate-900">
                <img 
                  src={logoUrl} 
                  alt="Logo Resmi Pulau Batu Atas (Foto 7)" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-cyan-500 text-slate-950 p-0.5 rounded-full shadow" title="Foto Ke-7 Jadi Logo">
                <Sparkles className="w-3 h-3 fill-slate-950" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-white via-cyan-100 to-amber-300 bg-clip-text text-transparent">
                  Pulau Batu Atas
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 rounded-full">
                  {isEn ? 'Official Site' : 'Official'}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                {isEn ? 'South Buton, Southeast Sulawesi - Indonesia' : 'Buton Selatan, Sulawesi Tenggara'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 relative ${
                    isActive 
                      ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md shadow-cyan-900/30 font-bold' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`px-1.5 py-0.2 text-[9px] rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Account / Admin Dashboard Control & Language Switcher */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher Toggle Pill (Desktop) */}
            <div className="flex items-center bg-slate-900/90 p-1 rounded-full border border-slate-800 shadow-inner">
              <button
                type="button"
                onClick={() => onLanguageChange && onLanguageChange('ID')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  !isEn
                    ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
                title="Bahasa Indonesia (Nusantara)"
              >
                <span className="text-sm">🇮🇩</span>
                <span>ID</span>
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange && onLanguageChange('EN')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isEn
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
                title="English (International Tourist Mode)"
              >
                <span className="text-sm">🇬🇧</span>
                <span>EN</span>
              </button>
            </div>

            {currentUser ? (
              <div className="flex items-center gap-2">
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                      activeView === 'dashboard'
                        ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                        : 'bg-gradient-to-r from-amber-600/30 to-orange-600/30 hover:from-amber-600/40 hover:to-orange-600/40 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span>{isEn ? 'CMS Dashboard' : 'Dashboard CMS'}</span>
                    <span className="px-1.5 py-0.5 text-[9px] bg-amber-400 text-slate-950 font-black rounded">
                      090806
                    </span>
                  </button>
                )}

                {currentUser.role === 'public' && favoriteCount > 0 && (
                  <button 
                    onClick={() => handleNavClick('galeri')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-950/40 border border-pink-800/50 text-pink-300 rounded-xl text-xs font-medium hover:bg-pink-900/40 transition"
                  >
                    <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-bounce" />
                    <span>{favoriteCount} {isEn ? 'Favorites' : 'Favorit'}</span>
                  </button>
                )}

                <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                  <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl">
                    <div className={`w-2 h-2 rounded-full ${currentUser.role === 'admin' ? 'bg-amber-400' : 'bg-emerald-400'}`}></div>
                    <span className="text-xs font-semibold text-slate-200 max-w-[120px] truncate">
                      {currentUser.name}
                    </span>
                    {currentUser.role === 'admin' && (
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" title="Admin Pengelola" />
                    )}
                  </div>
                  
                  <button
                    onClick={onLogout}
                    title={isEn ? 'Sign Out / Logout' : 'Keluar / Logout'}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-950/30 rounded-xl transition"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenLoginModal}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white shadow-lg shadow-cyan-600/20 transition duration-200 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>{isEn ? 'Sign In / Admin Login' : 'Masuk / Login Admin'}</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button & Language Toggle */}
          <div className="flex xl:hidden items-center gap-2">
            {/* Mobile Language Pill */}
            <div className="flex items-center bg-slate-900/90 p-0.5 rounded-lg border border-slate-800">
              <button
                type="button"
                onClick={() => onLanguageChange && onLanguageChange('ID')}
                className={`px-2 py-1 rounded-md text-[10px] font-bold transition flex items-center gap-1 ${
                  !isEn ? 'bg-red-600 text-white shadow' : 'text-slate-400'
                }`}
              >
                <span>🇮🇩 ID</span>
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange && onLanguageChange('EN')}
                className={`px-2 py-1 rounded-md text-[10px] font-bold transition flex items-center gap-1 ${
                  isEn ? 'bg-blue-600 text-white shadow' : 'text-slate-400'
                }`}
              >
                <span>🇬🇧 EN</span>
              </button>
            </div>

            {!currentUser && (
              <button
                onClick={onOpenLoginModal}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-600 text-white shadow"
              >
                {isEn ? 'Login' : 'Login'}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          {/* Mobile Dropdown Language Switcher Banner */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/80 border border-slate-800 mb-3 shadow-inner">
            <div className="flex items-center gap-2">
              <span className="text-base">🌐</span>
              <div>
                <div className="text-xs font-bold text-slate-200">
                  {isEn ? 'International Tourist Mode' : 'Pilih Bahasa / Language'}
                </div>
                <div className="text-[10px] text-slate-400">
                  {isEn ? 'English (International)' : 'Bahasa Indonesia'}
                </div>
              </div>
            </div>
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => onLanguageChange && onLanguageChange('ID')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                  !isEn ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🇮🇩 IDN</span>
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange && onLanguageChange('EN')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                  isEn ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🇬🇧 ENG</span>
              </button>
            </div>
          </div>

          {currentUser && currentUser.role === 'admin' && (
            <button
              onClick={() => handleNavClick('dashboard')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold bg-amber-500 text-slate-950 shadow-md mb-3"
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-slate-950" />
                <span>{isEn ? 'CMS Dashboard Imajinasif' : 'Dashboard CMS Imajinasif'}</span>
              </div>
              <span className="px-2 py-0.5 text-xs bg-slate-950 text-amber-400 rounded font-black">
                Admin
              </span>
            </button>
          )}

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-cyan-600 text-white shadow'
                      : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            {currentUser ? (
              <div className="flex items-center justify-between w-full bg-slate-900 px-4 py-2.5 rounded-xl">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-slate-200">{currentUser.name}</span>
                  <span className="text-[10px] text-slate-400 uppercase">({currentUser.role})</span>
                </div>
                <button
                  onClick={onLogout}
                  className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Logout' : 'Keluar'}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLoginModal();
                }}
                className="w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-600 to-teal-500 text-white text-center shadow-lg"
              >
                {isEn ? 'Sign In / Login (Admin & Visitor)' : 'Masuk / Login (Admin & Pengunjung)'}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
