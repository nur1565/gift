import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';
import { RECIPIENT_NAME, SENDER_NAME } from '../data/romanticContent';

interface OpeningEnvelopeProps {
  onOpen: () => void;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    // Heart and sparkle confetti burst
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F8C8DC', '#D88CA0', '#FCE4EC', '#FFFFFF', '#573B46'],
        shapes: ['circle'],
        scalar: 1.2,
      });
    } catch {
      // Ignore if canvas-confetti is unsupported
    }

    setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => {
        onOpen();
      }, 750);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFF9F5]/95 backdrop-blur-md px-4 transition-all duration-700">
      {/* Decorative ambient background rings */}
      <div className="absolute w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-tr from-[#F8C8DC]/30 to-[#FCE4EC]/40 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md w-full flex flex-col items-center text-center">
        {/* Soft tag above */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D88CA0] mb-3 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#D88CA0]" />
          <span>A Secret Digital Gift</span>
          <Sparkles className="w-3.5 h-3.5 text-[#D88CA0]" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-romantic font-normal text-[#573B46] tracking-tight mb-2">
          For my <span className="font-cursive text-4xl sm:text-5xl md:text-6xl text-[#D88CA0]">{RECIPIENT_NAME}</span> ♡
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#573B46]/80 font-light max-w-xs sm:max-w-sm mb-8 leading-relaxed">
          “Tumhare liye kuch alfaaz… jo shayad dil ki baat keh dein. ❤️”
        </p>

        {/* Interactive Envelope Graphic */}
        <div
          onClick={handleOpenClick}
          className="relative w-64 sm:w-72 h-44 sm:h-48 cursor-pointer group transition-transform duration-300 hover:scale-105 active:scale-98"
          role="button"
          tabIndex={0}
          aria-label="Open your surprise envelope"
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenClick()}
        >
          {/* Envelope shadow */}
          <div className="absolute inset-0 bg-[#573B46]/10 rounded-2xl filter blur-xl transform translate-y-3" />

          {/* Envelope body container */}
          <div className="relative w-full h-full bg-[#FFFDF9] border border-[#F8C8DC] rounded-2xl shadow-lg overflow-hidden flex items-center justify-center paper-texture">
            {/* Flap lines */}
            <div
              className={`absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-[#FCE4EC] to-[#F8C8DC] border-b border-[#D88CA0]/40 transition-transform duration-700 origin-top flex items-end justify-center ${
                isOpening ? '-rotate-180 opacity-40' : 'group-hover:-translate-y-0.5'
              }`}
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
            >
              {/* Wax Seal with Heart */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D88CA0] to-[#F8C8DC] shadow-md flex items-center justify-center transform translate-y-5 border-2 border-white/80">
                <Heart className="w-4 h-4 text-white fill-white animate-pulse" />
              </div>
            </div>

            {/* Letter peek when opening */}
            <div
              className={`absolute inset-x-4 bg-white rounded-lg shadow-sm border border-[#F8C8DC]/60 p-4 transition-all duration-700 flex flex-col items-center justify-center ${
                isOpening ? '-translate-y-12 opacity-100' : 'translate-y-4 opacity-75'
              }`}
            >
              <div className="w-16 h-1 bg-[#F8C8DC] rounded-full mb-1.5" />
              <div className="w-24 h-1 bg-[#FCE4EC] rounded-full mb-1.5" />
              <p className="text-[11px] font-serif-romantic italic text-[#573B46]">
                With endless love…
              </p>
            </div>

            {/* Bottom folds */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)',
                background: 'linear-gradient(to top, #FCE4EC, #FFF9F5)',
                borderTop: '1px solid rgba(216, 140, 160, 0.2)',
              }}
            />
          </div>

          {/* Floating tiny ambient hearts around envelope */}
          <span className="absolute -top-2 -left-2 text-sm animate-bounce text-[#D88CA0]">♡</span>
          <span className="absolute -bottom-1 -right-2 text-base animate-pulse text-[#D88CA0]">💗</span>
          <span className="absolute top-1/2 -right-4 text-xs animate-float-slow text-[#D88CA0]">✨</span>
        </div>

        {/* Glowing Button */}
        <button
          onClick={handleOpenClick}
          disabled={isOpening}
          className="mt-8 px-7 py-3 rounded-full bg-gradient-to-r from-[#D88CA0] to-[#573B46] text-white font-medium text-sm sm:text-base tracking-wide shadow-lg shadow-[#D88CA0]/30 hover:shadow-xl hover:shadow-[#D88CA0]/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D88CA0] focus-visible:outline-none"
        >
          <Heart className="w-4 h-4 fill-white" />
          <span>Open Your Surprise 💗</span>
        </button>

        {/* Subtle Signature */}
        <p className="mt-6 text-xs text-[#573B46]/60 font-serif-romantic tracking-wide">
          Made with love by {SENDER_NAME} ♡
        </p>
      </div>
    </div>
  );
};
