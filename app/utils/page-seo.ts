import type { RouteLocationNormalizedLoaded } from 'vue-router';

interface PageSeo {
  title: string;
  description: string;
}

const siteName = 'Deagensie';

const staticPageSeo: Record<string, PageSeo> = {
  '/': {
    title: 'Deagensie | Business Growth and Creative Talent',
    description:
      'Deagensie helps businesses scale with strategy, technology, and access to skilled African creative talent.',
  },
  '/about': {
    title: 'About Deagensie | Strategy, Talent, and Innovation',
    description:
      'Learn how Deagensie connects ambitious businesses with creative talent, strategic systems, and scalable growth support.',
  },
  '/why': {
    title: 'Why Deagensie | Creative Talent for Growing Businesses',
    description:
      'See why Deagensie is built for companies and creatives that need smarter growth, stronger execution, and borderless opportunity.',
  },
  '/business': {
    title: 'For Businesses | Deagensie',
    description:
      'Access strategy, brand, technology, and creative talent solutions designed for startups and growing businesses.',
  },
  '/business/solutions': {
    title: 'Business Solutions | Deagensie',
    description:
      'Explore Deagensie services across growth strategy, brand experience, product technology, training, and talent-as-a-service.',
  },
  '/creatives': {
    title: 'For Creatives | Deagensie',
    description:
      'Join Deagensie to find meaningful creative opportunities, build global relevance, and stay connected to your roots.',
  },
  '/blog': {
    title: 'Blog | Deagensie',
    description:
      'Read Deagensie insights on business growth, creativity, innovation, talent, and the future of work.',
  },
  '/resource': {
    title: 'Resources | Deagensie',
    description:
      'Explore Deagensie resources for creative professionals, founders, and teams building stronger businesses.',
  },
  '/contact': {
    title: 'Contact Deagensie',
    description:
      'Talk to Deagensie about business growth, creative talent, partnerships, or your next opportunity.',
  },
  '/register': {
    title: 'Get Started | Deagensie',
    description:
      'Start your Deagensie registration as a business looking for support or a creative looking for opportunity.',
  },
  '/subscription': {
    title: 'Subscriptions | Deagensie',
    description:
      'Browse Deagensie subscription plans for flexible business growth and creative talent support.',
  },
};

function titleCase(value: string) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function paramLabel(param: RouteLocationNormalizedLoaded['params'][string] | undefined) {
  return titleCase(String(Array.isArray(param) ? param[0] || '' : param || ''));
}

export function getPageSeo(route: RouteLocationNormalizedLoaded): PageSeo {
  const path = route.path.replace(/\/$/, '') || '/';
  const staticSeo = staticPageSeo[path];

  if (staticSeo) return staticSeo;

  if (path.startsWith('/register/')) {
    const type = paramLabel(route.params.type);
    const step = paramLabel(route.params.step);

    if (path.endsWith('/success')) {
      return {
        title: `${type} Registration Received | ${siteName}`,
        description:
          'Your Deagensie registration has been received. Our team will review your details and follow up with next steps.',
      };
    }

    return {
      title: step
        ? `${type} Registration: ${step} | ${siteName}`
        : `${type} Registration | ${siteName}`,
      description:
        'Complete your Deagensie registration so our team can understand your goals and guide the next step.',
    };
  }

  if (path.startsWith('/subscription/')) {
    const plan = paramLabel(route.params.plan);
    const code = paramLabel(route.params.code);

    if (path.includes('/checkout')) {
      return {
        title: `${plan || code} Checkout | ${siteName}`,
        description:
          'Complete your Deagensie subscription checkout and confirm your selected growth support plan.',
      };
    }

    if (path.includes('/request/received')) {
      return {
        title: 'Request Received | Deagensie',
        description:
          'Your tailored solution request has been received. Deagensie will review it and follow up with a proposal.',
      };
    }

    if (path.includes('/request')) {
      return {
        title: `${plan || code} Request | ${siteName}`,
        description:
          'Share your business needs with Deagensie so we can prepare a tailored solution for your team.',
      };
    }

    return {
      title: plan ? `${plan} | ${siteName}` : `${code || 'Subscription'} | ${siteName}`,
      description:
        'Review Deagensie subscription details, benefits, and plan options for your business needs.',
    };
  }

  return {
    title: siteName,
    description:
      'Deagensie empowers businesses and creatives with strategic growth, technology, and talent solutions.',
  };
}
