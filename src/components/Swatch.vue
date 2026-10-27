<script setup lang="ts">
// `swatchClass` / `swatchStyle` are applied to the chip; `label` is shown below it.
defineProps<{ label: string; value?: string; swatchClass?: string; swatchStyle?: Record<string, string> }>();
</script>

<template>
  <div class="min-w-0">
    <div
      class="flex h-20 items-center justify-center rounded-2xl border border-black/10 shadow-sm dark:border-white/10"
      :class="swatchClass"
      :style="swatchStyle"
    >
      <slot />
    </div>
    <div class="mt-2 break-words text-sm font-bold leading-tight">{{ label }}</div>
    <div v-if="value" class="mt-0.5 break-all font-mono text-xs text-light-text-secondary dark:text-dark-text-secondary">
      {{ value }}
    </div>
  </div>
</template>
