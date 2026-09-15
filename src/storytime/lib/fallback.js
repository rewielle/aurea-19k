/** Procedural fallback: a seeded twilight gradient so a missing image never shows as broken. */
const PALETTES = [
  ['#1B2A57', '#5B4A73', '#E4A95C'],
  ['#0A214A', '#8F8BB0', '#F0C88E'],
  ['#071633', '#1B2A57', '#B9B4CF'],
  ['#2B2C54', '#8F8BB0', '#F7F2E8'],
  ['#3A2B4F', '#C9A75B', '#F0C88E'],
];
const cache = new Map();
export function fallbackFor(seedStr = '') {
  if (cache.has(seedStr)) return cache.get(seedStr);
  let h = 0;
  for (let i = 0; i < seedStr.length; i++) h = (h * 31 + seedStr.charCodeAt(i)) >>> 0;
  const p = PALETTES[h % PALETTES.length];
  const ang = 120 + (h % 90);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='800'>
    <defs><linearGradient id='g' gradientTransform='rotate(${ang})'>
      <stop offset='0' stop-color='${p[0]}'/><stop offset='0.55' stop-color='${p[1]}'/><stop offset='1' stop-color='${p[2]}'/>
    </linearGradient>
    <radialGradient id='r' cx='${30 + (h % 40)}%' cy='${60 + (h % 30)}%' r='60%'>
      <stop offset='0' stop-color='${p[2]}' stop-opacity='0.55'/><stop offset='1' stop-color='${p[0]}' stop-opacity='0'/>
    </radialGradient></defs>
    <rect width='100%' height='100%' fill='url(#g)'/><rect width='100%' height='100%' fill='url(#r)'/>
  </svg>`;
  const url = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  cache.set(seedStr, url);
  return url;
}
