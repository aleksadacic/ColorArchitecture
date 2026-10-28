<script setup lang="ts">
import { computed } from 'vue';

import Section from '@/components/Section.vue';
import Swatch from '@/components/Swatch.vue';
import { usePalette } from '@/hooks/usePalette';

const palette = usePalette();
const paletteEntries = computed(() => Object.entries(palette.value));
</script>

<template>
  <Section id="palette" title="usePalette()" code=":style=&quot;{ background: palette.x }&quot;" note="Theme-resolved hex; flips with the toggle.">
    <Swatch v-for="[k, v] in paletteEntries" :key="k" :label="`palette.${k}`" :value="v" :swatch-style="{ background: v }" />
  </Section>
</template>
