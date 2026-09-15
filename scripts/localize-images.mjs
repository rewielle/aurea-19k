/**
 * Downloads every image in the Storytime manifest into /public/storytime/img
 * so the site can be served without hotlinking. Then run with VITE_LOCAL_IMAGES=1.
 *   node scripts/localize-images.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../src/storytime/data.js', import.meta.url), 'utf8');
const entries = [...src.matchAll(/^\s*(\w+):\s*U\('([^']+)',\s*(\d+)\)/gm)];
await mkdir(new URL('../public/storytime/img', import.meta.url), { recursive: true });
for (const [, key, id, w] of entries) {
  const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=78&fm=jpg`;
  const res = await fetch(url);
  if (!res.ok) { console.warn('skip', key, res.status); continue; }
  await writeFile(new URL(`../public/storytime/img/${key}.jpg`, import.meta.url), Buffer.from(await res.arrayBuffer()));
  console.log('saved', key);
}
