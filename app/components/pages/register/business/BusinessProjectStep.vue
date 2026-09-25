<script setup lang="ts">
defineProps<{
  errors: Partial<Record<string, string>>;
  disabled?: boolean;
}>();

const projectTitle = defineModel<string>('projectTitle', { required: true });
const projectDescription = defineModel<string>('projectDescription', { required: true });
const problemToSolve = defineModel<string>('problemToSolve', { required: true });
const projectTimeline = defineModel<string>('projectTimeline', { required: true });
const currentStage = defineModel<string>('currentStage', { required: true });
</script>

<template>
  <FieldGroup class="gap-6">
    <Field :data-invalid="!!errors.projectTitle">
      <FieldLabel for="register-project-title">Project Title</FieldLabel>
      <Input id="register-project-title" v-model="projectTitle" :disabled="disabled" />
      <FieldError v-if="errors.projectTitle">{{ errors.projectTitle }}</FieldError>
    </Field>

    <Field :data-invalid="!!errors.projectDescription">
      <FieldLabel for="register-project-description">Project Description</FieldLabel>
      <Textarea
        id="register-project-description"
        v-model="projectDescription"
        :disabled="disabled"
        :rows="6"
        placeholder="Describe the goals, audience, deliverables, constraints, and what success looks like."
      />
      <FieldError v-if="errors.projectDescription">{{ errors.projectDescription }}</FieldError>
    </Field>

    <Field :data-invalid="!!errors.problemToSolve">
      <FieldLabel for="register-problem-to-solve">Problem to Solve</FieldLabel>
      <Textarea
        id="register-problem-to-solve"
        v-model="problemToSolve"
        :disabled="disabled"
        :rows="4"
        placeholder="What specific problem are you trying to solve with this project?"
      />
      <FieldError v-if="errors.problemToSolve">{{ errors.problemToSolve }}</FieldError>
    </Field>

    <div class="grid gap-6 md:grid-cols-2">
      <Field :data-invalid="!!errors.projectTimeline">
        <FieldLabel>Project Timeline</FieldLabel>
        <SharedTimelineCombobox v-model="projectTimeline" :disabled="disabled" />
        <FieldError v-if="errors.projectTimeline">{{ errors.projectTimeline }}</FieldError>
      </Field>

      <Field :data-invalid="!!errors.currentStage">
        <FieldLabel>Current Stage</FieldLabel>
        <SharedStageCombobox v-model="currentStage" :disabled="disabled" />
        <FieldError v-if="errors.currentStage">{{ errors.currentStage }}</FieldError>
      </Field>
    </div>
  </FieldGroup>
</template>
