<script setup lang="ts">
import { getRegistrationFlow } from '~/lib/register/flows';
import {
  businessRegistrationSchema,
  creativeRegistrationSchema,
  getFirstInvalidStepId,
} from '~/lib/register/progress';

const route = useRoute();
const type = computed(() => String(route.params.type || ''));
const stepId = computed(() => String(route.params.step || ''));
const flow = computed(() => getRegistrationFlow(type.value));
const firstStep = computed(() => flow.value?.steps[0]);
const currentStep = computed(() => flow.value?.steps.find((step) => step.id === stepId.value));

const businessDraft = useBusinessRegistrationDraft();
const creativeDraft = useCreativeRegistrationDraft();

const currentStepIndex = computed(() => {
  if (!flow.value) return -1;
  const index = flow.value.steps.findIndex((step) => step.id === stepId.value);
  return index === -1 ? 0 : index;
});

onMounted(async () => {
  if (!flow.value || !flow.value.component || !firstStep.value) {
    return navigateTo('/register', { replace: true });
  }

  if (!currentStep.value) {
    return navigateTo(`/register/${flow.value.type}/${firstStep.value.id}`, { replace: true });
  }

  await Promise.all([businessDraft.ready, creativeDraft.ready]);

  const savedValues =
    type.value === 'business' ? businessDraft.data.value : creativeDraft.data.value;
  const schema =
    type.value === 'business' ? businessRegistrationSchema : creativeRegistrationSchema;
  const firstInvalidStepId = getFirstInvalidStepId(flow.value.steps, savedValues, schema);
  const allowedStepIndex =
    firstInvalidStepId === undefined
      ? flow.value.steps.length - 1
      : flow.value.steps.findIndex((step) => step.id === firstInvalidStepId);

  if (currentStepIndex.value > allowedStepIndex) {
    const step = flow.value?.steps[allowedStepIndex];
    if (step) {
      return navigateTo(`/register/${flow.value.type}/${step.id}`, {
        replace: true,
      });
    }
  }
});
</script>

<template>
  <section class="mx-auto my-16 w-5/6 max-w-2xl py-16 lg:my-20 lg:py-20">
    <component :is="flow?.component" v-if="flow?.component && currentStep" :step-id="stepId" />
  </section>
</template>
