<script setup lang="ts">
import { pages } from '@/router';
import { setThemeSetting, themeSetting, ThemeSetting } from '@/theme/scheme';

const themes: ThemeSetting[] = ['system', 'light', 'dark'];
</script>

<template>
  <div class="min-h-screen bg-canvas text-foreground">
    <header
      class="sticky top-0 z-10 border-b border-border bg-surface/80 backdrop-blur"
    >
      <div class="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <div class="flex items-center gap-2.5">
          <span class="grid h-8 w-8 grid-cols-2 gap-0.5 overflow-hidden rounded-lg">
            <i class="bg-primary-300" /><i class="bg-primary-500" /><i class="bg-primary-700" /><i class="bg-primary-950" />
          </span>
          <h1 class="text-lg font-black tracking-tight">Color architecture</h1>
        </div>
        <div class="ml-auto flex gap-1 rounded-xl bg-surface-muted p-1">
          <button
            v-for="t in themes"
            :key="t"
            class="cursor-pointer rounded-lg px-3 py-1 text-sm font-bold capitalize transition-colors"
            :class="themeSetting === t ? 'bg-primary text-white shadow-sm' : 'hover:bg-black/5 dark:hover:bg-white/10'"
            @click="setThemeSetting(t)"
          >
            {{ t }}
          </button>
        </div>
      </div>
      <!-- Below lg the sidebar is hidden, so the pages are tabs under the header. -->
      <nav class="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-2 text-sm font-bold sm:px-6 lg:hidden">
        <RouterLink
          v-for="p in pages"
          :key="p.path"
          :to="p.path"
          class="flex shrink-0 items-center gap-2 rounded-xl px-3 py-1.5 hover:bg-surface-muted"
          active-class="bg-surface-muted"
        >
          {{ p.label }}
        </RouterLink>
      </nav>
    </header>

    <div class="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[13rem_1fr]">
      <aside class="hidden lg:block">
        <nav class="sticky top-20 flex flex-col gap-1 text-sm font-bold">
          <p class="mb-1 px-3 text-xs uppercase tracking-widest text-foreground-muted">
            Pages
          </p>
          <RouterLink
            v-for="p in pages"
            :key="p.path"
            :to="p.path"
            class="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-surface-muted"
            active-class="bg-surface-muted"
          >
            {{ p.label }}
          </RouterLink>
        </nav>
      </aside>

      <main class="flex min-w-0 flex-col gap-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
