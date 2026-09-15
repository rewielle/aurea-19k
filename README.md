# Storytime — homepage

One continuous, scroll-directed story: **Creator → Orbit → Transformation → Formats → Real person → Quiet → Plans → Proof → Final creation.**

Built with React 19, Vite, GSAP ScrollTrigger and Lenis. Display type: Fraunces. UI type: Geist.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build && npm run preview
```

## Where things live

| Path | What |
| --- | --- |
| `src/storytime/StorytimeSite.jsx` | Scene order, smooth scroll, nav theming, reduced-motion switch |
| `src/storytime/scenes/StoryScene.jsx` | The signature orbit + chat → story transformation (one pinned stage) |
| `src/storytime/scenes/*.jsx` | Hero, Formats, RealToStory, Quiet, Pricing, Proof, Final, Footer |
| `src/storytime/components/Composer.jsx` | The Story Creator (shared by hero and final chapter) |
| `src/storytime/data.js` | Copy, plans, testimonials, orbit tiles and the **image manifest** |
| `src/storytime/storytime.css` | Design tokens and all scene styles |

## Images

`src/storytime/data.js` hotlinks Unsplash photography as placeholders. To self-host them:

```bash
node scripts/localize-images.mjs        # downloads into public/storytime/img
VITE_LOCAL_IMAGES=1 npm run build       # serve the local copies
```

Swap any key in the manifest for final Storytime renders (character illustrations, book spreads) — every scene reads from it.

## Pricing data

Monthly prices in `data.js` follow the published Storytime plans. One-time prices are marked `unverified` and must be confirmed against storytime.no before launch.

## Motion

- `prefers-reduced-motion: reduce` disables smooth scroll and pinning; scenes render as staged, static compositions.
- Each scene owns one dominant interaction (scrub choreography, format switcher, clip reveal, magnetic CTA).
