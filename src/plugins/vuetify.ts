/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { components, directives } from 'vuetify/dist/vuetify-labs.js';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
  },
  theme: {
      defaultTheme: 'dark'
  },
  components,
  directives,
});
