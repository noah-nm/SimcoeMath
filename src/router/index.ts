/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import Home from '@pages/index.vue'
import { RouteRecordRaw, createRouter, createWebHistory  } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
