<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { PortfolioProject } from '~/types/api';

defineProps<{ project: PortfolioProject }>();
const emit = defineEmits<{ (e: 'select', project: PortfolioProject): void }>();
</script>

<template>
  <!-- VARIANT A — "inset": title/desc inside card footer -->
  <article
    v-if="project.layout === 'inset'"
    class="group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-400 hover:shadow-2xl hover:border-[#04308F]/30 hover:-translate-y-1.5 cursor-pointer h-full"
    @click="emit('select', project)"
  >
    <!-- Cover Image Container -->
    <div class="relative overflow-hidden aspect-video w-full bg-gray-100">
      <NuxtImg
        v-if="project.cover"
        :src="project.cover"
        :alt="project.title"
        class="size-full object-cover transition-transform duration-600 group-hover:scale-105"
        loading="lazy"
      />
      <div v-else class="size-full bg-linear-to-br from-[#04308F]/10 to-[#05DED5]/10" />
      <div class="absolute inset-0 bg-linear-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <!-- Hover Overlay Badge -->
      <div class="absolute top-4 right-4 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-bold text-[#04308F] shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
        Preview Project
      </div>

      <!-- Tags overlay on hover -->
      <div class="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="rounded-full bg-white/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-800 shadow-xs"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- Footer Content -->
    <div class="flex flex-1 flex-col p-6 sm:p-8 space-y-4">
      <div class="space-y-2">
        <div class="flex items-center justify-between text-xs text-[#04308F] font-semibold tracking-wider uppercase">
          <span>{{ project.tags[0] }}</span>
          <span v-if="project.client" class="text-gray-400 font-normal normal-case text-[11px] truncate max-w-[140px]">{{ project.client }}</span>
        </div>
        <h3 class="text-lg sm:text-xl font-serif font-normal leading-snug text-gray-900 group-hover:text-[#04308F] transition-colors">
          {{ project.title }}
        </h3>
        <p class="text-sm leading-relaxed text-gray-500 font-normal line-clamp-3">
          {{ project.description }}
        </p>
      </div>

      <div class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
        <span class="inline-flex items-center gap-1.5 text-sm font-semibold text-[#04308F] group-hover:text-[#05DED5] transition-colors">
          View Case Details
          <Icon icon="lucide:arrow-right" class="text-base transition-transform duration-200 group-hover:translate-x-1" />
        </span>
        <span class="text-xs font-semibold text-[#05DED5] bg-[#05DED5]/10 px-2.5 py-0.5 rounded-full">
          Featured
        </span>
      </div>
    </div>
  </article>

  <!-- VARIANT B — "below": cover image top, copy & tags below -->
  <article
    v-else
    class="group flex flex-col gap-5 cursor-pointer h-full"
    @click="emit('select', project)"
  >
    <!-- Cover -->
    <div class="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-100 shadow-sm transition-all duration-400 group-hover:shadow-2xl group-hover:border-[#04308F]/20">
      <div class="relative aspect-video overflow-hidden w-full">
        <NuxtImg
          v-if="project.cover"
          :src="project.cover"
          :alt="project.title"
          class="size-full object-cover transition-transform duration-600 group-hover:scale-105"
          loading="lazy"
        />
        <div v-else class="size-full bg-linear-to-br from-[#04308F]/10 to-[#05DED5]/10" />
        <div class="absolute inset-0 bg-linear-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <!-- Tag chips bottom left -->
        <div class="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
          <span
            v-for="tag in project.tags.slice(0, 3)"
            :key="tag"
            class="rounded-full bg-white/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-800 shadow-xs"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Hover Overlay Badge -->
        <div class="absolute top-4 right-4 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-bold text-[#04308F] shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          Preview Project
        </div>
      </div>
    </div>

    <!-- Copy below -->
    <div class="flex flex-1 flex-col space-y-3 px-1">
      <div class="flex items-center justify-between text-xs">
        <span class="font-semibold text-[#04308F] uppercase tracking-wider">
          {{ project.tags.join(' · ') }}
        </span>
        <span v-if="project.client" class="text-gray-400 font-medium truncate max-w-[150px]">
          {{ project.client }}
        </span>
      </div>

      <h3 class="text-xl font-serif font-normal leading-snug text-gray-900 group-hover:text-[#04308F] transition-colors sm:text-2xl">
        {{ project.title }}
      </h3>
      <p class="text-sm leading-relaxed text-gray-500 font-normal flex-1 line-clamp-3">
        {{ project.description }}
      </p>

      <div class="pt-2 flex items-center justify-between">
        <span class="inline-flex items-center gap-1.5 text-sm font-semibold text-[#04308F] group-hover:text-[#05DED5] transition-colors">
          View Case Details
          <Icon icon="lucide:arrow-right" class="text-base transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
</style>
