import { Stack } from 'expo-router';
import { View } from 'react-native';
import { UserProvider } from '../context/UserContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function RootLayoutNav() {
  const { colors } = useTheme();
  
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background }
        }}
      />
    </View>
  );
}

export default function RootLayout() {
  return (
    <UserProvider>
      <ThemeProvider>
        <RootLayoutNav />
      </ThemeProvider>
    </UserProvider>
  );
} 