<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

import type { Palette } from '@/hooks/usePalette';

// A bar chart drawn with the 2D canvas API. `fillStyle` takes a color string but can't resolve
// `var(--color-*)`, so the colors come from `usePalette()` and the chart redraws when they change.
const props = defineProps<{ palette: Palette }>();

const canvas = ref<HTMLCanvasElement>();
const values = [4, 7, 5, 9, 6, 8, 3];
const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function draw() {
  const el = canvas.value;
  const ctx = el?.getContext('2d');
  if (!el || !ctx) return;
  const p = props.palette;
  const dpr = window.devicePixelRatio || 1;
  const w = el.clientWidth;
  const h = el.clientHeight;
  el.width = w * dpr;
  el.height = h * dpr;
  ctx.scale(dpr, dpr);

  ctx.fillStyle = p.surfaceMuted;
  ctx.fillRect(0, 0, w, h);

  const pad = { top: 16, right: 16, bottom: 28, left: 16 };
  const plotH = h - pad.top - pad.bottom;
  const max = Math.max(...values);

  ctx.strokeStyle = p.border;
  ctx.lineWidth = 1;
  for (let i = 0; i <= 3; i++) {
    const y = Math.round(pad.top + (plotH * i) / 3) + 0.5;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(w - pad.right, y);
    ctx.stroke();
  }

  const slot = (w - pad.left - pad.right) / values.length;
  ctx.font = '600 12px Satoshi, system-ui, sans-serif';
  ctx.textAlign = 'center';
  values.forEach((v, i) => {
    const barH = (plotH * v) / max;
    const x = pad.left + slot * i + slot * 0.2;
    ctx.fillStyle = v === max ? p.primary : p.primary300;
    ctx.beginPath();
    ctx.roundRect(x, pad.top + plotH - barH, slot * 0.6, barH, 6);
    ctx.fill();
    ctx.fillStyle = p.foregroundMuted;
    ctx.fillText(labels[i], x + slot * 0.3, h - 9);
  });
}

let observer: ResizeObserver | undefined;
onMounted(() => {
  draw();
  observer = new ResizeObserver(draw);
  observer.observe(canvas.value!);
});
onBeforeUnmount(() => observer?.disconnect());
watch(() => props.palette, draw);
</script>

<template>
  <canvas ref="canvas" class="block h-56 w-full rounded-2xl" />
</template>
