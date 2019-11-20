export interface Feature {
  value: string;
  description: string;
}

export interface FeatureList {
  [index: string]: Feature;
}
