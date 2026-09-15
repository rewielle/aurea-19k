import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Img from '../components/Img';
import { IMG } from '../data';

gsap.registerPlugin(ScrollTrigger);

/** 06 — ONE QUIET MOMENT. Silence before pricing. */
export default function Quiet({ reduced }) {
  const root = useRef(null);
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('.quiet__photo', { y: 40, opacity: 0, duration: 1.6, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 65%' } });
      gsap.from('.quiet__text', { y: 24, opacity: 0, duration: 1.6, ease: 'power3.out', delay: 0.2, scrollTrigger: { trigger: root.current, start: 'top 65%' } });
      gsap.to('.quiet__photo', { y: -40, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } });
    }, root);
    return () => ctx.revert();
  }, [reduced]);
  return (
    <section ref={root} className="quiet" data-nav="light" aria-label="A quiet moment">
      <div className="quiet__inner">
        <div className="quiet__photo"><Img src={IMG.quiet} alt="" /></div>
        <p className="display quiet__text">Some memories deserve more than a camera roll.</p>
      </div>
    </section>
  );
}
