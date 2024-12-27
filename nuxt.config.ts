import { quasar } from '@quasar/vite-plugin';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', 'nuxt-quasar-ui'],

  quasar: {
    sassVariables: '~/assets/styles/quasar.sass',
  },

  compatibilityDate: '2024-12-27',
});
