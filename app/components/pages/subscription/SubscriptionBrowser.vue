<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';
import type { Offering, OfferingsResponse, PaginationMeta } from '~/types/api';
import { useOverflow } from '~/composables/use-overflow';

const route = useRoute();
const router = useRouter();
const loadMoreTrigger = useTemplateRef<HTMLElement>('loadMoreTrigger');

const {
  data: offeringsPage,
  pending,
  error,
  refresh,
} = await useApiData<OfferingsResponse>('/offerings', {
  key: 'offerings-page-1',
  baseURL: '/api',
  query: {
    page: 1,
  },
});

const offerings = ref<Offering[]>(offeringsPage.value?.data || []);
const pagination = ref<PaginationMeta | null>(offeringsPage.value?.pagination || null);
const isFetchingNextPage = ref(false);

watch(
  offeringsPage,
  (page) => {
    offerings.value = page?.data || [];
    pagination.value = page?.pagination || null;
  },
  { immediate: true }
);

const hasNextPage = computed(() => {
  const meta = pagination.value;
  if (!meta) return false;
  return meta.page < meta.totalPages;
});

const fetchNextPage = async () => {
  if (!hasNextPage.value || isFetchingNextPage.value) return;

  const nextPage = (pagination.value?.page || 1) + 1;
  isFetchingNextPage.value = true;

  try {
    const page = await $fetch<OfferingsResponse>('/api/offerings', {
      query: { page: nextPage },
    });
    offerings.value = [...offerings.value, ...page.data];
    pagination.value = page.pagination;
  } finally {
    isFetchingNextPage.value = false;
  }
};

const activeOffering = computed(() => {
  const code = route.params.code ? String(route.params.code) : '';
  if (!code) return null;
  return offerings.value.find((offering) => offering.code === code) || null;
});

useIntersectionObserver(loadMoreTrigger, ([entry]) => {
  if (entry?.isIntersecting) {
    void fetchNextPage();
  }
});

watch(
  offerings,
  async (list) => {
    const firstOffering = list[0];
    if (!firstOffering || route.params.code) return;
    await router.replace(`/subscription/${firstOffering.code}`);
  },
  { immediate: true }
);

const carouselContent = useTemplateRef<HTMLElement>('carouselContent');
const carouselRoot = useTemplateRef<HTMLElement>('carouselRoot');

const { isOverflowing } = useOverflow(carouselContent, {
  containerRef: carouselRoot,
});
</script>

<template>
  <div class="subscription-page bg-white text-gray-900 pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-gray-100">
    <div class="mx-auto w-5/6 max-w-7xl text-center space-y-8">
      <div v-reveal="'fade-up'" class="max-w-3xl mx-auto space-y-4">
        <span class="text-xs uppercase tracking-widest text-[#04308F] font-semibold bg-[#04308F]/10 px-4 py-1.5 rounded-full inline-block">
          Transparent Pricing &amp; Plans
        </span>
        <h1 class="text-3xl font-serif font-normal tracking-tight sm:text-4xl lg:text-6xl text-gray-900 leading-tight">
          <template v-if="activeOffering">{{ activeOffering?.name }}</template>
          <Skeleton v-else class="inline-block h-12 w-full max-w-md" :class="{ 'animate-none': !pending }" />
        </h1>
        <p class="text-base text-gray-500 sm:text-lg leading-relaxed font-normal">
          <template v-if="activeOffering">{{ activeOffering?.description }}</template>
          <template v-else>
            <Skeleton v-for="n in 2" :key="n" class="inline-block h-4 w-full my-1" :class="{ 'animate-none': !pending }" />
          </template>
        </p>
      </div>

      <!-- Offering Navigation Pills -->
      <div v-reveal="'fade-up'" class="flex flex-wrap items-center justify-center gap-3 pt-4">
        <template v-if="offerings.length">
          <NuxtLink
            v-for="{ code, button } in offerings"
            :key="code"
            :to="`/subscription/${code}`"
            class="px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
            :class="route.params.code === code ? 'bg-[#04308F] text-white shadow-md shadow-[#04308F]/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          >
            {{ button }}
          </NuxtLink>
        </template>
      </div>
    </div>

    <!-- Main Content Container Slot -->
    <div class="pt-12">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="css">
</style>
