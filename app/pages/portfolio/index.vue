<script setup lang="ts">
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

const setStatRef = (el: Element | any | null, i: number) => {
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
  description: "We don't just create business solutions, we craft experiences that captivate, connect and convert.",
});
</script>

<template>
  <div class="bg-white text-gray-900 min-h-screen">
    <!-- ══════════════════════════════════════════════
         EDITORIAL HERO — Clean Open Aesthetic
         ══════════════════════════════════════════════ -->
    <section class="relative pt-28 pb-20 lg:pt-36 lg:pb-28 border-b border-gray-100 overflow-hidden">
      <!-- Ambient background blur -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-[10%] w-96 h-96 rounded-full bg-[#04308F]/5 blur-3xl" />
        <div class="absolute bottom-0 right-[5%] w-72 h-72 rounded-full bg-[#05DED5]/8 blur-3xl" />
      </div>

      <div class="relative z-10 mx-auto w-5/6 max-w-7xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left copy -->
          <div v-reveal="'fade-up'" class="space-y-8">
            <span class="text-xs uppercase tracking-widest text-[#04308F] font-semibold bg-[#04308F]/10 px-4 py-1.5 rounded-full inline-block">
              Deagensie Showcase
            </span>
            <h1 class="text-3xl font-serif font-normal tracking-tight sm:text-4xl lg:text-6xl text-gray-900 leading-tight">
              We craft experiences that captivate, connect<span class="text-[#04308F] italic"> & convert.</span>
            </h1>
            <p class="text-base text-gray-500 sm:text-lg leading-relaxed font-normal max-w-lg">
              Empowering businesses and creatives with skills, insights, and strategies to innovate and succeed in the digital creative economy.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink
                to="/contact"
                class="inline-flex items-center justify-center gap-2 rounded-full bg-[#04308F] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#05DED5] hover:text-gray-900 shadow-md shadow-[#04308F]/20"
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
            <div class="rounded-3xl overflow-hidden border border-gray-100 shadow-2xl shadow-gray-200/60 aspect-video bg-gray-100">
              <NuxtImg
                src="/images/works/lw-trade-and-investment-forum/showcase.webp"
                alt="Deagensie Portfolio Showcase"
                class="size-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div class="absolute inset-0 bg-linear-to-t from-gray-900/40 via-transparent to-transparent" />
            </div>

            <!-- Floating stat badges -->
            <div class="absolute -bottom-5 -left-5 rounded-2xl bg-white border border-gray-100 shadow-xl p-4 text-center space-y-0.5 hidden sm:block animate-float">
              <p class="text-2xl font-bold text-[#04308F] font-mono">100+</p>
              <p class="text-xs text-gray-500 font-medium">Projects Delivered</p>
            </div>
            <div class="absolute -top-4 -right-4 rounded-2xl bg-[#04308F] border border-white shadow-xl p-4 text-center space-y-0.5 hidden sm:block animate-float-slow">
              <p class="text-2xl font-bold text-white font-mono">4.9★</p>
              <p class="text-xs text-gray-300 font-medium">Verified Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════
         CATEGORY FILTER PILLS BAR (Non-Sticky)
         ══════════════════════════════════════════════ -->
    <section class="bg-white border-b border-gray-100 py-6 shadow-xs">
      <div class="mx-auto w-5/6 max-w-7xl">
        <div class="flex flex-wrap items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
          <!-- All pill -->
          <button
            type="button"
            class="rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 shrink-0"
            :class="activeFilter === null ? 'bg-[#04308F] text-white shadow-md shadow-[#04308F]/20 scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            @click="activeFilter = null"
          >
            All Projects
          </button>
          <button
            v-for="filter in portfolioFilters"
            :key="filter"
            type="button"
            class="rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 shrink-0"
            :class="activeFilter === filter ? 'bg-[#04308F] text-white shadow-md shadow-[#04308F]/20 scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
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
        <div v-if="filteredProjects.length" :key="activeFilter ?? 'all'" class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-12">
          <div
            v-for="(project, pIndex) in filteredProjects"
            :key="project.id"
            v-reveal="{ animation: 'fade-up', delay: (pIndex % 2) * 80 }"
          >
            <PortfolioCard :project="project" @select="openProjectModal" />
          </div>
        </div>

        <div v-else :key="'empty'" class="py-20 text-center space-y-4 rounded-3xl border border-gray-100 bg-gray-50">
          <Icon icon="lucide:search-x" class="text-4xl text-gray-400 mx-auto" />
          <p class="text-base text-gray-600 font-serif">No projects match this category filter.</p>
          <button
            type="button"
            class="px-5 py-2 rounded-full bg-[#04308F] text-white text-xs font-semibold hover:bg-[#05DED5] hover:text-gray-900 transition-colors"
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
    <section class="bg-gray-50 border-t border-b border-gray-100 py-16 lg:py-24">
      <div class="mx-auto w-5/6 max-w-7xl">
        <div v-reveal="'fade-up'" class="text-center mb-12 space-y-3">
          <span class="text-xs uppercase tracking-widest text-[#04308F] font-semibold bg-[#04308F]/10 px-4 py-1.5 rounded-full inline-block">
            Proven Results
          </span>
          <h2 class="text-3xl font-serif font-normal sm:text-4xl text-gray-900">
            The numbers speak for themselves
          </h2>
        </div>

        <div class="grid grid-cols-2 gap-6 md:grid-cols-4 sm:gap-8">
          <div
            v-for="(stat, statIndex) in animatedStats"
            :key="stat.label"
            :ref="(el) => setStatRef(el as any, statIndex)"
            v-reveal="{ animation: 'fade-up', delay: statIndex * 100 }"
            class="text-center space-y-3 p-6 rounded-3xl bg-white border border-gray-100 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <p class="text-4xl sm:text-5xl font-bold text-[#04308F] font-mono group-hover:text-[#05DED5] transition-colors">
              {{ stat.display || stat.value }}
            </p>
            <p class="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
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
        class="relative overflow-hidden rounded-3xl bg-[#04308F] px-8 py-14 text-center text-white lg:px-14 lg:py-20 shadow-2xl shadow-[#04308F]/30"
      >
        <!-- Ambient Background Glows -->
        <div class="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#05DED5]/20 blur-3xl pointer-events-none" />
        <div class="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#8F039C]/15 blur-3xl pointer-events-none" />

        <div class="relative z-10 space-y-6 max-w-3xl mx-auto">
          <span class="text-xs uppercase tracking-widest text-[#05DED5] font-semibold inline-block">
            Partner with Deagensie
          </span>
          <h2 class="text-3xl font-serif font-normal sm:text-4xl lg:text-5xl text-white leading-tight">
            Ready to Build What's Next?
          </h2>
          <p class="text-sm sm:text-base leading-relaxed text-gray-200 font-normal max-w-xl mx-auto">
            Let's create something extraordinary together. Partner with Deagensie and unlock a smarter, bolder future for your business.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <NuxtLink
              to="/contact"
              class="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 rounded-full bg-[#05DED5] px-8 py-4 text-base font-semibold text-gray-900 transition-all duration-300 hover:bg-white hover:scale-105 shadow-lg"
            >
              Get Started Today
              <Icon icon="lucide:arrow-right" class="text-base" />
            </NuxtLink>
            <NuxtLink
              to="/subscription"
              class="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white/10"
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
          class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto"
          @click.self="closeProjectModal"
        >
          <div
            class="relative w-full max-w-3xl rounded-3xl bg-white text-gray-900 p-6 sm:p-10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col space-y-6"
          >
            <!-- Close Button -->
            <button
              type="button"
              class="absolute top-5 right-5 size-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors z-10"
              @click="closeProjectModal"
            >
              <Icon icon="lucide:x" class="text-xl" />
            </button>

            <!-- Modal Header Image -->
            <div class="relative aspect-video w-full rounded-2xl overflow-hidden bg-gray-100 shrink-0">
              <NuxtImg
                v-if="selectedProject.cover"
                :src="selectedProject.cover"
                :alt="selectedProject.title"
                class="size-full object-cover"
              />
              <div class="absolute inset-0 bg-linear-to-t from-gray-900/40 via-transparent to-transparent" />
              <div class="absolute bottom-4 left-4 flex flex-wrap gap-2">
                <span
                  v-for="tag in selectedProject.tags"
                  :key="tag"
                  class="rounded-full bg-white/90 backdrop-blur-xs px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-800 shadow-sm"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Modal Body Content -->
            <div class="space-y-4 overflow-y-auto pr-1 flex-1">
              <div class="flex flex-wrap items-center justify-between text-xs text-[#04308F] font-semibold gap-2">
                <span>PROJECT CASE STUDY</span>
                <span v-if="selectedProject.client" class="text-gray-400 font-normal">
                  Client: {{ selectedProject.client }}
                </span>
              </div>

              <h2 class="text-2xl sm:text-3xl font-serif font-normal text-gray-900 leading-snug">
                {{ selectedProject.title }}
              </h2>

              <p class="text-base text-gray-600 leading-relaxed font-normal">
                {{ selectedProject.description }}
              </p>
            </div>

            <!-- Modal Footer Action -->
            <div class="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <div>
                <p class="text-xs font-bold text-gray-900">Interested in a similar solution?</p>
                <p class="text-xs text-gray-500">Deagensie delivers strategy, branding, & tech.</p>
              </div>
              <NuxtLink
                to="/contact"
                class="w-full sm:w-auto text-center rounded-full bg-[#04308F] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#05DED5] hover:text-gray-900"
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
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
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
