import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.description}>{recipe.description}</Text>
        <View style={styles.tags}>
          {recipe.tags.map(tag => (
            <Text key={tag} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.safetyNote}>
          <Text style={styles.safetyTitle}>Why it's Safe</Text>
          <Text style={styles.safetyText}>{recipe.safetyNote}</Text>
        </View>

        <Text style={styles.sectionTitle}>Ingredients</Text>
        {recipe.ingredients.map((ing, idx) => (
          <View key={idx} style={styles.ingredient}>
            <Text style={styles.ingredientName}>{ing.name}</Text>
            <Text style={styles.ingredientAmount}>{ing.amount}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Instructions</Text>
        {recipe.instructions.map((step, idx) => (
          <Text key={idx} style={styles.instruction}>
            {idx + 1}. {step}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 24,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#f0fdfa',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccfbf1',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#134e4a',
  },
  description: {
    fontSize: 14,
    color: '#0f766e',
    marginTop: 4,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  tag: {
    fontSize: 12,
    backgroundColor: 'white',
    color: '#0d9488',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#a7f3d0',
    fontWeight: '500',
  },
  content: {
    padding: 20,
  },
  safetyNote: {
    backgroundColor: '#eff6ff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dbeafe',
    marginBottom: 16,
  },
  safetyTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e40af',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  safetyText: {
    fontSize: 14,
    color: '#1d4ed8',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
    marginTop: 16,
  },
  ingredient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafb',
  },
  ingredientName: {
    fontSize: 14,
    color: '#374151',
  },
  ingredientAmount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  instruction: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 12,
  },
});
