<script setup lang="ts">
import { computed } from 'vue';

import ColorSections from '@/components/ColorSections.vue';
import { Colors, PrimaryRamp, ThemeKey } from '@/constants/Colors';
import { useEffectiveColorScheme } from '@/hooks/useEffectiveColorScheme';
import { byRole, ColorSection } from '@/utils/colorRoles';

const scheme = useEffectiveColorScheme();

// Class names are written out in full so Tailwind's source scan generates them. Each map is keyed by the
// `Colors` key and checked with `satisfies`, so adding a color to Colors.ts without its class here fails
// `vue-tsc` and names the missing key.

type BrandKey = Exclude<keyof typeof Colors, 'light' | 'dark'>;
type RampStep = keyof typeof PrimaryRamp;

const brand = {
  primary: { bg: 'bg-primary', text: 'text-primary' },
  success: { bg: 'bg-success', text: 'text-success' },
  info: { bg: 'bg-info', text: 'text-info' },
  warning: { bg: 'bg-warning', text: 'text-warning' },
  error: { bg: 'bg-error', text: 'text-error' },
  hint: { bg: 'bg-hint', text: 'text-hint' },
  black: { bg: 'bg-black', text: 'text-black' },
  white: { bg: 'bg-white', text: 'text-white' },
  customColor: { bg: 'bg-custom-color', text: 'text-custom-color' },
} satisfies Record<BrandKey, { bg: string; text: string }>;

const ramp = {
  50: 'bg-primary-50',
  100: 'bg-primary-100',
  200: 'bg-primary-200',
  300: 'bg-primary-300',
  400: 'bg-primary-400',
  500: 'bg-primary-500',
  600: 'bg-primary-600',
  700: 'bg-primary-700',
  800: 'bg-primary-800',
  900: 'bg-primary-900',
  950: 'bg-primary-950',
} satisfies Record<RampStep, string>;

// Semantic tokens; `byRole` sorts them into text, surfaces and borders like the other pages. `!` so the
// border color wins over the swatch's default outline.
const semantic = {
  foreground: 'text-foreground',
  foregroundMuted: 'text-foreground-muted',
  foregroundSubtle: 'text-foreground-subtle',
  surface: 'bg-surface',
  canvas: 'bg-canvas',
  canvasPrimary: 'bg-canvas-primary',
  border: 'border-4 border-border!',
  surfaceMuted: 'bg-surface-muted',
} satisfies Record<ThemeKey, string>;

const brandEntries = Object.entries(brand) as [BrandKey, (typeof brand)[BrandKey]][];
const rampEntries = Object.entries(ramp) as [`${RampStep}`, string][];
const semanticEntries = Object.entries(semantic) as [ThemeKey, string][];

const sections = computed<ColorSection[]>(() => {
  const s = Colors[scheme.value];
  const note = 'Semantic token: one class, switches with the theme via --theme-* variables.';
  const item = ([k, cls]: [ThemeKey, string]) => ({
    label: cls.replace('border-4 ', '').replace('!', ''),
    value: s[k],
    swatchClass: cls,
  });
  return [
    {
      id: 'tailwind-brand',
      title: 'Direct Tailwind: brand colors',
      code: 'class="bg-success"',
      note: 'Generated from the fixed Colors values; same in both modes.',
      items: brandEntries.map(([k, c]) => ({ label: c.bg, value: Colors[k], swatchClass: c.bg })),
    },
    {
      id: 'tailwind-ramp',
      title: 'Direct Tailwind: primary ramp',
      code: 'class="bg-primary-500"',
      note: 'Generated from PrimaryRamp in Colors.ts; same in both modes.',
      items: rampEntries.map(([step, cls]) => ({ label: cls, value: PrimaryRamp[Number(step) as RampStep], swatchClass: cls })),
    },
    {
      id: 'tailwind-brand-text',
      title: 'Direct Tailwind: brand colors as text',
      code: 'class="text-success"',
      note: 'On the current surface. Same in both modes, so some (e.g. white) disappear in one of them.',
      text: true,
      items: brandEntries.map(([k, c]) => ({ label: c.text, value: Colors[k], swatchClass: c.text })),
    },
    {
      id: 'tailwind-text',
      title: 'Direct Tailwind: text',
      code: 'class="text-foreground"',
      note,
      text: true,
      items: byRole(semanticEntries, 'text').map(item),
    },
    {
      id: 'tailwind-surfaces',
      title: 'Direct Tailwind: surfaces',
      code: 'class="bg-surface"',
      note,
      items: byRole(semanticEntries, 'surface').map(item),
    },
    {
      id: 'tailwind-borders',
      title: 'Direct Tailwind: borders',
      code: 'class="border-border"',
      note,
      items: byRole(semanticEntries, 'border').map(item),
    },
  ];
});
</script>

<template>
  <ColorSections :sections="sections" />
</template>
