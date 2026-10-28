<script setup lang="ts">
import { computed } from 'vue';

import Section from '@/components/Section.vue';
import Swatch from '@/components/Swatch.vue';
import { Colors } from '@/constants/Colors';
import { useEffectiveColorScheme } from '@/hooks/useEffectiveColorScheme';

const scheme = useEffectiveColorScheme();
const rawBrand = Object.entries(Colors).filter(([, v]) => typeof v === 'string') as [string, string][];
const rawScheme = computed(() => Object.entries(Colors[scheme.value]));
</script>

<template>
  <Section id="raw" num="1" title="Raw Colors constants" code="style=&quot;background: Colors.x&quot;" note="Not theme-aware: a fixed value regardless of mode.">
    <Swatch v-for="[k, v] in rawBrand" :key="k" :label="`Colors.${k}`" :value="v" :swatch-style="{ background: v }" />
  </Section>
  <Section id="raw-1b" num="1b" :title="`Colors.${scheme}`" code="Colors[scheme][key]" note="Only the active scheme; flips with the toggle.">
    <Swatch v-for="[k, v] in rawScheme" :key="k" :label="`${scheme}.${k}`" :value="v" :swatch-style="{ background: v }" />
  </Section>
</template>
