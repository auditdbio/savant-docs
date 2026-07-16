export interface PricingTier {
  id: string;
  name: string;
  price: number;
}

// Per-line rates must match the pricing cards in src/components/Pricing.
export const PRICING_TIERS: PricingTier[] = [
  {id: 'lite', name: 'Lite', price: 0.07},
  {id: 'advanced', name: 'Advanced', price: 0.12},
  {id: 'pro', name: 'Pro', price: 0.5},
];

export const DEFAULT_TIER_ID = 'advanced';

// $ per line of code; keeps a typical 2,000–5,000 line protocol inside the
// published "$40K–$100K (Sherlock)" manual-audit range.
export const HUMAN_AUDIT_RATE = 20;

// Manual audits run 3–38 days vs 10–30 minutes here.
export const SPEED_ADVANTAGE = 300;
