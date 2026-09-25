<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useMediaQuery } from '@vueuse/core';
import { push } from 'notivue';

const props = defineProps<{
  talent: {
    thumbnail: string;
    name: string;
    role: string;
    testimonial: string;
    cta: { label: string };
    altText: string;
    video: string;
    heading: string;
  };
  isActive: boolean;
}>();

const videoRef = ref<HTMLVideoElement | null>(null);
const isPlaying = ref(false);
const isHovered = ref(false);
const isMobile = useMediaQuery('(max-width: 1023px)');

const showOverlay = computed(() => !isPlaying.value || isHovered.value);

watch(
  () => props.isActive,
  (active) => {
    if (!active && isPlaying.value) {
      videoRef.value?.pause();
      isPlaying.value = false;
    }
  }
);

async function togglePlay() {
  if (isPlaying.value) {
    videoRef.value?.pause();
    isPlaying.value = false;
  } else {
    if (!props.talent.video) {
      notifyVideoError('No video has been attached to this testimonial yet.');
      return;
    }

    isPlaying.value = true;
    await nextTick();

    try {
      await videoRef.value?.play();
    } catch {
      isPlaying.value = false;
      notifyVideoError('We could not start this video. Please try again in a moment.');
    }
  }
}

function notifyVideoError(message: string) {
  push.error({
    title: 'Video unavailable',
    message,
  });
}

function onVideoError() {
  isPlaying.value = false;
  notifyVideoError('This talent video could not be loaded.');
}
</script>

<template>
  <div
    class="lg:grid lg:grid-cols-1 lg:grid-rows-1 lg:*:[grid-area:1/1]"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="grid aspect-393/241 grid-cols-1 grid-rows-1 *:[grid-area:1/1] lg:aspect-1436/732">
      <div class="grid grid-cols-1 grid-rows-1 *:[grid-area:1/1]">
        <video
          v-if="isPlaying"
          ref="videoRef"
          :src="talent.video"
          class="size-full object-cover"
          @play="isPlaying = true"
          @pause="isPlaying = false"
          @ended="isPlaying = false"
          @error="onVideoError"
        />
        <template v-else>
          <NuxtImg :src="talent.thumbnail" :alt="talent.altText" class="size-full object-cover" />
          <div class="pointer-events-none bg-linear-to-r from-black to-transparent" />
        </template>
      </div>

      <button
        v-if="isMobile || showOverlay"
        class="bg-background z-1 grid size-12.5 place-items-center self-center justify-self-center rounded-full text-2xl transition-[opacity,visibility] duration-300 lg:mr-[25%] lg:size-25 lg:justify-self-end lg:text-4xl"
        :aria-label="isPlaying ? `Pause ${talent.name}` : `Play ${talent.name}`"
        @click="togglePlay"
      >
        <Icon :icon="isPlaying ? 'solar:pause-bold' : 'solar:play-bold'" aria-hidden />
      </button>
    </div>

    <div v-if="isMobile || showOverlay" class="space-y-8 lg:space-y-10 lg:self-center">
      <div
        style="--primary: currentColor"
        class="bg-linear-to-bl from-black/45 to-black/90 py-8 text-white lg:bg-none lg:py-0"
      >
        <div class="mx-auto flex w-5/6 max-w-7xl flex-col gap-4 lg:gap-6">
          <h3
            class="text-lg leading-relaxed lg:max-w-726/1280 lg:text-3xl 2xl:text-5xl 2xl:leading-normal 2xl:font-medium"
          >
            {{ talent.heading }}
          </h3>

          <p
            class="text-sm leading-relaxed text-[#FCFCFE] lg:max-w-726/1280 lg:text-base 2xl:text-lg 2xl:leading-normal"
          >
            {{ talent.testimonial }}
          </p>

          <h3
            class="text-lg leading-relaxed lg:max-w-726/1280 lg:text-xl 2xl:leading-normal 2xl:font-medium"
          >
            {{ talent.name }} <br />
            <span class="text-[20px] font-normal"> {{ talent.role }}</span>
          </h3>

          <NuxtLink
            to="/"
            class="text-foreground inline-block self-start rounded-full bg-[#05DED5] px-6 py-3.5 text-xl leading-tight font-medium"
          >
            {{ talent.cta.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
