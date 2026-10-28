import { createRouter, createWebHashHistory } from 'vue-router';

import PalettePage from '@/pages/PalettePage.vue';
import TailwindPage from '@/pages/TailwindPage.vue';
import VarsPage from '@/pages/VarsPage.vue';

// One page per usage method. Hash history so the static build works without server rewrites.
export const pages = [
  { path: '/vars', label: 'CSS variables', component: VarsPage },
  { path: '/palette', label: 'usePalette()', component: PalettePage },
  { path: '/tailwind', label: 'Direct Tailwind', component: TailwindPage },
] as const;

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [{ path: '/', redirect: pages[0].path }, ...pages.map(({ path, component }) => ({ path, component }))],
  scrollBehavior: () => ({ top: 0 }),
});
