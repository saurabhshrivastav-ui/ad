import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { RecipeCard } from '../components/RecipeCard';
import { GeminiService } from '../services/geminiService';
import { StorageService } from '../services/storage';
import { UserProfile, Recipe } from '../types';
import { Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native';

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
    <Container style={styles.container}>
      <Header title="Smart Meal Planner" onBack={() => navigation.goBack()} />
      
      <View style={styles.mainView}>
        {!generatedRecipe ? (
            <>
                <View style={styles.formCard}>
                    <Text style={styles.label}>Meal Type</Text>
                    <View style={styles.mealTypeContainer}>
                        {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map(type => (
                            <TouchableOpacity
                                key={type}
                                onPress={() => setMealType(type)}
                                style={[styles.mealTypeButton, mealType === type && styles.activeMealType]}
                            >
                                <Text style={[styles.mealTypeText, mealType === type && styles.activeMealTypeText]}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.label}>Preferences or Cravings</Text>
                    <TextInput 
                        multiline
                        style={styles.textInput}
                        placeholder="e.g. I have chicken and rice, but I want something spicy..."
                        value={preferences}
                        onChangeText={setPreferences}
                    />
                </View>

                {error && (
                    <View style={styles.errorView}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                )}

                <Button onPress={handleGenerate} isLoading={isLoading}>
                    {isLoading ? "Consulting AI Dietitian..." : "Generate Meal Plan"}
                </Button>
                
                <Text style={styles.footerText}>
                    AI considers your Stage {profile.ckdStage} restrictions ({profile.restrictions.join(', ') || 'None'}).
                </Text>
            </>
        ) : (
            <View style={styles.resultView}>
                <View style={styles.resultHeader}>
                    <Text style={styles.resultTitle}>Your Personal Plan</Text>
                    <TouchableOpacity 
                        onPress={() => setGeneratedRecipe(null)}
                        style={styles.newPlanButton}
                    >
                        <Text style={styles.newPlanText}>New Plan</Text>
                    </TouchableOpacity>
                </View>
                <RecipeCard recipe={generatedRecipe} />
                <View style={styles.spacer} />
            </View>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafb',
  },
  mainView: {
    padding: 16,
    flex: 1,
  },
  formCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  mealTypeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  mealTypeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  activeMealType: {
    backgroundColor: '#0d9488',
    shadowColor: '#0d9488',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  mealTypeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
  },
  activeMealTypeText: {
    color: 'white',
  },
  textInput: {
    width: '100%',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 14,
    minHeight: 100,
  },
  errorView: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 16,
    paddingHorizontal: 24,
  },
  resultView: {
    // animate-fade-in-up, but RN doesn't have animate, so skip
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultTitle: {
    fontWeight: 'bold',
    color: '#1f2937',
  },
  newPlanButton: {
    // style for TouchableOpacity
  },
  newPlanText: {
    fontSize: 14,
    color: '#0d9488',
    fontWeight: '500',
  },
  spacer: {
    height: 16,
  },
});
