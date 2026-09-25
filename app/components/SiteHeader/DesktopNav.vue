<script setup lang="ts">
import { Icon } from '@iconify/vue';

type DesktopMenu = 'business' | 'creatives' | 'why' | 'about' | 'subscription' | 'resource';

const route = useRoute();
const desktopNavRef = ref<HTMLElement | null>(null);
const activeDesktopMenu = ref<DesktopMenu | null>(null);
let closeTimer: ReturnType<typeof setTimeout> | undefined;

const menuItems: { id: DesktopMenu; label: string; to: string }[] = [
  { id: 'business', label: 'Business', to: '/business' },
  { id: 'creatives', label: 'Creatives', to: '/creatives' },
  { id: 'why', label: 'Why Deagensie?', to: '/why' },
  { id: 'about', label: 'About Us', to: '/about' },
  { id: 'subscription', label: 'Subscription', to: '/subscription' },
  { id: 'resource', label: 'Resource', to: '/resource' },
];

const cancelClose = () => {
  if (!closeTimer) return;
  clearTimeout(closeTimer);
  closeTimer = undefined;
};

const openDesktopMenu = (menu: DesktopMenu) => {
  cancelClose();
  activeDesktopMenu.value = menu;
};

const closeDesktopMenu = () => {
  cancelClose();
  activeDesktopMenu.value = null;
};

const scheduleDesktopMenuClose = () => {
  cancelClose();
  closeTimer = setTimeout(closeDesktopMenu, 180);
};

const handleDesktopNavFocusOut = (event: FocusEvent) => {
  const nextTarget = event.relatedTarget;
  if (!(nextTarget instanceof Node) || !desktopNavRef.value?.contains(nextTarget)) {
    closeDesktopMenu();
  }
};

watch(route, closeDesktopMenu);

onUnmounted(cancelClose);
</script>

<template>
  <nav
    ref="desktopNavRef"
    class="flex flex-1 items-center"
    @mouseleave="scheduleDesktopMenuClose"
    @mouseenter="cancelClose"
    @focusout="handleDesktopNavFocusOut"
    @keydown.esc="closeDesktopMenu"
  >
    <div class="mx-auto flex gap-4 text-xs font-semibold xl:gap-6 xl:text-sm xl:leading-relaxed">
      <NuxtLink
        v-for="item in menuItems"
        :key="item.id"
        :to="item.to"
        class="inline-flex items-center gap-1.5 hover:underline"
        @mouseenter="openDesktopMenu(item.id)"
        @focus="openDesktopMenu(item.id)"
      >
        {{ item.label }}
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.6 7.45831L11.1667 12.8916C10.525 13.5333 9.475 13.5333 8.83333 12.8916L3.4 7.45831"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </NuxtLink>
    </div>
    <NuxtLink
      to="/contact"
      class="text-foreground rounded-full bg-[#05DED5] px-4 py-2 text-sm font-semibold transition-transform hover:scale-105 xl:px-6 xl:py-3 xl:text-base"
      @focus="closeDesktopMenu"
    >
      Get Started
    </NuxtLink>
  </nav>
  <div
    v-if="activeDesktopMenu"
    class="text-popover-foreground animate-in fade-in-0 zoom-in-95 bg-popover fixed top-[calc((var(--spacing)*20)+(var(--spacing)*1))] left-1/2 z-50 -translate-x-1/2 rounded-[calc(var(--radius)+2px)] shadow-md outline-none"
    @mouseenter="cancelClose"
    @mouseleave="scheduleDesktopMenuClose"
  >
    <div
      v-if="activeDesktopMenu === 'business'"
      class="flex aspect-910/500 w-[calc(910/1440*100vw)] max-w-[910px] rounded-[inherit]"
    >
      <div class="flex flex-1 gap-10 p-10">
        <div class="space-y-6">
          <div class="space-y-6">
            <p class="text-2xl leading-normal font-semibold">
              <NuxtLink to="/business" class="hover:underline">
                Customized Solutions For Businesses
              </NuxtLink>
            </p>
            <p>
              The Future of Business Growth is Here. It&apos;s Bold, It&apos;s Intelligent,
              It&apos;s Deagensie.
            </p>
          </div>
          <hr />
          <div class="space-y-4">
            <p class="text-lg leading-snug font-medium">
              <NuxtLink to="/creatives" class="hover:underline">Hire Creatives</NuxtLink>
            </p>
            <p class="linedblock text-sm leading-relaxed">
              Match with top-tier African creative talent and build world-class teams.
            </p>
          </div>
          <NuxtLink
            to="/business"
            class="inline-block w-full rounded-full bg-[#05DED5] p-3 text-center font-medium"
          >
            Learn more
          </NuxtLink>
        </div>
        <div class="space-y-6">
          <div class="space-y-4">
            <p class="text-lg leading-snug font-medium">
              <NuxtLink to="/business" class="hover:underline">Business Growth</NuxtLink>
            </p>
            <p class="linedblock text-sm leading-relaxed">
              Explore our premium business growth solutions tailored for startups and category disruptors.
            </p>
          </div>
          <div class="space-y-4">
            <p class="text-lg leading-snug font-medium">
              <NuxtLink to="/creatives" class="hover:underline">Train Creative Team</NuxtLink>
            </p>
            <p class="linedblock text-sm leading-relaxed">
              Build a forward thinking creative team that brings magic into your business.
            </p>
          </div>
        </div>
      </div>
      <div class="text-background w-256/910 space-y-6 rounded-r-[inherit] bg-[#04308F] p-10">
        <p class="text-lg leading-snug font-medium">Business Growth</p>
        <ul
          class="space-y-4 **:[a]:inline-flex **:[a]:items-center **:[a]:gap-2 **:[a]:text-sm **:[a]:leading-relaxed **:[svg]:text-xl"
        >
          <li>
            <NuxtLink to="/business" class="hover:underline">
              <Icon icon="hugeicons:arrow-right-01" />
              Strategy
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/business" class="hover:underline">
              <Icon icon="hugeicons:arrow-right-01" />
              Brand Development
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/business" class="hover:underline">
              <Icon icon="hugeicons:arrow-right-01" />
              Marketing
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/business" class="hover:underline">
              <Icon icon="hugeicons:arrow-right-01" />
              Digital Products
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/subscription" class="hover:underline">
              <Icon icon="hugeicons:arrow-right-01" />
              Talent-as-a-Service
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div
      v-else-if="activeDesktopMenu === 'creatives'"
      class="flex aspect-722/336 w-[calc(722/1440*100vw)] max-w-[722px] gap-10 rounded-[inherit] p-10"
    >
      <div class="w-[calc(291/763*100%+calc(var(--spacing)*10))] shrink-0 space-y-6">
        <p class="text-2xl leading-normal font-semibold">
          <NuxtLink to="/creatives" class="hover:underline">Why Join Deagensie?</NuxtLink>
        </p>
        <p>
          African creatives can now find fulfilling careers while staying connected to their roots.
        </p>
      </div>
      <div class="space-y-6">
        <div class="space-y-4">
          <p class="text-lg leading-snug font-medium">
            <NuxtLink to="/creatives" class="hover:underline">Find Opportunities</NuxtLink>
          </p>
          <p class="linedblock text-sm leading-relaxed">
            Create a portfolio and get matched with a global job opportunity.
          </p>
        </div>
        <div class="space-y-4">
          <p class="text-lg leading-snug font-medium">
            <NuxtLink to="/contact" class="hover:underline">Join Our Community</NuxtLink>
          </p>
          <p class="linedblock text-sm leading-relaxed">
            Become a member of our emerging young leaders network dedicated to nurturing creative talent.
          </p>
        </div>
      </div>
    </div>

    <div
      v-else-if="activeDesktopMenu === 'why'"
      class="flex aspect-763/500 w-[calc(763/1440*100vw)] max-w-[763px] gap-10 rounded-[inherit] p-10"
    >
      <div class="w-[calc(291/763*100%+calc(var(--spacing)*10))] shrink-0 space-y-6">
        <div>
          <p class="text-2xl leading-normal font-semibold">
            <NuxtLink to="/why" class="hover:underline">Why Deagensie</NuxtLink>
          </p>
          <p class="mt-6 mb-4">
            Deagensie isn&apos;t just an agency—it&apos;s a growth engine, a predictive intelligence platform, and a business accelerator in one.
          </p>
          <NuxtLink to="/why" class="inline-flex items-center gap-2 px-4 py-2.5 font-semibold text-[#04308F] hover:underline">
            Learn more
            <Icon icon="hugeicons:arrow-right-02" class="text-xl" />
          </NuxtLink>
        </div>
        <NuxtImg src="/images/pages/(home)/hero.webp" class="aspect-291/178 rounded-md object-cover" />
      </div>
      <div class="flex-1 space-y-6">
        <div class="space-y-4">
          <p class="text-lg leading-snug font-medium">
            <NuxtLink to="/business" class="hover:underline">On-Demand Business Growth Team</NuxtLink>
          </p>
          <p class="linedblock text-sm leading-relaxed">
            Hire an on-demand squad of top-tier strategists, designers, and growth hackers.
          </p>
        </div>
        <div class="space-y-4">
          <p class="text-lg leading-snug font-medium">
            <NuxtLink to="/creatives" class="hover:underline">Creatives Experience</NuxtLink>
          </p>
          <p class="linedblock text-sm leading-relaxed">
            African creatives can now find fulfilling careers while staying connected to their roots.
          </p>
        </div>
        <div class="space-y-4">
          <p class="text-lg leading-snug font-medium">
            <NuxtLink to="/why" class="hover:underline">
              AI-Driven Branding & Marketing Intelligence
            </NuxtLink>
          </p>
          <p class="linedblock text-sm leading-relaxed">
            Most agencies create stunning visuals and run ads, but Deagensie goes deeper.
          </p>
        </div>
      </div>
    </div>

    <div
      v-else-if="activeDesktopMenu === 'about'"
      class="flex aspect-1023/336 w-[calc(1023/1440*100vw)] max-w-[1023px] rounded-[inherit]"
    >
      <div class="w-[calc(291/1023*100%+calc(var(--spacing)*10))] shrink-0 space-y-6 p-10">
        <div class="space-y-6">
          <p class="text-2xl leading-normal font-semibold">
            <NuxtLink to="/about">About Deagensie</NuxtLink>
          </p>
          <p>Redefining Talent & Business Growth in Africa Creative Economy</p>
        </div>
        <NuxtImg
          src="/images/pages/(home)/hero.webp"
          class="aspect-276/118 w-276/291 rounded-[calc(var(--radius)+2px)] object-cover"
        />
      </div>
      <div class="grid flex-1 grid-cols-2 gap-6 p-10">
        <div class="space-y-4">
          <p class="text-lg leading-snug font-medium">
            <NuxtLink to="/about" class="hover:underline">
              Who We Are
            </NuxtLink>
          </p>
          <p class="linedblock text-sm leading-relaxed">
            Creative agency building Strategies, Identities, Platforms & Campaigns.
          </p>
        </div>
        <div class="space-y-4">
          <p class="text-lg leading-snug font-medium">
            <NuxtLink to="/portfolio" class="hover:underline">Our Portfolio</NuxtLink>
          </p>
          <p class="linedblock text-sm leading-relaxed">
            We craft experiences that captivate, connect and convert.
          </p>
        </div>
        <div class="space-y-4">
          <p class="text-lg leading-snug font-medium">
            <NuxtLink to="/about" class="hover:underline">
              Leadership
            </NuxtLink>
          </p>
          <p class="linedblock text-sm leading-relaxed">
            Meet the formidable team leading Deagensie Digitals.
          </p>
        </div>
        <div class="space-y-4">
          <p class="text-lg leading-snug font-medium">
            <NuxtLink to="/contact" class="hover:underline">Contact Us</NuxtLink>
          </p>
          <p class="linedblock text-sm leading-relaxed">Let us know how we can help.</p>
        </div>
      </div>
    </div>

    <div
      v-else-if="activeDesktopMenu === 'subscription'"
      class="flex aspect-887/336 w-[calc(887/1440*100vw)] max-w-[887px] gap-12.5 rounded-[inherit] p-10"
    >
      <div class="w-[calc(304/887*100%+calc(var(--spacing)*10))] shrink-0 space-y-6">
        <p class="text-2xl leading-normal font-semibold">
          <NuxtLink to="/subscription" class="hover:underline">
            Flexible Subscription Model
          </NuxtLink>
        </p>
        <p>Access business solutions and creative talents on a flexible, project-based basis.</p>
      </div>
      <div class="flex flex-1 justify-between">
        <div class="space-y-6">
          <p class="text-lg leading-snug font-medium uppercase">Businesses</p>
          <ul
            class="space-y-6 **:[a]:inline-flex **:[a]:items-center **:[a]:gap-4 **:[a]:py-1 **:[a]:text-sm **:[a]:leading-relaxed **:[svg]:text-base"
          >
            <li>
              <NuxtLink to="/subscription" class="hover:underline">
                <Icon icon="hugeicons:arrow-right-01" />
                Growth-as-a-Service (GrowthOS)
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/subscription" class="hover:underline">
                <Icon icon="hugeicons:arrow-right-01" />
                Talent-as-a-Service
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="space-y-6">
          <p class="text-lg leading-snug font-medium uppercase">Creatives</p>
          <ul
            class="space-y-6 **:[a]:inline-flex **:[a]:items-center **:[a]:gap-4 **:[a]:py-1 **:[a]:text-sm **:[a]:leading-relaxed **:[svg]:text-base"
          >
            <li>
              <NuxtLink to="/creatives" class="hover:underline">
                <Icon icon="hugeicons:arrow-right-01" />
                Creative Match
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/creatives" class="hover:underline">
                <Icon icon="hugeicons:arrow-right-01" />
                Gig Economy
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      v-else-if="activeDesktopMenu === 'resource'"
      class="flex aspect-681/336 w-[calc(681/1440*100vw)] max-w-[681px] gap-12.5 rounded-[inherit] p-10"
    >
      <div class="w-[calc(382/681*100%+calc(var(--spacing)*10))] shrink-0 space-y-6">
        <p class="text-2xl leading-normal font-semibold">
          <NuxtLink to="/resource" class="hover:underline">
            Where Businesses Grow and Creatives Thrive
          </NuxtLink>
        </p>
        <p>Empowering businesses and creatives with skills to innovate and succeed.</p>
      </div>
      <div class="flex-1 space-y-6">
        <p class="text-lg leading-snug font-medium uppercase">Resources</p>
        <ul
          class="space-y-6 **:[a]:inline-flex **:[a]:items-center **:[a]:gap-4 **:[a]:text-sm **:[a]:leading-relaxed **:[svg]:text-xl"
        >
          <li>
            <NuxtLink to="/blog" class="hover:underline">
              <Icon icon="hugeicons:arrow-right-01" />
              Blog
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/resource" class="hover:underline">
              <Icon icon="hugeicons:arrow-right-01" />
              eBooks
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/resource" class="hover:underline">
              <Icon icon="hugeicons:arrow-right-01" />
              White Papers
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
@reference "../../assets/css/main.css";

.linedblock {
  @apply relative isolate px-2 py-1 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-px before:bg-linear-to-b before:from-current before:from-15% before:to-current/12.5;
}
</style>
