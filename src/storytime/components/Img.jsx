import React, { useMemo, useState } from 'react';
import { FALLBACK_IMG } from '../data';

const hash = (str) => { let h = 0; for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0; return h; };

/** <Img> — lazy image; on error it shows a seeded crop of Storytime's own scene. */
export default function Img({ src, alt = '', className = '', eager = false, style, ...rest }) {
  const [failed, setFailed] = useState(false);
  const crop = useMemo(() => {
    const h = hash(src || '');
    return { objectPosition: `${h % 100}% ${30 + ((h >> 8) % 60)}%`, transform: `scale(${1.5 + ((h >> 16) % 10) / 10})`, transformOrigin: `${h % 100}% ${30 + ((h >> 8) % 60)}%` };
  }, [src]);
  const isFallback = failed && src !== FALLBACK_IMG;
  return (
    <img
      src={isFallback ? FALLBACK_IMG : src}
      alt={alt}
      className={className}
      style={isFallback ? { ...style, ...crop } : style}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
