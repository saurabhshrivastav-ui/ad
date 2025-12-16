import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, Recipe, FoodAnalysis } from '../types';

const KEYS = {
  USER_PROFILE: 'renalguard_user_profile',
  SAVED_RECIPES: 'renalguard_saved_recipes',
  ANALYSIS_HISTORY: 'renalguard_analysis_history',
};

export const StorageService = {
  async saveProfile(profile: UserProfile): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Error saving profile', e);
    }
  },

  async getProfile(): Promise<UserProfile | null> {
    try {
      const data = await AsyncStorage.getItem(KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  async saveRecipe(recipe: Recipe): Promise<void> {
    try {
      const existing = await this.getRecipes();
      const updated = [recipe, ...existing];
      await AsyncStorage.setItem(KEYS.SAVED_RECIPES, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving recipe', e);
    }
  },

  async getRecipes(): Promise<Recipe[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.SAVED_RECIPES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  async saveAnalysis(analysis: FoodAnalysis): Promise<void> {
    try {
      const existing = await this.getAnalyses();
      const updated = [analysis, ...existing];
      await AsyncStorage.setItem(KEYS.ANALYSIS_HISTORY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving analysis', e);
    }
  },

  async getAnalyses(): Promise<FoodAnalysis[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.ANALYSIS_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },
  
  async clearAll(): Promise<void> {
    await AsyncStorage.clear();
  }
};
