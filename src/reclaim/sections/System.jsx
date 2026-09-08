import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Reveal, Lines } from '../ui.jsx';

/* REMOVE. SYSTEMIZE. RECLAIM. — each step owns one visual behaviour. */

function VisualRemove({ play }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!play) return;
    const blocks = ref.current.querySelectorAll('rect[data-b]');
    const gone = [1, 2, 4, 6, 7, 9, 10];
    const ctx = gsap.context(() => {
      gsap.to(Array.from(blocks).filter((_, i) => gone.includes(i)), {
        scaleY: 0, opacity: 0, transformOrigin: '50% 100%', stagger: 0.12, duration: 0.8, ease: 'power3.inOut', delay: 0.5,
      });
    }, ref);
    return () => ctx.revert();
  }, [play]);
  return (
    <svg ref={ref} viewBox="0 0 320 120" className="w-full h-auto" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} data-b x={i * 26.5} y={30} width={20} height={60} fill={i % 3 === 0 ? 'var(--ink)' : 'var(--steel)'} />
      ))}
      <line x1="0" y1="90.5" x2="320" y2="90.5" stroke="var(--ink)" strokeOpacity="0.2" />
    </svg>
  );
}

function VisualSystemize({ play }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!play) return;
    const dots = ref.current.querySelectorAll('rect[data-d]');
    const line = ref.current.querySelector('[data-l]');
    const ctx = gsap.context(() => {
      gsap.to(dots, { attr: { y: 56 }, x: (i) => i * 44 - Number(dots[i].getAttribute('x')) + 6, duration: 1.1, stagger: 0.06, ease: 'power3.inOut', delay: 0.5 });
      gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', duration: 1, ease: 'power2.inOut', delay: 1.3 });
    }, ref);
    return () => ctx.revert();
  }, [play]);
  const scattered = [[12, 14], [70, 88], [118, 22], [160, 70], [214, 12], [258, 84], [300, 44]];
  return (
    <svg ref={ref} viewBox="0 0 320 120" className="w-full h-auto" aria-hidden="true">
      <line data-l x1="0" y1="60" x2="320" y2="60" stroke="var(--blue)" strokeWidth="1.5" />
      {scattered.map(([x, y], i) => (
        <rect key={i} data-d x={x} y={y} width="8" height="8" fill="var(--ink)" />
      ))}
    </svg>
  );
}

function VisualReclaim({ play }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!play) return;
    const ls = ref.current.querySelectorAll('line[data-r]');
    const ctx = gsap.context(() => {
      gsap.to(ls, { attr: { y1: (i) => 12 + i * 24, y2: (i) => 12 + i * 24 }, duration: 1.4, ease: 'power3.inOut', delay: 0.5, stagger: 0.04 });
      gsap.to(ls, { attr: { x2: (i) => 320 - i * 52 }, duration: 1.2, ease: 'power3.inOut', delay: 0.9 });
    }, ref);
    return () => ctx.revert();
  }, [play]);
  return (
    <svg ref={ref} viewBox="0 0 320 120" className="w-full h-auto" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={i} data-r x1="0" y1={50 + i * 5} x2="320" y2={50 + i * 5} stroke={i === 4 ? 'var(--peach)' : 'var(--ink)'} strokeWidth="1.5" />
      ))}
    </svg>
  );
}

const STEPS = [
  { n: '01', word: 'Remove.', copy: 'Find the work that should not require you.', V: VisualRemove },
  { n: '02', word: 'Systemize.', copy: 'Turn repeatable work into systems.', V: VisualSystemize },
  { n: '03', word: 'Reclaim.', copy: 'Get the hours back.', V: VisualReclaim },
];

export default function System() {
  const root = useRef(null);
  const [play, setPlay] = React.useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setPlay(true); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(root.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} className="wrap pt-[16vh] pb-[14vh]">
      <Reveal>
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow fade">The system</p>
            <h2 className="display-l mt-6"><Lines lines={['Remove.', 'Systemize.', 'Reclaim.']} /></h2>
          </div>
          <p className="eyebrow max-w-[16rem] text-right hidden md:block fade d3">Not more tools. A method you can run every week.</p>
        </div>
      </Reveal>

      <div className="rule mt-16" />
      <div className="grid grid-cols-1 md:grid-cols-3">
        {STEPS.map(({ n, word, copy, V }, i) => (
          <Reveal key={n} className={`py-12 md:py-14 md:pr-10 ${i > 0 ? 'md:pl-10 md:border-l border-t md:border-t-0' : ''}`} style={{ borderColor: 'var(--line)' }}>
            <div className="flex items-baseline justify-between">
              <span className="eyebrow ink fade">{n}</span>
              <span className="eyebrow fade d1">{['Tasks fragment', 'Fragments align', 'Space returns'][i]}</span>
            </div>
            <div className="mt-10 fade d1"><V play={play} /></div>
            <h3 className="display-m mt-10"><Lines lines={[word]} /></h3>
            <p className="body mt-4 max-w-[18rem] fade d2">{copy}</p>
          </Reveal>
        ))}
      </div>
      <div className="rule" />
    </section>
  );
}
