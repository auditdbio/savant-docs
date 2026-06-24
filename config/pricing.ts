export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'lite',
    name: 'Lite',
    price: 0.07,
    description: 'Runs on more efficient models with lower price.'
  },
  {
    id: 'advanced',
    name: 'Advanced',
    price: 0.12,
    description: 'Comprehensive analysis using advanced models.'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 0.50,
    description: 'Premium analysis with highest-quality models.'
  }
];

export const HUMAN_AUDIT_RATE = 20; // $ per line of code
export const SPEED_ADVANTAGE = 300; // times faster than human audit 