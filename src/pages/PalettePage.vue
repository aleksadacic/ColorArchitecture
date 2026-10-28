<script setup lang="ts">
import { computed } from 'vue';

import ColorSections from '@/components/ColorSections.vue';
import { usePalette } from '@/hooks/usePalette';
import { brandKeys, byRole, ColorSection, fill, ink, outline } from '@/utils/colorRoles';

const palette = usePalette();

const sections = computed<ColorSection[]>(() => {
  const entries = Object.entries(palette.value) as [string, string][];
  const brand = entries.filter(([k]) => (brandKeys as string[]).includes(k));
  const themed = entries.filter(([k]) => !(brandKeys as string[]).includes(k));
  const note = 'Theme-resolved hex; flips with the toggle.';
  return [
    {
      id: 'palette-brand',
      title: 'usePalette(): brand colors',
      code: ':style="{ background: palette.x }"',
      note: 'Same value in both modes.',
      items: brand.map(([k, v]) => ({ label: `palette.${k}`, value: v, swatchStyle: fill(v) })),
    },
    {
      id: 'palette-brand-text',
      title: 'usePalette(): brand colors as text',
      code: ':style="{ color: palette.x }"',
      note: 'On the current surface. Same value in both modes, so some (e.g. white) disappear in one of them.',
      text: true,
      items: brand.map(([k, v]) => ({ label: `palette.${k}`, value: v, swatchStyle: ink(v) })),
    },
    {
      id: 'palette-text',
      title: 'usePalette(): text',
      code: ':style="{ color: palette.foreground }"',
      note,
      text: true,
      items: byRole(themed, 'text').map(([k, v]) => ({ label: `palette.${k}`, value: v, swatchStyle: ink(v) })),
    },
    {
      id: 'palette-surfaces',
      title: 'usePalette(): surfaces',
      code: ':style="{ background: palette.surface }"',
      note,
      items: byRole(themed, 'surface').map(([k, v]) => ({ label: `palette.${k}`, value: v, swatchStyle: fill(v) })),
    },
    {
      id: 'palette-borders',
      title: 'usePalette(): borders',
      code: ':style="{ borderColor: palette.border }"',
      note,
      items: byRole(themed, 'border').map(([k, v]) => ({ label: `palette.${k}`, value: v, swatchStyle: outline(v) })),
    },
  ];
});
</script>

<template>
  <ColorSections :sections="sections" />
</template>
