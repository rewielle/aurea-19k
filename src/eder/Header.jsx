import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToId, getLenis } from './useSmoothScroll';
import { Arrow, Instagram } from './ui/Icons';

const NAV = [
  { id: 'inicio', label: 'Início' },
  { id: 'experiencias', label: 'Experiências' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'musica', label: 'Música' },
  { id: 'galeria', label: 'Galeria' },
  { id: 'contato', label: 'Contato' },
];

const EASE = [0.16, 1, 0.3, 1];

export default function Header({ ready }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop(); else lenis?.start();
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [open]);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 350 : 0);
  };

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-[70] transition-[background-color,border-color,backdrop-filter] duration-700 ${
          scrolled && !open ? 'bg-[rgba(5,8,11,0.55)] backdrop-blur-md border-b border-[var(--off-10)]' : 'border-b border-transparent'
        }`}
        initial={{ y: -24, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
      >
        <div className="container-x flex items-center justify-between h-[68px] lg:h-[84px]">
          <a href="#inicio" onClick={go('inicio')} className="wordmark text-[0.68rem] lg:text-[0.78rem] leading-[0.95] tracking-[0.06em]" aria-label="Éder Noronha — início">
            <span className="block">Éder</span>
            <span className="block">Noronha</span>
          </a>

          <nav className="hidden lg:flex items-center gap-9" aria-label="Principal">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} className="label text-[0.6rem] tracking-[0.3em] text-[var(--off-60)] hover:text-[var(--off)] transition-colors duration-500">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href="#contato" onClick={go('contato')} className="btn hidden lg:inline-flex !py-[0.7rem] !px-[1.25rem]">
              Contratar <Arrow />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden relative w-11 h-11 -mr-2 flex items-center justify-center"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
            >
              <span className={`absolute h-px w-6 bg-[var(--off)] transition-transform duration-500 ${open ? 'rotate-45' : '-translate-y-[4px]'}`} style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
              <span className={`absolute h-px w-6 bg-[var(--off)] transition-transform duration-500 ${open ? '-rotate-45' : 'translate-y-[4px]'}`} style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-[65] bg-[var(--navy)] flex flex-col"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="container-x flex-1 flex flex-col justify-end pb-10 pt-24">
              <nav className="flex flex-col gap-1" aria-label="Menu">
                {NAV.map((n, i) => (
                  <span key={n.id} className="block overflow-hidden">
                    <motion.a
                      href={`#${n.id}`}
                      onClick={go(n.id)}
                      className="display-light block !text-[2.6rem] !leading-[1.05] text-[var(--off)]"
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      exit={{ y: '110%' }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.06 }}
                    >
                      {n.label}
                    </motion.a>
                  </span>
                ))}
              </nav>
              <motion.div
                className="mt-10 pt-6 border-t border-[var(--off-10)] flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <a href="https://instagram.com/djedernoronha" target="_blank" rel="noreferrer" className="label flex items-center gap-3 text-[var(--off)]">
                  <Instagram className="w-4 h-4" /> @djedernoronha
                </a>
                <span className="label text-[0.55rem]">Do mar ao palco</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
