<script setup lang="ts">
import { Icon } from '@iconify/vue';

interface Leader {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin: string;
  twitter: string;
}

const leaders: Leader[] = [
  {
    name: 'Bright Okorafor',
    role: 'Founder / CEO',
    image: '/images/pages/about/team/bright-okorafor.png',
    bio: 'Bright is a visionary entrepreneur and growth strategist passionate about bridging African creative talent with international enterprise opportunities. With over a decade of leadership in digital innovation, he steers Deagensie’s strategic direction and global expansion.',
    linkedin: 'https://linkedin.com/in/bright-okorafor',
    twitter: 'https://x.com/brightokorafor',
  },
  {
    name: 'Victor Ephraim',
    role: 'Head of People & Operations',
    image: '/images/pages/about/team/victor-ephraim.png',
    bio: 'Victor oversees talent acquisition, operational efficiency, and community ecosystem culture. He builds scalable operational frameworks that support borderless creative squads while ensuring exceptional quality of service.',
    linkedin: 'https://linkedin.com/in/victor-ephraim',
    twitter: 'https://x.com/victorephraim',
  },
  {
    name: 'Anthony Olori',
    role: 'Head of Technology & Innovation',
    image: '/images/pages/about/team/anthony-olori.png',
    bio: 'Anthony drives Deagensie’s technical architecture, AI workflow integrations, and digital platforms. He specializes in building high-performance web systems, cloud infrastructure, and intelligent automation co-pilots.',
    linkedin: 'https://linkedin.com/in/anthony-olori',
    twitter: 'https://x.com/anthonyolori',
  },
  {
    name: 'Solabomi Jeminusi',
    role: 'Head of Brand Experience',
    image: '/images/pages/about/team/solabomi-jeminusi.png',
    bio: 'Solabomi shapes visual strategy, brand identity, and editorial direction across all client engagements. Her design philosophy centers on clean typography, compelling storytelling, and memorable human experiences.',
    linkedin: 'https://linkedin.com/in/solabomi-jeminusi',
    twitter: 'https://x.com/solabomijeminusi',
  },
];

const selectedLeader = ref<Leader | null>(null);

const openLeaderModal = (leader: Leader) => {
  selectedLeader.value = leader;
};

const closeLeaderModal = () => {
  selectedLeader.value = null;
};
</script>

<template>
  <section id="about_leadership" class="bg-gray-50/70 py-20 lg:py-32 text-gray-900 border-b border-gray-100">
    <div class="mx-auto w-5/6 max-w-7xl space-y-16">
      <div v-reveal="'fade-up'" class="text-center max-w-3xl mx-auto space-y-4">
        <span class="text-xs uppercase tracking-widest text-[#04308F] font-semibold bg-[#04308F]/10 px-4 py-1.5 rounded-full inline-block">
          Leadership Team
        </span>
        <h2 class="text-3xl font-serif font-normal tracking-tight sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
          Meet our leaders
        </h2>
        <p class="text-base text-gray-500 leading-relaxed font-normal">
          The minds behind Deagensie bring together creativity, intelligence, and execution. Click any leader to read their bio and connect.
        </p>
      </div>

      <!-- Leaders Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(leader, lIndex) in leaders"
          :key="leader.name"
          v-reveal="{ animation: 'fade-up', delay: lIndex * 120 }"
          class="rounded-3xl bg-white border border-gray-100 overflow-hidden shadow-xs transition-all duration-300 hover:shadow-2xl hover:border-[#04308F]/20 hover:-translate-y-1.5 group cursor-pointer flex flex-col justify-between"
          @click="openLeaderModal(leader)"
        >
          <div>
            <div class="relative aspect-4/3 overflow-hidden bg-gray-100">
              <NuxtImg
                :src="leader.image"
                :alt="leader.name"
                class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span class="text-xs font-semibold text-white inline-flex items-center gap-1.5">
                  View Profile &amp; Bio <Icon icon="lucide:arrow-up-right" />
                </span>
              </div>
            </div>

            <div class="p-6 space-y-1 text-center">
              <h3 class="text-lg font-serif font-normal text-gray-900 group-hover:text-[#04308F] transition-colors">
                {{ leader.name }}
              </h3>
              <p class="text-xs font-semibold text-[#04308F]">
                {{ leader.role }}
              </p>
            </div>
          </div>

          <!-- Quick Social Links Bar -->
          <div class="px-6 pb-6 pt-2 flex items-center justify-center gap-3 border-t border-gray-100" @click.stop>
            <a
              :href="leader.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              class="size-8 rounded-full bg-gray-100 text-gray-600 hover:bg-[#04308F] hover:text-white flex items-center justify-center transition-colors text-sm"
            >
              <Icon icon="ri:linkedin-fill" />
            </a>
            <a
              :href="leader.twitter"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter) profile"
              class="size-8 rounded-full bg-gray-100 text-gray-600 hover:bg-[#04308F] hover:text-white flex items-center justify-center transition-colors text-sm"
            >
              <Icon icon="prime:twitter" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Leader Bio Modal Overlay -->
    <Transition name="fade-scale">
      <div v-if="selectedLeader" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4" @click.self="closeLeaderModal">
        <div class="relative w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
          <button
            type="button"
            aria-label="Close modal"
            class="absolute top-6 right-6 size-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center transition-colors"
            @click="closeLeaderModal"
          >
            <Icon icon="lucide:x" class="text-xl" />
          </button>

          <div class="flex items-center gap-6">
            <div class="size-20 sm:size-24 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
              <NuxtImg :src="selectedLeader.image" :alt="selectedLeader.name" class="size-full object-cover" />
            </div>
            <div class="space-y-1">
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-[#04308F]/10 text-[#04308F] inline-block mb-1">
                Executive Leadership
              </span>
              <h3 class="text-2xl font-serif font-normal text-gray-900 leading-tight">
                {{ selectedLeader.name }}
              </h3>
              <p class="text-sm font-semibold text-[#04308F]">
                {{ selectedLeader.role }}
              </p>
            </div>
          </div>

          <div class="space-y-3 pt-4 border-t border-gray-100">
            <h4 class="text-xs uppercase tracking-wider text-gray-400 font-semibold">Biography</h4>
            <p class="text-sm text-gray-600 leading-relaxed font-normal">
              {{ selectedLeader.bio }}
            </p>
          </div>

          <div class="pt-4 border-t border-gray-100 flex items-center justify-between">
            <span class="text-xs text-gray-400 font-medium">Connect with {{ selectedLeader.name }}</span>
            <div class="flex items-center gap-3">
              <a
                :href="selectedLeader.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#04308F] text-white text-xs font-semibold hover:bg-[#05DED5] hover:text-gray-900 transition-colors shadow-xs"
              >
                <Icon icon="ri:linkedin-fill" class="text-base" /> LinkedIn
              </a>
              <a
                :href="selectedLeader.twitter"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white text-xs font-semibold hover:bg-[#05DED5] hover:text-gray-900 transition-colors shadow-xs"
              >
                <Icon icon="prime:twitter" class="text-base" /> X (Twitter)
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
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
