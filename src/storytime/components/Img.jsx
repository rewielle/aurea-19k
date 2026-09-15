import React, { useState } from 'react';
import { fallbackFor } from '../lib/fallback';

/** <Img> — lazy image with procedural fallback on error. */
export default function Img({ src, alt = '', className = '', eager = false, style, ...rest }) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      src={failed ? fallbackFor(src) : src}
      alt={alt}
      className={className}
      style={style}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
