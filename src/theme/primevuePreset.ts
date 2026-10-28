import { definePreset, palette } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

import { Brand, PrimaryRamp, Theme } from '@/constants/Colors';

// PrimeVue's theme, adapted from src/constants/Colors.ts. PrimeVue is an example of compatibility: it
// reads our palette and never shapes it. Built on Aura: only the color tokens are replaced; spacing, radii
// and component structure stay Aura's.
//
// - `primary` is our PrimaryRamp. Aura's `primary.color` is step 500 (400 in dark); ours is the brand
//   primary (step 600) in both modes, like the rest of the app.
// - `surface` is a 0-950 neutral scale PrimeVue needs and our palette doesn't have. It is built here from
//   the theme colors: each one is pinned to the step Aura uses for that role, and the steps between are
//   blended from their neighbours. Aura's component tokens reference these steps, so every component
//   picks up our neutrals.
// - The role tokens our app defines (text, muted text, content background, borders) are set to our theme
//   colors directly, where Aura would pick a different surface step.
// - Severity colors (success, info, warn, danger, help) use Aura's `green`, `sky`, `orange`, `red` and
//   `purple` scales. They are regenerated from our status colors with `palette()`, which keeps the input
//   at step 500, the step Aura uses for the base color.

type ThemeValues = (typeof Theme)['light' | 'dark'];
type SurfaceStep = 0 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
const steps: SurfaceStep[] = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const hexToRgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const rgbToHex = (rgb: number[]) => `#${rgb.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')}`;

// Fills every step between the pinned ones by blending linearly (by step number) between its neighbours.
function surfaceScale(pinned: Partial<Record<SurfaceStep, string>>): Record<SurfaceStep, string> {
  const anchors = steps.filter((s) => pinned[s]);
  return Object.fromEntries(
    steps.map((s) => {
      if (pinned[s]) return [s, pinned[s]];
      const lo = anchors.filter((a) => a < s).at(-1)!;
      const hi = anchors.find((a) => a > s)!;
      const t = (s - lo) / (hi - lo);
      const [a, b] = [hexToRgb(pinned[lo]!), hexToRgb(pinned[hi]!)];
      return [s, rgbToHex(a.map((c, i) => c + (b[i] - c) * t))];
    }),
  ) as Record<SurfaceStep, string>;
}

// Both scales run light (0) to dark (950), as Aura expects.
const lightSurface = (t: ThemeValues) =>
  surfaceScale({
    0: t.surface,
    50: t.canvas,
    100: t.surfaceMuted,
    200: t.border,
    300: t.foregroundSubtle,
    600: t.foregroundMuted,
    950: t.foreground,
  });

const darkSurface = (t: ThemeValues) =>
  surfaceScale({
    0: Brand.white,
    50: t.foreground,
    400: t.foregroundMuted,
    600: t.foregroundSubtle,
    700: t.surfaceMuted,
    800: t.border,
    900: t.surface,
    950: t.canvas,
  });

const roles = (t: ThemeValues) => ({
  text: { color: t.foreground, hoverColor: t.foreground, mutedColor: t.foregroundMuted },
  content: { background: t.surface, borderColor: t.border },
});

const primaryColor = {
  color: '{primary.600}',
  contrastColor: Brand.white,
  hoverColor: '{primary.700}',
  activeColor: '{primary.800}',
};

export const ColorArchitecturePreset = definePreset(Aura, {
  primitive: {
    green: palette(Brand.success),
    sky: palette(Brand.info),
    orange: palette(Brand.warning),
    red: palette(Brand.error),
    purple: palette(Brand.hint),
  },
  semantic: {
    primary: PrimaryRamp,
    colorScheme: {
      light: { surface: lightSurface(Theme.light), primary: primaryColor, ...roles(Theme.light) },
      dark: { surface: darkSurface(Theme.dark), primary: primaryColor, ...roles(Theme.dark) },
    },
  },
});
