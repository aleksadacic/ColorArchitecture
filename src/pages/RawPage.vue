<script setup lang="ts">
import { computed } from 'vue';

import ColorSections from '@/components/ColorSections.vue';
import { Colors, PrimaryRamp } from '@/constants/Colors';
import { useEffectiveColorScheme } from '@/hooks/useEffectiveColorScheme';
import { brandKeys, byRole, ColorSection, fill, ink, outline, rampSteps } from '@/utils/colorRoles';

const scheme = useEffectiveColorScheme();
const brand = brandKeys.map((k) => [k, Colors[k] as string] as const);

const sections = computed<ColorSection[]>(() => {
  const s = scheme.value;
  const entries = Object.entries(Colors[s]);
  const note = 'Only the active scheme; flips with the toggle.';
  return [
    {
      id: 'raw-brand',
      title: 'Raw Colors constants',
      code: 'style="background: Colors.x"',
      note: 'Not theme-aware: a fixed value regardless of mode.',
      items: brand.map(([k, v]) => ({ label: `Colors.${k}`, value: v, swatchStyle: fill(v) })),
    },
    {
      id: 'raw-ramp',
      title: 'PrimaryRamp',
      code: 'style="background: PrimaryRamp[500]"',
      note: 'The full brand ramp from Colors.ts; same in both modes.',
      items: rampSteps.map((step) => {
        const v = PrimaryRamp[Number(step) as keyof typeof PrimaryRamp];
        return { label: `PrimaryRamp[${step}]`, value: v, swatchStyle: fill(v) };
      }),
    },
    {
      id: 'raw-brand-text',
      title: 'Raw Colors constants as text',
      code: 'style="color: Colors.x"',
      note: 'On the current surface. Not theme-aware, so some values (e.g. white) disappear in one of the modes.',
      text: true,
      items: brand.map(([k, v]) => ({ label: `Colors.${k}`, value: v, swatchStyle: ink(v) })),
    },
    {
      id: 'raw-text',
      title: `Colors.${s}: text`,
      code: 'style="color: Colors[scheme].foreground"',
      note,
      text: true,
      items: byRole(entries, 'text').map(([k, v]) => ({ label: `${s}.${k}`, value: v, swatchStyle: ink(v) })),
    },
    {
      id: 'raw-surfaces',
      title: `Colors.${s}: surfaces`,
      code: 'style="background: Colors[scheme].surface"',
      note,
      items: byRole(entries, 'surface').map(([k, v]) => ({ label: `${s}.${k}`, value: v, swatchStyle: fill(v) })),
    },
    {
      id: 'raw-borders',
      title: `Colors.${s}: borders`,
      code: 'style="border-color: Colors[scheme].border"',
      note,
      items: byRole(entries, 'border').map(([k, v]) => ({ label: `${s}.${k}`, value: v, swatchStyle: outline(v) })),
    },
  ];
});
</script>

<template>
  <ColorSections :sections="sections" />
</template>
