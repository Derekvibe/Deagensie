<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { watchDebounced, useIntersectionObserver } from '@vueuse/core';
import { skillOptions } from '~/lib/register/skill-options';
import type { PaginatedResponse } from '~/types/api';

interface SkillOption {
  id: string;
  label: string;
}

const props = withDefaults(
  defineProps<{
    modelValue?: string | string[];
    disabled?: boolean;
    placeholder?: string;
    disabledIds?: string[];
  }>(),
  {
    modelValue: () => [],
    disabled: false,
    placeholder: 'Choose skills',
    disabledIds: () => [],
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]];
}>();

const open = ref(false);
const search = ref('');
const skills = ref<SkillOption[]>([]);
const loading = ref(false);
const page = ref(1);
const totalPages = ref(1);
const currentQuery = ref('');
const loadMoreTrigger = useTemplateRef<HTMLElement>('loadMoreTrigger');

const isMultiple = computed(() => Array.isArray(props.modelValue));

const modelValues = computed(() => {
  return isMultiple.value
    ? (props.modelValue as string[])
    : [props.modelValue as string].filter(Boolean);
});

const skillOptionsById = new Map<string, SkillOption>(
  skillOptions.map((skill) => [skill.id, skill] as const)
);

const selectedSkills = computed(() => {
  return modelValues.value
    .map((value) => {
      return skills.value.find((item) => item.id === value) ?? skillOptionsById.get(value);
    })
    .filter(Boolean) as SkillOption[];
});

const canLoadMore = computed(() => page.value < totalPages.value && !loading.value);

const fetchSkills = async (query = '', nextPage = 1, reset = true) => {
  loading.value = true;

  try {
    const response = await $fetch<PaginatedResponse<SkillOption>>('/api/skills', {
      query: {
        q: query,
        page: nextPage,
      },
    });

    currentQuery.value = query;

    if (reset) {
      skills.value = response.data;
    } else {
      skills.value = [...skills.value, ...response.data];
    }
    page.value = response.pagination.page;
    totalPages.value = response.pagination.totalPages;
  } finally {
    loading.value = false;
  }
};

watch(
  open,
  (isOpen) => {
    if (isOpen) {
      void fetchSkills(search.value);
    }
  },
  { immediate: true }
);

watchDebounced(
  search,
  (query) => {
    if (open.value) {
      void fetchSkills(query);
    }
  },
  { debounce: 250 }
);

const loadMore = async () => {
  if (!canLoadMore.value) return;
  await fetchSkills(currentQuery.value, page.value + 1, false);
};

useIntersectionObserver(
  loadMoreTrigger,
  ([entry]) => {
    if (entry?.isIntersecting && canLoadMore.value) {
      void loadMore();
    }
  },
  { threshold: 0.1 }
);

const isDisabledSkill = (id: string) => props.disabledIds?.includes(id);

function toggleSkill(value: string) {
  if (isDisabledSkill(value) || props.disabled) return;

  if (!isMultiple.value) {
    emit('update:modelValue', value);
    open.value = false;
    return;
  }

  const next = new Set(modelValues.value);

  if (next.has(value)) {
    next.delete(value);
  } else {
    next.add(value);
  }

  emit('update:modelValue', Array.from(next));
}

function removeSkill(value: string) {
  if (props.disabled) return;

  if (!isMultiple.value) {
    emit('update:modelValue', '');
  } else {
    emit(
      'update:modelValue',
      modelValues.value.filter((skill) => skill !== value)
    );
  }
}
</script>

<template>
  <div>
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          :aria-expanded="open"
          :disabled="props.disabled"
          class="w-full justify-between font-normal"
        >
          <span class="truncate" :class="{ 'text-muted-foreground': !selectedSkills.length }">
            {{
              isMultiple && selectedSkills.length
                ? `${selectedSkills.length} selected`
                : selectedSkills.length
                  ? selectedSkills[0]?.label
                  : props.placeholder
            }}
          </span>
          <Icon icon="hugeicons:chevrons-down-up" class="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent class="w-(--reka-popover-trigger-width) p-0">
        <Command :should-filter="false">
          <CommandInput v-model="search" placeholder="Search skills..." />
          <CommandList>
            <CommandEmpty> No skills found. </CommandEmpty>
            <CommandGroup>
              <CommandItem
                v-for="skill in skills"
                :key="skill.id"
                :value="skill.id"
                class="justify-between"
                :class="{ 'cursor-default opacity-50': isDisabledSkill(skill.id) }"
                @select="() => toggleSkill(skill.id)"
              >
                <span class="truncate">{{ skill.label }}</span>
                <Icon
                  v-if="modelValues.includes(skill.id)"
                  icon="hugeicons:tick-02"
                  class="size-4"
                />
              </CommandItem>
              <CommandItem
                v-if="canLoadMore"
                ref="loadMoreTrigger"
                aria-hidden
                value="load-more"
                class="justify-center text-center"
              >
                <Skeleton v-if="loading" class="h-4 w-32" />
                <template v-else>
                  <span class="text-sm font-medium">Load more results</span>
                  <Icon icon="hugeicons:circle-arrow-down-01" class="ml-2 size-4 opacity-70" />
                </template>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    <template v-if="isMultiple">
      <div v-if="selectedSkills.length" class="mt-3 flex flex-wrap gap-2">
        <span
          v-for="skill in selectedSkills"
          :key="skill.id"
          class="bg-muted inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-xs"
        >
          {{ skill.label }}
          <button type="button" :disabled="props.disabled" @click="removeSkill(skill.id)">
            <Icon icon="hugeicons:cancel-01" class="size-3.5" />
          </button>
        </span>
      </div>
    </template>
  </div>
</template>
