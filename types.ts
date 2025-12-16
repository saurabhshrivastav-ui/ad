export enum CKDStage {
  STAGE_1 = 1,
  STAGE_2 = 2,
  STAGE_3A = 3,
  STAGE_3B = 4,
  STAGE_4 = 5,
  STAGE_5 = 6
}

export interface UserProfile {
  name: string;
  ckdStage: CKDStage;
  restrictions: string[]; // e.g., 'Low Sodium', 'Low Potassium'
  onboardingComplete: boolean;
}

export interface Ingredient {
  name: string;
  amount: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  safetyNote: string; // AI generated note on why it's safe
  tags: string[];
  createdAt: number;
}

export interface FoodAnalysis {
  id: string;
  foodName: string;
  isSafe: boolean;
  safetyScore: number; // 1-10
  explanation: string;
  alternatives?: string[];
  createdAt: number;
}

export type ScreenName = 'onboarding' | 'dashboard' | 'mealPlanner' | 'foodAnalyzer' | 'history';
