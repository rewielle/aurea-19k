import React, { useState } from 'react';
import HeroSection from './sections/HeroSection';
import ConceptSection from './sections/ConceptSection';
import MaterialSection from './sections/MaterialSection';
import ExplodedArchitectureSection from './sections/ExplodedArchitectureSection';
import ExteriorInteriorSection from './sections/ExteriorInteriorSection';
import FloorSelectorSection from './sections/FloorSelectorSection';
import ResidencesSection from './sections/ResidencesSection';
import AmenitiesSection from './sections/AmenitiesSection';
import LightGallerySection from './sections/LightGallerySection';
import LocationSection from './sections/LocationSection';
import PrivatePresentationSection from './sections/PrivatePresentationSection';
import NightFooterSection from './sections/NightFooterSection';
import PrivatePresentationModal from '../components/PrivatePresentationModal';

export default function AureaCompletePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F1] text-[#312E2A] selection:bg-[#AD8557] selection:text-white font-sans">
      
      {/* 01. Approved Cinematic Seedance Video Hero */}
      <HeroSection onOpenModal={() => setModalOpen(true)} />

      {/* 02. Architecture Shaped by Light */}
      <ConceptSection />

      {/* 03. Material Language */}
      <MaterialSection />

      {/* 04. UAU Moment 02 — Exploded Architecture */}
      <ExplodedArchitectureSection />

      {/* 05. UAU Moment 03 — Exterior → Interior Passage */}
      <ExteriorInteriorSection />

      {/* 06. UAU Moment 04 — Perspective Floor Selector */}
      <FloorSelectorSection onOpenModal={() => setModalOpen(true)} />

      {/* 07. Residences Categories */}
      <ResidencesSection onOpenModal={() => setModalOpen(true)} />

      {/* 08. Horizon Pool & Sanctuary Amenities */}
      <AmenitiesSection />

      {/* 09. Light-Revealed Gallery */}
      <LightGallerySection />

      {/* 10. Location & Topography */}
      <LocationSection />

      {/* 11. Private Presentation (Dusk) */}
      <PrivatePresentationSection onOpenModal={() => setModalOpen(true)} />

      {/* 12. Night Solar Cycle Closure & Footer */}
      <NightFooterSection onOpenModal={() => setModalOpen(true)} />

      {/* Shared Private Inquiry Modal */}
      <PrivatePresentationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
