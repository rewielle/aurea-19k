import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../ui.jsx';

gsap.registerPlugin(ScrollTrigger);

const WORDS = ['Inbox', 'Reports', 'Research', 'Follow-ups', 'Scheduling', 'Summaries', 'Admin'];

/* THE WORK DISAPPEARS. */
export default function Disappear() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    const words = el.querySelectorAll('.word');
    const lines = el.querySelectorAll('.word-line');
    const h1 = el.querySelectorAll('[data-h1] > span > span');
    const h2 = el.querySelectorAll('[data-h2] > span > span');
    const note = el.querySelector('[data-note]');

    if (reduced) {
      gsap.set(words, { opacity: 0.15 }); gsap.set(lines, { scaleX: 1 });
      gsap.set(h1, { yPercent: -110 }); gsap.set(h2, { yPercent: 0 }); gsap.set(note, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0, y: 20 });
      gsap.set(h2, { yPercent: 110 });
      gsap.set(note, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top top', end: '+=300%', pin: el.querySelector('[data-pin]'), scrub: 0.5 },
      });
      // 1. work appears
      tl.to(words, { opacity: 1, y: 0, stagger: 0.09, duration: 0.6, ease: 'power2.out' }, 0);
      // 2. one precise blue line handles it
      tl.to(lines, { scaleX: 1, stagger: 0.11, duration: 0.5, ease: 'power2.inOut' }, 1.0);
      // 3. it compresses and leaves
      tl.to(words, { scaleX: 0.02, opacity: 0, x: -12, stagger: 0.09, duration: 0.5, ease: 'power3.in' }, 1.9);
      tl.to(lines, { opacity: 0, stagger: 0.09, duration: 0.3 }, 2.2);
      // 4. the sentence changes
      tl.to(h1, { yPercent: -110, stagger: 0.06, duration: 0.6, ease: 'power3.inOut' }, 2.6);
      tl.to(h2, { yPercent: 0, stagger: 0.06, duration: 0.7, ease: 'power3.out' }, 2.75);
      tl.to(note, { opacity: 1, duration: 0.4 }, 3.2);
      tl.to({}, { duration: 0.4 });
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="relative" aria-label="The work disappears">
      <div data-pin className="min-h-[100svh] wrap flex items-center py-24 md:py-0">
        <div className="grid-12 w-full items-center">
          <div className="col-span-12 md:col-span-6">
            <p className="eyebrow">The shift</p>
            <div className="mt-6 grid" style={{ fontSize: 'clamp(2.5rem, 5.6vw, 6rem)', lineHeight: 0.94, letterSpacing: '-0.04em', fontWeight: 500 }}>
              <div data-h1 aria-hidden="true" style={{ gridArea: '1 / 1' }}>
                <span className="mask-raw"><span>You don’t need</span></span>
                <span className="mask-raw"><span>more AI tools.</span></span>
              </div>
              <div data-h2 aria-hidden="true" style={{ gridArea: '1 / 1' }}>
                <span className="mask-raw"><span>You need</span></span>
                <span className="mask-raw"><span>less work</span></span>
                <span className="mask-raw"><span><span className="text-[var(--blue)]">requiring you.</span></span></span>
              </div>
              <h2 className="sr-only">You don’t need more AI tools. You need less work requiring you.</h2>
            </div>
            <p data-note className="lede mt-10 max-w-[22rem]">The tools already exist. What most people are missing is the system that decides what should never reach them again.</p>
          </div>

          <div className="col-span-12 md:col-span-5 md:col-start-8 mt-16 md:mt-0">
            <ul className="flex flex-col gap-1.5 md:gap-2.5">
              {WORDS.map((w) => (
                <li key={w} className="leading-none">
                  <span className="word text-[clamp(2rem,4.4vw,4.4rem)] font-[300] tracking-[-0.035em] text-[var(--ink-2)]">
                    {w}
                    <span className="word-line" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
