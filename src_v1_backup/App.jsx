import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Preloader from './components/Preloader';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ArchitecturalConcept from './components/ArchitecturalConcept';
import ExplodedArchitecture from './components/ExplodedArchitecture';
import ExteriorToInterior from './components/ExteriorToInterior';
import FloorSelectorSection from './components/FloorSelectorSection';
import ResidencesSection from './components/ResidencesSection';
import AmenitiesSection from './components/AmenitiesSection';
import LightRevealedGallery from './components/LightRevealedGallery';
import LocationSection from './components/LocationSection';
import PrivatePresentationModal from './components/PrivatePresentationModal';
import Footer from './components/Footer';
import { AUREA_DATA } from './data';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [solarPhase, setSolarPhase] = useState(AUREA_DATA.solarPhases[2]); // Golden Hour default

  // Lenis Smooth Scroll Setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleNavigate = (targetSelector) => {
    const element = document.querySelector(targetSelector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F4EFE5] text-[#35322E] selection:bg-[#C8A776] selection:text-white">
      {/* 1. Solar Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 2. Global Header Nav */}
      <Header
        currentSolarPhase={solarPhase}
        onOpenModal={() => setModalOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* 3. Hero — UAU 01: SOL → SEA → BUILDING EMERGENCE */}
      <HeroSection onExplore={() => handleNavigate('#architecture')} />

      {/* 4. Editorial Architectural Concept */}
      <ArchitecturalConcept onSelectPhase={(phase) => setSolarPhase(phase)} />

      {/* 5. UAU 02: EXPLODED ARCHITECTURE */}
      <ExplodedArchitecture />

      {/* 6. UAU 03: EXTERIOR → INTERIOR TRANSITION */}
      <ExteriorToInterior />

      {/* 7. UAU 04: INTERACTIVE FLOOR SELECTOR */}
      <FloorSelectorSection onOpenModal={() => setModalOpen(true)} />

      {/* 8. Residências e Plantas */}
      <ResidencesSection onOpenModal={() => setModalOpen(true)} />

      {/* 9. Amenities & Horizon Pool */}
      <AmenitiesSection />

      {/* 10. Galeria Revelada pela Luz */}
      <LightRevealedGallery />

      {/* 11. Localização como Experiência */}
      <LocationSection />

      {/* 12. Footer au Horizon */}
      <Footer onOpenModal={() => setModalOpen(true)} />

      {/* 13. Private Presentation Inquiry Modal */}
      <PrivatePresentationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
