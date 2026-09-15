import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Img from '../components/Img';
import { IMG } from '../data';

gsap.registerPlugin(ScrollTrigger);

/**
 * 05 — REAL PERSON → STORY. Full-bleed photo; the illustration enters from
 * the right edge; then the frame zooms out to reveal it printed in the book.
 */
export default function RealToStory({ reduced }) {
  const root = useRef(null);
  useEffect(() => {
    if (reduced) {
      gsap.set('.real__illus', { clipPath: 'inset(0 0 0 50%)' });
      gsap.set('.real__copy', { opacity: 1 });
      return;
    }
    const bookW = () => (window.innerWidth > 900 ? Math.min(window.innerWidth * 0.46, 720) : window.innerWidth * 0.9);
    const bookH = () => (bookW() * 5) / 8;
    const ctx = gsap.context(() => {
      gsap.set('.real__frame', { left: 0, top: 0, width: '100%', height: '100%' });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top top', end: '+=320%', pin: '.real__stage', scrub: 0.6, anticipatePin: 1 },
      });
      tl.fromTo('.real__photo img, .real__illus img', { scale: 1.08 }, { scale: 1, duration: 2.4, ease: 'none' }, 0)
        .fromTo('.real__illus', { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', duration: 2.2, ease: 'power2.inOut' }, 0.2)
        .fromTo('.real__edge', { left: '100%', opacity: 0 }, { left: '0%', opacity: 1, duration: 2.2, ease: 'power2.inOut' }, 0.2)
        .to('.real__edge', { opacity: 0, duration: 0.2 }, 2.3)
        .to('.real__labels', { opacity: 0, duration: 0.3 }, 2.4)
        // zoom out: the illustration is printed inside the book
        .call(() => window.dispatchEvent(new CustomEvent('st:navtheme', { detail: 'light' })), null, 2.7)
        .to('.real__frame', {
          left: () => window.innerWidth / 2,
          top: () => (window.innerHeight - bookH()) / 2,
          width: () => bookW() / 2,
          height: () => bookH(),
          borderRadius: '2px 8px 8px 2px',
          duration: 1.4, ease: 'power3.inOut',
        }, 2.6)
        .fromTo('.real__book', { opacity: 0 }, { opacity: 1, duration: 1.0, ease: 'power3.out' }, 3.0)
        .fromTo('.real__copy', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 3.4);
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="real" data-nav="dark" aria-label="Made around the people who matter">
      <div className="real__stage">
        <div className="real__book" aria-hidden="true">
          <div className="spread">
            <div className="spread__page spread__page--text">
              Every evening Luna waited at the window with her, certain the mountains were waiting for them too.
              <span className="pg">22</span>
            </div>
            <div className="spread__page spread__page--img" />
          </div>
        </div>
        <div className="real__frame">
          <div className="real__photo"><Img src={IMG.real_photo} alt="A girl and her golden retriever at the window, photographed" /></div>
          <div className="real__illus" aria-hidden="true"><Img src={IMG.real_photo} alt="" /></div>
          <div className="real__edge" aria-hidden="true" />
        </div>
        <div className="real__labels" aria-hidden="true"><span>Their photo</span><span>Their story</span></div>
        <div className="real__copy">
          <h2 className="display real__title">Made around the people who matter.</h2>
          <div className="real__lines"><span>Their face</span><span>Their personality</span><span>Their story</span></div>
        </div>
      </div>
    </section>
  );
}
