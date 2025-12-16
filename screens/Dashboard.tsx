import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Container } from '../components/Container';
import { UserProfile } from '../types';

interface DashboardProps {
  profile: UserProfile;
  navigation: any;
}

export const Dashboard: React.FC<DashboardProps> = ({ profile, navigation }) => {
  return (
    <Container style={styles.container}>
      {/* Header Area */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcome}>Welcome back,</Text>
            <Text style={styles.name}>{profile.name}</Text>
          </View>
          <View style={styles.stage}>
            <Text style={styles.stageText}>Stage {profile.ckdStage}</Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Quick Stats/Tip */}
        <View style={styles.tip}>
          <View style={styles.tipIcon}>
            <Text style={styles.lightning}>⚡</Text>
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Daily Tip</Text>
            <Text style={styles.tipText}>
              Leaching vegetables like potatoes in water can reduce potassium content by up to 50%.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>AI Tools</Text>

        <TouchableOpacity
          style={styles.tool}
          onPress={() => navigation.navigate('MealPlanner')}
        >
          <View style={styles.toolIcon}>
            <Text style={styles.book}>📚</Text>
          </View>
          <View style={styles.toolContent}>
            <Text style={styles.toolTitle}>Smart Meal Planner</Text>
            <Text style={styles.toolDesc}>Generate kidney-safe recipes instantly.</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tool}
          onPress={() => navigation.navigate('FoodAnalyzer')}
        >
          <View style={styles.toolIcon}>
            <Text style={styles.search}>🔍</Text>
          </View>
          <View style={styles.toolContent}>
            <Text style={styles.toolTitle}>Safety Analyzer</Text>
            <Text style={styles.toolDesc}>Check ingredients for potassium/sodium.</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tool}
          onPress={() => navigation.navigate('History')}
        >
          <View style={styles.toolIcon}>
            <Text style={styles.clock}>🕒</Text>
          </View>
          <View style={styles.toolContent}>
            <Text style={styles.toolTitle}>History</Text>
            <Text style={styles.toolDesc}>View saved plans and checks.</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#0d9488',
    padding: 24,
    paddingBottom: 48,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  welcome: {
    color: '#a7f3d0',
    fontSize: 16,
    fontWeight: '500',
  },
  name: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  stage: {
    backgroundColor: 'rgba(15, 118, 110, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#0f766e',
  },
  stageText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: -32,
    paddingBottom: 24,
  },
  tip: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipIcon: {
    backgroundColor: '#fed7aa',
    padding: 12,
    borderRadius: 24,
    marginRight: 16,
  },
  lightning: {
    fontSize: 24,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  tipText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  tool: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  toolIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  book: {
    fontSize: 24,
  },
  search: {
    fontSize: 24,
  },
  clock: {
    fontSize: 24,
  },
  toolContent: {
    flex: 1,
  },
  toolTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  toolDesc: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  arrow: {
    fontSize: 18,
    color: '#d1d5db',
  },
});
