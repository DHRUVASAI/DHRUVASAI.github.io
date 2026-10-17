import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { Camera, Upload, Trash2, Check, MapPin, Terminal } from 'lucide-react';

interface IdentityCardProps {
  variant?: 'bento' | 'about';
  className?: string;
}

export const IdentityCard: React.FC<IdentityCardProps> = ({ variant = 'bento', className = '' }) => {
  const defaultPhoto = PERSONAL_INFO.portraitUrl || '/dhruva-portrait.png';
  const [customPhoto, setCustomPhoto] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('dhruva_custom_avatar');
      if (saved && saved !== 'null' && saved !== 'undefined' && saved.trim() !== '') {
        return saved;
      }
    } catch {
      // ignore
    }
    return defaultPhoto;
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [photoUrlInput, setPhotoUrlInput] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setCustomPhoto(base64);
        try {
          localStorage.setItem('dhruva_custom_avatar', base64);
        } catch {
          // ignore
        }
        setShowModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSave = () => {
    if (photoUrlInput.trim()) {
      setCustomPhoto(photoUrlInput.trim());
      try {
        localStorage.setItem('dhruva_custom_avatar', photoUrlInput.trim());
      } catch {
        // ignore
      }
      setShowModal(false);
      setPhotoUrlInput('');
    }
  };

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomPhoto(defaultPhoto);
    try {
      localStorage.removeItem('dhruva_custom_avatar');
    } catch {
      // ignore
    }
  };

  if (customPhoto) {
    return (
      <div className={`relative rounded-3xl overflow-hidden bg-neutral-950 shadow-md group border border-black/10 dark:border-white/10 ${className}`}>
        <img
          src={customPhoto}
          alt="Dhruva Sai"
          className="w-full h-full object-cover object-[center_15%] group-hover:scale-102 transition-transform duration-500 ease-out"
        />
        {/* Deep contrast gradient overlay for razor-sharp text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

        {/* Top Action Buttons (Edit / Reset Photo) */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button
            onClick={() => setShowModal(true)}
            className="p-1.5 rounded-full bg-black/70 text-white hover:bg-black text-xs backdrop-blur-md border border-white/20 transition-all cursor-pointer"
            title="Change photo"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleRemovePhoto}
            className="p-1.5 rounded-full bg-rose-950/80 text-rose-300 hover:bg-rose-900 text-xs backdrop-blur-md border border-rose-800/40 transition-all cursor-pointer"
            title="Reset photo"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card Footer matching reference image */}
        <div className="absolute bottom-4 left-5 right-5 text-white flex items-end justify-between pointer-events-none z-10">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold font-mono">
              AI Engineer
            </div>
            <div className="text-base sm:text-lg font-bold tracking-tight text-white drop-shadow-md">
              {PERSONAL_INFO.name}
            </div>
          </div>
          <span className="text-[11px] px-3 py-1 rounded-full bg-black/70 dark:bg-black/85 backdrop-blur-md text-white font-semibold border border-white/20 flex items-center gap-1.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Hyderabad, IN</span>
          </span>
        </div>

        {/* Edit Photo Modal */}
        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowModal(false);
            }}
          >
            <div className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-sm w-full p-6 text-white shadow-2xl space-y-4">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-400" />
                Update Portrait Photo
              </h3>

              <div className="space-y-3">
                <label className="block text-xs text-neutral-400">
                  Upload file (PNG, JPG, WebP)
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="mt-1 block w-full text-xs text-neutral-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
                  />
                </label>

                <div className="text-center text-xs text-neutral-500">or paste image URL</div>

                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={photoUrlInput}
                    onChange={(e) => setPhotoUrlInput(e.target.value)}
                    className="flex-1 bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={handleUrlSave}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Bespoke AI Engineering Identity Badge (Fallback)
  return (
    <div
      className={`relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0c0d12] via-[#11131a] to-[#08090d] shadow-md p-6 flex flex-col justify-between border border-neutral-800 text-white group ${className}`}
      style={{
        backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.12) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)'
      }}
    >
      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 border-b border-neutral-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-neutral-300 font-semibold tracking-wider">ENGINEER_ID // DS-01</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          VERIFIED
        </span>
      </div>

      <div className="my-auto py-4">
        <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
          {PERSONAL_INFO.name}
        </div>
        <div className="text-xs text-neutral-400 font-mono">
          AI Engineer · Systems Builder
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-neutral-400" />
          <span>Hyderabad, IN</span>
        </span>
      </div>
    </div>
  );
};
