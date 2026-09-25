export interface LeadSourceOption {
  id: string;
  label: string;
}

export const leadSourceOptions = [
  { id: 'google_search', label: 'Google search' },
  { id: 'social_media', label: 'Social media' },
  { id: 'event_conference', label: 'Event/conference' },
  { id: 'others', label: 'Others' },
] as const satisfies readonly LeadSourceOption[];
