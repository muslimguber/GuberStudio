import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { X, Copy, Check } from 'lucide-react';

interface ThemeCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeCustomizerModal: React.FC<ThemeCustomizerModalProps> = ({ isOpen, onClose }) => {
  const { primaryColor, setPrimaryColor, setSecondaryColor } = useTheme();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const primaryPresets = [
    { name: 'Hijau Gelap', color: '#033003' },
    { name: 'Ungu Gelap', color: '#410052' },
    { name: 'Merah Gelap', color: '#4c0519' },
    { name: 'Indigo Gelap', color: '#1e1b4b' },
    { name: 'Hitam', color: '#000000' },
  ];

  const handleReset = () => {
    setPrimaryColor('#1e1b4b');
    setSecondaryColor('#ffffff');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(primaryColor.toUpperCase());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-md flex items-center justify-center z-[1000] p-4">
      <div className="bg-slate-900 border border-white/10 p-6 md:p-8 rounded-[28px] shadow-2xl w-full max-w-[340px] relative animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 hover:bg-white/5 rounded-full transition-all cursor-pointer"
        >
          <X size={18} />
        </button>
        
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              setPrimaryColor('#00566B');
              setSecondaryColor('#ffffff');
            }}
            className="text-xs font-black px-5 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 hover:scale-105 active:scale-95 tracking-widest transition-all uppercase cursor-pointer border border-white/5 mx-auto"
          >
            DEFAULT
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Primary Presets Group */}
          <div className="space-y-3">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Pilih Tema</label>
            <div className="grid grid-cols-5 gap-3.5">
              {primaryPresets.map((preset) => (
                <button
                  key={preset.color}
                  title={preset.name}
                  onClick={() => setPrimaryColor(preset.color)}
                  className={`w-full h-16 rounded-[14px] border-2 transition-all cursor-pointer relative ${
                    primaryColor.toLowerCase() === preset.color.toLowerCase() 
                      ? 'border-indigo-400 scale-110 shadow-[0_0_15px_rgba(99,102,241,0.4)]' 
                      : 'border-white/10 hover:border-white/30 hover:scale-105 bg-slate-800'
                  }`}
                  style={{ backgroundColor: preset.color }}
                >
                  {primaryColor.toLowerCase() === preset.color.toLowerCase() && (
                    <span className="absolute inset-x-0 bottom-1 flex items-center justify-center">
                      <Check size={12} className="text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Custom & Code Area */}
          <div className="space-y-3 pt-4 border-t border-white/5">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Kustom Kode Warna</label>
            
            <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-2xl p-3 pr-2 shadow-inner">
              {/* Color Picker Wrapper */}
              <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-slate-800 flex-shrink-0 border border-white/10">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="absolute inset-[-4px] w-[calc(100%+8px)] h-[calc(100%+8px)] cursor-pointer z-10 opacity-0"
                />
                <div 
                  className="w-full h-full"
                  style={{ backgroundColor: primaryColor }}
                />
              </div>

              {/* Hex Code Input Display */}
              <div className="flex-1 min-w-0">
                <input 
                  type="text"
                  value={primaryColor.toUpperCase()}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val.startsWith('#') && val.length <= 7) {
                      setPrimaryColor(val);
                    } else if (!val.startsWith('#') && val.length <= 6) {
                      setPrimaryColor('#' + val);
                    }
                  }}
                  className="w-full bg-transparent font-mono text-sm text-white font-medium focus:outline-none tracking-wider uppercase"
                />
              </div>

              {/* Copy Button */}
              <button 
                onClick={handleCopy}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all cursor-pointer flex items-center justify-center"
                title="Salin kode warna"
              >
                {copied ? (
                  <Check size={16} className="text-emerald-400" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
            
            {copied && (
              <p className="text-[10px] font-medium text-emerald-400 text-right animate-pulse">
                Kode warna berhasil disalin!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
