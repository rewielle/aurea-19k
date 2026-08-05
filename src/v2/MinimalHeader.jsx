import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function MinimalHeader({ onOpenModal, darkTheme = false }) {
  return (
    <header
      className={`absolute top-0 left-0 right-0 z-50 h-24 px-8 sm:px-16 flex items-center justify-between transition-colors duration-500 ${
        darkTheme ? 'text-[#FAF7F1]' : 'text-[#312E2A]'
      }`}
    >
      {/* Left: Proprietary Wordmark */}
      <div className="relative group cursor-pointer">
        <span className="font-display text-2xl sm:text-3xl tracking-[0.35em] uppercase font-light pl-1">
          A U R E A
        </span>
        <div className="absolute top-[52%] left-0 w-full h-[1px] bg-[#D6A03B] opacity-70 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Center/Right: Minimal Nav Links */}
      <nav className="hidden md:flex items-center gap-10">
        {['Residences', 'Architecture', 'Experience'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-xs font-mono tracking-[0.25em] uppercase opacity-75 hover:opacity-100 hover:text-[#D6A03B] transition-all relative py-1 group"
          >
            {item}
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D6A03B] transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </nav>

      {/* Right Action: Clean Editorial CTA */}
      <button
        onClick={onOpenModal}
        className={`hidden sm:inline-flex items-center gap-3 text-xs font-mono tracking-[0.25em] uppercase border-b pb-1 transition-all ${
          darkTheme
            ? 'border-white/30 hover:border-[#D6A03B] hover:text-[#D6A03B]'
            : 'border-[#312E2A]/30 hover:border-[#D6A03B] hover:text-[#D6A03B]'
        }`}
      >
        <span>Private Presentation</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </header>
  );
}
