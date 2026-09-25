<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <section>
    <div>
      <div>
        <h2>
          Unlocking African Creative Power —<span class="hidden lg:inline">&nbsp;<br /></span
          >Globally.
        </h2>
        <p>
          Africa is home to some of the world&apos;s most dynamic creative minds. Yet too many
          talented designers, <span class="hidden lg:inline">&nbsp;<br /></span>strategists,
          developers, and storytellers lack access to sustainable global opportunities. We changed
          that.
        </p>
        <div>
          <div>
            <h3>For African Creatives</h3>
            <p>Our Talent-as-a-Service model allows creatives to:</p>
            <ul>
              <li><Icon icon="hugeicons:tick-02" />Work on global startup projects</li>
              <li><Icon icon="hugeicons:tick-02" />Earn competitive income</li>
              <li><Icon icon="hugeicons:tick-02" />Build meaningful portfolios</li>
              <li><Icon icon="hugeicons:tick-02" />Stay rooted in their culture and communities</li>
              <li><Icon icon="hugeicons:tick-02" />Access continuous skill development</li>
            </ul>
            <p>We don&apos;t just place talent. We build creative careers.</p>
          </div>

          <NuxtImg src="/images/pages/why/hero-2.png" />
        </div>
      </div>
      <div>
        <div>
          <div>
            <h3>For Founders & Startups</h3>
            <p>
              Hiring full-time teams is expensive. Agencies are often rigid. Freelancers can be
              unreliable.
            </p>
            <ul>
              <li><Icon icon="hugeicons:tick-02" />On-demand creative specialists</li>
              <li><Icon icon="hugeicons:tick-02" />Flexible engagement models</li>
              <li><Icon icon="hugeicons:tick-02" />Cost-effective scaling</li>
              <li><Icon icon="hugeicons:tick-02" />Pre-vetted, high-performing professionals</li>
              <li><Icon icon="hugeicons:tick-02" />AI-supported workflow efficiency</li>
            </ul>
            <p>World-class creative power without the overhead.</p>
          </div>
          <NuxtImg src="/images/pages/why/hero-3.png" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
@reference '../../../assets/css/main.css';

section {
  @apply py-13 lg:py-24;
  > div {
    @apply mx-auto w-5/6 max-w-7xl space-y-10 lg:space-y-15;
    > div {
      @apply space-y-4 lg:space-y-6;
      h2 {
        @apply text-center text-2xl leading-normal font-semibold lg:text-4xl xl:text-5xl xl:leading-normal;
        + p {
          @apply text-center;
        }
      }
      > div {
        @apply space-y-6 lg:flex lg:gap-16 lg:space-y-0;

        img {
          @apply aspect-353/536 rounded-[calc(var(--radius)+2px)] sm:aspect-772/519 lg:w-772/1280 lg:shrink-0;
        }
        div {
          @apply lg:flex-1;
          h3 {
            @apply text-xl font-semibold xl:text-3xl;
            + p {
              @apply mt-4 mb-6;
            }
          }
          ul {
            @apply space-y-4;
            li {
              @apply flex items-center gap-2.5 p-2.5;
              svg {
                @apply text-2xl text-[#34C759];
              }
            }
            + p {
              @apply mt-6;
            }
          }
        }
      }
      &:nth-child(odd) {
        div {
          @apply flex-row-reverse;
        }
      }
    }
  }
}
</style>
