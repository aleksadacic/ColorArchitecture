<script setup lang="ts">
import { computed } from 'vue';

import ColorSections from '@/components/ColorSections.vue';
import { BrandColor, ColorName, NeutralColor, RampColor } from '@/constants/Colors';
import { usePalette } from '@/hooks/usePalette';
import { BorderThemeColor, methodSections, SurfaceThemeColor, TextThemeColor } from '@/utils/colorRoles';

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
  neutral0: 'bg-neutral-0',
  neutral50: 'bg-neutral-50',
  neutral100: 'bg-neutral-100',
  neutral200: 'bg-neutral-200',
  neutral300: 'bg-neutral-300',
  neutral400: 'bg-neutral-400',
  neutral500: 'bg-neutral-500',
  neutral600: 'bg-neutral-600',
  neutral700: 'bg-neutral-700',
  neutral800: 'bg-neutral-800',
  neutral900: 'bg-neutral-900',
  neutral950: 'bg-neutral-950',
  surface: 'bg-surface',
  canvas: 'bg-canvas',
  canvasPrimary: 'bg-canvas-primary',
  surfaceMuted: 'bg-surface-muted',
} satisfies Record<BrandColor | RampColor | NeutralColor | SurfaceThemeColor, string>;

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
  foreground: 'text-foreground',
  foregroundMuted: 'text-foreground-muted',
  foregroundSubtle: 'text-foreground-subtle',
} satisfies Record<BrandColor | TextThemeColor, string>;

// `!` so the border color wins over the swatch's default outline.
const border = {
  border: 'border-4 border-border!',
} satisfies Record<BorderThemeColor, string>;

const maps = { fill: bg as Record<string, string>, text: text as Record<string, string>, border: border as Record<string, string> };
const label = (cls: string) => cls.replace('border-4 ', '').replace('!', '');

const sections = computed(() =>
  methodSections({
    id: 'tailwind',
    name: 'Direct Tailwind',
    code: (n, kind) => `class="${label(maps[kind][n])}"`,
    item: (n: ColorName, kind) => ({ label: label(maps[kind][n]), value: palette.value[n], swatchClass: maps[kind][n] }),
  }),
);
</script>

<template>
  <ColorSections :sections="sections" />
</template>
