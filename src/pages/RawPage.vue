<script setup lang="ts">
import Section from '@/components/Section.vue';
import Swatch from '@/components/Swatch.vue';
import { Colors } from '@/constants/Colors';

const rawBrand = Object.entries(Colors).filter(([, v]) => typeof v === 'string') as [string, string][];
const rawLight = Object.entries(Colors.light);
const rawDark = Object.entries(Colors.dark);
</script>

<template>
  <Section id="raw" num="1" title="Raw Colors constants" code="style=&quot;background: Colors.x&quot;" note="Not theme-aware: a fixed value regardless of mode.">
    <Swatch v-for="[k, v] in rawBrand" :key="k" :label="`Colors.${k}`" :value="v" :swatch-style="{ background: v }" />
  </Section>
  <Section id="raw-1b" num="1b" title="Colors.light vs Colors.dark" code="Colors[scheme][key]">
    <Swatch v-for="[k, v] in rawLight" :key="'l' + k" :label="`light.${k}`" :value="v" :swatch-style="{ background: v }" />
    <Swatch v-for="[k, v] in rawDark" :key="'d' + k" :label="`dark.${k}`" :value="v" :swatch-style="{ background: v }" />
  </Section>
</template>
