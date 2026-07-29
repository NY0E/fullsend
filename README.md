# F3 Fan Site (prototype)

Unofficial fan project — not affiliated with or endorsed by F3 Nation.

## Setup

```
npm install
npm run dev
```

Then open http://localhost:4321

## Structure

- `src/data/ao-data.js` — shared AO/region dataset (real names from F3 The Fe & F3 Kansas City public sites; coordinates are hand-estimated, not officially geocoded). Swap this out once real F3 Nation API access is granted.
- `src/data/badges.js` — registry of every claimable patch/badge. Add a new Elements badge by adding one entry here.
- `src/lib/patch-renderer.js` — shared canvas engine (fabric texture, merrowed border, arc text, pip ring, ribbon nameplate) used by every patch.
- `src/lib/emblems.js` — small icon-drawing functions per badge type. Placeholder art — a professional patch designer should eventually replace these.
- `src/lib/geocode.js` — zip → lat/lon via the free Zippopotam.us API.
- `src/pages/roulette.astro` — F3 Roulette.
- `src/pages/patch-locker/` — Full Send (tiered, region-based) and Elements (one-shot claims).

## Known gaps / next steps

- AO dataset only covers two regions found via public search (F3 The Fe: 15 AOs, F3 Kansas City: 3 AOs). F3 Kansas City almost certainly has more AOs that aren't published as static text anywhere — real coverage needs either F3 Nation API access or manually walking the live map.
- AO coordinates are hand-estimated from street addresses, not run through a real geocoder — fine for demo distance filtering, not accurate enough for navigation.
- Patch/badge artwork is canvas-drawn placeholder art, not real embroidered-patch design.
- No backend, no accounts, no persistence anywhere — everything is honor-system, by design.
