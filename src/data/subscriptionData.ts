export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  currencySymbol: string;
  durationMonths: number;
  durationLabel: string;
  introductory: boolean;
  planBadge: string;
  headline: string;
  tagline: string;
  ctaText: string;
}

export const introductoryPlan: SubscriptionPlan = {
  id: 'gita_intro_6_month',
  name: '6 Month Introductory Plan',
  price: 500,
  currency: 'INR',
  currencySymbol: '₹',
  durationMonths: 6,
  durationLabel: '6 MONTHS',
  introductory: true,
  planBadge: 'Introductory Plan',
  headline: 'Unlock the Full Experience',
  tagline: 'Read, listen and explore the wisdom of the Bhagavad Gita without limits.',
  ctaText: 'Get Premium',
};
