<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <section class="py-12 lg:py-24">
    <div class="mx-auto w-5/6 max-w-7xl">
      <h2
        class="text-center text-2xl leading-normal font-semibold lg:text-4xl xl:text-5xl xl:leading-normal"
      >
        If you're building something bold <span class="hidden lg:inline">&nbsp;<br /></span> — we
        are your unfair advantage.
      </h2>
      <ul
        class="mt-15 space-y-6 *:rounded-[calc(var(--radius)+2px)] *:border *:border-[#8CA0CB] *:bg-[#FCFCFE] *:px-4 *:py-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0 **:[div]:grid **:[div]:size-10 **:[div]:place-items-center **:[div]:rounded-full **:[div]:bg-[#E6EAF4] **:[div]:text-2xl **:[div]:text-[#04308F] **:[h3]:mt-4 **:[h3]:mb-3 **:[h3]:text-2xl **:[h3]:leading-normal **:[h3]:font-semibold lg:**:[h3]:min-h-[2lh] xl:**:[h3]:min-h-0 **:[p]:py-3"
      >
        <li>
          <div>
            <Icon icon="carbon:ibm-elo-engineering-insights" />
          </div>
          <h3>Early-stage startups</h3>
          <p>
            Building from zero to a credible, investor-ready, fundable brand with strong market
            positioning.
          </p>
        </li>
        <li>
          <div>
            <Icon icon="mdi-light:chart-line" />
          </div>
          <h3>Scaling founders</h3>
          <p>
            Ready to move from early traction to industry leadership with a growth system behind
            them.
          </p>
        </li>
        <li>
          <div>
            <Icon icon="la:globe-africa" />
          </div>
          <h3>African tech innovators</h3>
          <p>
            Building world-class products from the continent, competing on a global stage with
            confidence.
          </p>
        </li>
        <li>
          <div>
            <Icon icon="solar:global-outline" />
          </div>
          <h3>Global visionaries</h3>
          <p>
            Founders building boldly in emerging markets who need a strategic, creative, and
            intelligent partner.
          </p>
        </li>
        <li>
          <div>
            <Icon icon="streamline-plump:bag-suitcase-4" />
          </div>
          <h3>Ambitious SMEss</h3>
          <p>
            Established businesses seeking reinvention, stronger brand positioning, and modern
            marketing strategies.
          </p>
        </li>
        <li>
          <div>
            <Icon icon="formkit:people" />
          </div>
          <h3>Fortune 100 brands</h3>
          <p>
            Category leaders seeking creative disruption, talent access, and AI-driven intelligence
            to stay ahead.
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
