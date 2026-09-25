import { z, type ZodSchema } from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { isValidWebsiteInput, isValidBehanceHandle } from '~/lib/utils';
import type { RegistrationStep } from '~/lib/register/flows';
import type { BusinessRegistration, CreativeRegistrationFields } from '~/types/api';

export type BusinessRegistrationFormValues = BusinessRegistration & {
  agreeToTerms: boolean;
  sendUpdates: boolean;
  agreeToNda: boolean;
};

export type CreativeRegistrationFormValues = CreativeRegistrationFields & {
  resume?: File;
  agreeToTerms: boolean;
  sendUpdates: boolean;
};

export const businessRegistrationStorageKey = 'business-registration-progress';
export const creativeRegistrationStorageKey = 'creative-registration-progress';

export const businessRegistrationDefaultValues: BusinessRegistrationFormValues = {
  firstName: '',
  lastName: '',
  industry: '',
  businessEmail: '',
  businessName: '',
  phone: '',
  country: '',
  companyWebsite: '',
  serviceNeeds: [],
  companySize: '',
  budgetRange: '',
  source: '',
  projectTitle: '',
  projectDescription: '',
  projectTimeline: '',
  currentStage: '',
  problemToSolve: '',
  primaryService: '',
  agreeToTerms: false,
  sendUpdates: false,
  agreeToNda: false,
};

export const businessRegistrationSchema = z.object({
  businessName: z.string().trim().min(1, 'Business name is required'),
  industry: z.string().trim().min(1, 'Industry is required'),
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  businessEmail: z.email('Enter a valid business email'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .refine(isValidPhoneNumber, 'Invalid phone number'),
  country: z.string().trim().min(1, 'Country is required'),
  companyWebsite: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || isValidWebsiteInput(value), 'Enter a valid website'),
  serviceNeeds: z.array(z.string()).min(1, 'Choose at least one service need'),
  companySize: z.string(),
  budgetRange: z.string(),
  source: z.string().trim().describe('Let us know how you heard about us').optional(),
  projectTitle: z.string().trim().min(3, 'Project title is required'),
  projectDescription: z.string().trim().min(30, 'Share at least 30 characters about the project'),
  projectTimeline: z.string(),
  currentStage: z.string(),
  problemToSolve: z.string().min(1, 'Problem to solve is required'),
  primaryService: z.string(),
  agreeToTerms: z.literal(true, { error: 'You must agree to the terms before submitting' }),
  sendUpdates: z.boolean(),
  agreeToNda: z.literal(true, { error: 'You must agree to sign an NDA when required' }),
});

export const creativeRegistrationDefaultValues: CreativeRegistrationFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  primaryRole: '',
  additionalSkills: [],
  portfolioUrl: '',
  behanceProfile: '',
  referralSource: '',
  yearsOfExperience: 0,
  bio: '',
  availability: '',
  hourlyRateUsd: 0,
  resume: undefined,
  agreeToTerms: false,
  sendUpdates: false,
};

export const creativeRegistrationSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  email: z.email('Invalid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .refine(isValidPhoneNumber, 'Invalid phone number'),
  country: z.string().trim().min(1, 'Country is required'),
  city: z.string().trim().min(1, 'City is required'),
  primaryRole: z.string().trim().min(1, 'Primary role is required'),
  additionalSkills: z.array(z.string().trim().min(2, 'Skill must be at least 2 characters long')),
  portfolioUrl: z
    .string()
    .trim()
    .min(1, 'Portfolio URL is required')
    .refine((value) => isValidWebsiteInput(value), 'Enter a valid website'),
  behanceProfile: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || isValidBehanceHandle(value), 'Enter a valid Behance username'),
  referralSource: z.string().trim().min(1, 'Referral source is required'),
  yearsOfExperience: z.number().int().nonnegative('Years of experience must be a positive integer'),
  bio: z.string().trim().min(10, 'Bio must be at least 10 characters long'),
  availability: z.string().trim().min(1, 'Availability is required'),
  hourlyRateUsd: z.number().nonnegative('Hourly rate must be a positive number'),
  resume: z
    .instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024, 'File size must be less than 10MB')
    .refine(
      (file) =>
        [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ].includes(file.type),
      'File must be a PDF or Word document'
    ),
  agreeToTerms: z.literal(true, { error: 'You must agree to the terms and conditions' }),
  sendUpdates: z.boolean(),
});

export function getFirstInvalidStepId(
  steps: readonly RegistrationStep[],
  values: unknown,
  schema: ZodSchema
): string | undefined {
  const result = schema.safeParse(values);
  if (result.success) {
    return undefined;
  }

  for (const step of steps) {
    const fieldSet = new Set(step.fields);
    const hasIssue = result.error.issues.some((issue) => {
      const field = issue.path[0] as string | undefined;
      return field ? fieldSet.has(field) : false;
    });
    if (hasIssue) {
      return step.id;
    }
  }

  return undefined;
}

export function hasSavedRegistrationProgress(values: unknown, defaults: unknown) {
  return JSON.stringify(values) !== JSON.stringify(defaults);
}
