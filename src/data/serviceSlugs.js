/**
 * Mapping from service titles to URL slugs.
 * Used for routing to individual service detail pages.
 */
export const SERVICE_SLUGS = {
  'Website Design & Development': 'website-design',
  'AI Agents': 'ai-agents',
  'Business Solutions': 'business-solutions',
  'Design Services': 'design-services',
};

export const SLUG_TO_SERVICE = Object.fromEntries(
  Object.entries(SERVICE_SLUGS).map(([title, slug]) => [slug, title])
);
