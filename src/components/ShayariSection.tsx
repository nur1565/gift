import React, { useState } from 'react';
import { Heart, RotateCcw, ChevronRight, ChevronLeft, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SHAYARI_LIST, RECIPIENT_NAME } from '../data/romanticContent';

interface ShayariSectionProps {
  onNextSection: () => void;
}

export const ShayariSection: React.FC<ShayariSectionProps> = ({ onNextSection }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [replayKey, setReplayKey] = useState(0);
  const [likes, setLikes] = useState<{ [key: number]: number }>({
    0: 5,
    1: 4,
    2: 7,
    3: 6,
    4: 8,
    5: 9,
  });

  const currentShayari = SHAYARI_LIST[currentIndex];
  const isLast = currentIndex === SHAYARI_LIST.length - 1;

  const handleNext = () => {
    if (currentIndex < SHAYARI_LIST.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setReplayKey((k) => k + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setReplayKey((k) => k + 1);
    }
  };

  const handleReplay = () => {
    setReplayKey((k) => k + 1);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    setLikes((prev) => ({
      ...prev,
      [currentIndex]: (prev[currentIndex] || 0) + 1,
    }));

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 20,
      spread: 50,
      origin: { x, y },
      colors: ['#F8C8DC', '#D88CA0', '#573B46'],
      scalar: 0.9,
    });
  };

  return (
    <section id="shayari-section" className="relative py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#D88CA0] mb-2 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#D88CA0]" />
            <span>Dedicated with all my heart</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D88CA0]" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-romantic font-normal text-[#573B46] tracking-tight">
            Sirf Tumhare Naam, <span className="font-cursive text-4xl sm:text-5xl md:text-6xl text-[#D88CA0]">{RECIPIENT_NAME}</span> ♡
          </h2>

          <p className="mt-2 text-base text-[#573B46]/75 font-light">
            Kuch alfaaz dil se… sirf tumhare liye.
          </p>
        </div>

        {/* Central Poetry Card */}
        <div className="relative">
          {/* Subtle decorative stamp / corner accent */}
          <div className="absolute -top-3 -right-2 text-2xl select-none opacity-80 z-10">
            {currentShayari.emoji}
          </div>

          <div
            key={replayKey}
            className="w-full paper-texture rounded-3xl border border-[#F8C8DC] shadow-xl p-8 sm:p-12 md:p-14 relative overflow-hidden transition-all duration-500"
          >
            {/* Top Card Unboxed Metadata (Zero-Pill discipline) */}
            <div className="flex items-center justify-between text-xs text-[#573B46]/70 mb-8 border-b border-[#F8C8DC]/40 pb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono tabular-nums font-medium text-[#D88CA0]">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(SHAYARI_LIST.length).padStart(2, '0')}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-medium text-[#573B46]">{currentShayari.title}</span>
              </div>
              <div className="text-xs font-serif-romantic italic text-[#D88CA0]">
                {currentShayari.theme}
              </div>
            </div>

            {/* Shayari Lines with Gentle Animation */}
            <div className="text-center py-4 sm:py-6">
              <div className="space-y-4 sm:space-y-5">
                {currentShayari.lines.map((line, idx) => (
                  <p
                    key={`${replayKey}-${idx}`}
                    style={{
                      animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.18}s both`,
                    }}
                    className={`font-serif-romantic text-xl sm:text-2xl md:text-3xl leading-relaxed text-[#573B46] ${
                      line === '' ? 'h-4' : ''
                    } ${
                      line.startsWith('In English') ? 'text-lg sm:text-xl italic text-[#573B46]/80' : ''
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* Decorative small heart divider */}
              <div className="flex items-center justify-center gap-3 my-8 opacity-70">
                <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D88CA0]" />
                <Heart className="w-4 h-4 text-[#D88CA0] fill-[#F8C8DC]" />
                <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D88CA0]" />
              </div>

              {/* Gentle Reflection Note */}
              {currentShayari.note && (
                <p className="text-xs sm:text-sm text-[#573B46]/70 italic font-light max-w-md mx-auto">
                  “{currentShayari.note}”
                </p>
              )}
            </div>

            {/* Bottom Card Controls */}
            <div className="mt-8 pt-6 border-t border-[#F8C8DC]/40 flex flex-wrap items-center justify-between gap-4">
              {/* Left: Replay & Heart React */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReplay}
                  title="Read Again"
                  className="px-3.5 py-2 rounded-xl text-xs font-medium text-[#573B46] hover:bg-[#FCE4EC]/50 border border-[#F8C8DC]/60 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#D88CA0]" />
                  <span>Read Again ↻</span>
                </button>

                <button
                  onClick={handleHeartClick}
                  title="Send a heart to this shayari"
                  className="px-3.5 py-2 rounded-xl text-xs font-medium text-[#D88CA0] bg-[#FFF9F5] hover:bg-[#FCE4EC] border border-[#F8C8DC] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                >
                  <Heart className="w-3.5 h-3.5 fill-[#D88CA0] text-[#D88CA0]" />
                  <span className="font-mono tabular-nums text-xs text-[#573B46]">
                    {likes[currentIndex] || 0}
                  </span>
                </button>
              </div>

              {/* Right: Previous / Next Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium border border-[#F8C8DC]/60 transition-all flex items-center gap-1 ${
                    currentIndex === 0
                      ? 'opacity-40 cursor-not-allowed text-[#573B46]/40'
                      : 'text-[#573B46] hover:bg-[#FCE4EC]/50 cursor-pointer'
                  }`}
                  aria-label="Previous shayari"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Pichhli</span>
                </button>

                {!isLast ? (
                  <button
                    onClick={handleNext}
                    className="px-5 py-2 rounded-xl text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-[#D88CA0] to-[#573B46] hover:opacity-95 shadow-md shadow-[#D88CA0]/20 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next Shayari ♡</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={onNextSection}
                    className="px-5 py-2 rounded-xl text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-[#D88CA0] to-[#573B46] hover:opacity-95 shadow-md shadow-[#D88CA0]/20 transition-all flex items-center gap-1.5 cursor-pointer animate-pulse"
                  >
                    <span>Ek Aur Surprise? 💌</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* After-last message banner when completed */}
          {isLast && (
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#FCE4EC] to-[#FFF9F5] border border-[#F8C8DC] text-center shadow-sm">
              <p className="font-serif-romantic text-lg sm:text-xl text-[#573B46] mb-3">
                “Aur bhi bahut kuch hai jo tumhare liye likhna hai… ♡”
              </p>
              <button
                onClick={onNextSection}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-[#D88CA0] to-[#573B46] hover:shadow-md transition-all cursor-pointer"
              >
                <span>Chalo, Agla Surprise Dekho 💌</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};
