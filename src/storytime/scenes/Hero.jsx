import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Composer from '../components/Composer';
import Img from '../components/Img';
import { IMG, HERO_PILLS } from '../data';

gsap.registerPlugin(ScrollTrigger);

/**
 * 01 — OPENING. Product-first. The composer is the protagonist.
 * Exit: environment desaturates → ivory; composer lingers, then scales down
 * and hands over one small photo fragment to the orbit scene.
 */
export default function Hero({ reduced }) {
  const root = useRef(null);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      // Entrance
      gsap.from('.hero__title .line', { y: 40, opacity: 0, duration: 1.6, ease: 'power3.out', stagger: 0.12, delay: 0.2 });
      gsap.from('.hero__sub, .hero__quiet', { opacity: 0, y: 14, duration: 1.2, ease: 'power3.out', delay: 0.7, stagger: 0.1 });
      gsap.from('.hero__composer', { y: 40, opacity: 0, scale: 0.97, duration: 1.6, ease: 'power3.out', delay: 0.55 });
      gsap.from('.pills .pill', { opacity: 0, y: 10, duration: 0.9, ease: 'power3.out', delay: 1.1, stagger: 0.05 });
      gsap.from('.hero__sky', { scale: 1.12, duration: 3.2, ease: 'power2.out' });

      // Cursor parallax on the world
      const px = gsap.quickTo('.hero__sky', 'x', { duration: 1.4, ease: 'power3.out' });
      const py = gsap.quickTo('.hero__sky', 'y', { duration: 1.4, ease: 'power3.out' });
      const onMove = (e) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        px(nx * -14); py(ny * -10);
      };
      window.addEventListener('mousemove', onMove);

      // Exit choreography (scrubbed)
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      tl.to('.hero__world', { filter: 'saturate(0.2) brightness(1.35)', ease: 'none' }, 0)
        .to('.hero__fade', { opacity: 1, ease: 'none' }, 0.15)
        .to('.hero__title, .hero__sub, .hero__quiet, .hero__scroll, .pills', { opacity: 0, y: -30, ease: 'none' }, 0)
        .to('.hero__composer', { y: -120, ease: 'none' }, 0)
        .to('.hero__composer', { scale: 0.6, opacity: 0, ease: 'power1.in' }, 0.45)
        .fromTo('.hero__fragment', { opacity: 0, scale: 0.4, y: -60 }, { opacity: 1, scale: 1, y: 60, ease: 'power1.out' }, 0.6)
        .to('.hero__fragment', { y: 160, opacity: 0, ease: 'power1.in' }, 0.85);

      return () => window.removeEventListener('mousemove', onMove);
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} id="top" className={`hero ${typing ? 'is-typing' : ''}`} data-nav="dark" aria-label="Create a story">
      <div className="hero__world" aria-hidden="true">
        <div className="hero__sky"><Img src={IMG.hero_view} alt="" eager /></div>
        <div className="hero__dof" />
        <div className="hero__frame" />
        <div className="hero__mullion" />
        <div className="hero__interior" />
        <div className="hero__figure"><Img src={IMG.hero_figure} alt="" eager /></div>
        <div className="hero__lamp" />
      </div>

      <div className="hero__content">
        <h1 className="display hero__title">
          <span className="line line--caps">Turn the people you love</span>
          <span className="line">into <em>unforgettable</em> stories.</span>
        </h1>
        <p className="hero__sub">
          Personalized illustrated stories for children, partners, parents, grandparents, friends, pets — and every moment worth keeping.
        </p>
        <div className="hero__composer">
          <Composer id="hero-composer" onTypingChange={setTyping} onFocusChange={(f) => setTyping((t) => t || f)} />
        </div>
        <div className="pills" style={{ marginTop: 16 }}>
          {HERO_PILLS.map((p) => <button key={p} type="button" className="pill">{p}</button>)}
          <button type="button" className="pill pill--more">More ideas</button>
        </div>
        <div className="hero__quiet"><span>Free to begin</span><span>No card required</span></div>
      </div>

      <div className="hero__scroll" aria-hidden="true"><span>Real people</span><span>Magical stories</span></div>
      <div className="hero__fade" aria-hidden="true" />
      <div className="hero__fragment" aria-hidden="true"><Img src={IMG.t_child} alt="" /></div>
    </section>
  );
}
