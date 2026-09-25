import type { PortfolioProject, PortfolioStat } from '~/types/api';

export const portfolioFilters = [
  'Strategy',
  'Branding',
  'Product Design',
  'UI/UX Design',
  'Technology',
  'Creative Economy',
] as const;

export const demoProjects: PortfolioProject[] = [
  {
    id: '1',
    slug: 'loveworld-trade-investment-forum',
    title: 'Loveworld Trade & Investment Forum',
    description:
      'When the Department of Commerce at Loveworld Inc envisioned a global platform that would inspire trust, spark innovation, and drive authentic economic partnerships, they turned to Deagensie to give the idea structure, identity, and life.',
    cover: '/images/works/lw-trade-and-investment-forum/showcase.webp',
    tags: ['Strategy', 'Branding', 'Website'],
    client: 'Department of Commerce, Loveworld Inc.',
    layout: 'inset',
  },
  {
    id: '2',
    slug: 'lw-registry',
    title: 'LW Registry Platform',
    description:
      'The Department of Commerce envisioned a unified digital infrastructure where every Strategic Business Organization (SBO), vendor, contractor, merchant, and entrepreneur within the Loveworld Nation could operate transparently, efficiently, and collaboratively.',
    cover: '/images/works/lw-registry/showcase.webp',
    tags: ['Product Design', 'Technology', 'Architecture'],
    client: 'Loveworld Enterprise Network',
    layout: 'inset',
  },
  {
    id: '3',
    slug: 'green-plains-agro',
    title: 'Green Plains Agro',
    description:
      'When Green Plains Agro first approached Deagensie, they carried more than a business plan—they carried a vision of fertile fields powered by innovation, ethical farming guided by technology, and nourishing communities while protecting the planet.',
    cover: '/images/works/green-plains/showcase.webp',
    tags: ['Strategy', 'Branding', 'Digital Infrastructure'],
    client: 'Green Plains Agro Ltd.',
    layout: 'inset',
  },
  {
    id: '4',
    slug: 'xerdocs-health',
    title: 'Xerdocs Health Ecosystem',
    description:
      'Crafted a compelling brand strategy and distinctive visual identity that positions Xerdocs Health to revolutionize health management solutions. With a bold vision to transform and impact lives through health technology, we built an intelligent brand system.',
    cover: '/images/pages/business/hero-2.png',
    tags: ['Branding', 'Technology', 'UI/UX Design'],
    client: 'Xerdocs Health Corp.',
    layout: 'inset',
  },
  {
    id: '5',
    slug: 'begin',
    title: 'BEGIN Accelerator Platform',
    description:
      'A transformative branding and product strategy initiative that helped BEGIN establish their unique market position. We crafted a brand identity that resonates with tech founders while maintaining authenticity and differentiation.',
    cover: '/images/pages/creatives/hero-1.png',
    tags: ['Strategy', 'Branding', 'Creative Economy'],
    client: 'BEGIN Enterprise Ventures',
    layout: 'below',
  },
  {
    id: '6',
    slug: 'zionmart',
    title: 'ZionMart Digital Retail Ecosystem',
    description:
      'A complete eCommerce ecosystem with mobile app and web platform. We created a seamless shopping experience from brand identity to user interface, optimizing for conversion while maintaining beautiful design.',
    cover: '/images/pages/business/hero-3.png',
    tags: ['Product Design', 'Technology', 'UI/UX Design'],
    client: 'ZionMart Retail Group',
    layout: 'below',
  },
  {
    id: '7',
    slug: 'deloxehr',
    title: 'DeloxeHR Talent Operations',
    description:
      'DeloxeHR needed a brand that reflected its forward-thinking approach and transformative impact. Deagensie translated this vision into a powerful brand strategy and cohesive visual identity—crafting a positioning that emphasizes innovation, trust, and measurable growth.',
    cover: '/images/pages/portfolio/deloxxe.png',
    tags: ['Strategy', 'Branding', 'UI/UX Design'],
    client: 'DeloxeHR Solutions',
    layout: 'below',
  },
  {
    id: '8',
    slug: 'talentchess-africa',
    title: 'Talentchess Africa Workforce',
    description:
      'With a bold vision to connect Africa’s brightest minds to meaningful career opportunities without losing their connection to home, Talentchess needed more than a platform—it needed a powerful story, global positioning, and digital architecture.',
    cover: '/images/pages/portfolio/markup-laptop.png',
    tags: ['Strategy', 'Branding', 'Creative Economy'],
    client: 'Talentchess Foundation',
    layout: 'below',
  },
  {
    id: '9',
    slug: 'hmd',
    title: 'HMD Corporate Identity',
    description:
      'A comprehensive corporate branding project that established HMD’s presence in their industry. We developed a sophisticated brand identity system that communicates professionalism, trust, and innovation across all global touchpoints.',
    cover: '/images/pages/portfolio/hmg.png',
    tags: ['Corporate Branding', 'Branding', 'Strategy'],
    client: 'HMD Global Holdings',
    layout: 'below',
  },
  {
    id: '10',
    slug: 'bendutch-wall-decor-studio',
    title: 'Bendutch Wall & Decor Studio',
    description:
      'A complete brand identity and eCommerce platform for a premium wall décor studio. We created a sophisticated digital shopping experience that showcases their unique artistic offerings while driving conversions.',
    cover: '/images/pages/portfolio/bendduct.png',
    tags: ['Branding', 'Product Design', 'Technology'],
    client: 'Bendutch Decor Studio',
    layout: 'below',
  },
];

export const demoStats: PortfolioStat[] = [
  { value: '100+', label: 'Projects Delivered' },
  { value: '50+', label: 'Enterprise Clients' },
  { value: '6+', label: 'Years of Excellence' },
  { value: '98%', label: 'Client Satisfaction' },
];
