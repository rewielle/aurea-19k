import React from 'react';
import { ArrowUpRight, Sun, Sparkles } from 'lucide-react';

export default function Footer({ onOpenModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#1E2B35] text-[#F7F3EC] bg-grain overflow-hidden pt-28 pb-12 border-t border-white/10">
      
      {/* Background Night Tower & Golden Horizon Arc */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none mix-blend-screen filter brightness-125"
        style={{ backgroundImage: `url('/assets/building_night.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1E2B35] via-[#1E2B35]/80 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Cinematic Closing CTA Section */}
        <div className="max-w-4xl mx-auto text-center pb-24 border-b border-white/15">
          {/* Solar Cycle Complete Arc */}
          <div className="w-24 h-12 mx-auto mb-6 flex items-end justify-center relative overflow-hidden">
            <div className="w-20 h-20 rounded-full border-t-2 border-[#D9A441] shadow-[0_0_20px_#D9A441] animate-pulse" />
            <div className="absolute bottom-0 w-full h-[1px] bg-[#C8A776]/50" />
          </div>

          <span className="text-[10px] tracking-[0.4em] uppercase text-[#D9A441] font-mono block mb-4">
            A NEW HORIZON AWAITS
          </span>

          <h2 className="font-serif-editorial text-5xl sm:text-7xl text-[#F7F3EC] leading-tight mb-8">
            Experience living <br />
            <span className="italic text-gold-gradient font-normal">above the horizon.</span>
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <button
              onClick={onOpenModal}
              className="px-10 py-5 rounded-full bg-[#D9A441] text-[#1E2B35] font-semibold text-xs tracking-[0.25em] uppercase hover:bg-[#C8A776] transition-all shadow-[0_0_30px_rgba(217,164,65,0.4)]"
            >
              Schedule Private Presentation
            </button>
          </div>
        </div>

        {/* Brand & Sitemap Footer Links */}
        <div className="grid md:grid-cols-12 gap-12 py-16">
          <div className="md:col-span-5">
            <span className="font-serif-editorial text-3xl tracking-[0.35em] text-[#F7F3EC] uppercase font-light block mb-3">
              A U R E A
            </span>
            <p className="text-xs text-[#A7B6BC] max-w-sm leading-relaxed mb-6 font-light">
              Architecture that celebrates the horizon. A landmark oceanfront residential development designed around light, space and silence.
            </p>
            <span className="text-[10px] tracking-widest uppercase font-mono text-[#D9A441]">
              PACIFIC OCEAN COAST · 2026 EDITION
            </span>
          </div>

          <div className="md:col-span-7 grid sm:grid-cols-3 gap-8">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#D9A441] block mb-4">
                RESIDENCES
              </span>
              <ul className="space-y-2 text-xs text-[#A7B6BC]">
                <li><a href="#residences" className="hover:text-[#F7F3EC] transition-colors">Horizon Residences</a></li>
                <li><a href="#residences" className="hover:text-[#F7F3EC] transition-colors">Upper Sky Suites</a></li>
                <li><a href="#residences" className="hover:text-[#F7F3EC] transition-colors">The Aurea House</a></li>
                <li><a href="#floor-selector" className="hover:text-[#F7F3EC] transition-colors">Floor Selector</a></li>
              </ul>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#D9A441] block mb-4">
                ARCHITECTURE
              </span>
              <ul className="space-y-2 text-xs text-[#A7B6BC]">
                <li><a href="#architecture" className="hover:text-[#F7F3EC] transition-colors">Solar Concept</a></li>
                <li><a href="#architecture" className="hover:text-[#F7F3EC] transition-colors">Material Tactility</a></li>
                <li><a href="#experience" className="hover:text-[#F7F3EC] transition-colors">Horizon Pool</a></li>
                <li><a href="#experience" className="hover:text-[#F7F3EC] transition-colors">Wellness Pavilion</a></li>
              </ul>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#D9A441] block mb-4">
                INQUIRY
              </span>
              <ul className="space-y-2 text-xs text-[#A7B6BC]">
                <li>
                  <button onClick={onOpenModal} className="hover:text-[#F7F3EC] transition-colors flex items-center gap-1">
                    <span>Private Booking</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </li>
                <li><span className="opacity-60">Concierge Desk</span></li>
                <li><span className="opacity-60">Architectural Book</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Rights & Back to top */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs text-[#A7B6BC] gap-4">
          <p>© 2026 AUREA Residences. All rights reserved. Designed around the horizon.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#D9A441] transition-colors font-mono text-[10px] tracking-widest uppercase"
          >
            <span>Return to Dawn</span>
            <Sun className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
