
Aurora Birthday

A cinematic birthday experience built on real photographs of the Aurora.
Plain HTML, CSS and JavaScript — no framework, no build step, no server,
no backend, no accounts. **Open it by double-clicking `index.html`.**

## The journey

```
darkness → stars → the aurora reveals → small crackers → fireworks
→ one grand burst → HAPPY BIRTHDAY / Vish → the photo moment
→ the flowers → the cake (build, light, wish, blow, cut)
→ and then the ten scenes below
```

The opening can be skipped at any time (SKIP button, or Escape).
Scrolling is locked *only* while the opening plays, and is restored the
moment it ends — it is never locked again.

**Scenes:** Home · Letter · Wish · Memories · Future Dr. · Siva · Dream ·
Your Message · Reels · Finale.

## Files

```
index.html      structure: canvas, top bar, opening movie, nav,
                theme panel, and one <section> per scene
style.css       every design token, layout rule and animation
js/config.js    ← EDIT THIS. All the words, the memories, the themes.
js/livebg.js    the living sky: stars, shooting stars, drifting motes
js/fx.js        fireworks, sparkles, confetti
js/flowers.js   the bouquet that is offered before the cake
js/cake.js      the cake — built, lit, blown out and cut, all in SVG
js/movie.js     the opening sequence
js/main.js      scenes, navigation, theme, and every section's behaviour
img/aurora/     the nine Aurora skies (used by the theme picker)
img/scenes/     the background photograph for each scene
audio/          birthday.mp3 — optional; the page works fine without it
```

## The living background

Each scene layers a real photograph under four moving layers: a slow
camera drift, a flowing aurora tinted by the current theme, drifting
mist, and a breathing lake shimmer — with stars, shooting stars and
floating motes painted on a canvas above them.

Nothing is ever darkened to make text readable. Instead a soft pool of
shade sits *behind the text block only*, so the aurora, the mountains and
the reflection stay fully visible around it.

Off-screen scenes pause their animations, the canvas stops entirely when
the tab is hidden, and everything collapses to a still, readable page
under `prefers-reduced-motion`.

## Changing things

**The words, the memories, the themes** all live in `js/config.js`.

**Siva's message** ships deliberately blank. Write it into `sivaMessage`
and it appears in the Siva scene — nothing is ever auto-written for you.

**Memories** are placeholder cards right now. Add real ones like this:

```js
{ title: "The Road Trip", caption: "That one time.", year: "2024",
  img: "img/memories/trip.jpg" }
```

Leave `img` out to keep the placeholder look. The wall is a flowing grid
of tilted polaroids — it already handles 30+ entries with no code change.

**Aurora themes** — nine of them, all live. Each one drives its own
atmosphere: the sky photograph, the aurora tint, the particles, the
fireworks, the glow, the buttons and the accents. To add a tenth, append
an entry to `auroraThemes` with an `img` path and its colours. The
picker, the CSS variables and the particle palettes are all built from
that array at runtime, so nothing else needs editing.

## Phase 1

This is design, animation, interaction, navigation, responsiveness and
performance only. Nothing is saved anywhere — the theme is remembered in
the browser, and the wish and the message live only for the visit.

Real photo upload, 20–30+ stored memories, image compression, IndexedDB,
backup/restore and any cloud features are Phase 2, and are deliberately
not built yet.

## Tested

Every scene and the full opening were run in a real browser over
`file://` at 320×640, 375×812, 390×844, 430×932, 768×1024, 1440×900 and
1920×1080 — no horizontal overflow, no clipped or hidden copy, every nav
item lands exactly on its section, scrolling stays free, and the console
is clean.
