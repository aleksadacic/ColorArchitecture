<script setup lang="ts">
// `swatchClass` / `swatchStyle` are applied to the chip; `label` is shown below it.
defineProps<{ label: string; value?: string; swatchClass?: string; swatchStyle?: Record<string, string> }>();
</script>

<template>
  <div class="text-xs">
    <div
      class="h-14 rounded-lg border border-black/10 dark:border-white/10 flex items-center justify-center"
      :class="swatchClass"
      :style="swatchStyle"
    >
      <slot />
    </div>
    <div class="mt-1 font-semibold break-all">{{ label }}</div>
    <div v-if="value" class="opacity-60 break-all">{{ value }}</div>
  </div>
</template>
