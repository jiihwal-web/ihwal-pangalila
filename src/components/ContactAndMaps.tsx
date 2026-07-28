import React, { useState } from 'react';
import { ContactMessage } from '../types';
import { MessageCircle, Mail, MapPin, Send, CheckCircle2, Phone, Share2, Globe, ExternalLink, Instagram, Facebook, Youtube, Compass } from 'lucide-react';

interface ContactAndMapsProps {
  onSendMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'read'>) => void;
}

export const ContactAndMaps: React.FC<ContactAndMapsProps> = ({ onSendMessage }) => {
  const [formState, setFormState] = useState({
    senderName: '',
    senderEmail: '',
    senderPhone: '',
    subject: 'Inkuiri Wisata & Homestay',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.senderName || !formState.senderEmail || !formState.message) return;

    onSendMessage({
      senderName: formState.senderName,
      senderEmail: formState.senderEmail,
      senderPhone: formState.senderPhone,
      subject: formState.subject,
      message: formState.message
    });

    setIsSent(true);
    setFormState({
      senderName: '',
      senderEmail: '',
      senderPhone: '',
      subject: 'Inkuiri Wisata & Homestay',
      message: ''
    });

    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="py-16 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-bold mb-3">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Layanan Informasi & Reservasi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Kontak Lengkap & <span className="text-emerald-400">Peta Lokasi</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Hubungi pengelola secara langsung atau kirimkan pesan melalui formulir interaktif di bawah ini untuk rencana perjalan wisata Anda ke Pulau Batu Atas.
          </p>
        </div>

        {/* Top Cards: WhatsApp, Email, Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* WhatsApp Card */}
          <a
            href="https://wa.me/6282345214218?text=Halo%20Pak%20Ihwal%20Pangalila,%20saya%20ingin%20tanya%20seputar%20wisata%20Pulau%20Batu%20Atas"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/60 shadow-xl transition transform hover:-translate-y-1 group block"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <MessageCircle className="w-6 h-6 fill-emerald-500/30" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">WhatsApp Pengelola</span>
            <h3 className="text-xl font-black text-white mt-1 group-hover:text-emerald-400 transition">Ihwal Pangalila</h3>
            <p className="text-lg font-mono font-bold text-emerald-400 mt-1">0823-4521-4218</p>
            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
              <span>Klik untuk mulai obrolan instan</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </p>
          </a>

          {/* Email Card */}
          <a
            href="mailto:ihwalpangalila@gmail.com?subject=Inkuiri%20Wisata%20Pulau%20Batu%20Atas"
            className="bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-cyan-500/60 shadow-xl transition transform hover:-translate-y-1 group block"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <Mail className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Alamat E-mail</span>
            <h3 className="text-xl font-black text-white mt-1 group-hover:text-cyan-400 transition">Layanan Resmi</h3>
            <p className="text-sm font-bold text-cyan-300 mt-1 truncate">ihwalpangalila@gmail.com</p>
            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
              <span>Kirim penawaran atau kerjasama</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </p>
          </a>

          {/* Location & Maps Card */}
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Letak Geografis</span>
              <h3 className="text-xl font-black text-white mt-1">Pulau Batu Atas</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Kepulauan Batu Atas, Buton Selatan, Sulawesi Tenggara, Indonesia.
              </p>
            </div>
            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-slate-950 text-amber-400 text-[11px] font-bold border border-slate-800 w-fit">
              Koordinat: 6°34'S 122°41'E
            </span>
          </div>

        </div>

        {/* Middle Section: Contact Form & Google Maps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-6 bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-black text-white">Formulir Kirim Pesan</h3>
                <p className="text-xs text-slate-400 mt-1">Pesan akan langsung masuk ke Dashboard Pengelola.</p>
              </div>
              <Send className="w-6 h-6 text-cyan-400" />
            </div>

            {isSent && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 flex items-center gap-3 animate-in fade-in duration-300">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-white">Pesan Anda Terkirim!</p>
                  <p className="mt-0.5">Terima kasih. Pak Ihwal Pangalila akan segera membaca dan merespons pesan Anda.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama Anda..."
                  value={formState.senderName}
                  onChange={(e) => setFormState({ ...formState, senderName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Alamat Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="email@contoh.com"
                    value={formState.senderEmail}
                    onChange={(e) => setFormState({ ...formState, senderEmail: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nomor WhatsApp / HP</label>
                  <input
                    type="tel"
                    placeholder="0812..."
                    value={formState.senderPhone}
                    onChange={(e) => setFormState({ ...formState, senderPhone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Topik Pembicaraan</label>
                <select
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition"
                >
                  <option value="Inkuiri Wisata & Homestay">Inkuiri Wisata & Homestay</option>
                  <option value="Sewa Perahu & Paket Diving">Sewa Perahu & Paket Diving</option>
                  <option value="Kerjasama & Dokumentasi Media">Kerjasama & Dokumentasi Media</option>
                  <option value="Saran & Apresiasi Website">Saran & Apresiasi Website</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Isi Pesan / Pertanyaan *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tulis pesan lengkap Anda untuk Pak Ihwal Pangalila di sini..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition"
              >
                <Send className="w-4 h-4 text-slate-950" />
                <span>Kirim Pesan Sekarang</span>
              </button>
            </form>
          </div>

          {/* Right: Embedded Google Maps & Social Media */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Google Maps Container */}
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-4 sm:p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-bold text-white">Google Maps Pulau Batu Atas</h3>
                </div>
                <span className="text-[10px] bg-slate-950 px-2.5 py-1 rounded-full text-slate-400 border border-slate-800">
                  Buton Selatan
                </span>
              </div>

              {/* Interactive Iframe Map */}
              <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                <iframe
                  title="Google Maps Pulau Batu Atas"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127393.30050853754!2d122.64654313540843!3d-6.574673898864789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2da47ac90a2a3e5f%3A0xc3f8f1082c3c6f47!2sBatu%20Atas%20Island%2C%20South%20Buton%20Regency%2C%20South%20East%20Sulawesi!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>Dapat diakses melalui jalur laut dari Baubau / Wakatobi.</span>
                <a
                  href="https://www.google.com/maps/search/Pulau+Batu+Atas+Buton+Selatan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline font-bold flex items-center gap-1"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Social Media Channels */}
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-2xl">
              <h3 className="text-base font-bold text-white mb-4">Ikuti Media Sosial & Komunitas</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-slate-950 hover:bg-pink-950/40 border border-slate-800 hover:border-pink-500/50 flex flex-col items-center justify-center text-center group transition"
                >
                  <Instagram className="w-6 h-6 text-pink-400 mb-1 group-hover:scale-110 transition" />
                  <span className="text-[11px] font-bold text-white">Instagram</span>
                  <span className="text-[9px] text-slate-400">@pulaubatuatas</span>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-slate-950 hover:bg-blue-950/40 border border-slate-800 hover:border-blue-500/50 flex flex-col items-center justify-center text-center group transition"
                >
                  <Facebook className="w-6 h-6 text-blue-400 mb-1 group-hover:scale-110 transition" />
                  <span className="text-[11px] font-bold text-white">Facebook</span>
                  <span className="text-[9px] text-slate-400">Wisata Batu Atas</span>
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-slate-950 hover:bg-red-950/40 border border-slate-800 hover:border-red-500/50 flex flex-col items-center justify-center text-center group transition"
                >
                  <Youtube className="w-6 h-6 text-red-500 mb-1 group-hover:scale-110 transition" />
                  <span className="text-[11px] font-bold text-white">YouTube</span>
                  <span className="text-[9px] text-slate-400">Pesona TV</span>
                </a>

                <a
                  href="https://wa.me/6282345214218"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-slate-950 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/50 flex flex-col items-center justify-center text-center group transition"
                >
                  <MessageCircle className="w-6 h-6 text-emerald-400 mb-1 group-hover:scale-110 transition" />
                  <span className="text-[11px] font-bold text-white">Grup WA</span>
                  <span className="text-[9px] text-slate-400">Traveler Community</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
