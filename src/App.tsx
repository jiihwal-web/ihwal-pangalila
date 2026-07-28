import React, { useState, useEffect } from 'react';
import { GalleryItem, DestinationItem, ContactMessage, UserAccount, ActiveView, ReviewItem } from './types';
import { INITIAL_GALLERY, INITIAL_DESTINATIONS, INITIAL_MESSAGES, WEBSITE_LOGO_IMAGE, PROFILE_IHWAL_IMAGE } from './data/initialData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GalleryView } from './components/GalleryView';
import { DestinationsView } from './components/DestinationsView';
import { ProfileSection } from './components/ProfileSection';
import { GuideSection } from './components/GuideSection';
import { ContactAndMaps } from './components/ContactAndMaps';
import { LoginModal } from './components/LoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { RealtimeWeatherWidget } from './components/RealtimeWeatherWidget';
import { VideoCenterView } from './components/VideoCenterView';
import { MessageCircle, ShieldCheck, CheckCircle2, Heart, ArrowUp, Video, Film, Sparkles, Play } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('beranda');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Persistent State: Logo and Profile Image
  const [logoUrl, setLogoUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('pba_logo') || WEBSITE_LOGO_IMAGE;
    } catch {
      return WEBSITE_LOGO_IMAGE;
    }
  });

  const [profileUrl, setProfileUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('pba_profile') || PROFILE_IHWAL_IMAGE;
    } catch {
      return PROFILE_IHWAL_IMAGE;
    }
  });

  // Persistent State: Gallery
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('pba_gallery');
      return saved ? JSON.parse(saved) : INITIAL_GALLERY;
    } catch (e) {
      return INITIAL_GALLERY;
    }
  });

  // Persistent State: Destinations
  const [destinations, setDestinations] = useState<DestinationItem[]>(() => {
    try {
      const saved = localStorage.getItem('pba_destinations');
      return saved ? JSON.parse(saved) : INITIAL_DESTINATIONS;
    } catch (e) {
      return INITIAL_DESTINATIONS;
    }
  });

  // Persistent State: Messages
  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem('pba_messages');
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch (e) {
      return INITIAL_MESSAGES;
    }
  });

  // Persistent State: User Account
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('pba_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Persistent State: Language Switcher (ID / EN)
  const [lang, setLang] = useState<'ID' | 'EN'>(() => {
    try {
      const saved = localStorage.getItem('pba_lang');
      return (saved === 'EN' || saved === 'ID') ? saved : 'ID';
    } catch (e) {
      return 'ID';
    }
  });

  const handleLanguageChange = (newLang: 'ID' | 'EN') => {
    setLang(newLang);
    try {
      localStorage.setItem('pba_lang', newLang);
    } catch (e) {}
    if (newLang === 'EN') {
      showToast('Language switched to English (International Tourist Mode) 🌐');
    } else {
      showToast('Bahasa dialihkan ke Bahasa Indonesia 🇮🇩');
    }
  };

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pba_logo', logoUrl);
    } catch (e) {}
  }, [logoUrl]);

  useEffect(() => {
    try {
      localStorage.setItem('pba_profile', profileUrl);
    } catch (e) {}
  }, [profileUrl]);

  useEffect(() => {
    try {
      localStorage.setItem('pba_gallery', JSON.stringify(galleryItems));
    } catch (e) {}
  }, [galleryItems]);

  useEffect(() => {
    try {
      localStorage.setItem('pba_destinations', JSON.stringify(destinations));
    } catch (e) {}
  }, [destinations]);

  useEffect(() => {
    try {
      localStorage.setItem('pba_messages', JSON.stringify(messages));
    } catch (e) {}
  }, [messages]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('pba_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('pba_user');
      }
    } catch (e) {}
  }, [currentUser]);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero-section');
      const threshold = hero ? hero.offsetHeight - 100 : 450;
      if (window.scrollY > threshold) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Gallery Handlers
  const handleAddGalleryItem = (itemData: Omit<GalleryItem, 'id' | 'dateAdded' | 'likes'>) => {
    const newItem: GalleryItem = {
      ...itemData,
      id: `gal-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0],
      likes: 1
    };
    setGalleryItems((prev) => [newItem, ...prev]);
    showToast(`Berhasil! Media "${newItem.title}" kini disimpan & dipajang di depan website.`);
  };

  const handleEditGalleryItem = (updatedItem: GalleryItem) => {
    setGalleryItems((prev) => prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
    showToast(`Perubahan media "${updatedItem.title}" berhasil disimpan.`);
  };

  const handleDeleteGalleryItem = (id: string) => {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item galeri telah dihapus.');
  };

  const handleLikeItem = (id: string) => {
    setGalleryItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, likes: item.likes + 1 };
        }
        return item;
      })
    );
    showToast('Terima kasih atas apresiasi/suka Anda!');
  };

  const handleToggleFavorite = (id: string) => {
    if (!currentUser) {
      setIsLoginModalOpen(true);
      return;
    }
    const isFav = currentUser.favorites.includes(id);
    const updatedFavs = isFav
      ? currentUser.favorites.filter((favId) => favId !== id)
      : [...currentUser.favorites, id];

    const updatedUser: UserAccount = { ...currentUser, favorites: updatedFavs };
    setCurrentUser(updatedUser);
    showToast(isFav ? 'Dihapus dari daftar Favorit.' : 'Disimpan ke daftar Favorit pribadi Anda!');
  };

  // Destination Handlers
  const handleAddDestination = (destData: Omit<DestinationItem, 'id' | 'rating'>) => {
    const newDest: DestinationItem = {
      ...destData,
      id: `dest-${Date.now()}`,
      rating: 5.0
    };
    setDestinations((prev) => [newDest, ...prev]);
    showToast(`Destinasi baru "${newDest.name}" berhasil ditambahkan!`);
  };

  const handleEditDestination = (updatedDest: DestinationItem) => {
    setDestinations((prev) => prev.map((d) => (d.id === updatedDest.id ? updatedDest : d)));
    showToast(`Destinasi "${updatedDest.name}" berhasil diperbarui.`);
  };

  const handleDeleteDestination = (id: string) => {
    setDestinations((prev) => prev.filter((d) => d.id !== id));
    showToast('Destinasi telah dihapus.');
  };

  const handleAddReview = (destId: string, reviewData: Omit<ReviewItem, 'id' | 'date'>) => {
    const newReview: ReviewItem = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      verified: true
    };
    setDestinations((prev) =>
      prev.map((dest) => {
        if (dest.id === destId) {
          const currentReviews = dest.reviews || [];
          const updatedReviews = [newReview, ...currentReviews];
          const avgRating = Number((updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1));
          return { ...dest, rating: avgRating || dest.rating, reviews: updatedReviews };
        }
        return dest;
      })
    );
    showToast(`Terima kasih! Ulasan testimoni dari ${reviewData.author} berhasil ditambahkan.`);
  };

  // Contact Message Handlers
  const handleSendMessage = (msgData: Omit<ContactMessage, 'id' | 'date' | 'read'>) => {
    const newMsg: ContactMessage = {
      ...msgData,
      id: `msg-${Date.now()}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      read: false
    };
    setMessages((prev) => [newMsg, ...prev]);
    showToast('Pesan berhasil dikirim ke pengelola Ihwal Pangalila!');
  };

  const handleDeleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    showToast('Pesan telah dihapus dari inbox admin.');
  };

  const handleToggleReadMessage = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          return { ...m, read: !m.read };
        }
        return m;
      })
    );
  };

  // Auth Handlers
  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setActiveView('dashboard');
      showToast(`Selamat datang di Dashboard CMS Imajinasif, ${user.name}!`);
    } else {
      showToast(`Berhasil login sebagai Pengunjung (${user.name})`);
    }
  };

  const handleLogout = () => {
    const wasAdmin = currentUser?.role === 'admin';
    setCurrentUser(null);
    if (wasAdmin && activeView === 'dashboard') {
      setActiveView('beranda');
    }
    showToast('Anda telah berhasil keluar (Logout).');
  };

  // Render Admin Dashboard full-screen if admin is in dashboard view
  if (activeView === 'dashboard' && currentUser?.role === 'admin') {
    return (
      <AdminDashboard
        galleryItems={galleryItems}
        destinations={destinations}
        messages={messages}
        onAddItem={handleAddGalleryItem}
        onEditItem={handleEditGalleryItem}
        onDeleteItem={handleDeleteGalleryItem}
        onAddDestination={handleAddDestination}
        onEditDestination={handleEditDestination}
        onDeleteDestination={handleDeleteDestination}
        onDeleteMessage={handleDeleteMessage}
        onToggleReadMessage={handleToggleReadMessage}
        onExitDashboard={() => setActiveView('beranda')}
        currentUser={currentUser}
        logoUrl={logoUrl}
        profileUrl={profileUrl}
        onUpdateLogo={(url) => { setLogoUrl(url); showToast('Logo berhasil diperbarui!'); }}
        onUpdateProfile={(url) => { setProfileUrl(url); showToast('Foto profil berhasil diperbarui!'); }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border-2 border-cyan-400 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        currentUser={currentUser}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        favoriteCount={currentUser?.favorites.length || 0}
        lang={lang}
        onLanguageChange={handleLanguageChange}
        logoUrl={logoUrl}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'beranda' && (
          <>
            <Hero
              onExploreGallery={() => setActiveView('galeri')}
              onContactAdmin={() => setActiveView('kontak')}
              lang={lang}
              latestMedia={galleryItems[0]}
            />

            {/* Banner Aplikasi Sinema & Pusat Video */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-10 relative z-20">
              <div className="bg-gradient-to-r from-slate-900 via-cyan-950/90 to-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-cyan-400/60 shadow-2xl shadow-cyan-950 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-slate-950 shrink-0 shadow-lg shadow-cyan-500/40 animate-pulse">
                    <Video className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-black uppercase tracking-wider border border-cyan-500/40 mb-1.5 shadow">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{lang === 'EN' ? 'NEW BUILT-IN VIDEO APPLICATION' : 'APLIKASI KHUSUS TERBARU DALAM WEBSITE'}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {lang === 'EN' ? 'Batu Atas Cinema & Video Hub Application' : 'Aplikasi Sinema & Pusat Video Pulau Batu Atas'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                      {lang === 'EN'
                        ? 'Special application built to accommodate, store, and stream all video collections. Every video opens in an interactive Cinema Theater mode with discussion comments!'
                        : 'Aplikasi yang bisa menampung banyak video khusus untuk menyimpan dan menampilkan video ke dalam website ketika video dibuka dalam mode bioskop (Cinema Mode).'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveView('video');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full md:w-auto px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-cyan-500/30 flex items-center justify-center gap-2.5 shrink-0 transition transform hover:-translate-y-1 active:translate-y-0"
                >
                  <Play className="w-5 h-5 fill-current stroke-[2.5]" />
                  <span>{lang === 'EN' ? 'Open Video Application' : '🎬 Buka Aplikasi Video Sekarang'}</span>
                </button>
              </div>
            </div>

            {/* Gallery right at the front of the website (Etalase Depan Website) */}
            <GalleryView
              galleryItems={galleryItems} // Show all uploaded photos & videos directly on Beranda
              onAddItem={handleAddGalleryItem}
              onEditItem={handleEditGalleryItem}
              onDeleteItem={handleDeleteGalleryItem}
              onLikeItem={handleLikeItem}
              currentUser={currentUser}
              onToggleFavorite={handleToggleFavorite}
              lang={lang}
              isHomePage={true}
            />
            <RealtimeWeatherWidget lang={lang} />
            <DestinationsView
              destinations={destinations}
              onAddDestination={handleAddDestination}
              onEditDestination={handleEditDestination}
              onDeleteDestination={handleDeleteDestination}
              onAddReview={handleAddReview}
              currentUser={currentUser}
              lang={lang}
            />
            <ProfileSection profileUrl={profileUrl} />
          </>
        )}

        {activeView === 'galeri' && (
          <GalleryView
            galleryItems={galleryItems}
            onAddItem={handleAddGalleryItem}
            onEditItem={handleEditGalleryItem}
            onDeleteItem={handleDeleteGalleryItem}
            onLikeItem={handleLikeItem}
            currentUser={currentUser}
            onToggleFavorite={handleToggleFavorite}
            lang={lang}
          />
        )}

        {activeView === 'video' && (
          <VideoCenterView
            galleryItems={galleryItems}
            onAddVideo={handleAddGalleryItem}
            onLikeItem={handleLikeItem}
            lang={lang}
            currentUser={currentUser}
          />
        )}

        {activeView === 'destinasi' && (
          <DestinationsView
            destinations={destinations}
            onAddDestination={handleAddDestination}
            onEditDestination={handleEditDestination}
            onDeleteDestination={handleDeleteDestination}
            onAddReview={handleAddReview}
            currentUser={currentUser}
            lang={lang}
          />
        )}

        {activeView === 'profil' && <ProfileSection profileUrl={profileUrl} />}

        {activeView === 'panduan' && <GuideSection />}

        {activeView === 'kontak' && <ContactAndMaps onSendMessage={handleSendMessage} />}
      </main>

      {/* Footer */}
      <Footer
        onNavClick={setActiveView}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        lang={lang}
        logoUrl={logoUrl}
      />

      {/* Login / Auth Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Floating Quick WhatsApp Button */}
      <a
        href="https://wa.me/6282345214218?text=Halo%20Pak%20Ihwal%20Pangalila,%20saya%20ingin%20tanya%20seputar%20wisata%20Pulau%20Batu%20Atas"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat WhatsApp Ihwal Pangalila (082345214218)"
        className="fixed bottom-6 left-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl shadow-emerald-600/40 border-2 border-white/40 transition transform hover:scale-110 flex items-center gap-2 group"
      >
        <MessageCircle className="w-6 h-6 fill-white animate-pulse" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pl-0 group-hover:pl-1">
          Chat WA: 082345214218
        </span>
      </a>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          title={lang === 'EN' ? 'Back to Top' : 'Kembali ke Atas'}
          aria-label="Back to top of page"
          className="fixed bottom-6 right-6 z-40 bg-slate-900/95 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-teal-500 text-cyan-400 hover:text-slate-950 p-4 rounded-full shadow-2xl shadow-cyan-500/30 border-2 border-cyan-500/50 hover:border-cyan-400 transition-all duration-300 transform hover:scale-110 flex items-center justify-center group animate-in fade-in zoom-in cursor-pointer"
        >
          <ArrowUp className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1" />
        </button>
      )}

    </div>
  );
}
