import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Img from '../components/Img';
import Magnetic from '../components/Magnetic';
import { Arrow } from '../components/icons';
import { IMG, PLANS } from '../data';

gsap.registerPlugin(ScrollTrigger);

/** 07 — PRICING / CREDITS. Editorial photographic panels, not SaaS cards. */
export default function Pricing({ reduced }) {
  const root = useRef(null);
  const [mode, setMode] = useState(0); // 0 monthly, 1 one-time

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('.pricing__head > *', { y: 30, opacity: 0, stagger: 0.1, duration: 1.3, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 70%' } });
      gsap.from('.plan', { y: 60, opacity: 0, stagger: 0.12, duration: 1.5, ease: 'power3.out', scrollTrigger: { trigger: '.plans', start: 'top 80%' } });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="pricing" id="pricing" data-nav="light" aria-label="Plans and credits">
      <div className="pricing__head">
        <div>
          <div className="eyebrow">Choose your journey</div>
          <h2 className="display pricing__title">Simple plans for a lifetime of stories.</h2>
          <p className="pricing__credits">Credits are used to create stories and illustrations.</p>
        </div>
        <div className="toggle" data-idx={mode} role="tablist" aria-label="Billing">
          <div className="toggle__thumb" aria-hidden="true" />
          <button role="tab" aria-selected={mode === 0} className={mode === 0 ? 'is-on' : ''} onClick={() => setMode(0)}>Monthly</button>
          <button role="tab" aria-selected={mode === 1} className={mode === 1 ? 'is-on' : ''} onClick={() => setMode(1)}>One-time</button>
        </div>
      </div>

      <div className="plans">
        {PLANS.map((p) => (
          <article key={p.id} className={`plan ${p.featured ? 'plan--featured' : ''}`}>
            <div className="plan__img" aria-hidden="true"><Img src={IMG[p.img]} alt="" /></div>
            <div className="plan__veil" aria-hidden="true" />
            <div className="plan__top">
              <div className="plan__name">{p.name}</div>
              {p.tag && <div className="plan__tag">{p.tag}</div>}
            </div>
            <div className="plan__body">
              <div className="plan__credits">{p.credits}<small>credits</small></div>
              <div className="plan__price">
                {mode === 0 ? p.monthly : p.oneTime} <em>{mode === 0 ? '/ month' : 'once'}</em>
              </div>
              <ul className="plan__features">
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <div className="plan__cta">
                <Magnetic strength={0.25}>
                  <a href="#create" className={`btn ${p.featured ? 'btn--amber' : 'btn--ghost'}`}>Get started <Arrow /></a>
                </Magnetic>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
