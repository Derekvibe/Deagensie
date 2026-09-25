<script setup lang="ts">
import { registrationFlows } from '~/lib/register/flows';
import type { SuccessResponse } from '~/types/api';
import { toTypedSchema } from '@vee-validate/zod';
import { Icon } from '@iconify/vue';
import { useForm } from 'vee-validate';
import { normalizeApiError, notifyApiFailure, pickFormErrors } from '~/utils/api-errors';
import { normalizeBehanceInput, isValidWebsiteInput, normalizeWebsiteInput } from '~/lib/utils';
import {
  creativeRegistrationDefaultValues,
  creativeRegistrationSchema,
  getFirstInvalidStepId,
  type CreativeRegistrationFormValues,
} from '~/lib/register/progress';

type StepField = keyof CreativeRegistrationFormValues;

const props = defineProps<{
  stepId: string;
}>();

const router = useRouter();
const { $api } = useNuxtApp();
const { markAsSubmitted } = useFormSubmissionState();

const steps = registrationFlows.creative.steps;
const creativeDraft = useCreativeRegistrationDraft();
await creativeDraft.ready;

const fullSchema = creativeRegistrationSchema;

const creativeFields = steps.flatMap((step) => step.fields) as StepField[];

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
} = useForm<CreativeRegistrationFormValues>({
  validationSchema: toTypedSchema(fullSchema),
  initialValues: creativeDraft.data.value,
});

const [firstName] = defineField('firstName');
const [lastName] = defineField('lastName');
const [email] = defineField('email');
const [phone] = defineField('phone');
const [country] = defineField('country');
const [city] = defineField('city');
const [primaryRole] = defineField('primaryRole');
const [additionalSkills] = defineField('additionalSkills');
const [portfolioUrl] = defineField('portfolioUrl');
const [behanceProfile] = defineField('behanceProfile');
const [referralSource] = defineField('referralSource');
const [yearsOfExperience] = defineField('yearsOfExperience');
const [bio] = defineField('bio');
const [availability] = defineField('availability');
const [hourlyRateUsd] = defineField('hourlyRateUsd');
const [agreeToTerms] = defineField('agreeToTerms');
const [sendUpdates] = defineField('sendUpdates');

const resume = computed({
  get: () => values.resume,
  set: (file: File | undefined) => {
    setFieldValue('resume', file);
  },
});

const currentStepIndex = computed(() => {
  const index = steps.findIndex((step) => step.id === props.stepId);
  return index === -1 ? 0 : index;
});
const currentStep = computed(() => steps[currentStepIndex.value] || steps[0]);
const currentStepFields = computed(() => currentStep.value?.fields as StepField[]);
const isFinalStep = computed(() => currentStepIndex.value === steps.length - 1);

const reviewGroups = computed(() => [
  {
    title: 'Profile',
    rows: [
      ['Name', `${values.firstName} ${values.lastName}`.trim()],
      ['Email', values.email],
      ['Phone', values.phone],
      ['Location', `${values.city}, ${values.country}`],
    ] as [string, string][],
  },
  {
    title: 'Portfolio',
    rows: [
      ['Role', values.primaryRole],
      ['Skills', values.additionalSkills.join(', ')],
      ['Portfolio', values.portfolioUrl],
      [
        'Behance',
        normalizeBehanceInput(values.behanceProfile)?.trim()
          ? `https://behance.net/${normalizeBehanceInput(values.behanceProfile)}`
          : 'Not provided',
      ],
      ['Referral', values.referralSource],
    ] as [string, string][],
  },
  {
    title: 'Experience',
    rows: [
      ['Years of experience', String(values.yearsOfExperience)],
      ['Availability', values.availability],
      ['Hourly rate', `$${values.hourlyRateUsd}/hr`],
      ['Bio', values.bio],
    ] as [string, string][],
  },
]);

watch(
  values,
  (nextValues) => {
    void creativeDraft.save(structuredClone(toRaw(nextValues)));
  },
  { deep: true }
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
  const currentStepValid = await validateFields(currentStepFields.value);

  if (previousStepsValid && currentStepValid) {
    await creativeDraft.save(structuredClone(toRaw(values)));

    const nextStep = steps[currentStepIndex.value + 1];
    if (nextStep) {
      await router.push(`/register/creative/${nextStep.id}`);
    }
  }
}

async function onBack() {
  if (isSubmitting.value || currentStepIndex.value === 0) return;

  const previousStep = steps[currentStepIndex.value - 1];
  if (previousStep) {
    await router.replace(`/register/creative/${previousStep.id}`);
  }
}

const onSubmit = handleSubmit(
  async ({ portfolioUrl, behanceProfile, agreeToTerms: _agreeToTerms, ...formValues }, actions) => {
    hasValidated.value = true;

    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries({
        ...formValues,
        ...(isValidWebsiteInput(portfolioUrl) && {
          portfolioUrl: `https://${normalizeWebsiteInput(portfolioUrl)}`,
        }),
        ...(normalizeBehanceInput(values.behanceProfile)?.trim() && {
          behanceProfile: `https://behance.net/${normalizeBehanceInput(values.behanceProfile)}`,
        }),
      })) {
        if (value instanceof File) {
          formData.append(key, value, value.name);
        } else if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      }

      await $api<SuccessResponse>('/creatives', {
        method: 'POST',
        body: formData,
      });

      await creativeDraft.clear();
      resetForm({ values: structuredClone(toRaw(creativeRegistrationDefaultValues)) });
      markAsSubmitted('creative-registration');

      await router.replace('/register/creative/success');
    } catch (err) {
      const failure = normalizeApiError(err);
      actions.setErrors(pickFormErrors(failure.fieldErrors, creativeFields));
      notifyApiFailure(failure);
    }
  }
);
</script>

<template>
  <form class="space-y-12 xl:space-y-16" @submit="onSubmit">
    <header>
      <PagesRegisterStepNavigation
        type="creative"
        :current-step-id="currentStep?.id"
        :steps="steps"
        :invalid-step-ids="invalidStepIds"
        :max-accessible-step-index="maxAccessibleStepIndex"
        :disabled="isSubmitting"
      />
    </header>

    <section class="bg-background rounded-lg border p-5 lg:p-6">
      <div class="mb-6">
        <h2 class="text-sm font-medium text-[#04308F]">{{ currentStep?.subTitle }}</h2>
        <h2 class="text-xl font-medium text-[#1B1C1C]">{{ currentStep?.title }}</h2>
        <p class="text-muted-foreground mt-2">{{ currentStep?.description }}</p>
      </div>

      <PagesRegisterCreativeProfileStep
        v-if="currentStep?.id === 'profile'"
        v-model:first-name="firstName"
        v-model:last-name="lastName"
        v-model:email="email"
        v-model:phone="phone"
        v-model:country="country"
        v-model:city="city"
        :errors="errors"
        :disabled="isSubmitting"
      />

      <PagesRegisterCreativePortfolioStep
        v-else-if="currentStep?.id === 'portfolio'"
        v-model:primary-role="primaryRole"
        v-model:additional-skills="additionalSkills"
        v-model:portfolio-url="portfolioUrl"
        v-model:behance-profile="behanceProfile"
        v-model:referral-source="referralSource"
        :errors="errors"
        :disabled="isSubmitting"
      />

      <PagesRegisterCreativeExperienceStep
        v-else-if="currentStep?.id === 'experience'"
        v-model:years-of-experience="yearsOfExperience"
        v-model:bio="bio"
        v-model:availability="availability"
        v-model:hourly-rate-usd="hourlyRateUsd"
        v-model:resume="resume"
        :show-validation-errors="hasValidated"
        :errors="errors"
        :disabled="isSubmitting"
      />

      <PagesRegisterCreativeReviewStep
        v-else-if="currentStep?.id === 'review'"
        v-model:agree-to-terms="agreeToTerms"
        v-model:send-updates="sendUpdates"
        :review-groups="reviewGroups"
        :errors="errors"
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
          Joining
          <Icon icon="svg-spinners:3-dots-fade" class="mb-[-0.25lh] text-[1.25em]" />
        </template>
        <template v-else>Join community</template>
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
