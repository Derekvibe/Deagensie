<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { getRegistrationFlow } from '~/lib/register/flows';
import {
  businessRegistrationDefaultValues,
  businessRegistrationSchema,
  creativeRegistrationDefaultValues,
  creativeRegistrationSchema,
  getFirstInvalidStepId,
  hasSavedRegistrationProgress,
} from '~/lib/register/progress';

const route = useRoute();
const type = computed(() => String(route.params.type || ''));
const flow = computed(() => getRegistrationFlow(type.value));
const firstStep = computed(() => flow.value?.steps[0]);
const statusMessage = ref('Checking your registration path...');
const showPrompt = ref(false);

const businessDraft = useBusinessRegistrationDraft();
const creativeDraft = useCreativeRegistrationDraft();

async function hasSavedProgress() {
  if (type.value === 'business') {
    await businessDraft.ready;
    return hasSavedRegistrationProgress(
      businessDraft.data.value,
      businessRegistrationDefaultValues
    );
  }

  if (type.value === 'creative') {
    await creativeDraft.ready;
    return hasSavedRegistrationProgress(
      creativeDraft.data.value,
      creativeRegistrationDefaultValues
    );
  }

  return false;
}

async function getResumeStepId() {
  if (!flow.value || !firstStep.value) return undefined;

  if (type.value === 'creative') {
    await creativeDraft.ready;
  }

  if (type.value === 'business') {
    await businessDraft.ready;
  }

  const savedValues =
    type.value === 'business' ? businessDraft.data.value : creativeDraft.data.value;
  const schema =
    type.value === 'business' ? businessRegistrationSchema : creativeRegistrationSchema;
  const invalidStepId = getFirstInvalidStepId(flow.value.steps, savedValues, schema);

  return invalidStepId ?? flow.value.steps[flow.value.steps.length - 1]?.id;
}

async function clearSavedProgress() {
  if (type.value === 'business') {
    await businessDraft.clear();
  }

  if (type.value === 'creative') {
    await creativeDraft.clear();
  }
}

async function redirectToStep(stepId: string) {
  await navigateTo(`/register/${flow.value?.type}/${stepId}`, { replace: true });
}

async function continueRegistration() {
  const resumeStepId = await getResumeStepId();

  if (resumeStepId) {
    await redirectToStep(resumeStepId);
  }
}

async function startOver() {
  await clearSavedProgress();
  if (firstStep.value) {
    await redirectToStep(firstStep.value.id);
  }
}

onMounted(async () => {
  if (!flow.value || !flow.value.component || !firstStep.value) {
    statusMessage.value = 'That path looks unfamiliar. Redirecting you back to the start...';
    await new Promise((resolve) => setTimeout(resolve, 800));
    return navigateTo('/register', { replace: true });
  }

  if (await hasSavedProgress()) {
    showPrompt.value = true;
    statusMessage.value = '';
    return;
  }

  await redirectToStep(firstStep.value.id);
});
</script>

<template>
  <section
    class="mx-auto my-16 min-h-dvh w-5/6 max-w-xl content-center py-16 text-center lg:my-20 lg:py-20"
  >
    <template v-if="showPrompt">
      <p class="text-xs tracking-[0.28em] text-[#04308F]/70 uppercase">Resume registration</p>
      <h1 class="mt-4 text-2xl font-semibold text-slate-950 sm:text-3xl">
        We found a saved {{ flow?.label?.toLowerCase() || 'registration' }} in progress.
      </h1>
      <p class="mt-3 text-sm leading-6 text-slate-600">
        Continue from the first step that still needs your input, or start over with a fresh form.
      </p>
      <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <button
          type="button"
          class="rounded-full bg-[#05DED5] px-6 py-3 font-semibold text-slate-950"
          @click="continueRegistration"
        >
          Continue previous registration
        </button>
        <button
          type="button"
          class="rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-950"
          @click="startOver"
        >
          Start over
        </button>
      </div>
    </template>

    <template v-else>
      <Icon icon="svg-spinners:3-dots-fade" class="mb-6 inline-block text-4xl text-[#04308F]" />
      <p class="text-xs tracking-[0.28em] text-[#04308F]/70 uppercase">one moment</p>
      <h1 class="mt-4 text-2xl font-semibold text-slate-950 sm:text-3xl">Setting things up...</h1>
      <p class="mt-3 text-sm leading-6 text-slate-600">{{ statusMessage }}</p>
    </template>
  </section>
</template>
