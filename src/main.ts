import PrimeVue from 'primevue/config';
import { createApp } from 'vue';

import App from './App.vue';
import { router } from './router';
import './style.css';
import { ColorArchitecturePreset } from './theme/primevuePreset';

createApp(App)
  .use(router)
  .use(PrimeVue, {
    theme: {
      preset: ColorArchitecturePreset,
      options: {
        // The class src/theme/scheme.ts toggles on <html>; PrimeVue switches with the rest of the app.
        darkModeSelector: '.dark',
        // PrimeVue styles go in their own cascade layer after Tailwind's theme and base, so Tailwind
        // utilities on a component always win.
        cssLayer: { name: 'primevue', order: 'theme, base, primevue' },
      },
    },
  })
  .mount('#app');
