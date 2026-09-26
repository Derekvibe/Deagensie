<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue';
import { demoProjects, demoStats, portfolioFilters } from '~/data/portfolio';
import { Icon } from '@iconify/vue';
import type { PortfolioProject } from '~/types/api';
import PortfolioCard from '~/components/pages/portfolio/PortfolioCard.vue';

// ─── Filter State ────────────────────────────────────────────
const activeFilter = ref<string | null>(null);

const filteredProjects = computed(() => {
  if (!activeFilter.value) return demoProjects;
  return demoProjects.filter((p) =>
    p.tags.some((t) => t.toLowerCase() === activeFilter.value!.toLowerCase())
  );
});

// ─── Project Detail Modal State ─────────────────────────────
const selectedProject = ref<PortfolioProject | null>(null);

const openProjectModal = (project: PortfolioProject) => {
  selectedProject.value = project;
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden';
  }
};

const closeProjectModal = () => {
  selectedProject.value = null;
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
};

// ─── Animated Stat Counters ──────────────────────────────────
const statRefs = ref<HTMLElement[]>([]);
const animatedStats = ref(demoStats.map((s) => ({ ...s, display: '' })));

const parseStatValue = (val: string) => {
  const num = parseFloat(val.replace(/[^0-9.]/g, ''));
  const prefix = val.match(/^[^0-9]*/)?.[0] ?? '';
  const suffix = val.match(/[^0-9.]+$/)?.[0] ?? '';
  return { num, prefix, suffix };
};

const animateStat = (index: number) => {
  const rawStat = demoStats[index];
  if (!rawStat) return;
  const { num, prefix, suffix } = parseStatValue(String(rawStat.value));
  const duration = 1200;
  const start = performance.now();

  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(num * eased);
    if (animatedStats.value[index]) {
      animatedStats.value[index]!.display = `${prefix}${current.toLocaleString()}${suffix}`;
    }
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

const setStatRef = (el: Element | ComponentPublicInstance | null, i: number) => {
  if (el instanceof HTMLElement) statRefs.value[i] = el;
};

onMounted(() => {
  animatedStats.value = demoStats.map((s) => ({ ...s, display: '0' }));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const idx = statRefs.value.findIndex((el) => el === entry.target);
        if (idx !== -1) animateStat(idx);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.3 }
  );
  statRefs.value.forEach((el) => el && observer.observe(el));
});

// ─── SEO Meta ───────────────────────────────────────────────
useSeoMeta({
  title: 'Our Portfolio — Deagensie',
  description:
    "We don't just create business solutions, we craft experiences that captivate, connect and convert.",
});
</script>

<template>
  <div class="min-h-screen bg-white text-gray-900">
    <!-- ══════════════════════════════════════════════
         EDITORIAL HERO — Clean Open Aesthetic
         ══════════════════════════════════════════════ -->
    <section
      class="relative overflow-hidden border-b border-gray-100 pt-28 pb-20 lg:pt-36 lg:pb-28"
    >
      <!-- Ambient background blur -->
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute top-0 left-[10%] h-96 w-96 rounded-full bg-[#04308F]/5 blur-3xl" />
        <div class="absolute right-[5%] bottom-0 h-72 w-72 rounded-full bg-[#05DED5]/8 blur-3xl" />
      </div>

      <div class="relative z-10 mx-auto w-5/6 max-w-7xl">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <!-- Left copy -->
          <div v-reveal="'fade-up'" class="space-y-8">
            <span
              class="inline-block rounded-full bg-[#04308F]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#04308F] uppercase"
            >
              Deagensie Showcase
            </span>
            <h1
              class="font-serif text-3xl leading-tight font-normal tracking-tight text-gray-900 sm:text-4xl lg:text-6xl"
            >
              We craft experiences that captivate, connect<span class="text-[#04308F] italic">
                & convert.</span
              >
            </h1>
            <p class="max-w-lg text-base leading-relaxed font-normal text-gray-500 sm:text-lg">
              Empowering businesses and creatives with skills, insights, and strategies to innovate
              and succeed in the digital creative economy.
            </p>
            <div class="flex flex-col gap-4 sm:flex-row">
              <NuxtLink
                to="/contact"
                class="inline-flex items-center justify-center gap-2 rounded-full bg-[#04308F] px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#04308F]/20 transition-all duration-300 hover:bg-[#05DED5] hover:text-gray-900"
              >
                Start a Project <Icon icon="lucide:arrow-right" class="text-base" />
              </NuxtLink>
              <NuxtLink
                to="/contact"
                class="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-7 py-3.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-[#04308F] hover:text-[#04308F]"
              >
                Book a Discovery Call
              </NuxtLink>
            </div>
          </div>

          <!-- Right Hero Visual Collage -->
          <div v-reveal="'scale-in'" class="relative">
            <div
              class="aspect-video overflow-hidden rounded-3xl border border-gray-100 bg-gray-100 shadow-2xl shadow-gray-200/60"
            >
              <NuxtImg
                src="/images/works/lw-trade-and-investment-forum/showcase.webp"
                alt="Deagensie Portfolio Showcase"
                class="size-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div
                class="absolute inset-0 bg-linear-to-t from-gray-900/40 via-transparent to-transparent"
              />
            </div>

            <!-- Floating stat badges -->
            <div
              class="animate-float absolute -bottom-5 -left-5 hidden space-y-0.5 rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-xl sm:block"
            >
              <p class="font-mono text-2xl font-bold text-[#04308F]">100+</p>
              <p class="text-xs font-medium text-gray-500">Projects Delivered</p>
            </div>
            <div
              class="animate-float-slow absolute -top-4 -right-4 hidden space-y-0.5 rounded-2xl border border-white bg-[#04308F] p-4 text-center shadow-xl sm:block"
            >
              <p class="font-mono text-2xl font-bold text-white">4.9★</p>
              <p class="text-xs font-medium text-gray-300">Verified Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════
         CATEGORY FILTER PILLS BAR (Non-Sticky)
         ══════════════════════════════════════════════ -->
    <section class="border-b border-gray-100 bg-white py-6 shadow-xs">
      <div class="mx-auto w-5/6 max-w-7xl">
        <div class="no-scrollbar flex flex-wrap items-center gap-2.5 overflow-x-auto py-1">
          <!-- All pill -->
          <button
            type="button"
            class="shrink-0 rounded-full px-5 py-2.5 text-xs font-semibold transition-all duration-300 sm:text-sm"
            :class="
              activeFilter === null
                ? 'scale-105 bg-[#04308F] text-white shadow-md shadow-[#04308F]/20'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            "
            @click="activeFilter = null"
          >
            All Projects
          </button>
          <button
            v-for="filter in portfolioFilters"
            :key="filter"
            type="button"
            class="shrink-0 rounded-full px-5 py-2.5 text-xs font-semibold transition-all duration-300 sm:text-sm"
            :class="
              activeFilter === filter
                ? 'scale-105 bg-[#04308F] text-white shadow-md shadow-[#04308F]/20'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            "
            @click="activeFilter = filter"
          >
            {{ filter }}
          </button>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════
         PROJECTS GRID
         ══════════════════════════════════════════════ -->
    <section class="mx-auto w-5/6 max-w-7xl py-16 lg:py-24">
      <Transition name="fade" mode="out-in">
        <div
          v-if="filteredProjects.length"
          :key="activeFilter ?? 'all'"
          class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-12"
        >
          <div
            v-for="(project, pIndex) in filteredProjects"
            :key="project.id"
            v-reveal="{ animation: 'fade-up', delay: (pIndex % 2) * 80 }"
          >
            <PortfolioCard :project="project" @select="openProjectModal" />
          </div>
        </div>

        <div
          v-else
          :key="'empty'"
          class="space-y-4 rounded-3xl border border-gray-100 bg-gray-50 py-20 text-center"
        >
          <Icon icon="lucide:search-x" class="mx-auto text-4xl text-gray-400" />
          <p class="font-serif text-base text-gray-600">No projects match this category filter.</p>
          <button
            type="button"
            class="rounded-full bg-[#04308F] px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#05DED5] hover:text-gray-900"
            @click="activeFilter = null"
          >
            Show All Projects
          </button>
        </div>
      </Transition>
    </section>

    <!-- ══════════════════════════════════════════════
         PROVEN RESULTS STATS STRIP
         ══════════════════════════════════════════════ -->
    <section class="border-t border-b border-gray-100 bg-gray-50 py-16 lg:py-24">
      <div class="mx-auto w-5/6 max-w-7xl">
        <div v-reveal="'fade-up'" class="mb-12 space-y-3 text-center">
          <span
            class="inline-block rounded-full bg-[#04308F]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#04308F] uppercase"
          >
            Proven Results
          </span>
          <h2 class="font-serif text-3xl font-normal text-gray-900 sm:text-4xl">
            The numbers speak for themselves
          </h2>
        </div>

        <div class="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
          <div
            v-for="(stat, statIndex) in animatedStats"
            :key="stat.label"
            :ref="(el) => setStatRef(el as any, statIndex)"
            v-reveal="{ animation: 'fade-up', delay: statIndex * 100 }"
            class="group space-y-3 rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <p
              class="font-mono text-4xl font-bold text-[#04308F] transition-colors group-hover:text-[#05DED5] sm:text-5xl"
            >
              {{ stat.display || stat.value }}
            </p>
            <p class="text-xs leading-relaxed font-medium text-gray-500 sm:text-sm">
              {{ stat.label }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════
         PREMIUM CTA CONVERSION BANNER
         ══════════════════════════════════════════════ -->
    <section class="mx-auto w-5/6 max-w-7xl py-16 lg:py-24">
      <div
        v-reveal="'scale-in'"
        class="relative overflow-hidden rounded-3xl bg-[#04308F] px-8 py-14 text-center text-white shadow-2xl shadow-[#04308F]/30 lg:px-14 lg:py-20"
      >
        <!-- Ambient Background Glows -->
        <div
          class="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full bg-[#05DED5]/20 blur-3xl"
        />
        <div
          class="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-[#8F039C]/15 blur-3xl"
        />

        <div class="relative z-10 mx-auto max-w-3xl space-y-6">
          <span class="inline-block text-xs font-semibold tracking-widest text-[#05DED5] uppercase">
            Partner with Deagensie
          </span>
          <h2
            class="font-serif text-3xl leading-tight font-normal text-white sm:text-4xl lg:text-5xl"
          >
            Ready to Build What's Next?
          </h2>
          <p
            class="mx-auto max-w-xl text-sm leading-relaxed font-normal text-gray-200 sm:text-base"
          >
            Let's create something extraordinary together. Partner with Deagensie and unlock a
            smarter, bolder future for your business.
          </p>
          <div class="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
            <NuxtLink
              to="/contact"
              class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#05DED5] px-8 py-4 text-center text-base font-semibold text-gray-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white sm:w-auto"
            >
              Get Started Today
              <Icon icon="lucide:arrow-right" class="text-base" />
            </NuxtLink>
            <NuxtLink
              to="/subscription"
              class="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-center text-base font-semibold text-white transition-all duration-300 hover:bg-white/10 sm:w-auto"
            >
              View Pricing Plans
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════
         INTERACTIVE PROJECT DETAIL MODAL OVERLAY
         ══════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="selectedProject"
          class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-md sm:p-6"
          @click.self="closeProjectModal"
        >
          <div
            class="relative flex max-h-[90vh] w-full max-w-3xl flex-col space-y-6 overflow-hidden rounded-3xl bg-white p-6 text-gray-900 shadow-2xl sm:p-10"
          >
            <!-- Close Button -->
            <button
              type="button"
              class="absolute top-5 right-5 z-10 flex size-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
              @click="closeProjectModal"
            >
              <Icon icon="lucide:x" class="text-xl" />
            </button>

            <!-- Modal Header Image -->
            <div
              class="relative aspect-video w-full shrink-0 overflow-hidden rounded-2xl bg-gray-100"
            >
              <NuxtImg
                v-if="selectedProject.cover"
                :src="selectedProject.cover"
                :alt="selectedProject.title"
                class="size-full object-cover"
              />
              <div
                class="absolute inset-0 bg-linear-to-t from-gray-900/40 via-transparent to-transparent"
              />
              <div class="absolute bottom-4 left-4 flex flex-wrap gap-2">
                <span
                  v-for="tag in selectedProject.tags"
                  :key="tag"
                  class="rounded-full bg-white/90 px-3 py-1 text-xs font-bold tracking-wider text-gray-800 uppercase shadow-sm backdrop-blur-xs"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Modal Body Content -->
            <div class="flex-1 space-y-4 overflow-y-auto pr-1">
              <div
                class="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-[#04308F]"
              >
                <span>PROJECT CASE STUDY</span>
                <span v-if="selectedProject.client" class="font-normal text-gray-400">
                  Client: {{ selectedProject.client }}
                </span>
              </div>

              <h2 class="font-serif text-2xl leading-snug font-normal text-gray-900 sm:text-3xl">
                {{ selectedProject.title }}
              </h2>

              <p class="text-base leading-relaxed font-normal text-gray-600">
                {{ selectedProject.description }}
              </p>
            </div>

            <!-- Modal Footer Action -->
            <div
              class="flex shrink-0 flex-col items-center justify-between gap-4 border-t border-gray-100 pt-4 sm:flex-row"
            >
              <div>
                <p class="text-xs font-bold text-gray-900">Interested in a similar solution?</p>
                <p class="text-xs text-gray-500">Deagensie delivers strategy, branding, & tech.</p>
              </div>
              <NuxtLink
                to="/contact"
                class="w-full rounded-full bg-[#04308F] px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#05DED5] hover:text-gray-900 sm:w-auto"
                @click="closeProjectModal"
              >
                Discuss This Project
              </NuxtLink>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.modal-enter-active,
.modal-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
