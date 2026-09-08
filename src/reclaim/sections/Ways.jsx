import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Reveal, Lines, Arrow, useDrawer } from '../ui.jsx';

/* ---------- 01 START — The playbook as an object ---------- */
function Book() {
  return (
    <div className="book-scene relative">
      <div className="book">
        <div className="book-spine" />
        <div className="book-pages" />
        <div className="book-cover p-[9%] flex flex-col justify-between">
          <div className="flex justify-between eyebrow" style={{ fontSize: '0.5rem' }}>
            <span>Reclaim · Field guide</span><span>No. 01</span>
          </div>
          <div>
            <div className="leading-[0.9] tracking-[-0.045em] font-medium" style={{ fontSize: 'clamp(1.9rem, 3.4vw, 3rem)' }}>
              The<br />10-Hour<br />AI Week
            </div>
            <p className="mt-4 text-[0.8rem] leading-snug text-[var(--mute)] tracking-[-0.01em]">Practical AI systems<br />for a lighter week.</p>
          </div>
          {/* one visual tied to time: a week folding */}
          <div className="flex flex-col gap-[6px]" aria-hidden="true">
            {[100, 82, 66, 54, 46].map((w, i) => (
              <div key={i} className="flex items-center gap-[6px]">
                <div className="h-[3px] bg-[var(--ink)]" style={{ width: `${w}%`, opacity: 0.9 - i * 0.12 }} />
                <div className="h-px flex-1" style={{ background: i === 4 ? 'var(--peach)' : 'var(--blue)' }} />
              </div>
            ))}
            <div className="flex justify-between eyebrow mt-2" style={{ fontSize: '0.45rem' }}><span>40H</span><span>29H 40M</span></div>
          </div>
        </div>
      </div>
      <div className="book-shadow" />
    </div>
  );
}

const INSIDE = [
  ['Inbox triage', 'Only what needs you reaches you.'],
  ['Research briefs', 'Questions in. A one-page answer out.'],
  ['Meeting notes → actions', 'Decisions and next steps, without typing.'],
  ['Weekly reporting', 'The same report, built while you sleep.'],
  ['Follow-up drafts', 'Every loop closed in your voice.'],
  ['Content repurposing', 'One idea, every format.'],
  ['Admin autopilot', 'Scheduling, filing, reminders. Gone.'],
];

function Playbook() {
  const { open } = useDrawer();
  return (
    <div id="playbook" className="grid-12 items-center pt-[10vh] pb-[12vh] scroll-mt-20">
      <Reveal className="col-span-12 md:col-span-6 order-2 md:order-1 mt-16 md:mt-0">
        <div className="flex items-baseline gap-4"><span className="eyebrow ink fade">01</span><span className="eyebrow fade d1">Start · Free playbook</span></div>
        <h3 className="display-l mt-6"><Lines lines={['The 10-Hour', 'AI Week.']} /></h3>
        <p className="lede mt-8 max-w-[22rem] fade d2">7 practical systems to remove repetitive work from your week.</p>
        <div className="mt-8 flex flex-wrap items-center gap-5 fade d3">
          <button className="btn btn-primary" onClick={() => open('playbook')}>Get the playbook <Arrow /></button>
          <span className="eyebrow">PDF · Free · Read in one sitting</span>
        </div>

        <ol className="mt-14 max-w-[26rem]">
          {INSIDE.map(([t, d], i) => (
            <li key={t} className="grid grid-cols-[2rem_1fr] gap-x-4 py-3 border-t" style={{ borderColor: 'var(--line)' }}>
              <span className="eyebrow pt-1">0{i + 1}</span>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <span className="font-medium tracking-[-0.015em]">{t}</span>
                <span className="body text-[0.9rem]">{d}</span>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal className="col-span-12 md:col-span-5 md:col-start-8 order-1 md:order-2">
        <div className="surface relative aspect-[4/4.6] md:aspect-[4/4.4] flex items-end justify-center overflow-hidden fade">
          <div className="absolute inset-x-0 top-[70%] h-px bg-[rgba(8,20,33,0.08)]" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(70% 50% at 25% 10%, rgba(255,255,255,0.9), transparent 70%)' }} />
          <div className="relative mb-[15%]"><Book /></div>
          <div className="absolute left-5 bottom-5 eyebrow" style={{ fontSize: '0.58rem' }}>Field guide · Edition one</div>
        </div>
      </Reveal>
    </div>
  );
}

/* ---------- 02 BUILD — Live workshop (dark, denser) ---------- */
function Flow() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      const ctx = gsap.context(() => {
        gsap.fromTo(el.querySelectorAll('[data-in]'), { opacity: 0, x: -8 }, { opacity: 1, x: 0, stagger: 0.12, duration: 0.6, ease: 'power2.out' });
        gsap.fromTo(el.querySelectorAll('[data-path]'), { strokeDashoffset: 400 }, { strokeDashoffset: 0, stagger: 0.12, duration: 1.2, ease: 'power2.inOut', delay: 0.5 });
        gsap.fromTo(el.querySelectorAll('[data-out]'), { opacity: 0, x: 8 }, { opacity: 1, x: 0, stagger: 0.12, duration: 0.6, ease: 'power2.out', delay: 1.4 });
        gsap.fromTo(el.querySelector('[data-sys]'), { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.9 });
      }, el);
      el.__ctx = ctx;
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); el.__ctx?.revert(); };
  }, []);
  const ins = ['Inbox', 'Meeting recording', 'Weekly numbers'];
  const outs = ['3 replies to review', 'Decisions + actions', 'Report, drafted'];
  return (
    <svg ref={ref} viewBox="0 0 640 260" className="w-full h-auto" aria-label="A workflow: inputs pass through one system and come out as finished work">
      <defs><style>{`.lbl{font-family:var(--font-mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;fill:rgba(246,248,251,.75)}`}</style></defs>
      {ins.map((t, i) => (
        <g key={t} data-in>
          <rect x="0" y={40 + i * 70} width="180" height="34" fill="none" stroke="rgba(246,248,251,0.22)" />
          <text className="lbl" x="14" y={61 + i * 70}>{t}</text>
        </g>
      ))}
      {ins.map((_, i) => (
        <path key={i} data-path d={`M180 ${57 + i * 70} C 240 ${57 + i * 70}, 240 130, 300 130`} fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeDasharray="400" strokeDashoffset="400" />
      ))}
      <g data-sys>
        <rect x="300" y="100" width="60" height="60" fill="var(--blue)" />
        <text className="lbl" x="330" y="135" textAnchor="middle" style={{ fill: '#fff' }}>SYS</text>
      </g>
      {outs.map((_, i) => (
        <path key={i} data-path d={`M360 130 C 420 130, 420 ${57 + i * 70}, 460 ${57 + i * 70}`} fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeDasharray="400" strokeDashoffset="400" />
      ))}
      {outs.map((t, i) => (
        <g key={t} data-out>
          <rect x="460" y={40 + i * 70} width="180" height="34" fill="rgba(246,248,251,0.06)" stroke="rgba(246,248,251,0.35)" />
          <text className="lbl" x="474" y={61 + i * 70}>{t}</text>
        </g>
      ))}
      <text className="lbl" x="0" y="250" style={{ fill: 'rgba(246,248,251,.4)' }}>Built live · No-code friendly</text>
    </svg>
  );
}

function Workshop() {
  const { open } = useDrawer();
  return (
    <div id="workshop" className="relative bg-[var(--ink)] text-[var(--ice)] scroll-mt-0 overflow-hidden">
      {/* thin atmospheric band — dusk, partially outside the grid */}
      <div className="absolute -left-[6%] right-0 top-0 h-[7rem] md:h-[9rem] opacity-70 pointer-events-none photo abs" aria-hidden="true"
        style={{ WebkitMaskImage: 'linear-gradient(180deg,#000 0%,transparent 100%)', maskImage: 'linear-gradient(180deg,#000 0%,transparent 100%)' }}>
        <img src="/reclaim/dusk-strip.jpg" alt="" className="opacity-60" />
      </div>

      <div className="wrap pt-[16vh] pb-[14vh]">
        <Reveal className="grid-12">
          <div className="col-span-12 md:col-span-6">
            <div className="flex items-baseline gap-4"><span className="eyebrow light fade" style={{ color: 'var(--ice)' }}>02</span><span className="eyebrow light fade d1">Build · Live workshop</span></div>
            <h3 className="display-l mt-6"><Lines lines={['Build a week', 'that needs', 'less of you.']} /></h3>
            <p className="lede mt-8 max-w-[24rem] fade d2" style={{ color: 'rgba(246,248,251,0.7)' }}>
              A practical live session where Eirik shows you how to identify repetitive work and turn it into useful AI systems.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5 fade d3">
              <button className="btn btn-light" onClick={() => open('workshop')}>Reserve your seat <Arrow /></button>
              <span className="eyebrow light">Live · 60 min · Next date announced to the list</span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 md:col-start-8 mt-16 md:mt-4">
            <p className="eyebrow light fade">What gets built in the room</p>
            <div className="mt-6 fade d1"><Flow /></div>
          </div>
        </Reveal>

        <div className="mt-20 h-px w-full" style={{ background: 'rgba(246,248,251,0.14)' }} />
        <Reveal className="grid grid-cols-2 md:grid-cols-4">
          {['Real examples', 'Real workflows', 'No-code friendly', 'Implement with Eirik'].map((l, i) => (
            <div key={l} className={`py-6 md:py-8 fade d${i + 1} ${i > 0 ? 'md:pl-8 md:border-l' : ''}`} style={{ borderColor: 'rgba(246,248,251,0.14)' }}>
              <span className="eyebrow light" style={{ fontSize: '0.6rem' }}>0{i + 1}</span>
              <p className="mt-3 text-[1.05rem] md:text-[1.2rem] font-medium tracking-[-0.02em]">{l}</p>
            </div>
          ))}
        </Reveal>
        <div className="h-px w-full" style={{ background: 'rgba(246,248,251,0.14)' }} />
      </div>
    </div>
  );
}

/* ---------- 03 TRANSFORM — Private AI implementation (intimate, warmer) ---------- */
const SEQ = [
  ['Audit', 'Understand your week.'],
  ['Prioritize', 'Find the highest-leverage opportunities.'],
  ['Build', 'Implement the workflows.'],
  ['Reclaim', 'Leave with a system that actually works.'],
];

function Coaching() {
  const { open } = useDrawer();
  return (
    <div id="coaching" className="relative wrap pt-[16vh] pb-[16vh] scroll-mt-20 overflow-hidden">
      <Reveal className="grid-12">
        <div className="col-span-12 md:col-span-6 lg:col-span-5">
          <div className="flex items-baseline gap-4"><span className="eyebrow ink fade">03</span><span className="eyebrow fade d1">Transform · Private AI implementation</span></div>
          <h3 className="display-l mt-6"><Lines lines={['Your work.', 'Your bottlenecks.', 'Your system.']} /></h3>
          <p className="lede mt-8 max-w-[24rem] fade d2">
            Eirik works directly with you to understand where time disappears and build AI systems around your real workflows.
          </p>
          <p className="body mt-5 max-w-[24rem] fade d3">Not a call. Private implementation, built around your actual work, business and goals.</p>
        </div>

        <div className="col-span-12 md:col-span-5 md:col-start-8 mt-14 md:mt-2">
          <ol>
            {SEQ.map(([t, d], i) => (
              <li key={t} className={`ed-row fade d${i + 1}`} style={{ gridTemplateColumns: '2.5rem 1fr' }}>
                <span className="eyebrow">0{i + 1}</span>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <span className="display-s" style={{ fontWeight: 400 }}>{t}</span>
                  <span className="body text-right">{d}</span>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap items-center gap-5 fade d5">
            <button className="btn btn-primary" onClick={() => open('coaching')}>Apply for coaching <Arrow /></button>
            <span className="eyebrow">By application</span>
          </div>
        </div>
      </Reveal>

      {/* Off-grid warm image: the end of the day, close and quiet */}
      <Reveal className="grid-12 mt-[14vh]">
        <div className="col-span-7 md:col-span-4 md:col-start-2">
          <div className="photo warm aspect-[4/5] fade"><img src="/reclaim/desk-warm.jpg" alt="A desk at the end of the day, laptop closed, light through the window" loading="lazy" /></div>
          <p className="eyebrow mt-4 fade d2">Hands. Desk. Screens with actual systems.</p>
        </div>
        <div className="col-span-5 md:col-span-3 md:col-start-8 self-end">
          <p className="eyebrow ink fade d2">Work less.<br />Live more.</p>
          <div className="rule-short mt-4 fade d3" />
        </div>
        <div className="col-span-12 md:col-span-3 md:col-start-11 -mr-[var(--gutter)] mt-8 md:mt-0 self-center">
          <div className="photo warm aspect-[3/4] fade d3"><img src="/reclaim/window-chair.jpg" alt="An empty chair by a window at dusk" loading="lazy" /></div>
        </div>
      </Reveal>
    </div>
  );
}

export default function Ways() {
  return (
    <section className="relative">
      <Reveal className="wrap pt-[16vh]">
        <p className="eyebrow fade">Three ways in</p>
        <h2 className="display-l mt-6"><Lines lines={['Start where', 'you are.']} /></h2>
        <p className="eyebrow mt-8 fade d3">Free → Live → Private. Each step goes deeper.</p>
      </Reveal>
      <div className="wrap"><Playbook /></div>
      <Workshop />
      <Coaching />
    </section>
  );
}
