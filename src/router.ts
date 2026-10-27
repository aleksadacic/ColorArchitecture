import { createRouter, createWebHashHistory } from 'vue-router';

import PalettePage from '@/pages/PalettePage.vue';
import RawPage from '@/pages/RawPage.vue';
import TailwindPage from '@/pages/TailwindPage.vue';

// One page per usage method. Hash history so the static build works without server rewrites.
export const pages = [
  { path: '/raw', num: '1', label: 'Raw constants', component: RawPage },
  { path: '/palette', num: '2', label: 'usePalette()', component: PalettePage },
  { path: '/tailwind', num: '3', label: 'Direct Tailwind', component: TailwindPage },
] as const;

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [{ path: '/', redirect: pages[0].path }, ...pages.map(({ path, component }) => ({ path, component }))],
  scrollBehavior: () => ({ top: 0 }),
});
