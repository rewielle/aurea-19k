import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Img from '../components/Img';
import { IMG, TESTIMONIALS } from '../data';

gsap.registerPlugin(ScrollTrigger);

/** 08 — SOCIAL PROOF. Full-width editorial quotes, scroll-driven crossfade. */
export default function Proof({ reduced }) {
  const root = useRef(null);
  useEffect(() => {
    const quotes = gsap.utils.toArray('.proof__quote', root.current);
    const layers = gsap.utils.toArray('.proof__bg .layer', root.current);
    const idx = root.current.querySelector('.proof__idx');
    if (reduced) { gsap.set([quotes[0], layers[0]], { opacity: 1 }); return; }
    const n = quotes.length;
    const st = ScrollTrigger.create({
      trigger: root.current, start: 'top top', end: `+=${n * 110}%`, pin: '.proof__stage', scrub: 0.5, anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress * (n - 0.001);
        quotes.forEach((q, i) => {
          const d = Math.abs(p - i);
          const o = Math.max(0, 1 - d * 1.6);
          q.style.opacity = o;
          q.style.transform = `translateY(${(p - i) * -40}px)`;
          layers[i].style.opacity = o * 0.9;
          layers[i].style.transform = `scale(${1.04 + (p - i) * 0.03})`;
        });
        idx.textContent = `${String(Math.min(n, Math.round(p) + 1)).padStart(2, '0')} / ${String(n).padStart(2, '0')}`;
      },
    });
    return () => st.kill();
  }, [reduced]);

  return (
    <section ref={root} className="proof" data-nav="light" aria-label="What people say">
      <div className="proof__stage">
        <div className="proof__bg" aria-hidden="true">
          {TESTIMONIALS.map((t, i) => <div key={i} className="layer"><Img src={IMG[t.bg]} alt="" /></div>)}
        </div>
        <div className="proof__quotes">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} className="proof__quote">
              <blockquote className="display proof__text">“{t.quote}”</blockquote>
              <figcaption className="proof__who">
                <Img src={IMG[t.avatar]} alt="" />
                <span><b>{t.name}</b> · {t.role}</span>
                <span className="v">Verified customer</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="proof__idx" aria-hidden="true">01 / 03</div>
      </div>
    </section>
  );
}
