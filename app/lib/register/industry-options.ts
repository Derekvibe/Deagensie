export interface IndustryOption {
  label: string;
  id: string;
}

export const industryOptions = [
  { label: 'Advertising', id: 'Advertising' },
  { label: 'Agriculture', id: 'Agriculture' },
  { label: 'Beauty and Personal Care', id: 'Beauty and Personal Care' },
  { label: 'Consumer Goods', id: 'Consumer Goods' },
  { label: 'Creative Services', id: 'Creative Services' },
  { label: 'Education', id: 'Education' },
  { label: 'Energy', id: 'Energy' },
  { label: 'Entertainment', id: 'Entertainment' },
  { label: 'Fashion', id: 'Fashion' },
  { label: 'Finance', id: 'Finance' },
  { label: 'Food and Beverage', id: 'Food and Beverage' },
  { label: 'Healthcare', id: 'Healthcare' },
  { label: 'Hospitality', id: 'Hospitality' },
  { label: 'Logistics', id: 'Logistics' },
  { label: 'Manufacturing', id: 'Manufacturing' },
  { label: 'Media', id: 'Media' },
  { label: 'Nonprofit', id: 'Nonprofit' },
  { label: 'Professional Services', id: 'Professional Services' },
  { label: 'Real Estate', id: 'Real Estate' },
  { label: 'Retail', id: 'Retail' },
  { label: 'Technology', id: 'Technology' },
  { label: 'Telecommunications', id: 'Telecommunications' },
  { label: 'Travel', id: 'Travel' },
  { label: 'Other', id: 'Other' },
] as const satisfies readonly IndustryOption[];
