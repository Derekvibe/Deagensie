<script setup lang="ts">
import type { CarouselApi } from '~/components/ui/carousel';
import AutoScroll from 'embla-carousel-auto-scroll';

const brands = [
  { logoSrc: '/images/partners/hmd.png', altText: 'HMD' },
  { logoSrc: '/images/partners/xerdocshealth.png', altText: 'Xerdocshealth' },
  {
    logoSrc: '/images/partners/lw-trade-and-investment-forum.png',
    altText: 'LoveWorld Trade and Investment Forum',
  },
  { logoSrc: '/images/partners/green-plains.png', altText: 'Green Plains' },
  { logoSrc: '/images/partners/people-os.png', altText: 'People OS' },
  { logoSrc: '/images/partners/deloxxe.png', altText: 'Deloxxe' },
  { logoSrc: '/images/partners/lw-registry.png', altText: 'LW Registry' },
  { logoSrc: '/images/partners/talent-chess.png', altText: 'Talent Chess' },
];

const margins = ref<Partial<{ marginLeft: string; marginRight: string }>>({});

const autoScroll = AutoScroll({ speed: 1, stopOnInteraction: false, startDelay: 0 });
const emblaApi = ref<CarouselApi>();
const carouselRef = ref<HTMLElement | null>(null);

onMounted(() => {
  // --- existing margins logic ---
  const headerDiv = document.querySelector('#__nuxt > header > div');
  if (headerDiv) {
    const mql = window.matchMedia('(min-width: 64rem)');
    const updateMargins = () => {
      if (!mql.matches) {
        margins.value = {};
        return;
      }
      const ml = parseFloat(getComputedStyle(headerDiv).marginLeft);
      margins.value = { marginLeft: `${ml}px`, marginRight: `${ml / 4}px` };
    };
    const resizeObserver = new ResizeObserver(updateMargins);
    resizeObserver.observe(headerDiv);
    mql.addEventListener('change', updateMargins);
    updateMargins();
    onUnmounted(() => {
      resizeObserver.disconnect();
      mql.removeEventListener('change', updateMargins);
    });
  }

  // --- carousel visibility ---
  if (!carouselRef.value) return;
  const observer = new IntersectionObserver(
    ([entry]) => {
      const plugin = emblaApi.value?.plugins()?.autoScroll;
      if (!plugin) return;
      if (entry?.isIntersecting) {
        plugin.play();
      } else {
        plugin.stop();
      }
    },
    { threshold: 0.1 }
  );
  observer.observe(carouselRef.value);
  onUnmounted(() => observer.disconnect());
});
</script>

<template>
  <section class="space-y-9 pt-7 pb-10 lg:flex lg:items-center lg:space-y-0 lg:py-18">
    <h2
      :style="margins"
      class="lg:text-semibold mx-auto max-w-3/4 text-center text-2xl leading-normal font-medium lg:mx-0 lg:max-w-1/5 lg:shrink-0 lg:text-left lg:text-3xl"
    >
      Forward-thinking brands trust Deagensie
    </h2>

    <div ref="carouselRef">
      <Carousel
        :opts="{ loop: true, align: 'start' }"
        :plugins="[autoScroll]"
        @init-api="(api) => (emblaApi = api)"
      >
        <CarouselContent class="gap-7 px-7 lg:gap-15 lg:px-15">
          <CarouselItem v-for="{ logoSrc, altText } in brands" :key="altText" class="basis-auto">
            <NuxtImg
              :src="logoSrc"
              :alt="`Partner logo: ${altText}`"
              class="h-8 w-auto opacity-50 lg:h-11"
              loading="lazy"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  </section>
</template>
