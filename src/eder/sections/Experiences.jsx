import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lines, Fade } from '../ui/Reveal';
import { Arrow } from '../ui/Icons';
import { scrollToId } from '../useSmoothScroll';

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    n: '01',
    title: ['Casamentos', 'de alto padrão'],
    text: 'Trilha sonora para o dia mais importante. Da cerimônia ao último brinde, com leitura fina de cada momento.',
    tags: 'Cerimônia · Recepção · After',
    img: '/eder/img/pico-sunset.jpg',
    alt: 'Pôr do sol sobre o Morro do Pico, Fernando de Noronha',
    pos: 'object-[50%_60%]',
  },
  {
    n: '02',
    title: ['Lanchas', 'e barcos'],
    text: 'A música também navega. Sets em alto-mar com o Morro do Pico no horizonte e o sol como iluminação.',
    tags: 'Sunset · Passeios privados · Noronha',
    img: '/eder/img/lancha.jpg',
    alt: 'Éder e amigos dançando em uma lancha com Fernando de Noronha ao fundo',
    pos: 'object-[50%_30%]',
  },
  {
    n: '03',
    title: ['Shows', 'e festivais'],
    text: 'Grandes públicos, grandes energias. Palco, banda e microfone na mão: um show completo.',
    tags: 'Palco · Banda · Grandes públicos',
    img: '/eder/img/show-1.jpg',
    alt: 'Éder Noronha cantando no palco de um festival',
    pos: 'object-[55%_40%]',
  },
  {
    n: '04',
    title: ['Eventos', 'e casas de show'],
    text: 'Da pista ao after. Presença de palco em casas de show, eventos privados e corporativos.',
    tags: 'Clubs · Privados · Corporativo',
    img: '/eder/img/club-stage.jpg',
    alt: 'Éder no palco de uma casa de show lotada',
    pos: 'object-[50%_35%]',
  },
];

export default function Experiences() {
  const root = useRef(null);
  const panels = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      panels.current.forEach((panel, i) => {
        const next = panels.current[i + 1];
        if (!panel || !next) return;
        const img = panel.querySelector('[data-img]');
        const veil = panel.querySelector('[data-veil]');
        gsap.to(img, { scale: 0.94, ease: 'none', scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true } });
        gsap.to(veil, { opacity: 0.75, ease: 'none', scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experiencias" ref={root} className="relative bg-[var(--ink)]">
      <div className="container-x pt-24 lg:pt-36 pb-16 lg:pb-24 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-end">
        <div className="lg:col-span-8">
          <Fade className="label mb-6">Experiências</Fade>
          <Lines lines={['Onde o som', 'acontece.']} className="display-light text-[var(--off)]" />
        </div>
        <Fade delay={0.2} className="lg:col-span-4 mt-8 lg:mt-0">
          <p className="lede !text-[0.95rem] max-w-[36ch]">Quatro universos, uma mesma presença. Cada um com o seu ritmo, a sua luz e o seu público.</p>
        </Fade>
      </div>

      <div className="relative">
        {CHAPTERS.map((c, i) => (
          <div key={c.n} ref={(el) => { panels.current[i] = el; }} className={`relative ${i === CHAPTERS.length - 1 ? 'h-[100svh]' : 'h-[165svh]'}`} style={{ zIndex: i + 1 }}>
          <article className="sticky top-0 h-[100svh] overflow-hidden bg-[var(--ink)]">
            <div data-img className="absolute inset-0 will-change-transform origin-center">
              <img src={c.img} alt={c.alt} className={`img-cover ${c.pos}`} loading="lazy" />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,8,11,0.95)_0%,rgba(5,8,11,0.45)_40%,rgba(5,8,11,0.1)_70%,rgba(5,8,11,0.4)_100%)]" />
            </div>
            <div data-veil className="absolute inset-0 bg-[var(--ink)] opacity-0 pointer-events-none" />

            {/* Chapter number */}
            <div className="absolute top-[88px] lg:top-[112px] right-[var(--gutter)] font-display font-light text-[3.2rem] lg:text-[6rem] leading-none text-[var(--off-20)] tabular-nums">
              {c.n}
            </div>

            <div className="absolute inset-x-0 bottom-0 container-x pb-12 lg:pb-16 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-end">
              <div className="lg:col-span-7">
                <Fade className="label label-gold mb-4" once={false} amount={0.6}>Capítulo {c.n}</Fade>
                <Lines lines={c.title} className="display-md !text-[2rem] lg:!text-[3.4rem] text-[var(--off)]" once={false} amount={0.6} />
              </div>
              <div className="lg:col-span-4 lg:col-start-9 mt-6 lg:mt-0">
                <Fade once={false} amount={0.6} delay={0.15}>
                  <p className="lede !text-[0.95rem] max-w-[38ch]">{c.text}</p>
                  <p className="label text-[0.55rem] mt-5">{c.tags}</p>
                </Fade>
              </div>
            </div>
          </article>
          </div>
        ))}
      </div>

      <div className="relative z-10 bg-[var(--ink)] container-x py-16 lg:py-24 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <Fade><p className="lede max-w-[40ch]">Tem um evento em mente? Cada projeto começa com uma conversa.</p></Fade>
        <Fade delay={0.15}>
          <a href="#contato" onClick={(e) => { e.preventDefault(); scrollToId('contato'); }} className="btn btn-gold">
            Consultar disponibilidade <Arrow />
          </a>
        </Fade>
      </div>
    </section>
  );
}
