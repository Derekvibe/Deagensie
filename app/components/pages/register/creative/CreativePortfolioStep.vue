<script setup lang="ts">
import { normalizeBehanceInput, normalizeWebsiteInput } from '~/lib/utils';

defineProps<{
  errors: Partial<Record<string, string>>;
  disabled?: boolean;
}>();

const primaryRole = defineModel<string>('primaryRole', { required: true });
const additionalSkills = defineModel<string[]>('additionalSkills', { required: true });
const portfolioUrl = defineModel<string>('portfolioUrl', { required: true });
const behanceProfile = defineModel<string | undefined>('behanceProfile', { required: false });
const referralSource = defineModel<string | undefined>('referralSource', { required: false });

function normalizePortfolioUrl() {
  portfolioUrl.value = normalizeWebsiteInput(portfolioUrl.value || '');
}

function normalizeBehanceHandle() {
  behanceProfile.value = normalizeBehanceInput(behanceProfile.value || '');
}
</script>

<template>
  <FieldGroup class="gap-6">
    <Field :data-invalid="!!errors.primaryRole">
      <FieldLabel for="creative-primary-role">Primary Creative Role</FieldLabel>
      <PagesRegisterCreativeSkillsCombobox
        v-model="primaryRole"
        placeholder="Select company size"
        :disabled="disabled"
      />
      <FieldError v-if="errors.primaryRole">{{ errors.primaryRole }}</FieldError>
    </Field>

    <Field :data-invalid="!!errors.additionalSkills">
      <FieldLabel for="creative-additional-skills">Additional Skills</FieldLabel>
      <PagesRegisterCreativeSkillsCombobox
        v-model="additionalSkills"
        :disabled="disabled"
        :disabled-ids="primaryRole ? [primaryRole] : []"
      />

      <!-- Additional Skills Tags Display -->
      <div v-if="additionalSkills && additionalSkills.length > 0" class="mt-3 flex flex-wrap gap-2">
        <span
          v-for="skill in additionalSkills"
          :key="skill"
          class="inline-flex items-center gap-1.5 rounded-full bg-[#E6EAF4] px-3 py-1.5 text-sm text-[#04308F]"
        >
          {{ skill }}
          <button
            type="button"
            class="ml-1 inline-flex size-4 items-center justify-center rounded-full text-[#04308F] hover:bg-[#04308F]/10"
            :disabled="disabled"
            @click="additionalSkills = additionalSkills.filter((s) => s !== skill)"
          >
            <span class="sr-only">Remove {{ skill }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </span>
      </div>

      <FieldError v-if="errors.additionalSkills">{{ errors.additionalSkills }}</FieldError>
    </Field>

    <Field :data-invalid="!!errors.portfolioUrl">
      <FieldLabel for="creative-portfolio-url">Portfolio URL</FieldLabel>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          id="creative-portfolio-url"
          v-model="portfolioUrl"
          type="text"
          placeholder="yourportfolio.com"
          :disabled="disabled"
          @blur="normalizePortfolioUrl"
        />
      </InputGroup>
      <FieldError v-if="errors.portfolioUrl">{{ errors.portfolioUrl }}</FieldError>
    </Field>

    <Field :data-invalid="!!errors.behanceProfile">
      <FieldLabel for="creative-behance-profile">Behance Profile</FieldLabel>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText>https://behance.net/</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          id="creative-behance-profile"
          v-model="behanceProfile"
          type="text"
          placeholder="yourusername"
          :disabled="disabled"
          @blur="normalizeBehanceHandle"
        />
      </InputGroup>
      <FieldError v-if="errors.behanceProfile">{{ errors.behanceProfile }}</FieldError>
    </Field>

    <Field :data-invalid="!!errors.referralSource">
      <FieldLabel>How did you hear about us?</FieldLabel>
      <SharedLeadSourceCombobox
        :model-value="referralSource ?? ''"
        placeholder="Select how you found us"
        :disabled="disabled"
        @update:model-value="referralSource = $event"
      />
      <FieldError v-if="errors.referralSource">{{ errors.referralSource }}</FieldError>
    </Field>
  </FieldGroup>
</template>
