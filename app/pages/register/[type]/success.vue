<script setup lang="ts">
import { getRegistrationFlow } from '~/lib/register/flows';

const route = useRoute();

const type = computed(() => String(route.params.type || ''));

definePageMeta({
  middleware: (to) => {
    const type = String(to.params.type || '');
    const flow = getRegistrationFlow(type);
    const firstStep = flow?.steps[0];
    const { isSubmitted, clearSubmission } = useFormSubmissionState();

    if (!flow || !firstStep) {
      return navigateTo('/register');
    }

    if (!isSubmitted(`${type}-registration`)) {
      return navigateTo(`/register/${flow.type}/${firstStep.id}`);
    }

    clearSubmission(`${type}-registration`);
  },
});

const successContent = computed(() => {
  if (type.value === 'creative') {
    return {
      eyebrow: 'Creative Registration',
      title: 'Creative profile received!',
      subTitle:
        'Thanks for introducing your work. Our talent team will review your profile and follow up with portfolio review or onboarding next steps.',
      nextSteps: [
        'Your profile and portfolio are reviewed',
        'Your skills are matched against active creative opportunities',
        'We reach out with fit, feedback, or onboarding details',
      ],
      primaryCta: { label: 'Back home', to: '/' },
      secondaryCta: { label: 'Explore creatives', to: '/creatives' },
    };
  }

  return {
    eyebrow: 'Business Registration',
    title: 'Business registration received!',
    subTitle:
      'Thanks for sharing the brief. Our strategy team will review the project details and reach out within 24-48 hours with next steps.',
    nextSteps: [
      'Your business details are reviewed for fit and completeness',
      'A strategist maps the brief against the right service team',
      'We reply with a discovery path, timeline, and next actions',
    ],
    primaryCta: { label: 'Back home', to: '/' },
    secondaryCta: { label: 'View our work', to: '/why' },
  };
});
</script>

<template>
  <PagesRegisterRegistrationSuccess
    :eyebrow="successContent.eyebrow"
    :title="successContent.title"
    :sub-title="successContent.subTitle"
  >
    <ol class="mt-8 space-y-4 text-left">
      <li
        v-for="(item, index) in successContent.nextSteps"
        :key="item"
        class="flex items-center gap-3"
      >
        <span
          class="grid size-8 shrink-0 place-items-center rounded-full bg-[#04308F] text-sm font-semibold text-white"
        >
          {{ index + 1 }}
        </span>
        <span class="text-foreground/70 text-sm">{{ item }}</span>
      </li>
    </ol>

    <template #actions>
      <div class="grid gap-3 sm:grid-cols-2">
        <NuxtLink
          class="rounded-md bg-[#05DED5] px-5 py-3 font-medium"
          :to="successContent.primaryCta.to"
        >
          {{ successContent.primaryCta.label }}
        </NuxtLink>
        <NuxtLink
          class="rounded-md border px-5 py-3 font-medium"
          :to="successContent.secondaryCta.to"
        >
          {{ successContent.secondaryCta.label }}
        </NuxtLink>
      </div>
    </template>
  </PagesRegisterRegistrationSuccess>
</template>
