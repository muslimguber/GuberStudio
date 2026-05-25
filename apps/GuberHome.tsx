import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, X, Compass, ArrowRight } from 'lucide-react';
import { AppId } from '../types';
import { useTheme } from '../src/contexts/ThemeContext';

interface GuberHomeProps {
  onStart: () => void;
  apps: Array<{ id: AppId; name: string; icon: React.ReactNode; description: string; filename: string }>;
  onSelectApp: (id: AppId) => void;
}

const GuberHome: React.FC<GuberHomeProps> = ({ onStart, apps, onSelectApp }) => {
  const { primaryColor, secondaryColor } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  // Saring agar tidak menampilkan GuberHome itu sendiri di menu pilihan
  const selectableApps = apps.filter(app => app.id !== AppId.GUBER_HOME);

  // Fitur premium hanya akan diisi dan ditampilkan saat kolom pencarian TIDAK kosong
  const filteredApps = searchQuery.trim() === ''
    ? []
    : selectableApps.filter(app => 
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.filename.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div id="guber-home-outer-frame" className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4 sm:p-6 md:p-8">
      
      {/* Bingkai Utama Berbentuk Rounded Elips Melayang */}
      <div 
        id="guber-home-root" 
        className="w-full max-w-6xl bg-slate-900/30 rounded-[32px] md:rounded-[48px] border border-white/10 text-slate-100 flex flex-col items-center pt-16 md:pt-24 px-6 md:px-12 pb-20 relative overflow-hidden select-none shadow-2xl"
      >
        
        {/* Background radial grid line patterns */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.15) 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* Flat atmospheric glow backdrop without complex shifting color animation */}
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 rounded-full bg-indigo-600/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-[130px] pointer-events-none" />

        {/* Hero Header Area */}
        <div className="flex flex-col items-center text-center relative z-10 max-w-4xl mx-auto w-full mb-12">
          
          {/* Logo Tanpa Kotak Rounded & Logonya Senantiasa Berputar Halus */}
          <motion.div 
            id="guber-logo-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="relative mb-6"
          >
            <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none" />
            <motion.img 
              src="https://i.ibb.co.com/HLG6zZnr/LOGO-GUBER.png" 
              alt="Guber Studio Logo" 
              className="w-28 h-28 md:w-36 md:h-36 object-contain relative z-10"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
              onError={(e) => {
                const target = e.target as HTMLElement;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.innerHTML = '<span class="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">G</span>';
                }
              }}
            />
          </motion.div>

          {/* Title Area */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="space-y-3"
          >
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-none uppercase">
              GUBER <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">STUDIO</span> AI
            </h1>
            <p className="text-sm md:text-base font-medium text-slate-400 max-w-lg mx-auto leading-relaxed">
              Edit Foto Profesional dengan <span className="text-indigo-400 font-bold">Guber Studio Canggih</span>
            </p>
          </motion.div>

          {/* Tombol LIHAT SEMUA FITUR diatas kolom pencarian */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-8 flex flex-col items-center text-center gap-2 relative z-10"
          >
            <button 
              id="start-btn"
              onClick={onStart}
              className="group relative px-10 py-4 rounded-2xl font-black text-white text-sm tracking-[0.2em] uppercase overflow-hidden transition-all hover:scale-105 active:scale-95 cursor-pointer border-2 border-white"
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 20px 50px -5px color-mix(in srgb, ${primaryColor}, transparent 50%), inset 0 2px 4px rgba(255, 255, 255, 0.2)`
              }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-15 bg-white transition-opacity duration-300"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              
              <span className="relative font-black">
                LIHAT SEMUA FITUR
              </span>
            </button>
          </motion.div>

          {/* Search Inputs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-xl mx-auto w-full mt-10 relative px-2"
          >
            <div className="relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl focus-within:border-indigo-500/40 focus-within:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] transition-all duration-300">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                <Search size={20} />
              </div>
              
              <input 
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari fitur premium..."
                className="w-full bg-transparent pl-14 pr-14 py-4 md:py-5 text-base font-medium text-white placeholder:text-slate-500 outline-none rounded-2xl"
              />
              
              {searchQuery && (
                <button 
                  id="clear-search"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Dynamic Apps Catalog Area - Hanya me-render jika sedang mencari sesuatu */}
        {searchQuery.trim() !== '' && (
          <div className="w-full max-w-6xl relative z-10 mt-2 animate-in fade-in duration-500">
            <div className="flex items-center justify-between px-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-4 bg-indigo-500 rounded-full" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Hasil Pencarian
                </h2>
              </div>
              
              <span className="text-[10px] font-bold text-slate-500 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full">
                {filteredApps.length} studio ditemukan
              </span>
            </div>

            {filteredApps.length > 0 ? (
              <motion.div 
                layout
                id="app-grid"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 w-full"
              >
                {filteredApps.map((app, appIdx) => (
                  <motion.button
                    key={app.id}
                    id={`app-${app.id}`}
                    onClick={() => onSelectApp(app.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(appIdx * 0.04, 0.3) }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="group relative text-left rounded-2xl p-5 md:p-6 border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.05] hover:border-indigo-500/30 transition-all duration-300 shadow-lg flex flex-col justify-between min-h-[160px] overflow-hidden"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-500" />
                    
                    <div className="relative z-10 w-full">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-indigo-500/40 transition-all duration-300">
                        <div className="text-indigo-400 group-hover:text-indigo-300 transition-colors">
                          {app.icon}
                        </div>
                      </div>
                      <h3 className="font-bold text-white text-sm md:text-base leading-tight mb-1 group-hover:text-indigo-300 transition-colors">
                        {app.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium leading-snug line-clamp-2">
                        {app.description}
                      </p>
                    </div>

                    <div className="relative z-10 w-full mt-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-tight">
                        {app.filename}
                      </span>
                      <ArrowRight size={12} className="text-indigo-400 translate-x-[-4px] group-hover:translate-x-0 transition-transform duration-300" />
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                id="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full py-16 flex flex-col items-center justify-center text-center bg-white/[0.01] border border-dashed border-white/10 rounded-3xl"
              >
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-500 mb-3">
                  <Compass size={22} />
                </div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Tidak ditemukan hasil</h3>
                <p className="text-xs text-slate-600 font-medium max-w-sm mt-1 leading-normal">
                  Fitur "{searchQuery}" tidak tersedia. Coba kata kunci pencarian alternatif lain.
                </p>
              </motion.div>
            )}
          </div>
        )}

        {/* Footnote Signature */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 relative z-10 text-center"
        >
          <p className="text-slate-600 font-black text-[9px] uppercase tracking-[0.2em]">
            by Guber Smart
          </p>
        </motion.div>

        {/* Ambient indicator bulatan halus flat di bagian bawah */}
        <div className="mt-12 opacity-30 flex gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: secondaryColor }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
        </div>

      </div>
    </div>
  );
};

export default GuberHome;
