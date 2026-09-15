import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Img from '../components/Img';
import Composer from '../components/Composer';
import { IMG, FINAL_PILLS } from '../data';

gsap.registerPlugin(ScrollTrigger);

/** 09 — FINAL CREATION MOMENT. The composer returns, alone, over a dusk horizon. */
export default function Final({ reduced }) {
  const root = useRef(null);
  const [focus, setFocus] = useState(false);
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('.final__title .line', { y: 40, opacity: 0, stagger: 0.15, duration: 1.6, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 55%' } });
      gsap.from('.final .composer, .final .pills', { y: 40, opacity: 0, stagger: 0.15, duration: 1.6, ease: 'power3.out', delay: 0.2, scrollTrigger: { trigger: root.current, start: 'top 55%' } });
      gsap.fromTo('.final__bg img', { yPercent: -8 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } });
    }, root);
    return () => ctx.revert();
  }, [reduced]);
  return (
    <section ref={root} id="create" className={`final ${focus ? 'is-focus' : ''}`} data-nav="dark" aria-label="Create your first story">
      <div className="final__bg" aria-hidden="true"><Img src={IMG.final_lake} alt="" /></div>
      <div className="final__inner">
        <h2 className="display final__title">
          <span className="line">Whose story</span>
          <span className="line line--indent">will you <em>create</em> first?</span>
        </h2>
        <Composer id="final-composer" onFocusChange={setFocus} onTypingChange={(t) => setFocus(t)} ctaClass="btn--amber" compact />
        <div className="pills">
          {FINAL_PILLS.map((p) => <button key={p} type="button" className="pill">{p}</button>)}
        </div>
      </div>
    </section>
  );
}
