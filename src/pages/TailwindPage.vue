<script setup lang="ts">
import { computed } from 'vue';

import ColorSections from '@/components/ColorSections.vue';
import { Colors, PrimaryRamp } from '@/constants/Colors';
import { useEffectiveColorScheme } from '@/hooks/useEffectiveColorScheme';
import { ColorSection } from '@/utils/colorRoles';

const scheme = useEffectiveColorScheme();

// Class names are written out in full so Tailwind's source scan generates them. `primary200`/`primary300`
// have no classes of their own; they are the `primary-200`/`primary-300` steps of the ramp.
const brand = [
  ['primary', 'bg-primary', 'text-primary'],
  ['primary200', 'bg-primary-200', 'text-primary-200'],
  ['primary300', 'bg-primary-300', 'text-primary-300'],
  ['success', 'bg-success', 'text-success'],
  ['info', 'bg-info', 'text-info'],
  ['warning', 'bg-warning', 'text-warning'],
  ['error', 'bg-error', 'text-error'],
  ['hint', 'bg-hint', 'text-hint'],
  ['black', 'bg-black', 'text-black'],
  ['white', 'bg-white', 'text-white'],
  ['customColor', 'bg-custom-color', 'text-custom-color'],
] as const;
const text = [
  ['foreground', 'text-foreground'],
  ['foregroundMuted', 'text-foreground-muted'],
  ['foregroundSubtle', 'text-foreground-subtle'],
] as const;
const surfaces = [
  ['surface', 'bg-surface'],
  ['canvas', 'bg-canvas'],
  ['canvasPrimary', 'bg-canvas-primary'],
  ['surfaceMuted', 'bg-surface-muted'],
] as const;
// `!` so the border color wins over the swatch's default outline.
const borders = [['border', 'border-4 border-border!']] as const;
const ramp = Object.entries(PrimaryRamp);

const sections = computed<ColorSection[]>(() => {
  const s = Colors[scheme.value];
  const note = 'Semantic token: one class, switches with the theme via --theme-* variables.';
  return [
    {
      id: 'tailwind-brand',
      title: 'Direct Tailwind: brand colors',
      code: 'class="bg-success"',
      note: 'Generated from the fixed Colors values; same in both modes.',
      items: brand.map(([k, bg]) => ({ label: bg, value: Colors[k], swatchClass: bg })),
    },
    {
      id: 'tailwind-brand-text',
      title: 'Direct Tailwind: brand colors as text',
      code: 'class="text-success"',
      note: 'On the current surface. Same in both modes, so some (e.g. white) disappear in one of them.',
      text: true,
      items: brand.map(([k, , fg]) => ({ label: fg, value: Colors[k], swatchClass: fg })),
    },
    {
      id: 'tailwind-text',
      title: 'Direct Tailwind: text',
      code: 'class="text-foreground"',
      note,
      text: true,
      items: text.map(([k, cls]) => ({ label: cls, value: s[k], swatchClass: cls })),
    },
    {
      id: 'tailwind-surfaces',
      title: 'Direct Tailwind: surfaces',
      code: 'class="bg-surface"',
      note,
      items: surfaces.map(([k, cls]) => ({ label: cls, value: s[k], swatchClass: cls })),
    },
    {
      id: 'tailwind-borders',
      title: 'Direct Tailwind: borders',
      code: 'class="border-border"',
      note,
      items: borders.map(([k, cls]) => ({ label: 'border-border', value: s[k], swatchClass: cls })),
    },
    {
      id: 'tailwind-ramp',
      title: 'Direct Tailwind: primary ramp',
      code: 'class="bg-primary-500"',
      note: 'Tailwind only: generated from PrimaryRamp in Colors.ts.',
      items: ramp.map(([step, v]) => ({ label: `bg-primary-${step}`, value: v, swatchClass: `bg-primary-${step}` })),
    },
  ];
});
</script>

<template>
  <ColorSections :sections="sections" />
</template>
