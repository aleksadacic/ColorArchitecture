import { definePreset, palette } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

import { Brand, PrimaryRamp, Theme } from '@/constants/Colors';
import { hexToRgb, rgbToHex } from '@/utils/hex';

// PrimeVue's theme, adapted from src/constants/Colors.ts. PrimeVue is an example of compatibility: it
// reads our palette and never shapes it. Built on Aura: only the color tokens are replaced; spacing, radii
// and component structure stay Aura's.

type ThemeValues = (typeof Theme)['light' | 'dark'];
type SurfaceStep = 0 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
const steps: SurfaceStep[] = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

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
  color: Brand.primary,
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
