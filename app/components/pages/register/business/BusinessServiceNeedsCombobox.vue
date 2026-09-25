<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { watchDebounced, useIntersectionObserver } from '@vueuse/core';
import type { PaginatedResponse } from '~/types/api';

interface ServiceOption {
  id: string;
  label: string;
}

const props = withDefaults(
  defineProps<{
    modelValue?: string[];
    disabled?: boolean;
    placeholder?: string;
  }>(),
  {
    modelValue: () => [],
    placeholder: 'Choose services',
    disabled: false,
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string[]];
}>();

const open = ref(false);
const search = ref('');
const services = ref<ServiceOption[]>([]);
const loading = ref(false);
const page = ref(1);
const totalPages = ref(1);
const currentQuery = ref('');
const loadMoreTrigger = useTemplateRef<HTMLElement>('loadMoreTrigger');

const selectedServices = computed(() => {
  return props.modelValue
    .map((value) => services.value.find((service) => service.id === value))
    .filter(Boolean) as ServiceOption[];
});

const canLoadMore = computed(() => page.value < totalPages.value && !loading.value);

async function fetchServices(query = '', nextPage = 1, reset = true) {
  loading.value = true;

  try {
    const response = await $fetch<PaginatedResponse<ServiceOption>>('/api/services', {
      query: {
        q: query,
        page: nextPage,
      },
    });
    if (reset) {
      services.value = response.data;
    } else {
      services.value = [...services.value, ...response.data];
    }
    page.value = response.pagination.page;
    totalPages.value = response.pagination.totalPages;
    currentQuery.value = query;
  } finally {
    loading.value = false;
  }
}

watch(
  open,
  (isOpen) => {
    if (isOpen) {
      void fetchServices(search.value);
    }
  },
  { immediate: true }
);

watchDebounced(
  search,
  (query) => {
    if (open.value) {
      void fetchServices(query);
    }
  },
  { debounce: 250 }
);

const loadMore = async () => {
  if (!canLoadMore.value) return;
  await fetchServices(currentQuery.value, page.value + 1, false);
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

function toggleService(value: string) {
  const next = new Set(props.modelValue);

  if (next.has(value)) {
    next.delete(value);
  } else {
    next.add(value);
  }

  emit('update:modelValue', Array.from(next));
}

function removeService(value: string) {
  emit(
    'update:modelValue',
    props.modelValue.filter((service) => service !== value)
  );
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
          :disabled="disabled"
          class="w-full justify-between font-normal"
        >
          <span class="truncate" :class="{ 'text-muted-foreground': !selectedServices.length }">
            {{ selectedServices.length ? `${selectedServices.length} selected` : placeholder }}
          </span>
          <Icon icon="hugeicons:chevrons-down-up" class="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent class="w-(--reka-popover-trigger-width) p-0">
        <Command :should-filter="false">
          <CommandInput v-model="search" placeholder="Search services..." />
          <CommandList>
            <CommandEmpty>
              {{ loading ? 'Loading...' : 'No service found.' }}
            </CommandEmpty>
            <CommandGroup>
              <CommandItem
                v-for="service in services"
                :key="service.id"
                :value="service.id"
                @select="() => toggleService(service.id)"
              >
                <span class="truncate">{{ service.label }}</span>
                <Icon
                  v-if="modelValue.includes(service.id)"
                  icon="hugeicons:tick-02"
                  class="ml-auto size-4"
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
    <div v-if="selectedServices.length" class="mt-3 flex flex-wrap gap-2">
      <span
        v-for="service in selectedServices"
        :key="service.id"
        class="bg-muted inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-xs"
      >
        {{ service.label }}
        <button type="button" :disabled="disabled" @click="removeService(service.id)">
          <Icon icon="hugeicons:cancel-01" class="size-3.5" />
        </button>
      </span>
    </div>
  </div>
</template>
