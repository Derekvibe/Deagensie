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
    class="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-400 hover:-translate-y-1.5 hover:border-[#04308F]/30 hover:shadow-2xl"
    @click="emit('select', project)"
  >
    <!-- Cover Image Container -->
    <div class="relative aspect-video w-full overflow-hidden bg-gray-100">
      <NuxtImg
        v-if="project.cover"
        :src="project.cover"
        :alt="project.title"
        class="size-full object-cover transition-transform duration-600 group-hover:scale-105"
        loading="lazy"
      />
      <div v-else class="size-full bg-linear-to-br from-[#04308F]/10 to-[#05DED5]/10" />
      <div
        class="absolute inset-0 bg-linear-to-t from-gray-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <!-- Hover Overlay Badge -->
      <div
        class="absolute top-4 right-4 translate-y-1 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#04308F] opacity-0 shadow-md backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      >
        Preview Project
      </div>

      <!-- Tags overlay on hover -->
      <div
        class="absolute right-4 bottom-4 left-4 flex translate-y-2 flex-wrap gap-1.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      >
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-gray-800 uppercase shadow-xs backdrop-blur-xs"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- Footer Content -->
    <div class="flex flex-1 flex-col space-y-4 p-6 sm:p-8">
      <div class="space-y-2">
        <div
          class="flex items-center justify-between text-xs font-semibold tracking-wider text-[#04308F] uppercase"
        >
          <span>{{ project.tags[0] }}</span>
          <span
            v-if="project.client"
            class="max-w-[140px] truncate text-[11px] font-normal text-gray-400 normal-case"
            >{{ project.client }}</span
          >
        </div>
        <h3
          class="font-serif text-lg leading-snug font-normal text-gray-900 transition-colors group-hover:text-[#04308F] sm:text-xl"
        >
          {{ project.title }}
        </h3>
        <p class="line-clamp-3 text-sm leading-relaxed font-normal text-gray-500">
          {{ project.description }}
        </p>
      </div>

      <div class="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
        <span
          class="inline-flex items-center gap-1.5 text-sm font-semibold text-[#04308F] transition-colors group-hover:text-[#05DED5]"
        >
          View Case Details
          <Icon
            icon="lucide:arrow-right"
            class="text-base transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
        <span
          class="rounded-full bg-[#05DED5]/10 px-2.5 py-0.5 text-xs font-semibold text-[#05DED5]"
        >
          Featured
        </span>
      </div>
    </div>
  </article>

  <!-- VARIANT B — "below": cover image top, copy & tags below -->
  <article
    v-else
    class="group flex h-full cursor-pointer flex-col gap-5"
    @click="emit('select', project)"
  >
    <!-- Cover -->
    <div
      class="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-100 shadow-sm transition-all duration-400 group-hover:border-[#04308F]/20 group-hover:shadow-2xl"
    >
      <div class="relative aspect-video w-full overflow-hidden">
        <NuxtImg
          v-if="project.cover"
          :src="project.cover"
          :alt="project.title"
          class="size-full object-cover transition-transform duration-600 group-hover:scale-105"
          loading="lazy"
        />
        <div v-else class="size-full bg-linear-to-br from-[#04308F]/10 to-[#05DED5]/10" />
        <div
          class="absolute inset-0 bg-linear-to-t from-gray-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <!-- Tag chips bottom left -->
        <div class="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
          <span
            v-for="tag in project.tags.slice(0, 3)"
            :key="tag"
            class="rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-gray-800 uppercase shadow-xs backdrop-blur-xs"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Hover Overlay Badge -->
        <div
          class="absolute top-4 right-4 translate-y-1 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#04308F] opacity-0 shadow-md backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Preview Project
        </div>
      </div>
    </div>

    <!-- Copy below -->
    <div class="flex flex-1 flex-col space-y-3 px-1">
      <div class="flex items-center justify-between text-xs">
        <span class="font-semibold tracking-wider text-[#04308F] uppercase">
          {{ project.tags.join(' · ') }}
        </span>
        <span v-if="project.client" class="max-w-[150px] truncate font-medium text-gray-400">
          {{ project.client }}
        </span>
      </div>

      <h3
        class="font-serif text-xl leading-snug font-normal text-gray-900 transition-colors group-hover:text-[#04308F] sm:text-2xl"
      >
        {{ project.title }}
      </h3>
      <p class="line-clamp-3 flex-1 text-sm leading-relaxed font-normal text-gray-500">
        {{ project.description }}
      </p>

      <div class="flex items-center justify-between pt-2">
        <span
          class="inline-flex items-center gap-1.5 text-sm font-semibold text-[#04308F] transition-colors group-hover:text-[#05DED5]"
        >
          View Case Details
          <Icon
            icon="lucide:arrow-right"
            class="text-base transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped></style>
