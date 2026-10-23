import React, { useState } from 'react';
import { Mail, Heart, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { HIDDEN_MESSAGES } from '../data/romanticContent';
import { HiddenMessageItem } from '../types';

export const HiddenMessages: React.FC = () => {
  const [activeMessage, setActiveMessage] = useState<HiddenMessageItem | null>(null);
  const [openedEnvelopes, setOpenedEnvelopes] = useState<{ [key: string]: boolean }>({});

  const handleOpenEnvelope = (msg: HiddenMessageItem, e: React.MouseEvent) => {
    setActiveMessage(msg);
    setOpenedEnvelopes((prev) => ({ ...prev, [msg.id]: true }));

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { x, y },
      colors: ['#F8C8DC', '#D88CA0', '#FFF9F5', '#573B46'],
      scalar: 1,
    });
  };

  return (
    <section id="letters-section" className="py-20 sm:py-28 px-4 sm:px-6 relative bg-gradient-to-b from-transparent via-[#FCE4EC]/30 to-transparent">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#D88CA0] mb-2 font-medium">
            <Mail className="w-3.5 h-3.5 text-[#D88CA0]" />
            <span>Private Notes</span>
            <Mail className="w-3.5 h-3.5 text-[#D88CA0]" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-romantic font-normal text-[#573B46] tracking-tight">
            Kuch Baatein Sirf Tumhare Liye…
          </h2>

          <p className="mt-2 text-sm sm:text-base text-[#573B46]/75 font-light max-w-md mx-auto">
            Jab bhi dil chahe, in lifafon ko khol kar dekh lena. Ye alfaaz hamesha tumhare hain.
          </p>
        </div>

        {/* 3 Interactive Envelopes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {HIDDEN_MESSAGES.map((msg, index) => {
            const isRead = openedEnvelopes[msg.id];
            return (
              <div
                key={msg.id}
                onClick={(e) => handleOpenEnvelope(msg, e)}
                role="button"
                tabIndex={0}
                aria-label={`Open letter: ${msg.envelopeTitle}`}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenEnvelope(msg, e as unknown as React.MouseEvent)}
                className={`relative group bg-[#FFFDF9] rounded-2xl border border-[#F8C8DC] p-6 sm:p-7 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden paper-texture ${
                  index === 1 ? 'md:-translate-y-2' : ''
                }`}
              >
                {/* Envelope flap triangle graphic */}
                <div
                  className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#FCE4EC] to-[#F8C8DC]/40 border-b border-[#D88CA0]/30 transition-transform duration-300 origin-top group-hover:-rotate-6"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  }}
                />

                {/* Top Stamp Indicator */}
                <div className="relative z-10 flex items-center justify-between mb-8">
                  <span className="text-xs font-mono text-[#D88CA0] font-medium tracking-wider">
                    Chithi {index + 1}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white border border-[#F8C8DC] shadow-xs flex items-center justify-center text-sm">
                    {msg.stampEmoji}
                  </div>
                </div>

                {/* Envelope Title */}
                <div className="relative z-10 text-center py-4 my-auto">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#FCE4EC] flex items-center justify-center text-[#D88CA0] mb-3 group-hover:scale-110 transition-transform">
                    <Heart className="w-5 h-5 fill-[#D88CA0]" />
                  </div>
                  <h3 className="font-serif-romantic text-xl sm:text-2xl text-[#573B46] font-medium leading-snug">
                    {msg.envelopeTitle}
                  </h3>
                </div>

                {/* Bottom Action Hint */}
                <div className="relative z-10 mt-6 pt-4 border-t border-[#F8C8DC]/50 flex items-center justify-between text-xs text-[#573B46]/70">
                  <span className="italic font-serif-romantic">
                    {isRead ? 'Already opened ♡' : 'Tap to unfold note'}
                  </span>
                  <span className="text-[#D88CA0] group-hover:translate-x-1 transition-transform font-medium">
                    Open →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Unfolded Letter */}
        {activeMessage && (
          <div
            className="fixed inset-0 z-50 bg-[#573B46]/75 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300"
            onClick={() => setActiveMessage(null)}
          >
            <div
              className="relative max-w-lg w-full bg-[#FFFDF9] rounded-3xl p-7 sm:p-10 border border-[#F8C8DC] shadow-2xl paper-texture overflow-hidden transform animate-fadeIn"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Wax Seal Ribbon */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gradient-to-b from-[#D88CA0] to-[#F8C8DC] rounded-b-md shadow-xs" />

              {/* Close Button */}
              <button
                onClick={() => setActiveMessage(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#573B46]/10 hover:bg-[#573B46]/20 text-[#573B46] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close letter"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Letter Header */}
              <div className="mb-6 pb-4 border-b border-[#F8C8DC]/60">
                <div className="flex items-center gap-1.5 text-xs text-[#D88CA0] font-medium mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{activeMessage.envelopeTitle}</span>
                </div>
                <h4 className="font-serif-romantic text-2xl text-[#573B46] italic">
                  {activeMessage.greeting}
                </h4>
              </div>

              {/* Letter Body Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-[#573B46]/85 font-light leading-relaxed">
                {activeMessage.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Signoff */}
              <div className="mt-8 pt-6 border-t border-[#F8C8DC]/60 flex items-center justify-between">
                <p className="font-serif-romantic italic text-base sm:text-lg text-[#D88CA0]">
                  {activeMessage.signoff}
                </p>
                <button
                  onClick={() => setActiveMessage(null)}
                  className="px-4 py-1.5 rounded-full bg-[#573B46] hover:bg-[#D88CA0] text-white text-xs font-medium transition-colors"
                >
                  Fold Letter ♡
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
