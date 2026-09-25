// app/data/blog.ts
import type { BlogPost } from '~/types/api';

export const demoFeaturedPost: BlogPost = {
  id: '1',
  slug: 'future-of-ai-driven-branding',
  title: 'The Future of AI-Driven Branding: How Intelligence Transforms Creative Strategy',
  excerpt:
    'Discover how artificial intelligence is revolutionizing brand development, from predictive consumer behavior analysis to real-time marketing optimization. Learn why the most successful brands are integrating AI into their creative workflows.',
  cover: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80',
  category: 'Featured',
  categoryKey: 'featured',
  publishedAt: '2026-03-15',
  readMinutes: 8,
  featured: true,
};

export const demoFullPost: BlogPost = {
  id: '1',
  slug: 'future-of-ai-driven-branding',
  title: 'The Future of AI-Driven Branding: How Intelligence Transforms Creative Strategy',
  excerpt:
    'Discover how artificial intelligence is revolutionizing brand development, from predictive consumer behavior analysis to real-time marketing optimization. Learn why the most successful brands are integrating AI into their creative workflows.',
  cover: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80',
  coverAlt: 'A strategist working with AI-generated brand dashboards',
  category: 'Technology',
  categoryKey: 'technology',
  publishedAt: '2026-03-15',
  readMinutes: 8,
  featured: true,
  body: [
    {
      type: 'paragraph',
      text: "Artificial intelligence is no longer a buzzword — it is the engine powering the next generation of brand strategy. From predictive consumer behavior analysis to real-time campaign optimization, AI is fundamentally reshaping how the world's most successful brands operate.",
    },
    { type: 'heading', text: 'Why AI Is the New Competitive Advantage' },
    {
      type: 'paragraph',
      text: 'In today’s hyper-competitive digital landscape, intuition alone is no longer enough. Markets shift overnight. Consumer preferences evolve constantly. Trends are born and die within weeks. Brands that rely solely on traditional creative instincts are already falling behind.',
    },
    {
      type: 'quote',
      text: "“Your brand doesn't just launch. It learns. It adapts. It improves. With AI embedded at the core of your strategy, branding becomes a living system — not a one-time design project.”",
    },
    {
      type: 'paragraph',
      text: 'The most successful brands today combine the irreplaceable creativity of human strategists with the pattern-recognition power of artificial intelligence. The result is a brand that doesn’t just communicate well — it communicates smarter, at the right moment, to the right audience, with the right message.',
    },
    { type: 'heading', text: 'What AI-Driven Branding Actually Looks Like' },
    {
      type: 'paragraph',
      text: "At Deagensie, we've embedded AI across five core areas of our creative workflow:",
    },
    {
      type: 'list',
      items: [
        'Market Trend Analysis — Spotting emerging cultural movements before they hit the mainstream',
        'Consumer Behavior Prediction — Understanding what your audience will want next, not just what they want now',
        'Performance Intelligence — Real-time campaign optimization that adjusts spend and creative automatically',
        'Brand Positioning Modeling — Testing strategic directions in simulation before committing to launch',
        'Data-Driven Creative Optimization — Refining messaging copy and visual direction based on actual behavioral data',
      ],
    },
    { type: 'heading', text: 'The Human + Machine Partnership' },
    {
      type: 'paragraph',
      text: 'The most important thing to understand about AI in creative strategy is what it doesn’t replace. AI cannot replicate the cultural intuition, emotional resonance, and creative risk-taking that defines great brand work. What it can do is give those human decisions a much stronger foundation.',
    },
    {
      type: 'paragraph',
      text: 'Think of AI as the research team that never sleeps — constantly scanning signals, surfacing insights, and flagging opportunities for the human strategist to act on. When this partnership works well, the results are extraordinary: brands that feel deeply human and are powered by rigorous intelligence.',
    },
    { type: 'heading', text: 'What This Means for African Businesses' },
    {
      type: 'paragraph',
      text: 'For African startups and SMEs, AI-driven branding represents a once-in-a-generation opportunity to compete at the highest level without the budget of a Fortune 500 company. With the right systems in place, a Lagos startup can deploy the same intelligence infrastructure as a global brand — and win on creativity, speed, and cultural relevance.',
    },
    {
      type: 'paragraph',
      text: 'This is exactly what Deagensie is building: an AI-powered creative growth engine designed specifically for the African business landscape, with global ambition at its core.',
    },
  ],
};

export const demoBlogPosts: BlogPost[] = [
  {
    id: '2',
    slug: 'global-career-rooted-in-africa',
    title: 'Building a Global Career While Staying Rooted in Africa',
    excerpt:
      'How African creatives are breaking geographical barriers and accessing international opportunities without leaving home.',
    cover: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    category: 'Creative Economy',
    categoryKey: 'creative-economy',
    publishedAt: '2026-03-12',
    readMinutes: 5,
  },
  {
    id: '3',
    slug: 'startup-to-scale-up',
    title: 'From Startup to Scale-up: Engineering Growth That Lasts',
    excerpt:
      'The strategic frameworks that transform ambitious startups into sustainable, scalable businesses.',
    cover: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    category: 'Strategy',
    categoryKey: 'strategy',
    publishedAt: '2026-03-10',
    readMinutes: 7,
  },
  {
    id: '4',
    slug: 'brands-need-to-evolve',
    title: 'Why Your Brand Needs to Evolve, Not Just Exist',
    excerpt:
      'Exploring the difference between static brand identities and intelligent, adaptive brand systems.',
    cover: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    category: 'Branding',
    categoryKey: 'branding',
    publishedAt: '2026-03-08',
    readMinutes: 6,
  },
  {
    id: '5',
    slug: 'data-driven-marketing',
    title: 'Data-Driven Marketing: Beyond Vanity Metrics',
    excerpt:
      'How to move from impressions and likes to meaningful business outcomes and revenue growth.',
    cover: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    category: 'Marketing',
    categoryKey: 'marketing',
    publishedAt: '2026-03-12',
    readMinutes: 5,
  },
  {
    id: '6',
    slug: 'psychology-of-visual-identity',
    title: 'The Psychology of Visual Identity: What Makes Brands Memorable',
    excerpt:
      'Understanding the cognitive science behind effective brand design and visual communication.',
    cover: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    category: 'Design',
    categoryKey: 'design',
    publishedAt: '2026-03-10',
    readMinutes: 7,
  },
  {
    id: '7',
    slug: 'digital-products-users-want',
    title: 'Building Digital Products That Users Actually Want',
    excerpt:
      'A practical guide to user-centered design and product development in the African market.',
    cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    category: 'Technology',
    categoryKey: 'technology',
    publishedAt: '2026-03-08',
    readMinutes: 6,
  },
  // duplicate a couple so the grid looks full
  {
    id: '8',
    slug: 'data-driven-marketing-2',
    title: 'Data-Driven Marketing: Beyond Vanity Metrics',
    excerpt:
      'How to move from impressions and likes to meaningful business outcomes and revenue growth.',
    cover: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    category: 'Marketing',
    categoryKey: 'marketing',
    publishedAt: '2026-03-12',
    readMinutes: 5,
  },
  {
    id: '9',
    slug: 'psychology-of-visual-identity-2',
    title: 'The Psychology of Visual Identity: What Makes Brands Memorable',
    excerpt:
      'Understanding the cognitive science behind effective brand design and visual communication.',
    cover: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    category: 'Design',
    categoryKey: 'design',
    publishedAt: '2026-03-10',
    readMinutes: 7,
  },
  {
    id: '10',
    slug: 'digital-products-users-want-2',
    title: 'Building Digital Products That Users Actually Want',
    excerpt:
      'A practical guide to user-centered design and product development in the African market.',
    cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    category: 'Technology',
    categoryKey: 'technology',
    publishedAt: '2026-03-08',
    readMinutes: 6,
  },
];

// Optional: derive categories from the demo posts
export const demoBlogCategories = Array.from(
  new Map(
    demoBlogPosts.map((p) => [
      p.categoryKey,
      { id: p.categoryKey, key: p.categoryKey, label: p.category },
    ])
  ).values()
);
