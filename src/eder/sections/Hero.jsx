import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Arrow, ArrowDown } from '../ui/Icons';
import { scrollToId } from '../useSmoothScroll';

gsap.registerPlugin(ScrollTrigger);
const EASE = [0.16, 1, 0.3, 1];

export default function Hero({ ready }) {
  const root = useRef(null);
  const media = useRef(null);
  const content = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(media.current, {
        yPercent: 16,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(content.current, {
        yPercent: -30,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: '75% top', scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const go = (id) => (e) => { e.preventDefault(); scrollToId(id); };

  return (
    <section id="inicio" ref={root} className="relative h-[100svh] min-h-[620px] overflow-hidden bg-[var(--ink)]">
      {/* Media */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={ready ? { clipPath: 'inset(0% 0 0 0)' } : {}}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          ref={media}
          className="absolute inset-0 will-change-transform"
          initial={{ scale: 1.18 }}
          animate={ready ? { scale: 1 } : {}}
          transition={{ duration: 2.2, ease: EASE }}
        >
          <picture>
            <source media="(min-width: 1024px)" srcSet="/eder/img/hero-desktop.jpg" />
            <img src="/eder/img/hero-mobile.jpg" alt="Eder Noronha tocando ao vivo, com o mar de Fernando de Noronha ao fundo" className="img-cover object-[50%_28%] lg:object-[50%_50%]" fetchPriority="high" />
          </picture>
        </motion.div>
        {/* Legibility gradients — warm to ink */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,8,11,0.96)_0%,rgba(5,8,11,0.55)_32%,rgba(5,8,11,0.05)_62%,rgba(5,8,11,0.25)_100%)]" />
        <div className="absolute inset-0 hidden lg:block bg-[linear-gradient(to_right,rgba(5,8,11,0.25)_0%,rgba(5,8,11,0)_40%,rgba(5,8,11,0.35)_100%)]" />
      </motion.div>

      {/* Meta — top */}
      <motion.div
        className="absolute inset-x-0 top-[84px] lg:top-[112px] container-x flex justify-between"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className="label text-[0.58rem] leading-[1.7]">
          Fernando de Noronha<br />Brasil
        </div>
        <div className="label text-[0.58rem] leading-[1.7] text-right">
          DJ &amp; performer<br />
          <span className="text-[var(--gold)]">Ao vivo</span>
        </div>
      </motion.div>

      {/* Content — bottom */}
      <div ref={content} className="absolute inset-x-0 bottom-0 container-x pb-9 lg:pb-14 will-change-transform">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-10">
          <div className="lg:flex-none">
            <h1 className="display-xl text-[var(--off)]">
              <span className="block overflow-hidden pt-[0.16em] -mt-[0.16em] pb-[0.04em]">
                <motion.span className="block" initial={{ y: '105%' }} animate={ready ? { y: '0%' } : {}} transition={{ duration: 1.3, ease: EASE, delay: 0.55 }}>
                  Eder
                </motion.span>
              </span>
              <span className="block overflow-hidden pt-[0.12em] -mt-[0.12em] pb-[0.06em]">
                <motion.span className="block" initial={{ y: '105%' }} animate={ready ? { y: '0%' } : {}} transition={{ duration: 1.3, ease: EASE, delay: 0.68 }}>
                  Noronha
                </motion.span>
              </span>
            </h1>
            <motion.p
              className="tagline text-[var(--gold)] mt-4 lg:mt-6"
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: EASE, delay: 1.05 }}
            >
              Do mar ao palco.
            </motion.p>
          </div>

          <motion.div
            className="mt-7 lg:mt-0 lg:pb-3 lg:w-[300px] xl:w-[340px] lg:flex-none"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: EASE, delay: 1.2 }}
          >
            <p className="caps-copy max-w-[30ch] lg:max-w-[28ch]">
              Música, liberdade e boas energias em qualquer horizonte.
            </p>
            <div className="mt-6 flex items-center gap-6">
              <a href="#contato" onClick={go('contato')} className="btn btn-gold">
                Contratar <Arrow />
              </a>
              <a href="#agenda" onClick={go('agenda')} className="link-line text-[var(--off-60)] hover:text-[var(--off)] transition-colors">
                Ver agenda <Arrow />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.button
          type="button"
          onClick={go('sobre')}
          className="hidden lg:flex absolute right-[var(--gutter)] bottom-14 flex-col items-center gap-3 text-[var(--off-40)] hover:text-[var(--off)] transition-colors"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.6 }}
          aria-label="Rolar para baixo"
        >
          <span className="label text-[0.52rem] [writing-mode:vertical-rl] rotate-180">Scroll</span>
          <ArrowDown className="w-3 h-3 animate-[float_2.4s_ease-in-out_infinite]" />
        </motion.button>
      </div>

      <style>{`@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }`}</style>
    </section>
  );
}
