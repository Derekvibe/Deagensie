export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: config.public.apiBase,
    retry: 0,
    timeout: 30_000,
    headers: {
      Accept: 'application/json',
    },
  });

  return {
    provide: {
      api,
    },
  };
});

declare module '#app' {
  interface NuxtApp {
    $api: typeof $fetch;
  }
}
