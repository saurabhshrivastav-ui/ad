import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { RecipeCard } from '../components/RecipeCard';
import { GeminiService } from '../services/geminiService';
import { StorageService } from '../services/storage';
import { UserProfile, Recipe } from '../types';

interface MealPlannerProps {
  profile: UserProfile;
  navigation: any;
}

export const MealPlanner: React.FC<MealPlannerProps> = ({ profile, navigation }) => {
  const [mealType, setMealType] = useState('Dinner');
  const [preferences, setPreferences] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setIsLoading(true);
    setError('');
    setGeneratedRecipe(null);
    try {
      const recipe = await GeminiService.generateMealPlan(profile, mealType, preferences);
      setGeneratedRecipe(recipe);
      await StorageService.saveRecipe(recipe);
    } catch (e) {
      setError("Failed to generate plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="bg-gray-50">
      <Header title="Smart Meal Planner" onBack={() => navigation.goBack()} />
      
      <div className="p-4 flex-1 overflow-y-auto">
        {!generatedRecipe ? (
            <>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Meal Type</label>
                    <div className="flex gap-2 mb-6">
                        {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map(type => (
                            <button
                                key={type}
                                onClick={() => setMealType(type)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    mealType === type 
                                    ? 'bg-teal-600 text-white shadow-md shadow-teal-200' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <label className="block text-sm font-bold text-gray-700 mb-2">Preferences or Cravings</label>
                    <textarea 
                        className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none text-sm min-h-[100px]"
                        placeholder="e.g. I have chicken and rice, but I want something spicy..."
                        value={preferences}
                        onChange={(e) => setPreferences(e.target.value)}
                    />
                </div>

                {error && (
                    <div className="p-4 mb-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                        {error}
                    </div>
                )}

                <Button onClick={handleGenerate} isLoading={isLoading}>
                    {isLoading ? "Consulting AI Dietitian..." : "Generate Meal Plan"}
                </Button>
                
                <p className="text-center text-xs text-gray-400 mt-4 px-6">
                    AI considers your Stage {profile.ckdStage} restrictions ({profile.restrictions.join(', ') || 'None'}).
                </p>
            </>
        ) : (
            <div className="animate-fade-in-up">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-gray-800">Your Personal Plan</h2>
                    <button 
                        onClick={() => setGeneratedRecipe(null)}
                        className="text-sm text-teal-600 font-medium"
                    >
                        New Plan
                    </button>
                </div>
                <RecipeCard recipe={generatedRecipe} />
                <div className="h-4"></div>
            </div>
        )}
      </div>
    </Container>
  );
};
