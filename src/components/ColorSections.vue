<script setup lang="ts">
import Section from '@/components/Section.vue';
import Swatch from '@/components/Swatch.vue';
import type { ColorSection } from '@/utils/colorSections';

defineProps<{ sections: ColorSection[] }>();
</script>

<template>
  <Section v-for="s in sections" :id="s.id" :key="s.id" :title="s.title" :code="s.code" :note="s.note">
    <Swatch
      v-for="item in s.items"
      :key="item.label"
      :label="item.label"
      :value="item.value"
      :swatch-class="item.swatchClass"
      :swatch-style="item.swatchStyle"
    >
      <span v-if="s.text" class="text-xl font-bold">Sample text</span>
    </Swatch>
  </Section>
</template>
