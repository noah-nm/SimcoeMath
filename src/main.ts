/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

// Composables
import { createApp } from 'vue'
const app = createApp(App)

registerPlugins(app)

app.mount('#app')