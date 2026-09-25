<script setup lang="ts">
import {
  NumberFieldRoot,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
} from 'reka-ui';
import { Icon } from '@iconify/vue';
import { useDropZone } from '@vueuse/core';

const props = defineProps<{
  errors: Partial<Record<string, string>>;
  disabled?: boolean;
  showValidationErrors?: boolean;
}>();

const yearsOfExperience = defineModel<number>('yearsOfExperience', { required: true });
const bio = defineModel<string>('bio', { required: true });
const availability = defineModel<string>('availability', { required: true });
const hourlyRateUsd = defineModel<number>('hourlyRateUsd', { required: true });
const resume = defineModel<File | undefined>('resume', { required: true });

const maxResumeSize = 10 * 1024 * 1024;
const acceptedResumeTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const;
const acceptedResumeExtensions = ['pdf', 'doc', 'docx'];
const acceptedResumeInputTypes = [
  ...acceptedResumeTypes,
  ...acceptedResumeExtensions.map((extension) => `.${extension}`),
].join(',');

interface ResumeDisplayState {
  name: string;
  size: number;
  lastModified: number;
}

const selectedResume = shallowRef<File | undefined>(resume.value);
const resumeDisplay = ref<ResumeDisplayState>();
const resumeInput = ref<HTMLInputElement | null>(null);
const dropZone = ref<HTMLElement | null>(null);
const localResumeError = ref('');
const pendingReplacementFile = ref<File>();
const replaceDialogOpen = ref(false);

const { isOverDropZone } = useDropZone(dropZone, {
  multiple: false,
  preventDefaultForUnhandled: true,
  onDrop(files, event) {
    if (props.disabled) return;

    const droppedFiles = Array.from(event.dataTransfer?.files || files || []);
    handleResumeFiles(droppedFiles);
  },
});

watch(
  resume,
  (nextResume) => {
    if (!nextResume) {
      selectedResume.value = undefined;
      resumeDisplay.value = undefined;
      return;
    }

    if (!selectedResume.value || isSameFile(selectedResume.value, nextResume)) {
      selectedResume.value = nextResume;
      resumeDisplay.value = getResumeDisplayState(nextResume);
    }
  },
  { immediate: true }
);

const resumeError = computed(
  () => localResumeError.value || (props.showValidationErrors ? props.errors.resume : '')
);
const resumeFileSize = computed(() =>
  resumeDisplay.value ? formatFileSize(resumeDisplay.value.size) : ''
);
const pendingReplacementFileSize = computed(() =>
  pendingReplacementFile.value ? formatFileSize(pendingReplacementFile.value.size) : ''
);
const replacementDescription = computed(() => {
  if (!pendingReplacementFile.value) return '';

  const size = pendingReplacementFileSize.value ? ` (${pendingReplacementFileSize.value})` : '';

  return `Replace ${resumeDisplay.value?.name || selectedResume.value?.name} with ${pendingReplacementFile.value.name}${size}?`;
});

function openResumePicker() {
  if (props.disabled) return;
  resumeInput.value?.click();
}

function onResumeChange(event: Event) {
  const input = event.target as HTMLInputElement;
  handleResumeFiles(Array.from(input.files || []));
  input.value = '';
}

function handleResumeFiles(files: File[]) {
  localResumeError.value = '';

  if (files.length === 0) return;

  if (files.length > 1) {
    localResumeError.value = 'Upload one resume or CV file at a time.';
    return;
  }

  const [file] = files;
  const validationError = file ? validateResumeFile(file) : 'Choose a resume or CV file.';

  if (validationError || !file) {
    localResumeError.value = validationError;
    return;
  }

  if (selectedResume.value) {
    if (isSameFile(selectedResume.value, file)) return;

    pendingReplacementFile.value = file;
    replaceDialogOpen.value = true;
    return;
  }

  setResumeFile(file);
}

function setResumeFile(file: File) {
  selectedResume.value = file;
  resumeDisplay.value = getResumeDisplayState(file);
  resume.value = file;
  localResumeError.value = '';
  pendingReplacementFile.value = undefined;
}

function confirmResumeReplacement() {
  if (pendingReplacementFile.value) {
    setResumeFile(pendingReplacementFile.value);
  }

  replaceDialogOpen.value = false;
}

function cancelResumeReplacement() {
  pendingReplacementFile.value = undefined;
  replaceDialogOpen.value = false;
}

function onReplaceDialogOpenChange(open: boolean) {
  replaceDialogOpen.value = open;
}

function removeResume() {
  selectedResume.value = undefined;
  resumeDisplay.value = undefined;
  resume.value = undefined;
  pendingReplacementFile.value = undefined;
  localResumeError.value = '';

  if (resumeInput.value) {
    resumeInput.value.value = '';
  }
}

function validateResumeFile(file: File) {
  const extension = getFileExtension(file.name);
  const hasAcceptedType = acceptedResumeTypes.includes(
    file.type as (typeof acceptedResumeTypes)[number]
  );
  const hasAcceptedExtension = acceptedResumeExtensions.includes(extension);

  if (!hasAcceptedType && !hasAcceptedExtension) {
    return 'Upload a PDF, DOC, or DOCX file.';
  }

  if (file.size <= 0) {
    return 'This file appears to be empty. Choose another resume or CV.';
  }

  if (file.size > maxResumeSize) {
    return 'File size must be less than 10MB.';
  }

  return '';
}

function getFileExtension(fileName: string) {
  return fileName.split('.').pop()?.toLowerCase() || '';
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function getResumeDisplayState(file: File): ResumeDisplayState {
  return {
    name: file.name,
    size: file.size,
    lastModified: file.lastModified,
  };
}

function isSameFile(currentFile: File, nextFile: File) {
  return (
    currentFile.name === nextFile.name &&
    currentFile.size === nextFile.size &&
    currentFile.lastModified === nextFile.lastModified
  );
}
</script>

<template>
  <FieldGroup class="gap-6">
    <Field :data-invalid="!!errors.yearsOfExperience">
      <FieldLabel for="creative-years-of-experience">Years of Experience</FieldLabel>
      <NumberFieldRoot
        id="creative-years-of-experience"
        v-model="yearsOfExperience"
        :min="0"
        :step="1"
        :disabled="disabled"
        class="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-ring/50 in-aria-invalid:ring-destructive/20 in-aria-invalid:border-destructive flex h-9 w-full min-w-0 rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none has-[input:disabled]:pointer-events-none has-[input:disabled]:cursor-default has-[input:disabled]:opacity-50 has-[input:focus-visible]:ring-[3px] md:text-sm"
      >
        <NumberFieldDecrement
          aria-label="Decrease years"
          class="grid aspect-square h-full place-items-center"
        >
          <Icon icon="hugeicons:minus-sign" />
        </NumberFieldDecrement>
        <NumberFieldInput class="ring-none flex-1 border-none px-3 py-1 text-center outline-none" />
        <NumberFieldIncrement
          aria-label="Increase years"
          class="grid aspect-square h-full place-items-center"
        >
          <Icon icon="hugeicons:plus-sign" />
        </NumberFieldIncrement>
      </NumberFieldRoot>
      <FieldError v-if="errors.yearsOfExperience">{{ errors.yearsOfExperience }}</FieldError>
    </Field>

    <Field :data-invalid="!!errors.bio">
      <FieldLabel for="creative-bio">Professional Bio</FieldLabel>
      <Textarea
        id="creative-bio"
        v-model="bio"
        placeholder="Tell us about your background, experience, and what makes you unique..."
        rows="4"
        :disabled="disabled"
      />
      <FieldError v-if="errors.bio">{{ errors.bio }}</FieldError>
    </Field>

    <Field :data-invalid="!!errors.availability">
      <FieldLabel for="creative-availability">Availability</FieldLabel>
      <Select id="creative-availability" v-model="availability" :disabled="disabled">
        <SelectTrigger>
          <SelectValue placeholder="Select your availability" />
        </SelectTrigger>
        <SelectContent class="w-(--reka-select-trigger-width)">
          <SelectItem value="full_time">Full-time</SelectItem>
          <SelectItem value="part_time">Part-time</SelectItem>
          <SelectItem value="contract">Contract</SelectItem>
          <SelectItem value="project_based">Project-based</SelectItem>
        </SelectContent>
      </Select>
      <FieldError v-if="errors.availability">{{ errors.availability }}</FieldError>
    </Field>

    <Field :data-invalid="!!errors.hourlyRateUsd">
      <FieldLabel for="creative-hourly-rate">Hourly Rate (USD)</FieldLabel>
      <NumberFieldRoot
        id="creative-hourly-rate"
        v-model="hourlyRateUsd"
        :min="0"
        :step="0.01"
        placeholder="0.00"
        :disabled="disabled"
        class="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-ring/50 in-aria-invalid:ring-destructive/20 in-aria-invalid:border-destructive flex h-9 w-full min-w-0 rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none has-[input:disabled]:pointer-events-none has-[input:disabled]:cursor-default has-[input:disabled]:opacity-50 has-[input:focus-visible]:ring-[3px] md:text-sm"
      >
        <NumberFieldDecrement
          aria-label="Decrease years"
          class="grid aspect-square h-full place-items-center"
        >
          <Icon icon="hugeicons:minus-sign" />
        </NumberFieldDecrement>
        <NumberFieldInput class="ring-none flex-1 border-none px-3 py-1 text-center outline-none" />
        <NumberFieldIncrement
          aria-label="Increase years"
          class="grid aspect-square h-full place-items-center"
        >
          <Icon icon="hugeicons:plus-sign" />
        </NumberFieldIncrement>
      </NumberFieldRoot>
      <FieldError v-if="errors.hourlyRateUsd">{{ errors.hourlyRateUsd }}</FieldError>
    </Field>

    <Field :data-invalid="!!resumeError">
      <FieldLabel for="creative-resume-upload">Resume/CV</FieldLabel>
      <p id="creative-resume-help" class="sr-only">Upload a PDF, DOC, or DOCX resume up to 10MB.</p>
      <div
        ref="dropZone"
        :role="selectedResume ? undefined : 'button'"
        :tabindex="selectedResume ? undefined : 0"
        :aria-disabled="disabled"
        :aria-invalid="!!resumeError"
        aria-describedby="creative-resume-help"
        :class="[
          'group focus-visible:border-ring focus-visible:ring-ring/50 relative flex min-h-40 w-full cursor-pointer flex-col items-center justify-center rounded-[calc(var(--radius)+2px)] border border-dashed p-6 text-center transition-colors outline-none focus-visible:ring-[3px]',
          selectedResume
            ? 'border-[#04308F] bg-[#04308F]/5'
            : 'border-[#04308F]/70 bg-[#04308F]/3 hover:bg-[#04308F]/6',
          isOverDropZone && !disabled
            ? 'border-[#05DED5] bg-[#05DED5]/12 ring-2 ring-[#05DED5]/40'
            : '',
          resumeError ? 'border-destructive ring-destructive/20' : '',
          disabled ? 'pointer-events-none cursor-default opacity-50' : '',
        ]"
        @click="!selectedResume && openResumePicker()"
        @keydown.enter.prevent="!selectedResume && openResumePicker()"
        @keydown.space.prevent="!selectedResume && openResumePicker()"
      >
        <input
          id="creative-resume-upload"
          ref="resumeInput"
          type="file"
          class="sr-only"
          :accept="acceptedResumeInputTypes"
          :disabled="disabled"
          @change="onResumeChange"
        />

        <template v-if="isOverDropZone && !disabled">
          <span
            class="grid size-12 place-items-center rounded-full bg-[#05DED5]/20 text-2xl text-[#04308F]"
          >
            <Icon icon="hugeicons:download-04" />
          </span>
          <p class="mt-4 text-base font-semibold text-slate-950">
            {{ selectedResume ? 'Drop to review replacement' : 'Drop your resume here' }}
          </p>
          <p class="mt-1 text-sm text-slate-600">Release to attach the file.</p>
        </template>

        <template v-else-if="selectedResume">
          <span
            class="grid size-12 place-items-center rounded-full bg-[#04308F]/10 text-2xl text-[#04308F]"
          >
            <Icon icon="hugeicons:file-01" />
          </span>
          <div class="mt-4 max-w-full">
            <p class="truncate text-base font-semibold text-slate-950">
              {{ resumeDisplay?.name || selectedResume.name }}
            </p>
            <p class="mt-1 text-sm text-slate-600">{{ resumeFileSize }}</p>
          </div>
          <div class="mt-5 flex flex-wrap justify-center gap-3">
            <Button type="button" size="sm" variant="outline" @click.stop="openResumePicker">
              Replace file
            </Button>
            <Button type="button" size="sm" variant="ghost" @click.stop="removeResume">
              Remove
            </Button>
          </div>
        </template>

        <template v-else>
          <span
            class="grid size-12 place-items-center rounded-full bg-[#04308F]/10 text-2xl text-[#04308F] transition-colors group-hover:bg-[#04308F]/15"
          >
            <Icon icon="hugeicons:upload-04" />
          </span>
          <p class="mt-4 text-base font-semibold text-slate-950">Drag and drop your resume</p>
          <p class="mt-1 text-sm text-slate-600">or click to select a file</p>
          <p class="mt-3 text-xs text-slate-500">PDF, DOC, or DOCX. Max 10MB.</p>
        </template>
      </div>
      <FieldError v-if="resumeError">{{ resumeError }}</FieldError>
    </Field>
  </FieldGroup>

  <AlertDialog :open="replaceDialogOpen" @update:open="onReplaceDialogOpenChange">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Replace resume?</AlertDialogTitle>
        <AlertDialogDescription>{{ replacementDescription }}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel type="button" @click="cancelResumeReplacement">Cancel</AlertDialogCancel>
        <AlertDialogAction type="button" @click="confirmResumeReplacement">
          Replace file
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
