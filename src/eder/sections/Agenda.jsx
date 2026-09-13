import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lines, Fade } from '../ui/Reveal';
import { Arrow } from '../ui/Icons';
import { scrollToId } from '../useSmoothScroll';

gsap.registerPlugin(ScrollTrigger);

// Placeholder dates — replace with the real calendar before launch.
const EVENTS = [
  { day: '26', month: 'Set', city: 'Fernando de Noronha, PE', venue: 'Sunset em alto-mar' },
  { day: '04', month: 'Out', city: 'Recife, PE', venue: 'Casamento privado' },
  { day: '18', month: 'Out', city: 'Porto de Galinhas, PE', venue: 'Beach club' },
  { day: '08', month: 'Nov', city: 'Trancoso, BA', venue: 'Evento privado' },
  { day: '22', month: 'Nov', city: 'São Paulo, SP', venue: 'Casa de show' },
];

export default function Agenda() {
  const root = useRef(null);
  const bg = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(bg.current, { yPercent: -10 }, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="agenda" ref={root} className="relative overflow-hidden bg-[var(--navy)]">
      <div ref={bg} className="absolute inset-[-12%_0] will-change-transform">
        <img src="/eder/img/dois-irmaos.jpg" alt="" className="img-cover object-[50%_45%]" loading="lazy" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,16,24,0.92)_0%,rgba(7,16,24,0.6)_35%,rgba(7,16,24,0.82)_100%)]" />
      <div className="absolute inset-0 hidden lg:block bg-[linear-gradient(to_right,rgba(7,16,24,0.1)_0%,rgba(7,16,24,0.7)_55%,rgba(7,16,24,0.9)_100%)]" />

      <div className="relative container-x py-24 lg:py-40 lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Fade className="label mb-6">Próximos encontros</Fade>
          <Lines lines={['Agenda']} className="display-light text-[var(--off)]" />
          <Fade delay={0.2} className="mt-8 lg:mt-12">
            <p className="lede !text-[0.95rem] max-w-[34ch]">Sunsets, casamentos e pistas pelo Brasil. Datas abertas para novos projetos.</p>
          </Fade>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 mt-14 lg:mt-3">
          <ul className="border-t border-[var(--off-20)]">
            {EVENTS.map((e, i) => (
              <Fade key={`${e.day}${e.month}${e.city}`} delay={i * 0.06} amount={0.5} y={12}>
                <li className="group grid grid-cols-[3.6rem_1fr_auto] lg:grid-cols-[4.5rem_1fr_1fr_auto] items-center gap-4 lg:gap-8 py-5 lg:py-6 border-b border-[var(--off-10)] transition-colors duration-500 hover:border-[rgba(230,180,104,0.5)]">
                  <div className="font-display leading-none">
                    <span className="block text-[1.5rem] lg:text-[1.9rem] font-light text-[var(--off)] tabular-nums">{e.day}</span>
                    <span className="label text-[0.55rem] block mt-1">{e.month}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-text font-500 text-[0.92rem] lg:text-[1rem] text-[var(--off)] truncate">{e.city}</p>
                    <p className="label text-[0.55rem] mt-1 lg:hidden">{e.venue}</p>
                  </div>
                  <p className="hidden lg:block label text-[0.58rem] tracking-[0.22em]">{e.venue}</p>
                  <a href="#contato" onClick={(ev) => { ev.preventDefault(); scrollToId('contato'); }} className="w-9 h-9 rounded-full border border-[var(--off-20)] flex items-center justify-center text-[var(--off-60)] transition-all duration-500 group-hover:border-[var(--gold)] group-hover:text-[var(--gold)]" aria-label={`Consultar ${e.city}`}>
                    <Arrow className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-[2px]" />
                  </a>
                </li>
              </Fade>
            ))}
          </ul>
          <Fade delay={0.3} className="mt-10">
            <a href="#contato" onClick={(ev) => { ev.preventDefault(); scrollToId('contato'); }} className="btn">
              Consultar uma data <Arrow />
            </a>
          </Fade>
        </div>
      </div>
    </section>
  );
}
