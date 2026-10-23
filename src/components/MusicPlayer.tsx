import React from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, onToggle }) => {
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={onToggle}
        className={`group px-3.5 py-2.5 rounded-full shadow-lg border transition-all duration-300 flex items-center gap-2 cursor-pointer ${
          isPlaying
            ? 'bg-gradient-to-r from-[#D88CA0] to-[#573B46] text-white border-transparent shadow-[#D88CA0]/30'
            : 'bg-[#FFFDF9]/95 text-[#573B46] border-[#F8C8DC] hover:border-[#D88CA0] shadow-sm'
        }`}
        aria-label={isPlaying ? 'Pause background music' : 'Play romantic background music'}
        title={isPlaying ? 'Pause music' : 'Play romantic instrumental music'}
      >
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <>
              <Music className="w-4 h-4 animate-bounce" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-pink-300 animate-ping" />
            </>
          ) : (
            <VolumeX className="w-4 h-4 text-[#573B46]/70" />
          )}
        </div>

        <span className="text-xs font-medium tracking-wide">
          {isPlaying ? 'Romantic Melody' : 'Play Music 🎶'}
        </span>

        {/* Small soundwave visualizer when active */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3">
            <span className="w-0.5 h-2 bg-white/90 animate-pulse" />
            <span className="w-0.5 h-3 bg-white/90 animate-bounce" />
            <span className="w-0.5 h-1.5 bg-white/90 animate-pulse" />
          </div>
        )}
      </button>
    </div>
  );
};
