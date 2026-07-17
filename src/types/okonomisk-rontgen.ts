export type RontgenCategory =
  | "buffer"
  | "trygghet"
  | "kostnader"
  | "gjeld"
  | "sparing";

export interface RontgenOption {
  id: string;
  label: string;
  points: number;
}

export interface RontgenQuestion {
  id: string;
  text: string;
  helpText?: string;
  category: RontgenCategory;
  options: RontgenOption[];
}

export interface RontgenResultBand {
  minScore: number;
  maxScore: number;
  title: string;
  text: string;
}

export interface RontgenCategoryScore {
  category: RontgenCategory;
  label: string;
  earnedPoints: number;
  possiblePoints: number;
  percent: number;
}

export interface RontgenActionLink {
  label: string;
  href: string;
}

export interface RontgenRecommendation {
  category: RontgenCategory;
  label: string;
  text: string;
  links: RontgenActionLink[];
}

export interface RontgenResult {
  totalScore: number;
  maxScore: number;
  band: RontgenResultBand;
  categories: RontgenCategoryScore[];
  recommendations: RontgenRecommendation[];
}
