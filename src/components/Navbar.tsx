import React from 'react';
import { Volume2, VolumeX, Heart, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NavbarProps {
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isMusicPlaying, onToggleMusic }) => {
  const triggerHeartBurst = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { x, y },
      colors: ['#F8C8DC', '#D88CA0', '#573B46'],
      scalar: 1,
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full romantic-glass border-b border-[#F8C8DC]/50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="text-lg sm:text-xl font-serif-romantic font-semibold tracking-wide text-[#573B46] hover:text-[#D88CA0] transition-colors whitespace-nowrap"
        >
          Sushmita ♡ Vivek
        </a>

        {/* Zone 2: 4 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#573B46]/85">
          <a
            href="#shayari-section"
            className="hover:text-[#D88CA0] hover:underline underline-offset-8 transition-colors whitespace-nowrap"
          >
            Shayari
          </a>
          <a
            href="#memories-section"
            className="hover:text-[#D88CA0] hover:underline underline-offset-8 transition-colors whitespace-nowrap"
          >
            Yaadein
          </a>
          <a
            href="#letters-section"
            className="hover:text-[#D88CA0] hover:underline underline-offset-8 transition-colors whitespace-nowrap"
          >
            Chithiyan
          </a>
          <a
            href="#final-surprise-section"
            className="hover:text-[#D88CA0] hover:underline underline-offset-8 transition-colors whitespace-nowrap"
          >
            Aakhri Baat
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions + Download HTML */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Download Standalone Single HTML File */}
          <a
            href="/for-sushmita.html"
            download="A_Little_World_For_Sushmita.html"
            title="Download pure single-file HTML version"
            className="px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium text-[#573B46] bg-white/80 border border-[#F8C8DC] hover:border-[#D88CA0] hover:bg-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 text-[#D88CA0]" />
            <span className="hidden sm:inline">Get .html</span>
          </a>

          {/* Music Play/Pause Toggle */}
          <button
            onClick={onToggleMusic}
            title={isMusicPlaying ? 'Pause Romantic Music' : 'Play Romantic Music'}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-[#573B46] bg-white/80 border border-[#F8C8DC] hover:border-[#D88CA0] hover:bg-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            aria-label={isMusicPlaying ? 'Pause music' : 'Play music'}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#D88CA0]" />
                <span className="hidden sm:inline">Music: On</span>
                <span className="flex items-end gap-0.5 h-3 ml-0.5">
                  <span className="w-0.5 h-2 bg-[#D88CA0] animate-pulse" />
                  <span className="w-0.5 h-3 bg-[#D88CA0] animate-bounce" />
                  <span className="w-0.5 h-1.5 bg-[#D88CA0] animate-pulse" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#573B46]/60" />
                <span className="hidden sm:inline">Music: Off</span>
              </>
            )}
          </button>

          {/* Quick Love Reaction Button */}
          <button
            onClick={triggerHeartBurst}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-white bg-gradient-to-r from-[#D88CA0] to-[#573B46] hover:opacity-95 active:scale-95 transition-all shadow-xs flex items-center gap-1 cursor-pointer whitespace-nowrap"
            aria-label="Send love"
          >
            <Heart className="w-3.5 h-3.5 fill-white text-white" />
            <span className="hidden sm:inline">Love</span>
          </button>
        </div>
      </div>
    </header>
  );
};
