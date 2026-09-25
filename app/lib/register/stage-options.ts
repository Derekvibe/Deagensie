export interface StageOption {
  id: string;
  label: string;
}

export const stageOptions = [
  { id: 'idea', label: 'Idea' },
  { id: 'early_startup', label: 'Early startup' },
  { id: 'growth', label: 'Growth' },
  { id: 'established', label: 'Established' },
  { id: 'enterprise', label: 'Enterprise' },
] as const satisfies readonly StageOption[];
