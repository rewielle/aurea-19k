import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Arrow, ArrowDown } from '../ui/Icons';
import { scrollToId } from '../useSmoothScroll';

gsap.registerPlugin(ScrollTrigger);
const EASE = [0.16, 1, 0.3, 1];

/**
 * Hero em dois tempos.
 * 0 — a imagem: Eder no palco, Fernando de Noronha ao fundo.
 * scroll — o sol baixa, o palco escurece e a metade de Noronha cresce
 *          até virar um vídeo real do mar, com texto. Rolando de volta, tudo retorna.
 */
export default function Hero({ ready }) {
  const root = useRef(null);
  const base = useRef(null);
  const dusk = useRef(null);
  const sun = useRef(null);
  const panel = useRef(null);
  const panelCopy = useRef(null);
  const content = useRef(null);
  const meta = useRef(null);
  const cue = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const build = (desktop) => {
      const startClip = desktop ? 'inset(0% 0% 40% 50%)' : 'inset(0% 0% 54% 0%)';
      gsap.set(panel.current, { clipPath: startClip, opacity: 0 });
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 0.8 },
      });
      // 1. O sol baixa e o palco escurece
      tl.to(sun.current, { yPercent: 60, opacity: 0.15, duration: 0.38 }, 0)
        .to(dusk.current, { opacity: 0.6, duration: 0.38 }, 0)
        .to(base.current, { filter: 'brightness(0.72) saturate(0.85)', scale: 1.06, duration: 0.5 }, 0)
        // 2. Noronha cresce e vira vídeo
        .to(panel.current, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.42 }, 0.28)
        .to(content.current, { yPercent: -18, opacity: 0, duration: 0.3 }, 0.3)
        .to(meta.current, { opacity: 0, duration: 0.2 }, 0.3)
        .to(cue.current, { opacity: 0, duration: 0.15 }, 0.1)
        // 3. Texto sobre o mar
        .fromTo(panelCopy.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.25 }, 0.66);
      return () => tl.scrollTrigger?.kill();
    };
    mm.add('(min-width: 1024px)', () => build(true));
    mm.add('(max-width: 1023px)', () => build(false));
    return () => mm.revert();
  }, []);

  const go = (id) => (e) => { e.preventDefault(); scrollToId(id); };

  return (
    <section id="inicio" ref={root} className="relative h-[240svh] bg-[var(--ink)]">
      <div className="sticky top-0 h-[100svh] min-h-[620px] overflow-hidden">
        {/* Imagem base — palco + Noronha */}
        <motion.div
          className="absolute inset-0"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={ready ? { clipPath: 'inset(0% 0 0 0)' } : {}}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            ref={base}
            className="absolute inset-0 will-change-transform origin-center"
            initial={{ scale: 1.16 }}
            animate={ready ? { scale: 1 } : {}}
            transition={{ duration: 2.2, ease: EASE }}
          >
            <picture>
              <source media="(min-width: 1024px)" srcSet="/eder/img/hero-desktop.jpg" />
              <img src="/eder/img/hero-mobile.jpg" alt="Eder Noronha tocando ao vivo, com o mar de Fernando de Noronha ao fundo" className="img-cover object-[50%_50%]" fetchPriority="high" />
            </picture>
          </motion.div>
          {/* Sol: brilho quente que desce com o scroll */}
          <div
            ref={sun}
            className="absolute w-[70vw] h-[70vw] lg:w-[34vw] lg:h-[34vw] rounded-full pointer-events-none mix-blend-screen right-[-18vw] top-[10svh] lg:right-[-4vw] lg:top-[12svh] bg-[radial-gradient(circle,rgba(230,180,104,0.55)_0%,rgba(196,137,71,0.18)_35%,rgba(196,137,71,0)_62%)]"
          />
          {/* Anoitecer */}
          <div ref={dusk} className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,16,24,0.15)_0%,rgba(7,16,24,0.85)_100%)] opacity-0" />
          {/* Legibilidade */}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,8,11,0.96)_0%,rgba(5,8,11,0.5)_30%,rgba(5,8,11,0.05)_58%,rgba(5,8,11,0.25)_100%)]" />
          <div className="absolute inset-0 hidden lg:block bg-[linear-gradient(to_right,rgba(5,8,11,0.25)_0%,rgba(5,8,11,0)_40%,rgba(5,8,11,0.3)_100%)]" />
        </motion.div>

        {/* Noronha — nasce da metade do mar e toma a tela como vídeo */}
        <div ref={panel} className="absolute inset-0 will-change-[clip-path,opacity]" style={{ opacity: 0 }} aria-hidden="true">
          <video
            className="img-cover"
            src="/eder/video/sea.mp4"
            poster="/eder/img/sea-01.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,8,11,0.9)_0%,rgba(5,8,11,0.25)_45%,rgba(5,8,11,0.35)_100%)]" />
          <div ref={panelCopy} className="absolute inset-x-0 bottom-0 container-x pb-16 lg:pb-24 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-end opacity-0">
            <div className="lg:col-span-8">
              <p className="label label-gold mb-4">Fernando de Noronha</p>
              <h2 className="display-light text-[var(--off)]">
                <span className="block">Onde tudo</span>
                <span className="block">começa.</span>
              </h2>
            </div>
            <div className="lg:col-span-4 mt-6 lg:mt-0 lg:pb-2">
              <p className="caps-copy max-w-[30ch]">Mar, horizonte e liberdade. É daqui que sai a energia de cada set.</p>
            </div>
          </div>
        </div>

        {/* Meta — topo */}
        <motion.div
          ref={meta}
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

        {/* Conteúdo — base */}
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
        </div>

        {/* Scroll */}
        <motion.button
          ref={cue}
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
