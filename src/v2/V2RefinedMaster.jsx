import React, { useState } from 'react';
import SingleShotSolarHero from './SingleShotSolarHero';
import ReferenceVideoPlayer from './ReferenceVideoPlayer';
import TypographyComparison from './TypographyComparison';
import MobileHeroV2 from './MobileHeroV2';
import SolarAxisExplanation from './SolarAxisExplanation';
import PrivatePresentationModal from '../components/PrivatePresentationModal';
import { Film, Eye, Type, Smartphone, Layers, FileText, Sparkles } from 'lucide-react';

export default function V2RefinedMaster() {
  const [activeTab, setActiveTab] = useState('single-shot');
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F1] text-[#312E2A] selection:bg-[#AD8557] selection:text-white">
      
      {/* Top Review Bar */}
      <div className="sticky top-0 z-50 bg-[#312E2A] text-[#FAF7F1] px-6 py-3 border-b border-[#AD8557]/40 flex flex-wrap items-center justify-between gap-4 shadow-xl font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="font-display text-lg tracking-widest text-[#D6A03B]">AUREA HERO V2</span>
          <span className="text-[10px] tracking-widest uppercase bg-[#D6A03B] text-[#1E2B35] px-2.5 py-0.5 rounded font-bold">
            12S SINGLE-SHOT REVEAL
          </span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('single-shot')}
            className={`px-3.5 py-1.5 rounded-full flex items-center gap-2 transition-all ${
              activeTab === 'single-shot' ? 'bg-[#D6A03B] text-[#1E2B35] font-bold shadow-md' : 'bg-white/10 hover:bg-white/20 text-[#FAF7F1]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>SINGLE-SHOT HERO (12S)</span>
          </button>

          <button
            onClick={() => setActiveTab('inspo')}
            className={`px-3.5 py-1.5 rounded-full flex items-center gap-2 transition-all ${
              activeTab === 'inspo' ? 'bg-[#D6A03B] text-[#1E2B35] font-bold shadow-md' : 'bg-white/10 hover:bg-white/20 text-[#FAF7F1]'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>`inspo aurea hero.mp4`</span>
          </button>

          <button
            onClick={() => setActiveTab('typography')}
            className={`px-3 py-1.5 rounded-full flex items-center gap-2 transition-all ${
              activeTab === 'typography' ? 'bg-[#D6A03B] text-[#1E2B35] font-bold' : 'bg-white/10 hover:bg-white/20 text-[#FAF7F1]'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>TYPOGRAPHY & WORDMARK</span>
          </button>

          <button
            onClick={() => setActiveTab('mobile')}
            className={`px-3 py-1.5 rounded-full flex items-center gap-2 transition-all ${
              activeTab === 'mobile' ? 'bg-[#D6A03B] text-[#1E2B35] font-bold' : 'bg-white/10 hover:bg-white/20 text-[#FAF7F1]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>MOBILE</span>
          </button>

          <button
            onClick={() => setActiveTab('rationale')}
            className={`px-3 py-1.5 rounded-full flex items-center gap-2 transition-all ${
              activeTab === 'rationale' ? 'bg-[#D6A03B] text-[#1E2B35] font-bold' : 'bg-white/10 hover:bg-white/20 text-[#FAF7F1]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>SOLAR RATIONALE</span>
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <div>
        {activeTab === 'single-shot' && <SingleShotSolarHero onOpenModal={() => setModalOpen(true)} />}
        {activeTab === 'inspo' && <ReferenceVideoPlayer />}
        {activeTab === 'typography' && <TypographyComparison />}
        {activeTab === 'mobile' && <MobileHeroV2 onOpenModal={() => setModalOpen(true)} />}
        {activeTab === 'rationale' && <SolarAxisExplanation />}
      </div>

      {/* Shared Inquiry Modal */}
      <PrivatePresentationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
