import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Nav from './components/Nav';
import PaintFilter from './components/PaintFilter';
import Hero from './scenes/Hero';
import StoryScene from './scenes/StoryScene';
import Formats from './scenes/Formats';
import RealToStory from './scenes/RealToStory';
import Quiet from './scenes/Quiet';
import Pricing from './scenes/Pricing';
import Proof from './scenes/Proof';
import Final from './scenes/Final';
import Footer from './scenes/Footer';

gsap.registerPlugin(ScrollTrigger);

/**
 * STORYTIME — one continuous story.
 * CHAT → PEOPLE → ORBIT → MOTION → STORY → BOOK → REAL PRODUCT → PERSONAL MEMORY → PLANS → FINAL CREATION
 */
export default function StorytimeSite() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  // Smooth scroll (Lenis) driving ScrollTrigger
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    const onAnchor = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: 0, duration: 1.6 }); }
    };
    document.addEventListener('click', onAnchor);
    return () => { gsap.ticker.remove(raf); lenis.destroy(); document.removeEventListener('click', onAnchor); };
  }, [reduced]);

  // Nav theme follows the scene under it
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-nav]'));
    const triggers = sections.map((s) =>
      ScrollTrigger.create({
        trigger: s, start: 'top 60px', end: 'bottom 60px',
        onToggle: (self) => { if (self.isActive) window.dispatchEvent(new CustomEvent('st:navtheme', { detail: s.dataset.nav })); },
      })
    );
    // Layout settles late (fonts, pin spacers, lazy scenes): refresh generously.
    const refresh = () => ScrollTrigger.refresh();
    const t1 = setTimeout(refresh, 400);
    const t2 = setTimeout(refresh, 1500);
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);
    return () => { triggers.forEach((x) => x.kill()); clearTimeout(t1); clearTimeout(t2); window.removeEventListener('load', refresh); };
  }, [reduced]);

  return (
    <main className="st">
      <PaintFilter />
      <Nav />
      <Hero reduced={reduced} />
      <StoryScene reduced={reduced} />
      <Formats reduced={reduced} />
      <RealToStory reduced={reduced} />
      <Quiet reduced={reduced} />
      <Pricing reduced={reduced} />
      <Proof reduced={reduced} />
      <Final reduced={reduced} />
      <Footer />
    </main>
  );
}
