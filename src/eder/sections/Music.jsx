import React from 'react';
import { Lines, Fade } from '../ui/Reveal';
import { Arrow, Spotify, Youtube, SoundCloud, AppleMusic, Play } from '../ui/Icons';

const PLATFORMS = [
  { name: 'Spotify', Icon: Spotify, href: 'https://open.spotify.com/search/eder%20noronha' },
  { name: 'YouTube', Icon: Youtube, href: 'https://www.youtube.com/results?search_query=dj+eder+noronha' },
  { name: 'SoundCloud', Icon: SoundCloud, href: 'https://soundcloud.com/search?q=eder%20noronha' },
  { name: 'Apple Music', Icon: AppleMusic, href: 'https://music.apple.com/br/search?term=eder%20noronha' },
];

export default function Music() {
  return (
    <section id="musica" className="relative bg-[var(--ink)]">
      <div className="lg:grid lg:grid-cols-12">
        {/* B&W portrait */}
        <div className="relative lg:col-span-6 h-[70svh] lg:h-[100svh] overflow-hidden">
          <img src="/eder/img/stage-bw.jpg" alt="Eder Noronha no palco, em preto e branco" className="img-cover object-[55%_20%]" loading="lazy" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,8,11,0.9)_0%,rgba(5,8,11,0.1)_45%,rgba(5,8,11,0.2)_100%)] lg:bg-[linear-gradient(to_right,rgba(5,8,11,0.1)_0%,rgba(5,8,11,0)_60%,rgba(5,8,11,0.9)_100%)]" />
          <a
            href="https://www.youtube.com/results?search_query=dj+eder+noronha"
            target="_blank"
            rel="noreferrer"
            className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[76px] h-[76px] lg:w-[96px] lg:h-[96px] rounded-full border border-[var(--off-40)] flex items-center justify-center text-[var(--off)] backdrop-blur-[2px] transition-colors duration-500 hover:border-[var(--gold)] hover:text-[var(--gold)]"
            aria-label="Assistir no YouTube"
          >
            <Play className="w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-500 group-hover:scale-110" />
          </a>
          <div className="absolute left-[var(--gutter)] bottom-8 label text-[0.55rem] leading-[1.9]">
            Música que te leva<br />mais longe
          </div>
        </div>

        {/* Platforms */}
        <div className="lg:col-span-6 container-x py-20 lg:py-0 lg:pl-[clamp(40px,6vw,96px)] flex flex-col justify-center">
          <Fade className="label mb-6">Ouça agora</Fade>
          <Lines lines={['Música']} className="display-light text-[var(--off)]" />
          <Fade delay={0.15} className="mt-8">
            <p className="lede !text-[0.95rem] max-w-[36ch]">Sets, remixes e ao vivos. A energia do palco onde você estiver.</p>
          </Fade>

          <ul className="mt-12 border-t border-[var(--off-20)] max-w-[520px]">
            {PLATFORMS.map((p, i) => (
              <Fade key={p.name} delay={0.1 + i * 0.06} y={12} amount={0.5}>
                <li>
                  <a href={p.href} target="_blank" rel="noreferrer" className="group flex items-center gap-5 py-5 border-b border-[var(--off-10)] transition-colors duration-500 hover:border-[rgba(230,180,104,0.5)]">
                    <p.Icon className="w-5 h-5 text-[var(--off-60)] transition-colors duration-500 group-hover:text-[var(--gold)]" />
                    <span className="font-display font-400 text-[0.95rem] lg:text-[1.05rem] uppercase tracking-[0.08em] text-[var(--off)] flex-1">{p.name}</span>
                    <Arrow className="w-3.5 h-3.5 text-[var(--off-40)] transition-all duration-500 group-hover:text-[var(--gold)] group-hover:translate-x-1" />
                  </a>
                </li>
              </Fade>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
