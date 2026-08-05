import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Pause, RefreshCw, Sun, CheckCircle2, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SingleShotSolarHero({ onOpenModal }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Time progress state: 0 to 12 seconds
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPass, setSelectedPass] = useState(null); // Manual pass override for 7-pass visual validation

  // Load and cache all 7 aligned pass images for canvas multi-pass blending
  const passesRef = useRef([]);

  useEffect(() => {
    // Define the 7 aligned pass image paths
    const passSources = [
      '/assets/hero_sea.jpg',          // Pass 1: Ocean & Sun Silence
      '/assets/hero_sea.jpg',          // Pass 2: Expanded Solar Axis
      '/assets/hero_lines.jpg',        // Pass 3: Structural Lines inside Light
      '/assets/hero_lines.jpg',        // Pass 4: Translucent Glass & Floor Volume
      '/assets/building_sunrise.jpg',  // Pass 5: Material Emergence
      '/assets/building_golden.jpg',   // Pass 6: Full Monumental Tower
      '/assets/building_golden.jpg',   // Pass 7: Final Architectural Landmark
    ];

    const loadedImages = [];
    let count = 0;
    passSources.forEach((src, idx) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedImages[idx] = img;
        count++;
        if (count === passSources.length) {
          passesRef.current = loadedImages;
          renderFrame(time);
        }
      };
    });
  }, []);

  // GSAP ScrollTrigger timeline binding for continuous scroll-scrubbing
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          if (!isPlaying) {
            const currentTime = self.progress * 12; // 0 to 12s
            setTime(currentTime);
            renderFrame(currentTime);
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isPlaying]);

  // Animation frame loop when playback is active
  useEffect(() => {
    let animId;
    if (isPlaying) {
      let startTime = null;
      const duration = 12000; // 12 seconds continuous shot

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = (timestamp - startTime) % duration;
        const currentTime = (elapsed / duration) * 12;
        setTime(currentTime);
        renderFrame(currentTime);
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  // Master Canvas Rendering Engine: Single-shot multi-pass blending
  const renderFrame = (currentTime) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const images = passesRef.current;
    if (!images || images.length < 5) return;

    // Use manual pass override if selected
    const activeProgress = selectedPass !== null ? selectedPass / 6 : currentTime / 12;

    // Camera Transformation Math (Single Continuous Camera)
    const cameraScale = 1.06 - activeProgress * 0.06;
    const cameraY = (1 - activeProgress) * 15;

    ctx.save();
    ctx.scale(cameraScale, cameraScale);

    // Pass 1: Ocean & Sun (Base Shot 01)
    if (images[0]) {
      ctx.globalAlpha = 1.0;
      ctx.drawImage(images[0], 0, 0, width, height);
    }

    // Pass 2: Solar Axis Beam Expansion (Shot 02: 2s - 4s)
    if (activeProgress > 0.15) {
      const axisAlpha = Math.min(1, (activeProgress - 0.15) * 3);
      ctx.save();
      ctx.globalAlpha = axisAlpha * 0.85;
      ctx.globalCompositeOperation = 'screen';
      
      // Draw Solar Axis Light Beam Corridor
      const gradient = ctx.createLinearGradient(0, height * 0.52, width, height * 0.52);
      gradient.addColorStop(0, 'rgba(214, 160, 59, 0)');
      gradient.addColorStop(0.3, 'rgba(214, 160, 59, 0.4)');
      gradient.addColorStop(0.65, 'rgba(217, 164, 65, 0.95)');
      gradient.addColorStop(1, 'rgba(214, 160, 59, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, height * 0.51, width, 6);
      ctx.restore();
    }

    // Pass 3 & 4: Structural Lines & Translucent Volume (Shot 03 & 04: 4s - 8s)
    if (activeProgress > 0.3) {
      const lineAlpha = Math.min(1, (activeProgress - 0.3) * 3.5);
      if (images[2]) {
        ctx.save();
        ctx.globalAlpha = lineAlpha * 0.7;
        ctx.globalCompositeOperation = 'multiply';
        ctx.drawImage(images[2], 0, 0, width, height);
        ctx.restore();
      }
    }

    // Pass 5: Material Reveal (Shot 05: 8s - 10s)
    if (activeProgress > 0.55) {
      const matAlpha = Math.min(1, (activeProgress - 0.55) * 3);
      if (images[4]) {
        ctx.save();
        ctx.globalAlpha = matAlpha * 0.85;
        ctx.drawImage(images[4], 0, 0, width, height);
        ctx.restore();
      }
    }

    // Pass 6 & 7: Monumental Tower Reveal (Shot 06: 10s - 12s)
    if (activeProgress > 0.75) {
      const finalAlpha = Math.min(1, (activeProgress - 0.75) * 4);
      if (images[5]) {
        ctx.save();
        ctx.globalAlpha = finalAlpha;
        ctx.drawImage(images[5], 0, 0, width, height);
        ctx.restore();
      }
    }

    ctx.restore();
  };

  // Text Choreography Calculations based on time (0s to 12s)
  // Shot 01 (0s-2s): Large Headline "Designed around the horizon."
  // Shot 02 (2s-4s): Headline starts reducing scale & opacity
  // Shot 03 & 04 (4s-8s): Headline recedes to upper editorial text
  // Shot 05 & 06 (8s-12s): Monumental Tower dominates, final brand & CTA appear

  const titleScale = Math.max(0.7, 1 - (time / 12) * 0.3);
  const titleOpacity = time < 2 ? 1 : Math.max(0.25, 1 - ((time - 2) / 6));
  const finalContentOpacity = time > 8 ? Math.min(1, (time - 8) / 3) : 0;

  // Shot stage description
  let currentShot = 'SHOT 01 — SILENCE (0s–2s)';
  let currentAction = 'Calm ocean, low sun, moving solar reflection, large headline silence.';
  if (time >= 2 && time < 4) {
    currentShot = 'SHOT 02 — THE SOLAR FORCE (2s–4s)';
    currentAction = 'Sunlight reflection expands across sea, forming the proprietary solar axis beam.';
  } else if (time >= 4 && time < 6) {
    currentShot = 'SHOT 03 — STRUCTURE INSIDE LIGHT (4s–6s)';
    currentAction = 'Glowing wireframe structural lines rise directly out of the solar axis beam.';
  } else if (time >= 6 && time < 8) {
    currentShot = 'SHOT 04 — VOLUME (6s–8s)';
    currentAction = 'Façade volumes, glass loggias and floor plates gain depth inside mist.';
  } else if (time >= 8 && time < 10) {
    currentShot = 'SHOT 05 — MATERIAL (8s–10s)';
    currentAction = 'Travertine stone, champagne bronze and glass fully materialize.';
  } else if (time >= 10) {
    currentShot = 'SHOT 06 — MONUMENTAL AUREA (10s–12s)';
    currentAction = 'Complete monumental tower dominating viewport. Architecture as protagonist.';
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#FAF7F1] text-[#312E2A] bg-grain flex flex-col justify-between"
    >
      {/* 1. SINGLE-SHOT CANVAS RENDERER (1440x900 Native Resolution) */}
      <canvas
        ref={canvasRef}
        width={1440}
        height={900}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none"
      />

      {/* 2. Atmospheric Sunlight Ray & Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F1]/90 via-transparent to-transparent pointer-events-none" />

      {/* 3. MINIMALIST HEADER (Integrated into single-shot) */}
      <div className="relative z-20 max-w-7xl mx-auto px-8 sm:px-16 w-full pt-8 flex items-center justify-between">
        {/* Proprietary Wordmark */}
        <div className="relative group cursor-pointer">
          <span className="font-display text-2xl sm:text-3xl tracking-[0.38em] uppercase font-light text-[#312E2A] pl-1">
            A U R E A
          </span>
          <div className="absolute top-[52%] left-0 w-full h-[1.5px] bg-[#D6A03B] opacity-80" />
        </div>

        {/* Minimal Nav Action */}
        <button
          onClick={onOpenModal}
          className="inline-flex items-center gap-3 text-xs font-mono tracking-[0.3em] uppercase text-[#312E2A] border-b border-[#312E2A]/30 pb-1 hover:border-[#D6A03B] hover:text-[#D6A03B] transition-colors"
        >
          <span>Private Presentation</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#D6A03B]" />
        </button>
      </div>

      {/* 4. CHOREOGRAPHED TEXT OVERLAY (Transitions seamlessly across 0s–12s) */}
      <div className="relative z-20 max-w-7xl mx-auto px-8 sm:px-16 w-full my-auto flex flex-col justify-center">
        
        {/* Initial Large Headline (0s–4s) */}
        <div
          className="max-w-xl space-y-6 transition-all duration-700 pointer-events-none"
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale}) translateY(${time * 2}px)`,
          }}
        >
          <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#AD8557] block">
            LIGHT BECOMES ARCHITECTURE
          </span>

          {/* Upright Roman Headline — NO ITALICS */}
          <h1 className="hero-monumental-title text-[#312E2A]">
            Designed around <br />
            the horizon.
          </h1>
        </div>

        {/* Final Restrained Brand & CTA Overlay (8s–12s) */}
        <div
          className="max-w-md space-y-4 pt-4 transition-all duration-700"
          style={{
            opacity: finalContentOpacity,
            pointerEvents: finalContentOpacity > 0.5 ? 'auto' : 'none',
          }}
        >
          <p className="text-sm sm:text-base text-[#312E2A]/85 font-light leading-relaxed max-w-[420px]">
            Architecture shaped by light, sea and perspective. A monumental landmark where the sun physically constructs the building.
          </p>

          <div className="pt-2">
            <button onClick={onOpenModal} className="btn-arch-line">
              <span>EXPLORE AUREA</span>
              <ArrowRight className="w-4 h-4 text-[#D6A03B]" />
            </button>
          </div>
        </div>

      </div>

      {/* 5. MASTER 12-SECOND STORYBOARD TIMELINE & CONTROL BAR */}
      <div className="relative z-30 max-w-7xl mx-auto px-8 sm:px-16 w-full pb-6 border-t border-[#AD8557]/20 pt-4 bg-[#FAF7F1]/80 backdrop-blur-md rounded-t-2xl">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs text-[#312E2A] mb-3">
          
          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 rounded-full bg-[#312E2A] text-[#FAF7F1] font-bold flex items-center gap-2 hover:bg-[#D6A03B] hover:text-[#1E2B35] transition-all"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Film' : 'Play 12s Continuous Shot'}</span>
            </button>

            <button
              onClick={() => {
                setTime(0);
                setSelectedPass(null);
                renderFrame(0);
              }}
              className="p-2 rounded-full border border-[#AD8557]/30 hover:bg-[#F5F0E8] transition-colors"
              title="Reset Timeline"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#AD8557]" />
            </button>
          </div>

          {/* Current Shot Label & Time Code */}
          <div className="flex items-center gap-3">
            <span className="text-[#D6A03B] font-bold">{currentShot}</span>
            <span className="font-mono text-xs text-[#9A7552]">
              [{time.toFixed(1)}s / 12.0s]
            </span>
          </div>

        </div>

        {/* Timeline Scrubber Bar */}
        <div className="relative w-full h-3 bg-[#F5F0E8] rounded-full border border-[#AD8557]/25 overflow-hidden flex items-center cursor-pointer">
          <input
            type="range"
            min="0"
            max="12"
            step="0.1"
            value={time}
            onChange={(e) => {
              const newT = parseFloat(e.target.value);
              setTime(newT);
              setSelectedPass(null);
              renderFrame(newT);
            }}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
          />
          <div
            className="h-full bg-[#D6A03B] transition-all duration-100"
            style={{ width: `${(time / 12) * 100}%` }}
          />
        </div>

        {/* 7 Aligned Passes Override Selector (For Visual Validation) */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#AD8557]/15 mt-3 text-[10px] font-mono text-[#9A7552]">
          <span className="font-bold text-[#AD8557]">7 ALIGNED PASSES VALIDATION:</span>
          {[
            'Pass 1: Silence (0s)',
            'Pass 2: Solar Axis (2s)',
            'Pass 3: Structure (4s)',
            'Pass 4: Volume (6s)',
            'Pass 5: Material (8s)',
            'Pass 6: Tower (10s)',
            'Pass 7: Monumental (12s)',
          ].map((passName, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsPlaying(false);
                setSelectedPass(idx);
                const t = (idx / 6) * 12;
                setTime(t);
                renderFrame(t);
              }}
              className={`px-2.5 py-1 rounded transition-all ${
                selectedPass === idx || (selectedPass === null && Math.abs((time / 12) * 6 - idx) < 0.5)
                  ? 'bg-[#312E2A] text-[#D6A03B] font-bold'
                  : 'bg-[#F5F0E8] hover:bg-[#AD8557]/20 text-[#312E2A]'
              }`}
            >
              {passName}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
