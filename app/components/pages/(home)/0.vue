<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue';
import { Icon } from '@iconify/vue';

const words = ref(['STRATEGIES', 'IDENTITIES', 'CAMPAIGNS', 'PLATFORMS', 'CREATIVES', 'TALENTS']);
const index = ref(0);
const displayText = ref('');
const isDeleting = ref(false);
const isPaused = ref(false);
const isInView = ref(false);
const spanRef = ref<HTMLElement | null>(null);
const statRefs = ref<HTMLElement[]>([]);
let timer: ReturnType<typeof setTimeout> | null = null;
let statObserver: IntersectionObserver | null = null;
const statAnimationFrames = new Map<number, number>();

// Parallax movement state
const mouseX = ref(0);
const mouseY = ref(0);

const handleMouseMove = (e: MouseEvent) => {
  const { innerWidth, innerHeight } = window;
  mouseX.value = (e.clientX / innerWidth - 0.5) * 10;
  mouseY.value = (e.clientY / innerHeight - 0.5) * 10;
};

const heroStats = reactive([
  {
    value: 5_000,
    displayValue: 0,
    suffix: '+',
    label: 'Network of top-rated, highly skilled global creatives',
    hasAnimated: false,
  },
  {
    value: 10_000,
    displayValue: 0,
    prefix: '$',
    label: 'Save of hiring cost with Deagensie',
    hasAnimated: false,
  },
  {
    value: 30,
    displayValue: 0,
    suffix: '%',
    label: 'Faster and efficient business growth',
    hasAnimated: false,
  },
  {
    value: 100,
    displayValue: 0,
    suffix: '+',
    label: 'Intelligent solutions delivered',
    hasAnimated: false,
  },
]);

const formatStatValue = (stat: (typeof heroStats)[number]) =>
  `${stat.prefix ?? ''}${Math.round(stat.displayValue).toLocaleString()}${stat.suffix ?? ''}`;

const setStatRef = (el: Element | ComponentPublicInstance | null, index: number) => {
  if (el instanceof HTMLElement) statRefs.value[index] = el;
};

const animateStat = (index: number) => {
  const stat = heroStats[index];
  if (!stat || stat.hasAnimated) return;

  stat.hasAnimated = true;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    stat.displayValue = stat.value;
    return;
  }

  const duration = 1200;
  const start = performance.now();

  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);

    stat.displayValue = stat.value * easedProgress;

    if (progress < 1) {
      statAnimationFrames.set(index, requestAnimationFrame(tick));
      return;
    }

    stat.displayValue = stat.value;
    statAnimationFrames.delete(index);
  };

  statAnimationFrames.set(index, requestAnimationFrame(tick));
};

const typeWriter = () => {
  if (!isInView.value) {
    timer = null;
    return;
  }

  const currentWord = words.value[index.value % words.value.length] || '';

  if (isPaused.value) {
    timer = setTimeout(() => {
      isPaused.value = false;
      isDeleting.value = true;
      typeWriter();
    }, 2000);
    return;
  }

  if (isDeleting.value) {
    displayText.value = currentWord.slice(0, Math.max(0, displayText.value.length - 1));
    if (displayText.value === '') {
      isDeleting.value = false;
      index.value = (index.value + 1) % words.value.length;
    }
  } else {
    displayText.value = currentWord.slice(0, displayText.value.length + 1);
    if (displayText.value.length === currentWord.length) isPaused.value = true;
  }

  timer = setTimeout(typeWriter, isDeleting.value ? 100 : 150);
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove, { passive: true });

  if (spanRef.value) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView.value = entry?.isIntersecting || false;
        if (entry?.isIntersecting && !timer) typeWriter();
      },
      { threshold: 0.1 }
    );
    observer.observe(spanRef.value);
    onUnmounted(() => observer.disconnect());
  }

  statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const index = statRefs.value.findIndex((el) => el === entry.target);
        animateStat(index);
        statObserver?.unobserve(entry.target);
      });
    },
    { threshold: 0.35 }
  );

  statRefs.value.forEach((statRef) => statObserver?.observe(statRef));
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  if (timer) clearTimeout(timer);
  statObserver?.disconnect();
  statAnimationFrames.forEach((frame) => cancelAnimationFrame(frame));
});
</script>

<template>
  <section class="bg-white text-gray-900 relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-gray-100">
    <!-- Subtle Ambient Glow (light mode) -->
    <div
      class="absolute inset-0 pointer-events-none"
      :style="{ transform: `translate3d(${mouseX}px, ${mouseY}px, 0)`, transition: 'transform 0.7s ease-out' }"
    >
      <div class="absolute top-[-10%] left-[10%] w-125 h-125 rounded-full bg-[#05DED5]/8 blur-3xl" />
      <div class="absolute top-[20%] right-[5%] w-87.5 h-87.5 rounded-full bg-[#04308F]/6 blur-3xl" />
    </div>

    <div class="relative z-10 mx-auto w-5/6 max-w-7xl space-y-16 lg:space-y-20">
      <!-- Editorial Header Content -->
      <div v-reveal="'fade-up'" class="mx-auto max-w-4xl text-center space-y-6">
        <h1
          class="text-2xl leading-tight font-serif font-normal sm:text-4xl lg:text-6xl xl:text-7xl tracking-tight text-gray-900"
        >
          AI-led and ecosystem-driven <br class="hidden sm:inline" />
          creative agency building -
          <span class="block text-[#04308F] font-sans font-bold italic mt-1">
            <span ref="spanRef">{{ displayText }}</span>
            <span class="animate-pulse text-[#05DED5]">|</span>
          </span>
        </h1>
        <p class="mx-auto max-w-2xl text-base text-gray-500 sm:text-lg lg:text-xl leading-relaxed font-normal">
          Empowering scalable businesses, unlocking global talent, and expanding the boundaries of
          the digital creative economy.
        </p>

        <!-- Andela-Style Checkmark List -->
        <div class="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-gray-700 sm:gap-8 sm:text-sm lg:text-base pt-2">
          <div class="flex items-center gap-2">
            <Icon icon="lucide:check" class="text-[#05DED5] text-lg font-bold" />
            <span>AI-Led Branding & Strategy</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon icon="lucide:check" class="text-[#05DED5] text-lg font-bold" />
            <span>Talent-as-a-Service (TaaS)</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon icon="lucide:check" class="text-[#05DED5] text-lg font-bold" />
            <span>Founders' Growth Lab</span>
          </div>
        </div>
      </div>

      <!-- Andela-Inspired Floating Composition -->
      <div v-reveal="'scale-in'" class="relative mx-auto max-w-5xl py-8">
        <!-- Main Center Card -->
        <div class="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gray-100 border border-gray-200 shadow-2xl shadow-gray-200/60">
          <div class="relative aspect-16/10 sm:aspect-video w-full overflow-hidden">
            <NuxtImg
              src="/images/pages/(home)/hero.webp"
              alt="Deagensie Creative Ecosystem"
              class="size-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div class="absolute inset-0 bg-linear-to-t from-gray-900/30 via-transparent to-transparent" />

            <!-- Floating Top-Left Match Tag -->
            <div class="absolute top-4 left-4 sm:top-6 sm:left-6 rounded-2xl bg-white px-4 py-2.5 shadow-xl text-gray-900 border border-gray-200">
              <div class="flex items-center gap-2">
                <span class="font-bold text-sm sm:text-base">Victor E.</span>
                <span class="rounded-full bg-[#05DED5]/20 text-[#04308F] px-2.5 py-0.5 text-xs font-bold">
                  100% Match
                </span>
              </div>
              <p class="text-xs text-gray-500 font-medium">Head of People & Operations</p>
            </div>

            <!-- Floating Tech Skill Pills -->
            <div class="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 flex flex-wrap gap-2">
              <span class="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-900 shadow-md flex items-center gap-1.5">
                <Icon icon="simple-icons:nuxtdotjs" class="text-[#00DC82]" /> Nuxt 4
              </span>
              <span class="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-900 shadow-md flex items-center gap-1.5">
                <Icon icon="simple-icons:tailwindcss" class="text-[#38BDF8]" /> Tailwind
              </span>
              <span class="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-900 shadow-md flex items-center gap-1.5">
                <Icon icon="simple-icons:openai" class="text-black" /> AI Workflows
              </span>
              <span class="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-900 shadow-md flex items-center gap-1.5">
                <Icon icon="simple-icons:figma" class="text-[#F24E1E]" /> Brand Strategy
              </span>
            </div>
          </div>
        </div>

        <!-- Left Floating Card: AI Training & Progress -->
        <div class="hidden lg:block absolute -left-10 top-1/3 w-64 rounded-2xl bg-white p-5 text-gray-900 shadow-2xl shadow-gray-200/80 border border-gray-200 transition-transform duration-500 hover:-translate-y-2">
          <p class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">AI Growth Course</p>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-xs font-semibold mb-1">
                <span class="text-gray-700">Prompt Engineering</span>
                <span class="text-[#04308F]">100%</span>
              </div>
              <div class="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                <div class="h-full rounded-full bg-[#05DED5] w-full" />
              </div>
            </div>
            <div>
              <div class="flex justify-between text-xs font-semibold mb-1">
                <span class="text-gray-700">Agent Orchestration</span>
                <span class="text-[#04308F]">78%</span>
              </div>
              <div class="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                <div class="h-full rounded-full bg-[#04308F] w-[78%]" />
              </div>
            </div>
          </div>
        </div>

        <!-- Right Floating Card: Growth Ops Agent + Moving Cursor -->
        <div class="hidden lg:block absolute -right-10 bottom-8 w-72 rounded-2xl bg-white p-5 text-gray-900 shadow-2xl shadow-gray-200/80 border border-gray-200 transition-transform duration-500 hover:-translate-y-2">
          <div class="flex items-center gap-2 mb-3">
            <div class="size-2 rounded-full bg-[#05DED5] animate-ping" />
            <p class="text-xs font-bold text-gray-900">Revenue Growth Agent</p>
          </div>
          <div class="rounded-xl bg-gray-50 p-3 text-xs text-gray-700 mb-4 border border-gray-200 space-y-1">
            <div class="flex items-center gap-1.5 font-medium text-gray-400 text-[10px]">
              <Icon icon="lucide:file-spreadsheet" class="text-emerald-500" /> H2_Forecast_Strategy.csv
            </div>
            <p class="font-medium text-gray-900">Deploying automated brand pipelines...</p>
          </div>
          <div class="flex justify-end relative">
            <NuxtLink
              to="/contact"
              class="rounded-full bg-[#05DED5] px-4 py-2 text-xs font-bold text-gray-900 shadow-md transition-transform duration-300 hover:scale-105"
            >
              Explore Solutions
            </NuxtLink>
            <!-- Moving Animated Cursor -->
            <div class="absolute -bottom-2 right-4 animate-bounce">
              <Icon icon="ph:cursor-fill" class="size-5 text-[#04308F] drop-shadow-md" />
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Metric Dividers -->
      <div
        class="grid grid-cols-2 gap-4 sm:gap-6 border-t border-gray-200 pt-8 sm:pt-12 lg:grid-cols-4 lg:pt-16"
      >
        <div
          v-for="(stat, statIndex) in heroStats"
          :key="stat.label"
          :ref="(el) => setStatRef(el, statIndex)"
          class="space-y-2 border-l-2 border-[#05DED5] pl-4 transition-all duration-300 hover:translate-x-1 lg:pl-6"
        >
          <p class="text-3xl font-bold text-[#04308F] lg:text-4xl font-mono">
            {{ formatStatValue(stat) }}
          </p>
          <p class="text-xs text-gray-500 lg:text-sm leading-relaxed">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
</style>
