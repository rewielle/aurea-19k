import React, { useState } from 'react';
import TypographyBoard from './TypographyBoard';
import HeroDirectionA from './HeroDirectionA';
import HeroDirectionB from './HeroDirectionB';
import MobileHero from './MobileHero';
import VisualRationale from './VisualRationale';
import PrivatePresentationModal from '../components/PrivatePresentationModal';
import { Layers, Eye, Smartphone, Type, FileText } from 'lucide-react';

export default function V2MasterPage() {
  const [activeTab, setActiveTab] = useState('hero-a');
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F1] text-[#312E2A] selection:bg-[#AD8557] selection:text-white">
      
      {/* V2 Navigation Switcher Bar */}
      <div className="sticky top-0 z-50 bg-[#312E2A] text-[#FAF7F1] px-6 py-3 border-b border-[#AD8557]/40 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="font-display text-lg tracking-widest text-[#D6A03B]">AUREA V2</span>
          <span className="text-[10px] font-mono tracking-widest uppercase bg-[#AD8557]/30 px-2 py-0.5 rounded text-[#FAF7F1]">
            VISUAL LOCK DELIVERABLES
          </span>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab('hero-a')}
            className={`px-3 py-1.5 rounded-full flex items-center gap-2 transition-all ${
              activeTab === 'hero-a'
                ? 'bg-[#D6A03B] text-[#1E2B35] font-bold'
                : 'bg-white/10 hover:bg-white/20 text-[#FAF7F1]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>HERO A (BORN FROM LIGHT)</span>
          </button>

          <button
            onClick={() => setActiveTab('hero-b')}
            className={`px-3 py-1.5 rounded-full flex items-center gap-2 transition-all ${
              activeTab === 'hero-b'
                ? 'bg-[#D6A03B] text-[#1E2B35] font-bold'
                : 'bg-white/10 hover:bg-white/20 text-[#FAF7F1]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>HERO B (ENTER HORIZON)</span>
          </button>

          <button
            onClick={() => setActiveTab('mobile')}
            className={`px-3 py-1.5 rounded-full flex items-center gap-2 transition-all ${
              activeTab === 'mobile'
                ? 'bg-[#D6A03B] text-[#1E2B35] font-bold'
                : 'bg-white/10 hover:bg-white/20 text-[#FAF7F1]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>MOBILE HERO</span>
          </button>

          <button
            onClick={() => setActiveTab('typography')}
            className={`px-3 py-1.5 rounded-full flex items-center gap-2 transition-all ${
              activeTab === 'typography'
                ? 'bg-[#D6A03B] text-[#1E2B35] font-bold'
                : 'bg-white/10 hover:bg-white/20 text-[#FAF7F1]'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>TYPOGRAPHY BOARD</span>
          </button>

          <button
            onClick={() => setActiveTab('rationale')}
            className={`px-3 py-1.5 rounded-full flex items-center gap-2 transition-all ${
              activeTab === 'rationale'
                ? 'bg-[#D6A03B] text-[#1E2B35] font-bold'
                : 'bg-white/10 hover:bg-white/20 text-[#FAF7F1]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>RATIONALE</span>
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <div>
        {activeTab === 'hero-a' && <HeroDirectionA onOpenModal={() => setModalOpen(true)} />}
        {activeTab === 'hero-b' && <HeroDirectionB onOpenModal={() => setModalOpen(true)} />}
        {activeTab === 'mobile' && (
          <div className="py-16 px-6 flex justify-center bg-[#FAF7F1]">
            <MobileHero onOpenModal={() => setModalOpen(true)} />
          </div>
        )}
        {activeTab === 'typography' && <TypographyBoard />}
        {activeTab === 'rationale' && <VisualRationale />}
      </div>

      {/* Shared Inquiry Modal */}
      <PrivatePresentationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
