export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };
export type JsonRecord = Record<string, JsonValue>;

export interface ApiErrorDetail {
  message: string;
  path?: string[];
}

export interface ApiErrorBody {
  error?: string;
  details?: ApiErrorDetail[];
}

export interface ApiFailure {
  status?: number;
  message: string;
  fieldErrors: Record<string, string>;
  nonFieldMessages: string[];
  raw?: unknown;
}

export interface SuccessResponse {
  success: true;
  id: string;
}

export interface ContactMessage {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName?: string;
  serviceInterest?: string;
  message: string;
}

export interface TailoredSolution {
  firstName: string;
  lastName: string;
  businessEmail: string;
  businessName: string;
  phone: string;
  country: string;
  industry: string;
  companySize: string;
  companyWebsite?: string;
  problemToSolve: string;
  offeringCode: string;
  planCode: string;
}
export interface BusinessRegistration {
  firstName: string;
  lastName: string;
  industry: string;
  businessEmail: string;
  businessName: string;
  phone: string;
  country: string;
  companyWebsite?: string;
  problemToSolve: string;
  serviceNeeds: string[];
  primaryService: string;
  companySize: string;
  budgetRange: string;
  source?: string;
  projectTitle: string;
  projectDescription: string;
  projectTimeline: string;
  currentStage: string;
}

export interface CreativeRegistrationFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  primaryRole: string;
  additionalSkills: string[];
  portfolioUrl: string;
  behanceProfile?: string;
  referralSource?: string;
  yearsOfExperience: number;
  bio: string;
  availability: string;
  hourlyRateUsd: number;
}

export interface CreativeRegistration extends CreativeRegistrationFields {
  resume: File;
}

export interface CreativeRegistrationResponse {
  success: true;
  id: string;
  resumeUrl: string;
}

export interface TalentRegistration {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country?: string;
  projectTitle: string;
  projectDescription: string;
  projectTimeline: string;
  currentStage: string;
}

export interface EmailResponse {
  success: true;
}

export type PlanType = 'one_time' | 'subscription';
export type BillingInterval = 'monthly' | 'quarterly' | 'annually';

export interface Plan {
  code: string;
  name: string;
  amount: number;
  currency: string;
  type: PlanType;
  interval?: BillingInterval;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

export interface Offering {
  code: string;
  name: string;
  description: string;
  active?: boolean;
  button?: string;
}

// TODO: Request backend to update GET /offerings to return { data: Offering[]; pagination: PaginationMeta }.
export type OfferingsResponse = PaginatedResponse<Offering>;

export interface OfferingFeatureSection {
  title?: string;
  items: string[];
}

export interface OfferingPlan {
  code: string;
  name: string;
  description: string;
  price: number;
  vatPercent: number;
  currency: string;
  billingLabel: string;
  eyebrow?: string;
  ctaLabel: string;
  highlighted?: boolean;
  tone?: 'blue' | 'teal';
  note?: string;
  featureSections: OfferingFeatureSection[];
  mostPopular?: boolean;
  button?: string;
}

export type OfferingContentIconTone = `#${string}`;

export interface OfferingContentFeatureItem {
  icon: string;
  iconTone?: OfferingContentIconTone;
  title: string;
  description: string;
  bullets?: string[];
}

export interface OfferingContentFeatureGridSection {
  type: 'feature-grid';
  title?: string;
  variant?: 'cards' | 'lined';
  items: OfferingContentFeatureItem[];
}

export interface OfferingContentTextGroup {
  label?: string;
  lines?: string[];
  bullets?: string[];
}

export interface OfferingContentDeliverableItem {
  title: string;
  eyebrow?: string;
  groups: OfferingContentTextGroup[];
}

export interface OfferingContentDeliverablesGridSection {
  type: 'deliverables-grid';
  title: string;
  items: OfferingContentDeliverableItem[];
}

export interface OfferingContentCtaSection {
  type: 'cta-band';
  title: string;
  subtitle: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

export type OfferingContentSection =
  | OfferingContentFeatureGridSection
  | OfferingContentDeliverablesGridSection
  | OfferingContentCtaSection;

export interface OfferingDetail extends Offering {
  plans: OfferingPlan[];
  contentSections: OfferingContentSection[];
  button?: string;
}

export interface PaymentMetadata extends JsonRecord {
  source: string;
}

export interface PaymentInitRequest {
  planCode: string;
  email: string;
  customerName?: string;
  metadata?: PaymentMetadata;
  callbackUrl?: string;
}

export interface MoneyBreakdown {
  subtotal: number;
  vatPercent: number;
  vatAmount: number;
  total: number;
  currency: string;
}

export interface PaymentInitResponse {
  success: true;
  mode: PlanType;
  reference: string;
  authorizationUrl: string;
  accessCode: string;
  breakdown: MoneyBreakdown;
  plan: {
    code: string;
    name: string;
    interval?: BillingInterval;
    paystackPlanCode?: string;
  };
}

export type PaymentStatus = 'success' | 'failed' | 'abandoned' | 'pending';

export interface PaymentVerifyResponse {
  success: boolean;
  mode: PlanType;
  status: PaymentStatus;
  reference: string;
  breakdown?: MoneyBreakdown;
}

export interface BlogCategory {
  id: string;
  key: string;
  label: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
  avatar?: string;
}

// A block-based body — each entry is one section of the article
export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string } // <h2>
  | { type: 'quote'; text: string } // pull-quote callout
  | { type: 'list'; items: string[] } // bullet list
  | { type: 'image'; src: string; alt?: string; caption?: string };

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  coverAlt?: string;
  category: string;
  categoryKey: string;
  publishedAt: string;
  readMinutes: number;
  author?: BlogAuthor;
  featured?: boolean;
  body?: BlogBlock[]; // 👈 new
}

// ~/types/api.ts

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover: string;
  tags: string[];
  client?: string;
  layout?: 'inset' | 'below';
}

export interface PortfolioStat {
  value: string;
  label: string;
}

export type BlogCategoriesResponse = PaginatedResponse<BlogCategory>;
