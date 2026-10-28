# ColorArchitecture

Small Vue 3 + Vite + TypeScript + Tailwind 4 + PrimeVue 4 app showing a web color architecture built on
Tailwind 4's CSS-first conventions. It started as a port of the `cimicimi-mobile/cimicimi` color setup and has since
been reworked for the web only.

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # vue-tsc + vite build
```

## How colors work

- **Values live in TypeScript.** `src/constants/Colors.ts` is the single source of truth: the primary
  ramp (`PrimaryRamp`), fixed brand and status colors (`Brand`), and the theme colors (`Theme.light` /
  `Theme.dark`, which must have the same keys). Names are camelCase; CSS and classes use the kebab-case
  form (`surfaceMuted` -> `--color-surface-muted` -> `bg-surface-muted`, `primary500` -> `bg-primary-500`).
- **The CSS is generated in memory.** A Vite plugin (`build/colorTheme.ts`) builds a `@theme static` block
  (every color, light values) and a `.dark { ... }` block (theme colors) from `Colors.ts`, and injects
  them into `src/style.css` at the `/* @color-theme */` marker. No generated file exists on disk, so
  there is nothing to edit by mistake. Editing `Colors.ts` restarts the dev server and the page reloads.
- **Colors can't be defined anywhere else.** The same plugin fails the build when any CSS file or Vue
  `<style>` block defines a `--color-*` or PrimeVue `--p-*` variable, and when the marker is missing.
- **Dark mode overrides variables, not classes.** `src/theme/scheme.ts` holds the theme setting
  (system, light or dark, saved in `localStorage`) and toggles `.dark` on `<html>`; every class and `var()`
  follows without a `dark:` variant. A small script, injected into `index.html` by `build/schemeScript.ts`
  from the same rule (`src/theme/schemeRule.ts`), sets the class before the app loads, so a dark page never
  flashes light.
- **No `tailwind.config.js`, no hand-kept safelist.** Tailwind 4 reads the theme from the injected CSS.
  App code writes every class out in full so Tailwind's source scan finds it. The one exception is the
  Direct Tailwind page, which shows every color: the plugin also lists a `bg-*` and `text-*` class for each
  color with `@source inline`, generated from `Colors.ts`, so the page can build its class names.

## PrimeVue

PrimeVue is pinned to **4.5.5** with `@primeuix/themes` **2.0.3**, the last MIT-licensed releases
(PrimeVue 5 and `@primeuix/themes` 3 moved to the commercial PrimeUI license). It is here as an example
of compatibility, not as the driver of the palette: `Colors.ts` knows nothing about PrimeVue, and
`src/theme/primevuePreset.ts` adapts it into a preset built on Aura, running in styled mode:

- `primary` is `PrimaryRamp`; the primary color is the brand primary (step 600) in both modes.
- `surface` is a 0-950 neutral scale built in the preset, since PrimeVue needs one and our palette has
  none: each theme color is pinned to the step Aura uses for that kind of color, and the steps between are blended
  from their neighbours. Text, muted text, content background and border are set to our theme colors.
- Aura's severity scales (`green`, `sky`, `orange`, `red`, `purple`) are regenerated from our status colors
  with `palette()`, which keeps each at step 500. In dark mode Aura uses step 400 for severities, a
  lighter shade of the same generated scale.
- `darkModeSelector: '.dark'` follows the same class as the rest of the app, and `cssLayer` puts
  PrimeVue's styles before Tailwind utilities, so utilities on a component always win.

## Pages

One page per usage method plus a PrimeVue demo (hash routes via `vue-router`, `src/router.ts`). The
method pages show the same sections: brand colors, primary ramp, brand colors as text, then
theme colors.

| Page | Route | Method | Use it for |
|---|---|---|---|
| CSS variables | `#/vars` | `style="background: var(--color-surface)"` via `color('surface')` | inline styles; inline SVG (example on the page) |
| `usePalette()` | `#/palette` | the current theme's hex values from `Colors.ts` | WebGL/shader uniforms, `<canvas>`, chart libraries, SVGs used as images (shader and canvas examples on the page) |
| Direct Tailwind | `#/tailwind` | `class="bg-surface"` | everything else (the default) |
| PrimeVue | `#/primevue` | components themed by the generated preset | buttons, form controls, tags, messages, a data table |

`usePalette()` returns the current theme's values straight from `Colors.ts` (no DOM reads), and
`toRgb()` in `src/utils/hex.ts` turns a hex into the `[r, g, b]` 0-1 floats WebGL uniforms take.

The Direct Tailwind page builds each class as `` `bg-${cssName(name)}` ``, so a new color in `Colors.ts`
shows up there, with a working class, without touching the page.
