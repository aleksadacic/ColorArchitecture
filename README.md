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
  ramp (`PrimaryRamp`), fixed brand and status colors (`Brand`), a neutral ramp per theme
  (`NeutralRamp.light` / `.dark`, 0-950), and the theme colors by role (`Theme.light` / `Theme.dark`,
  which must have the same keys and are steps of the neutral ramps). Names are camelCase; CSS and classes use the kebab-case
  form (`surfaceMuted` -> `--color-surface-muted` -> `bg-surface-muted`, `primary500` -> `bg-primary-500`).
- **The CSS is generated in memory.** A Vite plugin in `vite.config.ts` builds a `@theme static` block
  (every color, light values) and a `.dark { ... }` block (neutral ramp and role colors) from `Colors.ts`, and injects
  them into `src/style.css` at the `/* @color-theme */` marker. No generated file exists on disk, so
  there is nothing to edit by mistake. Editing `Colors.ts` restarts the dev server and the page reloads.
- **Colors can't be defined anywhere else.** The same plugin fails the build when any CSS file or Vue
  `<style>` block defines a `--color-*` or PrimeVue `--p-*` variable, and when the marker is missing.
- **Dark mode overrides variables, not classes.** `App.vue` toggles `.dark` on `<html>`; every class and
  `var()` follows without a `dark:` variant.
- **No `tailwind.config.js`, no safelist.** Tailwind 4 reads the theme from the injected CSS, and every
  class is written out in full so its source scan finds it.

## PrimeVue

PrimeVue is pinned to **4.5.5** with `@primeuix/themes` **2.0.3**, the last MIT-licensed releases
(PrimeVue 5 and `@primeuix/themes` 3 moved to the commercial PrimeUI license). It runs in styled mode with
a preset generated from `Colors.ts` in `src/theme/primevuePreset.ts`, built on Aura:

- `primary` is `PrimaryRamp`; the primary color is the brand primary (step 600) in both modes.
- `surface` is the theme's `NeutralRamp`, so every Aura component token that references a neutral step
  uses ours. Text, muted text, content background and border are set to our role colors.
- Aura's severity scales (`green`, `sky`, `orange`, `red`, `purple`) are regenerated from our status colors
  with `palette()`, which keeps each at step 500. In dark mode Aura uses step 400 for severities, a
  lighter shade of the same generated scale.
- `darkModeSelector: '.dark'` follows the same class as the rest of the app, and `cssLayer` puts
  PrimeVue's styles before Tailwind utilities, so utilities on a component always win.

## Pages

One page per usage method plus a PrimeVue demo (hash routes via `vue-router`, `src/router.ts`). The
method pages show the same sections: brand colors, primary ramp, neutral ramp, brand colors as text, then
theme text, surfaces and borders.

| Page | Route | Method | Use it for |
|---|---|---|---|
| CSS variables | `#/vars` | `style="background: var(--color-surface)"` via `color('surface')` | inline styles; inline SVG (example on the page) |
| `usePalette()` | `#/palette` | the current theme's hex values from `Colors.ts` | WebGL/shader uniforms, `<canvas>`, chart libraries, SVGs used as images (shader and canvas examples on the page) |
| Direct Tailwind | `#/tailwind` | `class="bg-surface"` | everything else (the default) |
| PrimeVue | `#/primevue` | components themed by the generated preset | buttons, form controls, tags, messages, a data table |

`usePalette()` returns the current theme's values straight from `Colors.ts` (no DOM reads), and
`toRgb()` turns a hex into the `[r, g, b]` 0-1 floats WebGL uniforms take.

On the Direct Tailwind page each class map is checked with `satisfies` against the names in `Colors.ts`,
so a new color without its class fails `vue-tsc`.
