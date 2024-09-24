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
import DecimalToOctal from '../pages/DataStorage/DecimalToOctal.vue';
import HexadecimalToDecimal from '../pages/DataStorage/HexadecimalToDecimal.vue';
import DecimalToHexadecimal from '../pages/DataStorage/DecimalToHexadecimal.vue';
import BinaryToOctal from '../pages/DataStorage/BinaryToOctal.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
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
  },
  {
    path: '/decimal-to-octal',
    name: 'Decimal To Octal',
    component: DecimalToOctal
  },
  {
    path: '/hexadecimal-to-decimal',
    name: 'Hexadecimal To Decimal',
    component: HexadecimalToDecimal
  },
  {
    path: '/decimal-to-hexadecimal',
    name: 'Decimal To Hexadecimal',
    component: DecimalToHexadecimal
  },
  {
    path: '/binary-to-octal',
    name: 'Binary To Octal',
    component: BinaryToOctal
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
