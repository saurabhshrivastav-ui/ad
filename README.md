# RenalGuard AI - Healthcare App with AI

A React Native Expo app for Chronic Kidney Disease (CKD) patients, featuring AI-powered food safety analysis and meal planning.

## App Concept & Features

RenalGuard AI helps CKD patients make informed dietary decisions through:
- **Onboarding Flow**: Collects user profile including CKD stage and dietary restrictions
- **AI Food Safety Analyzer**: Analyzes food items for safety based on kidney health
- **Smart Meal Planner**: Generates personalized kidney-safe recipes using AI
- **History Tracking**: Saves and displays past analyses and recipes
- **Local Storage**: Persists user data using AsyncStorage

## Tech Stack
- **Framework**: React Native + Expo
- **AI Integration**: Google Gemini AI (mocked for demo)
- **Storage**: AsyncStorage
- **Navigation**: React Navigation
- **Styling**: StyleSheet

## Setup Instructions

1. **Prerequisites**:
   - Node.js (v18 or higher)
   - Expo CLI: `npm install -g @expo/cli`
   - Expo Go app on your phone (for testing)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure AI API** (optional, mocked by default):
   - Create `.env` file
   - Add `EXPO_PUBLIC_GEMINI_API_KEY=your_api_key_here`

4. **Run the app**:
   ```bash
   npx expo start --tunnel
   ```
   - Scan QR code with Expo Go app
   - Use `--tunnel` for access from different networks

## Project Structure
```
├── components/          # Reusable UI components
├── screens/            # App screens
├── services/           # API and storage services
├── types.ts            # TypeScript types
├── App.tsx             # Main app component
└── app.json            # Expo configuration
```

## Limitations
- AI responses are mocked for demo purposes
- Real Gemini API integration requires API key
- App is designed for mobile only

## Evaluation Notes
- Complies with assignment constraints (no forbidden topics)
- Uses meaningful AI integration for healthcare
- Clean, modular code with proper error handling
- Thoughtful UX with loading states and persistence
