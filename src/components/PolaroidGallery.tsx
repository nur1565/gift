import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, Heart, Sparkles, Upload, RefreshCw, CheckCircle2, ImagePlus } from 'lucide-react';
import { POLAROID_MEMORIES } from '../data/romanticContent';
import { MemoryItem } from '../types';
import { compressImageFile } from '../utils/imageCompressor';

export const PolaroidGallery: React.FC = () => {
  const [memories, setMemories] = useState<MemoryItem[]>(POLAROID_MEMORIES);
  const [activePhoto, setActivePhoto] = useState<MemoryItem | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [targetedSlotForUpload, setTargetedSlotForUpload] = useState<string>('mem-1');

  // Load custom photos from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sushmita_polaroid_memories_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 4) {
          setMemories(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleSlotFileSelect = async (slotId: string, file: File) => {
    try {
      setUploadingSlot(slotId);
      const compressedDataUrl = await compressImageFile(file);

      const updated = memories.map((m) => {
        if (m.id === slotId) {
          return {
            ...m,
            imageUrl: compressedDataUrl,
          };
        }
        return m;
      });

      setMemories(updated);
      try {
        localStorage.setItem('sushmita_polaroid_memories_v3', JSON.stringify(updated));
      } catch {
        // Fallback if local storage quota is reached
      }

      setUploadSuccess(slotId);
      setTimeout(() => setUploadSuccess(null), 3000);
    } catch (err) {
      console.error('Failed to compress image:', err);
    } finally {
      setUploadingSlot(null);
    }
  };

  const triggerDirectUpload = (slotId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTargetedSlotForUpload(slotId);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleGlobalFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleSlotFileSelect(targetedSlotForUpload, file);
    }
  };

  const handleResetDefaults = () => {
    setMemories(POLAROID_MEMORIES);
    localStorage.removeItem('sushmita_polaroid_memories_v3');
    localStorage.removeItem('sushmita_polaroid_memories_v2');
    localStorage.removeItem('sushmita_polaroid_memories');
    setShowUploadModal(false);
  };

  const slotsMeta: { [key: string]: { label: string; desc: string } } = {
    'mem-1': {
      label: 'Photo 1 — Sushmita Solo Pose',
      desc: 'WhatsApp Image 2026-10-03 at 2.18.09 PM (Lavender dress on staircase)',
    },
    'mem-2': {
      label: 'Photo 2 — Vivek & Sushmita Park Smile',
      desc: 'WhatsApp Image 2026-10-03 at 2.19.03 PM (Smiling together under trees)',
    },
    'mem-3': {
      label: 'Photo 3 — Flower Filter Memory',
      desc: 'WhatsApp Image 2026-10-03 at 2.19.02 PM (1) (Plumeria flower filter)',
    },
    'mem-4': {
      label: 'Photo 4 — 9:44 AM Close Portrait',
      desc: 'WhatsApp Image 2026-10-03 at 2.19.02 PM (Resting head together)',
    },
  };

  return (
    <section id="memories-section" className="py-20 sm:py-28 px-4 sm:px-6 relative">
      {/* Hidden file input for one-click Polaroid upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleGlobalFileInputChange}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#D88CA0] mb-2 font-medium">
            <Camera className="w-3.5 h-3.5 text-[#D88CA0]" />
            <span>Cherished Moments</span>
            <Camera className="w-3.5 h-3.5 text-[#D88CA0]" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-romantic font-normal text-[#573B46] tracking-tight">
            Our Little Memories 📸
          </h2>

          <p className="mt-2 text-sm sm:text-base text-[#573B46]/75 font-light max-w-md mx-auto">
            Hazaaron pal guzar gaye, lekin kuch pal bas dil mein thehar gaye.
          </p>

          {/* Prominent Action Banner to Add Real Uploaded WhatsApp Photos */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D88CA0] to-[#573B46] text-white text-xs sm:text-sm font-medium shadow-md shadow-[#D88CA0]/30 hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <ImagePlus className="w-4 h-4 text-white" />
              <span>📸 Apni 4 Real Photos Yahan Lagayein (Click Here)</span>
            </button>
          </div>
        </div>

        {/* Polaroid Grid — Portrait Aspect Ratio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 pt-4">
          {memories.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              role="button"
              tabIndex={0}
              aria-label={`View photo: ${item.caption}`}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActivePhoto(item)}
              className={`relative bg-[#FFFDF9] p-3.5 pb-6 rounded-sm polaroid-shadow border border-[#573B46]/10 transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:rotate-0 hover:z-20 cursor-pointer group ${item.rotationClass}`}
            >
              {/* Decorative Washi Tape on top */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-20 h-6 polaroid-tape -rotate-1 z-10 opacity-85 pointer-events-none" />

              {/* Quick direct replace button in top right of polaroid */}
              <button
                onClick={(e) => triggerDirectUpload(item.id, e)}
                title="Replace with your WhatsApp image"
                className="absolute top-2 right-2 z-20 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-[#573B46] shadow-sm flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-110 cursor-pointer"
                aria-label="Upload photo for this card"
              >
                <Camera className="w-3.5 h-3.5 text-[#D88CA0]" />
              </button>

              {/* Photo Frame Container (Portrait 3:4) */}
              <div className="relative aspect-3/4 w-full bg-[#FCE4EC]/40 overflow-hidden rounded-xs border border-[#573B46]/5">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FCE4EC] to-[#FFF9F5] p-4 text-center">
                          <span class="text-3xl mb-2">📸</span>
                          <span class="text-xs text-[#573B46]/70 font-serif-romantic">${item.title}</span>
                          <span class="text-[10px] text-[#D88CA0] mt-1 font-medium">Click to select photo</span>
                        </div>
                      `;
                    }
                  }}
                />

                {/* Subtle hover overlay */}
                <div className="absolute inset-0 bg-[#573B46]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/95 text-[#D88CA0] flex items-center justify-center shadow-md">
                    <Heart className="w-5 h-5 fill-[#D88CA0]" />
                  </div>
                </div>
              </div>

              {/* Handwritten Style Caption */}
              <div className="mt-4 px-1 text-center">
                <p className="font-serif-romantic italic text-base sm:text-lg text-[#573B46] tracking-wide line-clamp-1">
                  “{item.caption}”
                </p>
                <div className="mt-1 flex items-center justify-center gap-1.5 text-[11px] text-[#573B46]/60">
                  <span>{item.date}</span>
                  <span aria-hidden="true">·</span>
                  <span className="truncate max-w-[140px]">{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 bg-[#573B46]/85 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300 animate-fadeIn"
            onClick={() => setActivePhoto(null)}
          >
            <div
              className="relative max-w-lg w-full bg-[#FFFDF9] rounded-2xl p-5 sm:p-7 polaroid-shadow border border-white/20 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#573B46] flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                aria-label="Close photo view"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Large Image Container */}
              <div className="aspect-3/4 max-h-[65vh] w-full bg-[#FCE4EC]/50 rounded-xl overflow-hidden border border-[#573B46]/10 mb-4 flex items-center justify-center">
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Details & Caption */}
              <div className="text-center pt-2">
                <div className="flex items-center justify-center gap-1.5 text-xs text-[#D88CA0] font-medium mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{activePhoto.title}</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-serif-romantic text-2xl sm:text-3xl text-[#573B46] italic mb-1">
                  “{activePhoto.caption}”
                </h3>
                <p className="text-xs text-[#573B46]/70 mb-3">
                  {activePhoto.date} · {activePhoto.location}
                </p>

                {/* Quick button inside modal to change this photo */}
                <button
                  onClick={(e) => {
                    setActivePhoto(null);
                    triggerDirectUpload(activePhoto.id, e);
                  }}
                  className="text-xs text-[#D88CA0] hover:text-[#573B46] font-medium underline flex items-center justify-center gap-1 mx-auto"
                >
                  <Upload className="w-3 h-3" />
                  <span>Change this photo with your WhatsApp image</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4-Slot Dedicated Photo Uploader Modal */}
        {showUploadModal && (
          <div
            className="fixed inset-0 z-50 bg-[#573B46]/75 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <div
              className="relative max-w-xl w-full max-h-[90vh] overflow-y-auto bg-[#FFFDF9] rounded-2xl p-6 sm:p-7 border border-[#F8C8DC] shadow-2xl paper-texture"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#F8C8DC]">
                <h3 className="font-serif-romantic text-2xl text-[#573B46] font-semibold flex items-center gap-2">
                  <ImagePlus className="w-5 h-5 text-[#D88CA0]" />
                  <span>Add Your 4 WhatsApp Photos 💗</span>
                </h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="w-8 h-8 rounded-full text-[#573B46]/70 hover:text-[#573B46] flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <p className="text-xs sm:text-sm text-[#573B46]/85 leading-relaxed bg-[#FCE4EC]/40 p-3 rounded-xl border border-[#F8C8DC]">
                  Vivek, browse aur choose karein apne phone ya computer se woh 4 WhatsApp images jo aapne share ki hain. Ye turant aapke website ke Polaroids me replace ho jayengi aur hamesha saved rahengi:
                </p>

                {/* 4 Photo Upload Rows */}
                <div className="space-y-3">
                  {memories.map((m, index) => {
                    const meta = slotsMeta[m.id];
                    const isUploading = uploadingSlot === m.id;
                    const isSuccess = uploadSuccess === m.id;

                    return (
                      <div
                        key={m.id}
                        className="p-3 sm:p-3.5 bg-white rounded-xl border border-[#F8C8DC] flex items-center gap-3 sm:gap-4 shadow-xs"
                      >
                        {/* Mini Thumbnail */}
                        <div className="w-14 h-18 rounded-lg overflow-hidden bg-[#FCE4EC]/50 shrink-0 border border-[#F8C8DC]">
                          <img
                            src={m.imageUrl}
                            alt={m.title}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-semibold text-[#573B46] truncate">
                            {meta?.label || `Photo ${index + 1}`}
                          </p>
                          <p className="text-[11px] text-[#573B46]/70 truncate mt-0.5">
                            {meta?.desc}
                          </p>
                          {isSuccess && (
                            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Photo successfully updated!</span>
                            </span>
                          )}
                        </div>

                        {/* Upload Button */}
                        <div className="shrink-0">
                          <label className="px-3.5 py-1.5 rounded-full bg-[#FFF9F5] border border-[#D88CA0] hover:bg-[#FCE4EC] text-[#573B46] text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 shadow-xs">
                            <Upload className="w-3.5 h-3.5 text-[#D88CA0]" />
                            <span>{isUploading ? 'Loading...' : 'Choose File'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={isUploading}
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handleSlotFileSelect(m.id, f);
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-[#F8C8DC]/60 flex items-center justify-between">
                  <button
                    onClick={handleResetDefaults}
                    className="text-xs text-[#573B46]/70 hover:text-red-500 underline flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset to original images</span>
                  </button>

                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="px-6 py-2 rounded-full bg-[#573B46] text-white text-xs sm:text-sm font-medium hover:bg-[#D88CA0] transition-colors cursor-pointer"
                  >
                    Save & View Polaroids ♡
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
