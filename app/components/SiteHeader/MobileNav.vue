<script setup lang="ts">
import { Icon } from '@iconify/vue';

const open = defineModel<boolean>('open', { default: false });
</script>

<template>
  <Sheet v-model:open="open">
    <SheetTrigger as-child>
      <button type="button" class="ml-auto text-2xl">
        <Icon icon="hugeicons:menu-01" />
      </button>
    </SheetTrigger>
    <SheetContent class="w-full p-0">
      <SheetHeader class="bg-background sticky top-0 z-50">
        <div class="mx-auto flex h-16 w-5/6 items-center justify-between">
          <NuxtLink to="/" aria-label="Go to homepage">
            <NuxtImg :width="128" :height="34" src="/images/logo-dark.png" alt="Deagensie logo" />
          </NuxtLink>
          <SheetTrigger as-child>
            <button type="button" class="text-2xl">
              <Icon icon="hugeicons:cancel-01" />
            </button>
          </SheetTrigger>
        </div>
      </SheetHeader>
      <div class="flex h-[calc(100%-var(--spacing)*16)] flex-col gap-6 overflow-auto pt-12">
        <Accordion
          type="single"
          collapsible
          class="contents *:mx-auto *:w-5/6 *:border-none"
          style="--rr: calc(var(--radius) + 2px)"
        >
          <AccordionItem value="business" class="rounded-(--rr) bg-[#F8FEFE]">
            <AccordionTrigger class="bg-background rounded-(--rr) border p-3">
              Businesses
            </AccordionTrigger>
            <AccordionContent class="space-y-4 px-3 pt-7 pb-5">
              <div class="space-y-4">
                <p class="font-medium">
                  <NuxtLink to="/business" class="hover:underline">
                    Customized Solutions For Businesses
                  </NuxtLink>
                </p>
                <p class="text-sm leading-relaxed">
                  The Future of Business Growth is Here. It&apos;s Bold, It&apos;s Intelligent,
                  It&apos;s Deagensie.
                </p>
              </div>
              <hr />
              <div class="space-y-4">
                <p class="text-sm leading-relaxed font-medium">
                  <NuxtLink to="/" class="hover:underline">Hire Creatives</NuxtLink>
                </p>
                <p class="linedblock text-xs leading-normal">
                  The Future of Business Growth is Here. It&apos;s Bold, It&apos;s Intelligent,
                  It&apos;s Deagensie.
                </p>
              </div>
              <div class="space-y-4">
                <p class="text-sm leading-relaxed font-medium">
                  <NuxtLink to="/" class="hover:underline">Business Growth</NuxtLink>
                </p>
                <p class="linedblock text-xs leading-normal">
                  Explore our premium business growth solutions tailored for start-ups, ambitious
                  category disruptors, and Fortune 100 brands.
                </p>
              </div>
              <div class="space-y-4">
                <p class="text-sm leading-relaxed font-medium">
                  <NuxtLink to="/" class="hover:underline">Train Creative Team</NuxtLink>
                </p>
                <p class="linedblock text-xs leading-normal">
                  Build a forward thinking creative team that brings the magic into your business
                  growth
                </p>
              </div>
              <div class="space-y-6">
                <p class="text-sm leading-relaxed font-medium">Business Growth</p>
                <ul
                  class="space-y-4 **:[a]:inline-flex **:[a]:items-center **:[a]:gap-2 **:[a]:text-xs **:[a]:leading-normal **:[svg]:text-xl"
                >
                  <li>
                    <NuxtLink to="/" class="hover:underline">
                      <Icon icon="hugeicons:arrow-right-01" />
                      Strategy
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/" class="hover:underline">
                      <Icon icon="hugeicons:arrow-right-01" />
                      Brand Development
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/" class="hover:underline">
                      <Icon icon="hugeicons:arrow-right-01" />
                      Marketing
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/" class="hover:underline">
                      <Icon icon="hugeicons:arrow-right-01" />
                      Digital Products
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/" class="hover:underline">
                      <Icon icon="hugeicons:arrow-right-01" />
                      Talent-as-a-Service
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/" class="hover:underline">
                      <Icon icon="hugeicons:arrow-right-01" />
                      Talent Upskilling
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="creatives" class="rounded-(--rr) bg-[#F8FEFE]">
            <AccordionTrigger class="bg-background rounded-(--rr) border p-3">
              Creatives
            </AccordionTrigger>
            <AccordionContent class="space-y-4 px-3 pt-7 pb-5">
              <div class="space-y-4">
                <p class="font-medium">
                  <NuxtLink to="/creatives" class="hover:underline">Why Join Deagensie?</NuxtLink>
                </p>
                <p class="text-sm leading-relaxed">
                  African creatives can now find fulfilling careers while staying connected to their
                  roots.
                </p>
              </div>
              <hr />
              <div class="space-y-4">
                <p class="text-sm leading-relaxed font-medium">
                  <NuxtLink to="/" class="hover:underline">Find Opportunities</NuxtLink>
                </p>
                <p class="linedblock text-xs leading-normal">
                  Create a portfolio and get matched with a global job opportunity.
                </p>
              </div>
              <div class="space-y-4">
                <p class="text-sm leading-relaxed font-medium">
                  <NuxtLink to="/" class="hover:underline">Join Our Community</NuxtLink>
                </p>
                <p class="linedblock text-xs leading-normal">
                  Become a member of our emerging young leaders network dedicated to nurturing
                  astounding industry leaders, creative professionals and entrepreneurs.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="why-deagensie" class="rounded-(--rr) bg-[#F8FEFE]">
            <AccordionTrigger class="bg-background rounded-(--rr) border p-3">
              Why Deagensie?
            </AccordionTrigger>
            <AccordionContent class="space-y-4 px-3 pt-7 pb-5">
              <div class="space-y-4">
                <p class="font-medium">
                  <NuxtLink to="/why" class="hover:underline">Why Deagensie?</NuxtLink>
                </p>
                <p class="text-sm leading-relaxed">
                  Deagensie isn&apos;t just an agency—it&apos;s a growth engine, a predictive
                  intelligence platform, and a business accelerator in one.
                </p>
                <NuxtLink
                  to="/"
                  class="inline-flex items-center gap-2 px-0.5 py-2 text-sm leading-relaxed font-medium"
                >
                  Learn more
                  <Icon icon="hugeicons:arrow-right-02" class="text-xl" />
                </NuxtLink>
              </div>
              <hr />
              <div class="space-y-4">
                <p class="text-sm leading-relaxed font-medium">
                  <NuxtLink to="/" class="hover:underline">On-Demand Business Growth Team</NuxtLink>
                </p>
                <p class="linedblock text-xs leading-normal">
                  Hire an on-demand squad of top-tier strategists, designers, and growth
                  hackers—plugged into your business at a fraction of the cost.
                </p>
              </div>
              <div class="space-y-4">
                <p class="text-sm leading-relaxed font-medium">
                  <NuxtLink to="/" class="hover:underline">Creatives Experience</NuxtLink>
                </p>
                <p class="linedblock text-xs leading-normal">
                  African creatives can now find fulfilling careers while staying connected to their
                  roots
                </p>
              </div>
              <div class="space-y-4">
                <p class="text-sm leading-relaxed font-medium">
                  <NuxtLink to="/" class="hover:underline">
                    AI-Driven Branding & Marketing Intelligence
                  </NuxtLink>
                </p>
                <p class="linedblock text-xs leading-normal">
                  Most agencies create stunning visuals and run ads, but Deagensie goes deeper.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="about" class="rounded-(--rr) bg-[#F8FEFE]">
            <AccordionTrigger class="bg-background rounded-(--rr) border p-3">
              About
            </AccordionTrigger>
            <AccordionContent class="space-y-4 px-3 pt-7 pb-5">
              <div class="space-y-4">
                <p class="font-medium">
                  <NuxtLink to="/about">About Deagensie</NuxtLink>
                </p>
                <p class="text-sm leading-relaxed">
                  Redefining Talent & Business Growth in Africa Creative Economy
                </p>
              </div>
              <hr />
              <div class="space-y-4">
                <p class="text-sm leading-relaxed font-medium">
                  <NuxtLink to="/about" hash="about_who-we-are" class="hover:underline">
                    Who We Are
                  </NuxtLink>
                </p>
                <p class="linedblock text-xs leading-normal">
                  Creative agency building Strategies | Identities | Platforms | Campaigns &
                  Creatives Talents
                </p>
              </div>
              <div class="space-y-4">
                <p class="text-sm leading-relaxed font-medium">
                  <NuxtLink to="/about" hash="about_leadership" class="hover:underline">
                    Leadership
                  </NuxtLink>
                </p>
                <p class="linedblock text-xs leading-normal">
                  Meet the formidable team leading Deagensie Digitals
                </p>
              </div>
              <div class="space-y-4">
                <p class="text-sm leading-relaxed font-medium">
                  <NuxtLink to="/" class="hover:underline">Our Portfolio</NuxtLink>
                </p>
                <p class="linedblock text-xs leading-normal">
                  We don&apos;t just create business solutions, we craft experiences that captivate,
                  connect and convert.
                </p>
              </div>
              <div class="space-y-4">
                <p class="text-sm leading-relaxed font-medium">
                  <NuxtLink to="/contact">Contact Us</NuxtLink>
                </p>
                <p class="linedblock text-xs leading-normal">Let us know how we can help.</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="subscription" class="rounded-(--rr) bg-[#F8FEFE]">
            <AccordionTrigger class="bg-background rounded-(--rr) border p-3">
              Subscription
            </AccordionTrigger>
            <AccordionContent class="space-y-4 px-3 pt-7 pb-5">
              <div class="space-y-4">
                <p class="font-medium">
                  <NuxtLink to="/subscription" class="hover:underline">
                    Flexible Subscription Model
                  </NuxtLink>
                </p>
                <p class="text-sm leading-relaxed">
                  Access business solutions and creative talents on a flexible, project-based basis.
                </p>
              </div>
              <hr />
              <div class="space-y-6">
                <p class="text-sm leading-relaxed font-medium uppercase">Businesses</p>
                <ul
                  class="space-y-4 **:[a]:inline-flex **:[a]:items-center **:[a]:gap-2 **:[a]:text-xs **:[a]:leading-normal **:[svg]:text-xl"
                >
                  <li>
                    <NuxtLink to="/" class="hover:underline">
                      <Icon icon="hugeicons:arrow-right-01" />
                      Growth-as-a-Service (GrowthOS)
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/" class="hover:underline">
                      <Icon icon="hugeicons:arrow-right-01" />
                      Talent-as-a-Service
                    </NuxtLink>
                  </li>
                </ul>
              </div>
              <div class="space-y-6">
                <p class="text-sm leading-relaxed font-medium uppercase">Creatives</p>
                <ul
                  class="space-y-4 **:[a]:inline-flex **:[a]:items-center **:[a]:gap-2 **:[a]:text-xs **:[a]:leading-normal **:[svg]:text-xl"
                >
                  <li>
                    <NuxtLink to="/" class="hover:underline">
                      <Icon icon="hugeicons:arrow-right-01" />
                      Creative Match
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/" class="hover:underline">
                      <Icon icon="hugeicons:arrow-right-01" />
                      Gig Economy
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="resource" class="rounded-(--rr) bg-[#F8FEFE]">
            <AccordionTrigger class="bg-background rounded-(--rr) border p-3">
              Resource
            </AccordionTrigger>
            <AccordionContent class="space-y-4 px-3 pt-7 pb-5">
              <div class="space-y-4">
                <p class="font-medium">
                  <NuxtLink to="/resource" class="hover:underline">
                    Where Businesses Grow and Creatives Thrive
                  </NuxtLink>
                </p>
                <p class="text-sm leading-relaxed">
                  Empowering businesses and creatives with skills to innovate and succeed.
                </p>
              </div>
              <hr />
              <div class="space-y-6">
                <p class="text-sm leading-relaxed font-medium uppercase">Resources</p>
                <ul
                  class="space-y-4 **:[a]:inline-flex **:[a]:items-center **:[a]:gap-2 **:[a]:text-xs **:[a]:leading-normal **:[svg]:text-xl"
                >
                  <li>
                    <NuxtLink to="/blog" class="hover:underline">
                      <Icon icon="hugeicons:arrow-right-01" />
                      Blog
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/" class="hover:underline">
                      <Icon icon="hugeicons:arrow-right-01" />
                      eBooks
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/" class="hover:underline">
                      <Icon icon="hugeicons:arrow-right-01" />
                      YouTube
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/" class="hover:underline">
                      <Icon icon="hugeicons:arrow-right-01" />
                      White Papers
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div class="bg-background sticky bottom-0 z-50 mx-auto mt-auto w-5/6 pt-4 pb-12">
          <NuxtLink
            to="/register"
            class="inline-block w-full rounded-full bg-[#05DED5] p-3 text-center"
          >
            Learn more
          </NuxtLink>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>

<style scoped lang="css">
@reference "../../assets/css/main.css";

.linedblock {
  @apply relative isolate px-2 py-1 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-px before:bg-linear-to-b before:from-current before:from-15% before:to-current/12.5;
}
</style>
