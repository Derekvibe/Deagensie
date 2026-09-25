<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Icon } from '@iconify/vue';
import { isValidWebsiteInput, normalizeWebsiteInput } from '~/lib/utils';
import { useForm } from 'vee-validate';
import type { SuccessResponse } from '~/types/api';
import { registrationFlows } from '~/lib/register/flows';
import {
  businessRegistrationDefaultValues,
  businessRegistrationSchema,
  getFirstInvalidStepId,
  type BusinessRegistrationFormValues,
} from '~/lib/register/progress';
import { normalizeApiError, notifyApiFailure, pickFormErrors } from '~/utils/api-errors';

type StepField = keyof BusinessRegistrationFormValues;

const props = defineProps<{
  stepId: string;
}>();

const router = useRouter();
const { $api } = useNuxtApp();
const { markAsSubmitted } = useFormSubmissionState();

const steps = registrationFlows.business.steps;
const businessDraft = useBusinessRegistrationDraft();
await businessDraft.ready;

const fullSchema = businessRegistrationSchema;

const businessFields = steps.flatMap((step) => step.fields) as StepField[];

const {
  defineField,
  errors,
  handleSubmit,
  isSubmitting,
  // meta,
  resetForm,
  setFieldError,
  setFieldTouched,
  setFieldValue,
  values,
} = useForm<BusinessRegistrationFormValues>({
  validationSchema: toTypedSchema(fullSchema),
  initialValues: businessDraft.data.value,
});

const [businessName] = defineField('businessName');
const [industry] = defineField('industry');
const [firstName] = defineField('firstName');
const [lastName] = defineField('lastName');
const [businessEmail] = defineField('businessEmail');
const [country] = defineField('country');
const [companyWebsite] = defineField('companyWebsite');
const [serviceNeeds] = defineField('serviceNeeds');
const [companySize] = defineField('companySize');
const [budgetRange] = defineField('budgetRange');
const [source] = defineField('source');
const [projectTitle] = defineField('projectTitle');
const [projectDescription] = defineField('projectDescription');
const [problemToSolve] = defineField('problemToSolve');
const [projectTimeline] = defineField('projectTimeline');
const [currentStage] = defineField('currentStage');
const [agreeToTerms] = defineField('agreeToTerms');
const [sendUpdates] = defineField('sendUpdates');
const [agreeToNda] = defineField('agreeToNda');

const currentStepIndex = computed(() => {
  const index = steps.findIndex((step) => step.id === props.stepId);
  return index === -1 ? 0 : index;
});
const currentStep = computed(() => steps[currentStepIndex.value]);
const currentStepFields = computed(() => currentStep.value?.fields || []);
const isFinalStep = computed(() => currentStepIndex.value === steps.length - 1);

const reviewGroups = computed(() => [
  {
    title: 'Business',
    rows: [
      ['Business name', values.businessName],
      ['Industry', values.industry],
      ['Contact', `${values.firstName} ${values.lastName}`.trim()],
      ['Email', values.businessEmail],
      ['Phone', values.phone],
      ['Country', values.country],
      [
        'Website',
        isValidWebsiteInput(values.companyWebsite)
          ? `https://${values.companyWebsite}`
          : 'Not provided',
      ],
    ] as [string, string][],
  },
  {
    title: 'Needs',
    rows: [
      ['Services', values.serviceNeeds.join(', ')],
      ['Company size', values.companySize],
      ['Budget', values.budgetRange],
      ['Lead source', values.source],
    ] as [string, string][],
  },
  {
    title: 'Project',
    rows: [
      ['Title', values.projectTitle],
      ['Description', values.projectDescription],
      ['Timeline', values.projectTimeline],
      ['Stage', values.currentStage],
    ] as [string, string][],
  },
]);

watch(
  values,
  (nextValues) => {
    void businessDraft.save(structuredClone(toRaw(nextValues)));
  },
  { deep: true }
);

watch(
  () => values.serviceNeeds,
  (serviceNeeds) => {
    setFieldValue('primaryService', serviceNeeds[0] || '');
  },
  { immediate: true }
);

const hasValidated = ref(false);

const invalidStepIds = computed<string[]>(() => {
  if (!hasValidated.value) return [];

  const result = fullSchema.safeParse(values);

  if (result.success) return [];

  const invalidSteps: string[] = [];

  // Only check steps up to and including the current step
  for (let i = 0; i <= currentStepIndex.value; i++) {
    const stepItem = steps[i];
    const fieldSet = new Set(stepItem?.fields || []);
    const stepHasIssue = result.error.issues.some((issue) => {
      return fieldSet.has(issue.path[0] as StepField);
    });

    if (stepHasIssue) {
      invalidSteps.push(stepItem?.id || '');
    }
  }

  return invalidSteps;
});

const firstIncompleteStepId = computed(() => getFirstInvalidStepId(steps, values, fullSchema));
const maxAccessibleStepIndex = computed(() => {
  if (firstIncompleteStepId.value === undefined) return steps.length - 1;

  return steps.findIndex((step) => step.id === firstIncompleteStepId.value);
});

function markTouched(fields: StepField[]) {
  for (const field of fields) {
    setFieldTouched(field, true);
  }
}

async function validateFields(fields: StepField[]) {
  const result = await fullSchema.safeParseAsync(values);
  const fieldSet = new Set(fields);
  let hasErrors = false;

  for (const field of fields) {
    setFieldError(field, undefined);
  }

  if (!result.success) {
    for (const issue of result.error.issues) {
      const field = issue.path[0] as StepField | undefined;

      if (field && fieldSet.has(field)) {
        setFieldError(field, issue.message);
        hasErrors = true;
      }
    }
  }

  markTouched(fields);
  return !hasErrors;
}

async function validatePreviousSteps() {
  const result = await fullSchema.safeParseAsync(values);
  if (result.success) {
    return true;
  }

  // Check if there are any errors in previous steps
  for (let i = 0; i < currentStepIndex.value; i++) {
    const stepItem = steps[i];
    const fieldSet = new Set(stepItem?.fields || []);
    const stepHasIssue = result.error.issues.some((issue) => {
      return fieldSet.has(issue.path[0] as StepField);
    });
    if (stepHasIssue) {
      return false;
    }
  }

  return true;
}

async function onNext() {
  hasValidated.value = true;
  const previousStepsValid = await validatePreviousSteps();
  const currentStepValid = await validateFields([
    ...(currentStepFields?.value || []),
  ] as (keyof BusinessRegistrationFormValues)[]);

  if (previousStepsValid && currentStepValid) {
    await businessDraft.save(structuredClone(toRaw(values)));

    const nextStep = steps[currentStepIndex.value + 1];
    if (nextStep) {
      await router.push(`/register/business/${nextStep.id}`);
    }
  }
}

async function onBack() {
  if (isSubmitting.value || currentStepIndex.value === 0) return;

  const previousStep = steps[currentStepIndex.value - 1];
  if (previousStep) {
    await router.replace(`/register/business/${previousStep.id}`);
  }
}

const onSubmit = handleSubmit(
  async (
    { companyWebsite, agreeToNda: _agreeToNda, agreeToTerms: _agreeToTerms, ...formValues },
    actions
  ) => {
    hasValidated.value = true;

    try {
      await $api<SuccessResponse>('/businesses', {
        method: 'POST',
        body: {
          ...formValues,
          ...(isValidWebsiteInput(companyWebsite) && {
            companyWebsite: `https://${normalizeWebsiteInput(companyWebsite)}`,
          }),
        },
      });

      await businessDraft.clear();
      resetForm({ values: structuredClone(toRaw(businessRegistrationDefaultValues)) });
      markAsSubmitted('business-registration');

      await router.replace('/register/business/success');
    } catch (err) {
      const failure = normalizeApiError(err);
      actions.setErrors(pickFormErrors(failure.fieldErrors, businessFields));
      notifyApiFailure(failure);
    }
  }
);
</script>

<template>
  <form class="space-y-12 xl:space-y-16" @submit="onSubmit">
    <header>
      <PagesRegisterStepNavigation
        type="business"
        :current-step-id="currentStep?.id"
        :steps="steps"
        :invalid-step-ids="invalidStepIds"
        :max-accessible-step-index="maxAccessibleStepIndex"
        :disabled="isSubmitting"
      />
    </header>

    <section class="bg-background rounded-lg border p-5 lg:p-6">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold">{{ currentStep?.title }}</h2>
        <p class="text-muted-foreground mt-2">{{ currentStep?.description }}</p>
      </div>

      <PagesRegisterBusinessIdentityStep
        v-if="currentStep?.id === 'business-profile'"
        v-model:business-name="businessName"
        v-model:industry="industry"
        v-model:first-name="firstName"
        v-model:last-name="lastName"
        v-model:business-email="businessEmail"
        v-model:country="country"
        v-model:company-website="companyWebsite"
        :errors="errors"
      />

      <PagesRegisterBusinessNeedsStep
        v-else-if="currentStep?.id === 'needs-and-budget'"
        v-model:service-needs="serviceNeeds"
        v-model:company-size="companySize"
        v-model:budget-range="budgetRange"
        v-model:source="source"
        :errors="errors"
        :disabled="isSubmitting"
      />

      <PagesRegisterBusinessProjectStep
        v-else-if="currentStep?.id === 'project-brief'"
        v-model:project-title="projectTitle"
        v-model:project-description="projectDescription"
        v-model:problem-to-solve="problemToSolve"
        v-model:project-timeline="projectTimeline"
        v-model:current-stage="currentStage"
        :errors="errors"
        :disabled="isSubmitting"
      />

      <PagesRegisterBusinessReviewStep
        v-else-if="currentStep?.id === 'review-and-consent'"
        v-model:agree-to-terms="agreeToTerms"
        v-model:send-updates="sendUpdates"
        v-model:agree-to-nda="agreeToNda"
        :errors="errors"
        :review-groups="reviewGroups"
        :disabled="isSubmitting"
      />
    </section>

    <footer
      class="grid grid-cols-[auto_1fr] gap-3 text-lg leading-snug font-medium *:rounded-md *:p-2.5 sm:gap-4"
    >
      <button
        v-if="currentStepIndex > 0"
        type="button"
        class="flex items-center gap-2 border"
        :disabled="isSubmitting"
        @click="onBack"
      >
        <Icon icon="hugeicons:arrow-left-02" class="text-[1.25em]" />
        Back
      </button>

      <button
        v-if="isFinalStep"
        type="submit"
        :class="[
          'flex items-center justify-center bg-[#05DED5]',
          { 'col-span-full': currentStepIndex === 0 },
        ]"
        :disabled="isSubmitting"
      >
        <template v-if="isSubmitting">
          Submitting
          <Icon icon="svg-spinners:3-dots-fade" class="mb-[-0.25lh] text-[1.25em]" />
        </template>
        <template v-else>Submit registration</template>
      </button>

      <button
        v-else
        type="button"
        :class="['bg-[#05DED5]', { 'col-span-full': currentStepIndex === 0 }]"
        :disabled="isSubmitting"
        @click="onNext"
      >
        Continue
      </button>
    </footer>
  </form>
</template>
