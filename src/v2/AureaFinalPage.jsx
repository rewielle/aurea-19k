import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, Compass } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AureaFinalPage({ onOpenModal }) {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const exitSectionRef = useRef(null);

  // State Machine: 'loading' | 'playing' | 'finishing' | 'completed' | 'exiting'
  const [heroState, setHeroState] = useState('loading');

  // Text choreography states synchronized with video playback timeline
  const [showHeadline, setShowHeadline] = useState(false);
  const [showSupporting, setShowSupporting] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  // 1. VIDEO PLAYBACK ENGINE (Plays naturally from 0s to end using video_aurea_hero.mp4)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => {
      setHeroState('playing');
    };

    const onTimeUpdate = () => {
      const t = video.currentTime;

      // Timed Text Choreography Triggering based strictly on video_aurea_hero.mp4 timeline
      if (t >= 1.2 && !showHeadline) setShowHeadline(true);
      if (t >= 3.5 && !showSupporting) setShowSupporting(true);
      if (t >= 7.0 && !showCTA) setShowCTA(true);

      // Transition to finishing state near ending (~8.5s)
      if (t >= 8.5 && heroState === 'playing') {
        setHeroState('finishing');
      }
    };

    const onEnded = () => {
      // Hold the exact clean final frame of video_aurea_hero.mp4 (NO EXTERNAL IMAGE OVERLAY!)
      setHeroState('completed');
      setShowHeadline(true);
      setShowSupporting(true);
      setShowCTA(true);
      video.pause();
    };

    video.addEventListener('play', onPlay);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setHeroState('playing'))
        .catch(() => {
          setHeroState('completed');
          setShowHeadline(true);
          setShowSupporting(true);
          setShowCTA(true);
        });
    }

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  // 2. EARLY SCROLL BEHAVIOR (Accelerate video if user scrolls early)
  useEffect(() => {
    const handleScroll = () => {
      const video = videoRef.current;
      if (!video) return;

      const scrollY = window.scrollY;

      if (scrollY > 80 && heroState === 'playing') {
        video.playbackRate = 1.8;
      } else if (heroState === 'playing') {
        video.playbackRate = 1.0;
      }

      if (scrollY > window.innerHeight * 0.7 && heroState !== 'completed') {
        setHeroState('completed');
        setShowHeadline(true);
        setShowSupporting(true);
        setShowCTA(true);
        if (video.duration) video.currentTime = video.duration - 0.1;
        video.pause();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [heroState]);

  // 3. GSAP SCROLLTRIGGER FOR HERO EXIT ONLY
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: exitSectionRef.current,
        start: 'top top',
        end: '+=100vh',
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          if (self.progress > 0.1) {
            setHeroState((prev) => (prev === 'completed' ? 'exiting' : prev));
          }
        },
      });
    }, exitSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAF7F1] text-[#312E2A] selection:bg-[#AD8557] selection:text-white font-sans">
      
      {/* PINNED CONTAINER FOR HERO EXIT ONLY */}
      <div ref={exitSectionRef} className="relative w-full h-screen overflow-hidden">
        
        {/* HERO MAIN SECTION (100svh) */}
        <section
          ref={heroRef}
          className="relative w-full h-[100svh] min-h-[720px] overflow-hidden bg-[#1E2B35] flex flex-col justify-between"
        >
          {/* Full-bleed Seedance Video Background (`video_aurea_hero.mp4` ONLY — NO EXTERNAL IMAGE POSTER OVERLAY!) */}
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            src="/assets/video_aurea_hero.mp4"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />

          {/* Subtle Left Text Gradient Overlay */}
          <div className="absolute inset-y-0 left-0 w-full sm:w-1/2 bg-gradient-to-r from-[#1E2B35]/80 via-[#1E2B35]/35 to-transparent pointer-events-none" />

          {/* REFINED HEADER (Minimalist & Adaptive) */}
          <header className="relative z-20 max-w-7xl mx-auto px-8 sm:px-16 w-full pt-8 flex items-center justify-between text-[#FAF7F1]">
            {/* Left: A U R E A Wordmark */}
            <div className="relative group cursor-pointer">
              <span className="font-display text-2xl sm:text-3xl tracking-[0.38em] uppercase font-light pl-1">
                A U R E A
              </span>
              <div className="absolute top-[52%] left-0 w-full h-[1.5px] bg-[#D6A03B] opacity-90" />
            </div>

            {/* Right Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              {['Residences', 'Architecture', 'Experience'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-[#FAF7F1]/90 hover:text-[#D6A03B] transition-colors relative py-1 group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D6A03B] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Right Action CTA */}
            <button
              onClick={onOpenModal}
              className="hidden sm:inline-flex items-center gap-3 text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-[#FAF7F1] border-b border-white/40 pb-1 hover:border-[#D6A03B] hover:text-[#D6A03B] transition-all"
            >
              <span>Private Presentation</span>
              <ArrowRight className="w-4 h-4 text-[#D6A03B]" />
            </button>
          </header>

          {/* CHOREOGRAPHED TEXT OVERLAY (Synchronized with Video Timeline) */}
          <div className="relative z-20 max-w-7xl mx-auto px-8 sm:px-16 w-full my-auto flex flex-col justify-center">
            <div
              className="max-w-xl space-y-6 transition-all duration-700"
              style={{
                transform: showCTA ? 'translateX(-12px)' : 'translateX(0px)',
              }}
            >
              {/* Main Headline (Reveals after 1.2s via vertical mask + subtle opacity, blur <= 2px) */}
              <AnimatePresence>
                {showHeadline && (
                  <motion.div
                    initial={{ opacity: 0, y: 28, filter: 'blur(2px)', clipPath: 'inset(0 0 100% 0)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)', clipPath: 'inset(0 0 0% 0)' }}
                    transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#D6A03B] block mb-3 font-semibold">
                      ARCHITECTURE SHAPED BY LIGHT
                    </span>

                    <h1 className="font-display text-5xl sm:text-7xl md:text-[6.8rem] leading-[0.92] tracking-[-0.035em] text-[#FAF7F1] font-light">
                      Designed around <br />
                      the horizon.
                    </h1>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Supporting Sentence (Reveals at 3.5s) */}
              <AnimatePresence>
                {showSupporting && (
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-base sm:text-lg text-[#FAF7F1]/95 font-light leading-relaxed max-w-[420px]"
                  >
                    Architecture shaped by light, sea and perspective. A living residential landmark born from the ocean horizon.
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Final CTA (Appears near video ending ~7.0s / completed state) */}
              <AnimatePresence>
                {showCTA && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="pt-3"
                  >
                    <button
                      onClick={() => {
                        const nextEl = document.querySelector('#concept-section');
                        if (nextEl) nextEl.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-4 text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-[#FAF7F1] border-b border-[#D6A03B] pb-1 hover:text-[#D6A03B] transition-colors group"
                    >
                      <span>EXPLORE AUREA</span>
                      <ArrowRight className="w-4.5 h-4.5 text-[#D6A03B] transition-transform group-hover:translate-x-1.5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* HERO FOOTER STATUS BAR */}
          <div className="relative z-20 max-w-7xl mx-auto px-8 sm:px-16 w-full pb-8 border-t border-white/15 pt-4 flex items-center justify-between font-mono text-xs text-[#FAF7F1]/80">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#D6A03B] shadow-[0_0_10px_#D6A03B] animate-pulse" />
              <span className="text-[#D6A03B] font-semibold">`video aurea hero.mp4`</span>
            </div>

            <div className="flex items-center gap-3 text-[10px] tracking-widest uppercase">
              <span>STATE: {heroState.toUpperCase()}</span>
            </div>
          </div>
        </section>

      </div>

      {/* NEXT SECTION: MINERAL TRAVERTINE SURFACE */}
      <section
        id="concept-section"
        className="relative py-32 sm:py-44 bg-[#F5F0E8] text-[#312E2A] bg-grain overflow-hidden border-t border-[#AD8557]/20 z-30"
      >
        <div className="max-w-7xl mx-auto px-8 sm:px-16">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#AD8557] block mb-3 font-semibold">
                THE CONCEPT
              </span>

              <h2 className="font-display text-5xl sm:text-7xl text-[#312E2A] leading-[0.95]">
                Architecture <br />
                shaped by light.
              </h2>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <p className="text-base sm:text-lg text-[#312E2A]/85 font-light leading-relaxed">
                AUREA was conceived as a dialogue between sunlight, material and horizon. Every level offers a new relationship with the sea.
              </p>

              <div className="pt-4 border-t border-[#AD8557]/20 flex items-center gap-6 text-xs font-mono text-[#9A7552]">
                <span className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#D6A03B]" /> Pacific Coast
                </span>
                <span className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#D6A03B]" /> 40 Residential Levels
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
