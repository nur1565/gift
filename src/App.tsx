import React, { useState } from 'react';
import { FloatingParticles } from './components/FloatingParticles';
import { OpeningEnvelope } from './components/OpeningEnvelope';
import { Navbar } from './components/Navbar';
import { ShayariSection } from './components/ShayariSection';
import { PolaroidGallery } from './components/PolaroidGallery';
import { HiddenMessages } from './components/HiddenMessages';
import { FinalSurprise } from './components/FinalSurprise';
import { Footer } from './components/Footer';
import { MusicPlayer } from './components/MusicPlayer';
import { PublishingModal } from './components/PublishingModal';
import { romanticSynthesizer } from './utils/audioPlayer';
import { RECIPIENT_NAME, SENDER_NAME } from './data/romanticContent';
import { Heart, Sparkles, MailOpen } from 'lucide-react';

export default function App() {
  const [showOpeningScreen, setShowOpeningScreen] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showPublishingGuide, setShowPublishingGuide] = useState(false);

  const handleOpenSurprise = () => {
    setShowOpeningScreen(false);
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleMusic = () => {
    const newState = romanticSynthesizer.toggle();
    setIsMusicPlaying(newState);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="top" className="min-h-screen bg-[#FFF9F5] text-[#573B46] relative overflow-x-hidden selection:bg-[#F8C8DC] selection:text-[#573B46]">
      {/* Ambient background particles (hearts, petals, sparkles) */}
      <FloatingParticles />

      {/* Opening Screen Envelope Modal (Active on initial entry) */}
      {showOpeningScreen && (
        <OpeningEnvelope onOpen={handleOpenSurprise} />
      )}

      {/* Main Experience */}
      <div className={`transition-opacity duration-1000 ${showOpeningScreen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {/* Navigation Bar */}
        <Navbar
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
        />

        {/* Hero Introduction Banner */}
        <section className="relative pt-12 pb-10 sm:pt-20 sm:pb-16 px-4 text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            {/* Subtle romantic label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCE4EC] text-[#D88CA0] text-xs font-medium mb-4">
              <Sparkles className="w-3 h-3" />
              <span>Dedicated with endless love to {RECIPIENT_NAME}</span>
              <Sparkles className="w-3 h-3" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif-romantic text-[#573B46] tracking-tight leading-tight">
              A Little World For <span className="font-cursive text-5xl sm:text-6xl md:text-7xl text-[#D88CA0]">{RECIPIENT_NAME}</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#573B46]/80 font-light max-w-xl leading-relaxed">
              Kahaaniyan toh sab likhte hain, par mere har lafz ki shuruaat aur manzil sirf tum ho.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => scrollToSection('shayari-section')}
                className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-[#D88CA0] to-[#573B46] shadow-md shadow-[#D88CA0]/30 hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Padho Meri Shayari ♡</span>
              </button>

              <button
                onClick={() => setShowOpeningScreen(true)}
                title="Reopen greeting envelope"
                className="px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium text-[#573B46] bg-white border border-[#F8C8DC] hover:bg-[#FCE4EC]/30 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <MailOpen className="w-3.5 h-3.5 text-[#D88CA0]" />
                <span>Kholo Phir Se 💌</span>
              </button>
            </div>
          </div>
        </section>

        {/* Section 3 & 4: Interactive Shayari Section */}
        <ShayariSection onNextSection={() => scrollToSection('memories-section')} />

        {/* Section 5: Our Little Memories Polaroid Gallery */}
        <PolaroidGallery />

        {/* Section 6: Hidden Messages Envelopes */}
        <HiddenMessages />

        {/* Section 7: The Final Surprise Night Sky */}
        <FinalSurprise />

        {/* Footer */}
        <Footer onOpenGuide={() => setShowPublishingGuide(true)} />

        {/* Floating Background Music Player */}
        <MusicPlayer
          isPlaying={isMusicPlaying}
          onToggle={handleToggleMusic}
        />

        {/* Publishing & Personalization Instructions Modal for Vivek */}
        <PublishingModal
          isOpen={showPublishingGuide}
          onClose={() => setShowPublishingGuide(false)}
        />
      </div>
    </div>
  );
}
