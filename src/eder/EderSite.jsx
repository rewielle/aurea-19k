import React, { useCallback, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { useSmoothScroll } from './useSmoothScroll';
import Preloader from './Preloader';
import Header from './Header';
import Hero from './sections/Hero';
import Beyond from './sections/Beyond';
import Kinetic from './sections/Kinetic';
import Experiences from './sections/Experiences';
import Agenda from './sections/Agenda';
import Music from './sections/Music';
import Gallery from './sections/Gallery';
import Contact from './sections/Contact';

export default function EderSite() {
  const [ready, setReady] = useState(false);
  const onLoaderDone = useCallback(() => setReady(true), []);
  useSmoothScroll(true);

  return (
    <MotionConfig reducedMotion="user">
      <Preloader onDone={onLoaderDone} />
      <div className="grain" aria-hidden="true" />
      <Header ready={ready} />
      <main>
        <Hero ready={ready} />
        <Beyond />
        <Kinetic />
        <Experiences />
        <Agenda />
        <Music />
        <Gallery />
      </main>
      <Contact />
    </MotionConfig>
  );
}
