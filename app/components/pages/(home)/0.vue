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

// ─── 16-Second Reference Animation Loop & Guided Cursor Tour State Machine ───
const sectionRef = ref<HTMLElement | null>(null);
const isHeroSectionInView = ref(false);
const prefersReducedMotion = ref(false);

const CYCLE_DURATION = 16000;
const cycleProgressMs = ref(0);
let loopAnimFrame: number | null = null;
let startTime: number | null = null;
let heroObserver: IntersectionObserver | null = null;

const progress1 = ref(100);
const progress2 = ref(78);
const isProfileExpanded = ref(true);
const agentTypedText = ref('Deploying automated brand pipelines...');
const ctaButtonVisible = ref(true);
const ctaButtonScale = ref(1);

const tourPointerVisible = ref(false);
const tourPointerState = ref<'HOLLOW' | 'SOLID'>('HOLLOW');
const tourPillText = ref('Reskill Internal Teams');

// Desktop: absolute % coords over the floating composition container
// Mobile: absolute % coords within the hero image card itself
const tourPosDesktop = reactive({ top: '30%', left: '2%' });
const tourPosMobile = reactive({ top: '38%', left: '8%' });

const fullAgentSentence = 'Deploying automated brand pipelines...';

const updateAnimationState = (timeMs: number) => {
  if (prefersReducedMotion.value) {
    progress1.value = 100;
    progress2.value = 78;
    isProfileExpanded.value = true;
    agentTypedText.value = fullAgentSentence;
    ctaButtonVisible.value = true;
    ctaButtonScale.value = 1;
    tourPointerVisible.value = false;
    return;
  }

  cycleProgressMs.value = timeMs % CYCLE_DURATION;
  const t = cycleProgressMs.value;

  if (t < 2000) {
    // STEADY STATE
    progress1.value = 100;
    progress2.value = 78;
    isProfileExpanded.value = true;
    agentTypedText.value = fullAgentSentence;
    ctaButtonVisible.value = true;
    ctaButtonScale.value = 1;
    tourPointerVisible.value = false;
  } else if (t < 4000) {
    // RESET BEAT
    const clamp = Math.min(1, Math.max(0, (t - 2000) / 1000));
    progress1.value = Math.max(0, 100 * (1 - clamp));
    progress2.value = Math.max(0, 78 * (1 - clamp));
    isProfileExpanded.value = false;
    agentTypedText.value = '';
    ctaButtonVisible.value = false;
    ctaButtonScale.value = 0.85;
    tourPointerVisible.value = false;
  } else if (t < 6000) {
    // WAYPOINT 1: Bar 1 fills 0 → 100%
    progress1.value = Math.min(100, Math.max(0, ((t - 4000) / 2000) * 100));
    progress2.value = 0;
    isProfileExpanded.value = false;
    agentTypedText.value = '';
    ctaButtonVisible.value = false;
    tourPointerVisible.value = true;
    tourPillText.value = 'Reskill Internal Teams';
    tourPointerState.value = t > 5500 ? 'SOLID' : 'HOLLOW';
    // Desktop: pointer glides toward left card's Bar 1
    const g1 = Math.min(1, (t - 4000) / 1500);
    tourPosDesktop.top = `${28 + g1 * 8}%`;
    tourPosDesktop.left = `2%`;
    // Mobile: pointer targets top of the progress card below image
    tourPosMobile.top = `28%`;
    tourPosMobile.left = `8%`;
  } else if (t < 10000) {
    // WAYPOINT 1 Drift: Bar 2 fills 0 → 75%
    progress1.value = 100;
    progress2.value = Math.min(75, Math.max(0, ((t - 6000) / 4000) * 75));
    isProfileExpanded.value = false;
    agentTypedText.value = '';
    ctaButtonVisible.value = false;
    tourPointerVisible.value = true;
    tourPillText.value = 'Reskill Internal Teams';
    tourPointerState.value = 'SOLID';
    const g2 = Math.min(1, (t - 6000) / 2000);
    tourPosDesktop.top = `${36 + g2 * 9}%`;
    tourPosDesktop.left = `2%`;
    tourPosMobile.top = `44%`;
    tourPosMobile.left = `8%`;
  } else if (t < 12000) {
    // Bar 2 finishes → prepare Waypoint 2
    progress1.value = 100;
    progress2.value = 75 + Math.min(3, ((t - 10000) / 2000) * 3);
    isProfileExpanded.value = false;
    agentTypedText.value = '';
    ctaButtonVisible.value = false;
    if (t > 11600) {
      tourPointerVisible.value = false;
    } else {
      tourPointerVisible.value = true;
      tourPillText.value = 'Reskill Internal Teams';
      tourPointerState.value = 'SOLID';
      tourPosDesktop.top = `45%`;
      tourPosDesktop.left = `2%`;
      tourPosMobile.top = `52%`;
      tourPosMobile.left = `8%`;
    }
  } else if (t < 14000) {
    // WAYPOINT 2: Profile card + Hire AI-Native Talent
    progress1.value = 100;
    progress2.value = 78;
    isProfileExpanded.value = true;
    agentTypedText.value = '';
    ctaButtonVisible.value = false;
    tourPointerVisible.value = t < 13700;
    tourPillText.value = 'Hire AI-Native Talent';
    tourPointerState.value = t > 12600 ? 'SOLID' : 'HOLLOW';
    // Desktop: near top-left of hero image
    tourPosDesktop.top = `12%`;
    tourPosDesktop.left = `12%`;
    // Mobile: near top-left of hero image (same position, works inline)
    tourPosMobile.top = `14%`;
    tourPosMobile.left = `8%`;
  } else {
    // WAYPOINT 3: Build AI Solutions + typewriter + CTA solidification
    progress1.value = 100;
    progress2.value = 78;
    isProfileExpanded.value = true;
    const charCount = Math.min(
      fullAgentSentence.length,
      Math.floor(((t - 14000) / 1300) * fullAgentSentence.length)
    );
    agentTypedText.value = fullAgentSentence.slice(0, Math.max(0, charCount));
    tourPillText.value = 'Build AI Solutions';
    tourPointerState.value = t > 14400 ? 'SOLID' : 'HOLLOW';
    // Desktop: near right card's CTA button
    tourPosDesktop.top = `76%`;
    tourPosDesktop.left = `64%`;
    // Mobile: overlay within hero card bottom-right
    tourPosMobile.top = `68%`;
    tourPosMobile.left = `55%`;
    if (t > 15200) {
      tourPointerVisible.value = false;
      ctaButtonVisible.value = true;
      ctaButtonScale.value = 0.9 + Math.min(0.1, ((t - 15200) / 800) * 0.1);
    } else {
      tourPointerVisible.value = true;
      ctaButtonVisible.value = false;
      ctaButtonScale.value = 0.85;
    }
  }
};

const runLoop = (now: number) => {
  if (startTime === null) startTime = now;
  const elapsed = now - startTime;
  if (isHeroSectionInView.value && !prefersReducedMotion.value) {
    updateAnimationState(elapsed);
  }
  loopAnimFrame = requestAnimationFrame(runLoop);
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  prefersReducedMotion.value = mediaQuery.matches;
  const handleMotionChange = (e: MediaQueryListEvent) => {
    prefersReducedMotion.value = e.matches;
  };
  mediaQuery.addEventListener('change', handleMotionChange);

  if (sectionRef.value) {
    heroObserver = new IntersectionObserver(
      ([entry]) => {
        isHeroSectionInView.value = entry?.isIntersecting || false;
      },
      { threshold: 0.1 }
    );
    heroObserver.observe(sectionRef.value);
  }

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

  loopAnimFrame = requestAnimationFrame(runLoop);

  onUnmounted(() => {
    mediaQuery.removeEventListener('change', handleMotionChange);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  if (timer) clearTimeout(timer);
  statObserver?.disconnect();
  heroObserver?.disconnect();
  statAnimationFrames.forEach((frame) => cancelAnimationFrame(frame));
  if (loopAnimFrame !== null) cancelAnimationFrame(loopAnimFrame);
});
</script>

<template>
  <section
    ref="sectionRef"
    class="relative overflow-hidden border-b border-gray-100 bg-white pt-28 pb-16 text-gray-900 lg:pt-36 lg:pb-24"
  >
    <!-- Ambient Glow Pulse -->
    <div
      class="pointer-events-none absolute inset-0 transition-opacity duration-1000"
      :style="{
        transform: `translate3d(${mouseX}px, ${mouseY}px, 0)`,
        opacity: cycleProgressMs < 2000 || cycleProgressMs > 14000 ? 1 : 0.6,
      }"
    >
      <div
        class="absolute top-[-10%] left-[10%] h-125 w-125 rounded-full bg-[#05DED5]/12 blur-3xl transition-all duration-1000"
        :class="cycleProgressMs < 2000 || cycleProgressMs > 14000 ? 'scale-105' : 'scale-95'"
      />
      <div
        class="absolute top-[20%] right-[5%] h-87.5 w-87.5 rounded-full bg-[#04308F]/8 blur-3xl"
      />
    </div>

    <!-- Full-width content wrapper -->
    <div
      class="relative z-10 mx-auto max-w-screen-2xl space-y-14 px-4 sm:px-6 lg:space-y-20 lg:px-10 xl:px-16"
    >
      <!-- Editorial Header Content — centred, max readable width -->
      <div v-reveal="'fade-up'" class="mx-auto max-w-4xl space-y-6 text-center">
        <h1
          class="font-serif text-2xl leading-tight font-normal tracking-tight text-gray-900 sm:text-4xl lg:text-6xl xl:text-7xl"
        >
          AI-led and ecosystem-driven <br class="hidden sm:inline" />
          creative agency building -
          <span class="mt-1 block font-sans font-bold text-[#04308F] italic">
            <span ref="spanRef">{{ displayText }}</span>
            <span class="animate-pulse text-[#05DED5]">|</span>
          </span>
        </h1>
        <p
          class="mx-auto max-w-2xl text-base leading-relaxed font-normal text-gray-500 sm:text-lg lg:text-xl"
        >
          Empowering scalable businesses, unlocking global talent, and expanding the boundaries of
          the digital creative economy.
        </p>
        <!-- Checkmark list -->
        <div
          class="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-semibold text-gray-700 sm:gap-8 sm:text-sm lg:text-base"
        >
          <div class="flex items-center gap-2">
            <Icon icon="lucide:check" class="text-lg font-bold text-[#05DED5]" />
            <span>AI-Led Branding & Strategy</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon icon="lucide:check" class="text-lg font-bold text-[#05DED5]" />
            <span>Talent-as-a-Service (TaaS)</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon icon="lucide:check" class="text-lg font-bold text-[#05DED5]" />
            <span>Founders' Growth Lab</span>
          </div>
        </div>
      </div>

      <!-- ─── Floating Composition ─── -->
      <div v-reveal="'scale-in'" class="relative w-full">
        <!-- ■ DESKTOP LAYOUT: Side cards float beside image (lg+) -->
        <!-- Guided Cursor (desktop only) -->
        <div
          class="pointer-events-none absolute z-40 hidden transition-all duration-700 ease-in-out lg:block"
          :class="tourPointerVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'"
          :style="{ top: tourPosDesktop.top, left: tourPosDesktop.left }"
        >
          <div class="flex items-center gap-1">
            <!-- Cursor arrow: rotated 90° CW so tip points right at the pill -->
            <div class="size-5 shrink-0 drop-shadow-md transition-all duration-300">
              <svg viewBox="0 0 24 24" class="size-full rotate-90">
                <path
                  d="M3 3l7 18 3-7 7-3L3 3z"
                  :fill="tourPointerState === 'SOLID' ? '#05DED5' : 'rgba(255,255,255,0.95)'"
                  stroke="#05DED5"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div
              class="flex items-center rounded-full bg-[#05DED5] px-4 py-1.5 text-xs font-bold text-gray-950 shadow-lg ring-2 shadow-[#05DED5]/30 ring-white transition-all duration-300"
            >
              <span>{{ tourPillText }}</span>
            </div>
          </div>
        </div>

        <!-- Desktop outer grid: [left card] [hero image] [right card] -->
        <div
          class="hidden items-center gap-6 lg:grid lg:grid-cols-[280px_1fr_300px] xl:grid-cols-[300px_1fr_320px] xl:gap-8"
        >
          <!-- Left Card: AI Growth Course + Progress Bars -->
          <div
            class="rounded-2xl border border-gray-200 bg-white p-5 text-gray-900 shadow-2xl shadow-gray-200/80 transition-all duration-500 hover:-translate-y-2"
            :style="{ transform: `translate3d(${mouseX * -0.5}px, ${mouseY * -0.5}px, 0)` }"
          >
            <p class="mb-3 text-xs font-bold tracking-wider text-gray-400 uppercase">
              AI Growth Course
            </p>
            <div class="space-y-4">
              <div>
                <div class="mb-1 flex justify-between text-xs font-semibold">
                  <span class="text-gray-700">Prompt Engineering</span>
                  <span class="font-mono text-[#04308F]">{{ Math.round(progress1) }}%</span>
                </div>
                <div class="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    class="h-full rounded-full bg-[#05DED5] transition-[width] duration-300 ease-out"
                    :style="{ width: `${progress1}%` }"
                  />
                </div>
              </div>
              <div>
                <div class="mb-1 flex justify-between text-xs font-semibold">
                  <span class="text-gray-700">Agent Orchestration</span>
                  <span class="font-mono text-[#04308F]">{{ Math.round(progress2) }}%</span>
                </div>
                <div class="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    class="h-full rounded-full bg-[#04308F] transition-[width] duration-300 ease-out"
                    :style="{ width: `${progress2}%` }"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Center: Hero Image -->
          <div
            class="relative w-full overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 shadow-2xl shadow-gray-200/60"
          >
            <div class="relative aspect-video w-full overflow-hidden">
              <NuxtImg
                src="/images/pages/(home)/hero.webp"
                alt="Deagensie Creative Ecosystem"
                class="size-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div
                class="absolute inset-0 bg-linear-to-t from-gray-900/30 via-transparent to-transparent"
              />

              <!-- Top-Left Profile Card (desktop, overlapping hero) -->
              <div
                class="absolute top-5 left-5 z-20 rounded-2xl border border-gray-200 bg-white/95 px-4 py-2.5 text-gray-900 shadow-xl backdrop-blur-md transition-all duration-500"
              >
                <div class="flex items-center gap-2">
                  <span class="text-sm font-bold">Victor E.</span>
                  <span
                    class="rounded-full bg-[#05DED5]/20 px-2.5 py-0.5 text-xs font-bold text-[#04308F]"
                    >100% Match</span
                  >
                </div>
                <p class="text-xs font-medium text-gray-500">Head of People & Operations</p>
                <div
                  class="grid transition-[grid-template-rows,opacity] duration-500 ease-out"
                  :class="
                    isProfileExpanded
                      ? 'mt-2 grid-rows-[1fr] border-t border-gray-100 pt-2 opacity-100'
                      : 'mt-0 grid-rows-[0fr] border-t-0 pt-0 opacity-0'
                  "
                >
                  <div class="overflow-hidden">
                    <div class="flex items-center gap-1.5 text-[11px] font-medium text-gray-500">
                      <span>Worked with:</span>
                      <div class="flex items-center gap-1.5">
                        <span
                          class="flex items-center justify-center rounded-full bg-gray-100 p-1"
                          title="Nuxt"
                          ><Icon icon="simple-icons:nuxtdotjs" class="size-3 text-[#00DC82]"
                        /></span>
                        <span
                          class="flex items-center justify-center rounded-full bg-gray-100 p-1"
                          title="OpenAI"
                          ><Icon icon="simple-icons:openai" class="size-3 text-black"
                        /></span>
                        <span
                          class="flex items-center justify-center rounded-full bg-gray-100 p-1"
                          title="Figma"
                          ><Icon icon="simple-icons:figma" class="size-3 text-[#F24E1E]"
                        /></span>
                        <span
                          class="flex items-center justify-center rounded-full bg-gray-100 p-1"
                          title="Tailwind"
                          ><Icon icon="simple-icons:tailwindcss" class="size-3 text-[#38BDF8]"
                        /></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Marquee Strip (desktop) -->
              <div
                class="absolute right-4 bottom-4 left-4 z-20 overflow-hidden rounded-2xl border border-white/60 bg-white/85 p-1.5 shadow-lg backdrop-blur-md"
              >
                <div class="marquee-track hover:paused flex w-max items-center gap-3">
                  <div class="flex shrink-0 items-center gap-3">
                    <span
                      class="flex items-center gap-1.5 rounded-full border border-gray-100 bg-white px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm"
                      ><Icon icon="simple-icons:nuxtdotjs" class="text-[#00DC82]" /> Nuxt 4</span
                    >
                    <span
                      class="flex items-center gap-1.5 rounded-full border border-gray-100 bg-white px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm"
                      ><Icon icon="simple-icons:tailwindcss" class="text-[#38BDF8]" />
                      Tailwind</span
                    >
                    <span
                      class="flex items-center gap-1.5 rounded-full border border-gray-100 bg-white px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm"
                      ><Icon icon="simple-icons:openai" class="text-black" /> AI Workflows</span
                    >
                    <span
                      class="flex items-center gap-1.5 rounded-full border border-gray-100 bg-white px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm"
                      ><Icon icon="simple-icons:figma" class="text-[#F24E1E]" /> Brand
                      Strategy</span
                    >
                    <span
                      class="flex items-center gap-1.5 rounded-full border border-gray-100 bg-white px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm"
                      ><Icon icon="simple-icons:vuedotjs" class="text-[#4FC08D]" /> Vue 3</span
                    >
                    <span
                      class="flex items-center gap-1.5 rounded-full border border-gray-100 bg-white px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm"
                      ><Icon icon="simple-icons:typescript" class="text-[#3178C6]" />
                      TypeScript</span
                    >
                  </div>
                  <div class="flex shrink-0 items-center gap-3" aria-hidden="true">
                    <span
                      class="flex items-center gap-1.5 rounded-full border border-gray-100 bg-white px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm"
                      ><Icon icon="simple-icons:nuxtdotjs" class="text-[#00DC82]" /> Nuxt 4</span
                    >
                    <span
                      class="flex items-center gap-1.5 rounded-full border border-gray-100 bg-white px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm"
                      ><Icon icon="simple-icons:tailwindcss" class="text-[#38BDF8]" />
                      Tailwind</span
                    >
                    <span
                      class="flex items-center gap-1.5 rounded-full border border-gray-100 bg-white px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm"
                      ><Icon icon="simple-icons:openai" class="text-black" /> AI Workflows</span
                    >
                    <span
                      class="flex items-center gap-1.5 rounded-full border border-gray-100 bg-white px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm"
                      ><Icon icon="simple-icons:figma" class="text-[#F24E1E]" /> Brand
                      Strategy</span
                    >
                    <span
                      class="flex items-center gap-1.5 rounded-full border border-gray-100 bg-white px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm"
                      ><Icon icon="simple-icons:vuedotjs" class="text-[#4FC08D]" /> Vue 3</span
                    >
                    <span
                      class="flex items-center gap-1.5 rounded-full border border-gray-100 bg-white px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm"
                      ><Icon icon="simple-icons:typescript" class="text-[#3178C6]" />
                      TypeScript</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Card: Revenue Growth Agent + Typewriter + CTA -->
          <div
            class="rounded-2xl border border-gray-200 bg-white p-5 text-gray-900 shadow-2xl shadow-gray-200/80 transition-all duration-500 hover:-translate-y-2"
            :style="{ transform: `translate3d(${mouseX * 0.5}px, ${mouseY * 0.5}px, 0)` }"
          >
            <div class="mb-3 flex items-center gap-2">
              <div class="size-2 animate-ping rounded-full bg-[#05DED5]" />
              <p class="text-xs font-bold text-gray-900">Revenue Growth Agent</p>
            </div>
            <div
              class="mb-4 min-h-16 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700"
            >
              <div class="flex items-center gap-1.5 text-[10px] font-medium text-gray-400">
                <Icon icon="lucide:file-spreadsheet" class="text-emerald-500" />
                H2_Forecast_Strategy.csv
              </div>
              <p class="font-medium text-gray-900">
                {{ agentTypedText }}
                <span
                  class="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-[#05DED5] align-middle"
                />
              </p>
            </div>
            <div class="relative flex justify-end">
              <NuxtLink
                to="/contact"
                class="rounded-full bg-[#05DED5] px-4 py-2 text-xs font-bold text-gray-900 shadow-md transition-all duration-300 hover:scale-105"
                :class="
                  ctaButtonVisible
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-2 opacity-0'
                "
                :style="{ transform: `scale(${ctaButtonScale})` }"
              >
                Explore Solutions
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- ■ MOBILE / TABLET LAYOUT (< lg) -->
        <div class="flex flex-col gap-4 lg:hidden">
          <!-- Hero image (full width on mobile) with overlaid profile card, marquee & mobile tour pointer -->
          <div
            class="relative w-full overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 shadow-2xl shadow-gray-200/60"
          >
            <!-- Mobile Guided Cursor overlay (sits absolutely over the hero image) -->
            <div
              class="pointer-events-none absolute z-40 transition-all duration-700 ease-in-out"
              :class="tourPointerVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'"
              :style="{ top: tourPosMobile.top, left: tourPosMobile.left }"
            >
              <div class="flex items-center gap-0.5">
                <div class="size-4 shrink-0 drop-shadow-md transition-all duration-300">
                  <svg viewBox="0 0 24 24" class="size-full rotate-90">
                    <path
                      d="M3 3l7 18 3-7 7-3L3 3z"
                      :fill="tourPointerState === 'SOLID' ? '#05DED5' : 'rgba(255,255,255,0.95)'"
                      stroke="#05DED5"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div
                  class="flex items-center rounded-full bg-[#05DED5] px-3 py-1 text-[10px] font-bold text-gray-950 shadow-lg ring-1 shadow-[#05DED5]/30 ring-white transition-all duration-300"
                >
                  <span>{{ tourPillText }}</span>
                </div>
              </div>
            </div>

            <div class="relative aspect-video w-full overflow-hidden">
              <NuxtImg
                src="/images/pages/(home)/hero.webp"
                alt="Deagensie Creative Ecosystem"
                class="size-full object-cover transition-transform duration-700"
              />
              <div
                class="absolute inset-0 bg-linear-to-t from-gray-900/30 via-transparent to-transparent"
              />

              <!-- Profile Card (mobile, inside image) -->
              <div
                class="absolute top-3 left-3 z-20 rounded-xl border border-gray-200 bg-white/95 px-3 py-2 text-gray-900 shadow-xl backdrop-blur-md transition-all duration-500"
              >
                <div class="flex items-center gap-1.5">
                  <span class="text-xs font-bold">Victor E.</span>
                  <span
                    class="rounded-full bg-[#05DED5]/20 px-2 py-0.5 text-[10px] font-bold text-[#04308F]"
                    >100% Match</span
                  >
                </div>
                <p class="text-[10px] font-medium text-gray-500">Head of People & Operations</p>
                <div
                  class="grid transition-[grid-template-rows,opacity] duration-500 ease-out"
                  :class="
                    isProfileExpanded
                      ? 'mt-1.5 grid-rows-[1fr] border-t border-gray-100 pt-1.5 opacity-100'
                      : 'mt-0 grid-rows-[0fr] border-t-0 pt-0 opacity-0'
                  "
                >
                  <div class="overflow-hidden">
                    <div class="flex items-center gap-1 text-[9px] font-medium text-gray-500">
                      <span>With:</span>
                      <span class="flex items-center justify-center rounded-full bg-gray-100 p-0.5"
                        ><Icon icon="simple-icons:nuxtdotjs" class="size-2.5 text-[#00DC82]"
                      /></span>
                      <span class="flex items-center justify-center rounded-full bg-gray-100 p-0.5"
                        ><Icon icon="simple-icons:openai" class="size-2.5 text-black"
                      /></span>
                      <span class="flex items-center justify-center rounded-full bg-gray-100 p-0.5"
                        ><Icon icon="simple-icons:figma" class="size-2.5 text-[#F24E1E]"
                      /></span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Marquee Strip (mobile, inside image) -->
              <div
                class="absolute right-2 bottom-2 left-2 z-20 overflow-hidden rounded-xl border border-white/60 bg-white/85 p-1 shadow-lg backdrop-blur-md"
              >
                <div class="marquee-track hover:paused flex w-max items-center gap-2">
                  <div class="flex shrink-0 items-center gap-2">
                    <span
                      class="flex items-center gap-1 rounded-full border border-gray-100 bg-white px-2 py-0.5 text-[10px] font-semibold text-gray-900 shadow-sm"
                      ><Icon icon="simple-icons:nuxtdotjs" class="text-[#00DC82]" /> Nuxt 4</span
                    >
                    <span
                      class="flex items-center gap-1 rounded-full border border-gray-100 bg-white px-2 py-0.5 text-[10px] font-semibold text-gray-900 shadow-sm"
                      ><Icon icon="simple-icons:tailwindcss" class="text-[#38BDF8]" />
                      Tailwind</span
                    >
                    <span
                      class="flex items-center gap-1 rounded-full border border-gray-100 bg-white px-2 py-0.5 text-[10px] font-semibold text-gray-900 shadow-sm"
                      ><Icon icon="simple-icons:openai" class="text-black" /> AI Workflows</span
                    >
                    <span
                      class="flex items-center gap-1 rounded-full border border-gray-100 bg-white px-2 py-0.5 text-[10px] font-semibold text-gray-900 shadow-sm"
                      ><Icon icon="simple-icons:figma" class="text-[#F24E1E]" /> Brand
                      Strategy</span
                    >
                    <span
                      class="flex items-center gap-1 rounded-full border border-gray-100 bg-white px-2 py-0.5 text-[10px] font-semibold text-gray-900 shadow-sm"
                      ><Icon icon="simple-icons:vuedotjs" class="text-[#4FC08D]" /> Vue 3</span
                    >
                  </div>
                  <div class="flex shrink-0 items-center gap-2" aria-hidden="true">
                    <span
                      class="flex items-center gap-1 rounded-full border border-gray-100 bg-white px-2 py-0.5 text-[10px] font-semibold text-gray-900 shadow-sm"
                      ><Icon icon="simple-icons:nuxtdotjs" class="text-[#00DC82]" /> Nuxt 4</span
                    >
                    <span
                      class="flex items-center gap-1 rounded-full border border-gray-100 bg-white px-2 py-0.5 text-[10px] font-semibold text-gray-900 shadow-sm"
                      ><Icon icon="simple-icons:tailwindcss" class="text-[#38BDF8]" />
                      Tailwind</span
                    >
                    <span
                      class="flex items-center gap-1 rounded-full border border-gray-100 bg-white px-2 py-0.5 text-[10px] font-semibold text-gray-900 shadow-sm"
                      ><Icon icon="simple-icons:openai" class="text-black" /> AI Workflows</span
                    >
                    <span
                      class="flex items-center gap-1 rounded-full border border-gray-100 bg-white px-2 py-0.5 text-[10px] font-semibold text-gray-900 shadow-sm"
                      ><Icon icon="simple-icons:figma" class="text-[#F24E1E]" /> Brand
                      Strategy</span
                    >
                    <span
                      class="flex items-center gap-1 rounded-full border border-gray-100 bg-white px-2 py-0.5 text-[10px] font-semibold text-gray-900 shadow-sm"
                      ><Icon icon="simple-icons:vuedotjs" class="text-[#4FC08D]" /> Vue 3</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile: 2-column card grid below image -->
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <!-- Left Card (mobile stacked) -->
            <div
              class="rounded-2xl border border-gray-200 bg-white p-4 text-gray-900 shadow-xl shadow-gray-200/60"
            >
              <p class="mb-2.5 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                AI Growth Course
              </p>
              <div class="space-y-3">
                <div>
                  <div class="mb-1 flex justify-between text-[11px] font-semibold">
                    <span class="text-gray-700">Prompt Engineering</span>
                    <span class="font-mono text-[#04308F]">{{ Math.round(progress1) }}%</span>
                  </div>
                  <div class="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      class="h-full rounded-full bg-[#05DED5] transition-[width] duration-300 ease-out"
                      :style="{ width: `${progress1}%` }"
                    />
                  </div>
                </div>
                <div>
                  <div class="mb-1 flex justify-between text-[11px] font-semibold">
                    <span class="text-gray-700">Agent Orchestration</span>
                    <span class="font-mono text-[#04308F]">{{ Math.round(progress2) }}%</span>
                  </div>
                  <div class="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      class="h-full rounded-full bg-[#04308F] transition-[width] duration-300 ease-out"
                      :style="{ width: `${progress2}%` }"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Card (mobile stacked) -->
            <div
              class="rounded-2xl border border-gray-200 bg-white p-4 text-gray-900 shadow-xl shadow-gray-200/60"
            >
              <div class="mb-2 flex items-center gap-1.5">
                <div class="size-1.5 animate-ping rounded-full bg-[#05DED5]" />
                <p class="text-[10px] font-bold text-gray-900">Revenue Growth Agent</p>
              </div>
              <div
                class="mb-3 min-h-12 space-y-1 rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-[10px] text-gray-700"
              >
                <div class="flex items-center gap-1 text-[9px] font-medium text-gray-400">
                  <Icon icon="lucide:file-spreadsheet" class="text-emerald-500" />
                  H2_Forecast_Strategy.csv
                </div>
                <p class="font-medium text-gray-900">
                  {{ agentTypedText }}
                  <span
                    class="ml-0.5 inline-block h-3 w-1 animate-pulse bg-[#05DED5] align-middle"
                  />
                </p>
              </div>
              <div class="flex justify-end">
                <NuxtLink
                  to="/contact"
                  class="rounded-full bg-[#05DED5] px-3 py-1.5 text-[10px] font-bold text-gray-900 shadow-md transition-all duration-300 hover:scale-105"
                  :class="ctaButtonVisible ? 'opacity-100' : 'pointer-events-none opacity-0'"
                  :style="{ transform: `scale(${ctaButtonScale})` }"
                >
                  Explore Solutions
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Metric Dividers -->
      <div
        class="grid grid-cols-2 gap-4 border-t border-gray-200 pt-8 sm:gap-6 sm:pt-12 lg:grid-cols-4 lg:pt-16"
      >
        <div
          v-for="(stat, statIndex) in heroStats"
          :key="stat.label"
          :ref="(el) => setStatRef(el, statIndex)"
          class="space-y-2 border-l-2 border-[#05DED5] pl-4 transition-all duration-300 hover:translate-x-1 lg:pl-6"
        >
          <p class="font-mono text-3xl font-bold text-[#04308F] lg:text-4xl">
            {{ formatStatValue(stat) }}
          </p>
          <p class="text-xs leading-relaxed text-gray-500 lg:text-sm">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
@keyframes marquee-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.marquee-track {
  animation: marquee-scroll 22s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
