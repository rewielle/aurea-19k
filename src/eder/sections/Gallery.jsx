import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Fade } from '../ui/Reveal';
import { Arrow, Instagram } from '../ui/Icons';

gsap.registerPlugin(ScrollTrigger);

// Varied heights give the strip an editorial rhythm.
const SHOTS = [
  { src: '/eder/img/ig-01.jpg', alt: 'Festa de barco, todos de branco', h: 'tall', cap: 'Barco · Noronha' },
  { src: '/eder/img/sea-01.jpg', alt: 'Praia com coqueiros e lanchas', h: 'short', cap: 'Litoral' },
  { src: '/eder/img/show-2.jpg', alt: 'Multidão em frente ao palco à noite', h: 'mid', cap: 'Festival' },
  { src: '/eder/img/ig-07.jpg', alt: 'Éder chegando a Noronha', h: 'tall', cap: 'Chegada' },
  { src: '/eder/img/lancha-sunset.jpg', video: '/eder/video/lancha-sunset.mp4', alt: 'Set ao pôr do sol na lancha', h: 'mid', cap: 'Sunset · Lancha' },
  { src: '/eder/img/ig-09.jpg', alt: 'Éder de pé sobre a pista lotada', h: 'short', cap: 'Pista' },
  { src: '/eder/img/stage-white.jpg', alt: 'Éder de branco no palco com microfone', h: 'tall', cap: 'Palco' },
  { src: '/eder/img/ig-11.jpg', alt: 'Público dançando no barco', h: 'mid', cap: 'Barco' },
  { src: '/eder/img/sea-07.jpg', alt: 'Lancha ancorada em águas claras', h: 'short', cap: 'Alto-mar' },
  { src: '/eder/img/club-red.jpg', video: '/eder/video/club.mp4', alt: 'Casa de show com luz vermelha', h: 'tall', cap: 'Casa de show' },
  { src: '/eder/img/ig-12.jpg', alt: 'Amigos na trilha em Noronha', h: 'mid', cap: 'Ilha' },
  { src: '/eder/img/ig-03.jpg', alt: 'Brinde no barco', h: 'short', cap: 'Celebração' },
];

const H = {
  tall: 'h-[62svh] lg:h-[70vh] aspect-[4/5]',
  mid: 'h-[52svh] lg:h-[56vh] aspect-[4/5]',
  short: 'h-[40svh] lg:h-[44vh] aspect-[5/4]',
};

export default function Gallery() {
  const root = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const t = track.current;
      const getDistance = () => t.scrollWidth - window.innerWidth;
      const tween = gsap.to(t, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      return () => tween.scrollTrigger?.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="galeria" ref={root} className="relative bg-[var(--deep)] overflow-hidden lg:h-[100svh] lg:flex lg:flex-col lg:justify-center">
      <div className="container-x pt-20 lg:pt-0 pb-8 lg:pb-8 flex items-end justify-between gap-6">
        <div>
          <Fade className="label mb-3">No Instagram</Fade>
          <Fade delay={0.1}><p className="display-md !text-[1.35rem] lg:!text-[1.9rem] text-[var(--off)]">@djedernoronha</p></Fade>
        </div>
        <Fade delay={0.2}>
          <a href="https://instagram.com/djedernoronha" target="_blank" rel="noreferrer" className="link-line text-[var(--off-60)] hover:text-[var(--off)] transition-colors whitespace-nowrap">
            <Instagram className="w-4 h-4" /> Seguir <Arrow />
          </a>
        </Fade>
      </div>

      {/* Mobile: native horizontal scroll. Desktop: pinned, scroll-driven filmstrip. */}
      <div className="overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory lg:snap-none pb-16 lg:pb-0">
        <div ref={track} className="flex items-end gap-3 lg:gap-5 px-[var(--gutter)] w-max will-change-transform">
          {SHOTS.map((s, i) => (
            <figure key={s.src} className={`snap-start shrink-0 ${H[s.h]} ${i % 3 === 1 ? 'lg:mb-16' : i % 3 === 2 ? 'lg:mb-6' : ''}`}>
              <div className="media-frame w-full h-full rounded-[4px]">
                {s.video ? (
                  <video className="img-cover" src={s.video} poster={s.src} autoPlay muted loop playsInline preload="none" aria-label={s.alt} />
                ) : (
                  <img src={s.src} alt={s.alt} className="img-cover" loading="lazy" draggable="false" />
                )}
              </div>
              <figcaption className="label text-[0.5rem] mt-3">{s.cap}</figcaption>
            </figure>
          ))}
          <div className="shrink-0 w-[var(--gutter)]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
