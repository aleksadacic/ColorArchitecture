import { definePreset, palette } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

import { Brand, NeutralRamp, PrimaryRamp, Theme } from '@/constants/Colors';

// PrimeVue's theme, generated from src/constants/Colors.ts so it stays the single source of truth.
// Built on Aura: only the color tokens are replaced; spacing, radii and component structure stay Aura's.
//
// - `primary` is our PrimaryRamp. Aura's `primary.color` is step 500 (400 in dark); ours is the brand
//   primary (step 600) in both modes, like the rest of the app.
// - `surface` is the theme's NeutralRamp. Aura's component tokens reference its steps, so every component
//   picks up our neutrals.
// - The role tokens our app defines (text, muted text, content background, borders) are set to our role
//   colors, where Aura would pick a different neutral step.
// - Severity colors (success, info, warn, danger, help) use Aura's `green`, `sky`, `orange`, `red` and
//   `purple` scales. They are regenerated from our status colors with `palette()`, which keeps the input
//   at step 500, the step Aura uses for the base color.

const roles = (t: (typeof Theme)['light' | 'dark']) => ({
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
      light: { surface: NeutralRamp.light, primary: primaryColor, ...roles(Theme.light) },
      dark: { surface: NeutralRamp.dark, primary: primaryColor, ...roles(Theme.dark) },
    },
  },
});
