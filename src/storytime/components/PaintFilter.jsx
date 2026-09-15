import React from 'react';
/**
 * SVG filter that turns photography into a soft, painted interpretation.
 * Used everywhere a "Storytime illustration" is implied. Replace with
 * real illustrated renders when available — the layout does not depend on it.
 */
export default function PaintFilter() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <filter id="st-paint" colorInterpolationFilters="sRGB">
        <feGaussianBlur stdDeviation="1.1" result="b" />
        <feMorphology in="b" operator="dilate" radius="0.8" result="m" />
        <feComponentTransfer in="m" result="p">
          <feFuncR type="discrete" tableValues="0.08 0.2 0.32 0.44 0.56 0.68 0.8 0.92 1" />
          <feFuncG type="discrete" tableValues="0.08 0.2 0.32 0.44 0.56 0.68 0.8 0.92 1" />
          <feFuncB type="discrete" tableValues="0.12 0.24 0.36 0.48 0.6 0.72 0.84 0.94 1" />
        </feComponentTransfer>
        <feGaussianBlur in="p" stdDeviation="0.5" result="p2" />
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="t" />
        <feDisplacementMap in="p2" in2="t" scale="4" xChannelSelector="R" yChannelSelector="G" result="d" />
        <feColorMatrix in="d" type="matrix"
          values="1.05 0 0 0 0.02  0 1.0 0 0 0.01  0 0 1.08 0 0.03  0 0 0 1 0" />
      </filter>
    </svg>
  );
}
