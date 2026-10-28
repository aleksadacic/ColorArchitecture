<script setup lang="ts">
import { color } from '@/utils/colors';

// Inline SVG is part of the page, so CSS colors reach it and follow the theme with no JavaScript.
// `usePalette()` is only needed for an SVG that leaves the page (an <img src>, a data URL, a download).
const star = 'M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z';

const samples = [
  { code: 'fill="currentColor" + class="text-primary"', cls: 'text-primary', fill: 'currentColor' },
  { code: 'class="fill-success stroke-foreground"', cls: 'fill-success stroke-foreground', fill: undefined },
  { code: `style="fill: ${color('info')}"`, style: { fill: color('info') }, fill: undefined },
  { code: 'class="fill-foreground-muted"', cls: 'fill-foreground-muted', fill: undefined },
];
</script>

<template>
  <div v-for="s in samples" :key="s.code" class="min-w-0">
    <div class="flex h-20 items-center justify-center rounded-2xl border border-border">
      <svg viewBox="0 0 24 24" class="h-12 w-12" :class="s.cls" :style="s.style" stroke-width="1.5" stroke-linejoin="round">
        <path :d="star" :fill="s.fill" />
      </svg>
    </div>
    <div class="mt-2 break-words font-mono text-xs leading-tight text-foreground-muted">{{ s.code }}</div>
  </div>
</template>
