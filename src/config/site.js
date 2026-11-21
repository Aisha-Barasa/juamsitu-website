/**
 * JuaMsitu site configuration
 * ------------------------------------------------------------------
 * Everything you are likely to update (links, contact details, images,
 * feature status, social profiles) lives here, so you rarely need to
 * touch the page components.
 */

export const site = {
  name: 'JuaMsitu',
  tagline: 'Know your forest. Protect your future.',
  footerTagline: 'Know your forest. Protect the future.',
  supportingMessage: 'Protect our forests. Preserve our future.',
  shortDescription:
    'Environmental intelligence for healthier forests and a more sustainable future.',

  // Contact and booking
  email: 'juamsitu@gmail.com',
  bookingUrl: 'https://calendar.app.google/A8tkhWVzprbZmeDh7',

  // M-Pesa donations
  mpesa: {
    method: 'M-Pesa Buy Goods',
    till: '4200294',
    suggestedAmounts: [100, 250, 500, 1000],
  },

  /**
   * Form service for the waitlist.
   * Leave empty until you connect a service. While empty, the form
   * validates input but clearly tells people their details were NOT sent,
   * and offers an email fallback.
   *
   * Example with Formspree (free tier): create a form at formspree.io and
   * paste its endpoint, e.g. 'https://formspree.io/f/abcdwxyz'
   */
  waitlistEndpoint: '',

  /**
   * Social profiles. Leave url empty to hide a profile.
   * Fill in your real profile links when they exist.
   */
  socials: [
    { name: 'LinkedIn', url: '' },
    { name: 'X', url: '' },
    { name: 'Instagram', url: '' },
    { name: 'Facebook', url: '' },
  ],
};

/**
 * Photography. Images are served from Unsplash (free licence).
 * To use your own photos, drop them in /public/images and change the
 * src to e.g. '/images/my-forest.jpg'.
 * If an image fails to load, a forest-coloured fallback is shown instead.
 */
const unsplash = (id, w = 2000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const images = {
  hero: {
    src: unsplash('1751561484515-547e44766720', 2400),
    alt: 'Dense green canopy of Kakamega Forest under a bright sky',
    caption: 'Kakamega Forest, Kenya',
    credit: 'Photo by Nala Okallo on Unsplash',
  },
  aerial: {
    src: unsplash('1673248580186-0c03fb74b2d7', 1600),
    alt: 'Aerial view looking straight down onto a forest canopy',
    credit: 'Photo by Daniel Gonzalez on Unsplash',
  },
  landscape: {
    src: unsplash('1632984780534-58f56e6aeef9', 2000),
    alt: 'Acacia trees on open grassland with mountains behind, Kimana, Kenya',
    caption: 'Kimana, Kenya',
    credit: 'Photo by Mariola Grobelska on Unsplash',
  },
  comingSoon: {
    src: '/images/coming-soon.jpg',
    alt: 'Illustrated globe wrapped in forest with a glowing ring reading coming soon',
  },
};

/**
 * Platform capabilities and their honest status.
 * status: 'prototype' = in the current early prototype
 *         'development' = being built now
 *         'planned' = on the roadmap
 * Update these as the platform progresses.
 */
export const statusLabels = {
  prototype: 'In early prototype',
  development: 'In development',
  planned: 'Planned',
};

export const capabilities = [
  {
    id: '01',
    title: 'Monitor forest health',
    text: 'Explore forest conditions through geospatial information and vegetation indicators, including NDVI-based insights.',
    icon: 'Leaf',
    status: 'prototype',
  },
  {
    id: '02',
    title: 'Understand environmental change',
    text: 'Bring environmental information into context to better understand changes in forest landscapes and surrounding ecosystems.',
    icon: 'Layers',
    status: 'development',
  },
  {
    id: '03',
    title: 'Make informed decisions',
    text: 'Translate environmental observations into insights that can support conservation planning, restoration priorities and environmental management.',
    icon: 'Compass',
    status: 'planned',
  },
  {
    id: '04',
    title: 'Support accountability',
    text: 'Help organisations and stakeholders strengthen environmental monitoring, sustainability reporting and evidence-based decision-making.',
    icon: 'ShieldCheck',
    status: 'planned',
  },
];

/** Team and partners. Add verified entries only. */
export const team = [
  // { name: 'Full name', role: 'Role', photo: '/images/team/name.jpg', bio: 'Short verified bio' },
];

export const partners = [
  // { name: 'Partner name', logo: '/images/partners/logo.png', url: 'https://...' },
];
