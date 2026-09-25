<script setup lang="ts">
const route = useRoute();

const code = computed(() => String(route.params.code || ''));
const planCode = computed(() => String(route.params.plan || ''));
const reference = computed(() => String(route.query.reference || ''));

if (reference.value) {
  await navigateTo(
    `${getPlanRoute(code.value, planCode.value)}/checkout/${encodeURIComponent(reference.value)}`,
    {
      replace: true,
    }
  );
}
</script>

<template>
  <section class="mx-auto my-16 w-5/6 max-w-xl py-16 text-center lg:my-20 lg:py-20">
    <template v-if="reference">
      <Skeleton class="mx-auto h-10 w-2/3" />
      <Skeleton class="mx-auto mt-6 h-6 w-1/2" />
    </template>

    <template v-else>
      <h1 class="text-4xl leading-tight font-semibold">Payment reference missing</h1>
      <p class="text-foreground/65 mx-auto mt-4 max-w-xl text-lg leading-relaxed">
        We could not find a Paystack reference in the callback URL. Return to checkout and try
        again.
      </p>
      <NuxtLink
        :to="`${getPlanRoute(code, planCode)}/checkout`"
        class="mt-8 inline-flex rounded-md bg-[#05DED5] px-6 py-3.5 text-lg leading-tight font-medium"
      >
        Back to checkout
      </NuxtLink>
    </template>
  </section>
</template>
