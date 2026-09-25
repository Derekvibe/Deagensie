export interface ServiceOption {
  id: string;
  label: string;
}

export const serviceOptions = [
  { id: 'brand_strategy', label: 'Brand strategy' },
  { id: 'brand_design', label: 'Brand identity design' },
  { id: 'marketing', label: 'Marketing campaigns' },
  { id: 'hire_creatives', label: 'Hire creatives' },
  { id: 'website_dev', label: 'Website development' },
  { id: 'digital_products', label: 'Digital products' },
  { id: 'growth_os', label: 'Growth operating system' },
  { id: 'pitch_deck', label: 'Pitch deck' },
  { id: 'talent_as_a_service', label: 'Talent as a service' },
] as const satisfies readonly ServiceOption[];
