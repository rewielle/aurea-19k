import React from 'react';

export const Arrow = ({ className = 'arrow' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowDown = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 2v11M3.5 9 8 13.5 12.5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Play = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M4.5 2.8v10.4c0 .5.55.8.97.53l8.1-5.2a.62.62 0 0 0 0-1.06l-8.1-5.2a.62.62 0 0 0-.97.53Z" />
  </svg>
);

export const Instagram = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" />
  </svg>
);

export const Youtube = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 8.5c0-1.4 1.1-2.5 2.5-2.5h13c1.4 0 2.5 1.1 2.5 2.5v7c0 1.4-1.1 2.5-2.5 2.5h-13A2.5 2.5 0 0 1 3 15.5v-7Z" stroke="currentColor" strokeWidth="1.3" />
    <path d="M10 9.2v5.6l4.8-2.8L10 9.2Z" fill="currentColor" />
  </svg>
);

export const Spotify = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.3" />
    <path d="M7.5 9.5c3.2-.9 6.4-.6 9.2.9M8 12.3c2.6-.7 5.2-.4 7.5.8M8.5 15c2-.5 3.9-.3 5.7.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export const SoundCloud = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 14.5v2M6.5 12v4.5M9 11v5.5M11.5 9.5v7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M13.5 16.5h4.2a2.8 2.8 0 0 0 .3-5.6 4 4 0 0 0-4.5-3.4v9Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

export const AppleMusic = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9 17.5V7.2l8-1.7v10.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="6.8" cy="17.5" r="2.2" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="14.8" cy="15.8" r="2.2" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

export const Mail = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
