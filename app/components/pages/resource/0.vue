<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { push } from 'notivue';

const newsletterEmail = ref('');
const isSubscribing = ref(false);

const handleNewsletterSubmit = () => {
  if (!newsletterEmail.value) return;
  isSubscribing.value = true;
  setTimeout(() => {
    push.success({
      title: 'Subscribed to Deagensie Insights!',
      message: `Thank you for subscribing with ${newsletterEmail.value}. You will receive our bi-weekly edition.`,
    });
    newsletterEmail.value = '';
    isSubscribing.value = false;
  }, 600);
};

interface ResourceItem {
  category: string;
  title: string;
  description: string;
  image: string;
  readTime: string;
  type: string;
  date: string;
  fullContent?: string;
}

const activeCategory = ref('All');
const searchQuery = ref('');
const selectedResource = ref<ResourceItem | null>(null);

const categories = ['All', 'AI Playbooks', 'Ebooks & Guides', 'White Papers', 'Research', 'Blog Articles'];

const featuredResource = {
  category: 'AI Playbooks',
  title: 'The 2026 AI-Led Creative Agency Playbook: Scaling Brands with Predictive Intelligence',
  description: 'A comprehensive, 45-page strategic framework for modern founders and creative leaders looking to combine artificial intelligence with African creative excellence.',
  image: '/images/pages/about/hero-2.png',
  readTime: '12 min read',
  type: 'PDF Guide',
  date: 'September 2026',
  fullContent: 'This playbook breaks down predictive audience signaling, automated brand positioning, and hybrid creative squad structures. Discover how top global teams accelerate execution by 4x while maintaining high editorial standards.',
};

const allResources = [
  {
    category: 'Ebooks & Guides',
    title: 'Talent-as-a-Service (TaaS): Unlocking Global Creative Pipelines',
    description: 'How forward-thinking companies are replacing traditional hiring models with elastic talent squads.',
    image: '/images/pages/about/who-we-are.webp',
    readTime: '8 min read',
    type: 'Ebook',
    date: 'August 2026',
    fullContent: 'Elastic staffing is replacing rigid 12-month agency retainers. Learn how TaaS allows companies to access on-demand senior design, engineering, and storytelling talent effortlessly.',
  },
  {
    category: 'White Papers',
    title: 'Predictive Marketing Signals: Outperforming Traditional Ad Campaigns',
    description: 'Data insights on how real-time consumer signal analysis outperforms static social media ads by 340%.',
    image: '/images/pages/(home)/hero.webp',
    readTime: '15 min read',
    type: 'White Paper',
    date: 'July 2026',
    fullContent: 'Static ad campaigns decay within 72 hours. This white paper analyzes 1.2 million consumer interactions to outline data-driven adaptive ad creative models.',
  },
  {
    category: 'AI Playbooks',
    title: 'Founder’s Growth OS: The 0-to-1 Brand Scaling Roadmap',
    description: 'Step-by-step blueprint for early-stage founders to position, launch, and automate business growth.',
    image: '/images/pages/why/hero.webp',
    readTime: '10 min read',
    type: 'Playbook',
    date: 'June 2026',
    fullContent: 'From positioning statements to automated email funnels, Growth OS serves as your operational blueprint for 10x market entry.',
  },
  {
    category: 'Research',
    title: 'The Rise of the African Creative Economy',
    description: 'Macroeconomic analysis of borderless creative work and tech-driven talent hubs across the continent.',
    image: '/images/pages/about/who-we-are.webp',
    readTime: '18 min read',
    type: 'Research Report',
    date: 'May 2026',
    fullContent: 'Africa holds the youngest population globally. Explore how African digital creatives are leading international product design and motion graphics.',
  },
  {
    category: 'Blog Articles',
    title: 'Why Creative Strategy in 2026 Demands Human & Machine Synergy',
    description: 'Exploring how top agencies use generative AI as an ideation co-pilot without losing human nuance.',
    image: '/images/pages/about/hero-2.png',
    readTime: '5 min read',
    type: 'Editorial Blog',
    date: 'September 2026',
    fullContent: 'AI generates thousands of variations in seconds, but human empathy determines what resonates. Discover the 80/20 rule of modern brand storytelling.',
  },
  {
    category: 'Blog Articles',
    title: 'Building Borderless Design Teams: Lessons from 100+ Distributed Projects',
    description: 'Best practices for async communication, cultural synergy, and continuous handoffs across time zones.',
    image: '/images/pages/(home)/hero.webp',
    readTime: '6 min read',
    type: 'Editorial Blog',
    date: 'August 2026',
    fullContent: 'Distributed squads work when clear documentation replaces endless video calls. Read our playbook on seamless cross-border design operations.',
  },
  {
    category: 'Ebooks & Guides',
    title: 'Design Systems for Scale: Maintaining Brand Consistency',
    description: 'Architecting scalable UI design systems for modern digital platforms and mobile apps.',
    image: '/images/pages/why/hero.webp',
    readTime: '7 min read',
    type: 'Guide',
    date: 'April 2026',
    fullContent: 'Tokenized CSS, reusable Vue components, and accessibility standards: how to build enterprise design systems that scale effortlessly.',
  },
  {
    category: 'AI Playbooks',
    title: 'Generative AI Workflows for Creative Studios',
    description: 'Practical workflows integrating generative tools to speed up asset creation by 4x without sacrificing quality.',
    image: '/images/pages/(home)/hero.webp',
    readTime: '9 min read',
    type: 'Playbook',
    date: 'March 2026',
    fullContent: 'Detailed prompt engineering guides, asset synthesis pipelines, and copyright considerations for modern commercial studios.',
  },
];

const filteredResources = computed(() => {
  return allResources.filter((item) => {
    const matchesCategory = activeCategory.value === 'All' || item.category === activeCategory.value;
    const matchesSearch = searchQuery.value.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});

const openModal = (item: ResourceItem) => {
  selectedResource.value = item;
};

const closeModal = () => {
  selectedResource.value = null;
};
</script>

<template>
  <div class="bg-white text-gray-900 pt-28 pb-24 lg:pt-36">
    <!-- Header Section -->
    <section class="mx-auto w-5/6 max-w-7xl space-y-12">
      <div v-reveal="'fade-up'" class="max-w-3xl space-y-6">
        <span class="text-xs uppercase tracking-widest text-[#04308F] font-semibold bg-[#04308F]/10 px-4 py-1.5 rounded-full inline-block">
          Deagensie Knowledge Hub &amp; Blog
        </span>
        <h1 class="text-3xl font-serif font-normal tracking-tight sm:text-4xl lg:text-6xl text-gray-900 leading-tight">
          Where businesses grow &amp; creatives thrive
        </h1>
        <p class="text-base text-gray-500 sm:text-lg lg:text-xl leading-relaxed font-normal">
          Explore our interactive collection of AI growth playbooks, white papers, strategy guides, research reports, and editorial blog articles.
        </p>
      </div>

      <!-- Search & Category Filters -->
      <div v-reveal="'fade-up'" class="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-b border-gray-100 pb-8">
        <!-- Category Filter Pills -->
        <div class="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            class="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300"
            :class="activeCategory === cat ? 'bg-[#04308F] text-white shadow-md shadow-[#04308F]/20 scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            @click="activeCategory = cat"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Search Bar -->
        <div class="relative w-full md:w-80">
          <Icon icon="lucide:search" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search resources & blogs..."
            class="w-full rounded-full border border-gray-200 bg-gray-50 pl-11 pr-4 py-2.5 text-sm font-normal text-gray-900 placeholder:text-gray-400 focus:border-[#04308F] focus:bg-white focus:outline-none transition-colors"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
            @click="searchQuery = ''"
          >
            <Icon icon="lucide:x" />
          </button>
        </div>
      </div>

      <!-- Featured Resource Banner Card -->
      <div v-reveal="'scale-in'" class="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 p-8 lg:p-12 shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div class="space-y-6">
          <div class="flex items-center gap-3">
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-[#05DED5] text-gray-900">Featured</span>
            <span class="text-xs font-semibold text-[#04308F] uppercase tracking-wider">{{ featuredResource.category }}</span>
            <span class="text-xs text-gray-400">• {{ featuredResource.readTime }}</span>
          </div>
          <h2 class="text-2xl font-serif font-normal sm:text-3xl text-gray-900 leading-tight">
            {{ featuredResource.title }}
          </h2>
          <p class="text-sm sm:text-base text-gray-500 leading-relaxed font-normal">
            {{ featuredResource.description }}
          </p>
          <div class="pt-2">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-full bg-[#04308F] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#05DED5] hover:text-gray-900 hover:scale-105 shadow-md shadow-[#04308F]/20"
              @click="openModal(featuredResource)"
            >
              Read Playbook <Icon icon="lucide:arrow-right" class="text-base" />
            </button>
          </div>
        </div>

        <div class="relative overflow-hidden rounded-2xl border border-gray-200 shadow-md aspect-16/10 cursor-pointer group" @click="openModal(featuredResource)">
          <NuxtImg
            :src="featuredResource.image"
            alt="Featured Playbook"
            class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      <!-- Resource Grid -->
      <div class="pt-12 space-y-8">
        <div class="flex items-center justify-between">
          <h3 v-reveal="'fade-up'" class="text-2xl font-serif font-normal text-gray-900">
            {{ activeCategory === 'All' ? 'Latest Resources & Blog Articles' : activeCategory }}
          </h3>
          <span class="text-xs font-semibold text-gray-400">
            Showing {{ filteredResources.length }} {{ filteredResources.length === 1 ? 'item' : 'items' }}
          </span>
        </div>

        <div v-if="filteredResources.length === 0" class="py-16 text-center space-y-4 rounded-3xl bg-gray-50 border border-gray-100">
          <Icon icon="lucide:search-x" class="text-4xl text-gray-400 mx-auto" />
          <p class="text-base text-gray-600 font-serif">No resources match your search or category filter.</p>
          <button
            type="button"
            class="px-5 py-2 rounded-full bg-[#04308F] text-white text-xs font-semibold hover:bg-[#05DED5] hover:text-gray-900 transition-colors"
            @click="activeCategory = 'All'; searchQuery = ''"
          >
            Reset Filters
          </button>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(res, rIndex) in filteredResources"
            :key="res.title"
            v-reveal="{ animation: 'fade-up', delay: (rIndex % 3) * 100 }"
            class="rounded-3xl border border-gray-100 bg-white overflow-hidden shadow-xs transition-all duration-300 hover:shadow-xl hover:border-[#04308F]/20 hover:-translate-y-1 flex flex-col justify-between group cursor-pointer"
            @click="openModal(res)"
          >
            <div>
              <div class="relative aspect-16/10 overflow-hidden bg-gray-100">
                <NuxtImg
                  :src="res.image"
                  :alt="res.title"
                  class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  class="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-xs"
                  :class="res.category === 'Blog Articles' ? 'bg-[#05DED5] text-gray-900' : 'bg-white/90 text-[#04308F]'"
                >
                  {{ res.type }}
                </span>
              </div>

              <div class="p-6 space-y-3">
                <div class="flex items-center justify-between text-xs text-gray-400 font-medium">
                  <span>{{ res.category }}</span>
                  <span>{{ res.readTime }}</span>
                </div>
                <h4 class="text-lg font-serif font-normal text-gray-900 group-hover:text-[#04308F] transition-colors leading-snug">
                  {{ res.title }}
                </h4>
                <p class="text-xs text-gray-500 leading-relaxed font-normal">
                  {{ res.description }}
                </p>
              </div>
            </div>

            <div class="px-6 pb-6 pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
              <span class="text-xs text-gray-400 font-medium">{{ res.date }}</span>
              <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#04308F] group-hover:text-[#05DED5] transition-colors">
                View Details <Icon icon="lucide:arrow-right" class="text-sm" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Newsletter Subscription Block -->
      <div v-reveal="'fade-up'" class="mt-20 rounded-3xl bg-[#04308F] text-white p-8 sm:p-12 text-center space-y-6">
        <h3 class="text-2xl sm:text-3xl font-serif font-normal text-white">
          Stay Ahead of the AI Creative Curve
        </h3>
        <p class="max-w-xl mx-auto text-sm sm:text-base text-gray-200 font-normal leading-relaxed">
          Subscribe to our bi-weekly newsletter to receive exclusive growth insights, AI workflows, and strategic playbooks directly in your inbox.
        </p>
        <form @submit.prevent="handleNewsletterSubmit" class="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input
            v-model="newsletterEmail"
            type="email"
            placeholder="Enter your email address"
            required
            class="flex-1 rounded-full bg-white/10 px-5 py-3 text-sm text-white placeholder:text-gray-300 border border-white/20 focus:outline-none focus:border-[#05DED5]"
          />
          <button
            type="submit"
            :disabled="isSubscribing"
            class="rounded-full bg-[#05DED5] px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <template v-if="isSubscribing">
              Subscribing <Icon icon="svg-spinners:3-dots-fade" />
            </template>
            <template v-else>
              Subscribe
            </template>
          </button>
        </form>
      </div>
    </section>

    <!-- Interactive Resource Detail Modal -->
    <Transition name="fade-scale">
      <div v-if="selectedResource" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4" @click.self="closeModal">
        <div class="relative w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
          <button
            type="button"
            class="absolute top-6 right-6 size-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center transition-colors"
            @click="closeModal"
          >
            <Icon icon="lucide:x" class="text-xl" />
          </button>

          <div class="flex items-center gap-3">
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-[#04308F] text-white">
              {{ selectedResource.category }}
            </span>
            <span class="text-xs text-gray-400">• {{ selectedResource.readTime }}</span>
          </div>

          <h3 class="text-2xl font-serif font-normal text-gray-900 leading-tight">
            {{ selectedResource.title }}
          </h3>

          <div class="aspect-16/9 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
            <NuxtImg :src="selectedResource.image" :alt="selectedResource.title" class="size-full object-cover" />
          </div>

          <p class="text-sm text-gray-600 leading-relaxed font-normal">
            {{ selectedResource.fullContent }}
          </p>

          <div class="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <span class="text-xs text-gray-400">Published: {{ selectedResource.date }}</span>
            <div class="flex gap-3">
              <button
                type="button"
                class="px-5 py-2.5 rounded-full border border-gray-300 text-xs font-semibold text-gray-700 hover:border-[#04308F] hover:text-[#04308F]"
                @click="closeModal"
              >
                Close Preview
              </button>
              <NuxtLink
                to="/contact"
                class="px-6 py-2.5 rounded-full bg-[#04308F] text-white text-xs font-semibold hover:bg-[#05DED5] hover:text-gray-900 transition-colors shadow-sm"
              >
                Download Full Resource
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
