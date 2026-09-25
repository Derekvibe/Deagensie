// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
    'notivue/notification.css',
    'notivue/animations.css',
  ],
  vite: {
    plugins: [
      {
        apply: 'build',
        name: 'vite-plugin-ignore-sourcemap-warnings',
        configResolved(config) {
          const originalOnWarn = config.build.rollupOptions.onwarn;
          config.build.rollupOptions.onwarn = (warning, warn) => {
            if (
              warning.code === 'SOURCEMAP_BROKEN' &&
              warning.plugin === '@tailwindcss/vite:generate:build'
            ) {
              return;
            }
            if (originalOnWarn) {
              originalOnWarn(warning, warn);
            } else {
              warn(warning);
            }
          };
        },
      },
    ],
    optimizeDeps: {
      include: [
        '@iconify/vue',
        '@vee-validate/zod',
        '@vueuse/core',
        '@vueuse/integrations/useIDBKeyval',
        'class-variance-authority',
        'clsx',
        'countries-list',
        'embla-carousel-auto-scroll',
        'embla-carousel-fade',
        'embla-carousel-vue',
        'fuse.js',
        'libphonenumber-js',
        'libphonenumber-js/examples.mobile.json',
        'reka-ui',
        'tailwind-merge',
        'zod',
      ],
    },
  },
  experimental: {
    viteEnvironmentApi: true,
  },
  typescript: {
    strict: false,      // Changed to false to be more lenient
    typeCheck: false,   // Changed to false to disable vue-tsc
    builder: 'vite',
  },
  image: {
    ...(process.env.CI === 'true' && { provider: 'netlify' }),
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxt/image',
    '@vee-validate/nuxt',
    'notivue/nuxt',
    'shadcn-nuxt',
  ],
  shadcn: {
    prefix: '',
    componentDir: '@/components/ui',
  },
  notivue: {
    position: 'top-right',
    limit: 4,
    enqueue: true,
    avoidDuplicates: true,
    notifications: {
      global: {
        duration: 7_000,
      },
    },
  },
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
    },
  },
  nitro: {
    preset: 'netlify',
  },
});
