import { faker } from '@faker-js/faker';
import type { Offering, OfferingDetail, OfferingPlan } from '~/types/api';

faker.seed(20260505);

const createPlan = (plan: OfferingPlan): OfferingPlan => plan;
const titleCase = (value: string) => value.replace(/\b\w/g, (letter) => letter.toUpperCase());

const _createGeneratedOffering = (index: number): OfferingDetail => {
  const name = `${faker.company.buzzNoun()} ${faker.company.buzzVerb()} System`
    .split(' ')
    .map(titleCase)
    .join(' ');
  const code = faker.helpers.slugify(name).toLowerCase();

  return {
    code: `${code}-${index}`,
    name,
    description: faker.company.catchPhrase(),
    contentSections: [],
    plans: faker.helpers.multiple(
      (_, planIndex) =>
        createPlan({
          code: `${code}-${index}-${planIndex + 1}`,
          name: faker.helpers.arrayElement(['Starter', 'Scale', 'Market Leader']),
          description: faker.company.catchPhrase(),
          price: faker.number.int({ min: 200_000, max: 2_500_000 }),
          vatPercent: 5,
          currency: 'NGN',
          billingLabel: faker.helpers.arrayElement(['monthly', 'one-time payment', 'quarterly']),
          ctaLabel: 'Start Plan',
          highlighted: planIndex === 1,
          featureSections: [
            {
              title: faker.helpers.arrayElement([
                'Branding',
                'Marketing',
                'Digital Design',
                'Operations',
              ]),
              items: faker.helpers.multiple(() => faker.company.buzzPhrase(), { count: 4 }),
            },
          ],
        }),
      { count: faker.number.int({ min: 1, max: 3 }) }
    ),
  };
};

export const offerings: OfferingDetail[] = [
  {
    code: 'GAAS',
    name: 'Growth-as-a-Service',
    button: 'Growth as a Service',
    description:
      'Flexible subscription plans tailored for startups and SMEs looking to scale with professional branding, marketing, and digital design.',
    contentSections: [
      {
        type: 'feature-grid',
        variant: 'cards',
        items: [
          {
            icon: 'mingcute:target-line',
            iconTone: '#04308F' as const,
            title: 'Affordable Entry',
            description:
              'Strong foundational tools for digital marketing at accessible price points',
          },
          {
            icon: 'icon-park-solid:trend-two',
            iconTone: '#026662' as const,
            title: 'Scalable Solutions',
            description: 'Grow from basic to advanced as your business expands',
          },
          {
            icon: 'noto:glowing-star',
            title: 'Professional Quality',
            description: 'High-quality deliverables that make strong first impressions',
          },
          {
            icon: 'noto:rocket',
            title: 'Fast Deployment',
            description: 'Modern digital presence to start engaging your audience quickly',
          },
        ],
      },
    ],
    plans: [
      createPlan({
        code: 'BRONZE',
        name: 'Bronze',
        description:
          'Perfect for start-ups looking to build a basic but professional presence, but professional presence',
        price: 500_000,
        vatPercent: 5,
        currency: 'NGN',
        billingLabel: 'one-time payment',
        ctaLabel: 'Start Plan',
        featureSections: [
          {
            title: 'Branding',
            items: [
              'Basic Logo Design (2 options)',
              'Brand Style Guide',
              'Color Palette & Typography',
            ],
          },
          {
            title: 'Marketing',
            items: [
              'Social Media Setup (1 Platform)',
              '1 Social Media Post Template',
              '1-Page Business Flyer',
            ],
          },
          {
            title: 'Digital Design',
            items: ['Detailed Landing Page', 'Basic SEO Optimization'],
          },
        ],
      }),
      createPlan({
        code: 'SILVER',
        name: 'Silver',
        description:
          'Ideal for businesses looking to elevate their brand presence with more marketing and design efforts.',
        price: 1_000_000,
        vatPercent: 5,
        currency: 'NGN',
        billingLabel: 'one-time payment',
        ctaLabel: 'Start Plan',
        featureSections: [
          {
            title: 'Branding',
            items: [
              'Custom Logo Design (2-3 options)',
              'Full Brand Identity System',
              'Brand Guidelines Document',
            ],
          },
          {
            title: 'Marketing',
            items: [
              'Social Media Setup (2 Platforms)',
              '2 Social Media Post Templates',
              '2 Brand Collaterals',
              'Content Strategy (1 Month)',
            ],
          },
          {
            title: 'Digital Design',
            items: ['Website (Up to 5 Pages)', 'SEO for 5 Pages', 'Google Analytics Setup'],
          },
        ],
      }),
      createPlan({
        code: 'GOLD',
        name: 'Gold',
        description:
          'Designed for businesses that want to scale quickly with comprehensive support.',
        price: 2_500_000,
        vatPercent: 5,
        currency: 'NGN',
        billingLabel: 'one-time payment',
        ctaLabel: 'Start Plan',
        highlighted: true,
        tone: 'blue',
        mostPopular: true,
        featureSections: [
          {
            title: 'Branding',
            items: [
              'Premium Logo (2-3 options)',
              'Full Brand Identity System',
              'Brand Guidelines Document',
            ],
          },
          {
            title: 'Marketing',
            items: [
              'Social Media (3 Platforms)',
              '5 Post Design Template',
              '5-Page Brochure/Catalog',
              'Content Calendar (2 Months)',
              'Email Marketing Setup',
              'Google Ads Campaign Setup',
            ],
          },
          {
            title: 'Digital Design',
            items: ['Website (Up to 10 Pages)', 'Advanced SEO', 'Blog Setup & Integration'],
          },
        ],
      }),
      createPlan({
        code: 'PLATINUM',
        name: 'Platinum',
        description:
          'For businesses looking to dominate their market with high-level branding and advanced strategies.',
        price: 3_500_000,
        vatPercent: 5,
        currency: 'NGN',
        billingLabel: 'one-time payment',
        ctaLabel: 'Start Plan',
        featureSections: [
          {
            title: 'Branding',
            items: [
              'High-end Logo (10+ Concepts)',
              'Full Brand Identity System',
              'Advanced Brand Guideline',
            ],
          },
          {
            title: 'Marketing',
            items: [
              'Social Media (5 Platforms)',
              '10 Post Design Templates',
              '10-Page Brochure & Flyer',
              'Marketing Strategy (1-3 Months)',
              'Email Automation',
              'Content Creation',
              'Multi-Platform Ads Strategy',
              'Analytics & Tracking',
            ],
          },
          {
            title: 'Digital Design',
            items: [
              'Website (20 Pages + E-Commerce)',
              'Comprehensive SEO',
              'E-commerce Integration',
            ],
          },
        ],
      }),
    ],
  },
  {
    code: 'TAAS',
    name: 'Talent as a Service (TaaS)',
    button: 'Talent as a Service (TaaS)',
    description:
      'Access vetted African creative talent on-demand. Our platform ensures businesses can hire top creatives on a flexible, project-based basis while creatives find fulfilling global opportunities.',
    active: true,
    contentSections: [
      {
        type: 'feature-grid',
        title: 'Explore Our Pool of Vetted Creative Talents',
        variant: 'lined',
        items: [
          {
            icon: 'mingcute:target-line',
            iconTone: '#04308F' as const,
            title: 'Design',
            description: 'Multi-purpose designs for branding, marketing, communication and prints',
            bullets: ['Graphics Designer', 'Brand Designer', 'Motion Graphics & Animator'],
          },
          {
            icon: 'icon-park-solid:trend-two',
            iconTone: '#026662' as const,
            title: 'Digital Transformation',
            description: 'Design and cross-functional websites and platforms',
            bullets: ['Website Designer', 'UI/UX Designer'],
          },
          {
            icon: 'noto:glowing-star',
            title: 'Marketing & Communication',
            description:
              'Marketing strategy, campaigns, content design, social media and public relations',
            bullets: ['Content Writer', 'Marketing Specialist', 'Media and PR'],
          },
          {
            icon: 'mingcute:target-line',
            iconTone: '#04308F' as const,
            title: 'Media',
            description:
              'Produces high-quality visual content to support storytelling multi-purpose goals',
            bullets: ['Photographer', 'Cinematographer', 'Video Editor'],
          },
          {
            icon: 'icon-park-solid:trend-two',
            iconTone: '#026662' as const,
            title: 'Looks and Beauty',
            description: 'Product showcasing, promotions, campaigns, adverts and runway',
            bullets: ['Models', 'Makeup Artist'],
          },
          {
            icon: 'noto:glowing-star',
            title: 'Business Intelligence',
            description: 'Analysis data to inform business and product strategy',
            bullets: ['Business Analyst', 'Data Analyst'],
          },
        ],
      },
    ],
    plans: [
      createPlan({
        code: 'TAAS_STARTER',
        name: 'Monthly Subscription',
        description: 'Access to a pool of talents monthly with flexible project-based engagement.',
        price: 50,
        vatPercent: 5,
        currency: 'USD',
        billingLabel: 'monthly',
        ctaLabel: 'Start Plan',
        featureSections: [
          {
            items: [
              'Access to vetted creative pool',
              'Escrow payment system',
              'Project monitoring & tracking',
              'Secure transactions',
              'Quality guarantee',
              'Monthly renewal',
            ],
          },
        ],
      }),
      createPlan({
        code: 'TAAS_GROWTH',
        name: 'Quarterly Subscription',
        description:
          '3-month commitment with discounted rates and additional perks for sustained engagement.',
        price: 135,
        vatPercent: 5,
        currency: 'USD',
        billingLabel: 'monthly',
        ctaLabel: 'Start Plan',
        highlighted: true,
        tone: 'teal',
        mostPopular: true,
        featureSections: [
          {
            items: [
              'All Monthly benefits',
              'Discounted service rate',
              'Free project reward program',
              'Priority talent matching',
              'Enhanced support',
              'Quarterly commitment',
            ],
          },
        ],
      }),
      createPlan({
        code: 'TAAS_SCALE',
        name: 'Annual Subscription',
        description:
          'Year-long engagement with full talent access and premium benefits for long-term partnerships.',
        price: 540,
        vatPercent: 5,
        currency: 'USD',
        billingLabel: 'monthly',
        ctaLabel: 'Start Plan',
        featureSections: [
          {
            items: [
              'All Quarterly benefits',
              'Year-end royalty bonus',
              'One month free after expiration',
              'Free project rewards',
              'Enhanced monitoring & evaluation',
              'Premium priority support',
              'Annual commitment',
            ],
          },
        ],
      }),
    ],
  },
  {
    code: 'GOS',
    name: 'Growth OS',
    button: 'Growth OS',
    description:
      'Specific, actionable, and controllable strategies and marketing campaigns designed to drive significant, scalable revenue and user base growth for your business.',
    contentSections: [
      {
        type: 'deliverables-grid',
        title: 'What We Deliver',
        items: [
          {
            title: 'Leads Generation',
            eyebrow: '500 leads / Month',
            groups: [
              {
                lines: [
                  '500 leads per month',
                  'Paid acquisition campaigns',
                  'Audience research & targeting',
                  'High-intent targeting',
                  'Lead capture optimization',
                ],
              },
              {
                label: 'Deliverable:',
                lines: ['500 leads, and 50 verified, contactable prospects monthly'],
              },
            ],
          },
          {
            title: 'Conversion Infrastructure',
            groups: [
              {
                lines: [
                  'Sales funnel optimization',
                  'Lead magnets & offers design',
                  'CRM integration',
                  'Automated lead scoring',
                ],
              },
              {
                label: 'Goal:',
                lines: ['Turn traffic into sales-ready prospects, not just leads'],
              },
            ],
          },
          {
            title: 'Remarketing System',
            groups: [
              {
                lines: ['Multi-touch remarketing (ads + email + WhatsApp/SMS if applicable.'],
              },
              {
                label: 'Segmentation based on behavior:',
                bullets: [
                  "Viewed but didn't convert",
                  "Engaged but didn't buy",
                  'Abandoned checkout / inquiry',
                ],
              },
              {
                label: 'Retargeting creatives focused on.',
                bullets: ['Objection handling', 'Social proof', 'Urgency & incentives'],
              },
              {
                label: 'Outcome:',
                lines: ['Conversion lift from cold -> warm -> buyer'],
              },
            ],
          },
          {
            title: 'Sales Enablement',
            groups: [
              {
                lines: [
                  'Scripts & frameworks',
                  'Email sequences for closing',
                  'Offer positioning feedback',
                  'Bottleneck analysis',
                ],
              },
            ],
          },
          {
            title: 'Performance Tracking',
            groups: [
              {
                lines: ['Weekly performance snapshot', 'Monthly deep-dive report:'],
                bullets: [
                  'Leads generated',
                  'Cost per prospect',
                  'Conversion rate',
                  'Revenue attributed',
                ],
              },
              {
                lines: ['Clear action plan for the next cycle'],
              },
            ],
          },
        ],
      },
      {
        type: 'cta-band',
        title: "Have a project you'd like to discuss?",
        subtitle: "Fill out the projects form, & let's create your dream brand",
        description:
          'Our team of experienced designers and developers combines artistic flair with technical expertise to create captivating websites, intuitive user interfaces, and engaging multimedia content.',
        buttonLabel: 'Start Your Project',
        buttonHref: '/contact?service=growth-os',
      },
    ],
    plans: [
      createPlan({
        code: 'GROWTH_OS',
        name: '500 Qualified Buyer Engine',
        description:
          'Generate and remarket 500 high-intent prospect buyers per month and convert 10% into paying customers through a structured acquisition + remarketing system.',
        price: 100_000,
        vatPercent: 5,
        currency: 'NGN',
        billingLabel: 'monthly',
        eyebrow: 'Subscription-based growth service',
        ctaLabel: 'Start your Growth Engine',
        note: 'Contract Term: Minimum 3 months (recommended 6 months for compounding results)',
        featureSections: [
          {
            title: 'Target Outcomes',
            items: [
              '50 new prospective customers per month',
              'Predictable, scalable sales pipeline',
              'Real-time optimization and tracking',
              'Data-driven growth insights',
            ],
          },
        ],
      }),
    ],
  },
  // ...Array.from({ length: 21 }, (_, index) => createGeneratedOffering(index + 1)),
];

export const offeringList: Offering[] = offerings.map(
  ({ code, name, description, active, button }) => ({
    code,
    name,
    description,
    active,
    button,
  })
);
