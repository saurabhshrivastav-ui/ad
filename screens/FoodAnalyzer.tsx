import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { GeminiService } from '../services/geminiService';
import { StorageService } from '../services/storage';
import { UserProfile, FoodAnalysis } from '../types';

interface FoodAnalyzerProps {
  profile: UserProfile;
  navigation: any;
}

export const FoodAnalyzer: React.FC<FoodAnalyzerProps> = ({ profile, navigation }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<FoodAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setResult(null);
    try {
      const data = await GeminiService.analyzeFood(profile, query);
      setResult(data);
      await StorageService.saveAnalysis(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container style={styles.container}>
      <Header title="Safety Analyzer" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.inputCard}>
          <Text style={styles.label}>Is this safe to eat?</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="e.g. Avocado, Canned Tuna"
            style={styles.input}
            onSubmitEditing={handleAnalyze}
          />
          <View style={styles.buttonContainer}>
            <Button variant="secondary" onPress={handleAnalyze} isLoading={isLoading} disabled={!query.trim()}>
              Analyze
            </Button>
          </View>
        </View>

        {result && (
          <View style={styles.resultCard}>
            <View style={[styles.resultHeader, result.isSafe ? styles.safeHeader : styles.unsafeHeader]}>
              <Text style={styles.resultTitle}>{result.foodName}</Text>
              <View style={[styles.statusBadge, result.isSafe ? styles.safeBadge : styles.unsafeBadge]}>
                <Text style={[styles.statusText, result.isSafe ? styles.safeText : styles.unsafeText]}>
                  {result.isSafe ? 'Likely Safe' : 'Limit / Avoid'}
                </Text>
              </View>
            </View>

            <View style={styles.resultContent}>
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreLabel}>Safety Score:</Text>
                <View style={styles.progressBar}>
                  <View
                    style={[styles.progressFill, {
                      width: `${result.safetyScore * 10}%`,
                      backgroundColor: result.safetyScore > 7 ? '#10b981' : result.safetyScore > 4 ? '#f59e0b' : '#ef4444'
                    }]}
                  />
                </View>
                <Text style={styles.scoreValue}>{result.safetyScore}/10</Text>
              </View>

              <Text style={styles.explanation}>{result.explanation}</Text>

              {result.alternatives && result.alternatives.length > 0 && (
                <View style={styles.alternatives}>
                  <Text style={styles.alternativesTitle}>Better Alternatives</Text>
                  {result.alternatives.map((alt, i) => (
                    <Text key={i} style={styles.alternative}>• {alt}</Text>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  inputCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#f9fafb',
    fontSize: 16,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
  resultCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    overflow: 'hidden',
  },
  resultHeader: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  safeHeader: {
    backgroundColor: '#f0fdf4',
    borderBottomColor: '#dcfce7',
  },
  unsafeHeader: {
    backgroundColor: '#fef2f2',
    borderBottomColor: '#fecaca',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    textTransform: 'capitalize',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  safeBadge: {
    backgroundColor: '#dcfce7',
  },
  unsafeBadge: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  safeText: {
    color: '#166534',
  },
  unsafeText: {
    color: '#dc2626',
  },
  resultContent: {
    padding: 20,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginRight: 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
  },
  explanation: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  alternatives: {
    backgroundColor: '#eef2ff',
    padding: 16,
    borderRadius: 12,
  },
  alternativesTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3730a3',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  alternative: {
    fontSize: 14,
    color: '#4338ca',
    marginBottom: 4,
  },
});
