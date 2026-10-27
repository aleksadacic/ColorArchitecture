<script setup lang="ts">
defineProps<{ title: string; code: string; note?: string }>();
</script>

<template>
  <section class="mb-8">
    <h2 class="text-lg font-bold">{{ title }}</h2>
    <code class="block text-xs opacity-70 mb-1">{{ code }}</code>
    <p v-if="note" class="text-xs text-primary mb-2">{{ note }}</p>
    <div class="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"><slot /></div>
  </section>
</template>
