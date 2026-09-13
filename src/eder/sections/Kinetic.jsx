import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Real photographs: Instagram, show photography and frames from footage at sea.
const FRAMES = [
  { src: '/eder/img/ig-01.jpg', alt: 'Festa de barco, todos de branco' },
  { src: '/eder/img/sea-03.jpg', alt: 'Lancha em alto-mar' },
  { src: '/eder/img/show-3.jpg', alt: 'Éder no palco com microfone' },
  { src: '/eder/img/ig-06.jpg', alt: 'Éder tocando no barco' },
  { src: '/eder/img/lancha-sunset.jpg', alt: 'Set ao pôr do sol na lancha com saxofone' },
  { src: '/eder/img/ig-05.jpg', alt: 'Chegada em Fernando de Noronha' },
  { src: '/eder/img/stage-blue.jpg', alt: 'Show com luzes azuis e público' },
  { src: '/eder/img/ig-08.jpg', alt: 'Amigos no barco' },
  { src: '/eder/img/club-red.jpg', alt: 'Casa de show lotada' },
  { src: '/eder/img/ig-04.jpg', alt: 'Éder com as aves de Noronha' },
  { src: '/eder/img/sea-05.jpg', alt: 'Saxofone na proa' },
  { src: '/eder/img/ig-10.jpg', alt: 'Festa no barco' },
  { src: '/eder/img/show-1.jpg', alt: 'Palco com telão Éder Noronha' },
  { src: '/eder/img/ig-02.jpg', alt: 'Mergulho em Noronha' },
];

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function Kinetic() {
  const root = useRef(null);
  const field = useRef(null);
  const copy = useRef(null);
  const items = useRef([]);

  useEffect(() => {
    const N = FRAMES.length;
    const els = items.current;
    let vw = 0; let W = 0; let H = 0; let S = 0; let R = 0;

    const measure = () => {
      vw = window.innerWidth;
      const vh = window.innerHeight;
      const desktop = vw >= 1024;
      W = desktop ? 104 : Math.max(52, Math.min(64, vw * 0.15));
      H = W * 1.25;
      S = W * 1.26;
      R = desktop ? Math.min(vh * 0.36, 330, vw * 0.22) : Math.min(vw * 0.4, 170);
      els.forEach((el) => {
        if (!el) return;
        el.style.width = `${W}px`;
        el.style.height = `${H}px`;
        el.style.marginLeft = `${-W / 2}px`;
        el.style.marginTop = `${-H / 2}px`;
      });
    };

    const render = (p) => {
      // Phase A 0→0.38 line→circle | B 0.38→0.62 hold | C 0.62→1 circle→line
      const a = clamp01(p / 0.38);
      const c = clamp01((p - 0.62) / 0.38);
      const rot = p * 0.9; // slow continuous rotation of the ring
      const drift = a < 1 ? gsap.utils.interpolate(vw * 0.55, 0, easeInOut(a)) : gsap.utils.interpolate(0, -vw * 0.55, easeInOut(c));
      const delta = 0.016;
      let avg = 0;
      for (let i = 0; i < N; i += 1) {
        const el = els[i];
        if (!el) continue;
        const k = (N - 1) * delta;
        // Per-item cascade for organic morph
        const ai = easeInOut(clamp01((a - i * delta) / (1 - k)));
        const ci = easeInOut(clamp01((c - (N - 1 - i) * delta) / (1 - k)));
        const m = p < 0.5 ? ai : 1 - ci;
        avg += m;
        const lineX = (i - (N - 1) / 2) * S + drift;
        const theta = (i / N) * Math.PI * 2 - Math.PI / 2 + rot;
        const cx = Math.cos(theta) * R;
        const cy = Math.sin(theta) * R;
        const x = lineX + (cx - lineX) * m;
        const y = cy * m;
        const sc = 1 - 0.06 * m;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${sc})`;
      }
      avg /= N;
      const o = clamp01((avg - 0.72) / 0.28);
      if (copy.current) {
        copy.current.style.opacity = o;
        copy.current.style.transform = `translate3d(0, ${(1 - o) * 14}px, 0)`;
      }
    };

    measure();
    render(0);

    const st = ScrollTrigger.create({
      trigger: root.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => render(self.progress),
    });
    const onResize = () => { measure(); render(st.progress); };
    window.addEventListener('resize', onResize);
    return () => { st.kill(); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <section id="cenarios" ref={root} className="relative bg-[var(--navy)] h-[300svh] lg:h-[340svh]" aria-label="Um som, muitos cenários">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Depth: ocean-blue field, no decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,52,72,0.55)_0%,rgba(10,24,34,0)_60%)]" />

        {/* Centre copy */}
        <div ref={copy} className="absolute inset-0 flex items-center justify-center text-center pointer-events-none will-change-[opacity,transform]" style={{ opacity: 0 }}>
          <div>
            <p className="label label-gold mb-3">Um som.</p>
            <h2 className="display-md text-[var(--off)] leading-[1.05]">
              <span className="block">Muitos</span>
              <span className="block">cenários.</span>
            </h2>
          </div>
        </div>

        {/* Frames */}
        <div ref={field} className="absolute left-1/2 top-1/2 w-0 h-0">
          {FRAMES.map((f, i) => (
            <div
              key={f.src}
              ref={(el) => { items.current[i] = el; }}
              className="absolute left-0 top-0 rounded-[6px] overflow-hidden will-change-transform shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)]"
            >
              <img src={f.src} alt={f.alt} className="img-cover" loading="lazy" draggable="false" />
              <span className="absolute inset-0 rounded-[6px] shadow-[inset_0_0_0_1px_rgba(242,241,237,0.08)]" />
            </div>
          ))}
        </div>

        {/* Section caption */}
        <div className="absolute inset-x-0 bottom-8 lg:bottom-10 container-x flex items-center justify-between">
          <span className="label text-[0.55rem]">Casamentos · Barcos · Palco</span>
          <span className="label text-[0.55rem]">Fotos reais</span>
        </div>
      </div>
    </section>
  );
}
