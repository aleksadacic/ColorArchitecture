<script setup lang="ts">
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Select from 'primevue/select';
import Tag from 'primevue/tag';
import ToggleSwitch from 'primevue/toggleswitch';
import { ref } from 'vue';

import Section from '@/components/Section.vue';

const severities = ['secondary', 'success', 'info', 'warn', 'danger', 'help', 'contrast'] as const;

const name = ref('');
const city = ref();
const cities = [{ name: 'Belgrade' }, { name: 'Novi Sad' }, { name: 'Niš' }];
const agreed = ref(true);
const notify = ref(false);

const orders = [
  { id: 'A-1042', customer: 'Ana', total: '€120.00', status: 'Paid', severity: 'success' },
  { id: 'A-1043', customer: 'Marko', total: '€64.50', status: 'Pending', severity: 'warn' },
  { id: 'A-1044', customer: 'Jelena', total: '€310.00', status: 'Refunded', severity: 'info' },
  { id: 'A-1045', customer: 'Stefan', total: '€18.90', status: 'Failed', severity: 'danger' },
] as const;
</script>

<template>
  <Section
    id="primevue-buttons"
    title="PrimeVue: buttons"
    code="<Button severity=&quot;success&quot; />"
    note="Primary is PrimaryRamp; success, info, warn, danger and help are our status colors (palette() keeps each at step 500); secondary and contrast come from the surface scale the preset builds from our theme colors."
  >
    <div class="col-span-full flex flex-col gap-3">
      <div class="flex flex-wrap gap-2">
        <Button label="Primary" />
        <Button v-for="s in severities" :key="s" :label="s" :severity="s" class="capitalize" />
      </div>
      <div class="flex flex-wrap gap-2">
        <Button label="Primary" outlined />
        <Button v-for="s in severities" :key="s" :label="s" :severity="s" outlined class="capitalize" />
      </div>
      <div class="flex flex-wrap gap-2">
        <Button label="Primary" text />
        <Button v-for="s in severities" :key="s" :label="s" :severity="s" text class="capitalize" />
      </div>
    </div>
  </Section>

  <Section
    id="primevue-forms"
    title="PrimeVue: form controls"
    code="<InputText /> <Select /> <Checkbox /> <ToggleSwitch />"
    note="Field backgrounds and borders are surface steps built from our theme colors; focus and checked states use the primary color."
  >
    <div class="col-span-full grid gap-4 sm:grid-cols-2">
      <InputText v-model="name" placeholder="Your name" />
      <Select v-model="city" :options="cities" option-label="name" placeholder="Select a city" />
      <InputText placeholder="Disabled" disabled />
      <div class="flex items-center gap-6">
        <label class="flex items-center gap-2"><Checkbox v-model="agreed" binary /> Agree</label>
        <label class="flex items-center gap-2"><ToggleSwitch v-model="notify" /> Notify me</label>
      </div>
    </div>
  </Section>

  <Section
    id="primevue-feedback"
    title="PrimeVue: tags and messages"
    code="<Tag severity=&quot;warn&quot; /> <Message severity=&quot;error&quot; />"
    note="Tinted backgrounds are light/dark steps of the scales palette() generated from our status colors."
  >
    <div class="col-span-full flex flex-col gap-3">
      <div class="flex flex-wrap gap-2">
        <Tag value="Primary" />
        <Tag v-for="s in severities" :key="s" :value="s" :severity="s" class="capitalize" />
      </div>
      <Message severity="success">Order placed.</Message>
      <Message severity="info">Shipping takes 2–3 days.</Message>
      <Message severity="warn">Your card expires next month.</Message>
      <Message severity="error">Payment failed.</Message>
    </div>
  </Section>

  <Section
    id="primevue-table"
    title="PrimeVue: data table"
    code="<DataTable :value=&quot;orders&quot; />"
    note="Row backgrounds, borders and text use the theme colors from Colors.ts."
  >
    <div class="col-span-full">
      <DataTable :value="orders" size="small">
        <Column field="id" header="Order" />
        <Column field="customer" header="Customer" />
        <Column field="total" header="Total" />
        <Column header="Status">
          <template #body="{ data }"><Tag :value="data.status" :severity="data.severity" /></template>
        </Column>
      </DataTable>
    </div>
  </Section>
</template>
