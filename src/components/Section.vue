<script setup lang="ts">
defineProps<{ id: string; num: string; title: string; code: string; note?: string }>();
</script>

<template>
  <section
    :id="id"
    class="rounded-3xl border border-border bg-surface p-5 sm:p-7"
  >
    <header class="mb-5 flex items-start gap-4">
      <span
        class="mt-0.5 flex h-9 min-w-9 items-center justify-center rounded-xl bg-primary-100 px-2 text-sm font-black text-primary-700 dark:bg-primary-950 dark:text-primary-300"
      >
        {{ num }}
      </span>
      <div class="min-w-0">
        <h2 class="text-xl font-black tracking-tight">{{ title }}</h2>
        <code
          class="mt-1 inline-block max-w-full break-all rounded-md bg-surface-muted px-2 py-0.5 text-xs text-foreground-muted"
        >
          {{ code }}
        </code>
        <p v-if="note" class="mt-2 text-sm text-foreground-muted">{{ note }}</p>
      </div>
    </header>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"><slot /></div>
  </section>
</template>
