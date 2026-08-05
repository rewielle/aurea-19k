import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function NightFooterSection({ onOpenModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#162129] text-[#FAF7F1] pt-24 pb-12 overflow-hidden border-t border-[#AD8557]/30">
      
      {/* Background Deep Ocean Night Atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none filter brightness-75"
        style={{ backgroundImage: `url('/assets/building_night.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#162129] via-[#162129]/90 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-16">
        
        {/* Full Solar Cycle Conclusion Banner */}
        <div className="text-center py-16 border-b border-white/10 space-y-6">
          
          {/* Monumental Wordmark with Horizon Crossbar */}
          <div className="relative inline-block my-4">
            <span className="font-display text-5xl sm:text-7xl tracking-[0.4em] uppercase font-light pl-2 text-white">
              A U R E A
            </span>
            <div className="absolute top-[52%] left-0 w-full h-[1.5px] bg-[#D6A03B] opacity-80" />
          </div>

          <p className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-[#D6A03B]">
            A DAY ABOVE THE HORIZON
          </p>

          <p className="text-sm text-white/70 font-light max-w-md mx-auto leading-relaxed">
            Architecture shaped by light, sea and perspective. Completing a full solar trajectory from sunrise to ocean night.
          </p>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 font-mono text-xs text-white/80 border-b border-white/10">
          <div>
            <span className="text-[10px] text-[#D6A03B] uppercase tracking-widest block mb-4 font-bold">NAVIGATION</span>
            <ul className="space-y-2.5 font-light">
              <li><a href="#concept" className="hover:text-[#D6A03B] transition-colors">The Concept</a></li>
              <li><a href="#materials" className="hover:text-[#D6A03B] transition-colors">Material Language</a></li>
              <li><a href="#exploded" className="hover:text-[#D6A03B] transition-colors">Exploded Architecture</a></li>
              <li><a href="#exterior-interior" className="hover:text-[#D6A03B] transition-colors">Exterior → Interior</a></li>
            </ul>
          </div>

          <div>
            <span className="text-[10px] text-[#D6A03B] uppercase tracking-widest block mb-4 font-bold">RESIDENCES</span>
            <ul className="space-y-2.5 font-light">
              <li><a href="#floor-selector" className="hover:text-[#D6A03B] transition-colors">Perspective Floor Selector</a></li>
              <li><a href="#residences" className="hover:text-[#D6A03B] transition-colors">Horizon Residences</a></li>
              <li><a href="#residences" className="hover:text-[#D6A03B] transition-colors">Sky Residences</a></li>
              <li><a href="#residences" className="hover:text-[#D6A03B] transition-colors">The AUREA House</a></li>
            </ul>
          </div>

          <div>
            <span className="text-[10px] text-[#D6A03B] uppercase tracking-widest block mb-4 font-bold">SANCTUARY</span>
            <ul className="space-y-2.5 font-light">
              <li><a href="#amenities" className="hover:text-[#D6A03B] transition-colors">Horizon Pool</a></li>
              <li><a href="#amenities" className="hover:text-[#D6A03B] transition-colors">Wellness Pavilion</a></li>
              <li><a href="#gallery" className="hover:text-[#D6A03B] transition-colors">Light Gallery</a></li>
              <li><a href="#location" className="hover:text-[#D6A03B] transition-colors">Atlantic Coast</a></li>
            </ul>
          </div>

          <div>
            <span className="text-[10px] text-[#D6A03B] uppercase tracking-widest block mb-4 font-bold">INQUIRY</span>
            <ul className="space-y-2.5 font-light">
              <li><button onClick={onOpenModal} className="hover:text-[#D6A03B] transition-colors text-left">Private Presentation</button></li>
              <li><button onClick={onOpenModal} className="hover:text-[#D6A03B] transition-colors text-left">Request Availability</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] text-white/50 gap-4">
          <span>© 2026 AUREA RESIDENCES. ALL RIGHTS RESERVED. CONCEPTUAL ARCHITECTURAL LANDMARK.</span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#D6A03B] hover:text-white transition-colors"
          >
            <span>RETURN TO SUNRISE</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
