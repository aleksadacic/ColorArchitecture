<script setup lang="ts">
import { computed } from 'vue';

import ColorSections from '@/components/ColorSections.vue';
import { BrandColor, ColorName } from '@/constants/Colors';
import { usePalette } from '@/hooks/usePalette';
import { methodSections } from '@/utils/colorSections';

const palette = usePalette();

// Class names are written out in full so Tailwind's source scan generates them. Each map is checked with
// `satisfies` against the keys in src/constants/Colors.ts, so a new color without its class fails `vue-tsc`.

const bg = {
  primary: 'bg-primary',
  success: 'bg-success',
  info: 'bg-info',
  warning: 'bg-warning',
  error: 'bg-error',
  hint: 'bg-hint',
  black: 'bg-black',
  white: 'bg-white',
  customColor: 'bg-custom-color',
  primary50: 'bg-primary-50',
  primary100: 'bg-primary-100',
  primary200: 'bg-primary-200',
  primary300: 'bg-primary-300',
  primary400: 'bg-primary-400',
  primary500: 'bg-primary-500',
  primary600: 'bg-primary-600',
  primary700: 'bg-primary-700',
  primary800: 'bg-primary-800',
  primary900: 'bg-primary-900',
  primary950: 'bg-primary-950',
  foreground: 'bg-foreground',
  foregroundMuted: 'bg-foreground-muted',
  foregroundSubtle: 'bg-foreground-subtle',
  surface: 'bg-surface',
  canvas: 'bg-canvas',
  canvasPrimary: 'bg-canvas-primary',
  border: 'bg-border',
  surfaceMuted: 'bg-surface-muted',
} satisfies Record<ColorName, string>;

const text = {
  primary: 'text-primary',
  success: 'text-success',
  info: 'text-info',
  warning: 'text-warning',
  error: 'text-error',
  hint: 'text-hint',
  black: 'text-black',
  white: 'text-white',
  customColor: 'text-custom-color',
} satisfies Record<BrandColor, string>;

const maps = { fill: bg as Record<string, string>, text: text as Record<string, string> };

const sections = computed(() =>
  methodSections({
    id: 'tailwind',
    name: 'Direct Tailwind',
    code: (n, kind) => `class="${maps[kind][n]}"`,
    item: (n: ColorName, kind) => ({ label: maps[kind][n], value: palette.value[n], swatchClass: maps[kind][n] }),
  }),
);
</script>

<template>
  <ColorSections :sections="sections" />
</template>
