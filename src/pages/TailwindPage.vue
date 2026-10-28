<script setup lang="ts">
import { computed } from 'vue';

import ColorSections from '@/components/ColorSections.vue';
import { ColorName } from '@/constants/Colors';
import { usePalette } from '@/hooks/usePalette';
import { cssName } from '@/utils/colors';
import { methodSections, SwatchKind } from '@/utils/colorSections';

const palette = usePalette();

// This page shows every color, so it builds class names instead of writing ~40 of them out. Tailwind can't
// find a built name in the source; build/colorTheme.ts lists every `bg-*` and `text-*` color class for it
// with `@source inline`. In app code, write classes out in full (`class="bg-surface"`).
const prefix = { fill: 'bg', text: 'text' } satisfies Record<SwatchKind, string>;
const cls = (n: ColorName, kind: SwatchKind) => `${prefix[kind]}-${cssName(n)}`;

const sections = computed(() =>
  methodSections({
    id: 'tailwind',
    name: 'Direct Tailwind',
    code: (n, kind) => `class="${cls(n, kind)}"`,
    item: (n, kind) => ({ label: cls(n, kind), value: palette.value[n], swatchClass: cls(n, kind) }),
  }),
);
</script>

<template>
  <ColorSections :sections="sections" />
</template>
