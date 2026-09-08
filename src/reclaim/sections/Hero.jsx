import React from 'react';
import { Reveal, Lines, Arrow, Play, useDrawer } from '../ui.jsx';

export default function Hero() {
  const { open } = useDrawer();
  const goWorkshop = () => {
    const el = document.querySelector('#workshop');
    if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.8 }); else el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Reveal as="section" id="top" className="relative min-h-[100svh] overflow-hidden" threshold={0.01}>
      {/* Photo: end of a real workday, bleeding off the right edge */}
      <div className="hero-img absolute top-0 right-0 bottom-0 w-[100%] md:w-[58%] pointer-events-none" aria-hidden="true">
        <div className="hero-img-inner absolute inset-0 overflow-hidden">
          <img src="/reclaim/hero-desk.jpg" alt="" className="w-full h-full object-cover object-[70%_50%] opacity-[0.28] md:opacity-100" />
        </div>
        {/* editorial note on the photo */}
        <div className="absolute right-[var(--gutter)] top-[7.5rem] hidden md:block text-right">
          <p className="eyebrow ink fade d4" style={{ color: 'rgba(8,20,33,0.85)' }}>Same ambition.<br />Less work.</p>
          <div className="rule-short ml-auto mt-3 fade d5" style={{ color: 'var(--ink)' }} />
        </div>
      </div>

      <div className="wrap relative grid-12 pt-[9.5rem] md:pt-[11rem] pb-[8rem]">
        <div className="col-span-12 md:col-span-8 lg:col-span-7">
          <p className="eyebrow fade">Practical AI. No hype. Real results.</p>

          <h1 className="display-xl mt-8">
            <Lines lines={['Buy back']} />
            <span className="mask"><span>your <span className="time-grad">time.</span></span></span>
          </h1>

          <p className="lede mt-9 max-w-[26rem] fade d2">
            Practical AI systems that remove repetitive work and give you more time for what actually matters.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 fade d3">
            <button className="btn btn-primary" onClick={() => open('playbook')}>Get the free playbook <Arrow /></button>
            <button className="btn btn-ghost" onClick={goWorkshop}><Play /> Watch the workshop</button>
          </div>
        </div>
      </div>

      {/* Bottom rail: where the material begins */}
      <div className="absolute left-0 right-0 bottom-0 wrap pb-8">
        <div className="rule rule-grow" />
        <div className="flex items-end justify-between pt-4">
          <div className="eyebrow fade d4 hidden sm:block">AI systems for a more human way to work</div>
          <div className="eyebrow fade d5 flex items-baseline gap-3">
            <span>A week</span><span className="num text-[1.4rem] text-[var(--ink)] tracking-[-0.04em]">40H</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
