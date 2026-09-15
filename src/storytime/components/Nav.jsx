import React, { useEffect, useState } from 'react';
import Magnetic from './Magnetic';
import { Arrow } from './icons';
import { IMG } from '../data';

export default function Nav() {
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    const onTheme = (e) => setTheme(e.detail);
    window.addEventListener('st:navtheme', onTheme);
    return () => window.removeEventListener('st:navtheme', onTheme);
  }, []);
  return (
    <header className="nav" data-theme={theme}>
      <a href="#top" className="nav__brand" aria-label="Storytime home"><img src={IMG.star} alt="" className="nav__mark" />Storytime</a>
      <nav className="nav__links" aria-label="Primary">
        <a href="#stories">Stories</a>
        <a href="#gifts">Gifts</a>
        <a href="#pricing">Pricing</a>
        <a href="#about">About</a>
      </nav>
      <div className="nav__right">
        <a href="#signin" className="nav__signin">Sign in</a>
        <Magnetic>
          <a href="#create" className={`btn ${theme === 'light' ? 'btn--navy' : 'btn--ivory'}`}>
            Create a story <Arrow />
          </a>
        </Magnetic>
      </div>
    </header>
  );
}
