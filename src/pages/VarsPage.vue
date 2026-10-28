<script setup lang="ts">
import { computed } from 'vue';

import ColorSections from '@/components/ColorSections.vue';
import SvgExample from '@/components/examples/SvgExample.vue';
import Section from '@/components/Section.vue';
import { color } from '@/constants/Colors';
import { usePalette } from '@/hooks/usePalette';
import { methodSections, swatchStyle } from '@/utils/colorSections';

const palette = usePalette();

const property = { fill: 'background', text: 'color' } as const;

// `palette` only supplies the resolved hex shown under each swatch; the swatch itself uses `var()`.
const sections = computed(() =>
  methodSections({
    id: 'vars',
    name: 'CSS variables',
    code: (n, kind) => `style="${property[kind]}: ${color(n)}"  →  color('${n}')`,
    item: (n, kind) => ({ label: color(n), value: palette.value[n], swatchStyle: swatchStyle(color(n), kind) }),
  }),
);
</script>

<template>
  <Section
    id="vars-svg"
    title="Inline SVG"
    code="fill / stroke via currentColor, fill-* classes or var()"
    note="Inline SVG is part of the page, so CSS colors reach it and follow the theme with no JavaScript. Toggle the theme: the last star changes."
  >
    <SvgExample />
  </Section>
  <ColorSections :sections="sections" />
</template>
