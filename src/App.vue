<script setup lang="ts">
import { computed, watchEffect } from 'vue';

import Section from '@/components/Section.vue';
import Swatch from '@/components/Swatch.vue';
import { Colors } from '@/constants/Colors';
import { useEffectiveColorScheme } from '@/hooks/useEffectiveColorScheme';
import { usePalette } from '@/hooks/usePalette';
import { usePaletteClass } from '@/hooks/usePaletteClass';
import { setThemeSetting, themeSetting, ThemeSetting } from '@/stores/useAppPreferencesStore';

const scheme = useEffectiveColorScheme();
const palette = usePalette();
const pc = usePaletteClass();

// NativeWind does this for RN; on web `darkMode: 'class'` needs the class on <html>.
watchEffect(() => document.documentElement.classList.toggle('dark', scheme.value === 'dark'));

const themes: ThemeSetting[] = ['system', 'light', 'dark'];
const rawBrand = Object.entries(Colors).filter(([, v]) => typeof v === 'string') as [string, string][];
const rawLight = Object.entries(Colors.light);
const rawDark = Object.entries(Colors.dark);
const paletteEntries = computed(() => Object.entries(palette.value));
const ramp = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
const classGroups = computed(() =>
  Object.entries(pc.value).flatMap(([group, m]) => Object.entries(m).map(([k, cls]) => ({ id: `${group}.${k}`, cls }))),
);
</script>

<template>
  <main class="min-h-screen p-6 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text">
    <header class="flex flex-wrap items-center gap-4 mb-8">
      <h1 class="text-2xl font-extrabold">Color architecture <span class="text-primary">demo</span></h1>
      <div class="flex gap-1 p-1 rounded-lg bg-light-background-soft dark:bg-dark-background-soft">
        <button
          v-for="t in themes"
          :key="t"
          class="px-3 py-1 rounded-md text-sm"
          :class="themeSetting === t ? 'bg-primary text-white' : ''"
          @click="setThemeSetting(t)"
        >
          {{ t }}
        </button>
      </div>
      <span class="text-sm opacity-70">effective: {{ scheme }}</span>
    </header>

    <Section title="1. Raw Colors constants" code="style=&quot;background: Colors.x&quot;" note="Not theme-aware: a fixed value regardless of mode.">
      <Swatch v-for="[k, v] in rawBrand" :key="k" :label="`Colors.${k}`" :value="v" :swatch-style="{ background: v }" />
    </Section>
    <Section title="1b. Colors.light vs Colors.dark" code="Colors[scheme][key]">
      <Swatch v-for="[k, v] in rawLight" :key="'l' + k" :label="`light.${k}`" :value="v" :swatch-style="{ background: v }" />
      <Swatch v-for="[k, v] in rawDark" :key="'d' + k" :label="`dark.${k}`" :value="v" :swatch-style="{ background: v }" />
    </Section>

    <Section title="2. usePalette()" code=":style=&quot;{ background: palette.x }&quot;" note="Theme-resolved hex; flips with the toggle.">
      <Swatch v-for="[k, v] in paletteEntries" :key="k" :label="`palette.${k}`" :value="v" :swatch-style="{ background: v }" />
    </Section>

    <Section title="3. usePaletteClass()" code=":class=&quot;paletteClass.group.key&quot;" note="Backgrounds use bg-*; text entries show 'Aa'; borders show an outline.">
      <Swatch v-for="c in classGroups" :key="c.id" :label="c.id" :value="c.cls">
        <span :class="c.id.startsWith('text') ? [c.cls, 'text-2xl font-bold bg-gray-400/30 px-2 rounded'] : c.cls" class="w-full h-full flex items-center justify-center">
          {{ c.id.startsWith('text') ? 'Aa' : '' }}
        </span>
      </Swatch>
    </Section>

    <Section title="4a. Direct Tailwind: primary ramp" code="bg-primary-500 (defined only in tailwind.config.js)">
      <Swatch v-for="s in ramp" :key="s" :label="`primary-${s}`" :swatch-class="`bg-primary-${s}`" />
    </Section>
    <Section title="4b. Direct Tailwind: light-/dark- tokens" code="bg-light-container dark:bg-dark-container">
      <Swatch label="container" swatch-class="bg-light-container dark:bg-dark-container" />
      <Swatch label="background" swatch-class="bg-light-background dark:bg-dark-background" />
      <Swatch label="background-soft" swatch-class="bg-light-background-soft dark:bg-dark-background-soft" />
      <Swatch label="border" swatch-class="border-4 border-light-border dark:border-dark-border" />
      <Swatch label="text-secondary" swatch-class="text-2xl font-bold text-light-text-secondary dark:text-dark-text-secondary">Aa</Swatch>
    </Section>
    <Section
      title="4c. Gaps in the Tailwind mapping"
      code="status colors have no classes; dark tertiary token is misnamed"
      note="Expect: blank chips where a class does not resolve."
    >
      <Swatch label="bg-success (missing)" swatch-class="bg-success" />
      <Swatch label="bg-error (missing)" swatch-class="bg-error" />
      <Swatch label="dark:text-dark-text-tertiary (typo: unresolved)" swatch-class="text-2xl font-bold bg-black text-dark-text-tertiary">Aa</Swatch>
      <Swatch label="text-light-dark-tertiary (actual name)" swatch-class="text-2xl font-bold bg-black text-light-dark-tertiary">Aa</Swatch>
    </Section>

    <Section title="5. Hand-written alpha literals" code="rgba(255,51,25,0.14) copied from primary" note="Used by TSwitch / ContractCard; will not follow a primary change.">
      <Swatch label="primary @ 0.14" value="rgba(255, 51, 25, 0.14)" :swatch-style="{ background: 'rgba(255, 51, 25, 0.14)' }" />
      <Swatch label="primary @ 0.30" value="rgba(255,51,25,0.30)" :swatch-style="{ background: 'rgba(255,51,25,0.30)' }" />
      <Swatch label="black @ 0.24" value="rgba(0,0,0,0.24)" :swatch-style="{ background: 'rgba(0,0,0,0.24)' }" />
    </Section>

    <Section title="6. Unused shadcn CSS variables" code="hsl(var(--primary))" note="Copied from RN global.css; nothing in RN consumes them.">
      <Swatch label="--primary" :swatch-style="{ background: 'hsl(var(--primary))' }" />
      <Swatch label="--background" :swatch-style="{ background: 'hsl(var(--background))' }" />
      <Swatch label="--destructive" :swatch-style="{ background: 'hsl(var(--destructive))' }" />
    </Section>
  </main>
</template>
