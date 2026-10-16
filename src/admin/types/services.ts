export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  icon?: string;
}

export interface PricingRule {
  id: string;
  categoryId: string;
  hourlyFloor: number;
  hourlySuggested: number;
  hourlyCeiling: number;
  step: number;
}

export interface PriorityTier {
  id: string;
  name: string;
  multiplier: number;
  description: string;
}

export interface CancellationPolicy {
  id: string;
  name: string;
  rules: {
    hoursBeforeStart: number;
    penaltyPercentage: number;
  }[];
}
