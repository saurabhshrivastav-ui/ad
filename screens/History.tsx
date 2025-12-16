import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { StorageService } from '../services/storage';
import { Recipe, FoodAnalysis } from '../types';

interface HistoryProps {
  onBack: () => void;
}

export const History: React.FC<HistoryProps> = ({ onBack }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [analyses, setAnalyses] = useState<FoodAnalysis[]>([]);
  const [activeTab, setActiveTab] = useState<'recipes' | 'checks'>('recipes');

  useEffect(() => {
    const loadData = async () => {
      const r = await StorageService.getRecipes();
      const a = await StorageService.getAnalyses();
      setRecipes(r);
      setAnalyses(a);
    };
    loadData();
  }, []);

  return (
    <Container style={styles.container}>
      <Header title="History" onBack={onBack} />
      
      <View style={styles.content}>
        <View style={styles.tabContainer}>
            <TouchableOpacity 
                onPress={() => setActiveTab('recipes')}
                style={[styles.tabButton, activeTab === 'recipes' && styles.activeTab]}
            >
                <Text style={[styles.tabText, activeTab === 'recipes' && styles.activeTabText]}>
                    Saved Plans
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => setActiveTab('checks')}
                style={[styles.tabButton, activeTab === 'checks' && styles.activeTab]}
            >
                <Text style={[styles.tabText, activeTab === 'checks' && styles.activeTabText]}>
                    Safety Checks
                </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.list}>
            {activeTab === 'recipes' ? (
                recipes.length === 0 ? (
                    <Text style={styles.emptyText}>No saved meal plans yet.</Text>
                ) : (
                    recipes.map(r => (
                        <View key={r.id} style={styles.recipeCard}>
                            <Text style={styles.recipeTitle}>{r.title}</Text>
                            <Text style={styles.recipeDesc}>{r.description}</Text>
                            <View style={styles.tags}>
                                {r.tags.slice(0, 2).map(t => (
                                    <Text key={t} style={styles.tag}>{t}</Text>
                                ))}
                            </View>
                        </View>
                    ))
                )
            ) : (
                analyses.length === 0 ? (
                    <Text style={styles.emptyText}>No analysis history found.</Text>
                ) : (
                     analyses.map(a => (
                        <View key={a.id} style={styles.recipeCard}>
                            <View style={styles.analysisRow}>
                                <View>
                                    <Text style={styles.recipeTitle}>{a.foodName}</Text>
                                    <Text style={styles.recipeDesc}>{new Date(a.createdAt).toLocaleDateString()}</Text>
                                </View>
                                <Text style={[styles.status, a.isSafe ? styles.safe : styles.unsafe]}>
                                    {a.isSafe ? 'Safe' : 'Unsafe'}
                                </Text>
                            </View>
                        </View>
                    ))
                )
            )}
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafb',
  },
  content: {
    padding: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#111827',
  },
  list: {
    // space-y-4 equivalent, but in RN, use marginBottom on items
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: 40,
    color: '#9ca3af',
  },
  recipeCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 16,
  },
  recipeTitle: {
    fontWeight: 'bold',
    color: '#1f2937',
  },
  recipeDesc: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  tag: {
    fontSize: 10,
    backgroundColor: '#ccfbf1',
    color: '#0f766e',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  analysisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  safe: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  unsafe: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
  },
});
