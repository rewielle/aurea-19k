# Reclaim — Buy back your time.

A single-page, editorial website for Eirik's AI education brand: a free playbook (*The 10-Hour AI Week*), a live workshop and private AI implementation.

The whole identity is built around one idea: **time as material**. Time is compressible, transferable, recoverable. AI never appears as spectacle; it appears as the *absence* of work. The page moves from a cold state (work, systems, precise blue) to a warm state (time returned, sunset light, more breathing room).

## Stack

- React 19 + Vite 8
- Tailwind CSS 4 (utilities) + a small hand-written design system in `src/reclaim/reclaim.css`
- GSAP ScrollTrigger for the pinned signature moments, Lenis for smooth scrolling
- Self-hosted variable fonts: Inter Tight (display/body), Geist Mono (labels), Caveat (one handwritten note)

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # serve the build locally
```

## Structure

```
src/reclaim/
  ReclaimSite.jsx        page root: Lenis, cold→warm background scrub, drawer state
  reclaim.css            tokens, type scale, buttons, masks, week bars, book object
  ui.jsx                 Reveal, Lines, Arrow, Clock, drawer context, time formatting
  sections/
    Nav.jsx              quiet fixed nav with a live local clock
    Hero.jsx             "Buy back your time." + end-of-day workspace photo
    Week.jsx             SIGNATURE 01 — the week collapses (40H → 29H 40M → +10H 20M)
    Problem.jsx          editorial list of repeating hours, "29H 40M — a lighter week"
    Disappear.jsx        SIGNATURE 02 — work words are handled by one blue line
    System.jsx           Remove. Systemize. Reclaim. — three steps, three behaviours
    Ways.jsx             Three ways in: playbook (object), workshop (dark), coaching (warm)
    Changes.jsx          proof without invented proof: what you leave with
    Philosophy.jsx       SIGNATURE 03 — time returns as space (warm state)
    Final.jsx            "The next 10 hours are yours." + minimal footer
    Drawer.jsx           playbook / workshop / coaching capture panel
public/reclaim/          photos, fonts, favicon
```

## Before launch

- **Photography.** The images in `public/reclaim/` are art-direction placeholders. Replace them with real photographs of Eirik teaching, his desk and screens with actual systems. Keep the balance: mostly bright and neutral, a little warm natural light, very little sunset.
- **Forms.** `Drawer.jsx` shows a success state but does not send data anywhere yet. Wire the submit handler to your email provider or CRM.
- **Workshop date.** The copy deliberately says "next date announced to the list". Add the real date when it exists.
- **Proof.** No testimonials, logos or numbers were invented. Add real ones only.

The previous AUREA 19K prototype (`src/v2`, `src/components`, `public/assets`) is still in the repository but no longer rendered.
