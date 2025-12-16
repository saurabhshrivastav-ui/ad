import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Onboarding } from './screens/Onboarding';
import { Dashboard } from './screens/Dashboard';
import { MealPlanner } from './screens/MealPlanner';
import { FoodAnalyzer } from './screens/FoodAnalyzer';
import { History } from './screens/History';
import { UserProfile } from './types';
import { StorageService } from './services/storage';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const init = async () => {
      const profile = await StorageService.getProfile();
      setUserProfile(profile);
      setIsLoading(false);
    };
    init();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0d9488" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!userProfile || !userProfile.onboardingComplete ? (
          <Stack.Screen name="Onboarding">
              {props => <Onboarding {...props} onComplete={async (profile) => {
                await StorageService.saveProfile(profile);
                setUserProfile(profile);
              }} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Dashboard">
              {props => <Dashboard {...props} profile={userProfile} />}
            </Stack.Screen>
            <Stack.Screen name="MealPlanner">
              {props => <MealPlanner {...props} profile={userProfile} />}
            </Stack.Screen>
            <Stack.Screen name="FoodAnalyzer">
              {props => <FoodAnalyzer {...props} profile={userProfile} />}
            </Stack.Screen>
            <Stack.Screen name="History" component={History} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
});

export default App;
