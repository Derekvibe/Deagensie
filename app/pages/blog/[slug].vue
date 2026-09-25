<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { BlogPost } from '~/types/api';
import { demoFullPost, demoBlogPosts } from '~/data/blog';

// ─────────────────────────────────────────────────────────────
// DEMO lookup — replace with a real API call later
// ─────────────────────────────────────────────────────────────
const route = useRoute();
const slug = route.params.slug as string;

const allDemoPosts: BlogPost[] = [demoFullPost, ...demoBlogPosts];

const post = computed<BlogPost | null>(() => allDemoPosts.find((p) => p.slug === slug) ?? null);

// Related: filter out the current post, take 6
const relatedPosts = computed<BlogPost[]>(() =>
  allDemoPosts.filter((p) => p.slug !== slug).slice(0, 6)
);

// 404 if the slug doesn't match anything
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' });
}

// SEO
useSeoMeta({
  title: () => post.value?.title ?? 'Blog',
  description: () => post.value?.excerpt ?? '',
  ogImage: () => post.value?.cover,
});
</script>

<template>
  <article v-if="post" class="w-full pt-10 pb-20">
    <!-- ═══════════════════════════════════════════════════════
         HEADER — contained width, generous top padding
         ═══════════════════════════════════════════════════════ -->
    <header class="mx-auto w-full max-w-7xl px-4 pt-10 md:px-6 lg:px-8">
      <!-- Back link -->
      <NuxtLink
        to="/blog"
        class="inline-flex items-center gap-2 text-sm font-medium text-[#04308F] hover:underline"
      >
        <Icon icon="hugeicons:arrow-left-01" class="size-4" />
        Back to Blogg
      </NuxtLink>

      <!-- Category · date · read time -->
      <div class="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#949494]">
        <span class="font-medium text-[#04308F]">{{ post.category }}</span>
        <span class="text[#949494]">·</span>
        <span>
          {{
            new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          }}
        </span>
        <span class="text-neutral-300">·</span>
        <span>{{ post.readMinutes }} min read</span>
      </div>

      <!-- Title -->
      <h1
        class="mt-4 text-3xl leading-tight font-semibold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl"
      >
        {{ post.title }}
      </h1>

      <!-- Excerpt -->
      <p class="mt-5 text-base leading-relaxed text-neutral-600">
        {{ post.excerpt }}
      </p>
    </header>

    <!-- ═══════════════════════════════════════════════════════
         HERO IMAGE — slightly wider than the text column
         ═══════════════════════════════════════════════════════ -->
    <figure class="mx-auto mt-10 w-full max-w-7xl px-4 md:px-6 lg:px-8">
      <div class="overflow-hidden rounded-[47px]">
        <img
          :src="post.cover"
          :alt="post.coverAlt || post.title"
          class="aspect-[16/10] w-full object-cover"
          loading="eager"
        />
      </div>
    </figure>

    <!-- ═══════════════════════════════════════════════════════
         BODY — block-based rendering
         ═══════════════════════════════════════════════════════ -->
    <div class="mx-auto mt-12 w-full max-w-7xl px-4 md:px-6 lg:px-8">
      <div class="flex flex-col gap-6">
        <template v-for="(block, i) in post.body" :key="i">
          <!-- Paragraph -->
          <p v-if="block.type === 'paragraph'" class="text-base leading-relaxed text-neutral-700">
            {{ block.text }}
          </p>

          <!-- H2 -->
          <h2
            v-else-if="block.type === 'heading'"
            class="mt-4 text-2xl font-semibold tracking-tight text-neutral-900"
          >
            {{ block.text }}
          </h2>

          <!-- Pull quote -->
          <blockquote
            v-else-if="block.type === 'quote'"
            class="my-2 rounded-xl border-l-2 border-l-[#04308F] bg-[#E6FEFD] p-5 text-base leading-relaxed text-[#5A5A5A] ring-1 ring-emerald-100"
          >
            {{ block.text }}
          </blockquote>

          <!-- Bullet list -->
          <ul
            v-else-if="block.type === 'list'"
            class="flex flex-col gap-3 pl-5 text-base leading-relaxed text-neutral-700"
          >
            <li
              v-for="(item, j) in block.items"
              :key="j"
              class="relative list-none before:absolute before:top-2 before:-left-5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-neutral-400"
              v-html="item"
            />
          </ul>

          <!-- Inline image -->
          <figure v-else-if="block.type === 'image'" class="my-4">
            <img
              :src="block.src"
              :alt="block.alt || ''"
              class="w-full rounded-2xl object-cover"
              loading="lazy"
            />
            <figcaption v-if="block.caption" class="mt-2 text-center text-xs text-neutral-500">
              {{ block.caption }}
            </figcaption>
          </figure>
        </template>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════
         EXPLORE OTHER TOPICS — horizontal scroll-snap carousel
         ═══════════════════════════════════════════════════════ -->
    <section class="mx-auto mt-20 w-full max-w-7xl px-4 md:px-6 lg:px-8">
      <div class="">
        <h2 class="mb-6 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
          Explore other topics
        </h2>
      </div>

      <!-- Overflow row with snap + hidden scrollbar -->
      <div
        class="flex snap-x snap-mandatory [scrollbar-width:none] gap-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden"
      >
        <!-- Left spacer so first card aligns with page container -->
        <div class="shrink-0 basis-4 md:basis-6 lg:basis-8" aria-hidden />

        <NuxtLink
          v-for="related in relatedPosts"
          :key="related.id"
          :to="`/blog/${related.slug}`"
          class="group flex w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-neutral-200 transition hover:ring-neutral-300 md:w-[320px]"
        >
          <div class="overflow-hidden">
            <img
              :src="related.cover"
              :alt="related.title"
              class="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>

          <div class="flex flex-1 flex-col gap-3 p-4">
            <span class="text-xs font-medium text-blue-600">
              {{ related.category }}
            </span>

            <h3 class="text-base leading-snug font-semibold text-neutral-900 group-hover:underline">
              {{ related.title }}
            </h3>

            <p class="line-clamp-3 text-sm leading-relaxed text-neutral-600">
              {{ related.excerpt }}
            </p>

            <div class="mt-auto flex items-center justify-between pt-3 text-xs text-neutral-500">
              <span>
                {{
                  new Date(related.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                }}
              </span>
              <span>{{ related.readMinutes }} min read</span>
            </div>
          </div>
        </NuxtLink>

        <!-- Right spacer -->
        <div class="shrink-0 basis-4 md:basis-6 lg:basis-8" aria-hidden />
      </div>
    </section>
  </article>
</template>
