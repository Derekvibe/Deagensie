<script setup lang="ts">
import type { BlogPost } from '~/types/api';

defineProps<{
  post: BlogPost;
}>();
</script>

<template>
  <NuxtLink
    :to="`/blog/${post.slug}`"
    class="group grid grid-cols-1 gap-6 rounded-2xl bg-[#F6F6F6] p-4 transition hover:bg-neutral-200/70 md:grid-cols-2 md:gap-8 md:p-6"
  >
    <!-- Cover image -->
    <div class="relative overflow-hidden rounded-xl">
      <img
        :src="post.cover"
        :alt="post.title"
        class="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
        loading="lazy"
      />
      <span
        v-if="post.featured"
        class="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-neutral-800 backdrop-blur"
      >
        Featured
      </span>
    </div>

    <!-- Meta + text -->
    <div class="flex flex-col justify-center gap-4">
      <div class="flex items-center gap-4 text-xs text-neutral-500">
        <span class="inline-flex items-center gap-1.5">
          <Icon name="hugeicons:calendar-03" class="size-4" />
          {{
            new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          }}
        </span>
        <span class="inline-flex items-center gap-1.5">
          <Icon name="hugeicons:clock-01" class="size-4" />
          {{ post.readMinutes }} min read
        </span>
      </div>

      <h2 class="text-2xl leading-snug font-semibold tracking-tight text-neutral-900 md:text-3xl">
        {{ post.title }}
      </h2>

      <p class="text-sm leading-relaxed text-neutral-600">
        {{ post.excerpt }}
      </p>

      <span
        class="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-200 px-4 py-2 text-sm font-medium text-neutral-900 transition group-hover:bg-emerald-300"
      >
        Read full article
        <Icon name="hugeicons:arrow-right-01" class="size-4" />
      </span>
    </div>
  </NuxtLink>
</template>
