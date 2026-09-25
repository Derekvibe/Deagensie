<script setup lang="ts">
import { Icon } from '@iconify/vue';

const isVisible = ref(false);

const handleScroll = () => {
  isVisible.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <Transition name="fade-scale">
    <button
      v-if="isVisible"
      type="button"
      aria-label="Back to top"
      class="fixed bottom-8 right-8 z-50 flex size-12 items-center justify-center rounded-full bg-[#04308F] text-white shadow-xl shadow-[#04308F]/30 border border-white/20 backdrop-blur-md transition-all duration-300 hover:bg-[#05DED5] hover:text-gray-900 hover:scale-110 focus:outline-none"
      @click="scrollToTop"
    >
      <Icon icon="lucide:chevron-up" class="text-2xl" />
    </button>
  </Transition>
</template>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.7) translateY(10px);
}
</style>
