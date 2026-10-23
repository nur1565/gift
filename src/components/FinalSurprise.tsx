import React, { useState, useEffect } from 'react';
import { Heart, Moon, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FINAL_SURPRISE, RECIPIENT_NAME, SENDER_NAME } from '../data/romanticContent';

export const FinalSurprise: React.FC = () => {
  const [revealedNote, setRevealedNote] = useState(false);
  const [hugSent, setHugSent] = useState(false);

  useEffect(() => {
    // Auto-reveal the personal note after a short delay
    const timer = setTimeout(() => {
      setRevealedNote(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const handleSendHug = (e: React.MouseEvent) => {
    setHugSent(true);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 60,
      spread: 80,
      origin: { x, y },
      colors: ['#F8C8DC', '#D88CA0', '#FFFFFF', '#FCE4EC'],
      scalar: 1.2,
    });
  };

  return (
    <section
      id="final-surprise-section"
      className="relative min-h-[90vh] py-24 sm:py-32 px-4 sm:px-6 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#2B1B26] via-[#1E121B] to-[#120B10] text-[#FFF9F5]"
    >
      {/* Night Sky Stars & Nebulae */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft pink nebulous glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#D88CA0]/15 to-[#F8C8DC]/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-[#D88CA0]/10 blur-[100px]" />

        {/* Twinkling Star Points */}
        {Array.from({ length: 32 }).map((_, i) => (
          <span
            key={i}
            className="absolute block rounded-full bg-white animate-twinkle"
            style={{
              top: `${(i * 17) % 100}%`,
              left: `${(i * 23) % 100}%`,
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              animationDelay: `${(i * 0.4) % 3}s`,
              opacity: 0.3 + (i % 5) * 0.15,
            }}
          />
        ))}
      </div>

      {/* Main Celestial Card Container */}
      <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center">
        {/* Soft Pink Moon Graphic */}
        <div className="relative mb-8 group">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#FFF0F5] via-[#F8C8DC] to-[#D88CA0] shadow-[0_0_50px_rgba(248,200,220,0.6)] flex items-center justify-center relative overflow-hidden transition-transform duration-700 group-hover:scale-105">
            {/* Moon subtle texture spots */}
            <span className="absolute top-3 left-5 w-4 h-4 rounded-full bg-[#D88CA0]/30 blur-[1px]" />
            <span className="absolute bottom-5 right-6 w-7 h-7 rounded-full bg-[#D88CA0]/25 blur-[1.5px]" />
            <span className="absolute top-10 right-4 w-3 h-3 rounded-full bg-[#D88CA0]/20 blur-[1px]" />

            {/* Glowing moon crest icon */}
            <Moon className="w-8 h-8 text-[#573B46]/30 fill-[#573B46]/10 transform -rotate-12" />
          </div>

          {/* Floating tiny sparkles around moon */}
          <Sparkles className="absolute -top-1 -right-2 w-5 h-5 text-[#F8C8DC] animate-pulse" />
          <span className="absolute bottom-0 -left-3 text-xs text-[#F8C8DC] animate-float-slow">♡</span>
        </div>

        {/* Section Heading */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-widest text-[#F8C8DC]/80 font-medium block mb-2">
            The Last Promise
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-romantic font-normal text-white tracking-tight">
            {FINAL_SURPRISE.header}
          </h2>
        </div>

        {/* The Final Shayari */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-[#F8C8DC]/20 max-w-xl w-full shadow-2xl relative">
          <div className="space-y-4 font-serif-romantic text-xl sm:text-2xl text-[#FFF9F5] leading-relaxed">
            {FINAL_SURPRISE.shayari.map((line, i) => (
              <p key={i} className="tracking-wide">
                {line}
              </p>
            ))}
          </div>

          {/* Soft divider */}
          <div className="flex items-center justify-center gap-3 my-8 opacity-60">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#F8C8DC]" />
            <Heart className="w-3.5 h-3.5 text-[#F8C8DC] fill-[#F8C8DC]" />
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#F8C8DC]" />
          </div>

          {/* Sincere Personal Note (Revealed) */}
          <div
            className={`transition-all duration-1000 ${
              revealedNote ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-sm sm:text-base text-[#FCE4EC]/90 font-light leading-relaxed max-w-lg mx-auto mb-6">
              “{FINAL_SURPRISE.personalNote}”
            </p>

            {/* Signature */}
            <p className="font-serif-romantic italic text-xl sm:text-2xl text-[#F8C8DC]">
              {FINAL_SURPRISE.signature}
            </p>
          </div>
        </div>

        {/* Glowing Heart at the Bottom */}
        <div className="mt-12 flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#D88CA0] blur-xl opacity-80 animate-pulse-subtle" />
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-[#D88CA0] to-[#F8C8DC] flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white fill-white animate-pulse" />
            </div>
          </div>

          {/* Interactive "Send a hug back to Vivek" action */}
          <div className="mt-6">
            {!hugSent ? (
              <button
                onClick={handleSendHug}
                className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium text-[#573B46] bg-[#FFFDF9] hover:bg-[#FCE4EC] transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Heart className="w-3.5 h-3.5 fill-[#D88CA0] text-[#D88CA0]" />
                <span>Send a tight hug back to Vivek ♡</span>
              </button>
            ) : (
              <div className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium text-[#FFF9F5] bg-white/10 border border-[#F8C8DC]/30 flex items-center gap-2 animate-fadeIn">
                <Sparkles className="w-3.5 h-3.5 text-[#F8C8DC]" />
                <span>Hug received! Vivek loves you so much, {RECIPIENT_NAME}. 💗</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
