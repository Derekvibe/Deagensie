<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';

const route = useRoute();
const isScrolled = ref(false);
const isPastThreshold = ref(false);
const isSheetOpen = ref(false);

const checkScroll = () => {
  isScrolled.value = globalThis.scrollY > 20;
  isPastThreshold.value = globalThis.scrollY >= globalThis.innerHeight / 3;
};

const isMobile = useMediaQuery('(max-width: 1023px)');

watch(route, () => {
  if (!isMobile.value) return;
  isSheetOpen.value = false;
});

const pageRequiresHeaderStyle = computed(() => {
  const forcedNames = [
    'register',
    'register-type',
    'register-type-step',
    'register-type-success',
    'register-type-step-success',
    'contact',
    'subscription',
    'subscription-code',
    'subscription-code-plan',
    'subscription-code-plan-checkout',
    'subscription-code-plan-checkout-reference',
    'subscription-code-plan-checkout-callback',
    'subscription-code-plan-request',
    'subscription-code-plan-request-received',
  ];

  return forcedNames.includes(route.name as string);
});

const shouldUseHeaderStyle = computed(() => {
  return isPastThreshold.value || pageRequiresHeaderStyle.value;
});

onMounted(() => {
  globalThis.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();

  globalThis.addEventListener('resize', checkScroll);
});

onUnmounted(() => {
  globalThis.removeEventListener('scroll', checkScroll);
  globalThis.removeEventListener('resize', checkScroll);
});
</script>

<template>
  <header
    class="fixed top-0 left-0 z-50 w-full px-3 pt-3 transition-all duration-300 sm:px-6 lg:px-8"
  >
    <div
      class="mx-auto flex h-16 w-full max-w-7xl items-center justify-between rounded-full px-5 transition-all duration-300 lg:h-18 lg:px-8"
      :class="[
        shouldUseHeaderStyle
          ? 'border-border/80 bg-background/90 text-foreground border shadow-lg backdrop-blur-md'
          : isScrolled
            ? 'border border-white/20 bg-black/65 text-white shadow-xl backdrop-blur-md'
            : 'border border-white/15 bg-black/35 text-white backdrop-blur-sm',
      ]"
    >
      <NuxtLink to="/" aria-label="Go to homepage" class="shrink-0">
        <NuxtImg
          :src="shouldUseHeaderStyle ? '/images/logo-dark.png' : '/images/logo.png'"
          alt="Deagensie logo"
          class="h-8 w-auto transition-all duration-300 xl:h-9"
        />
      </NuxtLink>
      <SiteHeaderMobileNav v-if="isMobile" v-model:open="isSheetOpen" />
      <SiteHeaderDesktopNav v-else />
    </div>
  </header>
</template>
