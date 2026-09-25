import type { Component } from 'vue';
import RegisterBusinessFlow from '~/components/pages/register/business/BusinessRegistrationFlow.vue';
import RegisterBusinessBusinessIdentityStep from '~/components/pages/register/business/BusinessIdentityStep.vue';
import RegisterBusinessBusinessNeedsStep from '~/components/pages/register/business/BusinessNeedsStep.vue';
import RegisterBusinessBusinessProjectStep from '~/components/pages/register/business/BusinessProjectStep.vue';
import RegisterBusinessBusinessReviewStep from '~/components/pages/register/business/BusinessReviewStep.vue';
import RegisterCreativeFlow from '~/components/pages/register/creative/CreativeRegistrationFlow.vue';
import CreativeProfileStep from '~/components/pages/register/creative/CreativeProfileStep.vue';
import CreativePortfolioStep from '~/components/pages/register/creative/CreativePortfolioStep.vue';
import CreativeExperienceStep from '~/components/pages/register/creative/CreativeExperienceStep.vue';
import CreativeReviewStep from '~/components/pages/register/creative/CreativeReviewStep.vue';

export type RegistrationType = 'business' | 'creative';
export type RegistrationStepId = string;

export interface RegistrationStep {
  id: RegistrationStepId;
  title: string;
  description: string;
  subTitle?: string;
  fields: readonly string[];
  component?: Component;
}

export interface RegistrationFlowConfig {
  type: RegistrationType;
  label: string;
  steps: readonly RegistrationStep[];
  component?: Component;
}

export const registrationFlows: Record<RegistrationType, RegistrationFlowConfig> = {
  business: {
    type: 'business',
    label: 'Business Registration',
    component: RegisterBusinessFlow,
    steps: [
      {
        id: 'business-profile',
        title: 'Business profile',
        description: 'Company and contact details',
        fields: [
          'businessName',
          'industry',
          'firstName',
          'lastName',
          'businessEmail',
          'phone',
          'country',
          'companyWebsite',
        ],
        component: RegisterBusinessBusinessIdentityStep,
      },
      {
        id: 'needs-and-budget',
        title: 'Needs and budget',
        description: 'Services, size, and spend',
        fields: ['serviceNeeds', 'companySize', 'budgetRange', 'source'],
        component: RegisterBusinessBusinessNeedsStep,
      },
      {
        id: 'project-brief',
        title: 'Project brief',
        description: 'Scope, timing, and stage',
        fields: [
          'projectTitle',
          'projectDescription',
          'problemToSolve',
          'projectTimeline',
          'currentStage',
        ],
        component: RegisterBusinessBusinessProjectStep,
      },
      {
        id: 'review-and-consent',
        title: 'Review and consent',
        description: 'Confirm before submitting',
        fields: ['agreeToTerms', 'sendUpdates', 'agreeToNda'],
        component: RegisterBusinessBusinessReviewStep,
      },
    ],
  },
  creative: {
    type: 'creative',
    label: 'Creative Registration',
    component: RegisterCreativeFlow,
    steps: [
      {
        id: 'profile',
        subTitle: 'Creative Information',
        title: 'Personal Information',
        description: "Let's start with the basics",
        fields: ['firstName', 'lastName', 'email', 'phone', 'country', 'city'],
        component: CreativeProfileStep,
      },
      {
        id: 'portfolio',
        subTitle: 'Creative Information',
        title: 'Skills & Portfolio',
        description: 'Showcase your creative talents',
        fields: [
          'primaryRole',
          'additionalSkills',
          'portfolioUrl',
          'behanceProfile',
          'referralSource',
        ],
        component: CreativePortfolioStep,
      },
      {
        id: 'experience',
        title: 'Experience',
        subTitle: 'Creative Information',
        description: 'Background and availability',
        fields: ['yearsOfExperience', 'bio', 'availability', 'hourlyRateUsd', 'resume'],
        component: CreativeExperienceStep,
      },
      {
        id: 'review',
        title: 'Review',
        subTitle: 'Creative Information',
        description: 'Confirm before submitting',
        fields: ['agreeToTerms', 'sendUpdates'],
        component: CreativeReviewStep,
      },
    ],
  },
};

export const registrationTypes = Object.keys(registrationFlows) as RegistrationType[];

export function getRegistrationFlow(type: string): RegistrationFlowConfig | undefined {
  return registrationFlows[type as RegistrationType];
}
