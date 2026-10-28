<script setup lang="ts">
import { computed } from 'vue';

import ColorSections from '@/components/ColorSections.vue';
import CanvasExample from '@/components/examples/CanvasExample.vue';
import ShaderExample from '@/components/examples/ShaderExample.vue';
import Section from '@/components/Section.vue';
import { usePalette } from '@/hooks/usePalette';
import { methodSections, swatchStyle } from '@/utils/colorRoles';

const palette = usePalette();

const property = { fill: 'background', text: 'color', border: 'borderColor' } as const;

const sections = computed(() =>
  methodSections({
    id: 'palette',
    name: 'usePalette()',
    code: (n, kind) => `:style="{ ${property[kind]}: palette.${n} }"`,
    item: (n, kind) => {
      const v = palette.value[n];
      return { label: `palette.${n}`, value: v, swatchStyle: swatchStyle(v, kind) };
    },
  }),
);
</script>

<template>
  <Section
    id="palette-shader"
    title="usePalette() → WebGL shader"
    code=":colors=&quot;[palette.primary, palette.canvasPrimary, palette.canvas]&quot;"
    note="Shader uniforms are numbers sent to the GPU; they can't read CSS. Two of the three colors are theme colors, so the shader changes with the toggle."
  >
    <div class="col-span-full">
      <ShaderExample :colors="[palette.primary, palette.canvasPrimary, palette.canvas]" />
    </div>
  </Section>
  <Section
    id="palette-canvas"
    title="usePalette() → canvas 2D"
    code="ctx.fillStyle = palette.primary"
    note="Canvas fillStyle can't resolve var(); the chart redraws when the palette changes."
  >
    <div class="col-span-full">
      <CanvasExample :palette="palette" />
    </div>
  </Section>
  <ColorSections :sections="sections" />
</template>
