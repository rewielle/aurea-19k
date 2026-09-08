import React from 'react';
import { Reveal, Lines, Arrow, Play, useDrawer } from '../ui.jsx';

export default function Hero() {
  const { open } = useDrawer();

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

      <div className="wrap relative grid-12 pt-[11rem] md:pt-[12.5rem] pb-[9rem]">
        <div className="col-span-12 md:col-span-8 lg:col-span-7">
          <p className="eyebrow fade">Practical AI. No hype. Real results.</p>
          <p className="eyebrow ink fade d1 mt-2">Free playbook · Live workshop · Private AI implementation — with Eirik</p>

          <h1 className="display-xl mt-8">
            <Lines lines={['Buy back']} />
            <span className="mask"><span>your <span className="time-grad">time.</span></span></span>
          </h1>

          <p className="lede mt-9 max-w-[30rem] fade d2">
            Eirik teaches you to hand your repetitive work — emails, research, reports, admin — to practical AI systems, and get <strong className="font-medium text-[var(--ink)]">10+ hours back every week</strong>. Start with the free playbook or join the live workshop.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 fade d3">
            <button className="btn btn-primary" onClick={() => open('playbook')}>Get the free playbook <Arrow /></button>
            <button className="btn btn-ghost" onClick={() => open('workshop')}><Play /> Join the live workshop</button>
          </div>

          {/* What you get, in one glance */}
          <dl className="mt-12 grid grid-cols-3 gap-4 max-w-[34rem] fade d4">
            {[
              ['10H+', 'per week', 'back to you'],
              ['Live', 'workshop', '60 min, free'],
              ['1:1', 'implementation', 'built with Eirik'],
            ].map(([big, l1, l2]) => (
              <div key={big} className="border-t pt-3" style={{ borderColor: 'rgba(8,20,33,0.14)' }}>
                <dt className="num text-[1.5rem] md:text-[1.75rem] leading-none text-[var(--blue)]">{big}</dt>
                <dd className="eyebrow mt-2">{l1}<br />{l2}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Bottom rail: where the material begins */}
      <div className="absolute left-0 right-0 bottom-0 wrap pb-8">
        <div className="rule rule-grow" />
        <div className="flex items-end justify-between pt-4">
          <div className="eyebrow fade d4 hidden sm:block">AI systems for a more human way to work</div>
          <div className="eyebrow fade d5 flex items-baseline gap-3">
            <span>Your week</span><span className="num text-[1.4rem] text-[var(--ink)] tracking-[-0.04em]">40H</span>
            <span>→</span><span className="num text-[1.4rem] text-[var(--blue)] tracking-[-0.04em]">29H 40M</span>
            <span className="hidden sm:inline">Scroll to see how</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
