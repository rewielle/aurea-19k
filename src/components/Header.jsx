import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, ChevronRight } from 'lucide-react';
import SoundPlayer from './SoundPlayer';

export default function Header({ currentSolarPhase, onOpenModal, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'RESIDENCES', target: '#residences' },
    { label: 'ARCHITECTURE', target: '#architecture' },
    { label: 'EXPERIENCE', target: '#experience' },
    { label: 'THE HORIZON', target: '#horizon' },
    { label: 'AVAILABILITY', target: '#floor-selector' },
  ];

  const handleLinkClick = (target) => {
    setMenuOpen(false);
    if (onNavigate) {
      onNavigate(target);
    } else {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#F4EFE5]/85 backdrop-blur-lg border-b border-[#C8A776]/20 py-4 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Logo Brand */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group text-left focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <span className="font-serif-editorial text-2xl sm:text-3xl tracking-[0.35em] text-[#35322E] uppercase font-light">
                A U R E A
              </span>
              <div className="w-2 h-2 rounded-full bg-[#D9A441] shadow-[0_0_8px_#D9A441]" />
            </div>
            <span className="block text-[8px] tracking-[0.3em] uppercase text-[#9A7552] opacity-80 group-hover:opacity-100 transition-opacity">
              Designed around the horizon
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.target)}
                className="text-[11px] tracking-[0.25em] uppercase text-[#35322E]/80 hover:text-[#D9A441] transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D9A441] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-4">
            {/* Live Solar Phase Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C8A776]/30 bg-[#F4EFE5]/40 backdrop-blur-md text-[10px] tracking-[0.2em] uppercase text-[#35322E]">
              <Sun className="w-3.5 h-3.5 text-[#D9A441] animate-spin-slow" />
              <span>{currentSolarPhase?.label || 'GOLDEN HOUR'}</span>
              <span className="opacity-50">/</span>
              <span className="font-mono text-[#9A7552]">{currentSolarPhase?.time || '18:42'}</span>
            </div>

            {/* Togglable Ocean Audio */}
            <SoundPlayer />

            {/* Private Presentation CTA Button */}
            <button
              onClick={onOpenModal}
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-[#35322E] text-[#F7F3EC] text-xs tracking-widest uppercase transition-all duration-300 hover:bg-[#D9A441] hover:text-[#1E2B35] shadow-sm hover:shadow-[0_0_20px_rgba(217,164,65,0.4)]"
            >
              <span>Presentation</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-[#35322E] focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Navigation Modal for Mobile/Desktop menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#F4EFE5]/95 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-12 bg-grain"
          >
            {/* Top Bar Spacer */}
            <div className="h-16" />

            {/* Menu Links */}
            <div className="max-w-4xl mx-auto w-full my-auto">
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C8A776]/40 to-transparent mb-12" />
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col gap-6">
                  {navLinks.map((link, idx) => (
                    <motion.button
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      onClick={() => handleLinkClick(link.target)}
                      className="text-left font-serif-editorial text-3xl sm:text-4xl text-[#35322E] hover:text-[#D9A441] transition-colors flex items-center justify-between group"
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-[#D9A441]" />
                    </motion.button>
                  ))}
                </div>

                {/* Right Editorial Card */}
                <div className="p-8 rounded-2xl border border-[#C8A776]/30 bg-[#F7F3EC]/80 backdrop-blur-md flex flex-col gap-4">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#9A7552]">AUREA MANIFESTO</span>
                  <p className="font-serif-editorial text-2xl text-[#35322E] italic">
                    "Every level changes the way you see the world."
                  </p>
                  <p className="text-xs text-[#526675] leading-relaxed">
                    Designed around the uninterrupted relationship between light, horizon and craft.
                  </p>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenModal();
                    }}
                    className="mt-4 w-full py-3 rounded-full bg-[#D9A441] text-[#1E2B35] text-xs font-semibold tracking-widest uppercase text-center hover:bg-[#C8A776] transition-colors"
                  >
                    Schedule Private Presentation
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Line */}
            <div className="max-w-4xl mx-auto w-full flex items-center justify-between text-xs text-[#9A7552]">
              <span>Pacific Ocean Coast</span>
              <span>© AUREA Residences</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
