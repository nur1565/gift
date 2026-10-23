import React from 'react';
import { X, Globe, Smartphone, Terminal, Heart, Copy, Check, FileCode, Download } from 'lucide-react';

interface PublishingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PublishingModal: React.FC<PublishingModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  if (!isOpen) return null;

  const copyText = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#573B46]/75 backdrop-blur-xs flex items-center justify-center p-4 transition-all"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 border border-[#F8C8DC] shadow-2xl text-[#573B46]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#573B46]/10 hover:bg-[#573B46]/20 flex items-center justify-center transition-colors"
          aria-label="Close guide"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 mb-2 text-[#D88CA0] font-medium text-xs uppercase tracking-wider">
          <Heart className="w-4 h-4 fill-[#D88CA0]" />
          <span>Guide for Vivek</span>
        </div>
        <h3 className="font-serif-romantic text-2xl sm:text-3xl text-[#573B46] mb-4">
          HTML-Based File & Publishing Guide
        </h3>

        <div className="space-y-5 text-xs sm:text-sm text-[#573B46]/85">
          {/* Highlight: Single HTML File Ready */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#FCE4EC] to-[#FFF9F5] border-2 border-[#D88CA0]/40 shadow-xs">
            <h4 className="font-semibold text-sm text-[#573B46] flex items-center gap-2 mb-2">
              <FileCode className="w-4 h-4 text-[#D88CA0]" />
              <span>Single-File HTML Version Ready! 📄</span>
            </h4>
            <p className="text-[#573B46]/85 mb-3 leading-relaxed">
              A complete, standalone <strong>.html</strong> file has been created. It contains all HTML, CSS, romantic animations, shayaris, audio synthesizer, and embedded photos in a single portable file:
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/for-sushmita.html"
                download="A_Little_World_For_Sushmita.html"
                className="px-4 py-2 rounded-full bg-[#573B46] hover:bg-[#D88CA0] text-white text-xs font-medium transition-colors flex items-center gap-2 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download A_Little_World_For_Sushmita.html</span>
              </a>
              <a
                href="/for-sushmita.html"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#D88CA0] hover:text-[#573B46] underline font-medium"
              >
                Open /for-sushmita.html in new tab ↗
              </a>
            </div>
            <p className="text-[11px] text-[#573B46]/70 mt-2">
              💡 You can literally double-click this <code>.html</code> file on any computer or phone to open it directly in Chrome or Safari without any server!
            </p>
          </div>

          {/* Step 1: Run locally */}
          <div className="p-4 rounded-xl bg-white border border-[#F8C8DC]">
            <h4 className="font-semibold text-sm text-[#573B46] flex items-center gap-2 mb-1.5">
              <Terminal className="w-4 h-4 text-[#D88CA0]" />
              <span>1. How to Run Locally</span>
            </h4>
            <p className="mb-2 text-[#573B46]/80">
              Open your terminal in the project folder and run:
            </p>
            <div className="flex items-center justify-between bg-[#FFF9F5] p-2.5 rounded-lg border border-[#F8C8DC] font-mono text-xs">
              <code>npm install && npm run dev</code>
              <button
                onClick={() => copyText('npm install && npm run dev', 1)}
                className="text-[#D88CA0] hover:text-[#573B46] p-1"
                title="Copy command"
              >
                {copiedIndex === 1 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Step 2: Preview on phone */}
          <div className="p-4 rounded-xl bg-white border border-[#F8C8DC]">
            <h4 className="font-semibold text-sm text-[#573B46] flex items-center gap-2 mb-1.5">
              <Smartphone className="w-4 h-4 text-[#D88CA0]" />
              <span>2. How to Preview on Your Phone</span>
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-[#573B46]/80">
              <li>
                Option A: Connect phone to same Wi-Fi, run <code>npm run dev -- --host</code>, and open the displayed Network URL.
              </li>
              <li>
                Option B: Simply WhatsApp or AirDrop the <code>A_Little_World_For_Sushmita.html</code> file to your phone and open it directly in Safari/Chrome!
              </li>
            </ul>
          </div>

          {/* Step 3: Free GitHub Pages / Vercel Deployment */}
          <div className="p-4 rounded-xl bg-white border border-[#F8C8DC]">
            <h4 className="font-semibold text-sm text-[#573B46] flex items-center gap-2 mb-1.5">
              <Globe className="w-4 h-4 text-[#D88CA0]" />
              <span>3. How to Publish for Free (GitHub Pages / Netlify / Vercel)</span>
            </h4>
            <div className="space-y-2 text-[#573B46]/80">
              <p>
                <strong>Easiest (Netlify Drop / Vercel):</strong> Simply drag-and-drop the <code>A_Little_World_For_Sushmita.html</code> file onto <span className="font-mono text-xs text-[#D88CA0]">app.netlify.com/drop</span> or import your repo into Vercel for an instant live link (e.g. <code>sushmita.vercel.app</code>).
              </p>
              <p>
                <strong>GitHub Pages:</strong> Push the repo to GitHub, rename <code>A_Little_World_For_Sushmita.html</code> to <code>index.html</code> (or deploy the <code>dist</code> folder), and enable GitHub Pages in Settings!
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#F8C8DC] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#573B46] hover:bg-[#D88CA0] text-white text-xs font-medium transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
