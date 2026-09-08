import React, { useEffect, useState } from 'react';
import { Arrow, Clock, useDrawer } from '../ui.jsx';

const links = [
  ['Playbook', '#playbook'],
  ['Workshop', '#workshop'],
  ['Coaching', '#coaching'],
  ['Philosophy', '#philosophy'],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { open: openDrawer } = useDrawer();

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: 0, duration: 1.6 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="wrap flex items-center justify-between h-[4.5rem]">
          <a href="#top" onClick={(e) => go(e, '#top')} className="flex items-baseline gap-3">
            <span className="text-[1.35rem] font-semibold tracking-[-0.03em]">Reclaim</span>
            <span className="eyebrow hidden sm:inline" style={{ fontSize: '0.6rem' }}>by Eirik</span>
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={(e) => go(e, href)} className="nav-link">{label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-baseline gap-2 eyebrow" style={{ fontSize: '0.62rem' }}>
              <Clock /> <span>local</span>
            </div>
            <button className="btn btn-primary !h-[2.6rem] !px-4 !text-[0.85rem]" onClick={() => openDrawer('playbook')}>
              Get the free playbook <Arrow />
            </button>
            <button aria-label="Menu" className="md:hidden w-9 h-9 grid place-items-center" onClick={() => setOpen((v) => !v)}>
              <span className="block w-5 h-px bg-current mb-1.5" /><span className="block w-5 h-px bg-current" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[45] bg-[var(--bg)] md:hidden pt-28 wrap">
          <div className="flex flex-col gap-6">
            {links.map(([label, href], i) => (
              <a key={href} href={href} onClick={(e) => go(e, href)} className="display-m" style={{ fontWeight: 500 }}>
                <span className="eyebrow mr-4">0{i + 1}</span>{label}
              </a>
            ))}
          </div>
          <p className="eyebrow mt-16">Less work. More life.</p>
        </div>
      )}
    </>
  );
}
