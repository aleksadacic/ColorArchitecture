<script setup lang="ts">
import { computed, watchEffect } from 'vue';

import Section from '@/components/Section.vue';
import Swatch from '@/components/Swatch.vue';
import { Colors } from '@/constants/Colors';
import { ColorClass } from '@/constants/ColorClass';
import { useEffectiveColorScheme } from '@/hooks/useEffectiveColorScheme';
import { usePalette } from '@/hooks/usePalette';
import { setThemeSetting, themeSetting, ThemeSetting } from '@/stores/useAppPreferencesStore';

const scheme = useEffectiveColorScheme();
const palette = usePalette();

// NativeWind does this for RN; on web `darkMode: 'class'` needs the class on <html>.
watchEffect(() => document.documentElement.classList.toggle('dark', scheme.value === 'dark'));

const nav = [
  ['raw', '1', 'Raw constants'],
  ['palette', '2', 'usePalette()'],
  ['class', '3', 'ColorClass'],
  ['tailwind', '4', 'Direct Tailwind'],
  ['alpha', '5', 'Alpha literals'],
  ['vars', '6', 'CSS variables'],
] as const;
const themes: ThemeSetting[] = ['system', 'light', 'dark'];
const rawBrand = Object.entries(Colors).filter(([, v]) => typeof v === 'string') as [string, string][];
const rawLight = Object.entries(Colors.light);
const rawDark = Object.entries(Colors.dark);
const paletteEntries = computed(() => Object.entries(palette.value));
const ramp = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
const classGroups = Object.entries(ColorClass).flatMap(([group, m]) =>
  Object.entries(m).map(([k, cls]) => ({ id: `${group}.${k}`, cls })),
);
</script>

<template>
  <div class="min-h-screen bg-light-container text-light-text dark:bg-dark-container dark:text-dark-text">
    <header
      class="sticky top-0 z-10 border-b border-light-border bg-light-background/80 backdrop-blur dark:border-dark-border dark:bg-dark-background/80"
    >
      <div class="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <div class="flex items-center gap-2.5">
          <span class="grid h-8 w-8 grid-cols-2 gap-0.5 overflow-hidden rounded-lg">
            <i class="bg-primary-300" /><i class="bg-primary-500" /><i class="bg-primary-700" /><i class="bg-primary-950" />
          </span>
          <h1 class="text-lg font-black tracking-tight">Color architecture</h1>
        </div>
        <div class="ml-auto flex gap-1 rounded-xl bg-light-background-soft p-1 dark:bg-dark-background-soft">
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
    </header>

    <div class="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[13rem_1fr]">
      <aside class="hidden lg:block">
        <nav class="sticky top-20 flex flex-col gap-1 text-sm font-bold">
          <p class="mb-1 px-3 text-xs uppercase tracking-widest text-light-text-secondary dark:text-dark-text-secondary">
            Usage methods
          </p>
          <a
            v-for="[id, n, label] in nav"
            :key="id"
            :href="'#' + id"
            class="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-light-background-soft dark:hover:bg-dark-background-soft"
          >
            <span class="text-xs text-primary">{{ n }}</span>{{ label }}
          </a>
        </nav>
      </aside>

      <main class="flex min-w-0 flex-col gap-6">
<Section id="raw" num="1" title="Raw Colors constants" code="style=&quot;background: Colors.x&quot;" note="Not theme-aware: a fixed value regardless of mode.">
      <Swatch v-for="[k, v] in rawBrand" :key="k" :label="`Colors.${k}`" :value="v" :swatch-style="{ background: v }" />
    </Section>
    <Section id="raw-1b" num="1b" title="Colors.light vs Colors.dark" code="Colors[scheme][key]">
      <Swatch v-for="[k, v] in rawLight" :key="'l' + k" :label="`light.${k}`" :value="v" :swatch-style="{ background: v }" />
      <Swatch v-for="[k, v] in rawDark" :key="'d' + k" :label="`dark.${k}`" :value="v" :swatch-style="{ background: v }" />
    </Section>

    <Section id="palette" num="2" title="usePalette()" code=":style=&quot;{ background: palette.x }&quot;" note="Theme-resolved hex; flips with the toggle.">
      <Swatch v-for="[k, v] in paletteEntries" :key="k" :label="`palette.${k}`" :value="v" :swatch-style="{ background: v }" />
    </Section>

    <Section id="class" num="3" title="ColorClass" code=":class=&quot;ColorClass.group.key&quot;" note="Backgrounds use bg-*; text entries show 'Aa'; borders show an outline.">
      <Swatch v-for="c in classGroups" :key="c.id" :label="c.id" :value="c.cls">
        <span :class="c.id.startsWith('text') ? [c.cls, 'text-2xl font-bold bg-gray-400/30 px-2 rounded'] : c.cls" class="w-full h-full flex items-center justify-center">
          {{ c.id.startsWith('text') ? 'Aa' : '' }}
        </span>
      </Swatch>
    </Section>

    <Section id="tailwind" num="4a" title="Direct Tailwind: primary ramp" code="bg-primary-500 (defined only in tailwind.config.js)">
      <Swatch v-for="s in ramp" :key="s" :label="`primary-${s}`" :swatch-class="`bg-primary-${s}`" />
    </Section>
    <Section id="tailwind-4b" num="4b" title="Direct Tailwind: light-/dark- tokens" code="bg-light-container dark:bg-dark-container">
      <Swatch label="container" swatch-class="bg-light-container dark:bg-dark-container" />
      <Swatch label="background" swatch-class="bg-light-background dark:bg-dark-background" />
      <Swatch label="background-soft" swatch-class="bg-light-background-soft dark:bg-dark-background-soft" />
      <Swatch label="border" swatch-class="border-4 border-light-border dark:border-dark-border" />
      <Swatch label="text-secondary" swatch-class="text-2xl font-bold text-light-text-secondary dark:text-dark-text-secondary">Aa</Swatch>
    </Section>
    <Section
      id="tailwind-4c"
      num="4c"
      title="Gaps in the Tailwind mapping"
      code="status colors have no classes"
      note="Expect: blank chips where a class does not resolve."
    >
      <Swatch label="bg-success (missing)" swatch-class="bg-success" />
      <Swatch label="bg-error (missing)" swatch-class="bg-error" />
      <Swatch label="text-dark-text-tertiary (fixed)" swatch-class="text-2xl font-bold bg-black text-dark-text-tertiary">Aa</Swatch>
    </Section>

    <Section id="alpha" num="5" title="Hand-written alpha literals" code="rgba(255,51,25,0.14) copied from primary" note="Used by TSwitch / ContractCard; will not follow a primary change.">
      <Swatch label="primary @ 0.14" value="rgba(255, 51, 25, 0.14)" :swatch-style="{ background: 'rgba(255, 51, 25, 0.14)' }" />
      <Swatch label="primary @ 0.30" value="rgba(255,51,25,0.30)" :swatch-style="{ background: 'rgba(255,51,25,0.30)' }" />
      <Swatch label="black @ 0.24" value="rgba(0,0,0,0.24)" :swatch-style="{ background: 'rgba(0,0,0,0.24)' }" />
    </Section>

    <Section id="vars" num="6" title="Unused shadcn CSS variables" code="hsl(var(--primary))" note="Copied from RN global.css; nothing in RN consumes them.">
      <Swatch label="--primary" :swatch-style="{ background: 'hsl(var(--primary))' }" />
      <Swatch label="--background" :swatch-style="{ background: 'hsl(var(--background))' }" />
      <Swatch label="--destructive" :swatch-style="{ background: 'hsl(var(--destructive))' }" />
    </Section>
        </main>
    </div>
  </div>
</template>
