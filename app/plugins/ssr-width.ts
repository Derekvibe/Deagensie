import { provideSSRWidth } from '@vueuse/core';

export default defineNuxtPlugin((nuxtApp) => {
  provideSSRWidth(640, nuxtApp.vueApp);
});
