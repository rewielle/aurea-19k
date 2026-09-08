import React from 'react';
import { Reveal, Lines, Arrow, Clock, useDrawer } from '../ui.jsx';

export default function Final() {
  const { open } = useDrawer();
  const goWorkshop = () => {
    const el = document.querySelector('#workshop');
    if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.8 }); else el?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section data-warm className="wrap pt-[18vh] pb-10 min-h-[100svh] flex flex-col justify-between">
      <Reveal>
        <h2 className="display-xl">
          <Lines lines={['The next', '10 hours']} />
          <span className="mask"><span>are <span className="time-grad">yours.</span></span></span>
        </h2>
        <div className="mt-12 flex flex-wrap items-center gap-4 fade d3">
          <button className="btn btn-primary" onClick={() => open('playbook')}>Get the free playbook <Arrow /></button>
          <button className="btn btn-ghost" onClick={goWorkshop}>Join the workshop</button>
        </div>
      </Reveal>

      <Reveal className="mt-[16vh]">
        <p className="eyebrow ink fade">Less work.<br />More life.</p>
        <div className="mt-10 h-px w-full rule-grow" style={{ background: 'linear-gradient(90deg, var(--blue), var(--peach))' }} />
        <footer className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-6 eyebrow fade d2">
          <div><span className="text-[var(--ink)] normal-case tracking-[-0.02em] text-[1rem] font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Reclaim</span><br />by Eirik</div>
          <div className="flex flex-col gap-1">
            <a href="#playbook" className="hover:text-[var(--ink)]">Playbook</a>
            <a href="#workshop" className="hover:text-[var(--ink)]">Workshop</a>
            <a href="#coaching" className="hover:text-[var(--ink)]">Coaching</a>
          </div>
          <div className="flex flex-col gap-1">
            <a href="mailto:hello@example.com" className="hover:text-[var(--ink)]">Email</a>
            <span>Use AI. Keep your time.</span>
          </div>
          <div className="md:text-right"><Clock /> local<br />© {new Date().getFullYear()} Reclaim</div>
        </footer>
      </Reveal>
    </section>
  );
}
