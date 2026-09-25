<script setup lang="ts">
import { Icon } from '@iconify/vue';

const router = useRouter();
const { code, planCode, offering, plan, pending, error } = await useSubscriptionPlanContext();

const offeringRoute = computed(() => getOfferingRoute(code.value));
const checkoutRoute = computed(() => `${getPlanRoute(code.value, planCode.value)}/checkout`);
const requestRoute = computed(() => `${getPlanRoute(code.value, planCode.value)}/request`);

const closeDialog = async () => {
  await router.replace(offeringRoute.value);
};

const onOpenChange = (open: boolean) => {
  if (!open) {
    void closeDialog();
  }
};
</script>

<template>
  <PagesSubscriptionBrowser>
    <PagesSubscriptionOfferingDetail />
  </PagesSubscriptionBrowser>

  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <Dialog :open="true" @update:open="onOpenChange">
    <DialogContent
      class="gap-0 rounded-[calc(var(--radius)+2px)] px-5 py-10 lg:max-w-xl lg:px-8 lg:py-13.5"
    >
      <div v-if="pending" class="space-y-4">
        <Skeleton class="h-8 w-2/3" />
        <Skeleton class="h-24 w-full" />
        <div class="grid gap-6 md:grid-cols-2">
          <Skeleton class="h-40 w-full rounded-lg" />
          <Skeleton class="h-40 w-full rounded-lg" />
        </div>
      </div>

      <div v-else-if="error || !offering || !plan" class="py-4">
        <DialogTitle class="text-2xl leading-tight font-semibold"> Plan unavailable </DialogTitle>
        <DialogDescription class="mt-3 text-base leading-relaxed">
          We could not find this plan. Return to the offering and select an available plan.
        </DialogDescription>
        <NuxtLink
          :to="offeringRoute"
          class="text-foreground mt-8 inline-flex rounded-md bg-[#05DED5] px-6 py-3.5 text-lg leading-tight font-medium"
        >
          Back to offering
        </NuxtLink>
      </div>

      <div v-else>
        <DialogTitle class="text-2xl font-medium lg:text-3xl lg:leading-tight">
          {{ plan.name }}
        </DialogTitle>
        <DialogDescription class="mt-4 max-w-sm text-sm lg:text-base">
          {{ plan.description }}
        </DialogDescription>

        <div class="mt-8">
          <p class="text-4xl font-medium tracking-normal lg:text-5xl lg:leading-tight">
            {{ formatPlanMoney(plan.price, plan.currency)
            }}<span class="text-sm lg:text-lg lg:leading-snug">/</span>
          </p>
          <p class="mt-3 text-sm lg:text-base">
            {{ plan.billingLabel }}
          </p>
        </div>

        <div
          class="mt-8 grid gap-6 *:rounded-[calc(var(--radius)+2px)] *:border *:bg-current/2 *:px-4 *:py-5 md:grid-cols-2"
        >
          <NuxtLink
            :to="checkoutRoute"
            class="border-[#04308F]/50 shadow-[#04308F]/25 hover:shadow-lg"
          >
            <span class="inline-grid size-9 place-items-center rounded-full bg-current/5 text-xl">
              <Icon icon="glyphs-poly:credit-card" aria-hidden />
            </span>
            <span class="mt-2 block text-[#04308F]"> Pay Now </span>
            <span class="mt-3 block text-sm leading-relaxed">
              Instant checkout, pay securely and kick off your project
            </span>
          </NuxtLink>

          <NuxtLink :to="requestRoute" class="hover:border-[#04308F]/25">
            <span class="inline-grid size-9 place-items-center rounded-full bg-current/5 text-xl">
              <Icon icon="streamline-ultimate-color:paper-write" aria-hidden />
            </span>
            <span class="mt-2 block text-[#04308F]"> Request Tailored Solution </span>
            <span class="mt-3 block text-sm leading-relaxed">
              Tell us your need and we'll craft a custom proposal for you
            </span>
          </NuxtLink>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
