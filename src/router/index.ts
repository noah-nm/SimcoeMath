/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import Home from '@pages/index.vue'
import { RouteRecordRaw, createRouter, createWebHistory  } from 'vue-router'
import DataStorageMenu from '../components/DataStorage/DataStorageMenu.vue';
import DataStorage from '../pages/DataStorage/DataStorage.vue';
import BinaryToDecimal from '../pages/DataStorage/BinaryToDecimal.vue';
import DecimalToBinary from '../pages/DataStorage/DecimalToBinary.vue';
import BinaryAddition from '../pages/DataStorage/BinaryAddition.vue';
import BinaryMultiplication from '../pages/DataStorage/BinaryMultiplication.vue';
import OctalToDecimal from '../pages/DataStorage/OctalToDecimal.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/data-storage',
    name: 'Data Storage',
    component: DataStorage
  },
  {
    path: '/binary-to-decimal',
    name: 'Binary To Decimal',
    component: BinaryToDecimal
  },
  {
    path: '/decimal-to-binary',
    name: 'Decimal To Binary',
    component: DecimalToBinary
  },
  {
    path: '/binary-addition',
    name: 'Binary Addition',
    component: BinaryAddition
  },
  {
    path: '/binary-multiplication',
    name: 'Binary Multiplication',
    component: BinaryMultiplication
  },
  {
    path: '/octal-to-decimal',
    name: 'Octal To Decimal',
    component: OctalToDecimal
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
