import React from 'react';
import { Heart, ArrowUp, BookOpen, Download } from 'lucide-react';
import { RECIPIENT_NAME, SENDER_NAME } from '../data/romanticContent';

interface FooterProps {
  onOpenGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGuide }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FFFDF9] border-t border-[#F8C8DC]/60 py-12 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Brand / Dedication */}
        <div className="text-center sm:text-left">
          <p className="font-serif-romantic text-lg sm:text-xl text-[#573B46] flex items-center justify-center sm:justify-start gap-1.5">
            <span>A Little World For {RECIPIENT_NAME}</span>
            <Heart className="w-4 h-4 text-[#D88CA0] fill-[#F8C8DC]" />
          </p>
          <p className="text-xs text-[#573B46]/60 mt-1">
            Made with endless love by {SENDER_NAME} ♡
          </p>
        </div>

        {/* Center: Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="/for-sushmita.html"
            download="A_Little_World_For_Sushmita.html"
            className="text-xs text-[#573B46]/90 hover:text-[#D88CA0] border border-[#F8C8DC] px-4 py-2 rounded-full hover:bg-[#FCE4EC]/30 transition-all flex items-center gap-1.5 cursor-pointer bg-white"
          >
            <Download className="w-3.5 h-3.5 text-[#D88CA0]" />
            <span>Download Standalone .html</span>
          </a>

          <button
            onClick={onOpenGuide}
            className="text-xs text-[#573B46]/80 hover:text-[#D88CA0] border border-[#F8C8DC] px-4 py-2 rounded-full hover:bg-[#FCE4EC]/30 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#D88CA0]" />
            <span>Publishing & Photo Guide</span>
          </button>
        </div>

        {/* Right: Back to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 text-xs text-[#573B46]/70 hover:text-[#D88CA0] transition-colors cursor-pointer"
          aria-label="Back to top"
        >
          <span>Wapas Upar</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
