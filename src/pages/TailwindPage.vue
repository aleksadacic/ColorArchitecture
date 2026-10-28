<script setup lang="ts">
import Section from '@/components/Section.vue';
import Swatch from '@/components/Swatch.vue';
import { PrimaryRamp } from '@/constants/Colors';

const ramp = Object.keys(PrimaryRamp);
</script>

<template>
  <Section id="tailwind-ramp" title="Direct Tailwind: primary ramp" code="bg-primary-500 (generated from PrimaryRamp in Colors.ts)">
    <Swatch v-for="s in ramp" :key="s" :label="`primary-${s}`" :swatch-class="`bg-primary-${s}`" />
  </Section>
  <Section id="tailwind-pairs" title="Direct Tailwind: light-/dark- tokens" code="bg-light-canvas dark:bg-dark-canvas">
    <Swatch label="canvas" swatch-class="bg-light-canvas dark:bg-dark-canvas" />
    <Swatch label="surface" swatch-class="bg-light-surface dark:bg-dark-surface" />
    <Swatch label="surface-muted" swatch-class="bg-light-surface-muted dark:bg-dark-surface-muted" />
    <Swatch label="border" swatch-class="border-4 border-light-border dark:border-dark-border" />
    <Swatch label="foreground-muted" swatch-class="text-2xl font-bold text-light-foreground-muted dark:text-dark-foreground-muted">Aa</Swatch>
  </Section>
  <Section
    id="tailwind-brand"
    title="Direct Tailwind: status and brand colors"
    code="bg-success (generated from Colors in tailwind.config.js)"
    note="These had no classes in the RN config; now every fixed Colors value has one."
  >
    <Swatch label="bg-success" swatch-class="bg-success" />
    <Swatch label="bg-info" swatch-class="bg-info" />
    <Swatch label="bg-warning" swatch-class="bg-warning" />
    <Swatch label="bg-error" swatch-class="bg-error" />
    <Swatch label="bg-hint" swatch-class="bg-hint" />
    <Swatch label="text-dark-foreground-subtle (fixed)" swatch-class="text-2xl font-bold bg-black text-dark-foreground-subtle">Aa</Swatch>
  </Section>
  <Section
    id="tailwind-semantic"
    title="Direct Tailwind: semantic tokens"
    code="bg-canvas (var(--theme-canvas), set per theme)"
    note="One class per role, no dark: pair. Same colors as the light-/dark- tokens; flips with the toggle."
  >
    <Swatch label="bg-canvas" swatch-class="bg-canvas" />
    <Swatch label="bg-surface" swatch-class="bg-surface" />
    <Swatch label="bg-surface-muted" swatch-class="bg-surface-muted" />
    <Swatch label="border-border" swatch-class="border-4 border-border" />
    <Swatch label="text-foreground" swatch-class="text-2xl font-bold text-foreground">Aa</Swatch>
    <Swatch label="text-foreground-muted" swatch-class="text-2xl font-bold text-foreground-muted">Aa</Swatch>
    <Swatch label="text-foreground-subtle" swatch-class="text-2xl font-bold text-foreground-subtle">Aa</Swatch>
  </Section>
</template>
