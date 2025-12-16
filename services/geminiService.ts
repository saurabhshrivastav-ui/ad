import { UserProfile, Recipe, FoodAnalysis } from "../types";

const getAIClient = () => {
  // Mock for demo
  return null;
};

export const GeminiService = {
  /**
   * Generates a kidney-safe meal plan based on user profile and request.
   */
  async generateMealPlan(
    profile: UserProfile,
    mealType: string,
    preferences: string
  ): Promise<Recipe> {
    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    return {
      id: Date.now().toString(),
      title: `Healthy ${mealType} Recipe`,
      description: `A kidney-safe ${mealType} tailored for CKD Stage ${profile.ckdStage}`,
      ingredients: [
        { name: "Chicken breast", amount: "4 oz" },
        { name: "Brown rice", amount: "1/2 cup cooked" },
        { name: "Broccoli", amount: "1 cup" },
        { name: "Olive oil", amount: "1 tsp" },
      ],
      instructions: [
        "Grill the chicken breast until cooked through.",
        "Cook brown rice according to package instructions.",
        "Steam broccoli until tender.",
        "Drizzle with olive oil and serve.",
      ],
      safetyNote: "This recipe is low in potassium and phosphorus, suitable for CKD patients.",
      tags: ["Low Potassium", "Low Phosphorus", "Protein Rich"],
      createdAt: Date.now(),
    };
  },

  /**
   * Analyzes a specific food item for safety.
   */
  async analyzeFood(profile: UserProfile, foodQuery: string): Promise<FoodAnalysis> {
    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    const isSafe = !foodQuery.toLowerCase().includes('banana') && !foodQuery.toLowerCase().includes('avocado');
    const score = isSafe ? 8 : 3;

    return {
      id: Date.now().toString(),
      foodName: foodQuery,
      isSafe,
      safetyScore: score,
      explanation: isSafe
        ? `${foodQuery} is generally safe for CKD patients in moderation. Monitor portion sizes.`
        : `${foodQuery} is high in potassium/phosphorus. Limit intake and consult your doctor.`,
      alternatives: isSafe ? [] : ["Apples", "Berries", "Carrots"],
      createdAt: Date.now(),
    };
  }
};
