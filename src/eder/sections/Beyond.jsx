import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lines, Fade, Rule } from '../ui/Reveal';
import { Arrow } from '../ui/Icons';
import { scrollToId } from '../useSmoothScroll';

gsap.registerPlugin(ScrollTrigger);

export default function Beyond() {
  const root = useRef(null);
  const wide = useRef(null);
  const wideImg = useRef(null);
  const video = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(wideImg.current, { yPercent: -12 }, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: wide.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
      gsap.fromTo(video.current, { yPercent: 6 }, {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: { trigger: video.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre" ref={root} className="relative bg-[var(--ink)] pt-24 lg:pt-40">
      <div className="container-x">
        <Fade className="label mb-6 lg:mb-8">Experiências que ficam</Fade>
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <Lines lines={['Muito', 'mais que', 'música.']} className="display-light text-[var(--off)]" />
          </div>
        </div>

        <div className="mt-12 lg:mt-20 lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Editorial copy */}
          <div className="lg:col-span-5 lg:col-start-1 flex flex-col justify-between">
            <div>
              <Rule className="mb-8" />
              <Fade delay={0.1}>
                <p className="lede max-w-[42ch]">
                  Um set do Eder não é só uma sequência de músicas. É a leitura do momento: o sunset que pede calma, a pista que pede explosão, o casamento que pede memória.
                </p>
              </Fade>
              <Fade delay={0.2} className="mt-6">
                <p className="lede max-w-[42ch]">
                  Nascido em Fernando de Noronha, ele carrega o mar para cada palco. E leva a energia do palco para o meio do mar.
                </p>
              </Fade>
              <Fade delay={0.3} className="mt-10">
                <a href="#experiencias" onClick={(e) => { e.preventDefault(); scrollToId('experiencias'); }} className="link-line text-[var(--gold)]">
                  Conhecer as experiências <Arrow />
                </a>
              </Fade>
            </div>
            <Fade delay={0.4} className="hidden lg:block">
              <div className="label text-[0.55rem] leading-[1.9] mt-16">
                Casamentos · Lanchas e barcos<br />Shows e festivais · Casas de show
              </div>
            </Fade>
          </div>

          {/* Portrait video panel — real footage */}
          <div className="lg:col-span-5 lg:col-start-8 mt-14 lg:mt-0">
            <Fade delay={0.15} y={40}>
              <div className="media-frame aspect-[3/4] lg:aspect-[4/5]">
                <video
                  ref={video}
                  className="img-cover scale-[1.15] will-change-transform"
                  src="/eder/video/sea.mp4"
                  poster="/eder/img/sea-03.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Lancha em Fernando de Noronha, saxofone e mar"
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="label text-[0.55rem]">Em alto-mar · Noronha</span>
                <span className="label text-[0.55rem] text-[var(--gold)]">Ao vivo</span>
              </div>
            </Fade>
          </div>
        </div>
      </div>

      {/* Full-bleed crowd statement */}
      <div ref={wide} className="relative mt-24 lg:mt-36 h-[78svh] lg:h-[100svh] overflow-hidden">
        <div ref={wideImg} className="absolute inset-[-14%_0] will-change-transform">
          <img src="/eder/img/crowd.jpg" alt="Multidão de mãos levantadas em frente ao palco" className="img-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,8,11,1)_0%,rgba(5,8,11,0.35)_45%,rgba(5,8,11,0.15)_70%,rgba(5,8,11,0.85)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 container-x pb-14 lg:pb-20 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-end">
          <div className="lg:col-span-7">
            <Lines lines={['Cada set', 'é uma história.']} className="display-md text-[var(--off)]" amount={0.3} />
          </div>
          <Fade delay={0.25} className="lg:col-span-4 lg:col-start-9 mt-6 lg:mt-0">
            <p className="lede !text-[0.95rem] max-w-[36ch]">
              Do sunset à pista. De um casamento incrível a uma lancha em alto-mar. Cada história, uma nova energia.
            </p>
          </Fade>
        </div>
      </div>
    </section>
  );
}
