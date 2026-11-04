# DM Labs mobile games

Small, relaxing mobile games built to ship on the App Store and Google Play. Each game lives in its own folder under `games/` and starts life as a single playable web page, so an idea can be tested on a phone before any store work begins.

| Game | Folder | Status |
|---|---|---|
| **Voxel Pop** (working title) | [`games/voxel-pop`](games/voxel-pop/) | Browser prototype: 3 objects, colour guns, holsters, Zen mode, synthesised sound |

## Voxel Pop

A colour-shooter puzzle. A voxel object (a treasure chest, a cake, a heart) turns slowly on a stand. A belt of guns arrives, each loaded with one colour and a fixed number of shots. Put a gun in a holster and it pops every cube of its colour it can see, peeling the object layer by layer until the hidden treasure inside is revealed. A gun whose colour isn't showing waits in its holster, and when every holster is waiting you're stuck, so the order you pick guns in is the whole puzzle. Zen mode removes losing.

- `games/voxel-pop/index.html` is the whole game: Three.js from a CDN, everything else inline. Open it through any static server (`python3 -m http.server -d games/voxel-pop 8000`).
- Levels are code: `LEVELS` in the file. Each one is a solid-shape test, a core test (the treasure), a surface colouring and an interior colouring, with exactly six gun colours.
- Sound is synthesised in the browser (pops follow a pentatonic loop, so fast streaks sound like a wind chime). Vibration uses `navigator.vibrate` where the browser has it.
- The "+1 holster" rescue stands in for a rewarded ad.

## Tools

`node tools/artifact-page.mjs games/voxel-pop/index.html out/voxel-pop.html` produces the fragment used to publish the game as a claude.ai artifact for play-testing on a phone.

## Planned stack for the store builds

Capacitor wrapper around the web game, Supabase for accounts and leaderboards, AdMob for rewarded ads, RevenueCat for in-app purchases.
