export interface TimelineOption {
  id: string;
  label: string;
}

export const timelineOptions = [
  { label: 'As soon as possible', id: 'urgent' },
  { label: '2-4 weeks', id: 'short_term' },
  { label: '1-3 months', id: 'medium_term' },
  { label: '3+ months', id: 'long_term' },
  { label: 'Ongoing partnership', id: 'ongoing_partnership' },
] as const satisfies readonly TimelineOption[];
