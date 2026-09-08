import React, { useCallback, useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawerCtx } from './ui.jsx';
import Nav from './sections/Nav.jsx';
import Hero from './sections/Hero.jsx';
import Week from './sections/Week.jsx';
import Problem from './sections/Problem.jsx';
import Disappear from './sections/Disappear.jsx';
import System from './sections/System.jsx';
import Ways from './sections/Ways.jsx';
import Changes from './sections/Changes.jsx';
import Philosophy from './sections/Philosophy.jsx';
import Final from './sections/Final.jsx';
import Drawer from './sections/Drawer.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function ReclaimSite() {
  const [drawer, setDrawer] = useState(null);
  const open = useCallback((m) => setDrawer(m), []);
  const close = useCallback(() => setDrawer(null), []);

  // Smooth scroll — time should feel continuous, not paged.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); window.__lenis = null; };
  }, []);

  // Cold → warm. The page itself gets warmer as time is returned.
  useEffect(() => {
    const warmStart = document.querySelector('[data-warm]');
    if (!warmStart) return;
    const ctx = gsap.context(() => {
      gsap.to(document.documentElement, {
        '--bg': '#FBF5EE',
        ease: 'none',
        scrollTrigger: { trigger: warmStart, start: 'top 90%', end: 'top 10%', scrub: true },
      });
    });
    // fonts + images can shift layout: refresh once everything settles
    const t = setTimeout(() => ScrollTrigger.refresh(), 800);
    return () => { ctx.revert(); clearTimeout(t); };
  }, []);

  return (
    <DrawerCtx.Provider value={{ open }}>
      <div className="grain">
        <Nav />
        <main>
          <Hero />
          <Week />
          <Problem />
          <Disappear />
          <System />
          <Ways />
          <Changes />
          <Philosophy />
          <Final />
        </main>
        <Drawer mode={drawer} onClose={close} />
      </div>
    </DrawerCtx.Provider>
  );
}
