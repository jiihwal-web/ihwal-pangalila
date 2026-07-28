import React, { useState } from 'react';
import { UserAccount } from '../types';
import { Lock, Mail, User, ShieldCheck, X, Sparkles, LogIn, CheckCircle2, AlertCircle } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'public' | 'admin'>('public');
  
  // Public Form state
  const [publicEmail, setPublicEmail] = useState('');
  const [publicName, setPublicName] = useState('');

  // Admin Form state
  const [adminPassword, setAdminPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePublicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicEmail || !publicName) return;

    onLoginSuccess({
      id: `usr-${Date.now()}`,
      email: publicEmail,
      name: publicName,
      role: 'public',
      favorites: [],
      loginMethod: 'email'
    });
    onClose();
  };

  const handleGoogleMockLogin = () => {
    onLoginSuccess({
      id: `usr-google-${Date.now()}`,
      email: 'traveler.nusantara@gmail.com',
      name: 'Wisatawan Nusantara (Google)',
      role: 'public',
      favorites: ['gal-1', 'gal-3'],
      loginMethod: 'google'
    });
    onClose();
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Mandated Admin password check: 090806
    if (adminPassword === '090806') {
      onLoginSuccess({
        id: 'usr-admin-ihwal',
        email: 'ihwalpangalila@gmail.com',
        name: 'Ihwal Pangalila (Koordinator)',
        role: 'admin',
        favorites: [],
        loginMethod: 'email'
      });
      onClose();
    } else {
      setErrorMsg('Password admin salah! Sandi resmi admin adalah: 090806');
    }
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl"
      >
        {/* Modal Header Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950">
          <button
            onClick={() => { setActiveTab('public'); setErrorMsg(null); }}
            className={`flex-1 py-4 px-3 text-xs font-bold transition flex items-center justify-center gap-2 border-b-2 ${
              activeTab === 'public'
                ? 'border-cyan-500 text-white bg-slate-900/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Login Pengunjung</span>
          </button>

          <button
            onClick={() => { setActiveTab('admin'); setErrorMsg(null); }}
            className={`flex-1 py-4 px-3 text-xs font-bold transition flex items-center justify-center gap-2 border-b-2 ${
              activeTab === 'admin'
                ? 'border-amber-500 text-amber-300 bg-slate-900/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Admin Khusus</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">
              {activeTab === 'public' ? 'Masuk sebagai Wisatawan / Pengunjung' : 'Login Admin Pengelola Wisata'}
            </h3>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {activeTab === 'public' ? (
            <div className="space-y-4 text-left">
              <p className="text-xs text-slate-300 leading-relaxed">
                Login untuk menyimpan spot favorit ke daftar pribadi Anda dan memberikan apresiasi/suka pada galeri foto & video.
              </p>

              {/* Quick Google Simulate Button */}
              <button
                type="button"
                onClick={handleGoogleMockLogin}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs flex items-center justify-center gap-2.5 shadow transition"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.8C6.2 7.3 8.9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" />
                  <path fill="#FBBC05" d="M5.3 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.5.4-2.3L1.6 7.4C.6 9.4 0 11.6 0 14s.6 4.6 1.6 6.6l3.7-2.8z" />
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.2L1.6 15.9C3.5 19.7 7.4 23 12 23z" />
                </svg>
                <span>Masuk Cepat via Akun Google</span>
              </button>

              <div className="flex items-center gap-3 my-3">
                <div className="h-px bg-slate-800 flex-1"></div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Atau Gunakan Email</span>
                <div className="h-px bg-slate-800 flex-1"></div>
              </div>

              <form onSubmit={handlePublicSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Anda..."
                    value={publicName}
                    onChange={(e) => setPublicName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Alamat Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="email@anda.com"
                    value={publicEmail}
                    onChange={(e) => setPublicEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow transition mt-2"
                >
                  Masuk sebagai Pengunjung
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-4 text-left">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Akses Eksklusif Pengelola</span>
                  <span className="text-[11px] text-slate-300 block mt-0.5">
                    Khusus untuk Ihwal Pangalila & tim admin guna mengelola galeri, membalas pesan, dan mengedit konten website.
                  </span>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-950 border border-red-500/80 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleAdminSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    Password Khusus Admin *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Masukkan sandi..."
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-amber-500/50 rounded-xl px-3.5 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 tracking-widest font-mono"
                  />
                  <span className="block text-[10px] text-slate-400 mt-1.5">
                    Petunjuk sandi admin sesuai permintaan: <strong className="text-amber-400 font-mono">090806</strong>
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-xl transition flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Masuk ke Dashboard CMS Imajinasif</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
