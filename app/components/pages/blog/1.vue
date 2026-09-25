<script setup lang="ts">
import { useIntersectionObserver, useMediaQuery } from '@vueuse/core';
import type { BlogCategory, BlogCategoriesResponse, PaginationMeta, BlogPost } from '~/types/api';
import { Icon } from '@iconify/vue';

console.log('[blog-categories] 🚀 setup start'); // 👈 LOG

const loadMoreTrigger = useTemplateRef<HTMLElement>('loadMoreTrigger');

const {
  data: blogCategoriesPage,
  pending,
  error,
  refresh,
} = await useApiData<BlogCategoriesResponse>('/blog-categories', {
  key: 'blog-category-page-1',
  baseURL: '/api',
  query: {
    page: 1,
  },
});

console.log('[blog-categories] 📦 fetched page 1', {
  // 👈 LOG
  data: blogCategoriesPage.value,
  pending: pending.value,
  error: error.value,
}); // 👈 LOG

const blogCategories = ref<BlogCategory[]>(blogCategoriesPage.value?.data || []);
const pagination = ref<PaginationMeta | null>(blogCategoriesPage.value?.pagination || null);
const isFetchingNextPage = ref(false);

watch(
  blogCategoriesPage,
  (page) => {
    console.log('[blog-categories] 👀 blogCategoriesPage changed', page); // 👈 LOG
    blogCategories.value = page?.data || [];
    pagination.value = page?.pagination || null;
  },
  { immediate: true }
);

const hasNextPage = computed(() => {
  const meta = pagination.value;

  if (!meta) {
    return false;
  }

  return meta.page < meta.totalPages;
});

watch(hasNextPage, (v) => console.log('[blog-categories] 🔗 hasNextPage:', v)); // 👈 LOG

const fetchNextPage = async () => {
  console.log('[blog-categories] ➡️ fetchNextPage called', {
    // 👈 LOG
    hasNextPage: hasNextPage.value,
    isFetchingNextPage: isFetchingNextPage.value,
    currentPage: pagination.value?.page,
    totalPages: pagination.value?.totalPages,
  }); // 👈 LOG

  if (!hasNextPage.value || isFetchingNextPage.value) {
    console.log('[blog-categories] ⛔ fetchNextPage early-return'); // 👈 LOG
    return;
  }

  const nextPage = (pagination.value?.page || 1) + 1;
  isFetchingNextPage.value = true;

  try {
    const page = await $fetch<BlogCategoriesResponse>('/api/blog-categories', {
      query: {
        page: nextPage,
      },
    });

    console.log(`[blog-categories] ✅ fetched page ${nextPage}`, page); // 👈 LOG

    blogCategories.value = [...blogCategories.value, ...page.data];
    pagination.value = page.pagination;

    console.log('[blog-categories] 🧮 after append', {
      // 👈 LOG
      totalCategories: blogCategories.value.length,
      pagination: pagination.value,
    }); // 👈 LOG
  } catch (err) {
    console.error('[blog-categories] ❌ fetchNextPage failed', err); // 👈 LOG
    throw err;
  } finally {
    isFetchingNextPage.value = false;
  }
};

useIntersectionObserver(loadMoreTrigger, ([entry]) => {
  console.log('[blog-categories] 👁️ intersection', entry?.isIntersecting); // 👈 LOG
  if (entry?.isIntersecting) {
    void fetchNextPage();
  }
});

const spacingStyles = ref<Partial<{ left: string; right: string }>>({
  left: 'calc((100% - ((11 / 12) * 100%)) / 4)',
  right: 'calc((100% - ((11 / 12) * 100%)) / 4)',
});

onMounted(() => {
  console.log('[blog-categories] 🧩 mounted'); // 👈 LOG
  // --- existing spacingStyles logic ---
  const headerDiv = document.querySelector('#__nuxt > header > div');
  console.log('[blog-categories] 🎯 headerDiv found?', !!headerDiv); // 👈 LOG
  if (headerDiv) {
    const updateMargins = () => {
      spacingStyles.value = {
        left: `${parseFloat(getComputedStyle(headerDiv).marginLeft)}px`,
        right: `${parseFloat(getComputedStyle(headerDiv).marginRight)}px`,
      };
      console.log('[blog-categories] 📐 spacingStyles updated', spacingStyles.value); // 👈 LOG
    };
    const resizeObserver = new ResizeObserver(updateMargins);
    resizeObserver.observe(headerDiv);
    updateMargins();
    onUnmounted(() => {
      console.log('[blog-categories] 💀 unmounted, disconnecting observer'); // 👈 LOG
      resizeObserver.disconnect();
    });
  }
});

const isMobile = useMediaQuery('(max-width: 1023px)');
watch(isMobile, (v) => console.log('[blog-categories] 📱 isMobile:', v)); // 👈 LOG

// ─────────────────────────────────────────────────────────────
// DEMO DATA — remove once the real API is wired up
// ─────────────────────────────────────────────────────────────

const featuredPost: BlogPost = {
  id: '1',
  slug: 'future-of-ai-driven-branding',
  title: 'The Future of AI-Driven Branding: How Intelligence Transforms Creative Strategy',
  excerpt:
    'Discover how artificial intelligence is revolutionizing brand development, from predictive consumer behavior analysis to real-time marketing optimization. Learn why the most successful brands are integrating AI into their creative workflows.',
  cover: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80',
  category: 'Featured',
  categoryKey: 'featured',
  publishedAt: '2026-03-15',
  readMinutes: 8,
  featured: true,
};

const posts: BlogPost[] = [
  {
    id: '2',
    slug: 'global-career-rooted-in-africa',
    title: 'Building a Global Career While Staying Rooted in Africa',
    excerpt:
      'How African creatives are breaking geographical barriers and accessing international opportunities without leaving home.',
    cover: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    category: 'Creative Economy',
    categoryKey: 'creative-economy',
    publishedAt: '2026-03-12',
    readMinutes: 1,
  },
  {
    id: '3',
    slug: 'startup-to-scale-up',
    title: 'From Startup to Scale-up: Engineering Growth That Lasts',
    excerpt:
      'The strategic frameworks that transform ambitious startups into sustainable, scalable businesses.',
    cover: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    category: 'Strategy',
    categoryKey: 'strategy',
    publishedAt: '2026-03-10',
    readMinutes: 7,
  },
  {
    id: '4',
    slug: 'brands-need-to-evolve',
    title: 'Why Your Brand Needs to Evolve, Not Just Exist',
    excerpt:
      'Exploring the difference between static brand identities and intelligent, adaptive brand systems.',
    cover: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    category: 'Branding',
    categoryKey: 'branding',
    publishedAt: '2026-03-08',
    readMinutes: 6,
  },
  {
    id: '5',
    slug: 'data-driven-marketing',
    title: 'Data-Driven Marketing: Beyond Vanity Metrics',
    excerpt:
      'How to move from impressions and likes to meaningful business outcomes and revenue growth.',
    cover: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    category: 'Marketing',
    categoryKey: 'marketing',
    publishedAt: '2026-03-12',
    readMinutes: 5,
  },
  {
    id: '6',
    slug: 'psychology-of-visual-identity',
    title: 'The Psychology of Visual Identity: What Makes Brands Memorable',
    excerpt:
      'Understanding the cognitive science behind effective brand design and visual communication.',
    cover: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    category: 'Design',
    categoryKey: 'design',
    publishedAt: '2026-03-10',
    readMinutes: 7,
  },
  {
    id: '7',
    slug: 'digital-products-users-want',
    title: 'Building Digital Products That Users Actually Want',
    excerpt:
      'A practical guide to user-centered design and product development in the African market.',
    cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    category: 'Technology',
    categoryKey: 'technology',
    publishedAt: '2026-03-08',
    readMinutes: 6,
  },
  {
    id: '8',
    slug: 'data-driven-marketing-2',
    title: 'Data-Driven Marketing: Beyond Vanity Metrics',
    excerpt:
      'How to move from impressions and likes to meaningful business outcomes and revenue growth.',
    cover: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    category: 'Marketing',
    categoryKey: 'marketing',
    publishedAt: '2026-03-12',
    readMinutes: 5,
  },
  {
    id: '9',
    slug: 'psychology-of-visual-identity-2',
    title: 'The Psychology of Visual Identity: What Makes Brands Memorable',
    excerpt:
      'Understanding the cognitive science behind effective brand design and visual communication.',
    cover: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    category: 'Design',
    categoryKey: 'design',
    publishedAt: '2026-03-10',
    readMinutes: 7,
  },
  {
    id: '10',
    slug: 'digital-products-users-want-2',
    title: 'Building Digital Products That Users Actually Want',
    excerpt:
      'A practical guide to user-centered design and product development in the African market.',
    cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    category: 'Technology',
    categoryKey: 'technology',
    publishedAt: '2026-03-08',
    readMinutes: 6,
  },
];
</script>

<template>
  <div>
    <!-- ═══════════════════════════════════════════════════════
         SHARED CONTAINER — all three sections live inside this
         ═══════════════════════════════════════════════════════ -->
    <div class=" ">
      <!-- ═══════════════════════════════════════════════════════
           CATEGORY FILTER BAR
           ═══════════════════════════════════════════════════════ -->
      <section class="flex w-full flex-col gap-6 py-6 lg:flex-row lg:py-14">
        <div
          :class="[
            'lg:flex-1 lg:overflow-hidden',
            { 'grid grid-cols-1 grid-rows-1 *:[grid-area:1/1]': error || !blogCategories.length },
          ]"
        >
          <div
            v-if="error"
            class="mx-auto w-5/6 max-w-7xl content-center text-center text-sm leading-relaxed"
          >
            <p>Failed to load blogCategories. Please try again.</p>
            <button type="button" @click="refresh()">Retry</button>
          </div>
          <div
            v-if="!blogCategories.length"
            class="mx-auto w-5/6 max-w-7xl content-center text-center text-sm leading-relaxed"
          >
            <p>
              No blog categories available. Please check back later or contact support for
              assistance.
            </p>
          </div>
          <Carousel>
            <CarouselPrevious class="z-1 disabled:hidden" :style="{ left: spacingStyles.left }" />
            <CarouselNext
              class="z-1 disabled:hidden"
              :style="{
                right: isMobile ? spacingStyles.right : `calc(${spacingStyles.right} / 2)`,
              }"
            />
            <CarouselContent
              class="ml-0 gap-3 py-px lg:gap-4"
              :style="{
                marginLeft: spacingStyles.left,
                ...(isMobile && { marginRight: spacingStyles.right }),
              }"
            >
              <template v-if="blogCategories.length">
                <CarouselItem class="basis-auto pl-0">
                  <NuxtLink
                    to="/blog"
                    class="inline-block rounded-full px-3 py-1.5 text-xs leading-normal ring-1 ring-current lg:px-6 lg:py-3 lg:text-base [&.router-link-exact-active]:bg-[#05F4EA] [&.router-link-exact-active]:ring-0"
                    >All Posts</NuxtLink
                  >
                </CarouselItem>
                <CarouselItem
                  v-for="{ id, key, label } in blogCategories"
                  :key="id"
                  class="basis-auto pl-0"
                >
                  <NuxtLink
                    :to="`/blog/category/${key}`"
                    class="inline-block rounded-full px-3 py-1.5 text-xs leading-normal ring-1 ring-current lg:px-6 lg:py-3 lg:text-base [&.router-link-exact-active]:bg-[#05F4EA] [&.router-link-exact-active]:ring-0"
                    >{{ label }}</NuxtLink
                  >
                </CarouselItem>
                <CarouselItem
                  v-if="hasNextPage"
                  ref="loadMoreTrigger"
                  aria-hidden
                  class="basis-auto pl-0"
                >
                  <Skeleton
                    class="box-content h-lh w-[75px] rounded-full px-3 py-1.5 text-xs leading-normal lg:px-6 lg:py-3 lg:text-base"
                    :class="{ 'animate-none': !isFetchingNextPage }"
                  />
                </CarouselItem>
              </template>
              <template v-else>
                <CarouselItem v-for="n in 7" :key="n" class="basis-auto pl-0">
                  <Skeleton
                    class="box-content h-lh w-[75px] rounded-full px-3 py-1.5 text-xs leading-normal lg:w-[116px] lg:px-6 lg:py-3 lg:text-base"
                    :class="{
                      'animate-none opacity-25': !pending,
                      'w-[74px] lg:w-[114px]': n === 2,
                      'w-[76px] lg:w-[117px]': n === 3,
                      'w-[82px] lg:w-[125px]': n === 4,
                      'w-[65px] lg:w-[102px]': n === 5,
                      'w-[91px] lg:w-[138px]': n === 6,
                      'w-[130px] lg:w-[189px]': n === 7,
                    }"
                  />
                </CarouselItem>
              </template>
              <CarouselItem
                v-if="!isMobile"
                class="basis-auto pl-0"
                :style="{ width: `calc(${spacingStyles.right} / 6)` }"
              />
            </CarouselContent>
          </Carousel>
        </div>
        <InputGroup
          :style="{ ...(!isMobile && { marginRight: spacingStyles.right }) }"
          class="mx-auto w-5/6 max-w-7xl shrink-0 rounded-full lg:mx-0 lg:h-auto lg:w-auto lg:max-w-none lg:min-w-72"
        >
          <InputGroupAddon align="inline-start">
            <Icon icon="hugeicons:search-01" />
          </InputGroupAddon>
          <InputGroupInput type="search" placeholder="Search articles" class="shadow-none" />
        </InputGroup>
      </section>

      <!-- ═══════════════════════════════════════════════════════
           FEATURED ARTICLE
           ═══════════════════════════════════════════════════════ -->
      <section class="mb-14 bg-[#F6F6F6] py-16">
        <div class="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
          <h1 class="mb-6 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            Featured Article
          </h1>

          <NuxtLink
            :to="`/blog/${featuredPost.slug}`"
            class="group grid grid-cols-1 gap-6 rounded-2xl p-4 transition md:grid-cols-2 md:gap-8 md:p-6"
          >
            <!-- Cover image -->
            <div class="relative overflow-hidden rounded-xl">
              <img
                :src="featuredPost.cover"
                :alt="featuredPost.title"
                class="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <span
                v-if="featuredPost.featured"
                class="absolute top-3 left-3 rounded-full bg-[#B1BFDC] px-5 py-2 text-xs font-medium text-neutral-800 backdrop-blur"
              >
                Featured
              </span>
            </div>

            <!-- Meta + text -->
            <div class="flex flex-col justify-center gap-4">
              <div class="flex items-center gap-4 text-xs text-neutral-500">
                <span class="inline-flex items-center gap-1.5">
                  <Icon icon="hugeicons:calendar-03" class="size-4" />
                  {{
                    new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  }}
                </span>
                <span class="inline-flex items-center gap-1.5">
                  <Icon icon="akar-icons:eye-open" class="size-4" />
                  {{ featuredPost.readMinutes }} min read
                </span>
              </div>

              <h2
                class="text-2xl leading-snug font-semibold tracking-tight text-neutral-900 md:text-3xl"
              >
                {{ featuredPost.title }}
              </h2>

              <p class="text-sm leading-relaxed text-neutral-600">
                {{ featuredPost.excerpt }}
              </p>

              <span
                class="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[#05DED5] px-4 py-2 text-sm font-medium text-neutral-900 transition group-hover:bg-[#96e8e6]"
              >
                Read full article
                <Icon icon="hugeicons:arrow-right-01" class="size-4" />
              </span>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════
           LATEST ARTICLES
           ═══════════════════════════════════════════════════════ -->
      <section class="mx-auto w-full max-w-7xl px-4 pb-16 md:px-6 lg:px-8">
        <h2 class="mb-6 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          Latest Article
        </h2>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="post in posts"
            :key="post.id"
            :to="`/blog/${post.slug}`"
            class="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-neutral-200 transition hover:ring-neutral-300"
          >
            <div class="overflow-hidden">
              <img
                :src="post.cover"
                :alt="post.title"
                class="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>

            <div class="flex flex-1 flex-col gap-3 p-4">
              <span class="text-xs font-medium text-blue-600">
                {{ post.category }}
              </span>

              <h3
                class="text-base leading-snug font-semibold text-neutral-900 group-hover:underline"
              >
                {{ post.title }}
              </h3>

              <p class="line-clamp-3 text-sm leading-relaxed text-neutral-600">
                {{ post.excerpt }}
              </p>

              <div class="mt-auto flex items-center justify-between pt-3 text-xs text-neutral-500">
                <span>
                  {{
                    new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  }}
                </span>
                <span>{{ post.readMinutes }} min read</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>
