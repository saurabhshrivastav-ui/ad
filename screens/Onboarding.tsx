import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { UserProfile, CKDStage } from '../types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [stage, setStage] = useState<CKDStage>(CKDStage.STAGE_3A);
  const [restrictions, setRestrictions] = useState<string[]>([]);

  const toggleRestriction = (res: string) => {
    if (restrictions.includes(res)) {
      setRestrictions(restrictions.filter(r => r !== res));
    } else {
      setRestrictions([...restrictions, res]);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete({
        name,
        ckdStage: stage,
        restrictions,
        onboardingComplete: true
      });
    }
  };

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Progress */}
        <View style={styles.progress}>
          {[1, 2, 3].map(i => (
            <View key={i} style={[styles.progressBar, i <= step && styles.progressActive]} />
          ))}
        </View>

        {step === 1 && (
          <View style={styles.step}>
            <View style={styles.icon}>
              <Text style={styles.emoji}>👋</Text>
            </View>
            <Text style={styles.title}>Welcome to RenalGuard</Text>
            <Text style={styles.subtitle}>
              Your personalized AI companion for navigating Chronic Kidney Disease through smarter diet choices.
            </Text>
            <Text style={styles.label}>What should we call you?</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              style={styles.input}
            />
          </View>
        )}

        {step === 2 && (
          <View style={styles.step}>
            <Text style={styles.title}>Current CKD Stage</Text>
            <Text style={styles.subtitle}>This helps our AI calibrate nutrient limits (Potassium, Protein, etc.) specifically for you.</Text>

            <View style={styles.options}>
              {[
                { val: CKDStage.STAGE_1, label: 'Stage 1', desc: 'Normal function, kidney damage' },
                { val: CKDStage.STAGE_2, label: 'Stage 2', desc: 'Mild loss of function' },
                { val: CKDStage.STAGE_3A, label: 'Stage 3a', desc: 'Mild to moderate loss' },
                { val: CKDStage.STAGE_3B, label: 'Stage 3b', desc: 'Moderate to severe loss' },
                { val: CKDStage.STAGE_4, label: 'Stage 4', desc: 'Severe loss of function' },
                { val: CKDStage.STAGE_5, label: 'Stage 5', desc: 'Kidney failure / Dialysis' },
              ].map((opt) => (
                <TouchableOpacity
                  key={opt.val}
                  onPress={() => setStage(opt.val)}
                  style={[styles.option, stage === opt.val && styles.optionSelected]}
                >
                  <Text style={[styles.optionLabel, stage === opt.val && styles.optionLabelSelected]}>{opt.label}</Text>
                  <Text style={[styles.optionDesc, stage === opt.val && styles.optionDescSelected]}>{opt.desc}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={styles.step}>
            <Text style={styles.title}>Any Restrictions?</Text>
            <Text style={styles.subtitle}>Select any specific dietary instructions from your doctor.</Text>

            <View style={styles.restrictions}>
              {[
                'Low Sodium', 'Low Potassium', 'Low Phosphorus',
                'Fluid Restriction', 'Diabetic Friendly', 'Vegetarian',
                'Gluten Free', 'High Protein'
              ].map((res) => (
                <TouchableOpacity
                  key={res}
                  onPress={() => toggleRestriction(res)}
                  style={[styles.restriction, restrictions.includes(res) && styles.restrictionSelected]}
                >
                  <Text style={[styles.restrictionText, restrictions.includes(res) && styles.restrictionTextSelected]}>
                    {res}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          onPress={handleNext}
          disabled={step === 1 && !name.trim()}
        >
          {step === 3 ? "Get Started" : "Continue"}
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0fdfa',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 40,
  },
  progress: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 32,
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e5e7eb',
  },
  progressActive: {
    backgroundColor: '#0d9488',
  },
  step: {
    flex: 1,
  },
  icon: {
    width: 64,
    height: 64,
    backgroundColor: '#ccfbf1',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emoji: {
    fontSize: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
    lineHeight: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  options: {
    gap: 12,
  },
  option: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    backgroundColor: 'white',
  },
  optionSelected: {
    borderColor: '#0d9488',
    backgroundColor: '#f0fdfa',
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  optionLabelSelected: {
    color: '#0d9488',
  },
  optionDesc: {
    fontSize: 14,
    color: '#6b7280',
  },
  optionDescSelected: {
    color: '#0d9488',
  },
  restrictions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  restriction: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  restrictionSelected: {
    backgroundColor: '#0d9488',
    borderColor: '#0d9488',
  },
  restrictionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
  },
  restrictionTextSelected: {
    color: 'white',
  },
  footer: {
    padding: 24,
  },
});
