import React from 'react';
import { Lines, Fade, Rule } from '../ui/Reveal';
import { Arrow, Instagram, Youtube, Spotify, Mail } from '../ui/Icons';
import { scrollToId } from '../useSmoothScroll';

const EMAIL = 'djedernoronha@gmail.com';
const IG = 'https://instagram.com/djedernoronha';

export default function Contact() {
  return (
    <footer id="contato" className="relative bg-[var(--ink)] overflow-hidden">
      {/* Warm horizon — the only light in the room */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(196,137,71,0.22)_0%,rgba(196,137,71,0)_60%)] pointer-events-none" />

      <div className="relative container-x pt-28 lg:pt-44 pb-16 lg:pb-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <Fade className="label mb-6">Contato</Fade>
            <Lines lines={['Vamos criar', 'o próximo', 'momento?']} className="display-light text-[var(--off)]" />
          </div>
          <div className="lg:col-span-4 mt-10 lg:mt-0 lg:pt-4 flex flex-col justify-end">
            <Fade delay={0.2}>
              <p className="lede !text-[0.95rem] max-w-[34ch]">Casamentos, lanchas, shows e eventos. Conte a ideia e a data. A resposta vem rápida.</p>
            </Fade>
            <Fade delay={0.3} className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href={`${IG}`} target="_blank" rel="noreferrer" className="btn btn-solid">
                Chamar no Instagram <Arrow />
              </a>
              <a href={`mailto:${EMAIL}?subject=Contrata%C3%A7%C3%A3o%20%E2%80%94%20%C3%89der%20Noronha`} className="btn">
                Enviar e-mail <Arrow />
              </a>
            </Fade>
          </div>
        </div>

        <Rule className="mt-20 lg:mt-28" />

        <div className="mt-8 lg:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <p className="label text-[0.55rem] mb-3">E-mail</p>
            <a href={`mailto:${EMAIL}`} className="font-text text-[0.9rem] text-[var(--off)] hover:text-[var(--gold)] transition-colors break-all">{EMAIL}</a>
          </div>
          <div>
            <p className="label text-[0.55rem] mb-3">Instagram</p>
            <a href={IG} target="_blank" rel="noreferrer" className="font-text text-[0.9rem] text-[var(--off)] hover:text-[var(--gold)] transition-colors">@djedernoronha</a>
          </div>
          <div>
            <p className="label text-[0.55rem] mb-3">Base</p>
            <p className="font-text text-[0.9rem] text-[var(--off)]">Fernando de Noronha, PE</p>
          </div>
          <div>
            <p className="label text-[0.55rem] mb-3">Atende</p>
            <p className="font-text text-[0.9rem] text-[var(--off)]">Todo o Brasil e exterior</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative container-x py-8 border-t border-[var(--off-10)] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <button type="button" onClick={() => scrollToId('inicio')} className="wordmark text-left text-[0.72rem] leading-[0.95] tracking-[0.06em]" aria-label="Voltar ao topo">
          <span className="block">Eder</span>
          <span className="block">Noronha</span>
        </button>
        <p className="label text-[0.55rem]">Do mar ao palco · Música, liberdade, boas energias</p>
        <div className="flex items-center gap-5 text-[var(--off-60)]">
          <a href={IG} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-[var(--gold)] transition-colors"><Instagram className="w-[18px] h-[18px]" /></a>
          <a href="https://www.youtube.com/results?search_query=dj+eder+noronha" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-[var(--gold)] transition-colors"><Youtube className="w-[18px] h-[18px]" /></a>
          <a href="https://open.spotify.com/search/eder%20noronha" target="_blank" rel="noreferrer" aria-label="Spotify" className="hover:text-[var(--gold)] transition-colors"><Spotify className="w-[18px] h-[18px]" /></a>
          <a href={`mailto:${EMAIL}`} aria-label="E-mail" className="hover:text-[var(--gold)] transition-colors"><Mail className="w-[18px] h-[18px]" /></a>
        </div>
        <p className="label text-[0.5rem]">© {new Date().getFullYear()} Eder Noronha</p>
      </div>
    </footer>
  );
}
