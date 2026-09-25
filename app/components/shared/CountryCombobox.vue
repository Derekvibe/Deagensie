<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { countries } from 'countries-list';
import { fuzzySearch } from '~~/server/utils/fuzzy-search';

interface CountryOption {
  label: string;
  id: string;
}

const props = withDefaults(
  defineProps<{
    modelValue: string;
    placeholder?: string;
    disabled?: boolean;
    excludeCountries?: string[];
  }>(),
  {
    placeholder: 'Select a country',
    disabled: false,
    excludeCountries: () => [],
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const open = ref(false);
const search = ref('');

const countryOptions = computed<CountryOption[]>(() => {
  const excludeSet = new Set(props.excludeCountries.map((country) => country.toUpperCase()));

  return Object.entries(countries)
    .filter(([, country]) => !excludeSet.has(country.name.toUpperCase()))
    .map(([, country]) => ({
      label: country.name,
      id: country.name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
});

const filteredCountries = fuzzySearch(countryOptions.value, search.value, ['label']);

const selectedCountry = computed(() => {
  return countryOptions.value.find((country) => country.id === props.modelValue) || null;
});

const onSelect = (country: CountryOption) => {
  emit('update:modelValue', country.id);
  open.value = false;
};
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        :disabled="disabled"
        class="w-full justify-between font-normal"
      >
        <span
          class="flex min-w-0 items-center gap-3 truncate"
          :class="{ 'text-muted-foreground': !selectedCountry }"
        >
          {{ selectedCountry?.label || placeholder }}
        </span>
        <Icon icon="hugeicons:chevrons-down-up" class="ml-2 size-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-(--reka-popover-trigger-width) p-0">
      <Command :should-filter="false">
        <CommandInput v-model="search" placeholder="Search country..." />
        <CommandList>
          <CommandEmpty>No countries found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="country in filteredCountries"
              :key="country.id"
              :value="country.id"
              @select="() => onSelect(country)"
            >
              <span class="max-w-full truncate">{{ country.label }}</span>
              <Icon
                v-if="props.modelValue === country.id"
                icon="hugeicons:tick-02"
                class="ml-auto size-4 shrink-0"
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
