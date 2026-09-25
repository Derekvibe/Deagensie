<script setup lang="ts">
defineProps<{
  errors: Partial<Record<string, string>>;
  disabled?: boolean;
}>();

const serviceNeeds = defineModel<string[]>('serviceNeeds', { required: true });
const companySize = defineModel<string>('companySize', { required: true });
const source = defineModel<string | undefined>('source', { required: false });
const budgetRange = defineModel<string>('budgetRange', { required: true });
</script>

<template>
  <FieldGroup class="gap-6">
    <Field :data-invalid="!!errors.serviceNeeds">
      <FieldLabel>Service Needs</FieldLabel>
      <PagesRegisterBusinessServiceNeedsCombobox
        v-model="serviceNeeds"
        :disabled="disabled"
        placeholder="Choose services"
      />
      <FieldError v-if="errors.serviceNeeds">{{ errors.serviceNeeds }}</FieldError>
    </Field>

    <div class="grid gap-6 md:grid-cols-2">
      <Field :data-invalid="!!errors.companySize">
        <FieldLabel for="register-company-size">Company Size</FieldLabel>

        <Select v-model="companySize" :disabled="disabled">
          <SelectTrigger id="register-company-size">
            <SelectValue placeholder="Select company size" />
          </SelectTrigger>
          <SelectContent class="w-(--reka-select-trigger-width)">
            <SelectItem value="1-10">1-10 employees</SelectItem>
            <SelectItem value="11-50">11-50 employees</SelectItem>
            <SelectItem value="51-200">51-200 employees</SelectItem>
            <SelectItem value="201-500">201-500 employees</SelectItem>
            <SelectItem value="500+">500+ employees</SelectItem>
          </SelectContent>
        </Select>

        <FieldError v-if="errors.companySize">{{ errors.companySize }}</FieldError>
      </Field>

      <Field :data-invalid="!!errors.source">
        <FieldLabel>How did you hear about us?</FieldLabel>
        <SharedLeadSourceCombobox
          :model-value="source ?? ''"
          :disabled="disabled"
          @update:model-value="source = $event"
        />
        <FieldError v-if="errors.source">{{ errors.source }}</FieldError>
      </Field>
    </div>

    <Field :data-invalid="!!errors.budgetRange">
      <FieldLabel for="register-budget">Project Budget</FieldLabel>

      <Select v-model="budgetRange" :disabled="disabled">
        <SelectTrigger id="register-budget">
          <SelectValue placeholder="Select budget range" />
        </SelectTrigger>
        <SelectContent class="w-(--reka-select-trigger-width)">
          <SelectItem value="bronze">Bronze (Under 500K)</SelectItem>
          <SelectItem value="silver">Silver (500K-999K)</SelectItem>
          <SelectItem value="gold">Gold (1M-3.5M)</SelectItem>
          <SelectItem value="platinum">Platinum (3.5M-5M)</SelectItem>
          <SelectItem value="enterprise">Enterprise (5M+)</SelectItem>
        </SelectContent>
      </Select>

      <FieldError v-if="errors.budgetRange">{{ errors.budgetRange }}</FieldError>
    </Field>
  </FieldGroup>
</template>
