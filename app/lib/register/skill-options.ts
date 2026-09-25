export interface SkillOption {
  id: string;
  label: string;
}

export const skillOptions = [
  { id: 'branding', label: 'Branding' },
] as const satisfies readonly SkillOption[];
